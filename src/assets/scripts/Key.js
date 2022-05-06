export class Key {
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
        ruShift
    ) {
        this.keyboard = keyboard
        this.id = id
        this.code = code
        this.enDown = document.createElement('span')
        this.enCapsShift = document.createElement('span')
        this.enCaps = document.createElement('span')
        this.enShift = document.createElement('span')
        this.ruDown = document.createElement('span')
        this.ruCaps = document.createElement('span')
        this.ruCapsShift = document.createElement('span')
        this.ruShift = document.createElement('span')
        this.key = document.createElement('div')
        this.rus = document.createElement('span')
        this.eng = document.createElement('span')
        this.initKey(id, enDown, enCapsShift, enCaps, enShift, ruDown, ruCapsShift, ruCaps, ruShift)
    }
    initKey(id, enDown, enCapsShift, enCaps, enShift, ruDown, ruCapsShift, ruCaps, ruShift) {
        this.key.classList.add('key', id)
        this.rus.classList.add('rus')
        this.keyboard.langEn && this.rus.classList.add('none')
        this.eng.classList.add('eng')
        !this.keyboard.langEn && this.eng.classList.add('none')
        this.enDown.classList.add('down')
        !this.keyboard.langEn && this.enDown.classList.add('none')
        this.enDown.innerText = enDown
        this.enCapsShift.classList.add('capsShift', 'none')
        this.enCapsShift.innerText = enCapsShift
        this.enCaps.classList.add('caps', 'none')
        this.enCaps.innerText = enCaps
        this.enShift.classList.add('shift', 'none')
        this.enShift.innerText = enShift
        this.ruDown.classList.add('down')
        this.keyboard.langEn && this.ruDown.classList.add('none')
        this.ruDown.innerText = ruDown
        this.ruCapsShift.classList.add('capsShift', 'none')
        this.ruCapsShift.innerText = ruCapsShift
        this.ruCaps.classList.add('caps', 'none')
        this.ruCaps.innerText = ruCaps
        this.ruShift.classList.add('shift', 'none')
        this.ruShift.innerText = ruShift

        this.key.appendChild(this.rus)
        this.key.appendChild(this.eng)
        this.rus.appendChild(this.ruDown)
        this.rus.appendChild(this.ruCapsShift)
        this.rus.appendChild(this.ruCaps)
        this.rus.appendChild(this.ruShift)
        this.eng.appendChild(this.enDown)
        this.eng.appendChild(this.enCapsShift)
        this.eng.appendChild(this.enCaps)
        this.eng.appendChild(this.enShift)
    }

    update() {
        if (!this.keyboard.langEn && this.rus.classList.contains('none')) {
            this.toggleClass(false, 'rus')
            this.toggleClass(true, 'eng')
        } else if (this.keyboard.langEn && this.eng.classList.contains('none')) {
            this.toggleClass(false, 'eng')
            this.toggleClass(true, 'rus')
        }
        if (this.keyboard.capsLock && this.keyboard.shift) {
            if (
                this.ruCapsShift.classList.contains('none') ||
                this.enCapsShift.classList.contains('none')
            ) {
                this.toggleClass(false, 'ruCapsShift', 'enCapsShift')
                this.toggleClass(true, 'enDown', 'enCaps', 'enShift', 'ruDown', 'ruCaps', 'ruShift')
            }
        } else {
            if (this.keyboard.capsLock) {
                if (
                    this.enCaps.classList.contains('none') ||
                    this.ruCaps.classList.contains('none')
                ) {
                    this.toggleClass(false, 'enCaps', 'ruCaps')
                    this.toggleClass(
                        true,
                        'enDown',
                        'enCapsShift',
                        'enShift',
                        'ruDown',
                        'ruCapsShift',
                        'ruShift'
                    )
                }
            } else if (this.keyboard.shift) {
                if (
                    this.enShift.classList.contains('none') ||
                    this.ruShift.classList.contains('none')
                ) {
                    this.toggleClass(false, 'enShift', 'ruShift')
                    this.toggleClass(
                        true,
                        'enDown',
                        'enCapsShift',
                        'ruDown',
                        'ruCapsShift',
                        'enCaps',
                        'ruCaps'
                    )
                }
            } else {
                this.defaultClass()
            }
        }
        //this.toggleClass(true, 'enDown', 'enCapsShift', 'enCaps', 'enShift', 'ruDown', 'ruCapsShift', 'ruCaps', 'ruShift')
    }
    toggleClass(mode, ...names) {
        for (let name of names) {
            this[name].classList.toggle('none', mode)
        }
    }
    defaultClass() {
        if (this.enDown.classList.contains('none') || this.ruDown.classList.contains('none')) {
            this.toggleClass(false, 'enDown', 'ruDown')
            this.toggleClass(
                true,
                'enCapsShift',
                'enShift',
                'ruCapsShift',
                'ruShift',
                'enCaps',
                'ruCaps'
            )
        }
    }

    actionHandler(action) {
        this.key.classList.toggle('active', action)
    }
}
