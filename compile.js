import Watcher from './watcher'
function Compile(el, vm) {
  this.el = document.querySelector(el)
  this.vm = vm
  this.compileElement(this.el)
}

Compile.prototype = {
  compileElement: function(el) {
    let childNodes = el.childNodes
    let self = this
    Array.prototype.slice.call(childNodes).forEach(function(node) {
      let reg = /\{\{(.*)\}\}/
      let text = node.textContent
      if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)[1])
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
      if(!self.isTextNode(node)) {
        self.compile(node)
      }
    })
  },

  compile: function(node) {
    let nodeAttrs = node.attributes
    let self = this
    Array.prototype.forEach.call(nodeAttrs, function(attr) {
      let attrName = attr.name
      if (self.isDirective(attrName)) {
        let key = attr.value
        let dir = attrName.substring(2)
        if (self.isEventDirective(dir)) {
          self.compileEvent(node, self.vm, key, dir)
        } else {
          self.compileModel(node, self.vm, key, dir)
        }
        node.removeAttribute(attrName)
      }
    })
  },

  /** 指令解析 */
  isDirective: function(attrName) {
    return attrName.indexOf('v') > -1
  },

  /** 是否为事件指令 */
  isEventDirective: function(dir) {
    return dir.indexOf('on') > -1
  },

  /** 事件指定处理 */
  compileEvent: function(node, vm, key, dir) {
    dir = dir.substring(3)
    node.addEventListener(dir, function() {
      vm.methods[key] && vm.methods[key]()
    })
  },

  /** vmodel指令处理 */
  compileModel: function(node, vm, key, dir) {
    node.value = vm[key]
    new Watcher(this.vm, key, function(value) {
      node.value = value
    })
    node.addEventListener('input', function(newVal) {
        vm[key] = newVal.target.value
    })
  },

  isTextNode: function(node) {
    return node.nodeType === 3
  },

  compileText: function(node, key) {
    let self = this
    let initText = this.vm[key]
    this.updateText(node, initText)
    new Watcher(this.vm, key, function(value) {
      self.updateText(node, value)
    })
  },

  updateText: function(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  }
}

export default Compile
