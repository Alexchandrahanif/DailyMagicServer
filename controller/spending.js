const ValidateNumber = require("../helper/validateNumber");
const { Spending } = require("../models");

class Controller {
  // GET ALL
  static async getAllSpending(req, res, next) {
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

      let dataSpending = await Spending.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataSpending.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Spending",
        data: dataSpending.rows,
        totaldataSpending: dataSpending.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneSpending(req, res, next) {
    try {
      const { id } = req.params;

      const dataSpending = await Spending.findOne({
        where: {
          id,
        },
      });

      if (!dataSpending) {
        throw { name: "Id Spending Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Spending",
        data: dataSpending,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createSpending(req, res, next) {
    try {
      const { total, notes, UserId, SpendingCategoryId } = req.body;

      let body = {
        total: ValidateNumber(total),
        note,
      };

      if (UserId) {
        body.UserId = UserId;
      }

      if (SpendingCategoryId) {
        body.SpendingCategoryId = SpendingCategoryId;
      }
      const dataSpending = await Spending.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Spending",
        data: dataSpending,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateSpending(req, res, next) {
    try {
      const { id } = req.params;

      const dataSpending = await Spending.findOne({
        where: {
          id,
        },
      });

      if (!dataSpending) {
        throw { name: "Id Spending Tidak Ditemukan" };
      }

      const { total, notes, UserId, SpendingCategoryId } = req.body;

      let body = {
        total: ValidateNumber(total),
        note,
      };

      if (UserId) {
        body.UserId = UserId;
      }

      if (SpendingCategoryId) {
        body.SpendingCategoryId = SpendingCategoryId;
      }

      await Spending.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Spending",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteSpending(req, res, next) {
    try {
      const { id } = req.params;

      const dataSpending = await Spending.findOne({
        where: {
          id,
        },
      });

      if (!dataSpending) {
        throw { name: "Id Spending Tidak Ditemukan" };
      }

      await Spending.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Spending",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
