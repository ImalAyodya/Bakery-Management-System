
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Form from './EmployeeForm.js';
import Workers from './workers.js'
import Salary from './salary.js';
import Extra from './Extra.js';
import Display from './display.js';
import Dashboard from './Dashboard.js';
import Admin from './Admin.js';
import Registration from './registration.js';


function App(){
   return(
        <BrowserRouter>
      <Routes>
         <Route path = '/employees' element = {< Display/>} />
         <Route path = '/Form' element = {<Form/>}/>
         <Route path = '/workers' element = {<Workers/>}/>
         <Route path = '/salary' element = {<Salary/>}/>
         <Route path = '/Extra' element = {<Extra/>}/>
         <Route path = '/' element = {<Dashboard/>}/>
         <Route path = '/Admin' element = {<Admin/>}/>
         <Route path = '/registration' element = {<Registration/>}/>

         


      </Routes>
       </BrowserRouter>
   );
}

export default App;


      