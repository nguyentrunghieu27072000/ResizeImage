import "./config";
import express from 'express';
import {routerUpload} from './routes/upload_image';
import {routerResize} from './routes/resize_image';
import {routerResult} from './routes/result_image';
import {engine} from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';


// khoi dong session
declare module 'express-session' {
  interface Session {
    user: string,
  }
}

// rest of the code remains same
const app = express();
const PORT = process.env.port || 3001;

//khoi dong handlevars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'somesecret',
  cookie: { maxAge: 6000000 }
}));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'));
app.use('/scripts', express.static('node_modules/bootstrap/dist'));
app.use(routerUpload)
app.use(function(req, res, next) {
  // make somethings
  if(!req.session.user){
    res.redirect('/');
    next();
  }else{
    next();
  }
});
app.use(routerResize)
app.use(routerResult)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});