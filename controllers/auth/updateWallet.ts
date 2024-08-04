import { Request, Response, NextFunction } from 'express';
import { Wallet } from '../../models/models';

// Define verifyUser Middleware for protected routes
const updateWallet = async (req: Request, res: Response) => {
  // @ts-ignore
  const { walletId } = req.user;
  const { reference: Txreference, amount } = req.body;

  // A Safe Guard to prevent someone intercepting the request,
  // Will be to query the transaction from paystack using the
  // reference then getting the status and amount from there.
  // Not implemented.

  try {
    // Get Wallet from the DataBase.
    // and Update the wallet with Deposited sum
    const wallet = await Wallet.findOneAndUpdate(
      { _id: walletId },
      {
        // When doing incrementation of a field
        $inc: { currentBalance: amount },
        $push: {
          transactions: {
            amount: amount,
            transactionType: 'Deposit',
            service: '',
            date: new Date().toISOString(),
          },
        },
      },
      { new: true }
    );

    if (wallet) {
      // Return Success - Wallet
      return res.status(200).json({
        success: true,
        message: 'Updated',
      });
    } else {
      // If wallet not found
      throw new Error('Wallet not found.');
    }

    // Error handling
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unable to Update Wallet.',
      wallet: null,
    });
  }
};

export default updateWallet;
