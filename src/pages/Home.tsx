import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Coins } from '../components/Coins';
import { Header } from '../components/Header';

export const Home = () => {
	return (
		<>
			<Header />
			<p>안녕하세요 코인입니다!!!</p>
			<hr />
			<Coins />
		</>
	);
};
