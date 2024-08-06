import { Router } from 'express';

const adsRouter = Router();

// Define Array of Ads image links and values
const allAds = [
  {
    title: 'Sponsored Ads 01',
    image:
      'https://res.cloudinary.com/dg0qc5gkl/image/upload/v1722946063/Joobz/sponsored-ad-01_swkgjg.png',
    inAppRoute: '',
  },
  {
    title: 'Sponsored Ads 02',
    image:
      'https://res.cloudinary.com/dg0qc5gkl/image/upload/v1722946064/Joobz/sponsored-ad-02_pkgu5y.png',
    inAppRoute: '',
  },
  {
    title: 'Sponsored Ads 03',
    image:
      'https://res.cloudinary.com/dg0qc5gkl/image/upload/v1722946063/Joobz/sponsored-ad-03_knfysx.png',
    inAppRoute: '',
  },
];

adsRouter.get('/all', (req, res) => {
  res.status(200).json({ allAds });
});

export default adsRouter;
