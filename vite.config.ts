import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base: process.env.BASE_PATH || '',
	plugins: [sveltekit()],
	server: {
	watch: {
	usePolling: true
	
}
}
});
