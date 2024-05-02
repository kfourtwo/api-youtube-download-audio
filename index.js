const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");

function sanitizeFileName(fileName) {
  const invalidChars = /[\\/:"*?<>|'’‘]/g;
  return fileName.replace(invalidChars, " ");
}

app.get("/download-audio", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send("URL không hợp lệ");
  }
  const videoInfo = await ytdl.getInfo(videoUrl);
  const audioFormat = videoInfo.formats.find((format) =>
    format.mimeType.includes("audio/mp4")
  );
  const fileName = encodeURI(sanitizeFileName(videoInfo.videoDetails.title));

  res.header("Content-Disposition", `attachment; filename="${fileName}.m4a"`);

  ytdl(videoUrl, {
    format: audioFormat,
  }).pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
