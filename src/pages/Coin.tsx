import { useParams, Link, Outlet } from 'react-router-dom';
import { Price } from './Price';

export const Coin = () => {
	const { coinId } = useParams();
	return (
		<>
			<h2>코인</h2>
			<Link to="/">되돌아가기</Link>
			<Link to={`price`}>가격</Link>
			<Link to={`chart`}>차트</Link>
			<Outlet />
		</>
	);
};
