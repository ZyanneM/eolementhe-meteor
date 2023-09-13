import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './uploadForm.css';

import videosCollection from '../../../imports/db/videosData';
import ffmpeg from 'fluent-ffmpeg';
import './uploadForm.html';


const insertFile = (fileInput, template) => {
  const videoFile = videosCollection.insert({
    file: fileInput.files[0],
    chunkSize: 'dynamic'
  }, false);

  const progress = document.querySelector('.progress-bar');
  progress.style.display = 'block';

  videoFile.on('start', function () {
    template.currentUpload.set(this);
  });

  videoFile.on('progress', function (progress) {
    const progressPercent = Math.round(progress * 1);
    document.querySelector(".progress-bar-fill").style.width = `${progressPercent}%`;
    document.getElementById("progress").textContent = `Progress: ${progressPercent}%`;
  });

  videoFile.on('end', function (error, fileObj) {
    if (error) {
      alert(`Error during upload: ${error}`);
    } else {
      alert(`File "${fileObj.name}" successfully uploaded`);
    }
    template.currentUpload.set(false);
  });

  videoFile.start();
}

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  "click #upload-btn"(event, template) {
    event.preventDefault();
    const fileInput = document.getElementById("file-input");

    if (fileInput.files.length > 0) {
      if (fileInput.files[0].name.toLowerCase().endsWith('.mp4')) {
        insertFile(fileInput, template);
      } else if (fileInput.files[0].name.toLowerCase().endsWith('.mov') || fileInput.files[0].name.toLowerCase().endsWith('.avi')) {
        insertFile(fileInput, template);

        const fileName = fileInput.files[0].name;
        const filePathName = videosCollection.findOne({ name: fileName });
        const filePath = filePathName.link();
        const inputPath = filePath;
        const outputPath = `${filePath}.converted.mp4`;

        const fileExists = videosCollection.findOne({ name: fileName });

// FAILED : try to convert avi and mov but some issues because ffmpeg try to access to fs functions

        // if (fileExists) {
        //   ffmpeg(inputPath)
        //     .output(outputPath)
        //     .on('end', () => {
        //       console.log('Conversion complete');
        //     })
        //     .on('error', (err) => {
        //       console.error('Error during conversion:', err);
        //     })
        //     .run();
        // } else {
        //   console.error('File not found:', inputPath);
        // }
      }

      template.currentUpload.set(false);
    } else {
      console.log("Aucun fichier sélectionné");
    }
  },

  "change #file-input"(event, template) {
    event.preventDefault();

    const fileNameSpan = document.getElementById("file-name");
    const fileInput = document.getElementById("file-input");

    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileNameSpan.innerText = `Upload file : ${fileName}`;
    }
  }
});