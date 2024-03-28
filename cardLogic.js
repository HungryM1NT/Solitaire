import { update } from "./cardRender.js"
import { mainTableLadder, finishSpotsLadder } from "./cardLadder.js"

export function setDraggable(card, gameArray) {
    let pos1, pos2, pos3, pos4
    const startElement = document.querySelector(`#${card.divId}`)
    startElement.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e.preventDefault()
        setZIndex(card, 100)
        pos3 = e.clientX                               // Получаем начальные координаты мышки
        pos4 = e.clientY
        updateCardCoordinates(card, card.row)
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

        function move(card, newElementLeft, newElementTop, element=startElement, k=0, isMain=true) {
            if (card.child) {
                move(card.child, newElementLeft, newElementTop, document.querySelector(`#${card.child.divId}`), k + 4, false)
            }
            if (!isMain || (newElementLeft + element.offsetWidth <= window.innerWidth && newElementLeft >= 0)) {             // Проверка на края видимой области
                element.style.left = newElementLeft / window.innerWidth * 100 + "vw"
            }
            if (!isMain || (newElementTop + element.offsetHeight <= window.innerHeight && newElementTop >= 0)) {
                element.style.top = newElementTop / window.innerHeight * 100 + k + "vh"
            }
        }
    }

    function closeDragELement() {             // При отпускании кнопки восстанавливаем прошлые параметры карты
        setZIndex(card, -100)
        getNewCords(card, gameArray)
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

export function updateCardCoordinates(card, i) {                                                                 // Функция для выдачи координат
    let cardElement
    if (card.isBlankSpot) {
        cardElement = document.querySelector(`#blank-spot${i}`)
    } else {
        cardElement = document.querySelector(`#${card.divId}`)
    }
    card.left = cardElement.offsetLeft
    card.top = cardElement.offsetTop
    card.coordinates = [card.left + cardElement.offsetWidth / 2, card.top + cardElement.offsetHeight / 2]
    card.row = i
}

function getNewCords(card, gameArray) {
    const cards = gameArray[card.row].toSpliced(0, gameArray[card.row].indexOf(card))                           // Получение карт начиная с двигаемой

    for (let i = 0; i < 11; i++) {                
        if (i < 7) {                                                                                                      // Проверка по основным строкам
            let row = gameArray[i]
            const lastRowCard = row[row.length - 1]
            if (card != lastRowCard && isClose(card, lastRowCard) && mainTableLadder(card, lastRowCard)) {
                gameArray[i] = row.concat(cards)                                                                               // Добавление в новый массив
                gameArray[card.row].splice(gameArray[card.row].indexOf(card))                                    // Потом посмотреть, как сократить
                setNewPosition(cards, lastRowCard, i, 4)
                setNewParent(card, lastRowCard)
                updateZIndex(card, lastRowCard)
                update(gameArray)
                console.log(gameArray)
                return
            }
        } else {
            if (cards.length == 1) {
                let row = gameArray[i]
                const lastRowCard = row[row.length - 1]
                console.log(lastRowCard)
                if (card != lastRowCard && isClose(card, lastRowCard) && finishSpotsLadder(card, lastRowCard)) {
                    gameArray[i] = row.concat(cards)                                                                               // Добавление в новый массив
                    gameArray[card.row].splice(gameArray[card.row].indexOf(card))                                                        // Потом посмотреть, как сократить
                    setNewPosition(cards, lastRowCard, i, 0)
                    setNewParent(card, lastRowCard)
                    updateZIndex(card, lastRowCard)
                    update(gameArray)
                    console.log(gameArray)
                    return
                }
            }
        }
    }
    // console.log(1)
    setNewPosition(cards, card, card.row, 0)
}

function setNewPosition(cards, lastRowCard, rowId, k) {
    let left = lastRowCard.left
    let top = lastRowCard.top
    for (let card of cards) {
        let cardElement = document.querySelector(`#${card.divId}`)
        cardElement.style.left = left / window.innerWidth * 100  + "vw"
        if (lastRowCard.isBlankSpot ) {
            k = 0
            lastRowCard = null
        }
        cardElement.style.top = top / window.innerHeight * 100 + k + "vh"
        updateCardCoordinates(card, rowId)
        left = card.left
        top = card.top
        k = 4
    }
}

function isClose(card1, card2) {                                                              // Проверка на то, близка ли карта
    updateCardCoordinates(card2, card2.row)
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
    if (lastRowCard.isBlankSpot) {
        cardElement.style["z-index"] = 1
    } else {
        let lastRowCardElement = document.querySelector(`#${lastRowCard.divId}`)
        cardElement.style["z-index"] = parseInt(lastRowCardElement.style["z-index"]) + 1
    }
    if (card.child) {
        updateZIndex(card.child, card)
    }
}