import React from 'react'
import XLSX from 'xlsx'
import Card from '../../components/Card'
import Table from '../../components/Table'
import Button from '../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faDownload, faTree, faTreeCity } from '@fortawesome/free-solid-svg-icons'
import axios from '../../api/axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

function Trees() {

  const auth = useSelector((state: RootState) => state.auth)
  const users = useSelector((state: RootState) => state.users)
  const trees = useSelector((state: RootState) => state.trees)


  const field: any = [
    {
      id: 1,
      name: 'scientificname',
      value: 'Scientific Name'
    },
    {
      id: 2,
      name: 'localname',
      value: 'Local Name'
    },
    {
      id: 3,
      name: 'growth',
      value: 'Growth'
    },
    {
      id: 4,
      name: 'planteddate',
      value: 'Planted Date'
    },
    {
      id: 5,
      name: 'treehealth',
      value: 'Tree Health'
    },
    {
      id: 6,
      name: 'entrydate',
      value: 'Date of Entry'
    },
    {
      id: 7,
      name: 'week',
      value: 'Week'
    }, ,
    {
      id: 8,
      name: 'image1',
      value: 'Image 1'
    },
    {
      id: 9,
      name: 'image2',
      value: 'Image 2'
    },
    {
      id: 10,
      name: 'image3',
      value: 'Image 3'
    }
  ]

  const [data, setData]: any = React.useState([])

  const filteredTrees = data?.map(({ password, userId, admin, isChecked, ...rest }: any) => ({ ...rest }))

  const [isLoading, setIsLoading]: any = React.useState([])

  const dispatch = useDispatch()

  const location = useLocation()
  const path = location.pathname.split('/')[2]


  React.useEffect(() => {
    const fetchTrees = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get('/trees/getUserTrees/' + path)
        setData(res.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchTrees()
  }, [])



  const handleExport = () => {
    let wb = XLSX.utils.book_new()
    let ws = XLSX.utils.json_to_sheet(filteredTrees)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1")
    XLSX.writeFile(wb, `User:${path} Trees.xlsx`)
  }

  return (
    <>
      <div className='p-8 bg-gray-200'>
        <h1 className='text-3xl'>
          Trees
        </h1>
        <div className='p-4'>
          {auth.user.admin === 1 ?
            <div className='grid grid-flow-col'>
              <Card title={trees.trees.length} subtitle='Total Trees' icon={<FontAwesomeIcon icon={faTreeCity} />} className='mx-4 bg-white rounded shadow-lg' />
              <Card title={trees.trees.length} subtitle='Current User Trees' icon={<FontAwesomeIcon icon={faTree} />} className='mx-4 bg-white rounded shadow-lg' />
              <Card title={3} subtitle='Charts' icon={<FontAwesomeIcon icon={faChartArea} />} className='mx-4 bg-white rounded shadow-lg' />
            </div> :
            <div className='w-1/2'>
              <Card title={data.length} subtitle='No. of Trees Present' icon={<FontAwesomeIcon icon={faTree} />} className='mx-4 bg-white rounded shadow-lg' />
            </div>
          }
          <div className='p-4'>
            <div className='flex justify-between'>
              <div className='flex items-center align-text-bottom'>
                <span>No. of Trees selected : </span>
                <span className='mx-1 text-lg'><b>{trees.selectedTrees.length}</b></span>
              </div>
              <Button children={'Export as XLSX'} icon={<FontAwesomeIcon icon={faDownload} />} onClick={handleExport} disabled={trees.selectedTrees.length === 0} className={'my-4'} />
            </div>
            <Table tablename={'trees'} isLoading={isLoading} field={field} data={data} currentPage={1} classname={'w-80% drop-shadow-lg border border-gray-300'} height='xl' align={'left'} isLeaderStatic={true} isCheckboxHidden={false} isSearch={true} variant={1} />
          </div>
        </div>
      </div >
    </>
  )
}

export default Trees