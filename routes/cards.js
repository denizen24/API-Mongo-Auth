const { Router } = require('express');
const { createCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/likeCard');
const { dislikeCard } = require('../controllers/dislikeCard');

const Card = require('../models/card');

const router = Router();
const errRoute = { message: 'Нет карточки с таким id' };

router.get('/', (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.delete('/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send(errRoute));
});

router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
