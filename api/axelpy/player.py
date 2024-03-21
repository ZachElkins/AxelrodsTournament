class Player:
    """Base class for player."""

    def __init__(self, name):
        self.name = name
        self.history = []
    
    def strategy(self, opponent_history):
        """
        Implement the strategy for the player.
        
        Args:
            opponent_history (list): A list of the opponent's previous moves.
        
        Returns:
            str: The player's move (either COOPERATE or DEFECT).
        """
        raise NotImplementedError
