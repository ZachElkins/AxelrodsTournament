from axelpy.player import Player
from axelpy.moves import COOPERATE, DEFECT
from random import choice

class Rand(Player):
    """Random strategy player."""

    def strategy(self, opponent_history):
        """Make a random move each round."""
        return choice([COOPERATE, DEFECT])
