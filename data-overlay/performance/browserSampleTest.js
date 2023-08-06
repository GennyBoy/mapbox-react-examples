import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';

export const options = {
	thresholds: {
    'webvital_largest_content_paint': ['p(75) < 2500'],
    'webvital_first_input_delay': ['p(75) < 100'],
    'webvital_cumulative_layout_shift': ['p(75) < 0.1'],
  },
  scenarios: {
    displaysDefaultLegends: {
      executor: 'constant-vus',
      exec: 'displaysDefaultLegends',
      vus: 1,
      duration: '10s',
    },
		switchMaps: {
			executor: 'constant-vus',
      exec: 'switchMaps',
      vus: 1,
      duration: '10s',
		},
  },
};

export async function displaysDefaultLegends() {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

		check(page, {
			'Legends header for Population is displayed': page.locator('h2').textContent() === 'Population'
		});
		check(page, {
			'Legends description for Population is displayed': page.locator('p').textContent() === 'Estimated total population'
		})
  } finally {
    page.close();
    browser.close();
  }
}

export async function switchMaps() {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

		await page.locator("//div[text()='GDP']").click();

		check(page, {
			'Legends header for GDP is displayed': page.locator('h2').textContent() === 'GDP'
		});
		check(page, {
			'Legends description for GDP is displayed': page.locator('p').textContent() === 'Estimate total GDP in millions of dollars'
		})
  } finally {
    page.close();
    browser.close();
  }
}
