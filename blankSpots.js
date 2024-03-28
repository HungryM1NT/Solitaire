import {updateCardCoordinates} from './cardLogic.js'

export function createBlankSpots() {
    const mainTable = document.querySelector("#main-table")
    for (let i = 0; i < 7; i++) {                             // 7 рядов
        renderBlankSpot(mainTable, i, 2, 9 * i + 3)                 
    }

    for (let i = 0; i < 2; i++) {                              // Конечные позиции
        renderBlankSpot(mainTable, i + 7, 23 * i + 50, 83)
        renderBlankSpot(mainTable, i + 9, 23 * i + 50, 91)
        
    }
    renderBlankSpot(mainTable, 11, 3, 91, 2)                     // Колода

}

function renderBlankSpot(tableElement, index, top, left, n="") {     // fff
    tableElement.insertAdjacentHTML('beforeend',
        `<div
        class='blank-spot'
        id='blank-spot${index}'
        style = 'top: ${top}vh; z-index:0; left:${left}vw'
        >
        <img src='./blankSpot${n}.png' draggable='false'>
        </div>`)
}

export function addBlankSpot(row, index, v=14) {                     // Добавление в массив пустого слота
    let blankSpot = {
        value: v,
        child: null,
        suit: "any",
        isBlankSpot: true
    }
    updateCardCoordinates(blankSpot, index)
    row.push(blankSpot)
}

export function startSetArray() {
    const gameArray = []
    for (let i = 0; i < 11; i++) {
        let row = []
        if (i < 7) {
            addBlankSpot(row, i)
        } else {
            addBlankSpot(row, i, 0)
        }
        gameArray.push(row)
    }
    return gameArray
}