import {setDraggable, updateCardCoordinates} from './cardLogic.js'


export function startRowCreator(deck) {
    const mainTable = document.querySelector("#main-table")
    let rowsArray = []
    for (let i = 0; i < 7; i++) {
        let row = []
        // addBlankSpot(row, i)
        // row.push(blankspot)
        for (let j = 0; j <= i; j++) {
            let card = deck.pop()
            card.divId = startSetCard(i, j)
            updateCardCoordinates(card, i)
            row.push(card)
            if (j != 0) {                                    // Установка начальных связей родитель-ребенок
                row[j - 1].child = card
                card.parent = row[j - 1]
            } else {                                         //!!!!!!!!!!!!!!!!!!!!! Заглушка на пустые места
                let blankspot = {
                    chilfffdassfasfsdfsd: undefined,
                }
                card.parent = blankspot 
            }
        }
        // updateCardCoordinates(row, i)
        rowsArray.push(row)
    }
    return rowsArray

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

export function update(rowsArray) {                                                   // Переделать под каждый row
    for (let row of rowsArray) {                                                      // Каждая верхняя карта становится активной
        if (row.length) {
        // if (row.length != 1) {
            let lastCard = row[row.length - 1]
            if (!lastCard.isActive) {
                setDraggable(lastCard, true, rowsArray)
                let cardElement = document.querySelector(`#${lastCard.divId}`)
                cardElement.innerHTML = `<img src=${lastCard.image}></img>`
                lastCard.isActive = true
            } 
        }
    }
}

function addBlankSpot(row, index) {
    let blankSpot = {
        value: 14,
        child: null,
        suit: undefined,
        row: index
    }
    row.push(blankSpot)
}