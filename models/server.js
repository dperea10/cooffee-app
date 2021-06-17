const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:     '/api/auth',
            user:     '/api/users',
            category: '/api/category',
            product:  '/api/product'
        }

        // connection database
        this.connectionDB();

        // Middlewares
        this.middlewares();

        // routes
        this.routes();

    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        // read parser
        this.app.use( express.json() );
        // Public directory
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.paths.auth,     require('../routes/auth'));
        this.app.use( this.paths.user,     require('../routes/users'));
        this.app.use( this.paths.category, require('../routes/categories'));
        this.app.use( this.paths.product,  require('../routes/products'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
