// @ts-check
import { test, expect } from "@playwright/test";

test.describe('Product Search and Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test("page has title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Search and Filter Example/);
  });

  test('verify item name search matches are case insensitive (PSF-7, PSF-8)', async ({ page }) => {
    const searchTerm = 'laptop';
    const expectedItemName = 'Laptop';

    await page.fill('[data-testid="search-input"]', searchTerm);
    await page.waitForSelector('[data-testid="item-name"]');

    const lowerCaseResults = await page.locator('[data-testid="item-name"]').allInnerTexts();
    expect(lowerCaseResults).toContain(expectedItemName);

    // Clear the input field
    await page.fill('[data-testid="search-input"]', '');

    // Enter the search term in uppercase
    await page.fill('[data-testid="search-input"]', searchTerm.toUpperCase());
    await page.waitForSelector('[data-testid="item-name"]');

    const upperCaseResults = await page.locator('[data-testid="item-name"]').allInnerTexts();
    expect(upperCaseResults).toContain(expectedItemName);

    await page.fill('[data-testid="search-input"]', '');

    // Enter the search term in mixed case
    const mixedCaseSearchTerm = 'LaPToP';
    await page.fill('[data-testid="search-input"]', mixedCaseSearchTerm);
    await page.waitForSelector('[data-testid="item-name"]');

    // Assert expected mixed item name is displayed in the results
    const mixedCaseResults = await page.locator('[data-testid="item-name"]').allInnerTexts();
    expect(mixedCaseResults).toContain(expectedItemName);
  });

  test('should provide a rating filter option for minimum rating "1 star and above" (PSF-18, PSF-19)"', async ({ page }) => {
    const ratingDropdown = page.locator('[data-testid="filter-rating-dropdown"]');
    await expect(ratingDropdown).toBeVisible();

    // Change the selected option to "1 star and above"
    await ratingDropdown.selectOption({ value: '1' });

    // Verify the selected option is "1 star and above"
    const selectedOption = await ratingDropdown.evaluate(el => (el as HTMLSelectElement).options[(el as HTMLSelectElement).selectedIndex].text);
    expect(selectedOption).toBe('1 star and above');

    // Verify that all displayed items have a rating of at least 1 star
    const items = await page.locator('[data-testid="item"]').all();
    for (const item of items) {
      const ratingText = await item.locator('[data-testid="item-rating"]').innerText();
      const rating = parseFloat(ratingText.replace(' stars', ''));
      expect(rating).toBeGreaterThanOrEqual(1);
    }
  });

  test('should sort items by price in ascending order (PSF-23)', async ({ page }) => {
    const sortDropdown = page.locator('[data-testid="sort-by"]');
    await expect(sortDropdown).toBeVisible();

    // Select "Price: High to Low"
    await sortDropdown.selectOption({ value: 'priceAsc' });

    await page.waitForSelector('[data-testid="item-name"]');

    // Verify the item prices are ascending
    const items = await page.locator('[data-testid="item"]').all();
    let previousPrice = -Infinity;

    for (const item of items) {
      const priceText = await item.locator('[data-testid="item-price"]').innerText();
      const price = parseFloat(priceText.replace('$', ''));
      expect(price).toBeGreaterThanOrEqual(previousPrice);
      previousPrice = price;
    }
  });

  test('should sort items by price in descending order (PSF-24)', async ({ page }) => {
    const sortDropdown = page.locator('[data-testid="sort-by"]');
    await expect(sortDropdown).toBeVisible();

    // Select "Price: Low to High"
    await sortDropdown.selectOption({ value: 'priceDesc' });

    // Wait for items to be sorted
    await page.waitForSelector('[data-testid="item-name"]');

    // Verify the item prices are descending
    const items = await page.locator('[data-testid="item"]').all();
    let previousPrice = Infinity;

    for (const item of items) {
      const priceText = await item.locator('[data-testid="item-price"]').innerText();
      const price = parseFloat(priceText.replace('$', ''));
      expect(price).toBeLessThanOrEqual(previousPrice);
      previousPrice = price;
    }
  });

  test('should display "No results found" when searching for an item with no expected match (PSF-26)', async ({ page }) => {
    // Search for an item search tearm with no results
    const searchTerm = "itemwithnoresults";
    await page.fill('[data-testid="search-input"]', searchTerm);

    // Verify that the "No results found" message is displayed
    await page.waitForSelector('[data-testid="no-results-message"]');
    const noResultsMessage = await page.locator('[data-testid="no-results-message"]').innerText();
    expect(noResultsMessage).toBe('No results found');
  });

  test('should display "No results found" with a valid item name filtered by wrong category option (PSF-27)', async ({ page }) => {
    // Search for a valid item name
    const searchTerm = 'Laptop';
    await page.fill('[data-testid="search-input"]', searchTerm);

    // Set the category filter to an invalid option
    const categoryDropdown = page.locator('[data-testid="filter-category-dropdown"]');
    await categoryDropdown.selectOption({ value: 'art' });

    // Verify that the "No results found" message is displayed
    await page.waitForSelector('[data-testid="no-results-message"]');
    const noResultsMessage = await page.locator('[data-testid="no-results-message"]').innerText();
    expect(noResultsMessage).toBe('No results found');
  });

  test('should display "No results found" with a valid item name and out of price range option (PSF-28)', async ({ page }) => {
    // Search for a valid item name
    const searchTerm = 'Laptop';
    await page.fill('[data-testid="search-input"]', searchTerm);

    // Set the price range filter to an invalid option
    const priceRangeDropdown = page.locator('[data-testid="filter-price-range-dropdown"]');
    await priceRangeDropdown.selectOption({ value: '0,100' });

    await page.waitForSelector('[data-testid="no-results-message"]');
    const noResultsMessage = await page.locator('[data-testid="no-results-message"]').innerText();
    expect(noResultsMessage).toBe('No results found');
  });

  test('should display "No results found" with a valid item name and wrong >= rating filter option (PSF-29)', async ({ page }) => {
    // Search for a valid item name
    const searchTerm = '$NVDA';
    await page.fill('[data-testid="search-input"]', searchTerm);

    // Set the rating filter to an invalid option
    const ratingDropdown = page.locator('[data-testid="filter-rating-dropdown"]');
    await ratingDropdown.selectOption({ value: '3' });

    // Wait for the filter to apply and verify "No results found" message
    await page.waitForSelector('[data-testid="no-results-message"]');
    const noResultsMessage = await page.locator('[data-testid="no-results-message"]').innerText();
    expect(noResultsMessage).toBe('No results found');
  });
});