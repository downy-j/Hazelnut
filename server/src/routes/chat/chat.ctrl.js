"use strict";

const output = {
  findUserChats: (req, res) => {
    res.json("사용자 체팅 목록 제작중. .");
  },
  findChat: (req, res) => {
    res.json("사용중인 체팅방 제작중. .");
  },
};

const process = {
  //   createChat: (req, res) => {},
};

module.exports = {
  output,
  process,
};
