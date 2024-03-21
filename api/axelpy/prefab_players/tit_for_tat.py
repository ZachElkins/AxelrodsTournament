from axelpy.player import Player
from axelpy.moves import COOPERATE

class TitForTat(Player):
    """Tit-for-Tat strategy player."""

    def strategy(self, opponent_history):
        """COOPERATE in the first round, then mimic the opponent's last move."""
        return COOPERATE if not opponent_history else opponent_history[-1]

tit_for_tat_player = TitForTat("Tit-for-Tat")
