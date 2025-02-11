'use client';
import { domain } from '@/config';
import HomeMenu from './components/HomeMenu';
import LandingPage from './components/LandingPage';

const Home = () => {
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    const isSubdomain = domain ? host !== domain : false;

    return isSubdomain ? <HomeMenu /> : <LandingPage />;
};

export default Home;
