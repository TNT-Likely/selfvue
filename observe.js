import Dep from './dep'
const defineReactive = function(data, key, defaultVal) {
    let val = defaultVal
    let dep = new Dep()
    Object.defineProperty(data, key, {
        get: function() {
            console.log('值被获取了...' + val)
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },

        set: function(newVal) {
            val = newVal
            console.log('值被更新了...' + val)
            dep.notify()
        }
    })
}

const observe = (data) => {
    if (!data || typeof data !== 'object') {
        return
    }

    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

export default observe