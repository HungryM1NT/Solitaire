import { update } from "./cardRender.js"

export function setDraggable(card, isMain=false, rowsArray) {
    let pos1, pos2, pos3, pos4
    const element = document.querySelector(`#${card.divId}`)
    element.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e.preventDefault()
        const prevZ = element.style["z-index"]
        element.style["z-index"] = 100 + Number(prevZ)
        pos3 = e.clientX                               // Получаем начальные координаты мышки
        pos4 = e.clientY
        document.onmousemove = elementDrag
        document.onmouseup = closeDragELement.bind(null, prevZ)
    }

    function elementDrag(e) {
        e.preventDefault()
        // console.log(e.clientY, window.innerHeight)

        // const elementHalfWidth = element.offsetWidth / 2                              // Это относительно центра
        // const elementHalfHeight = element.offsetHeight / 2
        // let newElementLeft = element.offsetLeft
        // let newElementTop = element.offsetTop
        // if (e.clientX >= elementHalfWidth && e.clientX <= window.innerWidth - elementHalfWidth) {
        //     pos1 = pos3 - e.clientX
        //     pos3 = e.clientX
        //     newElementLeft = element.offsetLeft - pos1
        // } else {
        //     if (e.clientX < elementHalfWidth) {
        //         newElementLeft = 0
        //     } else {
        //         newElementLeft = window.innerWidth - elementHalfWidth
        //     }
        // }
        // if (e.clientY >= elementHalfHeight && e.clientY <= window.innerHeight - elementHalfHeight) {
        //     pos2 = pos4 - e.clientY
        //     pos4 = e.clientY
        //     newElementTop = element.offsetTop - pos2
        // }

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        const newElementLeft = element.offsetLeft - pos1
        const newElementTop = element.offsetTop - pos2

        if (!isMain || (newElementLeft + element.offsetWidth <= window.innerWidth && newElementLeft >= 0)) {             // Проверка на края видимой области
            element.style.left = newElementLeft / window.innerWidth * 100 + "vw"
        }
        if (!isMain || (newElementTop + element.offsetHeight <= window.innerHeight && newElementTop >= 0)) {
            element.style.top = newElementTop / window.innerHeight * 100 + "vh"
        }
    }

    function closeDragELement(prevZ) {             // При отпускании кнопки восстанавливаем прошлые параметры карты
        element.style["z-index"] = prevZ
        getNewCords(card, element, rowsArray)
        // if (canPlace(card)) {

        // } else {
        //     element.style.left = card.left / window.innerWidth * 100  + "vw"
        //     element.style.top = card.top / window.innerHeight * 100 + "vh"
        // }
        document.onmouseup = null
        document.onmousemove = null
    }
}

export function updateCardCoordinates(card, i) {                                                                 // Функция для выдачи координат
    let cardElement = document.querySelector(`#${card.divId}`)
    card.left = cardElement.offsetLeft
    card.top = cardElement.offsetTop
    card.coordinates = [card.left + cardElement.offsetWidth / 1.6, card.top + cardElement.offsetHeight / 1.6]
    card.row = i
}

function getNewCords(card, element, rowsArray) {
    let isUpdated = false
    for (let i = 0; i < 7; i++) {
        let row = rowsArray[i]
        if (row.length != 0) {
            const lastRowCard = row[row.length - 1]
            if (card != lastRowCard && isClose([element.offsetLeft, element.offsetTop], lastRowCard)) {
                element.style.left = lastRowCard.left / window.innerWidth * 100  + "vw"
                element.style.top = lastRowCard.top / window.innerHeight * 100 + 4 + "vh"      
                rowsArray[card.row].pop()
                row.push(card)  
                updateCardCoordinates(card, i)
                setNewParent(card, lastRowCard)
                isUpdated = true
                update(rowsArray)
                return
            }
        }
    }
    element.style.left = card.left / window.innerWidth * 100  + "vw"
    element.style.top = card.top / window.innerHeight * 100 + "vh"
}

function isClose(elementCords, card2) {                                                              // Проверка на то, близка ли карта 
    const halfWidth = card2.coordinates[0] - card2.left
    const halfHeight = card2.coordinates[1] - card2.top
    const isWidth = Math.abs(elementCords[0] + halfWidth - card2.coordinates[0]) <= halfWidth
    const isHeight = Math.abs(elementCords[1] + halfHeight - card2.coordinates[1]) <= halfHeight
    return isWidth && isHeight
}

function setNewParent(currentCard, newParentCard) {
    const oldParent = currentCard.parent
    const currentCardElement = document.querySelector(`#${currentCard.divId}`)
    const newParentCardElement = document.querySelector(`#${newParentCard.divId}`)
    oldParent.child = null
    currentCard.parent = newParentCard
    newParentCard.child = currentCard
    currentCardElement.style["z-index"] = parseInt(newParentCardElement.style["z-index"]) + 1
}