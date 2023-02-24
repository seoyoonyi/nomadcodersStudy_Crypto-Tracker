import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api/api';

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.colors.titleColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 33%;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;

const Description = styled.p`
	margin: 20px 0px;
`;

interface RouteParams {
	coinId: string;
}
interface RouteState {
	name: string;
}
interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}
interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

export const Coin = () => {
	const { coinId } = useParams<string>();
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () =>
		fetchCoinInfo(String(coinId)),
	);
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(String(coinId)),
	);
	const loading = infoLoading || tickersLoading;
	return (
		<>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<h2>코인</h2>
					<Link to="/">되돌아가기</Link>
					<Title>{coinId || 'Loading...'}</Title>

					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>

					<Link to={`price`}>가격</Link>
					<Link to={`chart`}>차트</Link>
					<Outlet context={{ coinId }} />
				</>
			)}
		</>
	);
};
