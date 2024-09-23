import { useNavigate } from "react-router-dom";

import Buttonrow from "./components/Buttonrow";
function Salesm(){

    const navigate = useNavigate();


    return(
        <>
            

           <h1 className="salesmanag" >  Sales Management</h1>



    <Buttonrow/>
           <hr/>
          
       

    <div className="content">

    <div className="imgdiv"><img  className="img" src="sales.png" alt="sales incraesing image" /></div>
    <div className="para"><p>Sales management involves overseeing and directing the sales operations 
        of a business to meet revenue goals. It includes tracking sales performance, managing customer relationships,
         and analyzing sales data. Key features of an effective sales management system include real-time sales tracking, 
         sales forecasting, and inventory management. These tools help streamline the sales process, improve efficiency, 
         and ensure that sales targets are met consistently.</p></div> 
    
    </div>
      


        </>
    )
}

export default Salesm;