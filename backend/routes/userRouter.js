import express from 'express'
import { editProfile, followOrUnfollow, getAllTheFollowers, getAllTheFollowing, getProfile, getSuggestedUsers, login, logout, register } from '../controllers/userControllers.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import upload from '../middleware/multer.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated,getProfile)
router.route('/profile/edit').post(isAuthenticated,upload.single('profilePicture'),editProfile)
router.route('/suggested').get(isAuthenticated,getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated,followOrUnfollow)
router.route('/allfollowers/:id').get(isAuthenticated,getAllTheFollowers)
router.route('/allfollowing/:id').get(isAuthenticated,getAllTheFollowing)

export default router