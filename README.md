AUDIO TRANSCRIPTION:

Steps to run the server and frontend:

1) Run the backend on port 3000 first:

* cd transcription
* npm install
* npm start

2) Run the frontend now:

* cd frontend
* npm install
* npm start

3) Make defined REST calls:

POST:
* curl -F 'file=@/Users/karthikkalyanaraman1/Desktop/simt.mp3' http://localhost:3000/post/localupload

* curl --request POST --data '{"format":"flac","channel":"1","frequency":"16000"}' http://localhost:3000/post/format

GET:
* curl http://localhost:3000/get/transcribe/

Tools:

1) Install gcloud and try it from command line

* gcloud ml speech recognize-long-running gs://karthik-040390/uploaded.flac  --language-code en-US --encoding FLAC --sample-rate 16000  > my_transcription.json
