import {setDraggable, updateCardCoordinates} from './cardLogic.js'


export function startRowCreator(deck, gameArray) {
    const mainTable = document.querySelector("#main-table")
    for (let i = 0; i < 7; i++) {
        let row = gameArray[i]
        for (let j = 0; j <= i; j++) {
            let card = deck.pop()
            card.divId = startSetCard(i, j)
            updateCardCoordinates(card, i)
            row.push(card)

            row[j].child = card                                    // Установка начальных связей родитель-ребенок
            card.parent = row[j]
        }
    }

    function startSetCard(x, y) {                                                                // Выставление первых строк
        mainTable.insertAdjacentHTML('beforeend',
        `<div
        id='card${10 * x + y}'
        style='left:${9 * x + 3}vw; z-index:${y}; top:${y * 2 + 2}vh'
        class=card-div>
            <img src='https://www.deckofcardsapi.com/static/img/back.png' draggable='false'>
        </div>`)
        return `card${10 * x + y}`
    }
}

export function update(gameArray, openDeck) {                                                   // Переделать под каждый row
    for (let row of gameArray) {                                                      // Каждая верхняя карта становится активной
        if (row.length != 1) {
            let lastCard = row[row.length - 1]
            if (!lastCard.isActive) {
                setDraggable(lastCard, gameArray, openDeck)
                let cardElement = document.querySelector(`#${lastCard.divId}`)
                cardElement.innerHTML = `<img src=${lastCard.image}></img>`
                lastCard.isActive = true
            } 
        }
    }
}
