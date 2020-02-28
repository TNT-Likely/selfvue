
function Dep() {
    this.subs = []
    this.target = null
}

Dep.prototype.addSub = function(cb) {
    this.subs.push(cb)
}

Dep.prototype.notify = function () {
    this.subs.forEach(function(sub) {
        sub.update()
    })
}

export default Dep
