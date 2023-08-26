const Amenities = require('../models/amenities')


const add = async (req,res) =>{
    const {
        amenitiesName,
        amenitiesIcon
    } = req.body

    console.log({...req.body})
    
    try{
        const amenities = new Amenities({
            amenitiesName,
            amenitiesIcon
        })
        await amenities.save()
        res.status(201).json({
            message:"Amenities added successfully",
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

const getAll = async (req,res) =>{
    try{
        const amenitiess = await Amenities.find()
        res.json(amenitiess)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const remove = async (req,res) =>{
    try{
        const amenities = await Amenities.findById(req.params.id)
        if(amenities){
            await amenities.remove()
            res.json({message:"Amenities removed successfully"})
        }else{
            res.status(404).json({message:"Amenities not found"})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports={
    add,
    getAll,
    remove
}