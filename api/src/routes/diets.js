const { Router } = require("express");

const { getAllDiets } = require("../routes/controllers/dietsControllers");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const diets = await getAllDiets();

    if (diets.length) {
      res.status(200).send(diets);
    } else {
      res.status(404).send("error al traer dietas");
    }
  } catch (error) {
    res.status(404).send({ error });
  }
});
module.exports = router;
