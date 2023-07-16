import React, { useEffect } from 'react'
import { BiMenuAltLeft, BiPlus } from 'react-icons/bi'
import { NavLink } from 'react-router-dom';

import { UseStateContext } from '../Context/useStateContext'


function Navbar() {
    const { 
        isMenuCollapsed, 
        setIsMenuCollapsed, 
        screenSize,
        setScreenSize
    } = UseStateContext()


    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
    }, [setScreenSize]);

    useEffect(() => {
        if (screenSize <= 900) {
            setIsMenuCollapsed(false);
        } else {
            setIsMenuCollapsed(true);
        }
    }, [screenSize, setIsMenuCollapsed]);
    
    const handleMenu = () => setIsMenuCollapsed(!isMenuCollapsed);
    
    
    return (
        <div className='flex justify-between p-2 md:ml-2 md:mr-6 relative border-b border-gray-300'>
            <div className='flex gap-8 items-center'>
                <button onClick={handleMenu} className='relative text-2xl rounded-full p-2.5 hover:bg-neutral-200 text-indigo-950 '>
                    <BiMenuAltLeft/>
                </button>
            </div>
            <div className='mr-10'>
                <NavLink
                    to="/Compose"
                    className="flex items-center gap-1 border px-6 py-2 rounded-lg bg-stone-950 text-white"
                >
                    <BiPlus className="text-white" />
                    Compose
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
