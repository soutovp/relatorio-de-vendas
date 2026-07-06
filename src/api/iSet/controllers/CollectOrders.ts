import ConnectService from "../services/ConnectService";
const connectService = new ConnectService();
export default async function CollectOrdersController(body: object){
    const _body = body || {};
    try{
        const orders = await connectService.post('order/list', _body);
        return orders;
    } catch (error) {
        console.error('Error collecting orders:', error);
        throw error;
    }
}