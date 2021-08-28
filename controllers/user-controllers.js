const { User } = require('../models');

const UserControllers = {
    getAllUsers(req, res) {
        User.find({})
        .populate('thoughts')
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getOneUser({ params }, res) {
        User.findOne({_id: params.id})
        .populate('thoughts')
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No user with that id was found!'});
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({message: 'Could not find user!'})
        });
    },
    postNewUser(req, res) {
        User.create(req.body)
        .then(dbData => res.json(dbData))
        .catch(err => {
            res.json(err);
        });
    },
    updateOneUser({ params, body }, res) {
        User.updateOne({_id: params.id}, body, { new: true, runValidators: true })
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'No User Found with that id!'});
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },
    deleteOneUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbData => res.json(dbData))
        .catch(err => {
            res.json(err)
        });
    },
    addFriend({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id}, { $push: { friends: params.friendId}})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.json(err);
        });

    },
    deleteFriend({ params }, res) {
        User.updateOne({_id: params.id}, { $pull: {friends: params.friendId }})
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    }
}

module.exports = UserControllers;