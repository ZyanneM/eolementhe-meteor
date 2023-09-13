import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import videosCollection from '../../../imports/db/videosData';
import { Player } from '../Player/Player';

import './videosList.html';


Meteor.subscribe('videosData');

Template.videosListTemplate.onCreated(function () {
  // render(<Player />, document.getElementById('player-react-container'));
  this.selectedFileName = new ReactiveVar(null);
  this.selectedFileUrl = new ReactiveVar(null);
  // this.isOpen = new ReactiveVar(false);
});

Template.videosListTemplate.events({
  "click .video-item-link"(event, template) {
    event.preventDefault();
    const fileName = event.currentTarget.dataset.filename;
    console.log("Selected file is :", fileName);
    template.selectedFileName.set(fileName);
    const fileNameTest = Template.instance().selectedFileName.get();
    console.log("Selected file name:", fileNameTest);
    const videoFile = videosCollection.findOne({ name: fileName });
    console.log(videoFile);
    if (videoFile) {
      const fileUrl = template.selectedFileUrl.set(videoFile.link())
      
  }
}
});

Template.videosListTemplate.helpers({
    files() {
      return videosCollection.find();
    },
    handlePlay(fileName) {
      // Template.instance().selectedFileName.set(fileName);
      // Template.instance().selectedVideo.set(video);
      // Template.instance().isOpen.set(true);
    },
    handleClose() {
      Template.instance().isOpen.set(false);
      Template.instance().selectedVideo.set('');
    },
    //need an helper for react component
    Player() {
      return Player;
    },
    //need an helper for react component props
    fileName() {
      const file = Template.instance().selectedFileName.get();;
      return file;
    },
    fileUrl() {
      const url = Template.instance().selectedFileUrl.get();
      return url
    } 

  });

