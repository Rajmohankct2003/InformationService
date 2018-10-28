const routes = require('next-routes')();

routes
      .add('/ais/', '/ais/')
      .add('/ais/new', '/ais/new')
      .add('/ais/search', '/ais/search')
      .add('/ais/:accnr/update', '/ais/update')
      .add('/ais/:accnr/delete', '/ais/delete');

module.exports = routes;
