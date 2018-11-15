var express = require('express');
var router = express.Router();
var gcloud_utils = require('../backend_utils/gcloud_util');
var audio_util = require('../backend_utils/audio_util');
var constants = require('../backend_utils/constants');
var file_util = require('../backend_utils/file_util');
var upload_options = file_util.upload_options;
var recognize = gcloud_utils.recognize;
var upload_to_gs = gcloud_utils.upload_to_gs;
var convert_standard = audio_util.convert_standard;

// Middelwares

var format = (req, res) => {
	console.log('Starting file formatting...');
	const param = req.body;
	convert_standard(constants.UPLOADED_FILE,
		             param.format,
		             parseInt(param.frequency),
		             parseInt(param.channel));
	res.send('File formatted successfully!');
}

var cloudupload = (req, res) => {
	console.log('Uploading to GCS...');
	//TODO: attach bucket and format file to req
	upload_to_gs(constants.CURRENT_BUCKET, constants.FORMAT_FILE);
	res.send('File uploaded to GCS successfully!');
};

var localupload = (req, res) => {
	console.log('Uploading locally...');
	const file = req.files[0];
	console.log('File ' + file.originalname +
		' uploaded successfully: ' + constants.UPLOADED_FILE);
    res.send('File uploaded to local successfully!');
};

var transcribe = (req, res) => {
	console.log('Starting transcription...');
	recognize(constants.GCS_URI,
		      'FLAC',
		      16000,
		      'en-US');
	res.send('File transcribed successfully!');
};

//curl -F 'file=@/Users/karthikkalyanaraman1/Desktop/simt.mp3' http://localhost:3000/post/localupload
router.post('/localupload', upload_options.any(), localupload);

//curl --request POST --data "format=flac&channel=1&frequency=16000" http://localhost:3000/post/format
router.post('/format', format);

//curl --request POST --data "file=foo&bucket=bar" http://localhost:3000/post/cloudupload
router.post('/cloudupload', cloudupload);

//curl http://localhost:3000/get/transcribe/
router.get('/transcribe', transcribe);


module.exports = { router,
	               cloudupload,
	               localupload,
	               transcribe,
	               format };