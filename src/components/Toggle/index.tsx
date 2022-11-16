import React from 'react'

interface ToggleProps {
    leftLabel?: string;
    rightLabel?: string;
    isChecked: boolean;
    isLabelHidden?: boolean;
    isDisabled?: boolean;
    variant: 1 | 2;
}

function Toggle ({
    leftLabel,
    rightLabel,
    isChecked,
    isLabelHidden,
    isDisabled,
    variant
}: ToggleProps) {

    const [isToggled, setIsToggled]: any = React.useState(isChecked);

    const handleToggle = () => {
        if (isDisabled) return
        else {
            setIsToggled(!isToggled)
        }
    };


    return (
        <>
            {variant === 1 &&
                <div className='flex flex-row'>
                    {!isLabelHidden && <div className='flex place-items-center mr-2'>{leftLabel}</div>}
                    <button
                        className={`${isToggled ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-600'} ${isDisabled ? 'cursor-not-allowed bg-gray-200' : 'cursor-pointer'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-orange-500`}
                        aria-checked="false"
                        onClick={handleToggle}
                    >
                        <span aria-hidden="true" className={`${isToggled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full ${isDisabled ? 'bg-gray-400' : 'bg-white'} shadow transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                    {!isLabelHidden && <div className='flex place-items-center ml-2'>{rightLabel}</div>}
                </div>
            }

            {variant === 2 &&
                <div className='flex flex-row items-center'>
                    {!isLabelHidden && <div className='flex place-items-center mr-4'>{leftLabel}</div>}
                    <button
                        className={` ${isDisabled ? 'cursor-not-allowed bg-gray-200' : 'cursor-pointer'} ${isToggled ? 'bg-orange-400' : !isDisabled ? 'bg-gray-400 dark:bg-gray-600' : 'bg-gray-200'} relative flex flex-shrink-0 justify-center items-center h-2 w-8 border-4 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-orange-500`}
                        aria-checked="false"
                        onClick={handleToggle}
                    >
                        <span aria-hidden="true" className={`${isToggled ? 'bg-orange-600 translate-x-3' : '-translate-x-3'} pointer-events-none inline-block h-5 w-5 rounded-full ${isDisabled ? 'cursor-not-allowed bg-gray-400' : 'cursor-pointer bg-white'} drop-shadow-md transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                    {!isLabelHidden && <div className='flex place-items-center ml-4'>{rightLabel}</div>}
                </div>
            }
        </>
    )
}

export default Toggle;