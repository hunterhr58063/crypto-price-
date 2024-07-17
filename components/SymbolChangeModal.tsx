import React, { useState, useEffect, useRef, MouseEvent } from 'react';

interface SymbolChangeModalProps {
    onSubmit: (symbol: string) => void;
}

const SymbolChangeModal: React.FC<SymbolChangeModalProps> = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [symbol, setSymbol] = useState('BTC'); // Default symbol
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit(symbol);
        setIsOpen(false); // Close modal after submitting
    };

    return (
        <div className="rounded-lg shadow-lg p-6 w-full  flex flex-col items-center">
            <button
                className="mx-auto bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                onClick={() => setIsOpen(true)}
            >
                Change Cryptocurrency
            </button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Select Cryptocurrency</h2>
                        <div className="flex items-center justify-center mb-4">
                            <select
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                {['BTC', 'ETH', 'USDT', 'BNB', 'SOL'].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Change Cryptocurrency
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SymbolChangeModal;
