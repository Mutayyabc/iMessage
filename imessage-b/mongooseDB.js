import mongoose from 'mongoose'

const imessageSchema = mongoose.Schema({
    roomName: String,
    message_content: [
        {
            message: String,
            time: String,
            user: {
                uid: String,
                pic: String,
                email: String,
                displayName: String,
                
            }
        }
    ]
})

export default mongoose.model('messagebodies', imessageSchema)