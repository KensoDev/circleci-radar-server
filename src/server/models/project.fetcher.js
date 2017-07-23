import fetch from 'node-fetch'
import { Project } from './index'
import Build from './build'

export default class ProjectFetcher {
  constructor(projects) {
    this.projects = projects
    this.token = process.env.TOKEN
  }

  static list() {
    return Project.findAll()
  }

  fetchAll() {
    return this.projects.map(project => {
      const requestUrl = `https://circleci.com/api/v1.1/project/${project.vcs}/${project.org}/${project.name}?circle-token=${this.token}`

      return new Promise((resolve, reject) => {
        fetch(requestUrl).then(res => res.json()).then(result => {
          resolve({
            name: project.name,
            result: result,
          })
        })
      })
    })
  }

  getLatestBuildForBranch(projectName, branchName, builds) {
    function* getBuildWithBranchName(branchName, builds) {
      for (let currentBuild of builds) {
        if (currentBuild.branch === branchName) {
          yield currentBuild
        }
      }
    }

    const buildObject = getBuildWithBranchName(branchName, builds).next().value
    const build = new Build(projectName, buildObject)
    console.log(build)

    return build
  }
}
