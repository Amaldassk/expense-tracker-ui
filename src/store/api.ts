import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),

  tagTypes: ["Transactions", "Budgets"],

  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => "/transactions",

      providesTags: ["Transactions"],
    }),

    addTransaction: builder.mutation<Transaction, Partial<Transaction>>({
      query: (transaction) => ({
        url: "/transactions",
        method: "POST",
        body: transaction,
      }),

      invalidatesTags: ["Transactions"],
    }),

    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Transactions"],
    }),

    getBudgets: builder.query<Budget[], void>({
      query: () => "/budgets",

      providesTags: ["Budgets"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useGetBudgetsQuery,
} = api;
