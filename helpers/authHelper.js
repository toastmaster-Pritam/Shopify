import bcrypt from 'bcrypt'

export const hashPassWord = async (password)=>{
    try {
        const hashedPassword=await bcrypt.hash(password,10)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
} 