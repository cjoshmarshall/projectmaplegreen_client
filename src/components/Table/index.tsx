import React, { useState } from 'react'
import { faSortUp, faSortDown, faSort, faSearch, faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SELECT_TREES } from '../../redux/treeSlice';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';


interface TableProps {
    tablename: string
    field: any;
    data: any;
    currentPage: number,
    classname: string,
    height?: 'sm' | 'md' | 'lg' | 'xl';
    width?: 'sm' | 'md' | 'lg' | 'xl';
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    padding?: 'sm' | 'md' | 'lg';
    rounded?: 'Default' | 'Rounded';
    align: 'left' | 'middle' | 'right',
    isLoading?: boolean,
    isCheckboxHidden?: boolean;
    isChecked?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isSearch?: boolean;
    isPaginationHidden?: boolean,
    isLeaderStatic?: boolean,
    variant: 1 | 2 | 3;
}

function Table({
    tablename,
    field,
    data,
    height,
    width,
    currentPage,
    classname,
    align,
    shadow,
    padding,
    rounded,
    isLoading,
    isCheckboxHidden = true,
    isChecked = false,
    isSelected,
    isDisabled,
    isSearch,
    isPaginationHidden,
    isLeaderStatic,
    variant
}: TableProps) {

    const auth = useSelector((state: RootState) => state.auth.user?._id)

    const dispatch = useDispatch()

    const [searchInput, setSearchInput]: any = React.useState('');
    const [sortedField, setSortedField]: any = React.useState(null);
    const [sortedDirection, setSortedDirection]: any = React.useState('ascending');
    const [sortId, setSortId]: any = React.useState(null)
    const getHeight = () => {
        let heightValue: string
        switch (height) {
            case "sm":
                return heightValue = 'h-36'
            case "md":
                return heightValue = 'h-52'
            case "lg":
                return heightValue = 'h-72'
            case "xl":
                return heightValue = 'h-96'
            default:
                return heightValue = 'h-96'
        }
    }

    const getWidth = () => {
        let widthValue: string
        switch (width) {
            case "sm":
                return widthValue = 'w-1/4'
            case "md":
                return widthValue = 'w-1/2'
            case "lg":
                return widthValue = 'w-3/4'
            case "xl":
                return widthValue = 'w-full'
            default:
                return widthValue = 'w-full'
        }
    }

    const getShadow = () => {
        let shadowType: string
        switch (shadow) {
            case "none":
                return shadowType = 'shadow-none'
            case "sm":
                return shadowType = 'shadow'
            case "md":
                return shadowType = 'shadow-md'
            case "lg":
                return shadowType = 'shadow-lg'
            default:
                return shadowType = 'shadow-none'
        }
    }

    const getPadding = () => {
        let paddingValue: string
        switch (width) {
            case "sm":
                return paddingValue = 'p-1'
            case "md":
                return paddingValue = 'p-2'
            case "lg":
                return paddingValue = 'p-4'
            default:
                return paddingValue = 'p-2'
        }
    }

    const getAligned = () => {
        let alignedSide: string
        switch (align) {
            case "left":
                return alignedSide = 'text-left'
            case "middle":
                return alignedSide = 'text-center'
            case "right":
                return alignedSide = 'text-right'
            default:
                return alignedSide = 'text-left'
        }
    }

    const getRoundedBorder = () => {
        let borderType: string
        switch (rounded) {
            case "Default":
                return borderType = ''
            case "Rounded":
                return borderType = 'rounded-lg'
            default:
                return borderType = ''
        }
    }

    let [sortedOptions, setSortedOptions]: any = useState([]);
    const [selectedOptions, setSelectedOptions]: any = React.useState([])

    React.useEffect(() => {
        setSortedOptions(data)
    }, [data])



    React.useMemo(() => {
        if (sortedField !== null) {
            sortedOptions.slice().sort((a: any, b: any) => {
                if (sortedDirection === 'ascending') {
                    if (a[sortedField] < b[sortedField]) {
                        return -1;
                    }
                    if (a[sortedField] > b[sortedField]) {
                        return 1;
                    }
                    return 0;
                }
                if (sortedDirection === 'descending') {
                    if (a[sortedField] < b[sortedField]) {
                        return 1;
                    }
                    if (a[sortedField] > b[sortedField]) {
                        return -1;
                    }
                    return 0;
                }
            });
        }
        return sortedOptions;
    }, [data, sortedField]);



    const handleSelect = (e: any) => {
        const { name, checked } = e.target
        if (name === 'Select All') {
            let selectedOptions = sortedOptions.map((item: any) => { return { ...item, isChecked: checked } })
            setSortedOptions(selectedOptions)
        } else {
            let selectedOptions = sortedOptions.map((item: any) => { return item._id.toString() === name ? { ...item, isChecked: checked } : item })
            setSortedOptions(selectedOptions)
        }
    }

    React.useEffect(() => {
        const selectedOptions = sortedOptions.filter((item: any) => item.isChecked === true)
        setSelectedOptions(selectedOptions)
    }, [sortedOptions])

    React.useEffect(() => {
        if (tablename === 'trees') {
            dispatch(SELECT_TREES(selectedOptions))
        }
    }, [selectedOptions])



    const [pageInput, setPageInput]: any = React.useState(10);

    const [currentPageNumber, setCurrentPageNumber]: any = React.useState(currentPage);
    const [itemsPerPage, setItemsPerPage]: any = React.useState(pageInput);

    const indexOfLastItem = currentPageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const pageNumbers: any = [];
    let totalItems = sortedOptions.length
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const [pageNumberLimit, setPageNumberLimit]: any = React.useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit]: any = React.useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit]: any = React.useState(0)


    const handlePrevPage = () => {
        setCurrentPageNumber(currentPageNumber - 1);

        if ((currentPageNumber - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextPage = () => {
        setCurrentPageNumber(currentPageNumber + 1);

        if (currentPageNumber + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handleFirstPage = () => {
        setCurrentPageNumber(pageNumbers[0])

        // if (currentPageNumber !== pageNumbers[0]) {
        //     if (minPageNumberLimit >= 1) {
        //         setMaxPageNumberLimit(5);
        //         setMinPageNumberLimit(0);
        //     }
        // }

        if ((currentPageNumber + pageNumberLimit) > pageNumbers.length) {
            setCurrentPageNumber(minPageNumberLimit)
        } else {
            setCurrentPageNumber(currentPageNumber - pageNumberLimit)
        }
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }

    const handleLastPage = () => {
        setCurrentPageNumber(pageNumbers[pageNumbers.length - 1]);

        // if (currentPageNumber !== pageNumbers[pageNumbers.length - 1]) {
        //     if (pageNumbers.length > maxPageNumberLimit) {
        //         if (pageNumbers.length % pageNumberLimit === 0) {
        //             console.log('enter1')
        //             setMaxPageNumberLimit(pageNumbers.length);
        //             setMinPageNumberLimit(pageNumbers.length - pageNumberLimit);
        //         } else {
        //             console.log('enter2')
        //             setMaxPageNumberLimit(pageNumbers.length);
        //             setMinPageNumberLimit(pageNumbers.length - pageInput + 1);
        //         }
        //     }
        // }

        if ((currentPageNumber + pageNumberLimit) > pageNumbers.length) {
            setCurrentPageNumber(pageNumbers.length)
        } else {
            setCurrentPageNumber(currentPageNumber + pageNumberLimit)
        }
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }


    React.useEffect(() => {
        if (pageInput === '' || pageInput === '0') {
            setItemsPerPage(10)
        } else {
            setItemsPerPage(pageInput)
        }
    }, [pageInput, itemsPerPage])

    const navigate = useNavigate();

    const handleRowClick = (row: number) => {
        if (tablename === 'users') return navigate(`/trees/${row + 1}`);
    }
    const handleClickPrevent: any = document.getElementById('checkbox')?.addEventListener('click', (e) => {
    });




    return (
        <>
            {isSearch && <div className='flex flex-row justify-between my-3'>
                <div className='w-1/4 bg-white'>
                    <div className='flex items-center rounded-lg'>
                        <FontAwesomeIcon icon={faSearch} size='1x' className='p-2 bg-white' />
                        <input type='text'
                            className='w-full h-full p-2 pl-0 border-none focus:ring-transparent'
                            onChange={e => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>
            </div>}
            <div className={`${getHeight()} ${classname} ${data ? '' : 'overflow-y-scroll'} overflow-x-scroll`}>
                <table className={`${getRoundedBorder()} ${getShadow()} table-fixed`}>
                    <thead className=''>
                        <tr className=''>
                            {!isCheckboxHidden &&
                                <td className={`${isLeaderStatic ? 'sticky top-0 left-0' : ''} z-30 bg-gray-200 px-4 py-2`}>
                                    <input name="Select All" type='checkbox'
                                        className='cursor-pointer'
                                        checked={sortedOptions.filter((item: any) => item.isChecked !== true).length < 1}
                                        onChange={handleSelect}
                                    />
                                </td>
                            }
                            {field?.map((item: any, index: number) =>
                                <th key={index} className={`${isLeaderStatic ? 'sticky top-0 first:left-0 first:z-30' : ''} whitespace-nowrap  bg-gray-200 ${getAligned()}`}>
                                    <span key={index} className='flex items-center content-between'>
                                        <span className='flex-1 font-normal p-2'>{item.value}</span>

                                        <span className='flex flex-col p-2'>
                                            <FontAwesomeIcon fixedWidth icon={faSort} className={`${index === sortId && 'text-emerald-600'} cursor-pointer transition-colors`}
                                                onClick={() => {
                                                    setSortedField(item.name)
                                                    setSortedDirection(sortedDirection)
                                                    setSortId(index)
                                                }} />
                                        </span>
                                    </span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    {isLoading ?
                        <span className='flex place-content-center absolute w-full h-80'>
                            <span className='flex flex-col m-auto'>
                                <Loader isLoaderText={false} loaderSize='lg' variant={1} />
                            </span>
                        </span>
                        :
                        (data.length === 0 ?
                            <span className='flex place-content-center absolute w-full h-80'>
                                <span className='flex flex-col m-auto'>
                                    <FontAwesomeIcon icon={faRectangleXmark} size={'2x'} className={'m-2'} />
                                    <p>No records found</p>
                                </span>
                            </span> :
                            <tbody className=''>
                                {sortedOptions
                                    .filter((value: any) => {
                                        if (searchInput === '') {
                                            return value
                                        } else if (value && Object.keys(value).some((item: any) => value[item].toString().toLowerCase().includes(searchInput.toLowerCase()))) {
                                            return value
                                        }
                                    })
                                    .map((item: any, index: any) =>
                                        <tr key={index} className={`border-t ${item.isChecked ? 'bg-gray-100 transition-colors' : 'bg-white'} hover:bg-lightgreen transition-colors cursor-pointer`} onClick={() => handleRowClick(index)}>
                                            {!isCheckboxHidden &&
                                                <td className='sticky left-0 z-20 border-t px-4 py-2 bg-white transition-colors'>
                                                    <input id='checkbox' name={item._id} type='checkbox'
                                                        checked={item.isChecked}
                                                        disabled={isDisabled ? true : false}
                                                        className='cursor-pointer disabled:cursor-default'
                                                        onChange={handleSelect}
                                                    />
                                                </td>
                                            }
                                            {field?.map((field: any, index: any) =>
                                                <td key={index} className={`${isLeaderStatic ? 'first:sticky first:left-0 first:z-20' : ''} whitespace-nowrap max-w-10 px-4 py-2 ${getAligned()} ${isDisabled ? 'text-gray-400' : ''}`}>
                                                    {item[field.name]}
                                                </td>
                                            )}
                                        </tr>
                                    ).slice(indexOfFirstItem, indexOfLastItem)}
                            </tbody>
                        )
                    }
                </table>
            </div>
            {!isPaginationHidden &&
                <div className='flex justify-between p-4 bg-white'>
                    <div className='flex flex-row'>
                        <p className='flex place-items-center mr-2'>No. of Items per page:</p>
                        <input type='text' className='w-12 px-2 py-0 border-2 border-gray-400 rounded-lg'
                            value={pageInput}
                            onChange={e => setPageInput(e.target.value)}
                        />
                    </div>
                    <ul className='flex flex-row'>
                        <li className='mr-1'>
                            <button className='p-2 border rounded-full disabled:text-gray-200'
                                // disabled={currentPageNumber === 1}
                                disabled={minPageNumberLimit === 0}
                                onClick={handleFirstPage}
                            >
                                <FontAwesomeIcon fixedWidth icon={faAnglesLeft} />
                            </button>
                        </li>
                        <li className='mr-1'>
                            <button className='p-2 border rounded-full disabled:text-gray-200'
                                disabled={currentPageNumber === 1}
                                onClick={handlePrevPage}
                            >
                                <FontAwesomeIcon fixedWidth icon={faAngleLeft} />
                            </button>
                        </li>
                        {minPageNumberLimit >= 1 && <li className='m-auto mx-2 cursor-default'> &hellip; </li>}
                        {pageNumbers.map((page: any, index: any) =>
                            (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) &&
                            <li key={index}
                                className='flex mx-0.5'
                            >
                                <button className={`w-10 h-10 m-auto rounded-full ${currentPageNumber === page ? 'text-white bg-green' : 'hover:bg-lightgreen hover:transition-colors'} cursor-pointer`}
                                    onClick={() => setCurrentPageNumber(page)}>
                                    {page}
                                </button>
                            </li>

                        )}
                        {pageNumbers.length > maxPageNumberLimit && <li className='m-auto mx-2 cursor-default'> &hellip; </li>}
                        <li className='ml-1'>
                            <button
                                className='p-2 border rounded-full disabled:text-gray-200'
                                disabled={currentPageNumber === pageNumbers[pageNumbers.length - 1]}
                                onClick={handleNextPage}
                            >
                                <FontAwesomeIcon fixedWidth icon={faAngleRight} />
                            </button>
                        </li>
                        <li className='ml-1'>
                            <button
                                className='p-2 border rounded-full disabled:text-gray-200'
                                // disabled={currentPageNumber === pageNumbers[pageNumbers.length - 1]}
                                disabled={maxPageNumberLimit >= pageNumbers.length}
                                onClick={handleLastPage}
                            >
                                <FontAwesomeIcon fixedWidth icon={faAnglesRight} />
                            </button>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export default Table