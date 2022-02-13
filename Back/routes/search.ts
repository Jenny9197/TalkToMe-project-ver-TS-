import express from 'express';
const router = express.Router();
import searchController from "../controllers/searchController";

router.post('/', searchController.homeSearchFunc);

export default router;