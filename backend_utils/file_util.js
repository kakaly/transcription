const multer = require('multer');

var fs = require('fs');
var constants = require('./constants');


const write_to_file = ( content, filepath ) => {
	fs.writeFile(filepath, content, function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
};


const storage = multer.diskStorage({
	destination: constants.UPLOADED_FILE_PATH,
    filename: function ( req, file, cb ) {
        cb( null, constants.UPLOADED_FILE_NAME);
    }
});


const limits = {
	files: 1,
	fileSize: 50 * 1024 * 1024,
};


const upload_options = multer({
	limits: limits,
	storage: storage
});

module.exports = { write_to_file,
	               upload_options };