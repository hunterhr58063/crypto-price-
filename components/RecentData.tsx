import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';// Assuming this is where your RootState is defined
import { setRecentData } from '@/store/features/recentData/recentDataSlice';
import axios from 'axios';

interface RecentDataProps {
    symbol: string;
}

const RecentData: React.FC<RecentDataProps> = ({ symbol }) => {
    const dispatch = useDispatch();
    const recentData = useSelector((state: RootState) => state.recentData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/fetchRecentData', {
                    params: { symbol },
                });
                dispatch(setRecentData(response.data));
            } catch (error) {
                console.error('Error fetching recent data:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, [dispatch, symbol]);

    return (
        <div className="w-full mx-auto mt-4">
            <div className="overflow-x-auto h-[600px]">
                <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {recentData.map((entry: any) => (
                            <tr key={entry._id} className="transition-all hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{entry.symbol}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${entry.rate.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.datetime).toLocaleTimeString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.datetime).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentData;
