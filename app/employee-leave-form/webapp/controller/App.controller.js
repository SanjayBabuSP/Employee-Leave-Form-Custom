sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/m/MessageToast'
    ],
    function(PageController, MessageToast) {
        'use strict';

        return PageController.extend('employeeleaveform.controller.App', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf employeeleaveform.ext.main.Main
             */
            onInit: function () {
                PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
                this.oRouter = this.getOwnerComponent().getRouter();
            },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf employeeleaveform.ext.main.Main
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf employeeleaveform.ext.main.Main
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf employeeleaveform.ext.main.Main
             */
            //  onExit: function() {
            //
            //  }

            onCreateEmployee: async function () {
                const employeeName = this.byId("inputEmployeeName").getValue();
                const employeeDesignation = this.byId("inputEmployeeDesignation").getValue();
                const employeeNumber = this.byId("inputEmployeeNumber").getValue();
                const employeeAddress = this.byId("inputEmployeeAddress").getValue();
                
                // Get date from DatePicker and format it to YYYY-MM-DD
                const dateOfJoining = this.byId("dateOfJoiningPicker").getDateValue();
                const formattedDate = dateOfJoining ? dateOfJoining.toISOString().split('T')[0] : null;
            
                const employeeBalanceLeave = this.byId("inputEmployeeBalanceLeave").getValue();
            
                const data = {
                    EmployeeName: employeeName,
                    EmployeeDesignation: employeeDesignation,
                    EmployeeNumber: employeeNumber,
                    EmployeeAddress: employeeAddress,
                    EmployeeDateOfJoining: formattedDate,
                    EmployeeBalanceLeave: employeeBalanceLeave
                };
            
                // Make the POST request to the service
                await fetch('https://port4004-workspaces-ws-997dm.ap21.trial.applicationstudio.cloud.sap/odata/v4/catalog/Employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                MessageToast.show("Employee created successfully.");
                setTimeout(function() {
                    location.reload();
                }, 2500);
            },

            onDeleteEmployee: async function() {
                // Get the table by ID
                var oTable = this.byId("employeeTable"); // Ensure the table's ID is "employeeTable"
                
                // Get selected items
                var aSelectedItems = oTable.getSelectedItems();
                
                if (aSelectedItems.length === 0) {
                    MessageToast.show("Please select at least one employee to delete.");
                    return;
                }
            
                // Array to store the IDs of employees to delete
                var aEmployeeIds = [];
            
                // Extract EmployeeIDs from the selected items
                aSelectedItems.forEach(function(oItem) {
                    var oContext = oItem.getBindingContext();
                    var sEmployeeID = oContext.getProperty("EmployeesID"); // Assuming EmployeesID is the key field
                    if (sEmployeeID) {
                        aEmployeeIds.push(sEmployeeID); // Corrected this line
                    }
                });
            
                if (aEmployeeIds.length === 0) {
                    MessageToast.show("Unable to retrieve Employee IDs for deletion.");
                    return;
                }
            
                // Delete each employee by ID
                try {
                    for (var i = 0; i < aEmployeeIds.length; i++) {
                        await fetch(`https://port4004-workspaces-ws-997dm.ap21.trial.applicationstudio.cloud.sap/odata/v4/catalog/Employees(${aEmployeeIds[i]})`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    }
                    // Show success message
                    MessageToast.show("Selected employees deleted successfully!");
            
                    // Refresh the table or model
                    oTable.getBinding("items").refresh();
                } catch (error) {
                    // Show error message
                    MessageToast.show(`Failed to delete employees: ${error.message}`);
                }
            },

            onItemPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var oContext = oItem.getBindingContext();
                var sEmployeeID = oContext.getProperty("EmployeesID");
                var oRouter = this.getOwnerComponent().getRouter();
                this.getOwnerComponent().getRouter().navTo("employeeDetails", {
                    EmployeeID: sEmployeeID
                });
            }
        });
    }
);
