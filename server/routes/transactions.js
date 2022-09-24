import { Router } from 'express';
import Transaction from '../models/Transaction.js';
import passport from 'passport';

const router = Router();

// passport middleware applied to this route
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // sorting -1 means: newest to the top
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transaction });
  }
);

router.post('/', async (req, res) => {
  const { amount, description, date } = req.body;

  const transaction = new Transaction({
    amount,
    description,
    date,
  });

  await transaction.save();

  res.json({ msg: 'saved' });
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  await Transaction.updateOne({ _id: id }, { $set: req.body });
  res.json({ msg: 'successfully updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await Transaction.findOneAndDelete({ _id: id });

  res.json({ msg: 'Success' });
});

export default router;
