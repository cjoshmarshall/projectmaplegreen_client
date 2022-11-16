import React from 'react'

interface CardProps {
    title: any;
    subtitle?: any;
    className?: string;
    content?: any;
    colStart?: number;
    colSpan?: number;
    titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    titleColor?: string;
    icon?: any;
    isLoading?: boolean;
    loadingPosition?: string;
    isSplitApplied?: boolean;
    isColInverse?: boolean;
}

function Card({
    title = 'title',
    subtitle = 'subtitle',
    className,
    content,
    colStart = 1,
    colSpan = 1,
    titleSize,
    titleColor,
    icon,
    isLoading = false,
    loadingPosition = 'right',
    isSplitApplied,
    isColInverse
}: CardProps) {

    let sizeValue = ''
    const getTitleSize = () => {
        switch (titleSize) {
            case "sm":
                return sizeValue = 'text-sm'
            case "md":
                return sizeValue = 'text-base'
            case "lg":
                return sizeValue = 'text-lg'
            case "xl":
                return sizeValue = 'text-xl'
            case "2xl":
                return sizeValue = 'text-2xl'
            default:
                return sizeValue = 'text-base'
        }
    }

    return (
        <div className={`${className} border border-gray-200 space-y-6 lg:col-start-${colStart} lg:col-span-${colSpan}`}>
            <div className={`${isSplitApplied ? 'border-b-2 px-4 py-5 sm:px-6' : 'px-4 py-5 sm:px-6'} ${icon ? 'flex' : null}`}>
                {icon && <div className='flex m-auto p-4 text-3xl text-gray-400'>{icon}</div>}
                {!isColInverse ?
                    <div className='w-full m-auto mx-2'>
                        <div className={`w-full ${getTitleSize()} ${titleColor}`}>{title}</div>
                        <div className='mt-1 w-full text-sm text-gray-400'>{subtitle}</div>
                    </div> :
                    <div className='w-full m-auto mx-2'>
                        <div className='mt-1 w-full text-sm text-gray-400'>{subtitle}</div>
                        <div className={`w-full ${getTitleSize()} ${titleColor}`}>{title}</div>
                    </div>
                }
            </div>
            {isSplitApplied &&
                <div className="px-4 py-5 sm:px-6">
                    {content}
                </div>
            }
        </div>
    )
}

export default Card