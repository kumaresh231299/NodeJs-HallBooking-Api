import express from "express";
import cors from 'cors'
import RoomRouter from './Routers/RoomRouter.js'


//Declaration / initalization
const app = express();
const PORT = 4000;
//Middleware
app.use(express.json())
app.use(cors())


app.use('/api/room',RoomRouter)


//Default Get method
app.get('/',(req,res)=>{
    res.status(200).send("NodeJs Hall Booking Api");
})

app.listen(PORT, ()=>{
    console.log("App is Running in the port", PORT);
})
