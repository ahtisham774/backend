const User = require('../models/user')
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto')
const add = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber
    } = req.body
    let profileImage;
    if (req.file) {
        profileImage = req.file.filename
    }

    try {

        const hashed_password = crypto.createHash('sha256')
            .update(`${password}`)
            .digest('hex')
        // create new user
        const user = new User({
            name,
            email,
            password: hashed_password,
            phoneNumber,
            profileImage
        })
        await user.save()
        res.status(201).json({
            message: "User added successfully",
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const users = await User.find().select(
            "_id name email phoneNumber profileImage"
        )
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCurrentUser = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.params.email }).select(
            "_id name email phoneNumber profileImage"
        )
        if (user) {
            res.json(user)
        }
        else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber
            user.profileImage = req.file.filename || user.profileImage
            await user.save()
            res.json({
                message: 'User Update Successfully!'
            })
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            await user.remove()
            res.json({ message: "User removed successfully" })
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const login = async (req, res) => {

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({
                message: "User not exist"
            })
        }
        // compared with hashed_password
        const hashed_password = crypto.createHash('sha256')
            .update(`${password}`)
            .digest('hex')
        if (user.password !== hashed_password) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }

        res.status(200).json({
            message: "Login success",
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const adminLogin = async (req, res) => {
   
    const { email, password } = req.body
    try {
        let user = email === process.env.ADMIN_EMAIL;
        if (!user) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        // compared with hashed_password

        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }
        res.status(200).json({
            message: "Login success",
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const getAdmin = async (req, res) => {

    const email = req.params.email
    if (email !== process.env.ADMIN_EMAIL) {
        return res.status(404).json({
            message: "Admin not found"
        })
    }
    res.status(200).send(
        {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            phone: process.env.ADMIN_PHONE
        }
    )

    

}
module.exports = {
    add,
    getAll,
    getById,
    getCurrentUser,
    update,
    login,
    adminLogin,
    getAdmin,
    remove
}