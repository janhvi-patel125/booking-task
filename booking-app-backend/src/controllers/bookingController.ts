import { Request, Response } from "express";
import Booking from "../models/booking";

export const booking = async (req: Request, res: Response) => {
    const { user_id, booking_date, booking_type, booking_slot, booking_time, customer_name, customer_email } = req.body;

    try {
        // Check for existing bookings on the same date
        const existingBookings = await Booking.findAll({ where: { booking_date } });

        for (const existingBooking of existingBookings) {
            if (existingBooking.dataValues.booking_type === 'Full Day') {
                return res.status(400).json({ message: "Full day is already booked for this date." });
            }

            if (existingBooking.dataValues.booking_type === 'Half Day') {
                if (booking_type === 'Full Day' || (booking_type === 'Custom' && booking_slot === existingBooking.dataValues.booking_slot)) {
                    return res.status(400).json({ message: "Conflicting booking with existing half day booking." });
                }
            }

            if (existingBooking.dataValues.booking_type === 'Custom') {
                if (booking_type === 'Custom' && existingBooking.dataValues.booking_time === booking_time) {
                    return res.status(400).json({ message: "This time slot is already booked." });
                }
            }
        }

        const newBooking = await Booking.create({
            user_id: user_id,
            booking_date: booking_date,
            booking_type: booking_type,
            booking_slot: booking_slot,
            booking_time: booking_time,
            customer_name: customer_name,
            customer_email: customer_email
        });
        res.status(200).json({ message: "Booking created successfully", booking: newBooking });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}