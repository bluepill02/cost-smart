from playwright.sync_api import Page, expect, sync_playwright

def verify_property_registration(page: Page):
    page.goto("http://localhost:3000/in/property-registration-cost-calculator")
    expect(page.get_by_role("heading", name="Property Registration Charges Calculator")).to_be_visible()

    # Check default state (Maharashtra)
    expect(page.get_by_text("Maharashtra")).to_be_visible()
    expect(page.get_by_text("Stamp Duty (5%)")).to_be_visible()

    # Change State to Delhi
    # Use selector for shadcn select
    page.get_by_label("State").click()
    page.get_by_role("option", name="Delhi").click()

    expect(page.get_by_text("Stamp Duty (6%)")).to_be_visible()

    page.screenshot(path="verification/property-registration.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_property_registration(page)
        finally:
            browser.close()
