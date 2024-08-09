import { Request, Response } from 'express';
import { Wallets } from '../../models/models';

const updateWallet = async (req: Request, res: Response) => {
  // @ts-ignore
  const { wallet, _id } = req.user;
  const { reference: Txreference, amount } = req.body;

  try {
    // Get Wallet from the DataBase.
    // and Update the wallet with Deposited sum
    const walletUpdate = await Wallets.findOneAndUpdate(
      { _id: wallet },
      {
        $inc: { current_balance: amount },
        $push: {
          transaction_history: {
            userId: _id,
            transaction_ref: Txreference,
            transaction_type: 'Deposit',
            payment_for: 'Funding Account',
            date: new Date().toISOString(),
          },
        },
      }
    ).select('current_balance transaction_history');

    if (walletUpdate) {
      return res.status(200).json({
        success: true,
        message: 'Updated',
        wallet: walletUpdate,
      });
    } else {
      throw new Error('Wallet not found.');
    }

    // Error handling
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to Update Wallet.',
      wallet: null,
    });
  }
};

export default updateWallet;
