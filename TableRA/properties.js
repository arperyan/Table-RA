define( [
], function () {
    "use strict";
    var dimensions = {
        uses: "dimensions",
        min: 1,
        type: "items",
        items: {
            dimensionCustomLabel: {
                type: "items",
                items: {
                    dimensionLabel: {
                        label: "Custom Label",
                        ref: "customLabel",
                        type: "string",
                        expression: "optional",
                        defaultValue: ""
                    }
                }
            },
            dimensionCondition: {
              type: "items",
              items: {
                   visibility: {
                       label: "Visibility condition",
                       type: "boolean",
                       component: "switch",
                       ref : "showMeasure",
                       defaultValue: false,
                       options: [{
                           value: true,
                           label: "Conditional"
                       }, {
                           value: false,
                           label: "Always"
                       }]
                   },
                   exprCondition: {
                       label: "Condition",
                       ref: "ShowHide",
                       type: "string",
                       expression: "optional",
                       defaultValue: "",
                       show: function (layout) {
                                return layout.showMeasure;
                       }
                   }                    
               }
            }

          }

    };    
    var measures = { 
        uses: "measures",
        min: 0,
        type: "items",
        grouped: true,
        items: {
            measureCustomLabel: {
                type: "items",
                items: {
                    dimensionLabel: {
                        label: "Custom Label",
                        ref: "customLabel",
                        type: "string",
                        expression: "optional",
                        defaultValue: ""
                    }
                }
            },
            measureCondition: {
                type: "items",
                items: {
                    visibility: {
                        label: "Visibility condition",
                        type: "boolean",
                        component: "switch",
                        ref : "showMeasure",
                        defaultValue: false,
                        options: [{
                            value: true,
                            label: "Conditional"
                        }, {
                            value: false,
                            label: "Always"
                        }]
                    },
                    exprCondition: {
                        label: "Condition",
                        ref: "ShowHide",
                        type: "string",
                        expression: "optional",
                        defaultValue: "",
                        show: function (layout) {
                            return layout.showMeasure;
                        }
                    }                    
                }
            }
        }
    };             
    var sorting = { uses: "sorting" };
    var addons = { uses: "addons" };
    var appearancePanel = {uses: "settings",
        items: {
          initFetchRows: {
              ref: "qHyperCubeDef.qInitialDataFetch.0.qHeight",
              label: "Initial fetch rows",
              type: "number",
              defaultValue: 50
          },
          Header: {
              type: "items",
              label: "Header Format",
              items: {
                titleTextAlignment: {
                    type: "number",
                    component: "item-selection-list",
                    icon: true,
                    horizontal: true,
                    label: "Title horizontal alignment",
                    ref: "titleTextAlignment",
                    defaultValue: 1,
                    items: [{
                        value: 1,
                        component: "icon-item",
                        icon: "M"
                    }, {
                        value: 2,
                        icon: "O",
                        component: "icon-item"
                    }, {
                        value: 3,
                        icon: "N",
                        component: "icon-item"
                    }]                        
                  },
                  headerFontColour: {
                        label: "Font colour",
                        component: "color-picker",
                        dualOutput: true,
                        ref: "titleFontColor",
                        defaultValue: "#595959"
                  },
                  headerBackground: {
                        label: "Background colour",
                        component: "color-picker",
                        dualOutput: true,
                        ref: "titleBackground",
                        defaultValue: "#fff"
                  },
                  headerFontSize: {
                         label: "Font Size",
                         type: "number",
                         expression: "optional",
                         ref: "titleFontsize",
                         defaultValue: 13,
                         change: function(obj) {}
                  },
                  headerFontWeight: {
                         label: "Font Weight",
                         type: "boolean",
                         component: "switch",
                         ref : "titleFontstyle",
                         defaultValue: false,
                         options: [{
                             value: false,
                             label: "Normal"
                         }, {
                             value: true,
                             label: "Bold"
                         }]
                    }
                }
            }
          }
    };
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            addons:  {
                uses: "addons",
                type: "items",
                component: "items",                
                items: {
                    zerovalues: {
                        type: "boolean",
                        ref: "qHyperCubeDef.qSuppressZero",
                        label: "Suppress Zero Values",
                        defaultValue: false
                    }
                }
            },            
            sorting: sorting,
            appearance: appearancePanel
        }
    };
} );
