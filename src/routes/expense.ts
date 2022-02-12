import { Router } from "express";
import ExpenseController from "../app/controllers/ExpenseController";

const router = Router();

// Get all users
router.get("/all", ExpenseController.listAll);
router.get("/:id", ExpenseController.getById);
router.post("/", ExpenseController.addNew);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

export default router;
