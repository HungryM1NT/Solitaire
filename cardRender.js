import {setDraggable} from './cardLogic.js'


export function startRowCreator(deck) {
    const mainTable = document.querySelector("#main-table")
    let rowsArray = []
    for (let i = 0; i < 7; i++) {
        let row = []
        for (let j = 0; j <= i; j++) {
            let card = deck.pop()
            card.divId = startSetCard(i, j)
            row.push(card)
            if (j != 0) {                                    // Установка начальных связей родитель-ребенок
                row[j - 1].child = card
                card.parent = row[j - 1]
            }
        }
        rowsArray.push(row)
    }
    return rowsArray

    function startSetCard(x, y) {                                                                // Выставление первых строк
        mainTable.insertAdjacentHTML('beforeend',
        `<div
        id='card${10 * x + y}'
        style='left:${9 * x + 3}vw; z-index:${x}; top:${y * 2 + 2}vh'
        class=card-div>
            <img src='https://www.deckofcardsapi.com/static/img/back.png' draggable='false'>
        </div>`)
        return `card${10 * x + y}`
    }
}

export function update(rowsArray) {
    for (let row of rowsArray) {                                                      // Каждая верхняя карта становится активной
        if (row.length) {
            let lastCard = row[row.length - 1]
            if (!lastCard.isDragable) {
                setDraggable(lastCard, true)
                let cardElement = document.querySelector(`#${lastCard.divId}`)
                cardElement.innerHTML = `<img src=${lastCard.image}></img>`
            } 
        }
    }
}
