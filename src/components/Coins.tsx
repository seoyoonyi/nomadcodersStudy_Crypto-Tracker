import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api/api';
import { Container } from './Container';

const CoinsList = styled.ul``;

const Coin = styled.li`
	border: 1px solid ${(props) => props.theme.colors.titleColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.colors.accentColor};
		}
	}
`;

export const Loader = styled.span`
	display: block;
	text-align: center;
	padding: 50px 0;
	font-family: 'Gajraj One', cursive;
	font-size: 20px;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

export const Coins = () => {
	const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

	return (
		<Container>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link to={`coin/${coin.id}`}>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
};
