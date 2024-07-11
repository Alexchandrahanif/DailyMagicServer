const { Undangan } = require("../models");

class Controller {
  //
  static async getAll(req, res, next) {
    try {
      const { search } = req.query;

      let option = {
        order: [["nama", "ASC"]],
      };

      if (search) {
        option.where = {
          [Op.or]: [{ nama: { [Op.iLike]: `%${search}%` } }],
        };
      }
      const data = await Undangan.findAll(option);

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menampilkan Data",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { nama, pasangan, prioritas, keterangan } = req.body;

      let body = {
        nama,
        pasangan,
        prioritas,
        keterangan,
        status: "Belum Dikirim",
      };

      const data = await Undangan.create(body);
      res.status(201).json({
        statusCode: 201,
        message: "Berhasil Membuat Data Undangan Baru",
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const { nama, pasangan, prioritas, keterangan } = req.body;

      let body = {
        nama,
        pasangan,
        prioritas,
        keterangan,
      };

      const datas = await Undangan.findOne({
        where: {
          id,
        },
      });

      if (!datas) {
        throw { name: "Undangan Tidak Ditemukan" };
      }

      const data = await Undangan.update(body, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbahrui Data Undangan",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const datas = await Undangan.findOne({
        where: {
          id,
        },
      });

      if (!datas) {
        throw { name: "Undangan Tidak Ditemukan" };
      }

      await Undangan.update({ status }, { where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Memperbahrui Status Data Undangan",
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const datas = await Undangan.findOne({
        where: {
          id,
        },
      });

      if (!datas) {
        throw { name: "Undangan Tidak Ditemukan" };
      }

      await Undangan.destroy({ where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: "Berhasil Menghapus Data Undangan",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
