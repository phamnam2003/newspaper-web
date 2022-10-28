const siteRouter = require('./site');
const addRouter = require('./add');

function route (app) {
    app.use('/add', addRouter);
    app.use('/', siteRouter);
}

module.exports = route;