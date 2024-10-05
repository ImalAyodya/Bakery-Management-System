import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './OrderDelivery.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // for Chart.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable'; // For generating tables in PDF
import HeaderAdmin from './HeaderAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function OrderDelivery() {
  //declare the usestates and usernavigtion
  const navigate = useNavigate();
  const [addDelivery, setAddDelivery] = useState(false);
  const [itemId, setItemId] = useState('');
  const [addStatus, setAddStatus] = useState('');
  const [oDelivery, setODelivery] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    orderid: '',
    orderlocation: '',
    ordertype:'',
    assigneddriver: '',
    diliveryvehicle: '',
    diliverydate: '',
    diliverystatus: '',
  });
//search function
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = oDelivery.filter((delivery) =>
    delivery.OrderDelivery?.orderid.toLowerCase().includes(searchTerm.toLowerCase())
  );
//input chnage 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery({ ...newDelivery, [name]: value });
  };
//read eka
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/deliveryorder/save', { OrderDelivery: newDelivery })
      .then(response => {
        if (response.data.success) {
          setODelivery([...oDelivery, response.data.orderDelivery]);
          setNewDelivery({ orderid: '', orderlocation: '', ordertype:'',assigneddriver: '', diliveryvehicle: '', diliverydate: '', diliverystatus: '' });
          alert('success to add new delivery');
        } else {
          alert('Failed to add new delivery');
        }
      })
      .catch(error => {
        alert('There was an error', error);
      });
  };
//create eka
  useEffect(() => {
    axios.get('http://localhost:8000/deliveryorder')
      .then(response => {
        if (response.data.success) {
          setODelivery(response.data.mypost);
        } else {
          alert('Unsuccessful');
        }
      })
      .catch(error => {
        alert('There was an error fetching the posts', error);
      });
  }, []);
