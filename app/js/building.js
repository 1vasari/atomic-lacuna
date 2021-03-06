/*global YAHOO, $ */
'use strict';
YAHOO.namespace("lacuna.buildings");
var Templates = require('js/templates'),
    assets = require('js/assets');
(function() {
    var Lang = YAHOO.lang,
        Util = YAHOO.util,
        Dom = Util.Dom,
        Event = Util.Event,
        Lacuna = YAHOO.lacuna,
        Game = Lacuna.Game;
    var Building = function(oResults) {
        this.repairTemplate = Templates.get('tab.building.repair');
        this.productionTemplate = Templates.get('tab.building.production');
        this.storageTemplate = Templates.get('tab.building.storage');
        this.createEvent("onMapRpc");
        this.createEvent("onQueueAdd");
        this.createEvent("onQueueReset");
        this.createEvent("onAddTab");
        this.createEvent("onRemoveTab");
        this.createEvent("onSelectTab");
        this.createEvent("onReloadTabs");
        this.createEvent("onUpdateTile");
        this.createEvent("onUpdateMap");
        this.createEvent("onRemoveTile");
        this.createEvent("onHide");
        // For internal use
        this.createEvent("onLoad");
        this.createEvent("onRepair");
        // Common elements
        this.building = oResults.building;
        this.work = oResults.building.work;
        // Delete status since it's rather large
        delete oResults.status;
        // So we can store just in case anyway
        this.result = oResults;
    };
    Building.prototype = {
        destroy: function() {
            this.unsubscribeAll();
        },
        load: function() {
            this.fireEvent("onLoad");
        },
        getTabs: function() {
            if (parseInt(this.building.efficiency, 10) < 100 && this.building.repair_costs) {
                return [this.getProductionTab(), this.getRepairTab()];
            }
            var tabs = [this.getProductionTab()],
                childTabs = this.building.level > 0 ? this.getChildTabs() : [];
            if (Lang.isArray(childTabs)) {
                tabs = tabs.concat(childTabs);
            }
            // Incoming supply-chains tab. This is because Station Command
            // doesn't inherit from PCC. It's here to avoid duplication.
            if (this.building.url === "/planetarycommand" || this.building.url === "/stationcommand") {
                tabs.push(this.getIncomingSupplyChainsTab());
            }
            // Create storage tab last
            if (this.building.upgrade.production && (parseInt(this.building.food_capacity, 10) + parseInt(this.building.ore_capacity, 10) + parseInt(this.building.water_capacity, 10) + parseInt(this.building.energy_capacity, 10) + parseInt(this.building.waste_capacity, 10)) > 0) {
                tabs.push(this.getStorageTab());
            }
            return tabs;
        },
        getChildTabs: function() {
            //overrideable function for child classes that have their own tabs
            //** Must return nothing or an array of tabs **
            return [];
        },
        /*
        Event Helpers
        */
        rpcSuccess: function(o) {
            this.fireEvent("onMapRpc", o.result);
            if (o.result.building && this.building) {
                // if we suddenly have work update the tile to add the tile.
                // if we don't have work update the tile to remove the timer
                var workChanged = ((this.building.work && !o.result.building.work) || (!this.building.work && o.result.building.work) || (this.building.work && o.result.building.work && this.building.work.end !== o.result.building.work.end));
                if (workChanged) {
                    this.building.work = o.result.building.work;
                    this.work = this.building.work;
                    this.updateBuildingTile(this.building);
                }
                /*if(o.result.building.id && o.result.building.name) {
                    delete this.building.work;
                    delete this.building.pending_build;
                    Lang.augmentObject(this.building, o.result.building, true);
                }
                else if(o.result.building.work) {
                    this.building.work = o.result.building.work;
                }
                this.work = this.building.work;
                if(workChanged) {
                    this.updateBuildingTile(this.building);
                }*/
            }
        },
        addQueue: function(sec, func, elm, sc) {
            this.fireEvent("onQueueAdd", {
                seconds: sec,
                fn: func,
                el: elm,
                scope: sc
            });
        },
        resetQueue: function() {
            this.fireEvent("onQueueReset");
        },
        addTab: function(tab) {
            this.fireEvent("onAddTab", tab);
        },
        removeTab: function(tab) {
            this.fireEvent("onRemoveTab", tab);
        },
        updateBuildingTile: function(building) {
            //always updated url when doing this since some returns don't have the url
            building.url = this.building.url;
            this.building = building;
            this.fireEvent("onUpdateTile", this.building);
        },
        removeBuildingTile: function(building) {
            this.fireEvent("onRemoveTile", building);
        },
        getRepairTab: function() {
            this.repairTab = new YAHOO.widget.Tab({
                label: 'Repair',
                content: this.repairTemplate({
                    efficiency: this.building.efficiency,
                    assets: assets,
                    food: this.building.repair_costs.food,
                    ore: this.building.repair_costs.ore,
                    water: this.building.repair_costs.water,
                    energy: this.building.repair_costs.energy
                })
            });
            Event.on("repairBuilding", "click", this.Repair, this, true);
            return this.repairTab;
        },
        Repair: function(e) {
            var btn = Event.getTarget(e);
            btn.disabled = true;
            Lacuna.Pulser.Show();
            Game.Services.Buildings.Generic.repair({
                session_id: Game.GetSession(),
                building_id: this.building.id
            }, {
                success: function(o) {
                    Lacuna.Pulser.Hide();
                    this.rpcSuccess(o);
                    if (this.repairTab) {
                        Event.removeListener("repair", "click");
                        this.removeTab(this.repairTab);
                        o.result.building.url = this.building.url;
                        this.building = o.result.building;
                        this.work = o.result.building.work;
                        this.result = o.result;
                        this.updateBuildingTile(o.result.building);
                        this.fireEvent("onReloadTabs");
                    }
                    if (!this.productionTab) {
                        this.addTab(this.getProductionTab());
                    }
                    this.fireEvent("onRepair");
                },
                failure: function() {
                    btn.disabled = false;
                },
                target: this.building.url,
                scope: this
            });
        },
        getProductionTab: function() {
            var level = parseInt(this.building.level, 10);
            this.productionTab = new YAHOO.widget.Tab({
                label: 'Production',
                content: this.productionTemplate({
                    assets: assets,
                    building: this.building,
                    upgrade: this.building.upgrade,
                    downgrade: this.building.downgrade,
                    planet: Game.GetCurrentPlanet(),
                    upLevel: level + 1,
                    downLevel: level - 1,
                    level: level
                })
            });
            Event.on('buildingDetailsDemolish', 'click', this.Demolish, this, true);
            if (this.building.upgrade.can) {
                Event.on('buildingDetailsUpgrade', 'click', this.Upgrade, this, true);
            }
            if (level > 1) {
                Event.on('buildingDetailsDowngrade', 'click', this.Downgrade, this, true);
            }
            return this.productionTab;
        },
        Demolish: function() {
            var building = this.building;
            if (confirm(['Are you sure you want to Demolish the level ', building.level, ' ', building.name, '?'].join(''))) {
                Lacuna.Pulser.Show();
                Game.Services.Buildings.Generic.demolish({
                    session_id: Game.GetSession(),
                    building_id: building.id
                }, {
                    success: function(o) {
                        Lacuna.Pulser.Hide();
                        this.rpcSuccess(o);
                        this.removeBuildingTile(building);
                        this.fireEvent("onHide");
                    },
                    scope: this,
                    target: building.url
                });
            }
        },
        Downgrade: function() {
            var building = this.building;
            if (confirm(['Are you sure you want to downgrade the level ', building.level, ' ', building.name, '?'].join(''))) {
                Lacuna.Pulser.Show();
                Game.Services.Buildings.Generic.downgrade({
                    session_id: Game.GetSession(),
                    building_id: building.id
                }, {
                    success: function(o) {
                        Lacuna.Pulser.Hide();
                        this.fireEvent("onMapRpc", o.result);
                        var b = building; //originally passed in building data from currentBuilding
                        b.id = o.result.building.id;
                        b.level = o.result.building.level;
                        b.pending_build = o.result.building.pending_build;
                        YAHOO.log(b, "info", "Building.Upgrade.success.building");
                        this.updateBuildingTile(b);
                        this.fireEvent("onHide");
                    },
                    scope: this,
                    target: building.url
                });
            }
        },
        Upgrade: function() {
            var building = this.building,
                userUpgrade = false;
            if (building.upgrade.cost.halls) {
                userUpgrade = confirm('Are you sure you want to sacrifice ' + building.upgrade.cost.halls + ' Halls of Vrbansk?');
            }
            else {
                userUpgrade = true;
            }
            if (userUpgrade) {
                Lacuna.Pulser.Show();
                var BuildingServ = Game.Services.Buildings.Generic,
                    data = {
                        session_id: Game.GetSession(""),
                        building_id: building.id
                    };
                BuildingServ.upgrade(data, {
                    success: function(o) {
                        Lacuna.Pulser.Hide();
                        this.fireEvent("onMapRpc", o.result);
                        var b = building; //originally passed in building data from currentBuilding
                        b.id = o.result.building.id;
                        b.level = o.result.building.level;
                        b.pending_build = o.result.building.pending_build;
                        this.updateBuildingTile(b);
                        this.fireEvent("onHide");
                    },
                    scope: this,
                    target: building.url
                });
            }
        },
        getIncomingSupplyChainsTab: function() {
            this.incomingSupplyChainTab = new YAHOO.widget.Tab({
                label: "Supply Chains",
                content: ['<div id="incomingSupplyChainInfo" style="margin-bottom: 2px">', '   <div id="incomingSupplyChainList">', '      <b>Incoming Supply Chains</b><hr/>', '      <ul id="incomingSupplyChainListHeader" class="incomingSupplyChainHeader incomingSupplyChainInfo clearafter">', '        <li class="incomingSupplyChainBody">From Body</li>', '        <li class="incomingSupplyChainResource">Resource</li>', '        <li class="incomingSupplyChainHour">/hr</li>', '        <li class="incomingSupplyChainEfficiency">Efficiency</li>', '      </ul>', '      <div><div id="incomingSupplyChainListDetails"></div></div>', '   </div>', '   <div id="incomingSupplyChainListNone"><b>No Incoming Supply Chains</b></div>', '</div>'].join('')
            });
            this.incomingSupplyChainTab.subscribe("activeChange", this.viewIncomingSupplyChainInfo, this, true);
            return this.incomingSupplyChainTab;
        },
        viewIncomingSupplyChainInfo: function() {
            Dom.setStyle("incomingSupplyChainList", "display", "none");
            Dom.setStyle("incomingSupplyChainListNone", "display", "none");
            if (!this.incoming_supply_chains) {
                Lacuna.Pulser.Show();
                this.service.view_incoming_supply_chains({
                    session_id: Game.GetSession(),
                    building_id: this.building.id
                }, {
                    success: function(o) {
                        Lacuna.Pulser.Hide();
                        this.rpcSuccess(o);
                        this.incoming_supply_chains = o.result.supply_chains;
                        this.incomingSupplyChainList();
                    },
                    scope: this
                });
            }
            else {
                this.incomingSupplyChainList();
            }
        },
        incomingSupplyChainList: function() {
            var supply_chains = this.incoming_supply_chains,
                i, chain, nUl, nLi, details, detailsParent, ul, li;
            if (supply_chains.length === 0) {
                Dom.setStyle("incomingSupplyChainList", "display", "none");
                Dom.setStyle("incomingSupplyChainListNone", "display", "");
                return;
            }
            Dom.setStyle("incomingSupplyChainList", "display", "");
            Dom.setStyle("incomingSupplyChainListNone", "display", "none");
            details = Dom.get("incomingSupplyChainListDetails");
            detailsParent = details.parentNode;
            ul = document.createElement("ul");
            li = document.createElement("li");
            // chains list
            Event.purgeElement(details, true); //clear any events before we remove
            details = detailsParent.removeChild(details); //remove from DOM to make this faster
            details.innerHTML = "";
            //Dom.setStyle(detailsParent, "display", "");
            detailsParent.appendChild(details); //add back as child
            for (i = 0; i < supply_chains.length; i += 1) {
                chain = supply_chains[i];
                nUl = ul.cloneNode(false);
                Dom.addClass(nUl, "incomingSupplyChainInfo");
                Dom.addClass(nUl, "clearafter");
                nLi = li.cloneNode(false);
                Dom.addClass(nLi, "incomingSupplyChainBody");
                if (chain.stalled === 1) {
                    Dom.addClass(nUl, "incomingSupplyChainStalled");
                    nLi.innerHTML = chain.from_body.name + " (Stalled)";
                }
                else {
                    nLi.innerHTML = chain.from_body.name;
                }
                nUl.appendChild(nLi);
                nLi = li.cloneNode(false);
                Dom.addClass(nLi, "incomingSupplyChainResource");
                nLi.innerHTML = chain.resource_type.titleCaps();
                nUl.appendChild(nLi);
                nLi = li.cloneNode(false);
                Dom.addClass(nLi, "incomingSupplyChainHour");
                nLi.innerHTML = chain.resource_hour;
                nUl.appendChild(nLi);
                nLi = li.cloneNode(false);
                Dom.addClass(nLi, "incomingSupplyChainEfficiency");
                nLi.innerHTML = chain.percent_transferred;
                nUl.appendChild(nLi);
                details.appendChild(nUl);
            }
            //wait for tab to display first
            setTimeout(function() {
                var Ht = Game.GetSize()
                    .h - 250;
                if (Ht > 250) {
                    Ht = 250;
                }
                Dom.setStyle(detailsParent, "height", Ht + "px");
                Dom.setStyle(detailsParent, "overflow-y", "auto");
            }, 10);
        },
        getStorageTab: function() {
            return new YAHOO.widget.Tab({
                label: 'Storage',
                content: this.storageTemplate({
                    assets: assets,
                    building: this.building,
                    upgrade: this.building.upgrade
                })
            });
        }
    };
    Lang.augmentProto(Building, Util.EventProvider);
    YAHOO.lacuna.buildings.Building = Building;
}());