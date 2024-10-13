import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelDetail = ({ hotelId }) => {
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const res = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
            setHotel(res.data);
        };
        fetchItem();
    }, [hotelId]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{hotel.name}</h1>
            <p>{hotel.description}</p>
            <p>Location: {hotel.location}</p>
            <p>Number of bedrooms: {hotel.numOfBedrooms}</p>
            <p>Price: ${hotel.price}</p>
        </div>
    );
};

export default HotelDetail;