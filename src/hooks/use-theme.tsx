import { useCallback, useContext } from 'react';
import { SwitchThemeContext } from '../context/SwitchThemeProvider';

export const useTheme = () => {
	const { ThemeMode, setThemeMode } = useContext(SwitchThemeContext);

	const toggleTheme = useCallback(() => {
		if (ThemeMode === 'light') {
			setThemeMode('dark');
			window.localStorage.setItem('theme', 'dark');
		} else {
			setThemeMode('light');
			window.localStorage.setItem('theme', 'light');
		}
	}, [ThemeMode]);

	return { ThemeMode, toggleTheme };
};
