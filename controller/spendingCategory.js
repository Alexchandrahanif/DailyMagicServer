const { SpendingCategories } = require("../models");

class Controller {
  // GET ALL
  static async getAllSpendingCategory(req, res, next) {
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

      let dataSpendingCategories = await SpendingCategories.findAndCountAll(
        pagination
      );

      let totalPage = Math.ceil(
        dataSpendingCategories.count / (limit ? limit : 50)
      );

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Spending Categories",
        data: dataSpendingCategories.rows,
        totaldataSpendingCategories: dataSpendingCategories.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneSpendingCategory(req, res, next) {
    try {
      const { id } = req.params;

      const dataSpendingCategories = await SpendingCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataSpendingCategories) {
        throw { name: "Id Spending Categories Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Spending Categories",
        data: dataSpendingCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createSpendingCategory(req, res, next) {
    try {
      const { type, notes } = req.body;

      let body = {
        type,
        notes,
      };

      const dataSpendingCategories = await SpendingCategories.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Spending Categories",
        data: dataSpendingCategories,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateSpendingCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { type, notes } = req.body;

      const dataSpendingCategories = await SpendingCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataSpendingCategories) {
        throw { name: "Id Spending Categories Tidak Ditemukan" };
      }

      let body = {
        type,
        notes,
      };

      await SpendingCategories.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Spending Categories",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteSpendingCategory(req, res, next) {
    try {
      const { id } = req.params;

      const dataSpendingCategories = await SpendingCategories.findOne({
        where: {
          id,
        },
      });

      if (!dataSpendingCategories) {
        throw { name: "Id Spending Categories Tidak Ditemukan" };
      }

      await SpendingCategories.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Spending Categories",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
