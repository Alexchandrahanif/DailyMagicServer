const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });
  } else if (err.name === "Invalid authorization") {
    code = 401;
    message = "Akses Token Tidak Ada";
  }

  // Normal
  else if (err.name === "Email/Password Salah") {
    code = 400;
    message = "Email/Password Salah";
  } else if (err.name === "Mohon Masukkan Password") {
    code = 400;
    message = "Mohon Masukkan Password";
  } else if (err.name === "Mohon Masukkan Email") {
    code = 400;
    message = "Mohon Masukkan Email";
  } else if (err.name === "Mohon Masukkan Nomor Telepon") {
    code = 400;
    message = "Mohon Masukkan Nomor Telepon";
  } else if (err.name === "Nomor Telepon Tidak Terdaftar") {
    code = 400;
    message = "Nomor Telepon Tidak Terdaftar";
  } else if (err.name === "Id User Tidak Ditemukan") {
    code = 400;
    message = "Id User Tidak Ditemukan";
  } else if (err.name === "Id Income Tidak Ditemukan") {
    code = 400;
    message = "Id Income Tidak Ditemukan";
  } else if (err.name === "Id Spending Tidak Ditemukan") {
    code = 400;
    message = "Id Spending Tidak Ditemukan";
  } else if (err.name === "Id Saving Tidak Ditemukan") {
    code = 400;
    message = "Id Saving Tidak Ditemukan";
  } else if (err.name === "Id Income Categories Tidak Ditemukan") {
    code = 400;
    message = "Id Income Categories Tidak Ditemukan";
  } else if (err.name === "Id Spending Categories Tidak Ditemukan") {
    code = 400;
    message = "Id Spending Categories Tidak Ditemukan";
  } else if (err.name === "Undangan Tidak Ditemukan") {
    code = 400;
    message = "Undangan Tidak Ditemukan";
  }

  //
  else if (err.name === "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan") {
    code = 400;
    message = "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan";
  } else if (err.name === "Saldo Anda Tidak Cukup") {
    code = 400;
    message = "Saldo Anda Tidak Cukup";
  }
  //
  else if (err.name === "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan") {
    code = 400;
    message = "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan";
  } else if (err.name === "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan") {
    code = 400;
    message = "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan";
  } else if (err.name === "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan") {
    code = 400;
    message = "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan";
  } else if (err.name === "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan") {
    code = 400;
    message = "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan";
  } else if (err.name === "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan") {
    code = 400;
    message = "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan";
  }

  // JSON
  else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Tidak Sesuai";
  } else if (err.name === "Forbidden") {
    code = 403;
    message = "Anda Tidak Memiliki Hak Akses";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
