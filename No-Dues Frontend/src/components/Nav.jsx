import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Role from '../pages/Filters/Role'
import { Avatar, Button } from '@mui/material'
import logo from '/logo1.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import DepartmentNavbar from './DepartmentVerticalNav'
import LogoutIcon from '@mui/icons-material/Logout';
// import logout from '../service/auth'

const Header = ({ label, isDep, isStud }) => {
    const [view, setView] = useState(false);
    const handleClick = () => {
        setView(!view);
        console.log('clicked');
    }
    return (
        <>
            <header className='bg-slate-200 shadow-md'>
                <div className='flex justify-between items-center max-w-7xl mx-auto p-2'>
                    <div style={{ display: 'flex' }}>
                        {isDep && <div style={{ marginRight: '12px', cursor: 'pointer' }} onClick={handleClick}>
                            <MenuIcon fontSize='large' />
                        </div>}
                        <Link to={localStorage.getItem('userType') == 'department' ? '/department-dashboard' : '/student-dashboard'}>
                            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                                <span className='text-slate-500'>EZ</span>
                                <span className='text-slate-700'>DUES</span>
                            </h1>
                        </Link>
                    </div>
                    <div style={{
                        fontSize: 'xx-large',
                        fontWeight: 600,
                        color: 'slategray'
                    }}>
                        {label}
                    </div>
                    <Avatar alt="Remy Sharp" src={logo} />
                </div>
            </header>
            {view && <DepartmentNavbar />}
        </>
    )
}

export default Header
