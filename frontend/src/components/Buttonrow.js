import { useNavigate } from "react-router-dom";



function Buttonrow() {

    const navigate = useNavigate();
    return (
  
      <>
      
      <div className="buttons"><button  type = "submit" className= ""id ="tplan " onClick={()=>navigate('/Stables')}>Get New Sales Records</button>
    <button className= "" id ="tplan " onClick={()=>navigate('/Prform')}>Get New Production Records</button>
    <button className= "" id ="tplan " onClick={()=>navigate('/Salesdash')}>View sales Dashboard</button>
    <button className= "" id ="tplan " onClick={()=>navigate('/Nwplan')} >View Target Plan</button>
    
    
    </div> 

      
      </>
  
    );
  }
  
  export default Buttonrow;