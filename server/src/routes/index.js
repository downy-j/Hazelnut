const express = require("express");

const router = express.Router();

// 컨트롤러
const ctrl = require("./main/main.ctrl");

router.get("/", ctrl.output.main); // 메인 진입

router.post("/", ctrl.process.login);

module.exports = router;
