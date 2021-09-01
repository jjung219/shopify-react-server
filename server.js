require('dotenv').config()

const express = require('express');
const cors = require('cors');
const axios = require('axios');
var bodyParser = require('body-parser')
const app = express();

const url = `https://${process.env.API_KEY}:${process.env.PASSWORD}@${process.env.SHOP}.myshopify.com`;

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json());
app.get('/api/orders', (req, res) => {
  axios.get(url + "/admin/api/2021-07/orders.json?status=any")
    .then(response => {
      // console.log("response: ", response.data)
      res.json(response.data);
    })

});

app.post('/api/fulfillOrder', (req, res) => {
  console.log(req.body)
  const { orderId, locationId } = req.body
  axios.post(url + `/admin/api/2021-07/orders/${orderId}/fulfillments.json`, {
    "fulfillment": {
      "location_id": locationId,
      "tracking_number": "123456789",
      "tracking_urls": [
        "https://shipping.xyz/track.php?num=123456789",
        "https://anothershipper.corp/track.php?code=abc"
      ],
      "notify_customer": false
    }
  })
    .then(response => {
      axios.get(url + "/admin/api/2021-07/orders.json?status=any")
      .then(response => {
        // console.log("response: ", response.data)
        res.json(response.data);
      })
    })
    .catch(e => console.log(e))
})

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));