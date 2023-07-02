const ValidateNumber = (params) => {
  if (
    !params ||
    params == "" ||
    params == "0" ||
    !/^[0-9, +, -]+$/.test(params)
  ) {
    return 0;
  } else {
    return params;
  }
};

module.exports = ValidateNumber;
