import Ids from 'db/ids'
import crypto from 'crypto'

export default class BaseComponent {

	constructor(){
		this.idList = ['user_id', 'photo_id', 'advert_id'];
		// this.imgTypeList = ['shop', 'food', 'avatar','default'];
    }
    //请求类型
    async methodType(req){
        let body = {}
        if (req.method == 'post' || req.method == 'POST') {
            body = req.body
        } else {
            body = req.query
        }
        return body

    }

	//获取id列表
	async getId(type){

		if (!this.idList.includes(type)) {
			console.log('id类型错误');
			throw new Error('id类型错误');
			return
		}
		try{
			const idData = await Ids.findOne();
			idData[type] ++ ;
			await idData.save();
			return idData[type]
		}catch(err){
			console.log('获取ID数据失败');
			throw new Error(err)
        }
        
    }
    
    //加密token
    async createToken(obj){

        let objData = {
            data: obj, //payload
            created: parseInt(Date.now()/1000), //token生成的时间的，单位秒
            exp: obj.exp //token有效期
        };

        let base64Str = Buffer.from(JSON.stringify(objData),"utf8").toString("base64");

        let secret="www.suguangwen.com";
        let hash = crypto.createHmac('sha256',secret);
            hash.update(base64Str);
        let signature = hash.digest('base64');


        return  base64Str + "." + signature;

    }

    //解密token
    async decodeToken(token){
        
        let decArr = token.split(".")
        if(decArr.length < 2){
            //token不合法
            return false
        }

        let payload = {}
        //将payload json字符串 解析为对象
        try{
            let data = Buffer.from(decArr[0], "base64").toString("utf8")
            payload = JSON.parse(data)

        }catch(e){

            return false;

        }

        //检验签名
        let secret = "www.suguangwen.com"
        let hash = crypto.createHmac('sha256', secret)
            hash.update(decArr[0])
        let checkSignature = hash.digest('base64')

        return {
            payload: payload,
            signature: decArr[1],
            checkSignature: checkSignature
        }

    }

    //查询token是否过期
    async checkToken(token){

        if (!token) return false

        let {payload, signature, checkSignature} = await this.decodeToken(token)

        if(!payload){

            return false;
        }

        //是否过期
        let expState = (parseInt(Date.now()/1000) - parseInt(payload.created)) > parseInt(payload.data.exp) ? false : true;
        if(signature === checkSignature && expState){
            return true;
        }
        
        return false;

    }

    //加密sessionId
    async createSessionId(obj){

        let objData = {
            data: obj, //payload
            created: parseInt(Date.now()/1000), //sessionId生成的时间的，单位秒
            exp: obj.exp //sessionId有效期
        };

        let base64Str = Buffer.from(JSON.stringify(objData),"utf8").toString("base64");

        let secret="www.suguangwen.com";
        let hash = crypto.createHmac('sha256',secret);
            hash.update(base64Str);
        let signature = hash.digest('base64');


        return  base64Str + "." + signature;

    }

    //解密sessionId
    async decodeSessionId(sessionId){
        
        let decArr = sessionId.split(".")
        if(decArr.length < 2){
            //sessionId不合法
            return false
        }

        let payload = {}
        //将payload json字符串 解析为对象
        try{
            let data = Buffer.from(decArr[0], "base64").toString("utf8")
            payload = JSON.parse(data)

        }catch(e){

            return false;

        }

        //检验签名
        let secret = "www.suguangwen.com"
        let hash = crypto.createHmac('sha256', secret)
            hash.update(decArr[0])
        let checkSignature = hash.digest('base64')

        return {
            payload: payload,
            signature: decArr[1],
            checkSignature: checkSignature
        }

    }

    //查询sessionId是否过期
    async checkSessionId(sessionId){

        if (!sessionId) return false

        let {payload, signature, checkSignature} = await this.decodeSessionId(sessionId)

        if(!payload){

            return false;
        }
        //是否过期
        let expState = (parseInt(Date.now()/1000) - parseInt(payload.created)) > parseInt(payload.data.payload.exp) ? false : true;
        if (payload.data.payload.username != 'sugw' || payload.data.payload.password != 'www.suguangwen.com') {
            return false;
        }

        if(signature === checkSignature && expState){
            return true;
        }
        
        return false;

    }

}