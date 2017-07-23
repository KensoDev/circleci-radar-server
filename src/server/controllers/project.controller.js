import Project from '../models/project.model'
import ProjectFetcher from '../models/project.fetcher'

function getAll(req, res, next) {
  Project.list().then(projects => {
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

  return Project.list().then(projects => {
    const fetcher = new ProjectFetcher(projects)
    Promise.all(fetcher.fetchAll()).then(results => {
      results.map(result => {
        const build = fetcher.getLatestBuildForBranch(result.name, branchName, result.result)
        builds.push(build)
      })
      return res.json(builds)
    })
  })
}

function create(req, res, next) {
  const name = req.body.name
  const org = req.body.org || Project.getDefaultOrganization()
  const vcs = req.body.vcs || Project.getDefaultvcsanization()

  let project = new Project({
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

export default {
  getAll,
  create,
  getBuildStatusForBranch,
}
