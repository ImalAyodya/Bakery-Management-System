import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Salary() {
  const [employees, setEmployees] = useState([]);
  const [addSec, setAddSec] = useState(false);  //popup
  const [months, setMonths] = useState({}); // Store month input for each employee

  useEffect(() => {        
    // Fetch posts from the backend
    axios.get('http://localhost:8001/register') 
        .then(response => {
            if (response.data.success) {
              setEmployees(response.data.mypost);
            } else {
                alert('Failed to fetch posts');
            }
        })
        .catch(error => {
            alert('There was an error fetching the posts!', error);
        });
  }, []);

  // Function to handle month input change and recalculate fields
  const handleMonthChange = (e, empId) => {
    const month = e.target.value.toLowerCase();
    const updatedMonths = { ...months, [empId]: month };
    setMonths(updatedMonths);

    const updatedEmployees = employees.map(emp => {
      if (emp._id === empId) {
        const basicSalary = parseFloat(emp.employeeRegister?.BasicSalary) || 0;

        if (month) {  // Perform calculations only if month is entered
          const bonuses = (month === 'december' || month === 'april') ? basicSalary * 0.07 : 0;
          const healthInsurance = basicSalary * 0.09;
          const employeeEPF = basicSalary * 0.08;
          const companyEPF = basicSalary * 0.12;
          const companyETF = basicSalary * 0.03;
          const netSalary = (basicSalary + bonuses + healthInsurance) - employeeEPF;

          return {
            ...emp,
            bonuses: bonuses.toFixed(2),
            healthInsurance: healthInsurance.toFixed(2),
            employeeEPF: employeeEPF.toFixed(2),
            companyEPF: companyEPF.toFixed(2),
            companyETF: companyETF.toFixed(2),
            netSalary: netSalary.toFixed(2),
          };
        } else {
          return {
            ...emp,
            bonuses: undefined,
            healthInsurance: undefined,
            employeeEPF: undefined,
            companyEPF: undefined,
            companyETF: undefined,
            netSalary: undefined,
          };
        }
      }
      return emp;
    });

    setEmployees(updatedEmployees);
  };

  // Function to handle saving the salary data
  const handleSave = async () => {
    try {
      // Loop through each employee and post their salary details to the backend
      await Promise.all(employees.map(async emp => {
        const salaryData = {
          ID: emp.employeeRegister?.EmployeeID || '',
          Name: emp.employeeRegister?.NameWithInitials || '',
          Designation: emp.employeeRegister?.Designation || '',
          Month: months[emp._id] || '',
          BasicSalary: emp.employeeRegister?.BasicSalary || '0.00',
          TotalAdditions: [
            {
              Bonuses: emp.bonuses || '0.00',
              HealthInsurance: emp.healthInsurance || '0.00',
            },
          ],
          TotalDeductions: [
            {
              EmployeeEPF: emp.employeeEPF || '0.00',
            },
          ],
          CompanyEPF: emp.companyEPF || '0.00',
          CompanyETF: emp.companyETF || '0.00',
          NetSalary: emp.netSalary || '0.00',
        };

        // Post the salary data to the backend
        await axios.post('http://localhost:8001/SalaryPost/save', { Salary: salaryData });
      }));
      
      alert('Salaries saved successfully!');
    } catch (err) {
      alert('Error saving salaries:', err.message);
    }
  };

  return (
    <>
      <div className="Kavipayroll-container">
        <div className="Kavipayroll-table">
          <div className="Kavipayroll-header">
            <h3>Employees Salary Summary</h3>
          </div>
          
          <div className='Kavitabsal'>
          <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
            <table className='KaviTable'>
              <thead>
                <tr>
                  <th rowSpan="2">ID</th>
                  <th rowSpan="2">Name</th>
                  <th rowSpan="2">Designation</th>
                  <th rowSpan="2">Month</th>
                  <th rowSpan="2">Basic Salary(Rs.)</th>
                  <th colSpan="2">Total Additions(Rs.)</th>
                  <th colSpan="1">Total Deductions(Rs.)</th>
                  <th rowSpan="2">Company E.P.F(Rs.)</th>
                  <th rowSpan="2">Company E.T.F(Rs.)</th>
                  <th rowSpan="2">Net Salary(Rs.)</th>
                </tr>
                <tr>
                  <th>Bonuses</th>
                  <th>Health Insurance</th>
                  <th>Employee EPF</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.employeeRegister?.EmployeeID || '-'}</td>
                    <td>{emp.employeeRegister?.NameWithInitials || '-'}</td>
                    <td>{emp.employeeRegister?.Designation || '-'}</td>
                    <td>
                      <select 
                        className='Kavimonth1' 
                        value={months[emp._id] || ''} 
                        onChange={(e) => handleMonthChange(e, emp._id)} 
                      >
                        <option value="">Select Month</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                      </select>
                    </td>
                    <td>{parseFloat(emp.employeeRegister?.BasicSalary)?.toFixed(2) || '0.00'}</td>
                    {months[emp._id] ? (
                      <>
                        <td>{emp.bonuses || '0.00'}</td>
                        <td>{emp.healthInsurance || '0.00'}</td>
                        <td>{emp.employeeEPF || '0.00'}</td>
                        <td>{emp.companyEPF || '0.00'}</td>
                        <td>{emp.companyETF || '0.00'}</td>
                        <td>{emp.netSalary || '0.00'}</td>
                      </>
                    ) : (
                      <>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="Kavipayroll-footer">
              <div className="payrollApp">
                <button className="Kavisubmitbtn" onClick={() => setAddSec(true)}>
                  Submit Payroll
                </button><br></br>
                <button className="Kavisavebtn" type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>

        {addSec && ( 
          <div className='Kavipayroll'>
            <div className="Kavipayroll-sidebar">
              <h2>Total Salary Expenses</h2>
              <div className="Kavipayroll-summary">
                <h3>Payroll Summary</h3>
                <p>Total Salary Amount(Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.netSalary || 0), 0).toFixed(2)}</p>
                <p>Total E.P.F Expenses(Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.companyEPF || 0), 0).toFixed(2)}</p>
                <p>Total E.T.F Expenses(Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.companyETF || 0), 0).toFixed(2)}</p>
                <p>Total Additions(Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.bonuses || 0) + parseFloat(emp.healthInsurance || 0), 0).toFixed(2)}</p>
                <p>Total Deductions(Rs.): {employees.reduce((total, emp) => total + parseFloat(emp.employeeEPF || 0), 0).toFixed(2)}</p>
                <div className="KavibtnContainer">
                  <button className="Kaviapprove-btn" >Approve</button>
                  <button className="Kavicancel-btn" onClick={() => setAddSec(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Salary;
