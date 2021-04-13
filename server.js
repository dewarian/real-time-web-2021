import express from 'express';
import compression from 'compression';
import {fileURLToPath} from 'url';
const APP = express();
const PORT = process.env.PORT || 8080;
const __dirname = fileURLToPath(import.meta.url);

APP.use(compression({level: 6}));
APP.use(express.static(__dirname + '/public'));
APP.set('view engine', 'ejs');
APP.set('views', 'views');

APP.get('/', ( request, result ) => {
  result.send(`I am MARKEER!`);
});

APP.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
});
