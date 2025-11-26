import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Problems route not implemented yet' });
});

export default router;
