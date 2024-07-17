// models/StockData.ts
import mongoose from 'mongoose';

const StockDataSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now
    }
});

const StockData = mongoose.models.StockData || mongoose.model('StockData', StockDataSchema);

export default StockData;
