import {setDraggable} from './cardLogic.js'
import { createDeck } from './cardDeck.js'
import { createBlankSpots } from './blankSpots.js'
import { startRowCreator, update } from './cardRender.js'

const testElement = document.querySelector('#testid')

async function start() {
    createBlankSpots()
    const deck = await createDeck()
    const rowsArray = startRowCreator(deck)
    update(rowsArray)
    for (let i = 0; i < 2; i++) {
        // let k = 100 * i
        // testElement.insertAdjacentHTML('beforeend', `<div id='card${i}' style='left:${9 * i + 3}vw; z-index:${i}; top:1vh' class=card-div><img src=${deck[i].image}></div>`)
        // setDragable(document.querySelector(`#card${i}`), true)
    }
    console.log(rowsArray)
    // testElement.insertAdjacentHTML('beforeend', `<img src='https://www.deckofcardsapi.com/static/img/back.png'>`)


   
}
start()