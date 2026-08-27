import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-100 text-typography-100 selection:bg-primary-500 selection:text-white font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
