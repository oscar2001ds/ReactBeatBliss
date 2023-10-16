import React, { useEffect, useState } from 'react'
import { useGlobalVariables } from '../store/GlobalVariables'
import nextPage from '../assets/icons/nextPage.svg'
import prevPage from '../assets/icons/passPage.svg'
import { Link, useNavigate, } from 'react-router-dom'


export const Navbar = () => {
    const { setPlayState, setUserPlayLists, userName, setUserName, currentUrl } = useGlobalVariables()
    const navigate = useNavigate()


    const handleClick = (e) => {
        if (e.target.id === 'prevPage') {
            window.history.back()
        }
        else if (e.target.id === 'postPage') {
            window.history.forward()
        }
        else if (e.target.id === 'signUp') {
            setPlayState(false)
            setTimeout(() => { navigate('/sign-up/1') }, 200);

        }
        else if (e.target.id === 'login') {
            setPlayState(false)
            setTimeout(() => { navigate('/login') }, 200);
        }
        else if (e.target.id === 'logout') {
            localStorage.removeItem('userName')
            localStorage.removeItem('userPlayLists')
            setUserPlayLists([])
            setUserName('')
            navigate('/')
        }
    }

    return (
        <div className="flex justify-between items-center p-5 bg-[#121212]">
            <div className='flex gap-2 items-center'>
                <div id='prevPage' className={`flex justify-center p-2 items-center w-[30px] h-[30px] rounded-full bg-[#000000] hover:scale-110 ${window.history.state.idx > 0 ? 'opacity-100 cursor-pointer' : 'opacity-40 pointer-events-none'}`} onClick={handleClick}>
                    <div className='w-full h-full bg-contain bg-no-repeat pointer-events-none' style={{ backgroundImage: `url(${prevPage})` }} />
                </div>
                <div id='postPage' className={`flex justify-center p-2 items-center w-[30px] h-[30px] rounded-full bg-[#000000] hover:scale-110 ${window.history.state.idx < window.history.length - 1 ? 'opacity-100 cursor-pointer' : 'opacity-40 pointer-events-none'}`} onClick={handleClick}>
                    <div className='w-full h-full bg-contain bg-no-repeat pointer-events-none' style={{ backgroundImage: `url(${nextPage})` }} />
                </div>
                {
                    currentUrl === '/search'
                        ?
                        <div className='flex items-center justify-center gap-2 ml-2'>
                            <p className='opacity-60 cursor-pointer'>
                                {'🔍 '}
                            </p>
                            <input type="text" placeholder='What do you want to listen to?' className='w-[20vw] flex p-2 justify-start items-center placeholder:text-xs placeholder:text-[#979ca0] rounded-full hover:border border-white bg-[#242424]'>
                            </input>
                        </div>

                        : ''

                }
            </div>

            <div className={`text-white font-bold text-lg ${userName === '' ? 'hidden' : 'hidden xl:flex'}`}>
                <h1>
                    Welcome
                </h1>
                <h1 className='ml-2 text-[#1FDF64]' style={{ textTransform: 'capitalize' }}>
                    {userName}
                </h1>
            </div>
            {
                userName === ''
                    ?
                    <div className='flex gap-2'>
                        <div id='signUp' className='p-3 flex justify-center items-center rounded-full w-[100px] bg-black font-bold text-sm text-[#979ca0] hover:scale-110 hover:text-white cursor-pointer' onClick={handleClick}>
                            Sign Up
                        </div>
                        <div id='login' className='p-3 flex justify-center items-center rounded-full w-[100px] bg-white font-bold text-sm text-black hover:scale-110 cursor-pointer ' onClick={handleClick}>
                            Log in
                        </div>
                    </div>
                    :

                    <div className='flex gap-2'>
                        <div id='logout' className='p-3 flex justify-center items-center rounded-full w-[100px] bg-white font-bold text-sm text-black hover:scale-110 cursor-pointer ' onClick={handleClick}>
                            Log out
                        </div>
                    </div>

            }

        </div>
    )
}
