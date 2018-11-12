import React from 'react';
import ReactDropzone from 'react-dropzone';
import request from 'superagent';

const FileUpload = () => 
    <ReactDropzone onDrop={onDrop}>
        <div>Try dropping some files here, or click to select files to upload.</div>
    </ReactDropzone>

const onDrop = (files) => {
	const req = request.post('http://localhost:3000/post/localupload');
    files.forEach(file => {
    	req.attach(file.name, file);
    });
    req.end();
}

export default FileUpload