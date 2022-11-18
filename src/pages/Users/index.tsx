import React from 'react'
import XLSX from 'xlsx'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Button from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faCircleUser, faDownload, faTree } from '@fortawesome/free-solid-svg-icons'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { SET_USERS } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { RESET_NOTIFICATIONS } from '../../redux/notificationSlice'

function Users() {

  const auth = useSelector((state: RootState) => state.auth)
  const users = useSelector((state: RootState) => state.users)
  const trees = useSelector((state: RootState) => state.trees)

  const field: any = [
    {
      id: 1,
      name: 'firstname',
      value: 'First Name'
    },
    {
      id: 2,
      name: 'lastname',
      value: 'Last Name'
    },
    {
      id: 3,
      name: 'age',
      value: 'Age'
    },
    {
      id: 4,
      name: 'gender',
      value: 'Gender'
    },
    {
      id: 5,
      name: 'email',
      value: 'Email'
    },
    {
      id: 6,
      name: 'address1',
      value: 'Address Line 1'
    },
    {
      id: 7,
      name: 'address2',
      value: 'Address Line 2'
    },
    {
      id: 8,
      name: 'area',
      value: 'Area'
    },
    {
      id: 9,
      name: 'city',
      value: 'City'
    },
    {
      id: 10,
      name: 'state',
      value: 'State'
    },
    {
      id: 11,
      name: 'pincode',
      value: 'Pincode'
    },
    {
      id: 12,
      name: 'birthdate',
      value: 'Date of Birth'
    },
    {
      id: 13,
      name: 'aadhar',
      value: 'Aadhar Id'
    }
  ]

  const [data, setData]: any = React.useState([])
  const filteredData = data?.map(({ password, userId, admin, ...rest }: any) => ({ ...rest }))
  // const filteredUsers = users?.selectedUsers.map(({ password, userId, admin, isChecked, ...rest }: any) => ({ ...rest }))

  const [isLoading, setIsLoading]: any = React.useState([])
  const dispatch = useDispatch()

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get('/users/getUsers')
        const filteredData = res.data.filter((item: any) => item.admin !== 1)
        setData(filteredData)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUsers()
    dispatch(RESET_NOTIFICATIONS())
  }, [])

  // const handleExport = () => {
  //   let wb = XLSX.utils.book_new()
  //   let ws = XLSX.utils.json_to_sheet(users.selectedUsers.length !== 0 ? filteredUsers : filteredData)
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet 1")
  //   XLSX.writeFile(wb, "Users.xlsx")
  // }


  return (
    <>
      <div className='p-8 bg-gray-200'>
        <h1 className='text-3xl'>
          Users
        </h1>
        <div className='p-4'>
          <div className='grid grid-flow-col'>
            <Card title={data.length} subtitle='Users' icon={<FontAwesomeIcon icon={faCircleUser} />} className='mx-4 bg-white rounded shadow-lg' />
            <Card title={trees.trees.length} subtitle='Trees' icon={<FontAwesomeIcon icon={faTree} />} className='mx-4 bg-white rounded shadow-lg' />
            <Card title={2} subtitle='Charts' icon={<FontAwesomeIcon icon={faChartArea} />} className='mx-4 bg-white rounded shadow-lg' />
          </div>
          <div className='p-4'>
            {/* <div className='flex justify-between'>
              <div className='flex items-center align-text-bottom'>
                <span>No. of Users selected : </span>
                <span className='mx-1 text-lg'><b>{users.selectedUsers.length}</b></span>
              </div>
              <Button children={'Export as XLSX'} icon={<FontAwesomeIcon icon={faDownload} />} onClick={handleExport} disabled={users.selectedUsers.length === 0} className={'my-4'} />
            </div> */}
            <Table tablename={'users'} isLoading={isLoading} field={field} data={data} currentPage={1} classname={'w-80% drop-shadow-lg border border-gray-300'} isLeaderStatic={false} align={'left'} isCheckboxHidden={true} isSearch={true} variant={1} />
          </div>
        </div>
      </div >
    </>
  )
}

export default Users