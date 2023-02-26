import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
	colors: {
		titleColor: '#31302E',
		bgColor: '#F8F7F4',
		accentColor: '#7A5FF5',
	},
};

export const darkTheme: DefaultTheme = {
	colors: {
		titleColor: '#ccc',
		bgColor: '#1E1E22',
		accentColor: '#EB44CF',
	},
};

export const theme = {
	lightTheme,
	darkTheme,
};
