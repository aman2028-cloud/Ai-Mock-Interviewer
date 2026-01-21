import React from 'react'
import Header from './_components/Header.jsx';

const Dashboardlayout = ({children}) => {
  return (
    <div>
      <Header />
      <div className='w-full'>
        {children}

      </div>
    </div>
  )
}

export default Dashboardlayout
