import React, { useState, useEffect } from 'react';
import axios from 'axios';
const HotelList = ({ searchLocation, locationType, bedroomNumber }) => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get('http://localhost:5000/api/hotels', {
                params: {
                    location: searchLocation,
                    type: locationType,
                    numOfBedrooms: bedroomNumber
                }
            });
            setHotels(res.data);
        };
        fetchItems();
    }, [locationType, bedroomNumber, searchLocation]);

    return (
        <div>
            <h1>Hotels</h1>
            <ul>
                {hotels.map(hotel => (
                    <li key={hotel._id}>
                        <a href={`/hotel/${hotel._id}`}>{hotel.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelList;