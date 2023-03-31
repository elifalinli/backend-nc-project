exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePSQL400s = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};
exports.handleForeignKeyErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "username not found!" });
  } else {
    next(err);
  }
};
exports.handleNullKeyErrors = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "something is missing with your request!" });
  } else {
    next(err);
  }
};

exports.handle500statuses = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Ooopss! Server error!" });
};
