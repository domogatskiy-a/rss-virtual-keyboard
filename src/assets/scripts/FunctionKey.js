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
        this.key.classList.toggle('active', action)

        if (action) {
            this.applyFunctionKey()
        }
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
        if (['▲', '◄', '▼', '►'].includes(this.fun) && action) {
            this.displaySymbol()
        }
        //console.log(this.fun)
    }

    displaySymbol() {
        super.displaySymbol()
    }

    applyFunctionKey() {
        const cursor = this.keyboard.textarea.selectionStart
        const text = this.keyboard.textarea.value
        if (this.fun === 'Tab') {
            this.keyboard.textarea.value = `${text.slice(0, cursor)}\t${text.slice(cursor)}`
            this.keyboard.textarea.selectionStart = cursor + 1
            this.keyboard.textarea.selectionEnd = cursor + 1
        }
        if (this.fun === 'Enter') {
            this.keyboard.textarea.value = `${text.slice(0, cursor)}\n${text.slice(cursor)}`
            this.keyboard.textarea.selectionStart = cursor + 1
            this.keyboard.textarea.selectionEnd = cursor + 1
        }
        if (this.fun === 'Backspace') {
            this.keyboard.textarea.value = `${text.slice(0, Math.max(cursor - 1, 0))}${text.slice(
                cursor
            )}`
            this.keyboard.textarea.selectionStart = Math.max(cursor - 1, 0)
            this.keyboard.textarea.selectionEnd = Math.max(cursor - 1, 0)
        }
        if (this.fun === 'Del') {
            this.keyboard.textarea.value = `${text.slice(0, cursor)}${text.slice(
                Math.min(cursor + 1, text.length)
            )}`
            this.keyboard.textarea.selectionStart = cursor
            this.keyboard.textarea.selectionEnd = cursor
        }
    }

    changeLang() {
        if (this.keyboard.ctrl && this.keyboard.alt) {
            this.keyboard.langEn = !this.keyboard.langEn
            this.keyboard.update()
        }
    }
}
