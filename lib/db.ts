import mongoose from "mongoose";

export const connectDB = async function () {
    try {
        await mongoose.connect("mongodb+srv://himanshugarg58063:8107841815%40Heena@cluster0.qnsj6yu.mongodb.net/estate?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // Removed useFindAndModify and useCreateIndex options
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
}
