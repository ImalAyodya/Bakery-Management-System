const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    employeeRegister:{
        EmployeeID: String,
        NameWithInitials: String,
        Address: String,
        PhoneNumber: String,
        JoinedDate: String,
        Designation: String,
        BasicSalary: String,
        Email: String,


    }
});
const posts =mongoose.model('register', empSchema);
module.exports = posts;
   