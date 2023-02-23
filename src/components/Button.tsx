import { MouseEventHandler } from 'react';

interface ButtonType {
	text: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ text, onClick }: ButtonType) => {
	return <button onClick={onClick}>{text}</button>;
};
