const express = require("express");
const router = express.Router();
const { getOrder, putOrder, postOrder, deleteOrder } = require('../controllers/orderMedicineController');
   
router
    .route('/')
    .get(getOrder) 
    .post(postOrder)

router.route('/:id')
    .put(putOrder)
    .delete(deleteOrder);

module.exports = router;
// return router;