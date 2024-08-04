import { Request, Response, NextFunction } from 'express';
import { Wallets } from '../../models/models';

// Define verifyUser Middleware for protected routes
const getWallet = async (req: Request, res: Response) => {
  // @ts-ignore
  const { walletId } = req.user;

  try {
    // Get Wallet from the DataBase.
    const userWallet = await Wallets.findById(String(walletId));

    if (userWallet) {
      // Return Success - Wallet
      return res.status(200).json({
        success: true,
        message: 'Wallet retrieved.',
        wallet: userWallet,
      });
    } else {
      // If wallet not found
      throw new Error('Wallet not found.');
    }

    // Error handling
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: 'Unable to retrieve Wallet.',
      wallet: null,
    });
  }
};

export default getWallet;
