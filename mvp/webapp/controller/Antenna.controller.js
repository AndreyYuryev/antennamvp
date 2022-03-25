sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("mvp.controller.Antenna", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteAntenna").attachPatternMatched(this.onPatternMatched, this);
            },

            onPatternMatched: function(oEvent){
                let oArguments = oEvent.getParameter('arguments');
                //let sPath = this.getView().getModel().createKey('/PMOrderSet', { OrderID: oArguments.orderid });
                //let sPath = this.getView().getModel("antenna").getProperty('/ProtokollItem', { ProtokollID: oArguments.protokolid });
                let oModel = this.getView().getModel("local");
/*
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
*/
                let oAntenna = oModel.getProperty('/Antenne').filter( function (item) {
                    //if (item.AntenneID===oArguments.antennaid && item.ProtokolID===oArguments.protokolid){
                    //    return ;
                    //};
                    return item.AntenneID===oArguments.antennaid && item.ProtokollID===oArguments.protokolid;
                });
                oModel.setProperty('/Antennafiltered', oAntenna);
                
                let sAntennaPath = "/Antennafiltered";
                this.getView().bindElement({
                    "path": sAntennaPath,
                    "model": "local",
                });

/*
                let oRet = oModel.getProperty('/RET').filter( function (item) {
                    return item.ProtokollID===oArguments.protokolid;
                });
                oModel.setProperty('/Retfiltered', oRet);
                
                let sRetPath = "/Retfiltered";
                this.getView().bindElement({
                    "path": sRetPath,
                    "model": "local",
                });                
*/
            },

            onNavBack: function() {
                let oHistory = History.getInstance();
                let sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getOwnerComponent().getRouter().navTo("RouteProtocol", {}, true);
                }
            },

            onEditPress: function(oEvent) {
                let oModel = this.getView().getModel("local");
                this._oAntennaf = oModel.getProperty('/Antennafiltered/0');
                this._oAntenna = Object.assign({}, this._oAntennaf);
                this._toggleButtonsA(true);
            },

            onAcceptPress: function(oEvent) {
                this._toggleButtonsA(false);
            },

            onCancelPress: function(oEvent) {
                let oModel = this.getView().getModel("local");
                oModel.setProperty('/Antennafiltered/0', this._oAntenna);

                this._toggleButtonsA(false);                
            },

            _toggleButtonsA: function (bEdit){
                let oView = this.getView();
                oView.byId("edit").setVisible(!bEdit);
                oView.byId("cancel").setVisible(bEdit);
                oView.byId("accept").setVisible(bEdit);

                oView.byId("idFormText").setVisible(!bEdit);                
                oView.byId("idFormInput").setVisible(bEdit);   
            }            

        });
    });
