import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../components/Container';
import { Header } from '../components/Header';

const Row = styled.div`
	margin-top: 100px;
	display: flex;
	align-items: center;
	flex-direction: column;
	text-align: center;
`;
const NotFoundNumber = styled.h2`
	margin-bottom: 30px;
	font-size: 80px;
`;

const NotFoundTitle = styled.h2`
	margin-bottom: 10px;
	font-size: 30px;
`;

const NotFoundText = styled.p`
	margin-bottom: 30px;
	line-height: 1.2;
`;

const NotFoundButton = styled(Link)`
	padding: 10px 20px;
	border: 1px solid gray;
	border-radius: 4px;
`;

export const NotFound = () => {
	return (
		<>
			<Container>
				<Row>
					<NotFoundNumber>404</NotFoundNumber>
					<NotFoundTitle>요청하신 페이지를 찾을 수 없습니다.</NotFoundTitle>
					<NotFoundText>
						불편을 드려 죄송합니다.
						<br /> 확인 후 다시 시도해주세요.
					</NotFoundText>

					<NotFoundButton to="/">홈으로 가기</NotFoundButton>
				</Row>
			</Container>
		</>
	);
};
