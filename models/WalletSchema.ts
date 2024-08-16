import { Schema } from 'mongoose';

// Wallet Schema
const WalletSchema = new Schema(
  {
    current_balance: { type: Number, default: 0.0 },
    credits: { type: Number, default: 10 },
    transaction_history: [
      {
        userId: String,
        transaction_ref: String,
        transaction_type: String,
        payment_for: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

export default WalletSchema;
