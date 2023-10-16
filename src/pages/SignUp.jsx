import { useEffect, useState } from 'react';
import viteIcon from '../../public/vite.svg';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalVariables } from '../store/GlobalVariables';

export const SignUp = () => {

    const [userEmail, setUserEmail] = useState('')
    const [UserNameInput, setUserNameInput] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const navigate = useNavigate()


    const sendData = async (data) => {
        console.log('data', data)
        const response = await fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (response.status === 201) {
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
                navigate('/login')
            }, 1000);
        }
        else if (response.status === 400) {
            toast.error('username or email already exist', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
                theme: "dark",
            });
            setUserEmail('')
            setUserNameInput('')
            setUserPassword('')
        }

        const body = await response.json();
        return body;
    }
    const handleSignUp = (e) => {
        if (e.target.id === 'emailInput') {
            setUserEmail(e.target.value)
        }
        else if (e.target.id === 'userNameInput') {
            setUserNameInput(e.target.value)
        }
        else if (e.target.id === 'passInput') {
            setUserPassword(e.target.value)
        }
    }

    const handleSubmit = () => {
        const data = {
            "username": UserNameInput,
            "password": userPassword,
            "email": userEmail,
            "playlists": []
        }
        const response = sendData(data)
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
                        Sign up to start
                    </strong>
                    <div className='flex flex-col px-20 gap-4 mt-16'>
                        <div>
                            <strong className='flex justify-start text-sm'>
                                Email
                            </strong>
                            <input id='emailInput' value={userEmail} onChange={handleSignUp} type="text" placeholder='Email'
                                className='w-full h-10 p-2 bg-[#121212] rounded-lg text-white border border-white mt-2' />
                        </div>

                        <div>
                            <strong className='flex justify-start text-sm'>
                                UserName
                            </strong>
                            <input id='userNameInput' value={UserNameInput} onChange={handleSignUp} type="text" placeholder='Username'
                                className='w-full h-10 p-2 bg-[#121212] rounded-lg text-white border border-white mt-2' />
                        </div>

                        <div>
                            <strong className='flex justify-start text-sm'>
                                Password
                            </strong>
                            <input id='passInput' value={userPassword} onChange={handleSignUp} type="password" placeholder='Password' className='w-full h-10 p-2 bg-[#121212] rounded-lg text-white border border-white mt-2' />
                        </div>

                        <div className='flex px-24'>
                            <div className='flex justify-center items-center w-full h-10 bg-[#1FDF64] rounded-full text-black font-bold text-lg mt-2 cursor-pointer hover:scale-105' onClick={handleSubmit}>
                                Next
                            </div>
                        </div>
                    </div>
                    <div className='h-[1px] mt-10 opacity-50 mx-16 bg-[#979ca0]' />
                    <div className='flex justify-center gap-2 mt-5'>
                        <p className='text-[#979ca0]'>
                            Already have an account?
                        </p>
                        <Link to='/login'>
                            <strong className='text-white border-b border-white hover:text-[#1FDF64]'>
                                Log in here.
                            </strong>
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}
