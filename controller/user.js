const {
  User,
  sequelize,
  Absen,
  OTP,
  Device,
  Role,
  RoleUser,
  Offer,
} = require("../models/index");

const {
  comparePassword,
  createAccessToken,
  hashingPassword,
} = require("../helper/helper");

const { Op } = require("sequelize");
const { Success, Failed } = require("../helper/logs");
const lastActive = require("../helper/lastActive");
const { default: axios } = require("axios");
const formatPhoneNumber = require("../helper/formatPhoneNumber");
const formatAngka = require("../helper/formatAngka");
const remove = require("../helper/removeFile");
const moment = require("moment");

class Controller {
  // REGISTER
  static async register(req, res, next) {
    // Sequelize Transaction
    const t = await sequelize.transaction();
    try {
      // REQUEST
      const { username, password, email, phoneNumber, address } = req.body;

      let data = {
        username,
        password,
        email,
        photoUser: req.file ? req.file.path : "",
        phoneNumber: formatPhoneNumber(phoneNumber),
        address,
      };

      // CREATE NEW USER
      const dataUser = await User.create(data, { transaction: t });

      await t.commit();

      // SUCCESS
      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Pengguna Baru",
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  // LOGIN EMAIL
  static async login(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // REQUEST
      const { email, password, deviceId } = req.body;

      // VALIDASI INPUT
      if (!email) {
        throw { name: "Mohon Masukkan Email" };
      }
      if (!password) {
        throw { name: "Mohon Masukkan Password" };
      }

      // VALIDASI FIND USER
      const dataUser = await User.findOne({
        where: {
          email,
          statusActive: true,
          softDeleted: false,
        },
      });

      if (!dataUser) {
        throw { name: "Email/Password Salah" };
      }

      if (!comparePassword(password, dataUser.password)) {
        throw { name: "Email/Password Salah" };
      }

      // CREATE PAYLOAD
      const payload = {
        id: dataUser.id,
        email: dataUser.email,
      };

      // CREATE ACCESS TOKEN
      const authorization = createAccessToken(payload);

      await t.commit();

      // SUCCESS
      res.status(200).json({
        statusCode: 200,
        authorization: authorization,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  // GET ALL USER
  static async getAllUsers(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        where: {
          flagDeleted: false,
        },
        attributes: {
          exclude: ["password"],
        },
        order: [["username", "asc"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ username: { [Op.iLike]: `%${search}%` } }],
        };
      }

      let dataUser = await User.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataUser.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data User",
        data: dataUser.rows,
        totaldataUser: dataUser.count,
        totalPage: totalPage,
      });
    } catch (error) {
      // ERROR
      next(error);
    }
  }

  // GET ONE USER
  static async getOneUser(req, res, next) {
    try {
      // REQUEST
      const { id } = req.params;

      const dataUser = await User.findOne({
        where: {
          id,
          statusActive: true,
          softDeleted: false,
        },
        attributes: {
          exclude: ["password"],
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }
      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data User",
        data: dataUser,
      });
    } catch (error) {
      // NEXT ERROR
      next(error);
    }
  }
}

module.exports = Controller;
