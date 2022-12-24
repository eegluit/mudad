const multer = require('multer');
const fs = require('file-system');

const uploadStatement = (req, res, cb) => {
  console.log('req -------',req)
  console.log('req file -------',req.file)
  const nameArray = [];
  const option = {
    path: 'public/docs/statement',
    size: {
      fileSize: 10485760,
    },
    // eslint-disable-next-line no-shadow
    filter: function fileFilter(req, file, cb) {
      console.log('file ---', file)
      const type = file.mimetype.split('/');
      if (type[1] === 'pdf') {
        cb(null, true);
      } else {
        const err = {};
        err[file.fieldname] = 'Please upload pdf file';
        cb(err);
      }
    },
  };
  const storage = multer.diskStorage({
    // eslint-disable-next-line no-shadow
    destination(req, file, callback) {
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      if (!fs.existsSync(option.path)) {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        fs.mkdirSync(option.path);
      }
      callback(null, option.path);
    },
    // eslint-disable-next-line no-shadow
    filename(req, file, callback) {
      const ext = file.originalname.split('.');
      const extention = ext.pop();
      // eslint-disable-next-line no-param-reassign
      file.name = `${file.fieldname}-${Date.now()}.${extention}`;
      nameArray.push({
        field: file.fieldname,
        fileName: file.name,
      });
      callback(null, file.name);
    },
  });
  const uploading = multer({
    storage,
    limits: option.size,
    fileFilter: option.filter,
  }).single('statement');
  option.path = `./${option.path}`;
  uploading(req, res, () => {
    cb(null);
  });
};

module.exports = { uploadStatement };
