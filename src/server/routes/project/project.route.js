import express from 'express'
import { getAllEnvVars, rebuild, getBuildStatusForBranch, getAll, create } from '../../controllers/project.controller'

const router = express.Router() // eslint-disable-line new-cap

router.route('/')

router.get('/', getAll)
router.get('/builds', getBuildStatusForBranch)
router.post('/', create)
router.post('/rebuild', rebuild)
router.get('/envVars', getAllEnvVars)

export default router
