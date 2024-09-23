/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryForm.css';
import axios from 'axios';

function Form() {
  const navigate = useNavigate();
  const [oDelivery, setODelivery] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    vehicleid: '',
    vehicletype: '',
    vehiclenumber: '',
    driverid: '',
    drivername: '',
    driverconno: '',
  });

  // Fetch existing deliveries on mount
  useEffect(() => {
    axios.get('http://localhost:8000/deliveryvehicle')
      .then(response => {
        if (response.data.success) {
          setODelivery(response.data.vehicles); // Ensure this is the correct key
        } else {
          alert('Failed to fetch vehicles');
        }
      })
      .catch(error => {
        console.error('Error fetching deliveries:', error);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({
      ...newDelivery,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/deliveryvehicle/save', { 
      VehicleDriver: newDelivery 
    })
    .then(response => {
      if (response.data.success) {
        setODelivery([...oDelivery, response.data.VehicleDriver]);
        setNewDelivery({
          vehicleid: '',
          vehicletype: '',
          vehiclenumber: '',
          driverid: '',
          drivername: '',
          driverconno: ''
        });
        alert('Success in adding new delivery');
        window.location.reload(); // Reload the page after successful submission
      } else {
        alert('Failed to add new delivery');
      }
    })
    .catch(error => {
      console.error('Error adding new delivery:', error);
      alert('There was an error');
    });
  };

  return (
    <div className="delivery-form-container">
      <h1>Fleet and Driver Management</h1>
      <div className="button-container1">
        <button className="btn1" onClick={() => navigate('/')}>View Vehicles and Drivers</button><br />
        <button className="btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>
      <hr />
      <div className="page-container1">
        <div className="left-side1">
          <table className="vehicle-tablee">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Driver Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {oDelivery.map((delivery2) => (
                delivery2 && delivery2._id ? ( // Check if delivery2 and _id are defined
                  <tr key={delivery2._id}>
                    <td><b>{delivery2?.VehicleDriver?.vehicleid || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.vehicletype || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.vehiclenumber || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.driverid || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.drivername || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.driverconno || 'N/A'}</b></td>
                    <td>
                      <button className="delete-button">Delete</button>
                    </td>
                  </tr>
                ) : null // Render nothing if delivery2 or _id is not defined
              ))}
            </tbody>
          </table>
          <div className="page-container1">
        <div className="right-side1">
          <div className="container1">
            <h2>Vehicle Registration & Driver Allocation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group1">
              <label htmlFor="vehicleId">Vehicle ID:</label>
              <input
                type="text"
                id="vehicleid"
                name="vehicleid"
                value={newDelivery.vehicleid}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group1">
              <label htmlFor="vehicleType">Vehicle Type:</label>
              <select
                id="vehicletype"
                name="vehicletype"
                value={newDelivery.vehicletype}
                onChange={handleInputChange}
                required
              >
                <option value="three-wheeler">Three-Wheeler</option>
                <option value="bike">Bike</option>
                <option value="van">Van</option>
              </select>
            </div>
            <div className="form-group1">
              <label htmlFor="vehicleNumber">Vehicle Number:</label>
              <input
                type="text"
                id="vehiclenumber"
                name="vehiclenumber"
                value={newDelivery.vehiclenumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group1">
              <label htmlFor="driverID">Driver ID:</label>
              <input
                type="text"
                id="driverid"
                name="driverid"
                value={newDelivery.driverid}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="driverName">Driver Name:</label>
              <input
                type="text"
                id="drivername"
                name="drivername"
                value={newDelivery.drivername}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group1">
              <label htmlFor="driverContact">Driver Contact No:</label>
              <input
                type="text"
                id="driverconno"
                name="driverconno"
                value={newDelivery.driverconno}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="button1">Submit</button>
          </form>
          </div>
          </div>
          </div>
        </div>
      </div>
      <button className="newbutton">Add new Vehicle</button>
    </div>
  );
}

export default Form;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryForm.css';
import axios from 'axios';

function Form() {
  const navigate = useNavigate();
  const [oDelivery, setODelivery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDelivery, setNewDelivery] = useState({
    vehicleid: '',
    vehicletype: '',
    vehiclenumber: '',
    driverid: '',
    drivername: '',
    driverconno: '',
  });

  // Fetch existing deliveries on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/deliveryvehicle');
        if (response.data.success) {
          setODelivery(response.data.vehicles); // Ensure this is the correct key
        } else {
          alert('Failed to fetch vehicles');
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this useEffect runs once on mount

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({
      ...newDelivery,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/deliveryvehicle/save', {
        VehicleDriver: newDelivery,
      });
      if (response.data.success) {
        setODelivery((prevDeliveries) => [...prevDeliveries, response.data.VehicleDriver]);
        setNewDelivery({
          vehicleid: '',
          vehicletype: '',
          vehiclenumber: '',
          driverid: '',
          drivername: '',
          driverconno: '',
        });
        alert('Success in adding new delivery');
        setShowForm(false); // Hide the form after submission
      } else {
        alert('Failed to add new delivery');
      }
    } catch (error) {
      console.error('Error adding new delivery:', error);
      alert('There was an error');
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deliveryvehicle/delete/${id}`);
      if (response.data.success) {
        setODelivery((prevDeliveries) => prevDeliveries.filter((oDelivery) => oDelivery._id !== id));
        alert('Data deleted');
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      alert('There was an error', error);
    }
  };

  // Handle search functionality
  const filteredDeliveries = oDelivery.filter((delivery) =>
    delivery?.VehicleDriver?.vehiclenumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="delivery-form-container">
      <h1>Fleet and Driver Management</h1>

      <div className="button-container1">
        <button className="btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>

      <hr />

      <div className="page-container1">
        <div className="left-side1">
          <button className="newbutton" onClick={() => setShowForm(true)}>Add new Vehicle</button>

          {/* Search bar to search by vehicle number */}
          <input
            type="text"
            placeholder="Search by Vehicle Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          <table className="vehicle-tablee">
            <thead>
              <tr>
                <th>Vehicle ID</th>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Driver ID</th>
                <th>Driver Name</th>
                <th>Driver Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery2) =>
                delivery2 && delivery2._id ? ( // Check if delivery2 and _id are defined
                  <tr key={delivery2._id}>
                    <td><b>{delivery2?.VehicleDriver?.vehicleid || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.vehicletype || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.vehiclenumber || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.driverid || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.drivername || 'N/A'}</b></td>
                    <td><b>{delivery2?.VehicleDriver?.driverconno || 'N/A'}</b></td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(delivery2._id)}>Delete</button>
                    </td>
                  </tr>
                ) : null // Render nothing if delivery2 or _id is not defined
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form displayed conditionally based on showForm state */}
      {showForm && (
        <div className="form-popup">
          <div className="container1">
            <h2>Vehicle Registration & Driver Allocation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group1">
                <label htmlFor="vehicleid">Vehicle ID:</label>
                <input
                  type="text"
                  id="vehicleid"
                  name="vehicleid"
                  value={newDelivery.vehicleid}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group1">
                <label htmlFor="vehicletype">Vehicle Type:</label>
                <select
                  id="vehicletype"
                  name="vehicletype"
                  value={newDelivery.vehicletype}
                  onChange={handleInputChange}
                  required
                >
                   <option value="" disabled>Select a vehicle</option>
                  <option value="three-wheeler">Three-Wheeler</option>
                  <option value="bike">Bike</option>
                  <option value="van">Van</option>
                </select>
              </div>
              <div className="form-group1">
                <label htmlFor="vehiclenumber">Vehicle Number:</label>
                <input
                  type="text"
                  id="vehiclenumber"
                  name="vehiclenumber"
                  value={newDelivery.vehiclenumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group1">
                <label htmlFor="driverid">Driver ID:</label>
                <input
                  type="text"
                  id="driverid"
                  name="driverid"
                  value={newDelivery.driverid}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="drivername">Driver Name:</label>
                <input
                  type="text"
                  id="drivername"
                  name="drivername"
                  value={newDelivery.drivername}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="driverconno">Driver Contact No:</label>
                <input
                  type="text"
                  id="driverconno"
                  name="driverconno"
                  pattern="0[0-9]{9}"  
                  maxlength="10"        
                   title="Phone number must be exactly 10 digits and start with 0"
                  value={newDelivery.driverconno}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="button1">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
