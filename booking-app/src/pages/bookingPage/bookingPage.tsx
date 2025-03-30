import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createBooking } from "../../features/booking/bookingSlice";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BookingForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [bookingType, setBookingType] = useState<string>("");
    const [bookingSlot, setBookingSlot] = useState<string>("");
    const [bookingTime, setBookingTime] = useState<Dayjs | null>(null);
    const [customerName, setCustomerName] = useState<string>("");
    const [customerEmail, setCustomerEmail] = useState<string>("");
    const [bookingDate, setBookingDate] = useState<string>("");

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    }
    const handleSubmit = async () => {
        const userId = localStorage.getItem('user_id') || '';

        const bookingData = {
            customer_name: customerName,
            customer_email: customerEmail,
            booking_date: bookingDate,
            booking_time: bookingType === "Custom" ? bookingTime?.format("HH:mm") : null,
            booking_type: bookingType,
            booking_slot: bookingType === "Half Day" ? bookingSlot : null,
            user_id: userId,
        };

        try {
            const response = await dispatch(createBooking(bookingData));
            if (response.meta.requestStatus === 'fulfilled') {
                setCustomerName("");
                setCustomerEmail("");
                setBookingDate("");
                setBookingType("");
                setBookingSlot("");
                setBookingTime(null);
            }
        } catch (error) {
            console.error("Booking submission failed:", error);
        }
    };

    return (
        <>
        <Card style={{ maxWidth: 500, margin: "50px auto", padding: 20, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: 10 }}>
            <CardContent>
                <Typography variant="h5" align="center" gutterBottom>
                    Booking Form
                </Typography>
                <TextField
                    fullWidth
                    label="Customer Name"
                    margin="normal"
                    size="small"
                    variant="outlined"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Customer Email"
                    type="email"
                    size="small"
                    margin="normal"
                    variant="outlined"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Booking Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    variant="outlined"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    inputProps={{
                        min: new Date().toISOString().split('T')[0]
                    }}
                />

                <FormControl fullWidth margin="normal" variant="outlined" size="small">
                    <InputLabel>Booking Type</InputLabel>
                    <Select
                        value={bookingType}
                        onChange={(e) => setBookingType(e.target.value as string)}
                        label="Booking Type"
                    >
                        <MenuItem value="Full Day">Full Day</MenuItem>
                        <MenuItem value="Half Day">Half Day</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                    </Select>
                </FormControl>

                {bookingType === "Half Day" && (
                    <FormControl fullWidth margin="normal" variant="outlined" size="small">
                        <InputLabel>Booking Slot</InputLabel>
                        <Select
                            value={bookingSlot}
                            onChange={(e) => setBookingSlot(e.target.value as string)}
                            label="Booking Slot"
                        >
                            <MenuItem value="First Half">First Half</MenuItem>
                            <MenuItem value="Second Half">Second Half</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {bookingType === "Custom" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopTimePicker
                            label="Booking Time"
                            value={bookingTime}
                            onChange={(newValue) => setBookingTime(newValue)}
                            slotProps={{ textField: { fullWidth: true, margin: "normal", variant: "outlined", size: "small" } }}
                        />
                    </LocalizationProvider>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 20, padding: 10, fontSize: 16, fontWeight: "bold" }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Box>
        </>
    );
};

export default BookingForm;
