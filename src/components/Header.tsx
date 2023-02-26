import styled from 'styled-components';
import { useTheme } from '../hooks/use-theme';
//
import { Button } from './Button';
import { Container } from './Container';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 110px;
`;

const Logo = styled.h1`
	font-size: 30px;
	font-family: 'Gajraj One', cursive;
	letter-spacing: 1px;
`;

const ModeButton = styled(Button)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	border-radius: 100%;
	font-size: 20px;
	background: transparent;
	transition: all 0.1s;

	&:hover {
		background: #4d4d4d29;
	}
`;

export const Header = () => {
	const { ThemeMode, toggleTheme } = useTheme();
	return (
		<header>
			<Container>
				<Row>
					<Logo>
						<Link to="/">Coin Tracker</Link>
					</Logo>
					<ModeButton
						onClick={toggleTheme}
						children={ThemeMode === 'light' ? <Moon /> : <Sun color="white" />}
					/>
				</Row>
			</Container>
		</header>
	);
};
