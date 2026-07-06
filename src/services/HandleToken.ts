import fs from 'fs';
import path from 'path';
interface TokenResponse{
    status: number;
    token: string;
    expires_in: number;
}
export default class HandleToken {
    constructor(){

    }
    save(data: TokenResponse): void{
        if(!data) throw new Error('Invalid token data');
        if(data.status !== 200) throw new Error(`Failed to generate token with error ${data.status}`);
        const {status, ...jsonData} = data;
        try{
            fs.writeFileSync(path.resolve(process.cwd(), 'src', 'temp', 'token.json'), JSON.stringify(jsonData));
        }catch(error){
            console.error('Error saving token:', error);
        }
    }
    updateExpiration():void{
        try{
            const data = fs.readFileSync(path.resolve(process.cwd(), 'src', 'temp', 'token.json'), 'utf-8');
            const jsonData = JSON.parse(data);
            jsonData.expires_in = Math.floor(Date.now() / 1000) + 900;
            fs.writeFileSync(path.resolve(process.cwd(), 'src', 'temp', 'token.json'), JSON.stringify(jsonData));
        }catch(error){
            console.error('Error updating token expiration:', error);
        }
    }
    async getToken(): Promise<TokenResponse | null>{
        try{
            const data = fs.readFileSync(path.resolve(process.cwd(), 'src', 'temp', 'token.json'), 'utf-8');
            const jsonData = JSON.parse(data);
            return jsonData;
        }catch(error){
            console.error('Error retrieving token:', error);
            throw new Error('Failed to retrieve token');
        }
    }
}