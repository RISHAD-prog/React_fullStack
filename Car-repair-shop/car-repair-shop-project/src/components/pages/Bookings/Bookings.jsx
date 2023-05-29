import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import { useState } from "react";
import BookingRow from "./BookingRow";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const handleDelete = id => {
        const proceed = confirm('Are You sure you want to delete');
        if (proceed) {
            fetch(`https://car-doc-server-wine.vercel.app/bookings/${id}`,
                {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successful');
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
        }

    }
    const handleBookingConfirm = id => {
        fetch(`https://car-doc-server-wine.vercel.app/bookings/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ status: 'confirmed' })
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("service has been confirmed");
                    const update = bookings.find(booking => booking._id === id);
                    const remaining = bookings.filter(booking => booking._id !== id);
                    update.status = "confirmed";
                    const newBooking = [update, ...remaining];
                    setBookings(newBooking);
                }
            })
    }
    const url = `https://car-doc-server-wine.vercel.app/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-access-token')}`
            },

        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setBookings(data)
                }
                else {
                    navigate("/")
                }
            })

    }, [url, navigate])

    return (
        <div>
            <h2 className="text-5xl">Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;