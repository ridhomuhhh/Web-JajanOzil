import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HeroSection from '../components/HeroSection';
import ProfileSection from '../components/ProfileSection';
import MenuSection from '../components/MenuSection';
import CabangSection from '../components/CabangSection';
import ContactSection from '../components/ContactSection';

const Home = () => (
  <>
    <Navbar />
    <HeroSection />
    <ProfileSection />
    <MenuSection />
    <CabangSection />
    <ContactSection />
    <Footer />
  </>
);

export default Home;
