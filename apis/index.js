
function apis () {
    let src = 'http://localhost:3000/'
    let list = {
        demo: 'demo'
    }
    let signlist = {
        demo: ['token']
    }
    function apiFun (list, signlist) {
        console.log(list)
        console.log(signlist)
    }(list, signlist)
}
module.exports = apis