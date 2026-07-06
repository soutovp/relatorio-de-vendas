import HandleToken from '../../../services/HandleToken';
import ConnectService from '../services/ConnectService';
const handleToken = new HandleToken();
const connectService = new ConnectService();
export default async function GenerateTokenController(){
    try{
        const data = await connectService.generateToken('oauth');
        if(data.status && data.status === 200){
            handleToken.save(data);
        }else{
            throw new Error(`Failed to generate token with error ${data.status}\n${data}`);
        }
    }catch(error){
        console.error('Error generating token:', error);
    }
}