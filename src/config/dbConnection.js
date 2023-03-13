import mongoose from 'mongoose'

const dbConnection = async () => {
    try {
        const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/categorydb'

        const connection = await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.connection.on('error', err => {
            console.log(`MongoDB Connection error: ${err}`)
        });
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch (error) {
        console.log({ error })
        console.error(`Error: ${error.message}`)
        // process.exit(1)
    }
}
export default dbConnection