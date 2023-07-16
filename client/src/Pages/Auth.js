import React, { useState } from 'react';
import { TbSocial } from 'react-icons/tb';
import { UseStateContext } from '../Context/useStateContext';


function Auth() {
    const [showLogin, setShowLogin] = useState(true);
    const { registerInfo, 
        updateRegisterInfo, 
        registerUser,
        updateLoginInfo,
        loginInfo,
        loginUser 
    } = UseStateContext()

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    
    return (
        <div>
            <div className="bg-neutral-200 min-h-screen flex items-center justify-center">
                <div className="bg-white flex rounded-2xl shadow-lg p-5 items-center max-w-3xl">
                    <div className="md:w-1/2 px-8 md:px-16 ">
                        <div className='flex items-center gap-2 mb-10'> 
                            <TbSocial className='w-10 h-8'/><span className='font-bold text-2xl' >SocialSync</span>
                        </div>
                        <h2 className="font-bold text-2xl">
                            {showLogin ? 'Login' : 'Sign Up'}
                        </h2>
                            {!showLogin ? (
                                <form onSubmit={registerUser} className="flex flex-col gap-4 mt-4">
                                    <input
                                        className="p-2 rounded-xl border outline-none"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={(e) =>
                                            updateRegisterInfo({
                                                ...registerInfo,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                    className="p-2 rounded-xl border outline-none"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) =>
                                        updateRegisterInfo({
                                            ...registerInfo,
                                            email: e.target.value,
                                        })
                                    }
                                    />
                                    <div className="relative">
                                        <input
                                            className="p-2 rounded-xl border w-full outline-none"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            onChange={(e) =>
                                                updateRegisterInfo({
                                                    ...registerInfo,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="gray"
                                            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </div>
                                    <button className=" rounded-xl bg-black text-white py-2 hover:scale-105 duration-300 mb-5">
                                        Signup
                                    </button>
                                </form>
                            ): (
                                <form onSubmit={loginUser} className="flex flex-col gap-4 mt-4">
                                    <input
                                    className="p-2 rounded-xl border outline-none"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) =>
                                        updateLoginInfo({
                                            ...loginInfo,
                                            email: e.target.value,
                                        })
                                    }
                                    />
                                    <div className="relative">
                                        <input
                                            className="p-2 rounded-xl border w-full outline-none"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            onChange={(e) =>
                                                updateLoginInfo({
                                                    ...loginInfo,
                                                    password: e.target.value,
                                                })
                                            }
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="gray"
                                            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </div>
                                    <button className=" rounded-xl bg-black text-white py-2 hover:scale-105 duration-300 mb-5">
                                        Login
                                    </button>
                                </form>
                            )}


                        <div className="mt-3 text-xs flex justify-between items-center">
                            <p>
                                {showLogin
                                    ? "Don't have an account?"
                                    : 'Already have an account?'
                                }
                            </p>
                            <button
                                onClick={toggleForm}
                                className="py-2 px-5 bg-black text-white border rounded-xl hover:scale-110 duration-300"
                            >
                                {showLogin ? 'Register' : 'Login'}
                            </button>
                        </div>
                    </div>

                    <div className="md:block hidden w-1/2">
                        <img
                            className="rounded-2xl"
                            src="https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
