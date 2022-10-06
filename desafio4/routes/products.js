const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Contenedor = require("../contenedor.js");
const nuevo = new Contenedor("./productos.txt");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  nuevo.getAll().then((result) => res.send(result));
});
router.post("/", urlencodedParser, (req, res) => {
  nuevo.save(req.body).then((result) => res.send(result));
});

router.get("/:id", (req, res) => {
  nuevo
    .getById(Number(req.params.id))
    .then((result) =>
      result
        ? res.status(200).send(result)
        : res
            .status(404)
            .send(
              `Hubo un error encontrando el producto con id ${req.params.id}`
            )
    );
});

router.put("/:id", (req, res) => {
  nuevo
    .updateById(req.params.id - 1, req.body)
    .then((result) =>
      result
        ? res
            .status(200)
            .send(`El producto con id ${req.params.id} fue actualizado`)
        : res
            .status(404)
            .send(
              `Hubo un error encontrando el producto con id ${req.params.id}`
            )
    );
});

router.delete("/:id", (req, res) => {
  nuevo
    .deleteById(Number(req.params.id))
    .then((result) =>
      result
        ? res
            .status(200)
            .send(`Producto con id ${req.params.id} eliminado`)
        : res
            .status(404)
            .send(
              `Hubo un error encontrando el producto con id ${req.params.id}`
            )
    );
});

module.exports = router;
