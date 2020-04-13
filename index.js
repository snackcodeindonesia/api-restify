const restify = require('restify');
const mongoose  = require('mongoose');
const dotenv  = require('dotenv').config();
const router =require('./router');

const port = dotenv.parsed.PORT || 3000;
const dbconnect = dotenv.parsed.DB_CONNECT;

mongoose.connect(dbconnect, {
   useNewUrlParser: true,
   useUnifiedTopology: true
 }).then(() => {
   console.log("Successfully connected to the database");    
 }).catch(err => {
   console.log('Could not connect to the database. Exiting now...', err);
   process.exit();
 });

const server = restify.createServer({
  name: 'helloworld',
  dtrace: true
});

server.use(restify.plugins.bodyParser());
router(server);

server.listen(port, function() {
   console.log('%s listening at %s', server.name, server.url);
});
  