import { createDeck } from './cardDeck.js'
import { createBlankSpots, startSetArray } from './blankSpots.js'
import { startRowCreator, update } from './cardRender.js'
import { setStartDeck } from './inGameDeck.js'

async function start() {
    createBlankSpots()

    const gameArray = startSetArray()
    const deck = await createDeck()
    const openDeck = []

    startRowCreator(deck, gameArray)

    setStartDeck(deck, gameArray, openDeck)

    update(gameArray, openDeck)

}
start()
