import { useEffect, useState } from 'react'
import Player from './models/Player';
import GameResults from './GameResults';
import './index.css'
import GameSettings from './GameSettings';
import OpponentSelector from './OpponentSelector';

const deserialize = (json: string): Player[] => JSON.parse(json) as Player[];

function App() {
  const [name, setName] = useState('Custom Player')
  const [customPlayer, setCustomPlayer] = useState("\
from axelpy.player import Player\n\
from axelpy.moves import COOPERATE, DEFECT\n\n\
class CustomPlayer(Player):\n\
  def strategy(self, opponent_history):\n\
    return COOPERATE if not opponent_history else opponent_history[-1]")

  const [res, setRes] = useState<string>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [opponent, setOpponent] = useState('');
  const [runId, setRunId] = useState('0');

  const run = () => {
    fetch('http://localhost:8080/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        code: customPlayer,
        opponent: opponent
      })
    })
    .then(res => res.json())
    .then(data => {
      setRes(JSON.stringify(data.results));
      setRunId(JSON.stringify(data.run_id));
    });
  }

  useEffect(() => {
    if (!res) return;
    setPlayers(deserialize(res));
  }, [res]);

  return (
    <div>
      <div>
        <input type='text' value={name} onChange={({target}) => setName(target.value)}></input>
        <br/>
        <textarea value={customPlayer} rows='8' cols='75' onChange={({target}) => setCustomPlayer(target.value)}></textarea>
        <GameSettings />
        <OpponentSelector onChange={setOpponent}/>
        <input type='submit' value='Submit' onClick={run}></input>
      </div>
      { players.length > 1 && <div>
        <GameResults key={runId} players={players}/>
      </div> }
    </div>
  )
}

export default App;
