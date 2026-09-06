import "dotenv/config";
import { app, server } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();