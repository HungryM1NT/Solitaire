export function setDraggable(card, isMain=false) {
    let pos1, pos2, pos3, pos4
    const element = document.querySelector(`#${card.divId}`)
    const prevZ = element.style["z-index"]
    element.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e.preventDefault()
        element.style["z-index"] = 100 + Number(prevZ)
        pos3 = e.clientX                               // Получаем начальные координаты мышки
        pos4 = e.clientY
        const prevX = element.offsetLeft
        const prevY = element.offsetTop
        element.isDragged = true
        document.onmousemove = elementDrag
        document.onmouseup = closeDragELement.bind(null, prevX, prevY)
    }

    function elementDrag(e) {
        e.preventDefault()
        console.log(e.clientY, window.innerHeight)

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

    function closeDragELement(prevX, prevY) {             // При отпускании кнопки восстанавливаем прошлые параметры карты
        element.style["z-index"] = prevZ
        if (canPlace(card)) {

        } else {
            element.style.left = prevX / window.innerWidth * 100  + "vw"
            element.style.top = prevY / window.innerHeight * 100 + "vh"
        }
        document.onmouseup = null
        document.onmousemove = null
    }
}

function canPlace() {
    return false
}