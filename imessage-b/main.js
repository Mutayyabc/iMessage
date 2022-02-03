// import 
import express from 'express'
import mongoose from 'mongoose';
import M_DB from './mongooseDB.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express()
const port = process.env.PORT || 9000
const pusher = new Pusher({
    appId: "1331364",
    key: "93990f0577676c3cf663",
    secret: "3f1203653104b1e711e5",
    cluster: "us2",
    useTLS: true
});


//middelware
app.use(express.json());
app.use(cors());

//DB Config
const connection_url = 'mongodb+srv://mutayyabc:Muizzcheema1@cluster0.700ss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const db = mongoose.connection
db.once('open', () => {
    console.log("DB is connected");
    const changeStream = mongoose.connection.collection('messagebodies').watch()
    //const changeStream =  msgCollection.watch();
    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('rooms', 'newRoom', {
                'change': change
            })
        } else if (change.operationType === 'update') {
            pusher.trigger('messages', 'newMessage', {
                'change': change
            })
        } else {
            console.log('Error in Pusher')
        }
    })
})


    //const changeStream =  msgCollection.watch();
//////// diff kind of
    


//api routes
app.get('/',(req,res) => res.status(200).send('hello world'));

///// perfect new room
app.post('/messages/room', (req, res) => {
    const dbMessage = req.body;
    M_DB.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else{
            res.status(201).send(data)
        }
    })
})

// convo in room
app.post('/messages/new', (req, res) => {
    M_DB.update(
        { _id: req.query.id },
        { $push: { message_content: req.body } },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        }
    )
})


/// gets a list of id, roomName and time 
app.get('/messages/messageList', (req, res) => {
    M_DB.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            data.sort((b, a) => {
                return a.time- b.time;
            });

            let messagebodies = []

            data.map((messageItem) => {
                const messageData = {
                    id: messageItem._id,
                    name: messageItem.roomName,
                    time: messageItem.message_content[0].time
                }

             messagebodies.push(messageData)
            })

            res.status(200).send(messagebodies)
        }
    })
})
app.get('/messages/chat', (req, res) => {
    const id = req.query.id
    // filters to find id and then returns the  full convo of that id room
    M_DB.find({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/messages/menuData', (req, res) => {
    // retreives last person to message and their avatar and time
    const id = req.query.id

    M_DB.find({ _id: id }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let lastConvo = data[0].message_content

            lastConvo.sort((b, a) => {
                return a.time - b.time;
            });
            //gets the last message info
            res.status(200).send(lastConvo[0])
        }
    })
})





// listen
app.listen (port, () => console.log(`Listening on local host: ${port}`));