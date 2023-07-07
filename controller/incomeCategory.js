const { IncomeCategories } = require("../models");

class Controller {
  // GET ALL
  static async getAllIncomeCategory(req, res, next) {
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

      let dataIncomeCategories = await IncomeCategories.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataIncomeCategories.count / (limit ? limit : 50)
      );

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Income Categories",
        data: dataIncomeCategories.rows,
        totaldataIncomeCategories: dataIncomeCategories.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneIncomeCategory(req, res, next) {
    try {
      const { id } = req.params;

      const dataIncomeCategories = await IncomeCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataIncomeCategories) {
        throw { name: "Id Income Categories Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Income Categories",
        data: dataIncomeCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createIncomeCategory(req, res, next) {
    try {
      const { type, notes } = req.body;

      let body = {
        type,
        notes,
      };

      const dataIncomeCategories = await IncomeCategories.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Income Categories",
        data: dataIncomeCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateIncomeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { type, notes } = req.body;

      const dataIncomeCategories = await IncomeCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataIncomeCategories) {
        throw { name: "Id Income Categories Tidak Ditemukan" };
      }

      let body = {
        type,
        notes,
      };

      await IncomeCategories.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Income Categories",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteIncomeCategory(req, res, next) {
    try {
      const { id } = req.params;

      const dataIncomeCategories = await IncomeCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataIncomeCategories) {
        throw { name: "Id Income Categories Tidak Ditemukan" };
      }

      await IncomeCategories.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data IncomeCategories",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
