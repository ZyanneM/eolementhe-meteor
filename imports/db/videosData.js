import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const videosCollection = new FilesCollection({
  collectionName: 'videosData',
  allowClientCode: false,
  storagePath: `/Users/zyanne/Documents/videomenthe/firststep-app/eolementhe-meteor/public/videos`
});

const filesCursor = videosCollection.find();

export default videosCollection;

if (Meteor.isClient) {
  Meteor.subscribe('files.videosData.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.videosData.all', function () {
    return videosCollection.find().cursor;
  });

  // Get cursor's data:
filesCursor.fetch();
}