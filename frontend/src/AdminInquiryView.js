import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CustomerView.css';
import './Customer.css';

function View() {
  const [items, setItems] = useState([]);
  // const [display, setDisplay] = useState(false);
  // const [itemId, setItemId] = useState('');
  // const [Status, setstatus] = useState('');

  // Read
  useEffect(() => {
    axios.get('http://localhost:8001/inquiry/read')
      .then(response => {
        if (response.data.success) {
          setItems(response.data.inquiry);
        } else {
          alert('Failed to fetch posts');
        }
      })
      .catch(error => {
        alert('There was an error fetching the posts!', error);
      });
  }, []);

  // Update
  // const handleUpdate = (itemId) => {
  //   axios.put(`http://localhost:8000/SupplierTable/update/${itemId}`, {
  //       status: Status
  //   })
  //   .then(response => {
  //       if (response.data.success) {
  //           alert("Data updated successfully");
  //           setDisplay(false); // Close the modal after updating
  //       } else {
  //           alert('Data not updated.');
  //       }
  //   })
  //   .catch(error => {
  //       alert('Error updating data.');
  //   });
  // };

  return (
    <>
      <header></header>

      <div className="container1">
        <h3>Inquiry Details</h3>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Preferred Method Of Response</th>
              <th>Questionor Concerns</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item)=> (
              <tr key={item._id}>
                <td>{item.inquiryTable?.Name}</td>
                  <td>{item.inquiryTable?.Email}</td>
                  <td>{item.inquiryTable?.Phone_Number}</td>
                  <td>{item.inquiryTable?.PreferredMethodOfResponse}</td>
                  <td>{item.inquiryTable?.QuestionorConcerns}</td>
                  <td>Pendding</td>
                  <td>
                    <button
                      className='edit'
                      // onClick={() => {
                      //   setDisplay(true);
                      //   setItemId(item._id);
                      //   setstatus(item.supplierTable.status);
                      // }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* {display && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDisplay(false)}>&times;</span>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(itemId); }}>
              <p className='id'>{itemId}</p>
              <p>Status :</p>
              <div className="input_box">
                <input
                  type="text"
                  placeholder="Update Status"
                  name="status"
                  className="name"
                  value={Price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <br />
                <button className='update' type="submit">Update</button>
            </form>
          </div>
        </div>
      )} */}
    </>
  );
}

export default View;

