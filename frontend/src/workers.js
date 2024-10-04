import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Full.css';

function Workers() {
  const navigate = useNavigate();
  const [newTemporary, setNewTemporary] = useState({
    EmployeeID: '',
    NameWithInitials: '',
    PhoneNumber: '',
    AssignedTask: '',
    AssignedDate: '',
    EmployeeEmail: '',
    Date: '',
    AdminEmail: '',
  });

  const [errors, setErrors] = useState({});
  const [tempEmployees, setTempEmployees] = useState([]);

  const handleTempEmployee = (e) => {
    const { name, value } = e.target;
    setNewTemporary({ ...newTemporary, [name]: value });
  };

  // Validation logic
  const validateForm = () => {
    const errors = {};
    if (!newTemporary.EmployeeID.trim()) errors.EmployeeID = 'Employee ID is required';
    if (!newTemporary.NameWithInitials.trim()) errors.NameWithInitials = 'Name is required';
    if (!newTemporary.PhoneNumber || !/^\d{10}$/.test(newTemporary.PhoneNumber)) errors.PhoneNumber = 'Valid 10-digit phone number is required';
    if (!newTemporary.AssignedTask.trim()) errors.AssignedTask = 'Assigned task is required';
    if (!newTemporary.EmployeeEmail || !/\S+@\S+\.\S+/.test(newTemporary.EmployeeEmail)) errors.EmployeeEmail = 'Valid email is required';
    if (!newTemporary.Date) errors.Date = 'Date is required';
    if (!newTemporary.AdminEmail || !/\S+@\S+\.\S+/.test(newTemporary.AdminEmail)) errors.AdminEmail = 'Valid admin email is required';
    return errors;
  };

  const handleTempForSave = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios.post('http://localhost:8001/TempPost/save', { Tempory: newTemporary })
        .then((response) => {
          if (response.data.success) {
            setTempEmployees([...tempEmployees, response.data.tempory]);
            setNewTemporary({
              EmployeeID: '',
              NameWithInitials: '',
              PhoneNumber: '',
              AssignedTask: '',
              AssignedDate: '',
              EmployeeEmail: '',
              Date: '',
              AdminEmail: '',
            });
            navigate('/Extra'); // Navigate after successful save
          } else {
            alert('Error while adding data.');
          }
        })
        .catch((error) => {
          alert('Error while adding data.');
        });
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate('/employees');
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
            value={newTemporary.EmployeeID}
            onChange={handleTempEmployee}
          />
          {errors.EmployeeID && <p style={{ color: 'red' }}>{errors.EmployeeID}</p>}

          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="Date"
            value={newTemporary.Date}
            onChange={handleTempEmployee}
          />
          {errors.Date && <p style={{ color: 'red' }}>{errors.Date}</p>}

          <label htmlFor="name">Name with initials</label>
          <input
            type="text"
            id="name"
            name="NameWithInitials"
            value={newTemporary.NameWithInitials}
            onChange={handleTempEmployee}
          />
          {errors.NameWithInitials && <p style={{ color: 'red' }}>{errors.NameWithInitials}</p>}

          <label htmlFor="num">Phone number</label>
          <input
            type="text"
            id="num"
            name="PhoneNumber"
            value={newTemporary.PhoneNumber}
            onChange={handleTempEmployee}
          />
          {errors.PhoneNumber && <p style={{ color: 'red' }}>{errors.PhoneNumber}</p>}

          <label htmlFor="at">Assigned task</label>
          <input
            type="text"
            id="at"
            name="AssignedTask"
            value={newTemporary.AssignedTask}
            onChange={handleTempEmployee}
          />
          {errors.AssignedTask && <p style={{ color: 'red' }}>{errors.AssignedTask}</p>}

          <label htmlFor="email">Employee Email</label>
          <input
            type="email"
            id="email"
            name="EmployeeEmail"
            value={newTemporary.EmployeeEmail}
            onChange={handleTempEmployee}
          />
          {errors.EmployeeEmail && <p style={{ color: 'red' }}>{errors.EmployeeEmail}</p>}

          <div className='KaviAdminEmail'>
          <label htmlFor="adminEmail">Admin Email</label>
          <input
            type="email"
            id="adminEmail"
            name="AdminEmail"
            value={newTemporary.AdminEmail}
            onChange={handleTempEmployee}
          />
          {errors.AdminEmail && <p style={{ color: 'red' }}>{errors.AdminEmail}</p>}
          </div>

          <div className='KaviAssiDate'>
          <label htmlFor="assignedDate">Assigned Date</label>
          <input
            type="date"
            id="assignedDate"
            name="AssignedDate"
            value={newTemporary.AssignedDate}
            onChange={handleTempEmployee}
          />
          </div>
        

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