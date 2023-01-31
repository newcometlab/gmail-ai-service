require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/translate', (req, res) => {
    const lang = req.body.lang;
    if (lang === undefined || lang === '') {
        res.send('LANGUAGE_UNDEFINED')
        res.end();
        return;
    }
    const text = req.body.text;
    if (text === undefined || text === '') {
        res.send('TEXT_UNDEFINED')
        res.end();
        return;
    }
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate this into ${lang}:\n\n${text}`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }).then(response => {
        if (response.status === 200) {
            res.send(String(response.data.choices[0].text).trim())
        } else {
            res.send('ERROR')
        }
        res.end();
    }).catch(error => {
        console.log(error);
        res.send('ERROR')
        res.end();
    }).finally(() => {
        res.end();
    })
})

app.post('/correct', (req, res) => {
    const text = req.body.text;
    if (text === undefined || text === '') {
        res.send('TEXT_UNDEFINED')
        res.end();
        return;
    }
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Correct this to standard in the original language:\n\n${text}`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }).then(response => {
        if (response.status === 200) {
            res.send(String(response.data.choices[0].text).trim())
        } else {
            res.send('ERROR')
        }
        res.end();
    }).catch(error => {
        console.log(error);
        res.send('ERROR')
        res.end();
    }).finally(() => {
        res.end();
    })
})

app.post('/summarize', (req, res) => {
    const text = req.body.text;
    if (text === undefined || text === '') {
        res.send('TEXT_UNDEFINED')
        res.end();
        return;
    }
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Rewrite this more professionally:\n\n${text}`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    }).then(response => {
        if (response.status === 200) {
            res.send(String(response.data.choices[0].text).trim())
        } else {
            res.send('ERROR')
        }
        res.end();
    }).catch(error => {
        console.log(error);
        res.send('ERROR')
        res.end();
    }).finally(() => {
        res.end();
    })
})

app.listen(PORT, console.log(
    `Server started on port ${PORT}`)
);