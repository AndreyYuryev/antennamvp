sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("mvp.controller.Protocol", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteProtocol").attachPatternMatched(this.onPatternMatched, this);
            },

            onPatternMatched: function(oEvent){
                let oArguments = oEvent.getParameter('arguments');
                //let sPath = this.getView().getModel().createKey('/PMOrderSet', { OrderID: oArguments.orderid });
                //let sPath = this.getView().getModel("antenna").getProperty('/ProtokollItem', { ProtokollID: oArguments.protokolid });
                let oModel = this.getView().getModel("local");

                let oHead = oModel.getProperty('/Protokollkopf').filter( function (item) {
                    return item.ProtokollID===oArguments.protokolid;
                });
                oModel.setProperty('/Protokollitemsfiltered', oHead);
                
                let sHeadPath = "/Protokollitemsfiltered";
                this.getView().bindElement({
                    "path": sHeadPath,
                    "model": "local",
                }); 

                //let oSector = oModel.getProperty('/Sector').filter( function (item) {
                //    return item.ProtokollID===oArguments.protokolid;
                //});
                //oModel.setProperty('/Sectorfiltered', oSector);
                
                //let sSectorPath = "/Sectorfiltered";
                //this.getView().bindElement({
                //    "path": sSectorPath,
                //    "model": "local",
                //});

                let oAntenne = oModel.getProperty('/Antenne').filter( function (item) {
                    return item.ProtokollID===oArguments.protokolid;
                });
                oModel.setProperty('/Antennafiltered', oAntenne);
                
                let sAntennaPath = "/Antennafiltered";
                this.getView().bindElement({
                    "path": sAntennaPath,
                    "model": "local",
                });


                let oRet = oModel.getProperty('/RET').filter( function (item) {
                    return item.ProtokollID===oArguments.protokolid;
                });
                oModel.setProperty('/Retfiltered', oRet);
                
                let sRetPath = "/Retfiltered";
                this.getView().bindElement({
                    "path": sRetPath,
                    "model": "local",
                });                

            },

            onNavBack: function() {
                let oHistory = History.getInstance();
                let sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getOwnerComponent().getRouter().navTo("RouteApp", {}, true);
                }
            },
            
            onItemsPress: function(oEvent) {
                let oObject = oEvent.getSource().getBindingContext("local").getObject();
                this.getOwnerComponent().getRouter().navTo('RouteAntenna', {
                    protokolid: oObject.ProtokollID,
                    antennaid: oObject.AntenneID,
                });
            },
            
            onEditPress: function(oEvent) {
                let oModel = this.getView().getModel("local");
                this._oHead = oModel.getProperty('/Protokollitemsfiltered/0');
                this._oKopf = Object.assign({}, this._oHead);
                this._toggleButtons(true);
            },

            onSavePress: function(oEvent) {
                this._toggleButtons(false);
            },

            onCancelPress: function(oEvent) {
                let oModel = this.getView().getModel("local");
                oModel.setProperty('/Protokollitemsfiltered/0', this._oKopf);

                this._toggleButtons(false);                
            },

            _toggleButtons: function (bEdit){
                let oView = this.getView();
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("save").setVisible(bEdit);
                oView.byId("cancel").setVisible(bEdit);

                oView.byId("idFormTextL").setVisible(!bEdit);                
                oView.byId("idFormInputL").setVisible(bEdit);   
                oView.byId("idFormTextR").setVisible(!bEdit);                
                oView.byId("idFormInputR").setVisible(bEdit);   
                oView.byId("idFormTextB").setVisible(!bEdit);                
                oView.byId("idFormInputB").setVisible(bEdit);                   

            }

        });
    });
