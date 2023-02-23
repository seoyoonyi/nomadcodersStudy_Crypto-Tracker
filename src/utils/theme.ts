import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
	colors: {
		titleColor: '#121212',
		bgColor: '#b8b8b8',
	},
};

export const lightTheme: DefaultTheme = {
	colors: {
		titleColor: '#b8b8b8',
		bgColor: '#121212',
	},
};

export const theme = {
	lightTheme,
	darkTheme,
};
