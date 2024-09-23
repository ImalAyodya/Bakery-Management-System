const mongoose = require('mongoose');

const TempSchema = new mongoose.Schema({
    Tempory:{
        EmployeeID: String,
        Date: String,
        NameWithInitials: String,
        PhoneNumber: String,
        AssignedTask: String,
        EmployeeEmail: String,
        AdminEmail: String,


    }
});
const posts2 =mongoose.model('Tempory', TempSchema);
module.exports = posts2;