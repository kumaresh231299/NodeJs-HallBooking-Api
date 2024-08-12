import express from "express";
import { bookRoom, createRoom, CustomerBookedData, getcustomerBookings, getRoomDetail, listBookedRooms} from "../Controllers/RoomController.js";

const router = express.Router();

router.get('/roomDetails',getRoomDetail)
router.post('/createRoom',createRoom)
router.post('/bookRoom',bookRoom)
router.get('/listBookedRooms',listBookedRooms)  
router.get('/allCustomer',CustomerBookedData)
router.get('/bookingCount/:name',getcustomerBookings)


// router.get('/roomDetails/:id',getRoomDetailId)
// router.put('/editRoom/:id',editRoom)
// router.delete('/delete/:id',deleteRoom)

export default router;