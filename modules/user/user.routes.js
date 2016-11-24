const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const controller = require('./user.controller');

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.read);
router.post('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
