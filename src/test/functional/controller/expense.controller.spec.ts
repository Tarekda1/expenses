//require("../../helpers/intialise-env-vars");
import { expect } from "chai";
import { it } from "mocha";
import { app } from "../../../app";
import { Expense } from "../../../app/models/entities/Expense";
import { ExpenseService } from "../../../app/services/ExpenseService";
import { DatabaseService } from "../../../app/services/databaseService";

import { getConnection } from "typeorm";

const chai = require("chai");
const chaiHttp = require("chai-http");
import { IExpense } from "../../../app/models/Expense";

const nock = require("nock");
const uuid = require("uuid");

chai.use(chaiHttp);

describe("User Controller", () => {
    beforeEach(async () => {
        try {
            getConnection();
        } catch (error) {
            await DatabaseService.getConnection();
        }
        return true;
    });

    afterEach(async () => {
        await getConnection().synchronize(true);
        return true;
    });

    describe("Create", () => {
        it("should  create User with valid request body", async () => {
            const params: IExpense = {
                "Type": "Food",
                "Value": 100,
                "Description": "some expense"
            }
            let response = await chai
                .request(app)
                .post("/api/v1/expense/")
                .type("application/json")
                .send(params);
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
        });
        it("should update expense with new data in request body", async () => {
            const expense: IExpense = {
                "Type": "Food",
                "Value": 101,
                "Description": "some expense"
            }
            let expenseService = new ExpenseService();
            let expenseModel: Expense | null;
            expenseModel = await expenseService.add(expense, null);
            let response = await chai
                .request(app)
                .put(`/api/v1/expense/${expenseModel?.id}`)
                .type("application/json")
                .send({
                    "Type": "Food",
                    "Value": 102,
                    "Description": "some expense"
                });
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
            expect(response.body.data.Value).to.equal(102);
        });
        it("should get all expenses ", async () => {
            const response = await chai
                .request(app)
                .get("/api/v1/expense/all")
                .type("application/json")
                .send();
            expect(response.status).to.equal(200);
            expect(response.body.data).to.deep.equal([]);
        });
        it("should  delete Expense with valid data and get no expense with specific id using apis", async () => {
            const expense: IExpense = {
                "Type": "Food",
                "Value": 101,
                "Description": "some expense"
            }
            let expenseService = new ExpenseService();
            let expenseModel: Expense | null;
            expenseModel = await expenseService.add(expense, null);

            let id = expenseModel?.id
            let response = await chai
                .request(app)
                .delete(`/api/v1/expense/${id}`)
                .send();
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);

        });
    });
});
