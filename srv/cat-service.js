const cds = require('@sap/cds');

module.exports = async (srv) => {
    const { Employees } = srv.entities;

    srv.on('createEmployee', async (req) => {
        const { EmployeeName, EmployeeDesignation, EmployeeNumber, EmployeeAddress, EmployeeDateOfJoining, EmployeeBalanceLeave } = req.data;

        // Convert the input date to the correct format
        const formattedDate = new Date(EmployeeDateOfJoining).toISOString().split('T')[0]; // Converts to YYYY-MM-DD format

        // Generate the next EmployeeID
        const employeeList = await cds.run(SELECT.from(Employees));
        const nextEmployeeID = (employeeList.length > 0) ? Math.max(...employeeList.map(emp => emp.EmployeesID)) + 1 : 1;

        // Prepare the new employee record
        const newEmployee = {
            EmployeesID: nextEmployeeID,
            EmployeeName,
            EmployeeDesignation,
            EmployeeNumber,
            EmployeeAddress,
            EmployeeDateOfJoining: formattedDate,
            EmployeeBalanceLeave
        };

        // Insert the new employee into the database
        await cds.run(INSERT.into(Employees).entries(newEmployee));

        return newEmployee; // Return the created employee data
    });
};
