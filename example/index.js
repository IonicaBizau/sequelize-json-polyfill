"use strict";

// Init the lib
require("../lib");

// ...
(async () => {
    const items = await Item.findAll()
    console.log(items[0].toJSON())
})()
