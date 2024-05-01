const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");

const audioFilePath = path.join(__dirname, "audio");

app.get("/download", async (req, res) => {
  const videoUrl = "https://www.youtube.com/watch?v=CuYd_pVeRtg";
  const videoInfo = await ytdl.getInfo(videoUrl);
  const audioFormat = videoInfo.formats.find((format) =>
    format.mimeType.includes("audio/mp4")
  );
  const fileName = encodeURI(videoInfo.videoDetails.title);

  res.header("Content-Disposition", `attachment; filename="${fileName}.m4a"`);

  ytdl(videoUrl, {
    format: audioFormat,
  }).pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 0.tcp.ap.ngrok.io:10620/download
