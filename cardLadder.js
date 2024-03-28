export function mainTableLadder(card1, card2) {
    if ((isBlack(card1) ^ isBlack(card2) || card2.suit === "any")) {
        return card1.value + 1 === card2.value
    }
    return false
}

export function finishSpotsLadder(card1, card2) {
    if (card2.suit === "any" || card1.suit == card2.suit) {
        return card1.value - 1 === card2.value
    }
    return false
}

function isBlack(card) {
    return card.suit === "CLUBS" || card.suit === "SPADES"
}

