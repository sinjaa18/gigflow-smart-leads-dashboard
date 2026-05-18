import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes"
import leadRoutes from "./routes/leads.routes"

const app = express()



app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/", (_, res) => {
    res.json({
    message: "API running"
  })
})
app.use("/api/auth", authRoutes)
app.use("/api/leads",  leadRoutes)

export default app