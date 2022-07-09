const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');
const listsController = require('../controllers/listsController');
const cardsController = require('../controllers/cardsController');
const {
  validateBoard,
  validateList,
  validateEditList,
  validateCard,
  validateEditCard,
} = require('../validators/validators');

router.get('/boards', boardsController.getBoards);

router.get('/boards/:id', boardsController.getBoard);

router.post('/boards', validateBoard, boardsController.createBoard);

router.post('/lists', validateList, listsController.createList);

router.put('/lists/:id', validateEditList, listsController.editList);

router.get('/cards/:id', cardsController.fetchCard);

router.post('/cards', validateCard, cardsController.createCard);

router.put('/cards/:id', validateEditCard, cardsController.editCard);

module.exports = router;
