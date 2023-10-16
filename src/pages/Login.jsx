import { useEffect, useState } from 'react';
import viteIcon from '../../public/vite.svg';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalVariables } from '../store/GlobalVariables';

export const Login = () => {

    const { succesLogin, setSuccesLogin } = useGlobalVariables()
    const [usernameInput, setUsernameInput] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    useEffect(() => {

        if (succesLogin) {
            console.log('localStorageId', localStorage.getItem('userId'),typeof(localStorage.getItem('userId')))
            console.log('localStorageName', localStorage.getItem('userName'),typeof(localStorage.getItem('userName')))
            console.log('localStoragePlayLists', localStorage.getItem('userPlayLists'),typeof(localStorage.getItem('userPlayLists')))
            
            console.log('succesLogin')
            toast.success('succes!', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                theme: "dark",
            });
            setTimeout(() => {
                setSuccesLogin(null)
                navigate('/')
            }, 1000);

        }

        else if (succesLogin === false) {
            console.log('errorLogin')
            console.log('username', usernameInput, 'password', password)
            toast.error('username or password incorrect', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                theme: "dark",
            });
            setUsernameInput('')
            setPassword('')
            setSuccesLogin(null)
        }


    }, [succesLogin]);

    const handleSubmit = async () => {
        fetch('http://127.0.0.1:8000/api/users').
            then(response => response.json()).
            then(data => {
                const user = data.find((user) => (user.username === usernameInput || user.email === usernameInput) && user.password === password)
                if (user) {
                    setSuccesLogin(true)
                    localStorage.setItem('userId', user.id)
                    localStorage.setItem('userName', user.username)
                    localStorage.setItem('userPlayLists', JSON.stringify(user.playlists))
                }
                else {
                    setSuccesLogin(false)
                }
            })
    }

    const handleLogin = (e) => {
        if (e.target.id === 'userInput') {
            setUsernameInput(e.target.value)
        }
        else if (e.target.id === 'passInput') {
            setPassword(e.target.value)
        }
    }



    return (
        <div className="w-screen h-screen flex flex-col">
            <div className="flex justify-start items-center gap-2 p-6 bg-black">
                <img src={`${viteIcon}`} alt="principalIcon"
                    style={{
                        height: '50px',
                        width: '50px',
                        backgroundSize: 'cover',
                    }} />
                <h1 className="text-2xl font-bold text-white">BeatBliss</h1>
            </div>
            <div className='flex flex-grow justify-center  bg-gradient-to-b from-[#191919] to-[#070707]'>
                <div className='mt-5 flex flex-col  w-[40vw] bg-black rounded-xl'>
                    <strong className='text-5xl mt-20 flex justify-center'>
                        Log in to BeatBliss
                    </strong>
                    <div className='flex flex-col px-20 gap-4 mt-16'>
                        <div>
                            <strong className='flex justify-start text-sm'>
                                Email address or username
                            </strong>
                            <input id='userInput' value={usernameInput} onChange={handleLogin} type="text" placeholder='Email or username'
                                className='w-full h-10 p-2 bg-[#121212] rounded-lg text-white border border-white mt-2' />
                        </div>

                        <div>
                            <strong className='flex justify-start text-sm'>
                                Password
                            </strong>
                            <input id='passInput' value={password} onChange={handleLogin} type="password" placeholder='Password' className='w-full h-10 p-2 bg-[#121212] rounded-lg text-white border border-white mt-2' />
                        </div>

                        <div className='flex px-24'>
                            <div className='flex justify-center items-center w-full h-10 bg-[#1FDF64] rounded-full text-black font-bold text-lg mt-2 cursor-pointer hover:scale-105' onClick={handleSubmit}>
                                Log in
                            </div>
                        </div>
                    </div>
                    <div className='h-[1px] mt-10 opacity-50 mx-16 bg-[#979ca0]' />
                    <div className='flex justify-center gap-2 mt-5'>
                        <p className='text-[#979ca0]'>
                            Don't have an account?
                        </p>
                        <Link to='/sign-up/1'>
                            <strong className='text-white border-b border-white hover:text-[#1FDF64]'>
                                Sign up for BeatBliss
                            </strong>
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
