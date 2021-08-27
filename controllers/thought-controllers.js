const { Thought } = require('../models');

const thoughtControllers = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate('Thoughts')
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getOneThought({ params }, res) {
        Thought.findOne({_id: params.id})
        .populate('Thoughts')
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No thought with that id was found!'});
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        });
    },
    postNewThought(req, res) {
        Thought.create(req.body)
        .then(dbData => res.json(dbData))
        .catch(err => {
            res.json(err);
        });
    },
    updateOneThought({ params, body }, res) {
        Thought.updateOne({_id: params.id}, body, { new: true, runValidators: true })
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'No Thought Found with that id!'});
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
    },
    deleteOneThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbData => res.json(dbData))
        .catch(err => {
            res.json(err)
        });
    },
    addReaction({params, body}, res) {
        // body should be: 
        Thought.findOneAndUpdate({_id: params.id}, {$push: {reactions: body}}, { new: true, runValidators: true})
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No thought with that id was found!'});
                return
            }
            res.json(dbData);
        }). catch(err => res.json(err));
    },
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.id}, {$pull: {reactions: [params.reactionId]}})
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No thought with that id was found!'});
                return
            }
            res.json(dbData);
        }). catch(err => res.json(err));
    }
}

module.exports = thoughtControllers;