const rooms = [
    { id: 1, Room_name: "Single Room", Number_Of_seats_available: 10, Amenities: ["Fan", "White Board"], Price_per_hour: 300 },
    { id: 2, Room_name: "Suite Room", Number_Of_seats_available: 30, Amenities: ["Ac", "Wifi", "Prijector"], Price_per_hour: 900 },
    { id: 3, Room_name: "Deluxe Room", Number_Of_seats_available: 50, Amenities: ["Ac", "Wifi", "Projecter", "Speakers"], Price_per_hour: 1600 },
    { id: 4, Room_name: "Double Room", Number_Of_seats_available: 25, Amenities: ["Fan", "Wifi", "White Board"], Price_per_hour: 700 },
    { id: 5, Room_name: "Premium Room", Number_Of_seats_available: 100, Amenities: ["Ac", "Wifi", "Projector", "Speakers", "Snacks"], Price_per_hour: 4100 }
]

const booking = [
    {
        customerName: "kumaresan",
        bookingDate: "2024-01-01",
        startTime: "10.00am",
        endTime: "10.00pm",
        roomID: 3,
        bookingID: 101,
        bookingStatus: "booked",
        booked_on: "2024-01-11"
    },
    {
        customerName: "dinesh",
        bookingDate: "2024-02-02",
        startTime: "10.00pm",
        endTime: "09.00am",
        roomID: 5,
        bookingID: 102,
        bookingStatus: "booked",
        booked_on: "2024-02-22"
    },
    {
        customerName: "hari",
        bookingDate: "2024-03-03",
        startTime: "12.05pm",
        endTime: "10.00am",
        roomID: 3,
        bookingID: 103,
        bookingStatus: "booked",
        booked_on: "2024-03-31"
    },
    {
        customerName: "kumaresan",
        bookingDate: "2024-06-06",
        startTime: "10.00am",
        endTime: "10.00pm",
        roomID: 2,
        bookingID: 104,
        bookingStatus: "booked",
        booked_on: "2024-06-30"
    }

]


//getcall or get method
export const getRoomDetail = (req, res) => {
    res.status(200).json({ data: rooms })
}

//Create a Room 
export const createRoom = (req, res) => {
    const { Room_name, Number_Of_seats_available, Amenities, Price_per_hour } = req.body

    if (!Room_name || !Number_Of_seats_available || !Amenities || !Price_per_hour) {
        return res.status(400).json({ message: "All Fields are required." });
    }

    const newRoom = {
        id: rooms.length + 1,
        Room_name: Room_name,
        Number_Of_seats_available: Number_Of_seats_available,
        Amenities: Amenities,
        Price_per_hour: Price_per_hour
    }
    rooms.push(newRoom)
    //console.log(newRoom)

<<<<<<< HEAD
    res.status(200).json({ message: "Room Created Successfully", data: newRoom })
=======
    res.status(200).json({ messahe: "Room Created Successfully", data: newRoom })
>>>>>>> 0acbf1436a9d7ef228b461fa9b30e838ff5555e3
}

//Booking a Room 
export const bookRoom =(req,res)=>{
    const {customerName,bookingDate,startTime,endTime,roomID,bookingStatus,booked_on} = req.body

    //Find the room by id
    const room = rooms.find(ele => ele.id === roomID)
    //check if the Room exists
    if(!room){
        return res.status(404).json({message: "Room Not Available!", Room_Details:rooms})
    }

    //Check if the room is already booked for the requested date and time
    const isBooked = booking.some(b =>
        b.roomID === roomID && b.bookingDate === bookingDate && 
        ( (startTime >= b.startTime && startTime < b.endTime) || (endTime > b.startTime && endTime <= b.endTime) )
    )
    
    if(isBooked){
        return res.status(400).json({message: "Room already booked for the selected time !"})
    }

<<<<<<< HEAD
    //Create new booking
=======
    //Create new bvooking
>>>>>>> 0acbf1436a9d7ef228b461fa9b30e838ff5555e3
    const newBooking = {
        customerName:customerName,
        bookingDate:bookingDate,
        startTime:startTime,
        endTime:endTime,
        roomID:roomID,
        bookingID:booking.length + 101,
        bookingStatus:bookingStatus,
        booked_on:booked_on
    }

    //Add the new booking to the booking array
    booking.push(newBooking)

    res.status(200).json({message: "Room successfully booked!",Booking_Details: newBooking})

}

