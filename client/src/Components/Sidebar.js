import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { TbSocial } from 'react-icons/tb';
import { ImCalendar } from 'react-icons/im';
import { IoAnalyticsSharp, IoShareSocialSharp } from 'react-icons/io5';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { UseStateContext } from '../Context/useStateContext'


function Sidebar() {
    const { isMenuCollapsed, setIsMenuCollapsed, screenSize, signOutUser } = UseStateContext()

    const handleCloseSideBar = () => {
        if (isMenuCollapsed !== undefined && screenSize <= 900) {
            setIsMenuCollapsed(false)
        }
    };
    
    const links = [
        {
            links: [
                {
                    name: 'Schedule',
                    icon: <ImCalendar/>,
                },
                {
                    name: 'Platforms',
                    icon: <IoShareSocialSharp/>,
                },
                {
                    name: 'Analytics',
                    icon: <IoAnalyticsSharp/>,
                },
                {
                    name: 'Settings',
                    icon: <FiSettings/>,
                },
            ],
        }
    ]
        

    return (
        <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-stone-950 ">
            {isMenuCollapsed && (
                <div className='ml-5'>
                    <div>
                        <Link to='/' 
                            onClick={handleCloseSideBar}
                            className='items-center gap-1.5 ml-3 mt-5 flex text-xl font-extrabold tracking-tight text-neutral-200'
                        >
                            <TbSocial className='w-10 h-8'/><span className='text-neutral-200' >SocialSync</span>
                        </Link>
                        
                    </div>
                    <div className='mt-16'>
                        {links.map((item) => (
                            <div>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={`/${link.name}`}
                                        key={link.name}
                                        onClick={handleCloseSideBar}
                                        className={({ isActive }) => (isActive ? 
                                            'flex items-center gap-5 pl-4 pt-2.5 pb-2.5 rounded-lg  text-black font-bold text-xl m-2 bg-white' 
                                            : 
                                            'flex items-center gap-5 pl-4 pt-2.5 pb-2.5 rounded-lg text-neutral-400 hover:text-black hover:bg-white m-2 text-lg'
                                        )}
                                    >
                            
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>

                    <button 
                        className="flex items-center mt-48 mx-12 text-red-600 gap-1 cursor-pointer"
                        onClick={signOutUser}
                    >
                        <FiLogOut/>
                    <span className="font-semibold">Logout</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Sidebar
