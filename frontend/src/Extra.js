import React, { useState , useEffect} from 'react';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Extra(){

  const[Tempemployees,setTempEmployees]= useState([]);//read
  const [schInput, setSchInput] = useState('');//search

  useEffect(()=>{   //Read
    axios.get('http://localhost:8001/TempPost')
    .then(response => {
       if(response.data.success){
        setTempEmployees(response.data.Tempory);
       }else{
         alert('failed');
       }
    })
    .catch(error=>{
      alert('There was an error fetching the post',error)
    });
  });

  const handleTempDelete = (id) => {   //delete
    axios.delete(`http://localhost:8001/TempPost/delete/${id}`)
    .then(response => {
        if(response.data.success){
          setTempEmployees(Tempemployees.filter(Tempemployees => Tempemployees._id === id));
              alert('Data deleted Successfully');
        }
        else{
            alert('Failed to delete data');
        }
    })

    .catch(error =>{
        alert('There was an error in deleting items')
    })
  }
 
   //search filter
   const filteredEmp = Tempemployees.filter(Temp =>
    Temp.Tempory && Temp.Tempory.Date.toUpperCase().includes(schInput.toUpperCase())
  );
  
    return(
        <>
        
         <div className = 'Kavitopic'>
            <h1>Tempory workers for bulk orders</h1>
            <div className="Kavisch"><input type="text" placeholder="Search: Enter Date"
             value={schInput}
             onChange={(e) => setSchInput(e.target.value)}
            /></div>
         </div>
         <div className='KavitableContain'>
            <table>
              <thead>
                <tr>
                  <th>Employee Id</th>
                  <th>Date</th>
                  <th>Name with initials</th>
                  <th>Phone number</th>
                  <th>Assigned task</th>
                  <th>Employee Email</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                   {filteredEmp.map((Temp)=>(

           <tr key={Temp._id}>
                 <td className=""> <b> {Temp.Tempory.EmployeeID}</b></td>
                 <td className=""> <b> {Temp.Tempory.Date}</b></td>
                 <td className=""> <b> {Temp.Tempory.NameWithInitials}</b></td>
                 <td className=""> <b> {Temp.Tempory.PhoneNumber}</b></td>
                 <td className=""> <b> {Temp.Tempory.AssignedTask}</b></td>
                 <td className=""> <b> {Temp.Tempory.EmployeeEmail}</b></td>
              
                <td><button id ="Kavibut1"onClick ={() => handleTempDelete(Temp._id)}>Delete</button></td>
            </tr>  
                  
                ))
                }
                 
              </tbody>
            </table>
          </div>
         
      
        </>
    )
}
export default Extra;