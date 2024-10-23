import React, { useState, useEffect } from 'react';
import axios from 'axios';
const HotelList = ({ searchLocation, locationType, bedroomNumber }) => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get('http://localhost:6001/api/hotels', {
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
        <div className="container mt-4">
            <h1 className="text-center mb-4">Hotels</h1>
            <div className="row">
                {hotels.map(hotel => (
                    <div key={hotel._id} className="col-12 mb-4">
                        <div className="card flex-row">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <a href={`/detail/${hotel._id}`} className="text-decoration-none">
                                        {hotel.name}
                                    </a>
                                </h5>
                                <p className="card-text"><strong>Market:</strong> {hotel.address.market}</p>
                                <p className="card-text"><strong>Description:</strong> {hotel.description}</p>
                                <p className="card-text"><strong>Property Type:</strong> {hotel.property_type}</p>
                                <p className="card-text"><strong>Bedrooms:</strong> {hotel.bedrooms}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelList;