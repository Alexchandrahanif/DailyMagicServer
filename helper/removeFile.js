const fs = require("fs");

const remove = (path) => {
  if (path) {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path, function (err) {
        if (err) {
          console.log("error", err);
        } else {
          console.log("File Berhasil Dihapus");
        }
      });
    }
  }
};

module.exports = remove;
