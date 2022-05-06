//css
import '../styles/style.css'
import { Keyboard } from './Keyboard.js'
import engKeys from '../eng.json'
import rusKeys from '../rus.json'

const iKeyboard = new Keyboard({ eng: engKeys, rus: rusKeys })
iKeyboard.renderInterfaceKeyboard()
console.log(iKeyboard)
