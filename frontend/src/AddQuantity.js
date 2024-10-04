import './AddQuantity.css';
import Header from './Components/Header';

function AddQuantity(){

    return (
        <>
            <Header/>
          <div className='add-main'>
          <br/><br/><br/><br/>
            <div className = 'add-body'>
                <div className = 'add-topic'>
                    <p>Add <br/> new <br/>Quantity</p>
                </div>

                <form className='add-quantity'>
                    <p>Enter Item Code<br/>
                    <input type='text' className='input'/></p>

                    <p>Enter stock quantity<br/>
                    <input type ='text' className='input'/></p>

                    <p>Description<br/>
                    <input type = 'text' className='input'/></p>

                    <p>Recieved Date<br/>
                    <input type = 'date' className='input'/></p><br/>

                    <input type ='submit' className = 'submit'/><br/><br/>
                    <button className = 'back-btn'>Back</button>
                </form>

            </div>
          </div> 
        </>
    );

}

export default AddQuantity;