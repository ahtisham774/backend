const Hotel = require('../models/hotel')

const add = async (req, res) => {

    const name = req.body.name
    const location = req.body.location
    const description = req.body.description
    let images = []
    req.files.forEach(file => {
        images.push(file.filename)
    })
    const category = req.body.category
    const amenities = JSON.parse(req.body.amenities)
    const rooms = JSON.parse(req.body.rooms)
    const hotelRules = JSON.parse(req.body.hotelRules)
    const hashTags = JSON.parse(req.body.hashTags)
    const propertyClass = req.body.propertyClass


    try {
        const hotel = new Hotel({
            name: name,
            location: location,
            description: description,
            category: category,
            images: images,
            amenities: amenities,
            rooms: rooms,
            hashTags: hashTags,
            hotelRules: hotelRules,
            propertyClass: propertyClass
        })
        await hotel.save()
        res.status(201).json({
            message: "Hotel added successfully",
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate(
            'amenities'
        ).populate('rooms')
        res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).
            populate('amenities').
            populate('rooms')
        res.json(hotel)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const update = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        if (hotel) {
            hotel.name = req.body.name || hotel.name
            hotel.location = req.body.location || hotel.location
            hotel.description = req.body.description || hotel.description
            hotel.category = req.body.category || hotel.category
            hotel.images = req.body.images || hotel.images
            hotel.amenities = req.body.amenities || hotel.amenities
            hotel.rooms = req.body.rooms || hotel.rooms
            hotel.hashTags = req.body.hashTags || hotel.hashTags
            hotel.hotelRules = req.body.hotelRules || hotel.hotelRules
            hotel.propertyClass = req.body.propertyClass || hotel.propertyClass
            const updatedHotel = await hotel.save()
            res.json(updatedHotel)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        if (hotel) {
            await hotel.remove()
            res.json({ message: "Hotel removed" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getHotelsByTag = async (req, res) => {
    console.log(req.params.tag)
    try {
        const hotels = await Hotel.find({ hashTags: req.params.tag }).select(
            '_id name description category images  propertyClass'
        )
            res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getHotelByRoom = async (req,res) =>{
    try {
        let hotel = await Hotel.find({rooms: req.params.id}).select(
            '_id name location category  propertyClass rooms'
        ).populate('rooms')
        hotel = {
            ...hotel[0]._doc,
            rooms: hotel[0].rooms.filter(room => room._id == req.params.id)
        }
        res.json(hotel)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
module.exports = {
    add,
    getAll,
    getById,
    update,
    getHotelsByTag,
    getHotelByRoom,
    remove
}