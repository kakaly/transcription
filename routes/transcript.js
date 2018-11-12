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

//curl -F 'file=@/Users/karthikkalyanaraman1/Desktop/simt.mp3' http://localhost:3000/post/localupload
router.post('/localupload', upload_options.any(), function(req, res) {
	console.log('Uploading locally...');
	const file = req.files[0];
	console.log('File ' + file.originalname +
		' uploaded successfully: ' + constants.UPLOADED_FILE);
    res.send('File uploaded to local successfully!');
});

//curl --request POST --data '{"format":"flac","channel":"1","frequency":"16000"}' http://localhost:3000/post/format
router.post('/format', function(req, res) {
	console.log('Starting file formatting...');
	const param = req.body;
	convert_standard(constants.UPLOADED_FILE,
		             param.format,
		             parseInt(param.frequency),
		             parseInt(param.channel));
	req.file = constants.FORMAT_FILE;
	res.send('File formatted successfully!');
	upload_to_gs(constants.CURRENT_BUCKET, req.file);
});


router.post('/cloudupload', function(req, res) {
	console.log('Uploading to GCS...');
	upload_to_gs(constants.CURRENT_BUCKET, req.file);
	res.send('File uploaded to GCS successfully!');
});

//curl http://localhost:3000/get/transcribe/
router.get('/transcribe', function(req, res) {
	console.log('Starting transcription...');
	recognize(constants.GCS_URI,
		      'FLAC',
		      16000,
		      'en-US');
	res.send('File transcribed successfully!');
});


module.exports = router;