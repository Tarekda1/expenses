type ExpenseType = 'Entertainment' | 'Food'
  | 'Bills' | 'Transport' | 'Other'

export interface IExpense {
  Description: string;
  Value: number;
  Type: ExpenseType;
}
