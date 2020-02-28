import observe from './observe'
import Compile from './compile'
const SelfVue = function(options) {
    let self = this
    this.vm = this
    this.data = options.data
    this.methods = options.methods
    Object.keys(this.data).forEach(function(key) {
      self.proxyKeys(key)
    })
    observe(options.data)
    new Compile(options.el, this.vm)
    options.mounted.call(this)
    return this
}

SelfVue.prototype = {
  proxyKeys: function(key) {
    let self = this
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function proxyGetter() {
        return self.data[key]
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal
      }
    })
  }
}

export default SelfVue
