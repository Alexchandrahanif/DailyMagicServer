// Only enter numeric characters
const formatAngka = (value, key) => {
  if (!/^[0-9, +, -]+$/.test(value)) {
    throw { name: `Mohon Masukkan Dengan Format Angka`, key: key };
  }
};
module.exports = formatAngka;
