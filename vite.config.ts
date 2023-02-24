import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/nomadcoderChallenge_Crypto-Tracker/',
	// define: {
	// 	'process.env': {},
	// },
});
