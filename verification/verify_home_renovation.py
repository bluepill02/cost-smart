from playwright.sync_api import Page, expect, sync_playwright

def verify_home_renovation(page: Page):
    page.goto("http://localhost:3000/home-renovation-cost-estimator")
    expect(page.get_by_role("heading", name="Home Renovation Cost Estimator")).to_be_visible()

    # Check default state
    expect(page.get_by_text("Total Estimate")).to_be_visible()

    # Change Quality to Premium
    page.get_by_text("Premium").click()

    # Wait for re-render if needed (React is fast, but good to ensure text changes)
    # Just snapshot
    page.screenshot(path="verification/home-renovation.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_home_renovation(page)
        finally:
            browser.close()
