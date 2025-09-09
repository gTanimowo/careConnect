const express = require("express");
const apiRouter = express.Router();

const activityRouter = require("../routes/activityRoutes");
const residentRouter = require("../routes/residentRoutes");
const authRouter = require("../routes/authRoutes");
const activityNotesController = require("../routes/activityNotesRoutes");

apiRouter.use("/activities", activityRouter);
apiRouter.use("/residents", residentRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/activities", activityNotesController);

module.exports = apiRouter;
