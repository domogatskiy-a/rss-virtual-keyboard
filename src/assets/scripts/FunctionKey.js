import { Key } from './Key'

export class FunctionKey extends Key {
    constructor(
        keyboard,
        id,
        code,
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
            id,
            code,
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
    actionHandler(action) {
        super.actionHandler(action)
        if (this.fun === 'Shift') {
            this.keyboard.shift = action
            this.keyboard.update()
        }
        if (this.fun === 'Alt') {
            this.keyboard.alt = action
            this.keyboard.update()
        }
        if (this.fun === 'CapsLock') {
            if (action) {
                this.keyboard.capsLock = !this.keyboard.capsLock
            }
            this.key.classList.toggle('active', this.keyboard.capsLock)
            this.keyboard.update()
        }
    }
}
