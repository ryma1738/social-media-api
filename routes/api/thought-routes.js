const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    postNewThought,
    updateOneThought,
    deleteOneThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

router.route('/')
.get(getAllThoughts)
.post(postNewThought);

router.route('/:id')
.get(getOneThought)
.put(updateOneThought)
.delete(deleteOneThought);

router.route('/:id/reactions')
.post(addReaction);

router.route('/:id/reactions/:reactionId')
.delete(deleteReaction);