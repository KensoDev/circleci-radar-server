import express from 'express'
import projectRoutes from './project/project.route'

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

router.use('/projects', projectRoutes)

export default router
