import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';

import { useOutletContext, useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api/api';

interface IHistorical {
	time_open: string;
	time_close: number;
	open: number;
	high: number;
	close: string;
	volume: number;
	market_cap: number;
}

interface ChartProps {
	coinId: string;
}

export const Chart = () => {
	const { coinId } = useOutletContext<ChartProps>();
	const { isLoading, data } = useQuery<IHistorical[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId),
		{
			refetchInterval: 10000,
		},
	);
	return (
		<div>
			<h2>차트차트!!</h2>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: 'Price',
							data: data?.map((price) => Number(price.close)) as number[],
						},
					]}
					options={{
						theme: {
							mode: 'dark',
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: 'transparent',
						},
						grid: { show: false },
						stroke: {
							curve: 'smooth',
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: 'datetime',
							categories: data?.map((price) => (price.time_close as any) * 1000 ?? []),
						},
						fill: {
							type: 'gradient',
							gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
						},
						colors: ['#0fbcf9'],
						tooltip: {
							y: {
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
};
