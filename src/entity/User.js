const {EntitySchema} = require('typeorm');


module.exports =  new EntitySchema ({
    name: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
            unique: true,
        },
        name: {
            type: "text",
            unique: true
        },
        password: {
            type: "text",
        },
        about: {
            type: "text",
            nullable: true

        },
        is_admin: {
            type: "boolean",
        }
    }
});