const Room = require('../models/room')

const add = async (req, res) => {
  
    const roomName = req.body.name
    const roomType = req.body.type
    const roomPrice = req.body.price
    const roomStatus = req.body.status
    const roomDescription = req.body.description
    const roomSize = req.body.size
    const roomBed = req.body.beds
    const totalPeople = req.body.people
   

    let roomImage;
    if (req.file) {
        roomImage = req.file.filename
    }
    
    try {
       
        const room = new Room({
            roomName,
            roomType,
            roomPrice,
            roomStatus,
            roomImage,
            roomDescription,
            roomSize,
            roomBed,
            totalPeople
        })  
        await room.save()
        res.status(201).json({
            message: "Room added successfully",
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const rooms = await Room.find()
        res.json(rooms)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        res.json(room)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        if (room) {
            room.roomName = req.body.roomName || room.roomName
            room.roomType = req.body.roomType || room.roomType
            room.roomPrice = req.body.roomPrice || room.roomPrice
            room.roomStatus = req.body.roomStatus || room.roomStatus
            room.roomImage = req.file.filename || room.roomImage
            room.roomDescription = req.body.roomDescription || room.roomDescription
            room.roomSize = req.body.roomSize || room.roomSize
            room.roomBed = req.body.roomBed || room.roomBed
            room.totalPeople = req.body.totalPeople || room.totalPeople
            const updatedRoom = await room.save()
            res.json(updatedRoom)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const deletedRoom = await Room.remove({ _id: req.params.id });
        res.json(
            {
                message: "Room deleted successfully",
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}





module.exports = { add, getAll, getById, update, remove };