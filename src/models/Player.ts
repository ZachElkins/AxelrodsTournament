export interface Move {
    move: string,
    score: number
}

export default interface Player {
    name: string;
    score: number;
    history: Move[]
}

//  Consider bringng back the game interface with two version. One just has preferences (i.e. rounds, visibility, etc) (pre-game)
// other has that and players (post game) will need to change backend as well to support
// an alternative that can be used in the above solution is a game settings interface