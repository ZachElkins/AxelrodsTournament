import { useEffect, useRef } from 'react';
import Player from "./models/Player";

interface GameResultsProps {
    players: Player[];
}

function GameResults(props: GameResultsProps) {
    const { players } = props;
    const [p1, p2] = players;
    const rounds = p1.history.length;

    const p1HistoryRef = useRef<HTMLDivElement>(null);
    const p2HistoryRef = useRef<HTMLDivElement>(null);

    const animateHistory = () => {
        const p1HistoryDiv = p1HistoryRef.current;
        const p2HistoryDiv = p2HistoryRef.current;

        if (p1HistoryDiv && p2HistoryDiv) {
            const p1Moves = p1HistoryDiv.querySelectorAll('.move');
            const p2Moves = p2HistoryDiv.querySelectorAll('.move');

            p1Moves.forEach((move, idx) => move.style.setProperty('--animation-order', idx.toString()));
            p2Moves.forEach((move, idx) => move.style.setProperty('--animation-order', idx.toString()));
        }
    };

    useEffect(() => {
        animateHistory();
    }, [props]);

    return (
        <div>
            <div className="player-1">
                <h2>{p1.name}: {p1.score}</h2>
            </div>
                <div className="history-container"> 
                    <div key='p1-history' className='history' ref={p1HistoryRef}>
                        {p1.history.map((move, idx) => (
                            <div className='move-container p1-move'>
                                <div className={`move ${move[0] === 'C' ? 'cooperate' : 'defect'}`} key={`p1-move-${idx}`}></div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='round-numbers'>
                        {p1.history.map((move, idx) => (<div className='round-number'>{idx+1}</div>))}
                    </div> */}
                    <div className='history' ref={p2HistoryRef}>
                        {p2.history.map((move, idx) => (
                            <div className='move-container p2-move'>
                                <div className={`move ${move[0] === 'C' ? 'cooperate' : 'defect'}`} key={`p2-move-${idx}`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            <div className="player-2">
                <h2>{p2.name}: {p2.score}</h2>
            </div>
        </div>
    );
}

export default GameResults