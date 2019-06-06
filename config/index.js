'use strict';

module.exports = {
	port: 8800,
	url: 'mongodb://localhost:27017/sugwphoto',
	session: {
		name: 'sugw',
		secret: 'sugw',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	},
	wxConfig: {
		appid: 'wxc8dc1434bb36d78e',
		secret: 'f5355ef953a29c6aa24d3e91665e3725',
	},
	messageCode: {
		LOGINSCC: {
			code: '00',
			message: '登录成功！'
		},
		ADDPHOTOSCC: {
			code: '00',
			message: '新增相册成功！'
		},
		UPIMAGESSCC: {
			code: '00',
			message: '上传相片成功！'
		},
		RMIMAGESSCC: {
			code: '00',
			message: '删除相片成功！'
		},
		RMPHOTOSCC: {
			code: '00',
			message: '删除相册成功！'
		},
		MODIFYSCC: {
			code: '00',
			message: '修改密码成功！'
		},
		ADDADVERTSCC: {
			code: '00',
			message: '新增广告成功！'
		},
		RMADVERTSCC: {
			code: '00',
			message: '删除广告成功！'
		},
		ONADVERTSCC: {
			code: '00',
			message: '启用广告成功！'
		},
		GETONADVERTSCC: {
			code: '00',
			message: '获取启用广告成功！'
		},
		OFFADVERTSCC: {
			code: '00',
			message: '停用广告成功！'
		},
		LOGINERR: {
			code: '01',
			message: '登录失败，密码错误！'
		},
		TOKRNERR: {
			code: '01',
			message: '获取信息失败，token错误！'
		},
		PHOTODATAERR: {
			code: '01',
			message: '获取信息失败，相册不存在！'
		},
		STORAGEERR: {
			code: '01',
			message: '上传失败，容量不足，需扩充购买容量！'
		},
		MODIFYERR: {
			code: '01',
			message: '修改密码失败！'
		},
		GETONADVERTERR: {
			code: '01',
			message: '获取启用广告失败！'
		},
	}
}