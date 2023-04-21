'use strict';

import express from 'express'
const crypto = require('crypto');
const router = express.Router()

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
router.get('/demo', function (req, res, next) {
	res.render('demo', { title: 'Express' });
});


router.post('/test', function (req, res, next) {
	res.send({
		status: 200,
		message: '发送成功'
	})
});
router.post('/err', function (req, res, next) {
	res.send({
		status: 0,
		type: 'FORM_DATA_ERROR',
		message: '表单信息错误'
	})
});
router.post('/postWxMessage', function (req, res, next) {
	axiosWx(req.body, res)
});
router.post('/postWxImg', function (req, res, next) {
	let data = req.body
	axios.get(data.imageUrl, { responseType: 'arraybuffer' })
	.then(response => {
		const imageData = response.data;
		const hash = crypto.createHash('md5').update(imageData).digest('hex');
		const base64Data = Buffer.from(imageData, 'binary').toString('base64');
		delete data.imageUrl
		data.image.md5 = hash
		data.image.base64 = base64Data
		axiosWx(data, res)
	})
	.catch(error => {
		console.error(error);
	});
});
function axiosWx (data, res) {
	axios.post('', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		res.send(response.data)
	})
	.catch(error => {
		console.error(error);
	});
}
export default router