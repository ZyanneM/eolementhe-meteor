import { check } from 'meteor/check';
import { VideosCollection } from '../db/videosData.js';
 
Meteor.methods({
  'videosData.insert'(videoFile) {
   
    VideosCollection.insert({
      videoFile,
      createdAt: new Date
    })
  },
  'videoStream'(fileName) {
    
  }
});