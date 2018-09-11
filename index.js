const express = require('express');
const path = require('path');
const config = require('./config.js');
const services = require('./src/services.js');

const app = express();

app.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>Log In</h1>
        <table>
            ${Object.keys(services).map(service=>`
            <tr>
                <td><a href="/login/${service}">${services[service].prompt}</a></td>
            </tr>
            `).join('')}
        </table>
    </body>
</html>
`));


app.get('/login/:provider', (req, res) => {
    let service = services[req.params.provider];
    if(!req.params.provider || !service) return res.status(404);
    let callback_url = `${req.protocol}://${req.get('host')}/callback/${req.params.provider}`;
    Promise.resolve(service.login_url(callback_url))
        .then(url => res.redirect(url));
});

app.get('/callback/:provider', (req, res) => {
    let service = services[req.params.provider];
    if(!req.params.provider || !service) return res.status(404);
    Promise.resolve(service.get_token(req))
        .then(token_data => {
            res.send(`<pre>${JSON.stringify(token_data,null,4)}</pre>`)
        } );
});

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))
