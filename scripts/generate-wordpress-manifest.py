#!/usr/bin/env python3
"""Generate a WordPress content manifest from the Next.js App Router pages.

The exporter keeps page URLs, metadata, visible static copy, and blog article HTML in
one PHP array so the WordPress theme can seed equivalent pages on activation.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app"
OUT = ROOT / "wordpress" / "costsmart-theme" / "inc" / "content-manifest.php"

CALC_KEYWORDS = (
    "calculator", "converter", "generator", "roi", "duty", "tax", "loan",
    "salary", "invoice", "inflation", "investment", "dashboard", "analyzer",
    "advisor", "compare",
)


def route_for(path: Path) -> str:
    rel = path.relative_to(APP)
    parts = list(rel.parts[:-1])
    if not parts:
        return "/"
    # Dynamic Next.js segments are represented as readable placeholders in WP.
    parts = [p.strip("[]") for p in parts]
    return "/" + "/".join(parts) + "/"


def first_match(pattern: str, text: str, flags: int = re.S) -> str:
    m = re.search(pattern, text, flags)
    return m.group(1).strip() if m else ""


def title_from_source(src: str, route: str) -> str:
    for pat in [r"title=\"([^\"]+)\"", r"title:\s*'([^']+)'", r'title:\s*"([^"]+)"']:
        v = first_match(pat, src)
        if v:
            return re.sub(r"\s*\|\s*CostSmart.*$", "", html.unescape(v))
    if route == "/":
        return "CostSmart - Financial Calculators for the Modern Economy"
    return route.strip("/").split("/")[-1].replace("-", " ").title()


def description_from_source(src: str) -> str:
    for pat in [r"description:\s*'([^']+)'", r'description:\s*"([^"]+)"']:
        v = first_match(pat, src)
        if v:
            return html.unescape(v)
    # Fall back to the first paragraph string.
    v = first_match(r"<p[^>]*>\s*([^<]{40,})", src)
    return clean_inline(v)[:240] if v else "CostSmart financial planning content and calculators."


def clean_inline(s: str) -> str:
    s = re.sub(r"\{[^{}]*\}", "", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("&apos;", "'").replace("&quot;", '"')
    s = re.sub(r"\s+", " ", s).strip()
    return html.unescape(s)


def jsx_to_html(fragment: str) -> str:
    # Keep static HTML-ish content and remove React-only constructs/components.
    fragment = re.sub(r"\{\/\*.*?\*\/\}", "", fragment, flags=re.S)
    fragment = re.sub(r"<([A-Z][A-Za-z0-9_\.]*)(?:\s[^>]*)?\s*/>", "", fragment)
    fragment = re.sub(r"<([A-Z][A-Za-z0-9_\.]*)(?:\s[^>]*)?>.*?</\1>", "", fragment, flags=re.S)
    fragment = re.sub(r"\sclassName=", " class=", fragment)
    fragment = re.sub(r"\s(?:variant|size|asChild|fill|strokeWidth|data|strategy|crossOrigin)=\{?\"?[^\s>\}]+\"?\}?", "", fragment)
    fragment = re.sub(r"<Link\s+href=\"([^\"]+)\"([^>]*)>", r'<a href="\1"\2>', fragment)
    fragment = fragment.replace("</Link>", "</a>")
    fragment = re.sub(r"\{\s*\"([^\"]*)\"\s*\}", r"\1", fragment)
    fragment = re.sub(r"\{`([^`]*)`\}", r"\1", fragment, flags=re.S)
    fragment = re.sub(r"\{[^{}]*(?:map|JSON|new Date|const|return|=>)[^{}]*\}", "", fragment)
    fragment = re.sub(r"\s+", " ", fragment)
    fragment = fragment.replace("&apos;", "'").replace("&quot;", '"')
    return fragment.strip()


def extract_content(src: str, route: str, title: str, desc: str) -> str:
    if "/blog/" in route:
        m = re.search(r"<BlogLayout[\s\S]*?>([\s\S]*)</BlogLayout>", src)
        if m:
            return jsx_to_html(m.group(1))
    # Extract semantic text blocks from static pages.
    blocks = []
    for tag in ("h1", "h2", "h3", "p", "li"):
        for m in re.finditer(rf"<({tag})[^>]*>([\s\S]*?)</\1>", src):
            text = clean_inline(m.group(2))
            if text and text not in blocks and len(text) > 2:
                blocks.append(text)
    if not blocks:
        blocks = [desc]
    html_blocks = []
    for b in blocks[:60]:
        tag = "p"
        if b == title or len(html_blocks) == 0 and len(b) < 90:
            tag = "h2"
        html_blocks.append(f"<{tag}>{html.escape(b)}</{tag}>")
    if any(k in route for k in CALC_KEYWORDS) and "/blog/" not in route:
        kind = route.strip("/").split("/")[-1]
        html_blocks.insert(1, f'[costsmart_calculator type="{html.escape(kind)}"]')
    return "\n".join(html_blocks)


def category_for(route: str) -> str:
    if route == "/": return "Home"
    if route.startswith("/blog/"): return "Blog"
    if route.startswith("/compare/"): return "Comparison"
    if route.startswith("/in/"): return "India calculators"
    if route.startswith("/tools/"): return "Tools"
    return "Calculators" if any(k in route for k in CALC_KEYWORDS) else "Pages"


def php_string(s: str) -> str:
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"


def main() -> None:
    pages = []
    for page in sorted(APP.glob("**/page.tsx")):
        src = page.read_text(encoding="utf-8")
        route = route_for(page)
        title = title_from_source(src, route)
        desc = description_from_source(src)
        content = extract_content(src, route, title, desc)
        pages.append({
            "route": route,
            "slug": "home" if route == "/" else route.strip("/").replace("/", "__"),
            "title": title,
            "description": desc,
            "category": category_for(route),
            "content": content,
            "type": "post" if route.startswith("/blog/") else "page",
        })
    lines = ["<?php", "/**", " * Generated from the Next.js app directory by scripts/generate-wordpress-manifest.py.", " * Do not edit route entries by hand; regenerate after changing app content.", " */", "return ["]
    for p in pages:
        lines.append("    [")
        for key in ("route", "slug", "title", "description", "category", "type", "content"):
            lines.append(f"        '{key}' => {php_string(p[key])},")
        lines.append("    ],")
    lines.append("];\n")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(pages)} routes to {OUT.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
