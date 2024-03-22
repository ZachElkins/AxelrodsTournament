from axelpy.moves import COOPERATE, DEFECT
from axelpy.score_matrix import DEFAULT_SCORE_MATRIX
from collections import namedtuple

Move = namedtuple("Move", "move score")
Round = namedtuple("Round", "player1_move, player2_move")

class Tournamnet:

    def run(p1, p2, rounds=100, score_matrix=DEFAULT_SCORE_MATRIX):
        print("HERE")
        history = {p1.name: [], p2.name: []}
        score_board = {p1.name: 0, p2.name: 0}

        for _ in range(rounds):
            round_result = Tournamnet.round(p1, p2, score_matrix=score_matrix)
            p1_move, p2_move = round_result
            score_board[p1.name] += p1_move.score
            score_board[p2.name] += p2_move.score
            history[p1.name] += [p1_move]
            history[p2.name] += [p2_move]

        return [
            {
                'name': p1.name,
                'score': score_board[p1.name],
                'history': history[p1.name]
            },
            {
                'name': p2.name,
                'score': score_board[p2.name],
                'history': history[p2.name]
            },
        ]

    def round(p1, p2, score_matrix):
        p1_move = p1.strategy(p2.history)
        p2_move = p2.strategy(p1.history)
        p1.history.append(p1_move)
        p2.history.append(p2_move)

        p1_score, p2_score = score_matrix[f'{p1_move}{p2_move}']
        return Round(Move(p1_move, p1_score), Move(p2_move, p2_score))
