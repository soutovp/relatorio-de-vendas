import express from 'express';
import cors from 'cors';
import ISetProvider from './src/api/iSet/ISetProvider';
import router from './src/routes/routes';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use('/api', router);
export const iSetProvider = new ISetProvider();

app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.listen(3000, ()=>{
    console.log(`Server is running on port ${PORT}`);
});