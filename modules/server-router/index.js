import fs from 'fs';
import Path from 'path';

function controlPages (pages) {
    if (!pages) {
        return []
    }
    if (!fs.existsSync(pages)) {
        fs.mkdirSync(pages, '0777')
        console.log('文件夹不存在，已为您创建一个新的文件夹。')
    }
    const pagesPath = pages
    let filesData = []
    return new Promise((res, rej) => {
        return function getFiles(dir) {
            let files = fs.readdirSync(dir)
            files.map(file => {
                const _path = Path.join(dir, file)
                const stat = fs.statSync(_path)
                if (file != 'index.js' && !stat.isDirectory()) return
                if (stat && stat.isDirectory()) return getFiles(_path)
                filesData.push(_path)
            })
            res(filesData)
        }(pagesPath)
    })
}

async function init(app, options) {

    let initData = {
        pages: options.pages || '',
        apis: options.apis || '',
        apiName: options.apiName ? '/' + options.apiName : ''
    }
    
    let _controlPages = await controlPages(initData.pages)
    _controlPages.map(_path => {
        var _pathFun = require(_path);
        let _pathUrl = _path.replace(initData.pages, '').replace('/index.js', '')
        if (!_pathFun.default) return
        if (!_pathUrl) { 
            _pathUrl = '/index'
            app.use('/', _pathFun.default)
        }
        app.use(initData.apiName + _pathUrl, _pathFun.default)
    })
    
}

module.exports = init