import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
export default function RootLayout() {
  const[thirdnavisopen, setIsopen]=useState(false);

  return (
    <div>
      <Navbar thirdnavisopen={thirdnavisopen} setIsopen={setIsopen} />
      <main>
        <Outlet thirdnavisopen={thirdnavisopen} setIsopen={setIsopen}/>
      </main>
      <Footer/>
      
    </div>
  )
}
