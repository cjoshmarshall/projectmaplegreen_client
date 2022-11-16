
import React from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { faEye, faEyeSlash, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import axios from '../../api/axios'
import { LOGIN } from '../../redux/authSlice'
import { emailValidator, passwordValidator } from '../../utils/formValidator'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'

function Login() {

    const [input, setInput]: any = React.useState({
        email: '',
        password: ''
    })

    const [inputError, setInputError]: any = React.useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading]: any = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible]: any = React.useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((prev: any) => ({ ...prev, [name]: value }))
        setInputError((prev: any) => ({ ...prev, [name]: '' }))
    }

    const handleFocus = (e: any) => {
        const { name, value } = e.target
        if (value === '') return setInputError((prev: any) => ({ ...prev, [name]: `${capitalizeFirstLetter(name)} is required` }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post('/auth/login', input)
            dispatch(LOGIN(res.data))
            setIsLoading(false)
            if (res) return navigate('/')
        } catch (err: any) {
            console.log(err)
            setIsLoading(false)
            if (err.response.data === 'User not found') { setInputError({ email: 'Email is wrong', password: 'Password is wrong' }) }
            if (err.response.data === 'Password is wrong') { setInputError({ password: 'Password is wrong' }) }
        }
    }

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {isLoading &&
                <div className='absolute h-screen w-full bg-black bg-opacity-70'>
                    <div className='flex m-auto h-screen w-full place-content-center'>
                        <div className='m-auto'>
                            <Loader isCenter isLoaderText={false} variant={1} isCol />
                        </div>
                    </div>
                </div>
            }
            <div className='login h-screen '>
                <form className='flex m-auto p-2 w-[90vh] h-full'>
                    <div className='m-auto p-6 bg-gray-200 rounded w-full'>
                        <div className='flex justify-between'>
                            <h1 className='text-4xl'>
                                Login
                            </h1>
                            <div className='flex'>
                                <span className='m-auto px-2 py-1'>
                                    <FontAwesomeIcon icon={faCanadianMapleLeaf} size='3x' className='text-green' />
                                </span>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex flex-col my-8'>
                                <label className='text-base'>Email</label>
                                <input className='px-2 py-1.5 rounded' type='email' name='email' value={input.email} onChange={handleChange} onBlur={handleFocus} required />
                                <span className='text-sm italic text-red-700'>{inputError.email}</span>
                            </div>
                            <div className='flex flex-col my-8'>
                                <label className='text-base'>Password</label>
                                <div className='flex flex-row w-full'>
                                    <input className='w-full px-2 py-1.5 rounded-l' type={isPasswordVisible ? 'true' : 'password'} name='password' value={input.password} onChange={handleChange} onBlur={handleFocus} required />
                                    {!isPasswordVisible && <FontAwesomeIcon fixedWidth icon={faEye} size={'lg'} className={'px-3 py-2 bg-white rounded-r cursor-pointer'} onClick={() => { setIsPasswordVisible(true) }} />}
                                    {isPasswordVisible && <FontAwesomeIcon fixedWidth icon={faEyeSlash} size={'lg'} className={'px-3 py-2 bg-white rounded-r cursor-pointer'} onClick={() => { setIsPasswordVisible(false) }} />}
                                </div>
                                <span className='text-sm italic text-red-700'>{inputError.password}</span>
                            </div>
                        </div>
                        <div className='my-4 text-center'>
                            For support, contact <i>admin@gmail.com</i>
                        </div>
                        <div className='flex justify-center'>
                            <Button children='LOGIN' className='' onClick={handleSubmit} />
                        </div>
                        <div className='w-fit m-auto mt-4 text-base text-center hover:underline transition-all cursor-pointer'>
                            <Link to='/signup'>
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )
}

export default Login