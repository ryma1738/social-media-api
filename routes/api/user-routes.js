const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    postNewUser,
    updateOneUser,
    deleteOneUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

router.route('/')
.get(getAllUsers)
.post(postNewUser);

router.route('/:id')
.get(getOneUser)
.put(updateOneUser)
.delete(deleteOneUser);

router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;