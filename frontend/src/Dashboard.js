import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Header from './components/Header'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard(){

    const Navigate = useNavigate();
    const [itemId,setItemId] = useState('');
    const [addQuantity, setAddQuantity] = useState('');
    const [remveQuantity, setRemveQuantity] = useState('');

    //input krna dewal hriyta catch krgnnwa
    const [items, setItems] = useState([]);
    const [newItem, setNewItem]= useState({
        itemCode:'',
        itemName:'',
        unitPrice:0,
        stockType:'',
        addQuantity:'',
        reOrder:''
    })


    const updateStatus=(availableQuantity, reOrder)=>{
        const available = Number(availableQuantity);
        const reorder = Number(reOrder);
        return available > reorder ? 'in order':'out of stock';
    }



    const [addSection, setAddSection] = useState(false);
    const [removeSection, setRemoveSection] = useState(false);
    const [addItemSection, setAddItemSection] = useState(false);

    useEffect(() => {
        // Fetch posts from the backend
        axios.get('http://localhost:8001/posts')
            .then(response => {
                if (response.data.success) {
                    const updatedItems = response.data.existingPosts.map(item => ({
                        ...item,
                        status: updateStatus(item.inventory.addQuantity, item.inventory.reOrder)
                    }));
                    setItems(updatedItems);
                }
                else {
                    alert('Failed to fetch posts');
                }
            })
            .catch(error => {
                alert('There was an error fetching the posts!', error);
            });  
    });

    


    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setNewItem({...newItem, [name]: value});
    }
    
    const handleForSubmit = () => {
        axios.post('http://localhost:8001/posts/save', {inventory: newItem} )
        .then(response => {
            if(response.data.success){  
                setItems([...items, response.data.inventory]);
                setAddItemSection(false);
                newItem({itemCode:'', itemName:'', unitPrice:'', stockType:'', addQuantity:'', reOrder:''});
                alert('Successs to add new Item');

            }

            else{
                alert('failed to add new Item');
            }
        })

        .catch(error=>{
            alert('there was an error to add new Items', error);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8001/posts/delete/${id}`)
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
            alert('There was an error in deleting items');
        })
    }


    //update ekee calculate wena kallaaa.. try ekak
    const calculateNewQuantity = (currentQuantity, addedQuantity) => {
        const currentQty = parseInt(currentQuantity || 0, 10);
        const addedQty = parseInt(addedQuantity || 0, 10);
        return currentQty + addedQty;
    };








    const handleUpdate = (itemId) => {
        // Find the item to update
        const itemToUpdate = items.find(item => item._id === itemId);
        
          // Calculate the new quantity
          const newQuantity = calculateNewQuantity(itemToUpdate.inventory.addQuantity, addQuantity);
        axios.put(`http://localhost:8001/posts/update/${itemId}`,
            {
                addQuantity: newQuantity
        })
        .then(response => {
            if (response.data.success){
                setItems(items.map(item => 
                    item._id === itemId ? { ...item, inventory: { ...item.inventory, addQuantity: newQuantity } } : item
                ));
                alert('data updated Successfullyy..');              
            }
            else{
                alert('data not updated..');
            }

        })

        .catch(error=>{
            console.error('there was an error', error);
            console.log('there is an error', error);
            alert('errorrr....');

        })
    };





    const removeQuantity = (currentQuantity, addedQuantity) => {
        const currentQty = parseInt(currentQuantity || 0, 10);
        const addedQty = parseInt(addedQuantity || 0, 10);
        return currentQty - addedQty;
    };


    const handleUpdateRemove = (itemId) => {
        // Find the item to update
        const itemToUpdate = items.find(item => item._id === itemId);
        
          // Calculate the new quantity
          const newQuantity = removeQuantity(itemToUpdate.inventory.addQuantity, remveQuantity);
        axios.put(`http://localhost:8001/posts/update/${itemId}`,
            {
                addQuantity: newQuantity
        })
        .then(response => {
            if (response.data.success){
                setItems(items.map(item => 
                    item._id === itemId ? { ...item, inventory: { ...item.inventory, addQuantity: newQuantity } } : item
                ));
                alert('data updated Successfullyy..');              
            }
            else{
                alert('data not updated..');
            }

        })

        .catch(error=>{
            console.error('there was an error', error);
            console.log('there is an error', error);
            alert('errorrr....');

        })
    };




return(

   <>
    <div className='background'>
        <Header/>
        <h1 align='center'className="dashboardtopic">Inventory Dashboard</h1><br/><br/>
        <div className="body">
        <div className = 'bottom-btn'>
            <button className='new-ingre'onClick={()=>setAddItemSection(true)}>Add new Ingredient</button><br/>
            {
                addItemSection &&(

                    <div className='addItem-main'>
                            <div className='addItemNext-body'>

                                <div className = 'addItem-topic'>
                                    <br/>
                                    <p className = 'topic'><b>Add new <br/> Ingredient</b></p>
                                </div>

                                <form className = 'addItem-form'>
                                    <p>New item code:<br/>
                                    <input type='text' className = 'addItem-input' name='itemCode' value={newItem.itemCode} onChange={handleInputChange}/></p>

                                    <p>New Item Name:<br/>
                                    <input type='text' className = 'addItem-input' name='itemName' value={newItem.itemName} onChange={handleInputChange}/></p>

                                    <p>Unit price:<br/>
                                    <input type='text' className = 'addItem-input' name='unitPrice' value={newItem.unitPrice} onChange={handleInputChange}/></p>

                                    <p>Stock type: <br/>
                                        <select className ='addItem-select' name='stockType' value={newItem.stockType} onChange={handleInputChange}>
                                            <option>select one</option>
                                            <option>Kilo Gram</option>
                                            <option>Litres</option>
                                        </select>
                                    </p>

                                    <p>Add quantity size: <br/>
                                    <input type='text' className = 'addItem-input' name='addQuantity' value={newItem.addQuantity} onChange={handleInputChange}/></p>

                                    <p>Stock re-order Level:<br/>
                                    <input type='text' className = 'addItem-input' name='reOrder' value={newItem.reOrder} onChange={handleInputChange}/></p>

                                    <input type='submit'className = 'addItem-btn'onClick={(e) => {
                                        handleForSubmit()
                                        e.preventDefault()}}/><br/>
                                    <div className='addBtnCancel'>
                                        <input type='button' className='addCancel' value='Cancel' onClick={()=>setAddItemSection(false)}/>
                                    </div>
                                    
                                </form>
                            </div>
                    </div>

                )
            }
            <button className='order' onClick={()=>Navigate('./request')}>Add Order Request</button>
            <button className='report'>Generate Reports</button>
        </div>
        <div className = 'main' id='main'>
            <div className = 'table'>
            <input type='search' name='search' className='search' id='search' placeholder='Search items here'/>

                <table className = 'main-table'>
                    <thead>
                    <tr className='colomn-topics'>
                        <th className="itemNo"><b>Item Code</b></th>
                        <th className="name"><b>Item name</b></th>
                        <th className="price"><b>Unit Price</b></th>
                        <th className="type">stock type</th>
                        <th className="available"><b>Available quantity</b></th>
                        <th className="reOrder"><b>Re-Order Level</b></th>
                        <th className="status"><b>Stock Status</b></th>
                        <th className="buttons"> </th>
                        <th className="deleteBtn"> </th>
                    </tr>
                    </thead>
                    <tbody>
                        {items.map((item)=>(

                            
                            <tr key={item._id}>
                                <td className=""><b>{item.inventory.itemCode}</b></td>
                                <td className=""><b>{item.inventory.itemName || 'N/A'}</b></td>
                                <td className=""><b>{item.inventory.unitPrice}</b></td>
                                <td className=""><b>{item.inventory.stockType}</b></td>
                                <td className=""><b>{item.inventory.addQuantity || 'N/A'}</b></td>
                                <td className=""><b>{item.inventory.reOrder || 'N/A'}</b></td>
                                <td className=""><b>
                                    <span className={item.status === 'in order' ? 'status-inOrder' : 'status-outOfStock'}>
                                        {item.status}
                                    </span></b></td>
                                <td className="btns">
                                <div className = 'sideBtn'>
                                    
                                    
                    <button onClick={() =>{
                        setItemId(item._id);
                        setAddSection(true);
                    }}
                    className = 'addBtn'>+ Add</button><br/>
                            {

                                addSection &&(

                                <div className='add-main'>
                                    <br/><br/><br/><br/>
                                    <div className='next-body'></div>


                                    <div className = 'add-body'>
                                        <div className = 'add-topic'>
                                            <p>Add <br/> new <br/>Quantity</p>
                                        </div>


                                    <form className='add-quantity'>
                                        <p>{itemId}</p>
                                        <p>Enter stock quantity<br/>
                                        <input type ='text' className='input' value={item.addQuantity} onChange={(e) => setAddQuantity(e.target.value)}/>
                                        </p>

                                        <input type ='submit' className = 'submit' onClick={() => handleUpdate(itemId)}/>
                                        <br/><br/>
                                        <button className = 'back-btn' onClick={() => setAddSection(false)}>Back</button>
                                    </form>

                                </div>
                </div>
                            )
                    }
                        <button onClick={() =>{
                             setRemoveSection(true)
                             setItemId(item._id);
                              }} className='removeBtn'>- Remove</button>
                        {
                            removeSection &&(

                                <div className='remove-main'>
                                    <br/><br/><br/><br/>
                                    <div className='next-body'></div>


                                    <div className = 'remove-body'>
                                        <div className = 'remove-topic'>
                                            <p>Remove <br/> exist <br/>Quantity</p>
                                        </div>

                                    <form className='remove-quantity'>
                                        <p>{itemId}</p>
                                        {/*<p>Enter Item Code<br/>
                                        <input type='text' className='input'/></p>*/}

                                        <p>size of quantity<br/>
                                        <input type ='text' className='input' value={item.remveQuantity} onChange={(e) => setRemveQuantity(e.target.value)}/></p>

                                        {/*<p>Reason for removing<br/>
                                        <input type = 'text' className='input'/></p>

                                        <p>removed Date<br/>
                                        <input type = 'date' className='input'/></p><br/>*/}

                                        <input type='submit' className='submit' onClick={(e) => {
                                                                e.preventDefault(); // Prevent form submission
                                                                handleUpdateRemove(itemId);
                                                                setRemoveSection(false);
                                                            }} /><br/><br/>
                                        <button className = 'back-btn' onClick={() => setRemoveSection(false)}>Back</button><br/>
                                    </form>

                                </div>
                </div>

                            )
                        }
                    </div>
                                </td>
                                <td className="deleteColomn">
                                    <button className="delete" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                    ))}

                    
                    </tbody>
                </table>
            </div>

        </div><br/><br/><br/><br/><br/>

            </div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            

    </div>

    </>  
)
}

export default Dashboard;