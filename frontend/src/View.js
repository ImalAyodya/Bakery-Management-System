import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './View.css';

function View(){
  
    const navigate = useNavigate();

    const [items, setItems] = useState([]);

    // const [display, setDisplay] = useState(false);
    // const [itemId, setItemId] = useState('');
    // const [companyName, setcompanyName] = useState('');
    // const [companyAddress, setcompanyAddress] = useState('');
    // const [email, setemail] = useState('');
    // const [mobileNumber, setmobileNumber] = useState('');
    // const [businessRegistrationNumber, setbusinessRegistrationNumber] = useState('');
    // const [supplierType, setsupplierType] = useState('');
    // const [productCategories, setproductCategories] = useState('');

    useEffect(() => {
      axios.get('http://localhost:8000/posts') 
          .then(response => {
              if (response.data.success) {
                  setItems(response.data.supplier);
              } else {
                  alert('Failed to fetch posts');
              }
          })
          .catch(error => {
              alert('There was an error fetching the posts!', error);
          });
  });

  //delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/posts/delete/${id}`)
    .then(response => {
        if(response.data.success){
            setItems(items.filter(items => items._id ===  id));
            alert('Data deleted Successfully..');
        }
        else{
            alert('Failed to delete data..');
        }
    })

    .catch(error =>{
        console.error('There was an error deleting the item:', error);
        alert('There was an error in deleting items')
    })
  }

  //update
//   const handleUpdate = (itemId) => {
//     axios.put(`http://localhost:8000/posts/update/${itemId}`, {
//       companyName: companyname,
//       companyAddress: companyaddress,
//       email: Email,
//       mobileNumber: mobilenumber,
//       businessRegistrationNumber: businessregistrationnumber,
//       supplierType: suppliertype,
//       productCategories: productcategories
//     })
//     .then(response => {
//         if (response.data.success){
//             setItems(items.map(item =>
//                 item._id === itemId ? {...item, customer: {...item.customer, companyName: companyname, companyAddress: companyaddress, email: Email, mobileNumber: mobilenumber, businessRegistrationNumber: businessregistrationnumber, supplierType: suppliertype, productCategories: productcategories } } : item
//             ));
//             alert('Data updated successfully...');
//             setDisplay(false);
//         }
//     });
// };
  // const handleUpdate = (itemId) => {
  //   axios.put(`http://localhost:8000/posts/update${itemId}, { diliverystatus: addStatus }`) 
  //     .then(response => {
  //       if (response.data.success) {
  //         setODelivery(oDelivery.map(ex =>
  //           ex._id === itemId ? { ...ex, OrderDelivery: { ...ex.OrderDelivery, diliverystatus: addStatus } } : ex
  //         ));
  //         alert('Data updated successfully');
  //       } else {
  //         alert('Data not updated');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('There was an error', error);
  //       alert('Error occurred');
  //     });
  // };

    return(
    <>
    <header>
    </header>

      <div className="container1">
        <h3>Existing Suppliers</h3>
        <button className='add' onClick={() => navigate('/SupplierForm')}>Add New suppliers</button>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Business Registration Number</th>
              <th>Supplier Type</th>
              <th>Product Categories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item)=> (
              <tr key={item._id}>
                <td>{item.supplierTable?.companyName}</td>
                <td>{item.supplierTable?.companyAddress}</td>
                <td>{item.supplierTable?.email}</td>
                <td>{item.supplierTable?.mobileNumber}</td>
                <td>{item.supplierTable?.businessRegistrationNumber}</td>
                <td>{item.supplierTable?.supplierType}</td>
                <td>{item.supplierTable?.productCategories}</td>
                <td>
                  <button className='edit' onClick={() => navigate('/SupplierForm')}>Edit</button><br></br><br></br>
                  <button className='delete' onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}  
          </tbody>
        </table>
      </div>
    </>
  );
}

export default View;