import React, { useState, useEffect } from 'react';
import './Nwplan.css';
import './tables.css';

import TargetPlan from './components/targetplanbtn';
import Buttonrow from "./components/Buttonrow";
import axios from 'axios';

function Nwplan() {
  const [addTargetPlan, setAddTargetPlan] = useState(false);
  const [itemid, setItemid] = useState('');
  const [edate, setEdate] = useState('');
  const [eqnty, setEqnty] = useState('');
  const [targetplan, setTargetplan] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/saleplan')
      .then(response => {
        if (response.data.success) {
          setTargetplan(response.data.mypost);
        } else {
          alert('Failed to read');
        }
      })
      .catch(error => {
        alert('There was an error fetching the post', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8001/saleplan/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          setTargetplan(targetplan.filter(plan => plan._id !== id));
          alert('Data deleted successfully');
        } else {
          alert('Failed to delete data');
        }
      })
      .catch(error => {
        alert('There was an error in deleting items');
      });
  };

  const handleUpdates = (itemid) => {
    axios.put(`http://localhost:8001/saleplan/update/${itemid}`, {
      date: edate,
      predictedQuantity: eqnty
    })
      .then(response => {
        if (response.data.success) {
          setTargetplan(targetplan.map(newone =>
            newone._id === itemid ? { ...newone, targetPlan: { ...newone.targetPlan, date: edate, predictedQuantity: eqnty } } : newone
          ));
          alert('Data updated successfully');
        } else {
          alert('Data not updated');
        }
      })
      .catch(error => {
        console.error('There was an error', error);
        alert('Error happened');
      });
  };

  return (
    <>
      <h1 className="salesmanag">Target plan</h1>
      <Buttonrow />
      <hr />
      <TargetPlan />
      <br /><br /><br /><br />

      <div className="table5">
        <h6 className="tableheading">Target Plan</h6>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product ID</th>
              <th>Predicted Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {targetplan.map((plan) => (
              <tr key={plan._id}>
                <td><b>{plan.targetPlan.date}</b></td>
                <td><b>{plan.targetPlan.productID}</b></td>
                <td><b>{plan.targetPlan.predictedQuantity}</b></td>
                <td>
                  <button className='tablebutton' onClick={() => { setAddTargetPlan(true); setItemid(plan._id); setEdate(plan.targetPlan.date); setEqnty(plan.targetPlan.predictedQuantity); }}>Update</button>
                  <button className='tablebutton' onClick={() => handleDelete(plan._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addTargetPlan && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Edit Target Plan</h1>
            <p>{itemid}</p>

            <label htmlFor="tpdate">Date:</label>
            <input
              type="date"
              id="tpdate"
              name="date"
              value={edate}
              onChange={(e) => setEdate(e.target.value)}
            />
            <br />

            <label htmlFor="predictedqnty">Predicted Quantity:</label>
            <input
              type="text"
              id="predictedqnty"
              name="predictedQuantity"
              value={eqnty}
              onChange={(e) => setEqnty(e.target.value)}
            />
            <br />

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleUpdates(itemid);
                setAddTargetPlan(false);
              }}
            >
              Save Edits
            </button>
            <button onClick={() => setAddTargetPlan(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Nwplan;