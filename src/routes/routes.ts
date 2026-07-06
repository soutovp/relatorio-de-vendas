import router from 'express';
import {iSetProvider} from '../../app';
const app = router();

app.get('/orders', async (req,res)=>{
    // const body = req.body;
    console.log('Received request for orders');
    const body = {
        query: '',
        date: {
            from: '2024-06-01',
            to: '2024-06-30'
        },
    };
    try{
        const data = await iSetProvider.receiveOrders(body)
        res.json(data);

    }catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
})

export default app;