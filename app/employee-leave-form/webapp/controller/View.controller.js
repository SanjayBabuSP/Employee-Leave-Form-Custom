sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/ui/core/UIComponent'
], function(Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("employeeleaveform.controller.View", {

        onInit: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var sEmployeesID = oEvent.getParameter("arguments").EmployeesID;
            // Bind the view to the selected employee's data
            this.getView().bindElement({
                path: "/Employees(" + sEmployeesID + ")",
                parameters: {
                    expand: "EmployeeDetails" // Adjust if needed
                },
                events: {
                    dataRequested: function() {
                        // Optionally, you can show a loading indicator
                    },
                    dataReceived: function() {
                        // Optionally, you can hide the loading indicator
                    }
                }
            });
        },

        // Save the changes and update the employee details
        onSaveEmployee: function() {
            var oModel = this.getView().getModel();
            oModel.submitChanges();  // Submit the changes to the OData service
        }
    });
});