//update eka
  const handleUpdate = (itemId) => {
    axios.put(`http://localhost:8000/deliveryorder/update/${itemId}`, { diliverystatus: addStatus })
      .then(response => {
        if (response.data.success) {
          setODelivery(oDelivery.map(ex =>
            ex._id === itemId ? { ...ex, OrderDelivery: { ...ex.OrderDelivery, diliverystatus: addStatus } } : ex
          ));
          alert('Data updated successfully');
        } else {
          alert('Data not updated');
        }
      })
      .catch(error => {
        console.error('There was an error', error);
        alert('Error occurred');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/deliveryorder/delete/${id}`)
      .then(response => {
        if (response.data.success) {
          setODelivery(oDelivery.filter(oDelivery => oDelivery._id !== id));
          alert('Data deleted');
        } else {
          alert('Failed to delete');
        }
      })
      .catch(error => {
        alert('There was an error', error);
      });
  };
  
  const [showForm, setShowForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedDate, setSelectedDate] = useState(''); // Added state for date selection

  const formAnimation = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 200, friction: 20 },
  });
 
  // Pie chart data and logic
  const getOrderDataForDate = (date) => {
    const filteredOrdersByDate = oDelivery.filter(
      (order) => order.OrderDelivery?.diliverydate === date
    );
    const locationCounts = {};

    filteredOrdersByDate.forEach((order) => {
      const location = order.OrderDelivery?.orderlocation || 'Unknown';
      if (locationCounts[location]) {
        locationCounts[location] += 1;
      } else {
        locationCounts[location] = 1;
      }
    });

    return locationCounts;
  };

  const pieData = {
    labels: Object.keys(getOrderDataForDate(selectedDate)),
    datasets: [
      {
        label: 'Orders by Location',
        data: Object.values(getOrderDataForDate(selectedDate)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FFA726'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FFA726'],
      },
    ],
  };
//showing and closing forms
  const handleNewOrderClick = () => {
    setShowForm(!showForm);
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleUpdateClick = (id) => {
    setItemId(id);
    setAddDelivery(true);
  };

  const closeModal = () => {
    setAddDelivery(false);
  };
//report make and generate pdf
const handleGenerateReport = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Delivery Report', 14, 22);

  const filteredOrdersByDate = oDelivery.filter(
    (order) => order.OrderDelivery?.diliverydate === selectedDate
  );

  if (filteredOrdersByDate.length === 0) {
    doc.text(`No deliveries found for the selected date: ${selectedDate}`, 14, 40);
  } else {
    const tableData = filteredOrdersByDate.map((order) => [
      order.OrderDelivery?.orderid,
      order.OrderDelivery?.orderlocation,
      order.OrderDelivery?.ordertype,
      order.OrderDelivery?.assigneddriver,
      order.OrderDelivery?.diliveryvehicle,
      order.OrderDelivery?.diliverystatus,
    ]);

    doc.autoTable({
      head: [['Order ID', 'Location','type', 'Driver', 'Vehicle', 'Status']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      //headStyles: { fillColor: [0, 153, 255] },  background color
      //styles: { 
       // fillColor: [255, 255, 255], // Rowcolor
        //textColor: [0, 0, 0], // Textcolor

    });
  }

  doc.save(`Delivery_Report_${selectedDate}.pdf`);
};


  return (
    <div>
      <HeaderAdmin/>
      <br></br><br></br><br></br>
      <h1>Manage Delivery Executive</h1>
      <div className="das-button-container1">
        <button className="das-btn1" onClick={() => navigate('/Form')}>View Vehicles and Drivers</button><br />
        <button className="das-btn1" onClick={() => navigate('/OrderDelivery')}>Order Delivery</button><br />
        <button className="das-btn1" onClick={() => navigate('/dailyroute')}>Daily Delivery Stocks</button>
      </div>
  <hr/>
      
      
      <div className="das-search-container">
        <input type="text" placeholder="Search by Order ID" className="das-search-input" value={searchTerm} 
          onChange={handleSearchChange}  />
        <i className="das-fas fa-search search-icon"></i>
      </div>
      

      <div className="das-orders-container2">
      <button className="das-new-order-button" onClick={handleNewOrderClick}>
          <span className="das-plus-icon">+</span>
          {showForm ? 'Hide New Order Form' : 'Place New Order'}
        </button>
        <br />
        <button className="das-summary-button" onClick={handleShowSummary}>
          View Order Summary
        </button>
       
        <table className="das-orders-table2">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Location</th>
              <th>Order type</th>
              <th>Assigned Driver</th>
              <th>Delivery Vehicle</th>
              <th>Delivery Date</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((delivery) => (
              <tr key={delivery._id}>
                <td><b>{delivery.OrderDelivery?.orderid}</b></td>
                <td><b>{delivery.OrderDelivery?.orderlocation}</b></td>
                <td><b>{delivery.OrderDelivery?.ordertype}</b></td>
                <td><b>{delivery.OrderDelivery?.assigneddriver}</b></td>
                <td><b>{delivery.OrderDelivery?.diliveryvehicle}</b></td>
                <td><b>{delivery.OrderDelivery?.diliverydate}</b></td>
                <td><b>{delivery.OrderDelivery?.diliverystatus}</b></td>
                <td>
                  <button className="das-update-button" onClick={() => handleUpdateClick(delivery._id)}>Update</button><br /><br />
                  <button className="das-delete-button" onClick={() => handleDelete(delivery._id)}> Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>

      <animated.div style={formAnimation} className="das-form-popup2">
        <form className="das-form2" onSubmit={handleSubmit}>
          <h1>New Order Delivery</h1>
          <div className="das-form-group2">
            <label htmlFor="das-orderId">Order ID:</label>
            <input type="text" id="orderId" name="orderid" value={newDelivery.orderid} onChange={handleInputChange}pattern="[A-Za-z0-9]+" title="Please enter numbers only" required />
          </div>
          <div className="das-form-group2">
            <label htmlFor="orderLocation">Order Location:</label>
            <input type="text" id="orderLocation" name="orderlocation" value={newDelivery.orderlocation} onChange={handleInputChange} minlength="5"  pattern="[A-Za-z0-9\s]+"  required />
          </div>
          <div className="das-form-group2">
            <label htmlFor="ordertype">Order Type:</label>
            <select id="ordertype" name="ordertype" value={newDelivery.ordertype} onChange={handleInputChange} minlength="5"    required >
            <option value="" disabled>Select order size</option>
              <option value="Bulk order">Bulk order</option>
              <option value="Online order -small">Online order -small</option>
              <option value="Online order-large">Online order-large</option>
              </select>
          </div>
          <div className="das-form-group2">
            <label htmlFor="assignedDriver">Assigned Driver:</label>
            <select id="assignedDriver" name="assigneddriver" value={newDelivery.assigneddriver} onChange={handleInputChange} required>
              <option value="" disabled>Select a driver</option>
              <option value="d001-Mr.kamal">d001-Mr.kamal</option>
              <option value="d002-Mr.Namal">d002-Mr.Namal</option>
              <option value="d003-Mr.Perera">d003-Mr.Perera</option>
              <option value="d004-Mr.Lohith">d004-Mr.Lohith</option>
              <option value="d005-Mr.Nawan">d005-Mr.Nawan</option>
            </select>
          </div>
          <div className="das-form-group2">
            <label htmlFor="deliveryVehicle">Delivery Vehicle:</label>
            <input type="text" id="deliveryVehicle" name="diliveryvehicle" value={newDelivery.diliveryvehicle} onChange={handleInputChange} required/ >
              
            
          </div>
          <div className="das-form-group2">
            <label htmlFor="deliveryDate">Delivery Date:</label>
            <input type="date" id="deliveryDate" name="diliverydate" value={newDelivery.diliverydate} onChange={handleInputChange} required />
          </div>
          <div className="das-form-group2">
            <label htmlFor="deliveryStatus">Delivery Status:</label>
            <select id="deliveryStatus" name="diliverystatus" value={newDelivery.diliverystatus} onChange={handleInputChange} required>
            <option value="" disabled>Select Status</option>
              <option value="pending">Pending</option>
              <option value="inTransit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <button className="das-das-submit-button" type="submit">Submit</button>
        </form>
      </animated.div>
      
      {addDelivery && (
        <div className="das-modal-overlay">
          <div className="das-modal-content">
            <form onSubmit={() => handleUpdate(itemId)}>
              <div className="das-form-group2">
                <label htmlFor="status">Update Delivery Status:</label>
                <select
                  type="text"
                  id="status"
                  name="status"
                  value={addStatus}
                  onChange={(e) => setAddStatus(e.target.value)}
                >
                   <option value="" disabled>Change Status</option>
              <option value="pending">Pending</option>
              <option value="inTransit">In Transit</option>
              <option value="delivered">Delivered</option>
                  </select>
              </div>
              <button type="submit" className="das-btn">Update</button>
              <button type="button" className="das-btn" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="das-order-summary-modal">
          <div className="das-order-summary-content">
            <h2>Order Summary</h2>
            <label htmlFor="selectDate">Select Date:</label>
            <input
              type="date"
              id="selectDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Pie data={pieData} width={200} height={200} />
            <div className="das-bt-con">
            <button className="das-generate-report-button" onClick={handleGenerateReport}>
             Generate Report
             </button>
            <button className="das-close-summary-button" onClick={handleCloseSummary}>
              Close Summary
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDelivery;

