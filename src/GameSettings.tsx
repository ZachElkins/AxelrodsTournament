import { useState } from "react";
import NumberInput from "./NumberInput";

const GameSettings = () => {

    const [rounds, setRounds] = useState(100);

    return (
        <div className='settings'>
            <h3>Settings</h3>
            <div className='coming-soon'>
                <div className='overlay'></div>
                <b>Coming Soon</b><br/>
                <label>Rounds: </label>
                <NumberInput
                    minValue={1}
                    maxValue={1000}
                    defaultValue={rounds}
                    onChange={setRounds}
                />
                <br />
                <label>Game length visibility: </label>
                <input type="checkbox" disabled/>
                
                <div className='score-matrix'>
                    <label>C-C: </label>
                        <NumberInput defaultValue={3} className='score-input'/>/
                        <NumberInput defaultValue={3} className='score-input'/>
                    <br/>
                    <label>D-D: </label>
                        <NumberInput defaultValue={1} className='score-input'/>/
                        <NumberInput defaultValue={1} className='score-input'/>
                    <br/>
                    <label>C-D: </label>
                        <NumberInput defaultValue={1} className='score-input'/>/
                        <NumberInput defaultValue={5} className='score-input'/>
                </div>
            </div>
        </div>
    );
}

export default GameSettings;