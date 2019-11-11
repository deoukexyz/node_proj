const models = require('../models');
const subscriber = models.subscriber;

module.exports = {
    postContact: function (req, res) {
        try {
            subscriber.findOne({
                where: {
                    email: req.body.email
                }
            }).then(result => {
                if (!result) {
                    try {
                        let file = req.files.photo
                        file.mv("./uploads/" + file.name, function (req, res, next) {
                            console.log('successfully stored')
                        })
                        subscriber.create({
                            name: req.body.name,
                            email: req.body.email,
                            message: req.body.message,
                            photo: req.files.photo.name
                        })
                            .then(subsData => {
                                return res.status(200).send(subsData);
                            })
                    } catch (error) {
                        return res.status(500).send({ "Error": error });
                    }
                } else {
                    return res.status(400).send("Email Already exist")
                }
            })
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    getSubscriber: function (req, res, next) {
        console.log(req.params.email)
        try {
            subscriber.findOne(
                {
                    where: {
                        email: req.params.email
                    }
                }
            )
                .then(subs => {
                    console.log(subs);
                    const newLocal = subs.dataValues.photo;
                    subs.dataValues.photo = process.env.IMAGE_PATH + newLocal;
                    res.send([subs]);
                })
        } catch (error) {
            return res.status(500).send(error.type);
        }
    },
    patchSubscriber: function (req, res) {
        console.log(req.body);
        // if (req.files) {
        //     console.log('hello')
        // } else {
        //     console.log('qwer')
        // }
        try {
            if (req.files) {
                let file = req.files.photo
                file.mv("./uploads/" + file.name, function (req, res, next) {
                    console.log('successfully Updated')
                })
                subscriber.update({
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message,
                    photo: req.files.photo.name
                }, {
                    where: {
                        email: req.body.subEmail
                    }
                }
                )
                    .then(result => {
                        console.log(result);
                        return res.status(200).send(result);

                    })
            } else {
                subscriber.update({
                    name: req.body.name,
                    email: req.body.email,
                    message: req.body.message
                }, {
                    where: {
                        email: req.body.subEmail
                    }
                })
                    .then(result => {
                        console.log(result);
                        return res.status(200).send(result);
                    })
            }
        }
        catch (error) {
            return res.status(500).send(error);
        }
    },
    postFileToSubscriber: function (req, res) {
        try {
            subscriber.create({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
                photo: req.file.filename
            })
                .then(result => {
                    res.status(200).send(result);
                    console.log(result);
                })
        }
        catch (error) {
            return console.log(error);
        }
    }

}