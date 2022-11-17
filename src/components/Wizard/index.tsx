import React from 'react'
import './index.css'
import XLSX from 'xlsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faAdd, faUpload, faCircleXmark, faXmarkCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { TOGGLE_WIZARD } from '../../redux/toggleSlice'
import Button from '../Button'
import axios from '../../api/axios'
import { io } from 'socket.io-client'
import Table from '../Table'
import Loader from '../Loader'

function Wizard() {

    const auth = useSelector((state: RootState) => state.auth)
    const trees = useSelector((state: RootState) => state.trees)

    const dispatch = useDispatch()
    const handleWizard = () => {
        dispatch(TOGGLE_WIZARD())
    }

    const [tree, setTree]: any = React.useState({
        userId: auth?.user._id,
        scientificname: '',
        localname: '',
        growth: 1,
        planteddate: '',
        treehealth: 1,
        entrydate: '',
        week: 0,
    })

    const [files, setFiles]: any = React.useState({
        image: []
    })

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


    let socket: any = io('ws://localhost:3006')


    const handleChange = (e: any) => {
        setTree((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleImageSelect = (e: any) => {
        setFiles((prev: any) => ({ ...prev, [e.target.name]: e.target.files }))
    }
    // const handleDeleteImage = (e: any, index: number) => {
    //     const name = e.currentTarget.name
    //     setFiles((prev: any) => ({ ...prev, [name]: null }))
    // }


    const handleUpload = (e: Event) => {
        e.preventDefault()
        const postTree = async () => {
            const data = new FormData()
            if (files) {
                if (files.image !== null) {
                    for (let i = 0; i < files['image'].length; i++) {
                        data.append('files', files['image'][i]);
                    }
                } else {
                    data.append('files', '')
                }
                try {
                    setIsProgessbar(true)
                    const res = await axios.post('/images', data, {
                        headers: {
                            'accept': 'application/json',
                            'Accept-Language': 'en-US,en;q=0.8',
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    let image = res.data.locationArray
                    for (let i = 0; i < 3; i++) {
                        if (image[i] !== undefined) {
                            tree[`image${i + 1}`] = image[i]
                        } else {
                            tree[`image${i + 1}`] = ''
                        }
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            try {
                const res = await axios.post("/trees/postTree", tree, {
                    onUploadProgress: (data: any) => {
                        setProgressbar(Math.round((data.loaded / data.total) * 100))
                    }
                })
                setTimeout(() => (dispatch(TOGGLE_WIZARD()), progressbar * 100))
                setIsProgessbar(false)
                socket.emit('importTree', {
                    userId: auth.user?._id
                })
                setTimeout(() => alert('Tree Uploaded Successfully'), 500)
            } catch (err) {
                console.log(err)
            }
        }
        postTree()
    }

    const [uploadFile, setUploadFile]: any = React.useState([])
    const [importSheet, setImportSheet]: any = React.useState([])

    const handleBulkUploadFile = async (e: any) => {
        const data = await e.target.files[0].arrayBuffer()
        setUploadFile(data)
        const wb = XLSX.readFile(data);
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        setImportSheet(XLSX.utils.sheet_to_json(ws, { raw: false }))
    }

    React.useEffect(() => {
        importSheet.map((item: any) => delete item.email)
    }, [importSheet])

    const [wizardPage, setWizardPage]: any = React.useState(false)
    const [isProgressbar, setIsProgessbar]: any = React.useState(false)
    const [progressbar, setProgressbar]: any = React.useState(0)

    const handleBulkUpload = () => {
        const importTree = async () => {
            try {
                setIsProgessbar(true)
                const res = await axios.post("trees/postTrees", { _id: auth?.user._id, data: importSheet }, {
                    onUploadProgress: (data: any) => {
                        setProgressbar(Math.round((data.loaded / data.total) * 100))
                    }
                })
                setTimeout(() => (dispatch(TOGGLE_WIZARD()), progressbar * 100))
                setIsProgessbar(false)
                setTimeout(() => alert('Trees Uploaded Successfully'), 500)
            } catch (err) {
                console.log(err)
            }
        }
        importTree()
    }



    return (
        <div className='wizard fixed top-0 flex w-screen h-screen bg-black bg-opacity-50'>
            <div className='m-auto w-full opacity-100'>
                {!isProgressbar ?
                    <div className='m-auto px-4 py-4 w-[100vh] min-h-fit h-fit bg-gray-200 shadow-lg border border-gray-300 rounded-lg'>
                        {wizardPage ?
                            <>
                                <div className='flex justify-between p-2'>
                                    <h2 className='text-3xl'>Upload Tree</h2>
                                    <div>
                                        <FontAwesomeIcon icon={faXmark} size={'lg'} onClick={handleWizard} className={'cursor-pointer hover:text-green transition-colors'} />
                                    </div>
                                </div>
                                <div className='flex flex-col place-items-center'>
                                    <div className='flex w-full'>
                                        <div className='flex flex-col w-full m-2'>
                                            <label className='text-base'>Scientific Name</label>
                                            <input className='w-full px-2 py-1.5 rounded' type='text' name='scientificname' onChange={handleChange} />
                                            {/* <span className='text-sm italic'>Email is wrong</span> */}
                                        </div>
                                        <div className='flex flex-col w-full m-2'>
                                            <label className='text-base'>Local Name</label>
                                            <input className='w-full px-2 py-1.5 rounded' type='text' name='localname' onChange={handleChange} />
                                            {/* <span className='text-sm italic'>Email is wrong</span> */}
                                        </div>
                                    </div>
                                    <div className='flex flex-row place-items-center w-full'>
                                        <label className='w-2/5 m-2'>Growth in  year(s): <span className='text-xl'><b>{tree.growth}</b></span></label>
                                        <input className='w-3/5 m-2 px-2 py-1.5 rounded' type='range' min='1' max='10' name='growth' id='growthSlider' value={tree.growth} onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-row place-items-center w-full'>
                                        <label className='w-1/2 m-2'>Date of the tree when planted</label>
                                        <input className='w-1/2 m-2 px-2 py-1.5 rounded' type='date' name='planteddate' onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-row place-items-center w-full'>
                                        <label className='w-2/5 m-2'>Tree health <span className='italic'>(in points)</span>: <span className='text-xl'><b>{tree.treehealth}</b></span></label>
                                        <input className='w-3/5 m-2 px-2 py-1.5 rounded' type='range' min='1' max='5' name='treehealth' id='treeHealthSlider' value={tree.treehealth} onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-row place-items-center w-full'>
                                        <label className='w-1/2 m-2'>Date of Tree Entry :</label>
                                        <input className='w-1/2 m-2 px-2 py-1.5 rounded' type='date' name='entrydate' onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-row place-items-center w-full'>
                                        <label className='w-1/2 m-2'>Week of the Year :</label>
                                        <input className='w-1/2 m-2 px-2 py-1.5 rounded' type='number' name='week' onChange={handleChange} />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label className='w-full m-2'>Images <span className='italic'>(max 3 images)</span></label>
                                        <div className='flex m-2 transition-all'>

                                            <div className='border-2 border-gray-400 rounded'>
                                                <label htmlFor='file'><FontAwesomeIcon fixedWidth icon={faAdd} size={'1x'} className={'p-6 cursor-pointer'} /></label>
                                                <input className='hidden' type='file' multiple={true} id='file' name='image' onChange={handleImageSelect} />
                                            </div>
                                            {
                                                (Object.values(files['image']).map((item: any, index: number) =>
                                                    <div className='flex rounded w-[72px] ml-4' key={index}>
                                                        <img src={URL.createObjectURL(item)} alt='' className='w-full h-[72px] rounded' />
                                                        {/* <div className='-translate-x-1 -translate-y-3'>
                                                        <button className='absolute' name={`image${index + 1}`} onClick={() => handleDeleteImage(index)}>
                                                            <FontAwesomeIcon name={`image${index + 1}`} icon={faCircleXmark} className={'bg-white rounded-full cursor-pointer'} />
                                                        </button>
                                                    </div> */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex justify-start w-full m-2'>
                                        <Button children={'Import as XLSX'} icon={<FontAwesomeIcon icon={faUpload} />} onClick={() => { setWizardPage(false) }} />
                                    </div>
                                    <div className='flex justify-end w-full m-2'>
                                        <Button children={'Submit'} onClick={handleUpload} />
                                    </div>
                                </div>
                            </> :
                            <div className='flex flex-col h-fit'>
                                <div className='flex justify-between p-2'>
                                    <h2 className='text-3xl'>Import Trees</h2>
                                    <div>
                                        <FontAwesomeIcon icon={faXmark} size={'lg'} onClick={handleWizard} className={'cursor-pointer hover:text-green transition-colors'} />
                                    </div>
                                </div>
                                {uploadFile.length === 0 ?
                                    <div className='flex m-auto w-fit p-2'>
                                        <div className='border-2 border-gray-400 rounded'>
                                            <label htmlFor='xlsx'><FontAwesomeIcon fixedWidth icon={faAdd} size={'1x'} className={'p-6 cursor-pointer'} /></label>
                                            <input className='hidden' type='file' name='uploadFile' id='xlsx' onChange={handleBulkUploadFile} />
                                        </div>
                                    </div> :
                                    <div className='px-2'>
                                        <div className='flex justify-between py-1'>
                                            <span>Preview :</span>
                                            <label htmlFor='xlsx' className='hover:text-green transition-colors cursor-pointer'>
                                                <input className='hidden' type='file' name='uploadFile' id='xlsx' onChange={handleBulkUploadFile} />
                                                <FontAwesomeIcon fixedWidth icon={faPlusCircle} size={'1x'} /> Change Sheet
                                            </label>
                                        </div>
                                        <div>
                                            <Table tablename={'wizardtable'} field={field} data={importSheet} currentPage={1} classname={'w-80% shadow-lg drop-shadow-lg'} height={'lg'} align={'left'} isPaginationHidden={true} variant={1} />
                                        </div>
                                    </div>
                                }
                                <div className='flex'>
                                    <div className='flex justify-start w-full m-2'>
                                        <Button children={'Upload Tree Manually'} icon={<FontAwesomeIcon icon={faUpload} />} onClick={() => { setWizardPage(true) }} />
                                    </div>
                                    <div className='flex justify-end w-full m-2'>
                                        <Button children={'Submit'} onClick={handleBulkUpload} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div> :
                    <div className='m-auto px-4 py-4 w-[100vh] min-h-fit h-32 bg-gray-200 shadow-lg border border-gray-300 rounded-lg'>
                        <div className='flex items-center h-full px-10'>
                            <span
                                aria-valuenow={progressbar}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: `${progressbar}%` }} className='flex h-2 align-middle rounded-lg bg-green'></span>
                            <span className='px-2 text-2xl'>{progressbar}%</span>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Wizard