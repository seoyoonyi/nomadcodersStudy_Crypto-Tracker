import { ArrowBigDown, ArrowBigUp, Loader } from 'lucide-react';
import { useQuery } from 'react-query';
import { useOutletContext, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinHistory, fetchCoinTickers } from '../api/api';
import { IHistorical } from './Chart';

const PriceItem = styled.div`
	margin-top: 10px;
	margin-bottom: 100px;
	border-radius: 4px;
	background-color: rgba(0, 0, 0, 0.1);
`;

const PriceCotainer = styled.div`
	padding: 20px 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PriceTitle = styled.h3`
	margin-bottom: 10px;
	line-height: 1.2;
	font-size: 18px;
	text-transform: uppercase;
	span {
		display: block;
	}
`;

const PriceBox = styled.div`
	text-align: center;
	& + & {
		margin-left: 50px;
	}
`;

const PriceChart = styled.div`
	margin-bottom: 12px;
`;

interface priceProps {
	coinId: string;
}

export const Price = () => {
	const { coinId } = useOutletContext<priceProps>();
	const { isLoading, data } = useQuery<IHistorical[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		},
	);
	return (
		<PriceItem>
			{isLoading ? (
				<Loader>Loading price...</Loader>
			) : (
				<PriceCotainer>
					<PriceBox>
						<PriceTitle>
							<span>⚫️</span>
							<span>Time</span>
						</PriceTitle>
						{data?.map((price) => (
							<PriceChart key={price.time_close}>
								{new Date(price.time_close).toISOString().slice(0, 19).split('1970-01-20T')}
							</PriceChart>
						))}
					</PriceBox>
					<PriceBox>
						<PriceTitle>
							<span>🔴</span>
							<span>price high</span>
						</PriceTitle>
						{data?.map((price) => (
							<PriceChart key={price.high}>{price.high}</PriceChart>
						))}
					</PriceBox>
					<PriceBox>
						<PriceTitle>
							<span>🔵</span>
							<span>price low</span>
						</PriceTitle>
						{data?.map((price) => (
							<PriceChart key={price.low}>{price.low}</PriceChart>
						))}
					</PriceBox>
				</PriceCotainer>
			)}
		</PriceItem>
	);
};
