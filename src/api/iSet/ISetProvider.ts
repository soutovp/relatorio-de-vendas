import GenerateTokenController from './controllers/GenerateTokenController';
import CollectOrdersController from './controllers/CollectOrders';
import ConnectService from './services/ConnectService';
const connectService = new ConnectService();
export default class ISetProvider {
    constructor(){
        this.start();
    }
    async start(){
        const tokenStatus = await connectService.checkTokenExpiration();
        if (!tokenStatus) {
			await GenerateTokenController();
		} else {
			console.log('Token is still valid');
		}
    }
    async receiveOrders(body: object){
        try{
            const orders = await CollectOrdersController(body);
            return orders;
        }catch(error){
            console.error('Error receiving orders:', error);
            throw error;
        }
    }
}