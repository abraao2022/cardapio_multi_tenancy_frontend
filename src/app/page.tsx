'use client';
export const domain = process.env.NEXT_PUBLIC_DOMAIN;
import { Box, Container, Typography } from '@mui/material';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import MenuItem from './components/MenuItem';
import categoriesService from '../../services/categoriesService';
import productsService from '../../services/productsService';
import { useEffect, useState } from 'react';
import HomeMenu from './components/HomeMenu';
import LandingPage from './components/LandingPage';

const Home = () => {
    const host = typeof window !== 'undefined' ? window.location.hostname : '';

    const isSubdomain = host !== domain;
    return isSubdomain ? <HomeMenu /> : <LandingPage />;
};

export default Home;
