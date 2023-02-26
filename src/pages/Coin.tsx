import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useParams, Link, Outlet, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api/api';
import { Loader } from '../components/Coins';
import { Container } from '../components/Container';
import { Header } from '../components/Header';

const CoinNav = styled.div`
	position: relative;
	margin: 10px 0 30px;
	display: flex;
	justify-content: cneter;
`;

const IconBox = styled(Link)`
	position: absolute;
`;

const CoinTitle = styled.h2`
	margin: 0 auto;
	font-size: 25px;
	text-transform: uppercase;
	color: ${(props) => props.theme.colors.titleColor};
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.2);
	padding: 20px 20px;
	border-radius: 4px;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: calc(100% / 3);
	text-transform: uppercase;
	span:first-child {
		font-size: 10px;
		font-weight: lighter;
		margin-bottom: 5px;
	}
`;

const Menu = styled(Overview)`
	margin-top: 40px;
	padding: 0px;
	background-color: transparent;
`;

const MenuItem = styled(Link)<{ $active?: boolean }>`
	width: 100%;
	height: 100%;
	padding: 10px 10px;
	border-radius: 4px;
	background-color: rgba(0, 0, 0, 0.2);
	color: ${(props) =>
		props.$active ? props.theme.colors.accentColor : props.theme.colors.titleColor};
	text-transform: uppercase;
	& + & {
		margin-left: 10px;
	}
	&:hover {
		color: ${(props) => props.theme.colors.accentColor};
	}
`;

const Description = styled.p`
	margin: 20px 0px;
	line-height: 1.3;
	letter-spacing: -0.1px;
	word-break: keep-all;
`;

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
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const { coinId } = useParams<string>();
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () =>
		fetchCoinInfo(String(coinId)),
	);
	const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
		['tickers', coinId],
		() => fetchCoinTickers(String(coinId)),
	);
	const loading = infoLoading || tickersLoading;

	const handleClick = (id: number) => {
		setActiveIndex(id);
	};

	const menuItems = [
		{
			id: 1,
			name: 'chart',
			path: 'chart',
		},
		{
			id: 2,
			name: 'price',
			path: 'price',
		},
	];

	return (
		<>
			<Header />
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<Container>
					<CoinNav>
						<IconBox to="/">
							<ArrowLeft />
						</IconBox>
						<CoinTitle>{coinId || 'Loading...'}</CoinTitle>
					</CoinNav>

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

					<Menu>
						{menuItems.map((item) => (
							<MenuItem
								key={item.id}
								$active={activeIndex === item.id}
								onClick={() => handleClick(item.id)}
								to={item.path}
							>
								{item.name}
							</MenuItem>
						))}
					</Menu>

					<Outlet context={{ coinId }} />
				</Container>
			)}
		</>
	);
};
