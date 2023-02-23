import { useCallback, useContext } from 'react';
import { SwitchThemeContext } from '../context/SwitchThemeProvider';

export const useTheme = () => {
	const { ThemeMode, setThemeMode } = useContext(SwitchThemeContext);

	const toggleTheme = useCallback(() => {
		if (ThemeMode === 'light') {
			setThemeMode('dark');
			window.localStorage.setItem('theme', 'dark');
			console.log('다크로 되어라');
		} else {
			setThemeMode('light');
			window.localStorage.setItem('theme', 'light');
			console.log('라이트로 되어라');
		}
	}, [ThemeMode]);

	return { ThemeMode, toggleTheme };
};
