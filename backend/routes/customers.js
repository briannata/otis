const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const phone = Number(req.body.phone);
    const newCustomer = new Customer({phone});
    newCustomer.save()
        .then(() => res.json('Customer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;