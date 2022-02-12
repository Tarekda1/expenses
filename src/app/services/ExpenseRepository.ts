import { Expense } from "../models/entities/Expense";
import { IExpense } from "../models/Expense";
import { DataPaging } from "./ExpenseService";

export interface IExpenseRepository {
  getAll(pagenumber: number): Promise<Expense[] | null>;
  getById(id: number): Promise<Expense | null>;
  add(customer: IExpense, file: any): Promise<Expense | null>;
  delete(id: number): Promise<boolean | null>;
  update(id: number, expense: IExpense): Promise<Expense | null>;
}
