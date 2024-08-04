import { Schema } from 'mongoose';

// Wallet Schema
const WalletSchema = new Schema(
  {
    current_balance: { type: Number, default: 0.0 },
    transaction_history: [
      {
        userId: String,
        transaction_ref: String,
        transaction_status: String,
        transaction_message: String,
        payment_for: String,
      },
    ],
  },
  { timestamps: true }
);

export default WalletSchema;
