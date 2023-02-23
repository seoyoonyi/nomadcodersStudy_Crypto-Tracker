import React, { createContext, useState } from 'react';
import { IChildrenType } from '../types/interface';
import { ThemeProvider as StyledProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../utils/theme';

interface IthemeContextType {
	ThemeMode: string;
	setThemeMode: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: IthemeContextType = {
	ThemeMode: '',
	setThemeMode: () => {},
};
export const SwitchThemeContext = createContext(defaultValue);

export const SwitchThemeProvider = ({ children }: IChildrenType) => {
	const LocalTheme = window.localStorage.getItem('theme') || 'light';
	const [ThemeMode, setThemeMode] = useState(LocalTheme);
	const themeObject = ThemeMode === 'light' ? lightTheme : darkTheme;
	const value = { ThemeMode, setThemeMode };

	return (
		<SwitchThemeContext.Provider value={value}>
			<StyledProvider theme={themeObject}>{children}</StyledProvider>
		</SwitchThemeContext.Provider>
	);
};
