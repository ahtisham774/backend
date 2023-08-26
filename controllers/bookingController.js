const Booking = require('../models/booking')
const dotenv = require('dotenv');
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {

    const amount = req.body.amount;
    const email = req.body.email;

    const currency = "USD";

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency,
            payment_method_types: ['card'],
            receipt_email: email,
            metadata: {
                integration_check: 'accept_a_payment',
            }

        });

        res.status(200).json(paymentIntent);

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Could not attach method" });
    }


}

const add = async (req, res) => {
    const {
        hotelId,
        roomId,
        paymentIntent,
        client_id,
        checkIn,
        checkOut,
        totalAmount,
    } = req.body

    try {
        const booking = new Booking({
            hotelId: hotelId,
            paymentIntent: paymentIntent,
            roomId: roomId,
            client_id: client_id,
            checkInDate: new Date(checkIn),
            checkOutDate: new Date(checkOut),
            totalAmount: totalAmount,
        })
        await booking.save()
        res.status(201).json({
            message: "Booking  successfully",
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const bookings = await Booking.find().populate(
            'hotelId'
        ).populate('roomId')
        res.json(bookings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getPK_Key = async (req, res) => {
    try {
        res.status(200).json({
            message: process.env.PK_KEY
        })
    }
    catch (err) { res.status(500).json({ message: err.message }) }
}

module.exports = {
    createPayment,
    add,
    getAll,
    getPK_Key
}