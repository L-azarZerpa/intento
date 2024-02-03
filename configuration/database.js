
const db = require('./configDB.js');
const {
  selectImagesAndProducts,
  selectImagesAndProducts2,
  selectImagesAndProducts3,
  selectImagesAndProductsRating } = require("./consultas/selectImagesAndProduct")

const {
  insert,
  insertCategoria,
  insertImagen,
  insertRating,
 } = require("./consultas/insert")

const {
  select,
  selectCategoria,
  selectCategoria2,
  select2,
  selectImagen,
  selectImagen2,
  selectratings,
  selectratings2,
  selectratings3
} = require("./consultas/select")

const {
  updateImg,
  updateCategoria,
  update
} = require("./consultas/update")

const {
  deletex,
  delete2,
  delete4,
  delete3
} = require("./consultas/delete")

module.exports = {
  insert,
  insertCategoria,
  insertImagen,
  insertRating,

  select,
  selectCategoria,
  selectCategoria2,
  select2,
  selectImagen,
  selectImagen2,
  selectratings,
  selectratings2,
  selectratings3,

  selectImagesAndProducts,
  selectImagesAndProducts2,
  selectImagesAndProducts3,
  selectImagesAndProductsRating,

  updateImg,
  updateCategoria,
  update,
  delete: deletex,
  delete2,
  delete4,
  delete3
}
























