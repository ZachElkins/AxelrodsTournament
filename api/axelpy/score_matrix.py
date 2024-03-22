from axelpy.moves import COOPERATE as C, DEFECT as D

def score_matrix_factory(cc=(3, 3), dd=(1, 1), cd=(5, 0)):
    return {
        "CC": cc,
        "DD": dd,
        "CD": cd,
        "DC": tuple(reversed(cd))
    }

DEFAULT_SCORE_MATRIX = score_matrix_factory()