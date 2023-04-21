'use strict';

import express from 'express'
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
	request({
		url: '',
		method: "POST",
		json: true,
		headers: {
			"content-type": "application/json",
		},
		body: req.body
	}, function (err, rep, body) {
		res.send(body)
	});
	
});

export default router