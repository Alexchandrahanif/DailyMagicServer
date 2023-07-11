const ValidateNumber = require("../helper/validateNumber");
const { Saving, User, sequelize } = require("../models");

class Controller {
  // GET ALL
  static async getAllSaving(req, res, next) {
    try {
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        order: [["createdAt", "DESC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          [Op.or]: [{ notes: { [Op.iLike]: `%${search}%` } }],
        };
      }

      let dataSaving = await Saving.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataSaving.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Saving",
        data: dataSaving.rows,
        totaldataSaving: dataSaving.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL By UserId
  static async getAllSavingByUserId(req, res, next) {
    try {
      const { UserId } = req.params;
      const { limit, page, search, tanggal } = req.query;

      let pagination = {
        where: {
          UserId,
        },
        order: [["createdAt", "DESC"]],
      };

      if (limit) {
        pagination.limit = limit;
      }

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where = {
          UserId, //! apakah bener?
          [Op.or]: [{ notes: { [Op.iLike]: `%${search}%` } }],
        };
      }

      let dataSaving = await Saving.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataSaving.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Saving",
        data: dataSaving.rows,
        totaldataSaving: dataSaving.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneSaving(req, res, next) {
    try {
      const { id } = req.params;

      const dataSaving = await Saving.findOne({
        where: {
          id,
        },
      });

      if (!dataSaving) {
        throw { name: "Id Saving Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Saving",
        data: dataSaving,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createSaving(req, res, next) {
    try {
      const { total, notes, UserId, SavingCategoryId, purpose } = req.body;

      let body = {
        total: ValidateNumber(total),
        purpose,
        note,
      };

      if (SavingCategoryId) {
        body.SavingCategoryId = SavingCategoryId;
      }

      const dataSavingCategories = await SavingCategories.findOne({
        where: {
          id: SavingCategoryId,
        },
      });

      if (!dataSavingCategories) {
        throw { name: "Id Saving Categories Tidak Ditemukan" };
      }

      if (UserId) {
        body.UserId = UserId;
      }

      const dataUser = await User.findOne({
        where: {
          id: UserId,
        },
      });

      if (!dataUser) {
        throw { name: "Id User Tidak Ditemukan" };
      }

      if (dataUser.totalBalance < total) {
        throw { name: "Saldo Anda Tidak Cukup" };
      }

      if (dataUser.totalBalance > total) {
        await dataUser.decrement("totalBalance", { by: total });
      }

      const dataSaving = await Saving.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Saving",
        data: dataSaving,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateSaving(req, res, next) {
    try {
      const { id } = req.params;

      const dataSaving = await Saving.findOne({
        where: {
          id,
        },
      });

      if (!dataSaving) {
        throw { name: "Id Saving Tidak Ditemukan" };
      }

      const { total, notes, UserId, purpose } = req.body;

      let body = {
        total: ValidateNumber(total),
        purpose,
        note,
      };

      if (UserId) {
        body.UserId = UserId;
      }

      await Saving.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Saving",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteSaving(req, res, next) {
    try {
      const { id } = req.params;

      const dataSaving = await Saving.findOne({
        where: {
          id,
        },
      });

      if (!dataSaving) {
        throw { name: "Id Saving Tidak Ditemukan" };
      }

      await Saving.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Saving",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
