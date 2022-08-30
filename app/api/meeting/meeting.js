'use strict';

const fetch = require('node-fetch');

const API_KEY = 'mirotalksfu_default_secret';
const MIROTALK_URL = 'https://sfu.mirotalk.com/api/v1/meeting';
// const MIROTALK_URL = 'http://localhost:3010/api/v1/join';

function getResponse() {
    return fetch(MIROTALK_URL, {
        method: 'POST',
        headers: {
            authorization: API_KEY,
            'Content-Type': 'application/json',
        },
    });
}

getResponse().then(async (res) => {
    console.log('Status code:', res.status);
    const data = await res.json();
    console.log('meeting:', data.meeting);
});
