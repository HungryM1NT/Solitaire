import { update } from "./cardRender.js"
import { mainTableLadder } from "./cardLadder.js"

export function setDraggable(card, isMain=false, rowsArray) {
    let pos1, pos2, pos3, pos4
    const startElement = document.querySelector(`#${card.divId}`)
    startElement.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e.preventDefault()
        setZIndex(card, 100)
        pos3 = e.clientX                               // Получаем начальные координаты мышки
        pos4 = e.clientY
        document.onmousemove = elementDrag
        document.onmouseup = closeDragELement
    }

    function elementDrag(e) {
        e.preventDefault()
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        const newElementLeft = startElement.offsetLeft - pos1
        const newElementTop = startElement.offsetTop - pos2
        move(card, newElementLeft, newElementTop)

        function move(card, newElementLeft, newElementTop, element=startElement, k=0) {
            if (card.child) {
                move(card.child, newElementLeft, newElementTop, document.querySelector(`#${card.child.divId}`), k + 4)
            }
            element.style.left = newElementLeft / window.innerWidth * 100 + "vw"
            element.style.top = newElementTop / window.innerHeight * 100 + k + "vh"
        }
    }

    function closeDragELement() {             // При отпускании кнопки восстанавливаем прошлые параметры карты
        setZIndex(card, -100)
        getNewCords(card, rowsArray)
        document.onmouseup = null
        document.onmousemove = null
    }

    function setZIndex(card, k) {
        const element = document.querySelector(`#${card.divId}`)
        const prevZ = element.style["z-index"]
        if (card.child) {
            setZIndex(card.child, k)
        }
        element.style["z-index"] = Number(prevZ) + k
    }

}

export function updateCardCoordinates(card, i, k=0) {                                                                 // Функция для выдачи координат
    let cardElement = document.querySelector(`#${card.divId}`)
    card.left = cardElement.offsetLeft
    card.top = cardElement.offsetTop
    card.coordinates = [card.left + cardElement.offsetWidth / 2, card.top + cardElement.offsetHeight / 2]
    card.row = i
}

function getNewCords(card, rowsArray) {
    const cards = rowsArray[card.row].toSpliced(0, rowsArray[card.row].indexOf(card))                           // Получение карт с двигаемой
    for (let i = 0; i < 7; i++) {
        let row = rowsArray[i]
        if (row.length != 0) {
            const lastRowCard = row[row.length - 1]
            if (card != lastRowCard && isClose(card, lastRowCard) && mainTableLadder(card, lastRowCard)) {
                rowsArray[i] = row.concat(cards)                                                                               // Добавление в новый массив
                rowsArray[card.row].splice(rowsArray[card.row].indexOf(card))                                    // Потом посмотреть, как сократить
                // console.log(rowsArray[card.row])
                setNewPosition(cards, lastRowCard.left, lastRowCard.top, i, 4)
                // updateCardCoordinates(cards, i)
                setNewParent(card, lastRowCard)
                updateZIndex(card, lastRowCard)
                update(rowsArray)
                console.log(rowsArray)
                return
            }
        }
    }
    setNewPosition(cards, card.left, card.top, card.row, 0)
}

function setNewPosition(cards, left, top, rowId, k) {
    for (let card of cards) {
        let cardElement = document.querySelector(`#${card.divId}`)
        cardElement.style.left = left / window.innerWidth * 100  + "vw"
        cardElement.style.top = top / window.innerHeight * 100 + k + "vh"
        updateCardCoordinates(card, rowId)
        left = card.left
        top = card.top
        k = 4
    }
}

function isClose(card1, card2) {                                                              // Проверка на то, близка ли карта 
    const element = document.querySelector(`#${card1.divId}`)
    const halfWidth = card2.coordinates[0] - card2.left
    const halfHeight = card2.coordinates[1] - card2.top
    const isWidth = Math.abs(element.offsetLeft + halfWidth - card2.coordinates[0]) <= halfWidth * 1.2
    const isHeight = Math.abs(element.offsetTop + halfHeight - card2.coordinates[1]) <= halfHeight * 1.2
    return isWidth && isHeight
}

function setNewParent(currentCard, newParentCard) {
    const oldParent = currentCard.parent
    oldParent.child = null
    currentCard.parent = newParentCard
    newParentCard.child = currentCard
}

function updateZIndex(card, lastRowCard) {
    let cardElement = document.querySelector(`#${card.divId}`)
    let lastRowCardElement = document.querySelector(`#${lastRowCard.divId}`)
    cardElement.style["z-index"] = parseInt(lastRowCardElement.style["z-index"]) + 1
    if (card.child) {
        updateZIndex(card.child, card)
    }
}