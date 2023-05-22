"use strict";

var _require = require("sequelize"),
    Model = _require.Model;

var toJSON = Model.prototype.toJSON;
Model.prototype.originalToJSON = toJSON;

Model.prototype.toJSON = function () {
    var _this = this;

    var attributes = this.sequelize.modelManager.getModel(this.constructor.name).rawAttributes;
    var output = Object.keys(this.dataValues).reduce(function (acc, c) {
        var val = acc[c] = _this.dataValues[c];
        if (typeof val === "string" && attributes[c].type.key === "JSON") {
            try {
                acc[c] = JSON.parse(val);
            } catch (e) {}
        }
        return acc;
    }, {});
    return output;
};