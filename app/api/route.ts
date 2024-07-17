import mongoose from 'mongoose';
import fetch from 'node-fetch';
import {connectDB} from '@/lib/db';
import StockData from '../../models/StockData'; // Adjust path as per your file structure

const LIVECOINWATCH_API_KEY = 'e984f373-fb7e-40bb-937e-8eb49426ef6d';
const LIVECOINWATCH_API_URL = 'https://api.livecoinwatch.com/coins/single';
const cryptos = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'];

const fetchDataAndSave = async () => {
    await connectDB();
    try {
        for (const crypto of cryptos) {
            console.log(`Fetching data for ${crypto}`);

            const response = await fetch(LIVECOINWATCH_API_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "x-api-key": LIVECOINWATCH_API_KEY,
                },
                body: JSON.stringify({
                    currency: "USD",
                    code: crypto,
                    meta: false,
                }),
            });

            const cryptoData = await response.json();
            console.log(`Data for ${crypto}:`, cryptoData);

            const record = {
                symbol: crypto,
                rate: cryptoData.rate,
                datetime: new Date(),
            };

            // Save to MongoDB
            await StockData.create(record);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Initial fetch and save
fetchDataAndSave();

// Schedule fetchDataAndSave to run every 10 seconds
const interval = setInterval(fetchDataAndSave, 10 * 1000);

// Ensure interval is cleared on server shutdown
process.on('SIGINT', () => {
    clearInterval(interval);
    mongoose.connection.close();
    process.exit();
});
export default async function handler(req, res) {
    res.status(200).json({ message: 'Polling data started' });
}
