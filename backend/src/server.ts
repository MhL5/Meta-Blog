import express from "express";

const app = express();

app.listen(3000);

let views = 0;
let viewers: string[] = [];

app.get("/", async (req, res, next) => {
  console.log(req.ip);
  if (req.ip) {
    const exist = viewers.find((ip) => ip === req.ip);
    console.log(exist);
    if (!exist) {
      views++;
      viewers.push(req.ip);
    }
    console.log(views);
  }
  res.send("yo");
});
