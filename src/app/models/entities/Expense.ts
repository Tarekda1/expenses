import { IsNotEmpty, Length } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  BeforeInsert
} from "typeorm";
import { IExpense } from "../Expense";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ nullable: true, default: "" })
  @Length(4, 100)
  public Type!: string;

  @Column({ nullable: true, default: "" })
  @Length(4, 100)
  public Description!: string;

  @Column({ nullable: true, default: 0 })
  public Value!: number;


  @Column({ name: 'created_at' })
  createdAt!: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    // Workaround to solve a bug from 0.2.19 version
    this.createdAt = new Date();
  }

  static createFrom(expenseParams: IExpense): Expense {
    let expense = new Expense();
    expense.Description = expenseParams.Description;
    expense.Type = expenseParams.Type;
    expense.Value = expenseParams.Value
    return expense;
  }

  static UpdateFrom(expense: Expense, expenseParams: IExpense) {
    expense.Description = expenseParams.Description;
    expense.Value = expenseParams.Value;
    expense.Type = expenseParams.Type;
    return expense;
  }
}
