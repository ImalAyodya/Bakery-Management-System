import React from 'react';
import '../App.css';
import '../ProductBackground.css'

const RequestStaff = () => {
  return (
    <div className="request-staff-modal">
      <h2>Request Additional Staff</h2>
      <form>
        <div className="request-form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="request-form-group">
          <label htmlFor="job-title">Job Title</label>
          <input type="text" id="job-title" placeholder="Enter your job title" />
        </div>
        <div className="request-form-group">
          <label htmlFor="department">Department</label>
          <input type="text" id="department" placeholder="Enter your department" />
        </div>
        <div className="request-form-group">
          <label htmlFor="staff-needed">Additional Staff Needed</label>
          <input type="number" id="staff-needed" placeholder="Enter the number" />
        </div>
        <div className="request-form-group request-full-width">
          <label htmlFor="justification">Justification</label>
          <textarea id="justification" placeholder="Provide a brief justification"></textarea>
        </div>
        <button type="submit" className="request-submit-btn">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestStaff;
