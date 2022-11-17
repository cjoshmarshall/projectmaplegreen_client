import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import './index.css'

function Signup() {


    const navigate = useNavigate()

    const [dateInput, setDateInput]: any = React.useState({
        date: 1,
        month: 1,
        year: 0
    })

    const [input, setInput]: any = React.useState(
        {
            firstname: '',
            lastname: '',
            age: 0,
            gender: '',
            address: {
                state: '',
                city: '',
                area: '',
                pincode: '',
                aadhar: '',
                address1: '',
                address2: '',
            },
            email: '',
            password: '',
            timestamp: moment().format('YYYY-MM-DD'),
            admin: 0
        }
    )
    const [inputError, setInputError]: any = React.useState(
        {
            firstname: '',
            lastname: '',
            age: 0,
            gender: '',
            address: {
                state: '',
                city: '',
                area: '',
                pincode: '',
                aadhar: '',
                address1: '',
                address2: '',
            },
            email: '',
            password: '',
            admin: 0
        }
    )

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((prev: any) => ({ ...prev, [name]: value }))
        setInputError((prev: any) => ({ ...prev, [name]: '' }))
    }

    const handleAddressChange = (e: any) => {
        const { name, value } = e.target
        setInput({ ...input, address: { ...input.address, [name]: value } })
        setInputError((prev: any) => ({ ...prev, [name]: '' }))
    }

    const handleDateChange = (e: any) => {
        const { name, value } = e.target
        setDateInput((prev: any) => ({ ...prev, [name]: value }))
        setInputError((prev: any) => ({ ...prev, [name]: '' }))

    }

    const handleFocus = (e: any) => {
        const { name, value } = e.target
        if (value === '') return setInputError((prev: any) => ({ ...prev, [name]: `${capitalizeFirstLetter(name)} is required` }))
    }

    // console.log(Object.values(dateInput).join('-'), 'date')
    const date = Object.values(dateInput).reverse().join('-')
    // console.log(date, 'new date local')
    const dateString = Object.values(dateInput).reverse().join('-')

    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }


    React.useEffect(() => {
        setInput({ ...input, birthdate: date, age: age })
    }, [dateInput])

    const [isLoading, setIsLoading]: any = React.useState(false)
    const [isPasswordVisible, setIsPasswordVisible]: any = React.useState(false)
    const dispatch = useDispatch()


    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            if (Object.values(input).every((item: any) => input[item] !== '') && Object.keys(input.address).every((item: any) => input.address[item] !== '')) {
                setIsLoading(true)
                const res = await axios.post('/auth/signup', input)
                setIsLoading(false)
                if (res.data) return navigate('/login')
            }
        } catch (err: any) {
            console.log(err)
            if (err.data = 'User Already Exists') {
                setInputError((prev: any) => ({ ...prev, email: `${capitalizeFirstLetter('email')} already exists` }))
                setIsLoading(false)
            }
        }
    }

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    return (
        <>
            {isLoading &&
                <div className='fixed h-full w-full bg-black bg-opacity-70'>
                    <div className='absolute flex m-auto h-full w-full place-content-center'>
                        <div className='m-auto'>
                            <Loader isCenter isLoaderText={false} variant={1} isCol={true} />
                        </div>
                    </div>
                </div>}
            <div className='signup h-full'>
                <div className='flex m-auto px-2 py-4'>
                    <div className='m-auto px-5 py-6 bg-gray-200 rounded'>
                        <form className=''>
                            <h1 className='px-1 text-4xl'>
                                Sign Up
                            </h1>
                            <div className='py-4'>
                                {/* <h2 className='text-xl text-center'>Personal Information</h2> */}
                                <div className='flex w-full'>
                                    <div className='flex flex-col my-2 px-2 w-full'>
                                        <label className='text-base'>First Name</label>
                                        <input className='px-2 py-1.5 rounded' type='text' name='firstname' value={input.firstname} onChange={handleChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.firstname}</span>
                                    </div>
                                    <div className='flex flex-col my-2 px-2 w-full'>
                                        <label className='text-base'>Last Name</label>
                                        <input className='px-2 py-1.5 rounded' type='text' name='lastname' value={input.lastname} onChange={handleChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.lastname}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 px-2 w-full'>
                                    <label className='text-base'>Email</label>
                                    <input className='px-2 py-1.5 rounded' type='email' name='email' value={input.email} onChange={handleChange} onBlur={handleFocus} required />
                                    <span className='text-sm italic text-red-700'>{inputError.email}</span>
                                </div>
                                <div className='flex flex-col my-2 px-2 w-full'>
                                    <label className='text-base'>Password</label>
                                    <div className='flex flex-row w-full'>
                                        <input className='w-full px-2 py-1.5 rounded-l' type={isPasswordVisible ? 'true' : 'password'} name='password' value={input.password} onChange={handleChange} onBlur={handleFocus} required />
                                        {!isPasswordVisible && <FontAwesomeIcon fixedWidth icon={faEye} size={'lg'} className={'px-3 py-2 bg-white rounded-r cursor-pointer'} onClick={() => { setIsPasswordVisible(true) }} />}
                                        {isPasswordVisible && <FontAwesomeIcon fixedWidth icon={faEyeSlash} size={'lg'} className={'px-3 py-2 bg-white rounded-r cursor-pointer'} onClick={() => { setIsPasswordVisible(false) }} />}
                                    </div>
                                    <span className='text-sm italic text-red-700'>{inputError.password}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex flex-col my-2 px-2 w-32'>
                                        <label className='flex items-center text-base'>Date<span className='mx-1 text-sm'>(DD)</span></label>
                                        <input className='w-full px-2 py-1.5 rounded' type='number' name='date' value={input.date} onChange={handleDateChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.date}</span>
                                    </div>
                                    <div className='flex flex-col my-2 px-2 w-32'>
                                        <label className='flex items-center text-base'>Month<span className='mx-1 text-sm'>(MM)</span></label>
                                        <input className='w-full px-2 py-1.5 rounded' type='number' name='month' value={input.month} onChange={handleDateChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.month}</span>
                                    </div>
                                    <div className='flex flex-col my-2 px-2 w-32'>
                                        <label className='flex items-center text-base'>Year<span className='mx-1 text-sm'>(YYYY)</span></label>
                                        <input className='w-full px-2 py-1.5 rounded' type='number' name='year' value={input.year} onChange={handleDateChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.year}</span>
                                    </div>
                                    <div className='flex flex-col my-2 px-2 w-32'>
                                        <label className='flex items-center text-base'>Gender</label>
                                        <input className='w-full px-2 py-1.5 rounded' type='text' name='gender' value={input.gender} onChange={handleChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.gender}</span>
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <div className='flex flex-col my-2 px-2 w-full'>
                                        <label className='text-base'>State</label>
                                        <input className='px-2 py-1.5 rounded' type='text' name='state' value={input.state} onChange={handleAddressChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.state}</span>
                                    </div>
                                    <div className='flex flex-col my-2 px-2 w-full'>
                                        <label className='text-base'>City</label>
                                        <input className='px-2 py-1.5 rounded' type='text' name='city' value={input.city} onChange={handleAddressChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.city}</span>
                                    </div>
                                </div>
                                <div className='flex w-full'>
                                    <div className='flex flex-col my-2 px-2 w-full'>
                                        <label className='text-base'>Area</label>
                                        <input className='px-2 py-1.5 rounded' type='text' name='area' value={input.area} onChange={handleAddressChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.area}</span>
                                    </div>
                                    <div className='flex flex-col my-2 px-2 w-full'>
                                        <label className='text-base'>Pincode</label>
                                        <input className='px-2 py-1.5 rounded' type='text' name='pincode' value={input.pincode} onChange={handleAddressChange} onBlur={handleFocus} required />
                                        <span className='text-sm italic text-red-700'>{inputError.pincode}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 px-2 w-full'>
                                    <label className='text-base'>Address Line 1</label>
                                    <input className='px-2 py-1.5 rounded' type='text' name='address1' value={input.address1} onChange={handleAddressChange} onBlur={handleFocus} required />
                                    <span className='text-sm italic text-red-700'>{inputError.address1}</span>
                                </div>
                                <div className='flex flex-col my-2 px-2 w-full'>
                                    <label className='text-base'>Address Line 2</label>
                                    <input className='px-2 py-1.5 rounded' type='text' name='address2' value={input.address2} onChange={handleAddressChange} onBlur={handleFocus} required />
                                    <span className='text-sm italic text-red-700'>{inputError.address2}</span>
                                </div>
                                <div className='flex flex-col my-2 px-2 w-full'>
                                    <label className='text-base'>Aadhar Id</label>
                                    <input className='px-2 py-1.5 rounded' type='text' name='aadhar' value={input.aadhar} onChange={handleAddressChange} onBlur={handleFocus} required />
                                    <span className='text-sm italic text-red-700'>{inputError.aadhar}</span>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <Button children={'Create Account'} onClick={handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup