"use strict";

// Init the lib
require("../lib");

// ...

const items = await Item.findAll()
console.log(items[0].toJSON())
