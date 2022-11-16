import React from 'react'

interface ButtonProps {
    children: any,
    className?: string,
    icon?: any,
    onClick?: any,
    disabled?: boolean
}
function Button({
    children,
    className,
    icon,
    onClick,
    disabled
}: ButtonProps) {

    const [isClicked, setIsClicked]: any = React.useState(false)

    return (
        <button
            className={`${className} flex place-items-center p-2 text-white rounded-lg shadow-lg drop-shadow-lg ${isClicked ? 'translate-y-1' : ''} ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green hover:bg-lightgreen'} transition-all`}
            onClick={onClick}
            disabled={disabled}>
            <span className='px-1'>{children}</span>
            {icon && <span className='px-1'>{icon}</span>}
        </button>
    )
}

export default Button