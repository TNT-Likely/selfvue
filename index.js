import observe from './observe'
import Watcher from './watcher'
const SelfVue = function(data, el, key) {
    this.data = data
    observe(data)
    el.innerHTML = this.data[key]
    new Watcher(this, key, function(value) {
        el.innerHTML = value
    })
}

let ele = document.querySelector('#name')
let selfVue = new SelfVue({
    name: 'hello world'
}, ele, 'name')

window.setTimeout(function () {
    console.log('name 值改变了')
    selfVue.data.name = 'bjjj'
}, 2000)