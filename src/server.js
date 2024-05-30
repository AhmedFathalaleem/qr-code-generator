const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image');
const cors = require('cors');
const app = express();
const port = 3001;


app.use(cors());
app.use(bodyParser.json());


app.post("/generate", (req, res) => {
    const url = req.body.url;
    
    if(!url){
        return res.status(400).send('URL is required');
    }

    const qr_svg = qr.image(url, {type: 'png'});
    res.type('png');
    qr_svg.pipe(res);
})

app.listen(port, () =>{
    console.log(`Server running at port ${port}`);
})