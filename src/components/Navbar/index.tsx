import React from 'react'
import { faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../../redux/authSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

function Navbar() {

    const auth = useSelector((state: RootState) => state.auth)
    const notifications = useSelector((state: RootState) => state.notifications)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(LOGOUT())
        navigate('/login')
    }

    return (
        <div className='flex justify-between items-center p-6'>
            <h1 className='text-4xl'>Welcome {auth.user?.firstname} !</h1>
            <div>
                <span className={`mx-4 hover:text-green  transition-all cursor-pointer`}>
                    <FontAwesomeIcon icon={faBell} size={'2x'} className={`${notifications?.user.length !== 0 && 'absolute'}`} />
                    {notifications?.user.length !== 0 && <FontAwesomeIcon icon={faBell} size={'2x'} className={'relative right-0 animate-ping text-green'} />}
                </span>
                <span className={`mx-4 hover:text-green transition-all cursor-pointer`}>
                    <FontAwesomeIcon icon={faRightFromBracket} size={'2x'} onClick={handleLogout} />
                </span>
            </div>
        </div>
    )
}

export default Navbar