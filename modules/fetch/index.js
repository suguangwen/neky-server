import querystring from 'querystring';
import request from 'request';
class Fetch {

    constructor(){

        this.post = this.post.bind(this)
        this.get = this.get.bind(this)

    }

    setData (url, options, states) {

        let _url = url
        let _opts = {
            headers: {},
            json: {}
        }
        if (options && options.headers) {
            _opts = options
        } else {
            _opts.json = options
        }


        if (states == 'get') {
            if (_opts && _opts.json) {
                var _q = querystring.stringify(_opts.json);
                _url = _url + '?' + _q;
                delete _opts.json;
            }
        } else {
            if (_opts && !_opts.headers['Content-type']) {
                _opts.headers['Content-type'] = 'application/json; charset=utf-8';
            }
        }

        return { _url, _opts }

    }

    async post(url, options){

        let {_url, _opts} = this.setData(url, options, 'post')

        return new Promise((res, rej) => {
            request.post(_url, _opts, function (err, rep, body) {
              if (err) {
                return rej("出错啦！！！");
              }
              if (rep.statusCode == 200) {
                return res(body);
              }
            });
        });

    }

    async get(url, options){

        let {_url, _opts} = this.setData(url, options, 'get')

        return new Promise((res, rej) => {
            request.get(_url, _opts, function (err, rep, body) {
              if (err) {
                return rej("出错啦！！！");
              }
              if (rep.statusCode == 200) {
                return res(body);
              }
            });
        });

    }

}

global.Fetch = new Fetch()
export default new Fetch()