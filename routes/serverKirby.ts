import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import todoController from "../controllers/serverKirby.ts";

const router = new Router();

router
  .get("/events", todoController.getAllEvents)
  .post("/events", todoController.createEvent)
  .get("/events/:id", todoController.getEventById)
  .put("/events/:id", todoController.updateEventById)
  .delete("/events/:id", todoController.deleteEventById);

export default router;
