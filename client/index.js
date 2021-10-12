const dotenv = require('dotenv').config();
const { AkahuClient } = require('akahu');
const express = require('express');

const appToken = process.env.APP_TOKEN;
const userToken = process.env.USER_TOKEN;

const akahu = new AkahuClient({ appToken });

async function transfer({ amount, from, to, }) {
    let completed = {};
    await akahu.accounts.get(userToken, from)
        .then(async (account) => {
            if (account.balance.available >= amount) {
                await akahu.transfers.create(userToken, { amount, from, to, })
                console.log(`Transferred $${amount} to ${account.name}`)
                completed.transferred = true;
                completed.msg = `Transferred $${amount} to ${account.name}`;
            }
            else {
                console.log('Insufficient funds')
                completed.transferred = false;
                completed.msg = `Insufficient funds`;
            }
        })
    return completed;
}

const app = express()

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//var jsonParser = bodyParser.json()

app.get('/api/accounts', async (req, res) => {
    console.log('Getting accounts.')
    const accounts = await akahu.accounts.list(userToken);
    res.send(accounts)
})

app.get('/api/user', async (req, res) => {
    const user = await akahu.users.get(userToken);
    res.send(user)
})

app.get('/api/transfers', async (req, res) => {
    const query = {
        // start: "2021-01-01T00:00:00.000Z",
        // end: "2021-01-02T00:00:00.000Z",
    };

    const transfers = await akahu.transfers.list(userToken, query);
    res.send(transfers)    
})

app.post('/api/transfer', async (req, res) => {
    const data = req.body;
    console.log(data)
    res.send(await transfer(data))
})

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Express server: ${PORT}`)
})
