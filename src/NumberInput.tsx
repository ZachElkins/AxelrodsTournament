import { useEffect, useState } from 'react';

interface NumberInputProps {
    className?: string;
    defaultValue?: number;
    maxValue?: number;
    minValue?: number;
    onChange?: (value: number) => void;
}

const NumberInput = (props: NumberInputProps) => {

   const { className, defaultValue, maxValue, minValue, onChange } = props;

    const [value, setValue] = useState<number>(defaultValue || 0);

    useEffect(() => {
        if (onChange) onChange(value);
    }, [onChange, value]);

    const updateValue = (value: number) => {
        value = maxValue ? Math.min(maxValue, value) : value;
        value = minValue ? Math.max(minValue, value) : value;
        setValue(value);
    };

    const handleInput = (value: string) => {
        const parsedNumber =  parseInt(value);
        if (isNaN(parsedNumber)) return;
        updateValue(parsedNumber);
    };
    
    return (
        <input type="number" className={className} onChange={({target}) => handleInput(target.value)} value={value}/>
    );
}

export default NumberInput;