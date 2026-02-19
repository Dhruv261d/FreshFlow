const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// 1. ADD THIS LINE - Import your auth routes!
const authRoutes = require('./src/routes/authRoutes'); 
const protectedRoutes = require('./src/routes/protectedRoutes'); 

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// 2. REGISTER THE AUTH ROUTES
app.use('/api/auth', authRoutes); 
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => {
    res.send('FreshFlow Backend is Running...');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;

// 3. CLEAN UP START LOGIC
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Only start the 'server' (which includes app + socket.io)
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));