import toWav from 'audiobuffer-to-wav';

console.dir(toWav);

const [prompter, rate, h1] = document.querySelectorAll('div');

const init = async () => {
    try {
        // const stream = await navigator.mediaDevices.getUserMedia({audio: true});

        const expected = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?” So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her. There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`;

        prompter.textContent = expected;

        const symbols = ',.-"()?!';
        const uniqueWords = expected
            .split(' ')
            .map(w => w.toLowerCase())
            .map(w => w.split('').filter(c => !symbols.includes(c)).join(''))
            .reduce((a, v) => {
                if (!a.includes(v)) a.push(v);

                return a;
            }, [])
            .filter(w => w.length >= 5);
        console.log(uniqueWords);

        const speech = new webkitSpeechRecognition();
        speech.continuous = true;
        speech.interimResults = true;
        let keyword;
        // let rate = 0;
        let firstResult = null;
        speech.onerror = e => console.error(e);
        speech.onresult = ({results}) => {
            if (!firstResult) firstResult = Date.now() / 1000;
            // console.log(results);
            const res = [...results];
            const result = res.reduce((a, v) => {
                a.push(v[0].transcript);

                return a;
            }, []).join(' ');

            h1.textContent = result;

            const words = expected.split(' ');

            const now = Date.now() / 1000;

            // const {length} = result.split(' ');

            let index = 0;
            if (keyword) index = uniqueWords.findIndex(w => w === keyword);
            const key = uniqueWords.slice(index).reduce((a, kword) => {
                if (a) return a;
                if (res[res.length - 1][0].transcript.includes(kword)) {
                    return kword;
                };

                return a;
            }, null);

            if (key) keyword = key;

            console.log({keyword});

            let length = 0;
            let ahead = 0;

            if (keyword) {
                length = words.findIndex(word => word.toLowerCase().includes(keyword)) + 1;

                const transwords = res[res.length - 1][0].transcript.split(' ');
                ahead = (transwords.length - transwords.findIndex(word => word.toLowerCase().includes(keyword))) - 1;

                if (ahead < 0) ahead = 0;
            }

            console.log({length, ahead});

            prompter.innerHTML = `<s>${words.slice(0, length).join(' ')}</s> <em>${ahead ? words.slice(length, length + ahead).join(' ') : ''}</em> ${words.slice(length + ahead).join(' ')}`;
        };
        speech.start();
        // const ws = new WebSocket('ws://127.0.0.1:8080/speech');
        // ws.onopen = async () => {
        //     console.log('Socket open');

            // ws.send();
            // const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            // const [track] = await stream.getAudioTracks();
            // const settings = track.getSettings();
            // console.log({settings});

            // const audio = new AudioContext();
            // const micsource = audio.createMediaStreamSource(stream);
            // const processor = audio.createScriptProcessor(1024, 1, 1);
            // const dest = audio.createMediaStreamDestination();

            // micsource.connect(processor);
            // processor.connect(dest);
            // dest.onaudioprocess = ({outputBuffer}) => {
            //     const data = new Blob([outputBuffer.getChannelData(0)], {type: 'audio/wav'});
            //     // const wav = toWav(outputBuffer);

            //     console.log(new Uint8Array(outputBuffer.getChannelData(0).buffer));

            //     ws.send(data);
            // }

            // const recorder = new MediaRecorder(stream, {mimeType: 'audio/webm\;codecs=opus'});
            // recorder.ondataavailable = ({data}) => {
            //     ws.send(data);
            //     console.log(data);
            // }
            // recorder.onstart = () => console.log('Started');
            // recorder.start();
            // setTimeout(() => recorder.stop(), 5000);
        // };
    } catch (ex) {
        console.error(ex);
    }
};

document.querySelector('button').onclick = () => init();