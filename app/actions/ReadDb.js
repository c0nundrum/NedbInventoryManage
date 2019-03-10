const Datastore = require('nedb');

const db = new Datastore({ filename: 'estoque.db', autoload: true });
