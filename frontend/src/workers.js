import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Workers() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [newTempory, setNewTempory] = useState({
    EmployeeID: '',
    NameWithInitials: '',
    PhoneNumber: '',
    AssignedTask: '',
    EmployeeEmail: '',
    Date: '',
    AdminEmail: '',
  });

  const [errors, setErrors] = useState({}); // For storing validation errors
  const [Tempemployees, setTempEmployees] = useState([]); // Read

  const handleTempEmployee = (e) => {
    const { name, value } = e.target;
    setNewTempory({ ...newTempory, [name]: value });
  };

  // Validation logic
  const validateForm = () => {
    const errors = {};
    if (!newTempory.EmployeeID.trim()) errors.EmployeeID = 'Employee ID is required';
    if (!newTempory.NameWithInitials.trim()) errors.NameWithInitials = 'Name is required';
    if (!newTempory.PhoneNumber || !/^\d{10}$/.test(newTempory.PhoneNumber)) errors.PhoneNumber = 'Valid 10-digit phone number is required';
    if (!newTempory.AssignedTask.trim()) errors.AssignedTask = 'Assigned task is required';
    if (!newTempory.EmployeeEmail || !/\S+@\S+\.\S+/.test(newTempory.EmployeeEmail)) errors.EmployeeEmail = 'Valid email is required';
    if (!newTempory.Date) errors.Date = 'Date is required';
    if (!newTempory.AdminEmail || !/\S+@\S+\.\S+/.test(newTempory.AdminEmail)) errors.AdminEmail = 'Valid admin email is required';
    return errors;
  };

  const handleTempForSave = (e) => {
    e.preventDefault(); // Prevent default form submission
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios
        .post('http://localhost:8001/TempPost/save', { Tempory: newTempory })
        .then((response) => {
          if (response.data.success) {
            setTempEmployees([...Tempemployees, response.data.Tempory]);
            setNewTempory({
              EmployeeID: '',
              NameWithInitials: '',
              PhoneNumber: '',
              AssignedTask: '',
              EmployeeEmail: '',
              Date: '',
              AdminEmail: '',
            });
          } else {
            alert('Error while adding data.');
          }
        })
        .catch((error) => {
          alert('Error while adding data.');
        });
    }
  };

  // Handle cancel button click
  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <div className="Kaviex">
        <form>
          <h3>Temporary Workers Details</h3>

          <label htmlFor="id">Employee Id</label>
          <input
            type="text"
            id="id"
            name="EmployeeID"
            value={newTempory.EmployeeID}
            onChange={handleTempEmployee}
          />
          {errors.EmployeeID && <p style={{ color: 'red' }}>{errors.EmployeeID}</p>}

          <label htmlFor="name">Name with initials</label>
          <input
            type="text"
            id="name"
            name="NameWithInitials"
            value={newTempory.NameWithInitials}
            onChange={handleTempEmployee}
          />
          {errors.NameWithInitials && <p style={{ color: 'red' }}>{errors.NameWithInitials}</p>}

          <label htmlFor="num">Phone number</label>
          <input
            type="text"
            id="num"
            name="PhoneNumber"
            value={newTempory.PhoneNumber}
            onChange={handleTempEmployee}
          />
          {errors.PhoneNumber && <p style={{ color: 'red' }}>{errors.PhoneNumber}</p>}

          <label htmlFor="at">Assigned task</label>
          <input
            type="text"
            id="at"
            name="AssignedTask"
            value={newTempory.AssignedTask}
            onChange={handleTempEmployee}
          />
          {errors.AssignedTask && <p style={{ color: 'red' }}>{errors.AssignedTask}</p>}

          <label htmlFor="email">Employee Email</label>
          <input
            type="email"
            id="email"
            name="EmployeeEmail"
            value={newTempory.EmployeeEmail}
            onChange={handleTempEmployee}
          />
          {errors.EmployeeEmail && <p style={{ color: 'red' }}>{errors.EmployeeEmail}</p>}

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="Date"
            value={newTempory.Date}
            onChange={handleTempEmployee}
          />
          {errors.Date && <p style={{ color: 'red' }}>{errors.Date}</p>}

          <label htmlFor="Aemail">Admin Email</label>
          <input
            type="email"
            id="Aemail"
            name="AdminEmail"
            value={newTempory.AdminEmail}
            onChange={handleTempEmployee}
          />
          {errors.AdminEmail && <p style={{ color: 'red' }}>{errors.AdminEmail}</p>}

          <button
            id="Kavibt"
            type="submit"
            onClick={handleTempForSave}
          >
            Save
          </button>
          <button
            id="Kavibt1"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default Workers;
