var path = require('path');

const SAMPLE = 'gs://cloud-samples-tests/speech/brooklyn.flac';
const RESULT_FILE = path.join(__dirname, '../', 'results/result.txt');
const UPLOADED_FILE_NAME = 'uploaded';
const UPLOADED_FILE_PATH = path.join(__dirname, '../', 'uploads/');
const UPLOADED_FILE = UPLOADED_FILE_PATH + UPLOADED_FILE_NAME;
const FORMAT_FILE_NAME = 'formatted';
const FORMAT_FILE = UPLOADED_FILE_PATH + FORMAT_FILE_NAME;
const CURRENT_BUCKET = 'karthik-040390';
const GCS_URI = 'gs://' + CURRENT_BUCKET + '/' + FORMAT_FILE_NAME;


module.exports = { SAMPLE,
	               RESULT_FILE,
	               UPLOADED_FILE_NAME,
	               UPLOADED_FILE_PATH,
	               UPLOADED_FILE,
	               FORMAT_FILE_NAME,
	               FORMAT_FILE,
	               CURRENT_BUCKET,
	               GCS_URI };