// import { Router } from 'meteor/iron:router';
// import { Meteor } from 'meteor/meteor';

// Router.route('/video/:fileName', {
//   name: 'videoPlayer',
//   waitOn: function() {
//     return Meteor.subscribe('videos'); // Subscribe to the videos collection
//   },
//   data: function() {
//     const fileName = this.params.fileName;
//     return {
//       video: Videos.findOne({ name: fileName }), // Find video by name
//     };
//   },
// });