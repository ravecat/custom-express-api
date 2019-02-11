import http from 'http';
import config from './config';
import app from './app';
import initDb from './db';

const port = config.port;

app.server = http.createServer(app);

initDb(() => {
  app.server.listen(port);
  app.server.on('error', onError);
  app.server.on('listening', function() {
    console.warn(`Server is ready on port ${port}\n`);
  });
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
