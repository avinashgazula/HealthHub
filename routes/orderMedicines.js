const express = require("express");
const router = express.Router();
const { getOrder, putOrder, postOrder, deleteOrder, getUserOrder } = require('../controllers/orderMedicineController');
const { getPharmacyList}  = require('../controllers/pharmacyListController');

router.route('/getPharmacyList').get(getPharmacyList)

router.route('/getOrders').get(getOrder);

router
    .route('/')
    .get(getOrder) 
    .post(postOrder)

router.route('/:id')
    .get(getUserOrder)
    .put(putOrder)
    .delete(deleteOrder);

module.exports = router;
// return router;