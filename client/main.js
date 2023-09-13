import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Player} from './components/Player/Player.js';
import { UploadForm} from './components/uploadForm/uploadForm.js'
import { VideosList} from './components/videoList/videosList.js'
import { createRoot } from 'react-dom/client';
// import './routes.js';

import './main.html';
import './components/uploadForm/uploadForm.html';

