export function createBlankSpots() {                           // Создание 7 пустых мест на основном столе
    const mainTable = document.querySelector("#main-table")
    for (let i = 0; i < 7; i++) {
        mainTable.insertAdjacentHTML('beforeend',
        `<div
        class='blank-spot'
        id='blank-spot${i}'
        style = 'top: 2vh; z-index:0; left:${9 * i + 3}vw'
        >
        <img src='./blankSpot.png' draggable='false'>
        </div>`)
    }
}