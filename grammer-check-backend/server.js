// configure dotenv
require('dotenv').config();
// import modules from OpenAI library And Configure OpenAI API
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// For Socket configuration
const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const cors = require('cors');

app.use(cors());

const socketIO = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`user with ID: ${socket.id} just joined Room ${data}!`);
    });

    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Add POST Request For Grammer Check

app.use(express.json());
app.post('/check-grammer', async (req, res) => {
    // getting prompt question from request
    const prompt = req.body.prompt;

    try {/*  */
        if (prompt == null) {
            throw new Error('Uh oh, no prompt was provided');
        }
        // trigger OpenAI completion
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Correct this to standard English:\n\n${prompt}.`,
            temperature: 0,
            max_tokens: 30,
        });
        // retrieve the completion text from response
        const completionResult = response.choices[0].text;

        // return the result
        return res.status(200).json({
            success: true,
            message: completionResult,
        });
    } catch (error) {
        console.log(error.message);
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
