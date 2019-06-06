'use strict';

import express from 'express'
const router = express.Router()

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
router.get('/demo', function (req, res, next) {
	res.render('demo', { title: 'Express' });
});


router.post('/', function (req, res, next) {
	res.send({
		status: 0,
		type: 'FORM_DATA_ERROR',
		message: '表单信息错误'
	})
});

export default router