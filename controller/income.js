const ValidateNumber = require("../helper/validateNumber");
const { Income, User, IncomeCategories } = require("../models");

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

  // GET ALL By UserId
  static async getAllIncomeByUserId(req, res, next) {
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

      if (IncomeCategoryId == "") {
        throw { name: "Id Income Categories Tidak Ditemukan" };
      }

      if (UserId == "") {
        throw { name: "Id User Tidak Ditemukan" };
      }

      let body = {
        total: ValidateNumber(total),
        notes,
      };

      if (IncomeCategoryId) {
        body.IncomeCategoryId = IncomeCategoryId;
      }

      const dataIncomeCategories = await IncomeCategories.findOne({
        where: {
          id: IncomeCategoryId,
        },
      });

      if (!dataIncomeCategories) {
        throw { name: "Id Income Categories Tidak Ditemukan" };
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

      await dataUser.increment("totalBalance", { by: total });

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
      const { total, notes, IncomeCategoryId } = req.body;

      if (IncomeCategoryId == "") {
        throw { name: "Id Income Categories Tidak Ditemukan" };
      }

      const dataIncome = await Income.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
          },
        ],
      });

      if (!dataIncome) {
        throw { name: "Id Income Tidak Ditemukan" };
      }

      let body = {
        total: ValidateNumber(total),
        notes,
      };

      if (IncomeCategoryId) {
        body.IncomeCategoryId = IncomeCategoryId;
      }

      await Income.update(body, {
        where: {
          id,
        },
      });

      let saldo = +dataIncome.User.totalBalance - +dataIncome.total + +total;
      if (saldo < 0) {
        throw { name: "Tidak Bisa Karena Uang Nya Sudah Anda Gunakan" };
      }

      await User.update(
        {
          totalBalance: saldo,
        },
        {
          where: {
            id: dataIncome.User.id,
          },
        }
      );

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
