import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

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

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
    res.json({ status: `Server is running on http://localhost:${PORT}`});
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
