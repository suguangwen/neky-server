import express from 'express';
import logger from 'morgan';
import Path from 'path'
import engines from 'consolidate';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import config from 'config';
import apis from 'apis';
import serverRouter from 'modules/server-router';
import bodyParser from 'body-parser'

const app = express();

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    // res.header("Content-Type", "application/json;charset=utf-8");  
    next();
});

// const MongoStore = connectMongo(session);
app.use(logger());
app.use(cookieParser());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
// app.use(session({
//   name: config.session.name,
//   secret: config.session.secret,
//   resave: true,
//   saveUninitialized: false,
//   cookie: config.session.cookie,
//   store: new MongoStore({
//     url: config.url
//   })
// }))

let routerData = {
    pages: Path.join(__dirname, './routers'),
    apis: apis,
    apiName: ''
}
serverRouter(app, routerData)

app.use('/public', express.static(Path.join(__dirname, './public')));

app.listen(config.port);

module.exports = app;
