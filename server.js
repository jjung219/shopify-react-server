require('dotenv').config()

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors())
app.get('/api/orders', (req, res) => {
  axios.get('https://c2451952ff6116701c3a4fd323fb3c93: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@jj-store-123.myshopify.com/admin/api/2021-07/orders.json')
    .then(response => {
      // console.log("response: ", response.data)
      res.json(response.data);
    })

});
//https://c2451952ff6116701c3a4fd323fb3c93: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@jj-store-123.myshopify.com/admin/api/2021-07/orders.json
const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));