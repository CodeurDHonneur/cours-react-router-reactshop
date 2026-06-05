import React from 'react'
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

function MainLayout() {
  return (
    <>
      <div className='layout'>

        <Navbar />

        <main className='main'>
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default MainLayout