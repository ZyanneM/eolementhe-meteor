import { Meteor } from 'meteor/meteor';
import { VideosCollection } from '/imports/db/videosData.js';
import '/imports/api/videosDataMethods';
import '/imports/api/videosDataPublications';
import { FilesCollection } from 'meteor/ostrio:files';


Meteor.startup(() => {
  // code to run on server at startup
  // const UploadVideo= (videoFile) =>
  // TasksCollection.insert({
  //   videoFile: videoFile,
  //   createdAt: new Date(),
  // });

});
