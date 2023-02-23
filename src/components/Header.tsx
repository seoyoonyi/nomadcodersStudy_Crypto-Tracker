import { useTheme } from '../hooks/use-theme';
import { Button } from './Button';

export const Header = () => {
	const { ThemeMode, toggleTheme } = useTheme();
	return (
		<header>
			<Button onClick={toggleTheme} text={ThemeMode === 'dark' ? '🌚' : '🌝'} />
		</header>
	);
};
