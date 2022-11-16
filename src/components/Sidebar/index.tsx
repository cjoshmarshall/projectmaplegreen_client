import React from 'react'
import './index.css'
import { Link, useLocation } from 'react-router-dom'
import { faTree, faDisplay, faGear, faUser, faUpload } from '@fortawesome/free-solid-svg-icons'
import { faCanadianMapleLeaf } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { TOGGLE_WIZARD } from '../../redux/toggleSlice'


function Sidebar({ isOpen }: any) {

    const auth = useSelector((state: RootState) => state.auth)
    const sidebar = useSelector((state: RootState) => state.toggle.sidebar)


    let location = useLocation();
    let path = location.pathname.split('/')[1]
    const dispatch = useDispatch()


    const handleUpload = () => {
        dispatch(TOGGLE_WIZARD())
    }

    return (
        <>
            <div className='flex flex-col h-screen bg-white'>
                <div>
                    <div className='flex my-4'>
                        <div className='m-auto px-2 py-1 transition-all'>
                            <span>
                                <FontAwesomeIcon fixedWidth icon={faCanadianMapleLeaf} size={'3x'} className='text-green' />
                            </span>
                        </div>
                    </div>
                    <ul className='flex flex-col my-16 transition-opacity linear'>
                        {auth?.user.admin === 1 && <li className='flex m-4 align-middle'>
                            <Link to={'/dashboard'} className={`flex flex-row max-w-fit mx-1 hover:scale-110 transition-transform`}>
                                <FontAwesomeIcon fixedWidth icon={faDisplay} size={'2x'} className={`${path === 'dashboard' && 'text-green'} transition-colors`} />
                                <span className={`${isOpen ? 'block' : 'hidden'} m-auto px-2 transition ease-out`}>Dashboard</span>
                            </Link>
                        </li>}
                        {auth?.user.admin === 1 && <li className='flex m-4 align-middle'>
                            <Link to={'/users'} className={`flex flex-row max-w-fit mx-1 hover:scale-110 transition-transform`}>
                                <FontAwesomeIcon fixedWidth icon={faUser} size={'2x'} className={`${path === 'users' && 'text-green'} transition-colors`} />
                                <span className={`${isOpen ? 'block' : 'hidden'} m-auto px-2 transition ease-out`}>Users</span>
                            </Link>
                        </li>}
                        <li className='flex m-4 align-middle'>
                            <Link to={`trees/${auth.user?._id}`} className={`flex flex-row max-w-fit mx-1 hover:scale-110 transition-transform`}>
                                <FontAwesomeIcon fixedWidth icon={faTree} size={'2x'} className={`${path === 'trees' && 'text-green'} transition-colors`} />
                                <span className={`${isOpen ? 'block' : 'hidden'} m-auto px-2 transition ease-out`}>Trees</span>
                            </Link>
                        </li>
                        <li className='flex m-4 align-middle'>
                            <Link to={`/settings/${auth.user?._id}`} className={`flex flex-row max-w-fit mx-1 hover:scale-110 transition-transform`}>
                                <FontAwesomeIcon fixedWidth icon={faGear} size={'2x'} className={`${path === 'settings' && 'text-green'} transition-colors`} />
                                <span className={`${isOpen ? 'block' : 'hidden'} m-auto px-2 transition ease-out`}>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {auth.user.admin === 0 &&
                    <div className='flex max-w-fit mx-auto'>
                        <div className={`flex p-4 mx-1 hover:shadow-lg hover:text-white hover:bg-green rounded-lg transition-all cursor-pointer`}
                            onClick={handleUpload}>
                            <FontAwesomeIcon fixedWidth icon={faUpload} size={'2x'} />
                            <span className={`${isOpen ? 'block' : 'hidden'} m-auto px-2 transition ease-out`}>Import</span>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Sidebar;
