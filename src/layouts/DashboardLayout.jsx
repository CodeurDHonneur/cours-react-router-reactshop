import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'


function DashboardLayout() {
  return (
    <div className='dashboardLayout'>
      <Sidebar />
        <main className='dashboardMain'>
            <Outlet />
        </main>
    </div>
  )
}

export default DashboardLayout