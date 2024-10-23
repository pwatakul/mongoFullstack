import React from 'react';
import HotelList from './components/HotelList';

const Home = () => {

    const [searchLocation, setSearchLocation] = React.useState('');
    const [selectedType, setSelectedType] = React.useState('');
    const [selectedNumber, setSelectedNumber] = React.useState('');

    return (
        <div className="container mt-4 d-flex justify-content-center">
            <div className="row w-100">
                <div className="col-md-3">
                    <div className="card mb-4 mt-4">
                        <div className="card-header">
                            Filter
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">
                                    Search location:
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Search location" 
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Select type:
                                    <select 
                                        className="form-select" 
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                    >
                                        <option value="">Select type</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="House">House</option>
                                        <option value="glasshouse">glasshouse</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Select number:
                                    <select 
                                        className="form-select" 
                                        value={selectedNumber}
                                        onChange={(e) => setSelectedNumber(e.target.value)}
                                    >
                                        <option value="">Select number</option>
                                        {[...Array(10).keys()].map(num => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 mt-4">
                    <HotelList 
                        searchLocation={searchLocation} 
                        locationType={selectedType} 
                        bedroomNumber={selectedNumber} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;