from playwright.sync_api import Page, expect, sync_playwright

def verify_home_renovation_debug(page: Page):
    try:
        page.goto("http://localhost:3000/home-renovation-cost-estimator")
        # Just take a screenshot immediately to see what's on the page (error? 404?)
        page.wait_for_timeout(2000)
        page.screenshot(path="verification/debug_renovation.png", full_page=True)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_home_renovation_debug(page)
        finally:
            browser.close()
