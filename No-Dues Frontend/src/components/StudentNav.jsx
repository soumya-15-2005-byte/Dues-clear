import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
    {
        link: "/student",
        title:"Profile"
    },
    {
        link: "/student-dues",
        title: "Dues"
    },
    {
        link: "/student-request",
        title: "Requests"
    },
]

const StudentNav = ({ label }) => {
    const navigator = useNavigate()
    const handleClick = () => {
        localStorage.clear();
        navigator('/');
    }
    return (
        <>
            <header className='bg-slate-200 shadow-md'>
                <div className='flex justify-between items-center max-w-7xl mx-auto p-4'>
                    <div className='flex items-center'>
                        <Link to='/student'>
                            <h1 className='font-bold text-lg md:text-2xl flex flex-wrap'>
                                <span className='text-slate-500'>EZ</span>
                                <span className='text-slate-700'>DUES</span>
                            </h1>
                        </Link>
                    </div>
                    <div className='text-2xl font-semibold text-slate-800'>
                        {label}
                    </div>
                    <div className='flex items-center'>
                        {links.map((linkObj,ind) => (
                            <Link
                                to={linkObj.link}
                                key={ind}
                                className='px-4 text-gray-700 font-medium hover:text-blue-500 transition duration-150 ease-in-out'
                            >
                                {linkObj.title}
                            </Link>
                        ))}
                        <div className='ml-2 cursor-pointer hover:' onClick={handleClick}>
                            <LogoutIcon/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default StudentNav;
