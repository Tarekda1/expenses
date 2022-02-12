import { getRepository } from "typeorm";
import { IExpense } from "../models/Expense";
import { Expense } from "../models/entities/Expense";
import { IExpenseRepository } from "./ExpenseRepository";
import _ from "lodash";
import { BadRequestException } from "../../lib/custom-errors";
export type DataPaging = {
  expenses: Expense[];
  total: number;
  offset: number;
};
export class ExpenseService implements IExpenseRepository {

  async getAll(): Promise<Expense[] | null> {
    const expenseRepository = getRepository(Expense);
    try {
      const expenses = await expenseRepository.find();
      return expenses
    } catch (error) {
      return null;
    }
  }
  async getById(id: number): Promise<Expense | null> {
    const expenseRepository = getRepository(Expense);
    try {
      if (id == -1) {
        return null;
      }
      const expense = await expenseRepository.findOneOrFail(id);
      return expense;
    } catch (error) {
      return null;
    }
  }
  async add(expenseParams: IExpense, file: any): Promise<Expense | null> {
    const expense = Expense.createFrom(expenseParams);
    const expenseRepository = getRepository(Expense);
    try {
      const savedExpense = await expenseRepository.save(expense);
      return savedExpense;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async update(id: number, expenseParam: IExpense): Promise<Expense | null> {
    //console.log(customerParam);
    const expenseRepository = getRepository(Expense);
    const expense = await expenseRepository.findOneOrFail({ id: id });
    console.log("before", expense);

    //update values
    Expense.UpdateFrom(expense, expenseParam);
    console.log("after", expense);
    try {
      const savedProduct = await expenseRepository.save(expense);
      console.log("saved", savedProduct);
      return savedProduct;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async delete(id: number): Promise<boolean | null> {
    try {
      const expenseRepository = getRepository(Expense);
      const expense = await expenseRepository.find({ id });
      if (expense) {
        const deleteResult = await expenseRepository.delete({ id });
        if (deleteResult?.affected! > 0) {
          return true;
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
