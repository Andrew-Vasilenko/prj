import express from 'express';
import fs from 'fs';
import ngrok from 'ngrok';

const app = express();

const PORT = 80;
const url = `http://gid100.kubsau.ru`;

app.get("/play*", (req, res) => {
  let lang = req.headers["accept-language"]?.slice(0,2) || "en";
  const pictureName = req.query.pictureName;
  const recordUrl = `${url}/getRecord/?pictureName=${pictureName}&lang=${lang}`;
  const pictureUrl = `${url}/getPicture/?pictureName=${pictureName}`;
  fs.readFile("./template.html", (err, data) => {
    const template = data.toString().replace("{{ pictureName }}", pictureName).replace("{{ url }}", url).replace("{{ imgSrc }}", pictureUrl);
    res.send(template.replace("{{ recSrc }}", recordUrl));
  });
});

app.get("/getRecord*", (req, res) => {
  const lang = req.query.lang;
  const pictureName = req.query.pictureName;
  const filePath = `./records/${lang}/${pictureName}.mp3`;
  res.sendFile(filePath, {root: "./"});
});

app.get("/getPicture*", (req, res) => {
  const pictureName = req.query.pictureName;
  const filePath = `./pictures/${pictureName}.jpg`;
  res.sendFile(filePath, {root: "./"});
});

app.listen(PORT, () => {
  console.log(`Express server running at ${url}`);
});
