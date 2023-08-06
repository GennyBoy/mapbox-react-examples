import { chromium } from 'k6/experimental/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
	thresholds: {
    'webvital_largest_content_paint': ['p(90) < 1000'],
    'webvital_first_input_delay{url:https://test.k6.io/}': ['p(90) < 80'],
    'webvital_first_input_delay{url:https://test.k6.io/my_messages.php}': ['p(90) < 100'],
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
    news: {
      executor: 'constant-vus',
      exec: 'news',
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

export function news() {
  const res = http.get('https://test.k6.io/news.php');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
