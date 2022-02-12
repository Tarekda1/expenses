import { ExpenseService } from "../services/ExpenseService";
import { Request, Response } from "express";
import _ from "lodash";
import { ServerException, BadRequestException, NotFoundException } from "../../lib/custom-errors";
import Template from "../global/response";
import APIError from "../global/response/apierror";
import { Logger } from "../../lib/LoggerImpl";
import Joi from "joi";

const expenseService = new ExpenseService();
const logger = new Logger();

class ExpenseController {
  public static listAll(req: Request, res: Response, next: any) {
    expenseService
      .getAll()
      .then((expenses) => {
        if (!_.isEmpty(expenses)) {
          res.json(
            Template.success(expenses, "Expense retrevied succesfully")
          );
        } else {
          res.json(Template.success([], "No records found"));
        }
      })
      .catch((err) => {
        next(new ServerException("error occured"));
      });
  }

  public static async addNew(req: Request | any, res: Response, next: any) {
    const validTypes = ['Entertainment', 'Food'
      , 'Bills', 'Transport', 'Other']
    const expenseSchema = Joi.object({
      Description: Joi.string().required(),
      Value: Joi.number().required(),
      Type: Joi.string().valid(...validTypes).required()
    })
    try {
      const value = expenseSchema.validate(req.body);
      console.log(`value: ${JSON.stringify(value)}`)
      if (value.error) {
        res.json(Template.BadRequestFromJoi({ message: "Adding new expense failed", error: "Invalid Data Body" }))
      }
    }
    catch (err) {
      res.json(Template.BadRequestFromJoi({ message: "Adding new expense failed", error: "Invalid Data Body" }))
    }

    expenseService
      .add(req.body, null)
      .then((expense) => {
        if (expense) {
          res.json(Template.success(expense, "Expense saved succesfully"));
        }
      })
      .catch((err) => {
        logger.log("1", err);
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  }

  public static getById(req: Request, res: Response, next: any) {
    expenseService
      .getById(Number(req.params["id"]))
      .then((expense) => {
        if (expense) {
          res.json(
            Template.success(expense, "Expense retrieved succesfully")
          );
        }
        else {
          next(new BadRequestException(`Expense with id: ${req.params["id"]} Not Found`))
        }
      })
      .catch((err) => {
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  }

  public static updateExpense(req: Request | any, res: Response, next: any) {
    console.log(req.params["id"]);
    const expenseSchema = Joi.object({
      description: Joi.string().required(),
      value: Joi.number().required(),
      type: Joi.string().required()
    })
    if (!expenseSchema.validate(req.body)) {
      return Template.BadRequestFromJoi({ message: "updating new expense failed", error: "Invalid Data Body" })
    }
    expenseService
      .update(Number(req.params["id"]), req.body)
      .then((expense) => {
        if (expense) {
          res.json(Template.success(expense, "Expense updated succesfully"));
        }
        else {
          next(new NotFoundException("Not Found"))
        }
      })
      .catch((err) => {
        console.log(`err in getbyid ${err}`)
        if (err.ErrorID == 2110) {
          next(new APIError(err.message, err.ErrorID));
        }
        next(new ServerException("error occured"));
      });
  }

  public static async deleteExpense(req: Request, res: Response, next: any) {
    try {
      if (!req.params.id) {
        res.json(
          Template.BadRequestFromJoi({
            success: false,
            error: "invalid params",
            message: "params id is required",
            code: 101,
          })
        );
      }
      const resp = await expenseService.delete(Number(req.params?.id));
      res.json(Template.success(resp, "Expense retreived succesfully"));
    } catch (err) {
      if (err.ErrorID == 2110) {
        next(new APIError(err.message, err.ErrorID));
      }
      next(new ServerException("error occured"));
    }
  }
}

export default ExpenseController;
