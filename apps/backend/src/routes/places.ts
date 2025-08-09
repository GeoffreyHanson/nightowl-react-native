import { Router } from "express";
import { searchCoffeeShops } from "../services/google";

const router = Router();

router.get("/nearby", async (req, res, next) => {
  try {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radius = Number(req.query.radius ?? 1000);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return res
        .status(400)
        .json({ error: "lat and lng are required numbers" });
    }

    const resp = await searchCoffeeShops({
      latitude: lat,
      longitude: lng,
      radius,
    });

    res.json({
      places: resp.places ?? [],
    });
  } catch (e) {
    next(e);
  }
});

export default router;
