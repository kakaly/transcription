var ffmpeg = require('fluent-ffmpeg');
var constants = require('./constants');


const convert_standard = (audiofile,
	                      format='flac',
	                      frequency=16000,
	                      channel=1) => {
	ffmpeg(audiofile)
	.toFormat(format)
	.audioChannels(channel)
	.audioFrequency(frequency)
	.on('error', (err) => {
		console.log('An error occurred: ' + err.message);
	})
	.on('progress', (progress) => {
	    // console.log(JSON.stringify(progress));
	    console.log('Converting format: ' + progress.targetSize + ' KB converted');
    })
    .on('end', () => {
    	console.log('Processing finished !');
    })
    .save(constants.FORMAT_FILE);
};


module.exports = { convert_standard };