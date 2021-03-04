const speech = require('@google-cloud/speech');
const {Buffer} = require('buffer');
const express = require('express');
const ws = require('express-ws');
const path = require('path');

const app = express();

const client = new speech.SpeechClient({
    projectId: 'jacobtest-161907',
    keyFilename: path.resolve(__dirname, 'jacobtest-161907-8dcc0d183d11.json')
});

ws(app);

const config = {
    encoding: 'MP3',
    audioChannelCount: 2,
    languageCode: 'en-US',
    sampleRateHertz: '48000',
};

let buffer = Buffer.alloc(0);

app.use(express.static(path.resolve(__dirname, './dist')));

let sending = false;

app.ws('/speech', (ws, req, res, next) => {
    console.log('Received speech');

    ws.on('message', async (msg) => {
        buffer = Buffer.concat([buffer, msg]);
        const content = new Uint8Array(buffer.buffer);

        if (!sending) {
            sending = true;

            const result = await client.recognize({config, audio: {content}});
            console.log(buffer.length, result);

            return;
        }
    });
});

app.listen(8080, () => console.log('Listening on 8080'));