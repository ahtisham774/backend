const Employee = require('../models/employee')
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto')



const add = async (req, res) => {
    const {
        name,
        email,
        password,
        phoneNumber,
        designation,
        salary,

    } = req.body;
    let profileImage;
    if (req.file) {
        profileImage = req.file.filename
    }
    try {

        const hashed_password = crypto.createHash('sha256')
            .update(`${password}`)
            .digest('hex')

        const employee = new Employee({
            name,
            email,
            password: hashed_password,
            phoneNumber,
            profileImage,
            designation,
            salary
        })
        await employee.save()
        res.status(201).json({
            message: "Employee added successfully",
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const getAll = async (req, res) => {
    try {
        const employees = await Employee.find().select(
            '_id name email phoneNumber designation salary profileImage'
        )
        res.json(employees)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const remove = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        if (employee) {
            await employee.remove()
            res.json({ message: "Employee removed successfully" })
        } else {
            res.status(404).json({ message: "Employee not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    add,
    getAll,
    remove
}