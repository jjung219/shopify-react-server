require('dotenv').config()

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const url = `https://${process.env.API_KEY}:${process.env.PASSWORD}@${process.env.SHOP}.myshopify.com`;

app.use(cors())
app.get('/api/orders', (req, res) => {
  axios.get(url + "/admin/api/2021-07/orders.json?status=any")
    .then(response => {
      // console.log("response: ", response.data)
      res.json(response.data);
    })

});

app.post('/api/fulfillOrder', (req, res) => {
  const orderId = req.body.orderId;
  axios.put(url + `/admin/api/2021-07/orders/${orderId}.json`)
    .then(res => {
      res.json("fulfilled!!")
    })
})

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));