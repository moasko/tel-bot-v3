const express = require("express");
const app = express();
const port = process.env.PORT || 4040;
const { handler } = require("./controller");
const { handleUpdate } = require("./controller/lib/Telegam");


app.use(express.json());

app.get("*", async(req, res) => {
    console.log(req.body);
  res.send(await handler(req));
});

app.post('/webhook', async (req, res) => {
    try {
      await handleUpdate(req.body);
      res.sendStatus(200);
    } catch (error) {
      console.error('Failed to handle update:', error);
      res.sendStatus(500);
    }
  });

app.post("*", async(req, res) => {
    console.log(req.body);
  res.send(await handler(req));
});

app.listen(port, async(err) => {
  if (err) throw err;
  console.log(`Example app listening at http://localhost:${port}`);
});

