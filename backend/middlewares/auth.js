import jwt from "jsonwebtoken"

export const userAuth = (req, res, next) => {
    const { token } = req.headers

    if(!token){
        return res.json({ success : false, message : 'Not logged in!' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message })
    }
}