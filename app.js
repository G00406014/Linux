const express = require('express');
var router = express.Router();
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'EXPRESS' });
});

router.post('/downloadVideo', function(req, res, next) {
  var url = req.body.url;
  var outputDirectory = "/home/student/YoutubeVideos"; // Modify with your actual path
  var outputPath = path.join(outputDirectory, '%(title)s.%(ext)s');

  // Ensure the output directory exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Use double quotes around the outputPath to prevent shell interpretation of special characters
exec(`yt-dlp -o "${outputPath}" "${url}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    res.json({ message: 'Video downloaded successfully', stdout });
  });
});

router.post('/extractAudio', function(req, res, next) {
  var url = req.body.url;
  var outputDirectory = "/home/student/YoutubeVideos"; // Modify with your actual path
  var outputPath = path.join(outputDirectory, '%(title)s.%(ext)s');

  // Ensure the output directory exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  exec(`yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      res.status(500).send(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    res.json({ message: 'Audio extracted successfully', stdout });
  });
});

module.exports = router; 
