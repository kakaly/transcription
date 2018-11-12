const speech = require('@google-cloud/speech');
const {Storage} = require('@google-cloud/storage');

var file_util = require('./file_util');
var constants = require('./constants');
var write_to_file = file_util.write_to_file;


const recognize = async ( gcsUri,
                          encoding,
                          sampleRateHertz,
                          languageCode ) => {
  console.log("Transcribing the audio...");
  const client = new speech.SpeechClient();
  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  const audio = {
    uri: gcsUri,
  };
  const request = {
    config: config,
    audio: audio,
  };
  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  console.log("Writing to file...");
  write_to_file(transcription, constants.RESULT_FILE);
  console.log("Done writing to file!")
};


const create_bucket_gs = async( bucketName ) => {
  const gstorage = new Storage();
  await gstorage.createBucket(bucketName, {
      location: 'ASIA',
      storageClass: 'COLDLINE',
  });
  console.log(`Bucket ${bucketName} created.`);
};


const upload_to_gs = async ( bucketName,
                             filePath ) => {
  const gstorage = new Storage();
  await gstorage.bucket(bucketName).upload(filePath, {
      gzip: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
  });
  console.log(`${filePath} uploaded to ${bucketName}.`);
};


const list_files_on_gs = async ( bucketName ) => {
  const gstorage = new Storage();
  const [files] = await gstorage.bucket(bucketName).getFiles();
  console.log('Files:');
  files.forEach(file => {
      console.log(file.name);
  });
};


module.exports = { recognize,
                   create_bucket_gs,
                   upload_to_gs,
                   list_files_on_gs };                   








