sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("mvp.controller.List", {
            onInit: function () {

            },

            onItemsPress: function(oEvent) {
                let oObject = oEvent.getSource().getBindingContext("local").getObject();
                this.getOwnerComponent().getRouter().navTo('RouteProtocol', {
                    protokolid: oObject.ProtokollID,
                });
            },
           
        });
    });
