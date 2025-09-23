import mongoose from "mongoose";

const connectToDb = async (url) => {
    mongoose.connect(url)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(`DB error : ${err.message}`))
}

export default connectToDb