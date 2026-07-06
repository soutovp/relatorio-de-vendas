import 'dotenv/config';
import HandleToken from '../../../services/HandleToken';

const handleToken = new HandleToken();

export default class ConnectService{
    private base64Credentials: string;

    constructor(){
        const credentials = `${process.env.ISET_API_USER}:${process.env.ISET_API_KEY}`;
        this.base64Credentials = Buffer.from(credentials).toString('base64');
    }

    async checkTokenExpiration():Promise<boolean>{
        try{
            const data = await handleToken.getToken();
            if(!data) throw new Error('No token found');
            const currentTime = Math.floor(Date.now() / 1000);
            if(data.expires_in && data.expires_in > currentTime){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error('Error checking token expiration:', error);
            throw error;
        }
    }

    async generateToken(url: string, body?: Object){
        const options = {
            method: 'POST',
            headers:{
                Authorization: `Basic ${this.base64Credentials}`
            },
            body: JSON.stringify(body),
        }

        try{
            const response = await fetch(process.env.ISET_API_URL + url, options);
            const responseData = await response.json();
            if(responseData.status === 200){
                handleToken.save(responseData);
                return responseData;
            }else{
                throw new Error(`Failed to fetch data with error ${responseData.status}\n${responseData}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    async post(url: string, body?: Object, queryParams?: string){
        
        const tokenStatus = await this.checkTokenExpiration();
        if(!tokenStatus){
            await this.generateToken('oauth');
        }else{
            handleToken.updateExpiration();
        }
        const token = await handleToken.getToken();
        const options = {
            method: 'POST',
            header:{
                accept: 'application/json',
                'content-type': 'application/json',
                'access-token': token,
            },
            body: JSON.stringify(body),
        }

        try{
            const response = await fetch(process.env.ISET_API_URL + url + queryParams ? `/${queryParams}` : '', options);
            const responseData = await response.json();
            if(responseData.status === 200){
                return responseData;
            }else{
                throw new Error(`Failed to fetch data with error ${responseData.status}\n${responseData}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}