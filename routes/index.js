const router = require("express").Router();

const incomeRouter = require("./income");
const incomeCategoriesRouter = require("./incomeCategory");
const savingRouter = require("./saving");
const spendingRouter = require("./spending");
const spendingCategoriesRouter = require("./spendingcategory");
const userRouter = require("./user");

router.use("/user", userRouter);
router.use("/income", incomeRouter);
router.use("/spending", spendingRouter);
router.use("/saving", savingRouter);
router.use("/incomeCategory", incomeCategoriesRouter);
router.use("/spendingCategory", spendingCategoriesRouter);

module.exports = router;
