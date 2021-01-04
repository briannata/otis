const router = require('express').Router();
let Data = require('../models/data.model');

router.route('/').get((req, res) => {
    Data.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const phone = Number(req.body.phone);
    const num_of_people = Number(req.body.num_of_people);
    const stay_length = Number(req.body.stay_length);
    const wheelchair = Boolean(req.body.wheelchair);
    const childsupport = Boolean(req.body.childsupport);

    const newData = new Data({
        phone,
        num_of_people,
        stay_length,
        wheelchair,
        childsupport,
    }); 

    newData.save()
    .then(() => res.json('Data added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Data.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Data.findByIdAndDelete(req.params.id)
        .then(() => res.json('Data deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Data.findById(req.params.id)
        .then(data => {
            data.phone = Number(req.body.phone);
            data.num_of_people = Number(req.body.num_of_people);
            data.stay_length = Number(req.body.stay_length);
            data.wheelchair = Boolean(req.body.wheelchair);
            data.childsupport = Boolean(req.body.childsupport);

            data.save()
                .then(() => res.json('Data updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
}); //make other methods like this that only update one thing

module.exports = router;