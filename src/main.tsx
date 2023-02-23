import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//
import App from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Coin } from './pages/Coin';
import { Price } from './pages/Price';
import { Chart } from './pages/Chart';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: 'coin/:coinId',
				element: <Coin />,
				children: [
					{ path: 'price', element: <Price /> },
					{ path: 'chart', element: <Chart /> },
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
