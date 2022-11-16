import React from 'react'

interface LoaderProps {
    title?: string;
    className?: string;
    loaderSize?: 'sm' | 'md' | 'lg' | 'xl';
    textSize?: 'sm' | 'md' | 'lg' | 'xl';
    isCenter?: boolean;
    isWhite?: boolean;
    isLoaderText: boolean;
    isCol?: boolean;
    variant: 1 | 2 | 3;
}

function Loader({
    title,
    className,
    loaderSize,
    textSize,
    isCenter,
    isWhite,
    isLoaderText,
    isCol,
    variant
}: LoaderProps) {

    let sizeValue = '';
    const getCircleSize = () => {
        switch (loaderSize) {
            case "sm":
                return sizeValue = 'h-4 w-4'
            case "md":
                return sizeValue = 'h-7 w-7'
            case "lg":
                return sizeValue = 'h-10 w-10'
            case "xl":
                return sizeValue = 'h-14 w-14'
            default:
                return sizeValue = 'h-7 w-7'
        }
    }

    const getDotSize = () => {
        switch (loaderSize) {
            case "sm":
                return sizeValue = 'h-1 w-1 m-0.5'
            case "md":
                return sizeValue = 'h-2 w-2 m-0.5'
            case "lg":
                return sizeValue = 'h-3 w-3 m-1'
            case "xl":
                return sizeValue = 'h-5 w-5 m-1.5'
            default:
                return sizeValue = 'h-2 w-2 m-0.5'
        }
    }

    let textValue = '';
    const getTextSize = () => {
        switch (textSize) {
            case "sm":
                return textValue = 'text-sm'
            case "md":
                return textValue = 'text-base'
            case "lg":
                return textValue = 'text-lg'
            case "xl":
                return textValue = 'text-xl'
            default:
                return textValue = 'text-base'
        }
    }

    let borderValue = ''
    const getCirleBorder = () => {
        switch (getCircleSize()) {
            case "h-4 w-4":
                return borderValue = 'border-2'
            case "h-7 w-7":
                return borderValue = 'border-4'
            case "h-10 w-10":
                return borderValue = 'border-[6px]'
            case "h-14 w-14":
                return borderValue = 'border-8'
            default:
                return borderValue = 'border-4'
        }
    }

    return (
        <>
            {variant === 1 &&
                <div
                    className={`${isCenter ? 'flex justify-center' : 'inline-flex items-center'} ${isCol ? 'flex-col items-center cursor-default' : 'cursor-wait'}
                               border border-transparent font-medium rounded-md text-orange transition duration-150`}
                >
                    <div className={`flex items-center ${isCol && 'cursor-default'}`}>
                        < svg
                            className={`animate-spin ${getCircleSize()} ${isWhite ? 'text-gray-200' : 'text-lightgreen'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </div>
                    {isLoaderText &&
                        <div className={`flex items-center ${isCol ? 'pt-6' : 'pl-3'} ${getTextSize()} font-normal dark:text-white`}>
                            Loading {title}
                        </div>
                    }
                </div >
            }

            {variant === 2 &&
                <div
                    className={`${isCenter ? 'flex justify-center' : 'inline-flex items-center'} ${isCol ? 'flex-col items-center cursor-default' : 'cursor-wait'}
                               px-2 border border-transparent font-medium rounded-md text-orange transition duration-150`}
                >
                    <div className={`${getCircleSize()} ${getCirleBorder()} ${isWhite ? 'border-gray-200' : 'border-green'} ${isCol && 'cursor-default'}
                                    animate-spin border-t-inherit border-orange-600 bg-inherit rounded-full`}
                    >
                    </div>
                    {isLoaderText &&
                        <div className={`flex items-center ${isCol ? 'pt-6' : 'pl-3'} ${getTextSize()} font-normal dark:text-white`}>
                            Loading {title}
                        </div>
                    }
                </div>
            }

            {variant === 3 &&
                <div
                    className={`${isCenter ? 'flex justify-center' : 'inline-flex items-center'} ${isCol ? 'flex-col items-center' : ''}
                               px-2 border border-transparent font-medium rounded-md text-orange transition duration-150 cursor-default`}
                >
                    <div className='flex flex-row'>
                        <div style={{ animationDelay: "100ms" }} className={`${getDotSize()} rounded-full bg-orange-600 animate-dotLoader`}></div>
                        <div style={{ animationDelay: "200ms" }} className={`${getDotSize()} rounded-full bg-orange-600 animate-dotLoader`}></div>
                        <div style={{ animationDelay: "300ms" }} className={`${getDotSize()} rounded-full bg-orange-600 animate-dotLoader`}></div>
                    </div>
                    {isLoaderText &&
                        <div className={`flex items-center pl-3 ${isCol ? 'pt-6' : ''} ${getTextSize()} font-normal dark:text-white`}>
                            Loading {title}
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Loader;