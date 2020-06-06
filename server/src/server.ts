import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('aaaaa')
    res.json([
        'Evelyn',
        'Luciano',
        'Werner',
        'Jubileu'
    ]);
})


app.listen(3333);