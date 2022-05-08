import { Key } from './Key'
import { FunctionKey } from './FunctionKey'

export class Keyboard {
    body = document.body
    wrapper = document.createElement('div')
    keyboard = document.createElement('div')
    textarea = document.createElement('textarea')
    constructor(keysData) {
        this.keysData = keysData
        this.keys = []
        this.rowCol = [0, 14, 29, 42, 55]
        this.langEn = true
        this.capsLock = false
        this.alt = false
        this.shift = false
        this.ctrl = false
        this.#initNodes()

        this.eventListener()
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

    renderInterfaceKeyboard() {
        this.body.appendChild(this.wrapper)
        //h1
        let node = document.createElement('h1')
        node.className = 'title'
        node.innerText = 'RSS Virtual keyboard'
        this.wrapper.appendChild(node)
        this.wrapper.appendChild(this.textarea)
        this.wrapper.appendChild(this.keyboard)

        this.#renderKeys()

        if (localStorage.getItem('keyboardLang') !== null) {
            this.langEn = localStorage.getItem('keyboardLang') === 'true'
            this.update()
        }

        let p = document.createElement('p')
        p.innerHTML =
            'Клавиатура создана в операционной системе Windows <br/> Для переключения языка комбинация: ctrl + alt'
        this.wrapper.appendChild(p)

        this.textarea.focus()
    }

    #renderKeys() {
        let colInRow = 0
        let divRow
        for (let i = 0; i < this.keysData.eng.length; i++) {
            let key = {}
            if (this.keysData.eng[i].type !== 'fun') {
                key = new Key(
                    this,
                    this.keysData.eng[i].code,
                    this.keysData.eng[i].KeyCode,
                    this.keysData.eng[i].down,
                    this.keysData.eng[i].capsShift,
                    this.keysData.eng[i].caps,
                    this.keysData.eng[i].shift,
                    this.keysData.rus[i].down,
                    this.keysData.rus[i].capsShift,
                    this.keysData.rus[i].caps,
                    this.keysData.rus[i].shift
                )
            } else {
                key = new FunctionKey(
                    this,
                    this.keysData.eng[i].code,
                    this.keysData.eng[i].keyCode,
                    this.keysData.eng[i].down,
                    this.keysData.eng[i].capsShift,
                    this.keysData.eng[i].caps,
                    this.keysData.eng[i].shift,
                    this.keysData.rus[i].down,
                    this.keysData.rus[i].capsShift,
                    this.keysData.rus[i].caps,
                    this.keysData.rus[i].shift,
                    this.keysData.eng[i].down
                )
            }
            this.keys.push(key)
            if (this.rowCol.includes(colInRow)) {
                divRow = document.createElement('div')
                divRow.className = 'row'
                this.keyboard.appendChild(divRow)
            }
            colInRow++
            divRow.appendChild(key.key)
        }
    }
    update() {
        this.keys.forEach((key) => key.update())
        localStorage.setItem('keyboardLang', this.langEn)
    }

    eventListener() {
        this.keyboard.addEventListener('mousedown', (e) => {
            //console.log(e.target.parentNode.parentNode)
            this.onClick(e)
        })
        this.keyboard.addEventListener('mouseup', (e) => {
            this.onClick(e, false)
        })
        this.keyboard.addEventListener('mouseout', (e) => {
            this.onClick(e, false)
        })
        document.addEventListener('keydown', (e) => {
            //console.log(e)
            this.onPress(e, true)
        })
        document.addEventListener('keyup', (e) => {
            this.onPress(e, false)
        })

        //keydown и keyup
        //event.code
    }

    onClick(e, action = true) {
        const key = this.keys.find((i) => i.key == e.target.parentNode.parentNode)
        if (key !== undefined) {
            e.preventDefault()
            action ? (key.active = true) : (key.active = false)
            key.actionHandler(e, action)
        }

        //console.log(key)
    }

    onPress(e, action) {
        const key = this.keys.find((i) => i.code == e.code)
        if (key !== undefined) {
            e.preventDefault()
            action ? (key.active = true) : (key.active = false)
            key.actionHandler(e, action)
        }
    }
}
