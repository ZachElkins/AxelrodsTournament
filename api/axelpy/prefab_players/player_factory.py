from enum import Enum
from axelpy.prefab_players.tit_for_tat import TitForTat
from axelpy.prefab_players.rand import Rand


PLAYERS = {
    'Tit for Tat': lambda : TitForTat("Tit for Tat"),
    'Random': lambda : Rand("Random")
}
