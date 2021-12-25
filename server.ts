import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './core/passport';
import path from 'path';
import cors from 'cors';
import './core/cloudinary';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { sequelize } from './db';
import { router } from './routes';

export const __dirname = path.resolve();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
   origin: 'http://localhost:3000',
   credentials: true
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(cookieSession({
   name: 'session',
   keys: ['keylol'],
   maxAge: 999999999999991
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.get('/', (req, res) => {
   res.send('hey')
})
app.use('/api', router);

const start = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync();

      app.listen(PORT, async () => console.log('SERVER', PORT))
   } catch (err) {
      console.log(err)
   }
}

start();

