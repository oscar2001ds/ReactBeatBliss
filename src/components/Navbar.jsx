import React, { useEffect, useRef, useState } from 'react'
import { useGlobalVariables } from '../store/GlobalVariables'
import nextPage from '../assets/icons/nextPage.svg'
import prevPage from '../assets/icons/passPage.svg'
import { Link, useNavigate, } from 'react-router-dom'
import {SearchIcon} from '../assets/icons/SearchIcon.jsx'

export const Navbar = () => {
    const { setPlayState, setUserPlayLists, userName, setUserName, currentUrl,
         nextPageExists, prevPageExists, searchValue, setSearchValue } = useGlobalVariables()
    const navigate = useNavigate()
    const searchInputRef = useRef()

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

    const handleChangue = (e) =>{
        setSearchValue(searchInputRef.current.value)
    }
    const handleSubmit = (e) =>{
        if (e.key === "Enter" || e.type === "click"){
            e.target.blur()      
        }
    }

    return (
        <div className={`flex justify-between items-center px-5 py-3 ${currentUrl.includes('playlist') ?'bg-transparent' :'bg-[#121212]'}`}>
            <div className='flex gap-2 items-center'>
                <div id='prevPage' className={`flex justify-center p-2 items-center w-[30px] h-[30px] rounded-full bg-[#000000] hover:scale-110 ${prevPageExists ? 'opacity-100 cursor-pointer' : 'opacity-40 pointer-events-none'}`} onClick={handleClick}>
                    <div className='w-full h-full bg-contain bg-no-repeat pointer-events-none' style={{ backgroundImage: `url(${prevPage})` }} />
                </div>
                <div id='postPage' className={`flex justify-center p-2 items-center w-[30px] h-[30px] rounded-full bg-[#000000] hover:scale-110 ${nextPageExists ? 'opacity-100 cursor-pointer' : 'opacity-40 pointer-events-none'}`} onClick={handleClick}>
                    <div className='w-full h-full bg-contain bg-no-repeat pointer-events-none' style={{ backgroundImage: `url(${nextPage})` }} />
                </div>
                {
                    currentUrl === '/search'
                        ?
                        <div className='flex items-center justify-center gap-2 ml-2'>
                            <div className={`flex w-[23px] h-[23px] justify-center items-center opacity-60 cursor-pointer text-transparent hover:text-white`} onClick={handleSubmit}>
                                <SearchIcon/>
                            </div>
                            <input type="text" ref={searchInputRef} value={searchValue} onChange={handleChangue} onKeyDown={handleSubmit} placeholder='What do you want to listen to?' className='w-[20vw] flex p-2 justify-start items-center placeholder:text-xs placeholder:text-[#979ca0] rounded-full hover:border border-white bg-[#242424]'>
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
