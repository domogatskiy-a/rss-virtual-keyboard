export class InterfaceKeyboard {
    body = document.body
    wrapper = document.createElement('div')
    keyboard = document.createElement('div')
    textarea = document.createElement('textarea')
    constructor() {
        this.#initNodes()
    }

    #initNodes() {
        this.wrapper.className = 'wrapper'

        this.textarea.className = 'textarea'
        this.textarea.id = 'textarea'
        this.textarea.setAttribute('rows', 6)
        this.textarea.setAttribute('cols', 50)

        this.keyboard.classList = 'keyboard'
        this.id = 'keyboard'
    }

    generateInterfaceKeyboard() {
        this.body.appendChild(this.wrapper)
        //h1
        let node = document.createElement('h1')
        node.className = 'title'
        node.innerText = 'RSS Virtual keyboard'
        this.wrapper.appendChild(node)
        this.wrapper.appendChild(this.textarea)
        this.wrapper.appendChild(this.keyboard)
    }
}
