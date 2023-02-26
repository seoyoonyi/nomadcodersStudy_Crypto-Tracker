import styled from 'styled-components';
import { darkTheme, lightTheme } from '../utils/theme';

interface ButtonType {
	children: React.ReactNode;
	onClick: () => void;
}

const StyledButton = styled.button`
	/* 공통 스타일 */
	outline: none;
	border: none;
	cursor: pointer;
`;

export const Button = ({ children, ...rest }: ButtonType) => {
	return <StyledButton {...rest}>{children}</StyledButton>;
};
