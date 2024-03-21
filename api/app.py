from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from random import randint
import importlib
import sys
from axelpy.player import Player
from axelpy.exceptions import CodeException, TypeException
from axelpy.tournament import Tournamnet
from axelpy.prefab_players.player_factory import PLAYERS
import uuid

app = Flask(__name__)
# CORS(app)

def extractPlayerClass(code, name):
    module_name = 'player_input_module'
    module = importlib.import_module('__main__')
    sys.modules[module_name] = module
    
    exec(code, module.__dict__)
    custom_class = module.__dict__.get('CustomPlayer', None)

    if not custom_class:
        raise CodeException(f'Could not parse provided code:\n${code}')
    
    if not issubclass(custom_class, Player):
        raise TypeException(f'${custom_class.__name__} is a valid subclass of Player')
    
    custom_player = custom_class(name)
    return custom_player


def play(player, opponent=None):
    if opponent is None:
        opponent = PLAYERS['Random']()
    return Tournamnet.run(player, opponent)


@app.route('/play', methods=['POST'])
@cross_origin(origin='*')
def play_request():
    request_json = request.json
    code, name, opponent = request_json['code'], request_json['name'], request_json['opponent']
    
    try:
        custom_player = extractPlayerClass(code, name)
        return jsonify({
            'results': play(custom_player, PLAYERS[opponent]()),
            'run_id': uuid.uuid4()
        }), 200
    except Exception as e:
        print("Caught Exception: ", e)
        return jsonify({'message': e.message}), 403



@app.route('/opponents', methods=['GET'])
@cross_origin(origin='*')
def get_opponents():
    return jsonify(list(PLAYERS.keys())), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)
