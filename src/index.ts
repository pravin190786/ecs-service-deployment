import express, { Request, Response } from "express";
import os from "os";
import dns from "dns";

const app = express();

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
    // Get the hostname
    const hostname = os.hostname();

    // Get the primary network interface IP address (IPv4)
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = "Unknown";

    for (const key in networkInterfaces) {
        const net = networkInterfaces[key];
        if (net) {
            for (const iface of net) {
                if (iface.family === "IPv4" && !iface.internal) {
                    ipAddress = iface.address;
                    break;
                }
            }
        }
    }

    res.json({
        status: "UP",
        timestamp: new Date().toISOString(),
        hostname,
        ipAddress,
    });
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