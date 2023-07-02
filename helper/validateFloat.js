const ValidateFloat = (params) => {
  try {
    if (
      !params ||
      params == "" ||
      !/^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/.test(params)
    ) {
      return 0;
    } else {
      return params;
    }
  } catch (error) {
    throw { name: "Mohon Masukkan Angka" };
  }
};

module.exports = ValidateFloat;
