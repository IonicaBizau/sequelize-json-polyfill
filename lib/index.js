

const { Model } = require("sequelize")

const toJSON = Model.prototype.toJSON
Model.prototype.originalToJSON = toJSON

Model.prototype.toJSON = function () {
    const attributes = this.sequelize.modelManager.getModel(this.constructor.name).rawAttributes
    const output = Object.keys(this.dataValues).reduce((acc, c) => {
        const val = acc[c] = this.dataValues[c]
        if (typeof val === "string" && attributes[c].type.key === "JSON") {
            try {
                acc[c] = JSON.parse(val)
            } catch (e) {}
        }
        return acc
    }, {})
    const originalJsonified = toJSON.call(this)
    return {
        ...originalJsonified,
        ...output
    }
}