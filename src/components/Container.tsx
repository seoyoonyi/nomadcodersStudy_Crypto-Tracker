import styled from 'styled-components';
import { IChildrenType } from '../types/interface';

const ContainerLayout = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

export const Container = ({ children }: IChildrenType) => {
	return <ContainerLayout>{children}</ContainerLayout>;
};
