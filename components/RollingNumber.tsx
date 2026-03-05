import React, { useEffect, useState } from 'react';

interface RollingNumberProps {
    value: number;
    className?: string;
}

const RollingDigit: React.FC<{ digit: string }> = ({ digit }) => {
    const [prevDigit, setPrevDigit] = useState(digit);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (digit !== prevDigit) {
            setAnimate(true);
            const timer = setTimeout(() => {
                setPrevDigit(digit);
                setAnimate(false);
            }, 500); // Duration matches CSS transition
            return () => clearTimeout(timer);
        }
    }, [digit, prevDigit]);

    return (
        <span className="inline-flex flex-col h-full overflow-hidden relative w-[1ch]">
            <span
                className={`transition-transform duration-500 ease-in-out ${animate ? '-translate-y-full' : 'translate-y-0'
                    }`}
            >
                <span className="block">{prevDigit}</span>
                {animate && <span className="block">{digit}</span>}
            </span>
        </span>
    );
};

const RollingNumber: React.FC<RollingNumberProps> = ({ value, className = '' }) => {
    const digits = value.toString().split('');

    return (
        <span className={`inline-flex overflow-hidden leading-none ${className}`}>
            {digits.map((digit, i) => (
                <RollingDigit key={`${digits.length - i}-${i}`} digit={digit} />
            ))}
        </span>
    );
};

export default RollingNumber;
