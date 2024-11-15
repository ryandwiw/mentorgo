
import Footer from '@/Components/Main/Footer'
import Navbar from '@/Components/Main/Navbar/Index'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout
