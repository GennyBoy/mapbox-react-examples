import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    topPage: {
      executor: 'constant-vus',
      exec: 'topPage',
      vus: 1,
      duration: '10s',
    },
  },
};

export function topPage() {
	const res = http.get('http://localhost:3000/');

	check(res, {
		'status is 200': (r) => r.status === 200,
	});
}
