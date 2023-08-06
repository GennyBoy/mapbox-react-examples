import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 1,
      duration: '10s',
    },
  },
};

export function news() {
	const res = http.get('https://test.k6.io/news.php');

	check(res, {
		'status is 200': (r) => r.status === 200,
	});
}
