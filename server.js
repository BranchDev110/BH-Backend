import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import { MOCKUP_DATA } from './mockup.js';

const app = express()
const port = 8000

let data = MOCKUP_DATA;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/orders', async (req, res) => {
  const { page = '' } = req.query
  console.log(data.length);
  if (!page)  {
    res.status(200).json({totalLen: data.length, data: data});
  } else {
    res.status(200).json({totalLen: data.length, data: data.slice(10 * page, 10 * page + 10)});
  }
});

app.post('/orders', async(req, res) => {
  const newData = req.body;
  data = [...data, newData];
  res.status(200).json({totalLen: data.length, data: newData});
})