import express from 'express'
import { getBuildStatusForBranch, getAll, create } from '../../controllers/project.controller'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')

router.get('/', getAll).get('/builds', getBuildStatusForBranch).post('/', create)

export default router
