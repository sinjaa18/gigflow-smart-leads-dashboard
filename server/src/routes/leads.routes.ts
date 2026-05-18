import express from "express"

import { protect } from "../middlewares/auth.middleware"
import { authorize } from "../middlewares/role.middleware"
import { getLead,getLeads,createLead,updateLead,deleteLead } from "../controllers/lead.controller"

const router = express.Router()
router.get("/",protect,getLeads)
router.get("/:id",protect,getLead)
router.post("/",protect,authorize("admin"),createLead)
router.put("/:id",protect,authorize("admin","sales"),updateLead)
router.delete("/:id",protect,authorize("admin"),deleteLead)

export default router