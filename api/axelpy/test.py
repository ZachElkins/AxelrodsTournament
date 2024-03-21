from prefab_players.rand import Rand
from prefab_players.tit_for_tat import TitForTat
from tournament import Tournamnet

if __name__ == "__main__":
    t = Tournamnet()
    scores = t.run(Rand("random"), TitForTat("tit-for-tat"))
    print(scores)
