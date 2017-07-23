import express from 'express'
import validate from 'express-validation'
import paramValidation from './user.validations'
import userCtrl from '../../controllers/user.controller'

const router = express.Router() // eslint-disable-line new-cap

router.route('/') /** GET /api/users - Get list of users */.get(userCtrl.list)

router
  .route('/:userId')
  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)
  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove)

/** Load user when API with userId route parameter is hit */
// router.param('userId', userCtrl.load) - might not need this anymore because of cookies

export default router
