from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:3000/blog/2026-tax-planning-tcja-sunset-guide')
    time.sleep(2)
    page.screenshot(path='/home/jules/verification/blog-post.png', full_page=True)
    browser.close()