//List all rooms with booked data
export const listBookedRooms = (req,res)=>{
    const bookedRooms = rooms.map(room => {
        const roomBookings = booking.filter(b => b.roomID === room.id).map(b=> ({
            Room_Name:room.Room_name,
            Booked_Status:b.bookingStatus,
            Customer_Name:b.customerName,
            Date:b.bookingDate,
            Start_Time:b.startTime,
            End_Time:b.endTime
        }))
        return roomBookings
    }).flat()  // Flatten the array to avoid nested arrays
    res.status(200).json({message: "List of Booked Rooms", data: bookedRooms})
}

//List all customers with booked data
export const CustomerBookedData = (req,res)=>{
    const customerdata = booking.map(bookingItem =>{
        const room = rooms.find(roomItem => roomItem.id === bookingItem.roomID)
        return {
            Customer_Name: bookingItem.customerName,
            Room_Name: room.Room_name,
            Date: bookingItem.bookingDate,
            Start_Time: bookingItem.startTime,
            End_Time: bookingItem.endTime
        }
    })
    res.status(200).json({message: "List all Customers with Booked Data",data:customerdata})
}

//List how many times a customer has booked the room
export const getcustomerBookings = (req,res)=>{
    const name = req.params.name
    const customerBookings = booking.filter(b => b.customerName == name)

    if(customerBookings.length === 0){
        res.status(404).json({message: "Customer Not Found"})
    }

    const result = customerBookings.map(b =>{
        const room = rooms.find(r=> r.id === b.roomID)
        return{
            Customer_Name: b.customerName,
            Room_Name: room.Room_name,
            Booking_Date: b.bookingDate,
            Start_Time: b.startTime,
            End_Time: b.endTime,
            BookingID: b.bookingID,
            Booked_on: b.booked_on,
            Booking_Status: b.bookingStatus
        }
    })
    res.status(200).json({message: `Customer ${name} has booked ${customerBookings.length} times`,data: result})
}

//Below methods for study purpose 
//get by id
// export const getRoomDetailId = (req, res) => {
//     const roomId = req.params.id
//     //console.log(roomId);

//     const roomDetail = rooms.find(ele => ele.id == roomId)

//     if (!roomDetail) {
//         return res.status(404).send("Room Not Found!")
//     }


//     res.status(200).json({ message: "Room Details", data: roomDetail })
// }


//Edit Room or put method
// export const editRoom = (req, res) => {
//     const roomid = req.params.id
//     const { Room_name, Number_Of_seats_available, Amenities, Price_per_hour } = req.body
//     const index = rooms.findIndex(ele => ele.id == roomid)
//     if (index === -1) {
//         return res.status(404).send("Room Detail not Found")
//     }

//     rooms[index].Room_name = Room_name
//     rooms[index].Number_Of_seats_available = Number_Of_seats_available
//     rooms[index].Amenities = Amenities
//     rooms[index].Price_per_hour = Price_per_hour

//     res.status(200).json({ message: "Room updated Successfully", data: rooms[index] })
// }

// Delete Room or Delete method
// export const deleteRoom = (req, res) => {
//     const roomId = req.params.id
//     const index = rooms.findIndex(ele => ele.id == roomId)
//     if (index === -1) {
//         return res.status(404).send("Room Details not found")
//     }
//     rooms.splice(index, 1)

//     res.status(200).json({ message: "Room deleteed Successfully" })
// }