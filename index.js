import SelfVue from './vue'
let selfVue = new SelfVue({
    el: '#app',
    data: {
        title: 'testTitle',
        name: 'testName',
        content: 'testContent'
    },

    methods: {
        say: function() {
            alert('hello')
        }
    },

    mounted() {
        window.setTimeout(()=> {
            this.title = 'title'
            this.name = 'name'
            this.content = 'content'
        }, 2000)
    }
})

