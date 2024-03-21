import { useEffect, useState } from 'react';

interface OpponentSelectorProps {
    onChange: (name: string) => void
}

const OpponentSelector = (props: OpponentSelectorProps) => {
    const { onChange } = props;

    const [opponents, setOpponents] = useState([]);
    const [selectedOpponent, setSelectedOpponent] = useState('');

    const getOpponents = () => {
        fetch('http://localhost:8080/opponents')
        .then(res => res.json())
        .then(data => {
            setOpponents(data)
        });
    }

    useEffect(() => {
        getOpponents();
    }, []);

    useEffect(() => {
        setSelectedOpponent(opponents[0]);
        onChange(opponents[0]);
    }, [opponents]);

    const handleRadioSelection = (newOpponent: string) => {
        setSelectedOpponent(newOpponent);
        onChange(newOpponent);
    }

    return (
        <div>
            {opponents.map(opponent => (
                <div>
                    <input
                        type='radio'
                        name='opponent-select-radio'
                        value={opponent}
                        onChange={({currentTarget}) => handleRadioSelection(currentTarget.value)}
                        checked={opponent === selectedOpponent}/>
                    {opponent}
                </div>
            ))}
        </div>
    );
};

export default OpponentSelector;