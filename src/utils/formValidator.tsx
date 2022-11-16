export const emailValidator = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const passwordValidator = (password: string) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/
    return regex.test(password)
}