import { test, expect } from '@playwright/test';

test('should have title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Data Overlay/);
});

test('should be able to switch between Population and GDP', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Population toggle is seleted
  const checkedRadioButton = page.getByRole('radio', {checked: true});
  const parent = page.locator('css=.toggle-container').filter({ has: checkedRadioButton });
  await expect(parent).toHaveText('Population');

  // Displays Population legends
  // I'm aware this assertion is not the best way to do it but leave it as it is for now
  await expect(page.getByRole('heading')).toHaveText('Population');
  await expect(page.getByRole('paragraph')).toHaveText('Estimated total population');

  // Select GDP
  const gdpRadioButton = page.locator('css=.toggle-container').filter({ hasText: 'GDP' });
  gdpRadioButton.click();

  // Displays GDP legends
  // I'm aware this assertion is not the best way to do it but leave it as it is for now
  await expect(page.getByRole('heading')).toHaveText('GDP');
  await expect(page.getByRole('paragraph')).toHaveText('Estimate total GDP in millions of dollars');
});
