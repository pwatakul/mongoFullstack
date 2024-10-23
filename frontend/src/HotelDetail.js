import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HotelDetail = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const res = await axios.get(`http://localhost:6001/api/hotels/${id}`);
            setHotel(res.data);
        };
        fetchItem();
    }, [id]);

    if (!hotel) {
        return <div>Loading...</div>;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const submit = async () => {
            try {
                return await axios.post(`http://localhost:6001/api/hotels/${id}`, data);
                 
            } catch (error) {
                console.error("There was an error submitting the form!", error);
            }
        };

        submit().then((res) => {
            if (res.status === 201) {
                alert("Booking successful!");
                window.location.href = '/';
            }
        });

    };



    return (
        <div className="container mt-5">
            <div className="card bg-dark text-white">
                <div className="card-body">
                    <h1 className="card-title mb-4">{hotel.name}</h1>
                    <p className="card-text mb-3">{hotel.description}</p>
                    <p className="card-text mb-3">Number of bedrooms: {hotel.bedrooms}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Check-in Date:</label>
                            <input type="date" className="form-control" name="checkin" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Check-out Date:</label>
                            <input type="date" className="form-control" name="checkout" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input type="text" className="form-control" name="name" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" name="email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Your Mobile Number:</label>
                            <input type="tel" className="form-control" name="mobileNumber" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Postal Address:</label>
                            <input type="text" className="form-control" name="postalAddress" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Residential Address:</label>
                            <input type="text" className="form-control" name="residentialAddress" />
                        </div>
                        <button type="submit" className="btn btn-primary">Book Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HotelDetail;