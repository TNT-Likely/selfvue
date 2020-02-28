import Dep from "./dep"

function Watcher(vm, key, cb) {
  this.vm = vm
  this.key = key
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: function () {
    this.run()
  },
  run: function () {
    let value = this.vm.data[this.key]
    let oldVal = this.value
    if (value !== oldVal) {
      this.value = value
      this.cb.call(this.vm, value, oldVal)
    }
  },
  get: function () {
    Dep.target = this
    let value = this.vm.data[this.key]
    Dep.target = null
    return value
  }
}

export default Watcher
