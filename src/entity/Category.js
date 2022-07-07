const {EntitySchema} = require('typeorm');


module.exports =  new EntitySchema ({
    name: "Category",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment"
        },
        name: {
            type: "text",
        }
    },

});
