const { SavingCategories } = require("../models");

class Controller {
  // GET ALL
  static async getAllSavingCategory(req, res, next) {
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

      let dataSavingCategories = await SavingCategories.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataSavingCategories.count / (limit ? limit : 50)
      );

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Saving Categories",
        data: dataSavingCategories.rows,
        totaldataSavingCategories: dataSavingCategories.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneSavingCategory(req, res, next) {
    try {
      const { id } = req.params;

      const dataSavingCategories = await SavingCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataSavingCategories) {
        throw { name: "Id Saving Categories Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Saving Categories",
        data: dataSavingCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createSavingCategory(req, res, next) {
    try {
      const { type, notes } = req.body;

      let body = {
        type,
        notes,
      };

      const dataSavingCategories = await SavingCategories.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Saving Categories",
        data: dataSavingCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateSavingCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { type, notes } = req.body;

      const dataSavingCategories = await SavingCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataSavingCategories) {
        throw { name: "Id Saving Categories Tidak Ditemukan" };
      }

      let body = {
        type,
        notes,
      };

      await SavingCategories.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Saving Categories",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteSavingCategory(req, res, next) {
    try {
      const { id } = req.params;

      const dataSavingCategories = await SavingCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataSavingCategories) {
        throw { name: "Id Saving Categories Tidak Ditemukan" };
      }

      await SavingCategories.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data SavingCategories",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
