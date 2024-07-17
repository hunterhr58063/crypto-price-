"use client"
import { useEffect, useState } from 'react';
import RecentData from '@/components/RecentData';
import SymbolChangeModal from '@/components/SymbolChangeModal';
import axios from 'axios';

const IndexPage: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('BTC'); // Default symbol

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('/api');
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);
  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div className='items-center justify-center w-full'>
      <SymbolChangeModal onSubmit={handleSymbolChange} />
      <RecentData symbol={symbol} />
    </div>
  );
};

export default IndexPage;
