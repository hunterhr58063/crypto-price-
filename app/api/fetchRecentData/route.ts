import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/lib/db';
import StockData from '@/models/StockData'; // Ensure correct path

export const GET = async (req: Request, res: Response) => {
    try {
        const url = new URL(req.url);
        const symbol = url.searchParams.get('symbol');
        if (!symbol) {
            return new Response(JSON.stringify({ error: 'Symbol is required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        await connectDB(); // Ensure connectDB works as expected

        // Query MongoDB for recent stock data for the specified symbol
        const recentData = await StockData
            .find({ symbol })
            .sort({ datetime: -1 }) // Sort by datetime in descending order
            .limit(20); // Limit to 20 entries

        // Send the retrieved data as a JSON response with HTTP status 200 (OK)
        return new Response(JSON.stringify(recentData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Handle any errors that occur during data retrieval
        console.error('Error fetching recent data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching recent data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
