import express, { Request, Response } from "express";

const app = express();

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "UP", timestamp: new Date().toISOString() });
});

// Get Info endpoint
app.get("/getInfo", (req: Request, res: Response) => {
    res.json({
        appName: "Vehicle Management API",
        version: "1.0.0",
        description: "A sample Node.js app with health check and info endpoints",
    });
});


// Start the server
const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});