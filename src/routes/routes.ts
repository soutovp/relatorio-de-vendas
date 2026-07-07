import router from 'express';
import {iSetProvider} from '../../app';
const app = router();

app.get('/orders', async (req,res)=>{
    // const body = req.body;
    console.log('Received request for orders');
    const body = {
		query: 'Fernando Souto',
		// date: {
		// 	from: '2026-06-01',
		// 	to: '2026-06-30',
		// },
		order_type: 'desc',
	};
    try{
        const data = await iSetProvider.receiveOrders(body)
        res.status(data.status).json(data.orders);

    }catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
})

export default app;