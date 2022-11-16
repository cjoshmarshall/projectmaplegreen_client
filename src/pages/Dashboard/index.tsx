import React from 'react'
import './index.css'
import Card from '../../components/Card'
import BarChart from '../../components/BarChart'
import AreaChart from '../../components/AreaChart'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { SET_CREDENTIALS } from '../../redux/notificationSlice'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faCircleUser, faTreeCity } from '@fortawesome/free-solid-svg-icons'
import axios from '../../api/axios'
import { SET_TREES } from '../../redux/treeSlice'
import { SET_USERS } from '../../redux/userSlice'

function Dashboard() {

    const auth = useSelector((state: RootState) => state.auth)
    const users = useSelector((state: RootState) => state.users)
    const trees = useSelector((state: RootState) => state.trees)

    // const [notification, setNotification]: any = React.useState({})
    // console.log(notification)
    const dispatch = useDispatch()

    let socket: any = React.useRef()

    React.useEffect(() => {
        socket.current = io('ws://localhost:3006')
    }, [])


    React.useEffect(() => {
        socket.current.emit('addUser', auth.user._id, auth.user.admin)
        socket.current.on('getUsers', (users: any) => {
            users = users.filter((user: any) => user.userId !== null)
            // console.log(users)
        })
    }, [auth])

    React.useEffect(() => {
        socket.current.on('getNotification', (data: any) => {
            dispatch(SET_CREDENTIALS({ userId: data.userId }))
            // console.log(notification, 'notification')
        })
    }, [])

    React.useEffect(() => {
        const fetchTrees = async () => {
            try {
                const res = await axios.get('/trees/getTrees/')
                dispatch(SET_TREES(res.data))
            } catch (err) {
                console.log(err)
            }
        }
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/users/getUsers')
                const filteredData = res.data.filter((item: any) => item.admin !== 1)
                dispatch(SET_USERS(filteredData))
            } catch (err) {
                console.log(err)
            }
        }
        fetchTrees()
        fetchUsers()
    }, [])

    const tree = trees['trees']


    const groupBy: any = (arr: any, property: any) => {
        return arr.reduce((acc: any, cur: any) => {
            acc[cur[property]] = [...acc[cur[property]] || [], cur];
            return acc;
        }, {});
    };
    const userTrees = groupBy(tree, 'userId')
    const treeNames = groupBy(tree, 'scientificname')

    Object.values(userTrees).map((items: any) =>
        Object.values(treeNames).map((item: any) =>
            item.map((item: any) => item)
        ))


    return (
        <div className='p-8 bg-gray-200'>
            <h1 className='text-3xl'>
                Dashboard
            </h1>
            <div className='p-4'>
                <div className='grid grid-flow-col grid-cols-3'>
                    <Card title={users.users.length} subtitle='Users' icon={<FontAwesomeIcon icon={faCircleUser} />} className='mx-4 bg-white rounded shadow-lg' />
                    <Card title={trees.trees.length} subtitle='Trees' icon={<FontAwesomeIcon icon={faTreeCity} />} className='mx-4 bg-white rounded shadow-lg' />
                    <Card title={3} subtitle='Charts' icon={<FontAwesomeIcon icon={faChartArea} />} className='mx-4 bg-white rounded shadow-lg' />
                </div>
                <div className='grid grid-cols-2 p-4 gap-4'>
                    <div className='col-span-2 bg-white border border-gray-300 rounded-lg shadow-lg drop-shadow-lg'>
                        <AreaChart className='w-full h-96 p-2'
                            users={users.users.map((item: any) => item.firstname)}
                            trees={Object.values(userTrees).map((item: any) => item.length)}
                        />
                    </div>
                    <div className='col-span-2 bg-white border border-gray-300 rounded-lg shadow-lg drop-shadow-lg'>
                        <BarChart className='w-full h-96 p-2'
                            users={users.users.map((item: any) => item.firstname)}
                            trees={Object.values(userTrees).map((items: any) => Object.values(treeNames).map((item: any) => item.map((item: any) => item)))}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard