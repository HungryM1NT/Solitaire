import { setDraggable } from "./cardLogic.js"
import {updateCardCoordinates} from './cardLogic.js'

function setRestartDeckElement(deck, openDeck, gameArray) {
    const restartElement = document.querySelector("#blank-spot11")
    restartElement.onclick = restartDeck                             // Возврат колоды

    function restartDeck() {
        console.log(openDeck, deck)
        if (openDeck.length != 0) {
            for (let i = openDeck.length - 1; i >= 0; i--) {
                let card = openDeck[i]
                const cardElement = document.querySelector(`#${card.divId}`)

                cardElement.style.left = "91vw"
                cardElement.style["z-index"] = i + 1
                cardElement.innerHTML = `<img src='https://www.deckofcardsapi.com/static/img/back.png' draggable='false'>`

                deck.push(openDeck.pop())
                
                cardElement.onmousedown = null
                setClickable(card, gameArray, deck, openDeck)
            }
        }
    }
}

export function setStartDeck(deck, gameArray, openDeck) {
    const mainTable = document.querySelector("#main-table")
    for (let i = 0; i < deck.length; i++) {             // !!!!!!Переделать на применение функции ко всем членам массива
        let card = deck[i]
        card.divId = spawnInDeck(i)
        updateCardCoordinates(card, -1)
        setClickable(card, gameArray, deck, openDeck)

        setRestartDeckElement(deck, openDeck, gameArray)
    }

    function spawnInDeck(i) {
        mainTable.insertAdjacentHTML('beforeend',
        `<div
        id='card${100 + i}'
        style='left:91vw; z-index:${i + 1}; top:3vh'
        class=card-div>
            <img src='https://www.deckofcardsapi.com/static/img/back.png' draggable='false'>
        </div>`)
        return `card${100 + i}`
    }
}

function setClickable(card, gameArray, deck, openDeck) {
    const cardElement = document.querySelector(`#${card.divId}`)
    cardElement.onclick = openCard

    function openCard() {
        cardElement.style.left = "80vw"
        cardElement.style["z-index"] = 25 - cardElement.style["z-index"]
        cardElement.innerHTML = `<img src=${card.image}></img>`

        openDeck.push(deck.pop())

        cardElement.onclick = null
        setDraggable(card, gameArray, openDeck)
    }
}
