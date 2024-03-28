import { createDeck } from './cardDeck.js'
import { createBlankSpots, startSetArray } from './blankSpots.js'
import { startRowCreator, update } from './cardRender.js'

async function start() {
    createBlankSpots()
    // const finishSpotsArray = initFinishSpots()
    const gameArray = startSetArray()
    const deck = await createDeck()
    startRowCreator(deck, gameArray)
    update(gameArray)
    console.log(gameArray)

}
start()
