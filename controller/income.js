const ValidateNumber = require("../helper/validateNumber");
const { Income } = require("../models");

class Controller {
  // GET ALL
  static async getAllIncome(req, res, next) {
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

      let dataIncome = await Income.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataIncome.count / (limit ? limit : 50));

      // SUKSES
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Mendapatkan Semua Data Income",
        data: dataIncome.rows,
        totaldataIncome: dataIncome.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  static async getOneIncome(req, res, next) {
    try {
      const { id } = req.params;

      const dataIncome = await Income.findOne({
        where: {
          id,
        },
      });

      if (!dataIncome) {
        throw { name: "Id Income Tidak Ditemukan" };
      }
      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data Income",
        data: dataIncome,
      });
    } catch (error) {
      next(error);
    }
  }

  // CREATE
  static async createIncome(req, res, next) {
    try {
      const { total, notes, UserId, IncomeCategoryId } = req.body;

      let body = {
        total: ValidateNumber(total),
        note,
      };

      if (UserId) {
        body.UserId = UserId;
      }

      if (IncomeCategoryId) {
        body.IncomeCategoryId = IncomeCategoryId;
      }
      const dataIncome = await Income.create(body);

      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Menambahkan Data Income",
        data: dataIncome,
      });
    } catch (error) {
      next(error);
    }
  }

  // UPDATE
  static async updateIncome(req, res, next) {
    try {
      const { id } = req.params;

      const dataIncome = await Income.findOne({
        where: {
          id,
        },
      });

      if (!dataIncome) {
        throw { name: "Id Income Tidak Ditemukan" };
      }

      const { total, notes, UserId, IncomeCategoryId } = req.body;

      let body = {
        total: ValidateNumber(total),
        note,
      };

      if (UserId) {
        body.UserId = UserId;
      }

      if (IncomeCategoryId) {
        body.IncomeCategoryId = IncomeCategoryId;
      }

      await Income.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbaharui Data Income",
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE
  static async deleteIncome(req, res, next) {
    try {
      const { id } = req.params;

      const dataIncome = await Income.findOne({
        where: {
          id,
        },
      });

      if (!dataIncome) {
        throw { name: "Id Income Tidak Ditemukan" };
      }

      await Income.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Income",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
