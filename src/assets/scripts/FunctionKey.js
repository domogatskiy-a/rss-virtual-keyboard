import { Key } from './Key'

export class FunctionKey extends Key {
    constructor(
        keyboard,
        code,
        keyCode,
        enDown,
        enCapsShift,
        enCaps,
        enShift,
        ruDown,
        ruCapsShift,
        ruCaps,
        ruShift,
        fun
    ) {
        super(
            keyboard,
            code,
            keyCode,
            enDown,
            enCapsShift,
            enCaps,
            enShift,
            ruDown,
            ruCapsShift,
            ruCaps,
            ruShift
        )
        this.fun = fun
    }
    actionHandler(e, action) {
        super.actionHandler(action)
        //this.key.classList.toggle('active', action)
        if (this.fun === 'Shift') {
            this.keyboard.shift = action
            this.keyboard.update()
        }
        if (this.fun === 'Ctrl') {
            this.keyboard.ctrl = action
            this.changeLang()
        }
        if (this.fun === 'Alt') {
            this.keyboard.alt = action
            this.changeLang()
        }
        if (this.fun === 'CapsLock') {
            if (action) {
                this.keyboard.capsLock = !this.keyboard.capsLock
            }
            this.key.classList.toggle('active', this.keyboard.capsLock)
            this.keyboard.update()
        }
        if (this.fun === 'Tab') {
            e.preventDefault()
            this.keyboard.textarea.focus()
        }
    }
    changeLang() {
        if (this.keyboard.ctrl && this.keyboard.alt) {
            this.keyboard.langEn = !this.keyboard.langEn
            this.keyboard.update()
        }
    }
}
