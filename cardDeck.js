export async function createDeck() {
    const resp = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")                   // Запрос на колоду
    const data = await resp.json()
    const cardResp = await fetch(`https://www.deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)          // Запрос на все карты колоды
    const cardData = await cardResp.json()
    const {cards} = cardData
    const deck = cards.map((card) => {                                                                              // Добавление картам параметров
        card.isActive = false
        card.parent = null
        card.child = null
        card.divId = undefined
        card.coordinates = undefined
        card.left = undefined
        card.top = undefined
        card.row = undefined
        card.isBlankSpot = false
        card.value = newValue(card.value)
        return card
    })
    return deck
}


function newValue(oldValue) {
    if (!isNaN(Number(oldValue))) {
        return Number(oldValue)
    } else {
        switch (oldValue) {
            case "JACK":
                return 11
            case "QUEEN":
                return 12
            case "KING":
                return 13
            case "ACE":
                return 1
        }
    }
}