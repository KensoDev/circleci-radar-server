import { Project } from '../models'
import ProjectFetcher from '../models/project.fetcher'
import ProjectRepo from '../models/project.repo'

function getAll(req, res, next) {
  ProjectRepo.list().then(projects => {
    res.json(projects)
  })
}

// The CircleCI endpoin returns 30 of the latest builds.
// We need to search for the first one in the list that matches our branch name.
// If the branch name is not in the lastest 30 builds (possible), we are going to report an UNKNOWN status.
// If the branch IS in the latest builds, we are going to report the status of the build.
function getBuildStatusForBranch(req, res, next) {
  const branchName = req.query.branchName
  const builds = []

  return ProjectRepo.list().then(projects => {
    const fetcher = new ProjectFetcher(projects)
    Promise.all(fetcher.fetchAllForBranch(branchName)).then(results => {
      results.map(result => {
        const build = fetcher.getLatestBuildForBranch(result.name, branchName, result.result)
        builds.push(build)
      })
      return res.json(builds)
    })
  })
}

function getAllEnvVars(req, res, next) {
  const envVarName = req.query.name;
  const envVars = []

  return ProjectRepo.list().then(projects => {
    const fetcher = new ProjectFetcher(projects)
    Promise.all(fetcher.fetchAllEnvVars(envVarName)).then(results => {
      results.map(result => {
        const envVar = {
          projectName: result.name,
          envVarValue: result.result.value,
        }
        envVars.push(envVar)
      })
      return res.json(envVars)
    })
  });
}

function create(req, res, next) {
  const name = req.body.name
  const org = req.body.org
  const vcs = req.body.vcs

  let project = Project.build({
    name,
    org,
    vcs,
  })

  project
    .save()
    .then(project => {
      res.json({
        success: true,
      })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err,
      })
    })
}

function rebuild(req, res, next) {
  const name = req.body.name
  const buildNum = req.body.buildNum

  const fetcher = new ProjectFetcher([]);

  return fetcher.rebuild(name, buildNum).then((resp) => {
    res.json({ success: true })
  });
}

export default {
  getAll,
  create,
  getBuildStatusForBranch,
  rebuild,
  getAllEnvVars,
}
