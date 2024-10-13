import React from 'react';
import HotelList from './components/HotelList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HotelDetail from './components/HotelDetail';


function App() {
  const [searchLocation, setSearchLocation] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedNumber, setSelectedNumber] = React.useState('');

  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <div className="search-bar">
                  <label>
                    Search location:
                    <input 
                      type="text" 
                      placeholder="Search location" 
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </label>
                  <label>
                    Select type:
                    <select 
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
                  <label>
                    Select number:
                    <select 
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
                <HotelList 
                  searchLocation={searchLocation} 
                  locationType={selectedType} 
                  bedroomNumber={selectedNumber} 
                />
              </div>
              
            } 
          />
          <Route path="/hotel/:hotelId" element={<HotelDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;