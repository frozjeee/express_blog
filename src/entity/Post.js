const {EntitySchema} = require('typeorm');


module.exports =  new EntitySchema ({
    name: "Post",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment"
        },
        title: {
            type: "text",
        },
        slug: {
            type: "text",
        },
        description: {
            type: "text",
        },
        likes: {
            type: "int",
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp with time zone',
            createDate: true,
        },
        price: {
            type: "int",
        }
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-many",
            joinTable: true,
            cascade: true
        },
        author: {
            target: "User",
            type: "many-to-one",
            cascade: true
        }
    }

});
