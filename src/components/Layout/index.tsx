import React from 'react'
import './index.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Wizard from '../Wizard'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { OPEN_SIDEBAR } from '../../redux/toggleSlice'
import { CLOSE_SIDEBAR } from '../../redux/toggleSlice'
import { useDispatch } from 'react-redux'

function Layout() {

    const wizard = useSelector((state: RootState) => state.toggle.wizard)
    const sidebar = useSelector((state: RootState) => state.toggle.sidebar)

    const dispatch = useDispatch()

    return (
        <>
            {wizard &&
                <div className={`absolute z-50`}>
                    <div className='flex m-auto'>
                        <Wizard />
                    </div>
                </div >}
            <div className={`fixed z-40 top-0 bottom-0 left-0  ${sidebar ? 'w-[30vh]' : 'w-[12vh]'} transition-all linear`}
                onMouseDown={() => dispatch(OPEN_SIDEBAR())}
                onMouseLeave={() => dispatch(CLOSE_SIDEBAR())}
            >
                <Sidebar isOpen={sidebar} />
            </div>
            <div className={`ml-[12vh] ${sidebar ? 'filter brightness-50' : ''} transition-all`} >
                <Navbar />
                <Outlet />
            </div>
        </ >
    )
}

export default Layout

