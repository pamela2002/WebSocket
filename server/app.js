import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// app.get('/', (req, res) => {
//     res.send("Hello World!")
// });
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    // socket.emit("welcome", `Welcome to the server`);
    // socket.broadcast.emit("welcome",`${socket.id} has joined the server`);
    socket.on("message", ({message,room}) => {
        console.log(message, room);
        io.to(room).emit("receive-message", message);
    })
    socket.on("disconnect", () => {
        console.log(`User disconnected ${socket.id}`);
    })
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})