import { useEffect, useState } from 'react'
import Player from './models/Player';
import GameResults from './GameResults';
import './index.css'
import GameSettings from './GameSettings';
import OpponentSelector from './OpponentSelector';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const deserialize = (json: string): Player[] => JSON.parse(json) as Player[];

function App() {
  const [name, setName] = useState('Custom Player')
  const [customPlayer, setCustomPlayer] = useState("\
from axelpy.player import Player\n\
from axelpy.moves import COOPERATE, DEFECT\n\n\
class CustomPlayer(Player):\n\
\tdef strategy(self, opponent_history):\n\
\t\treturn COOPERATE if not opponent_history else opponent_history[-1]")

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
        <AceEditor 
          height='15em'
          width='50em'
          mode="python"
          theme="github"
          onChange={setCustomPlayer}
          value={customPlayer}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true
          }}
          className='editor'
        />
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
