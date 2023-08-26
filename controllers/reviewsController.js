const Reviews = require('../models/reviews')


const add = async (req,res) =>{
    const {
        user,
        rating,
        reviewText,
        reviewType
    } = req.body
    
    try{
        const reviews = new Reviews({
            user,
            rating,
            reviewText,
            reviewType
        })
        const newReviews = await reviews.save()
        res.status(201).json({
            message:"Reviews added successfully",
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

const getAll = async (req,res) =>{
    try{
        const reviews = await Reviews.find()
        res.json(reviews)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    add,
    getAll
}