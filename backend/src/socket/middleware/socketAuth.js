import jwt from 'jsonwebtoken'

const socketAuth = (socket,auth)=>{
    try {
        const token = socket.handshake.auth.token;
        if(!token){
            return next(new Error('Unauthorized'))
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        socket.userId = decodedToken.userId
        next()
    } catch (error) {
        console.log(error,'socket auth error')
        next(new Error('Unauthorized'))
    }
}

export default socketAuth