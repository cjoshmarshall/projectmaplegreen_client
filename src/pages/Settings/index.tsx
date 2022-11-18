import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Button from '../../components/Button'
import { RootState } from '../../redux/store'
import './index.css'

function Settings() {

    const auth = useSelector((state: RootState) => state.auth)

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const res = await axios.delete('/users/deleteUser/' + auth.user._id)
            if (res) return navigate('/login')
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <div className='flex justify-center h-screen bg-gray-300'>
            <div className='my-20'>
                <Button children='Delete Account' onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default Settings