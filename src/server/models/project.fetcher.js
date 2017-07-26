import fetch from 'node-fetch'
import { Project } from './index'
import Build from './build'

export default class ProjectFetcher {
  constructor(projects) {
    this.projects = projects
    this.token = process.env.TOKEN
  }

  fetchAllEnvVars(envVarName) {
    return this.projects.map(project => {
      const requestUrl = `https://circleci.com/api/v1.1/project/${project.vcs}/${project.org}/${project.name}/envvar/${envVarName}?circle-token=${this.token}`

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

  fetchAllForBranch(branchName) {
    return this.projects.map(project => {
      const branch = encodeURIComponent(branchName)

      const requestUrl = `https://circleci.com/api/v1.1/project/${project.vcs}/${project.org}/${project.name}/tree/${branch}?circle-token=${this.token}`

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

  updateAllEnvVars(envVarName, envVarValue) {
    return this.projects.map(project => {
      return new Promise((resolve, reject) => {
        const requestUrl = `https://circleci.com/api/v1.1/project/${project.vcs}/${project.org}/${project.name}/envvar?circle-token=${this.token}`

        const data = {
          name: envVarName,
          value: envVarValue,
        }

        return fetch(requestUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(res => {
            resolve(res)
          })
      })
    })
  }

  rebuild(name, buildNum) {
    return new Promise((resolve, reject) => {
      return Project.findOne({
        where: {
          name,
        },
      }).then(project => {
        const url = `https://circleci.com/api/v1.1/project/${project.vcs}/${project.org}/${project.name}/${buildNum}/retry?circle-token=${this.token}`

        return fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            resolve(res)
          })
      })
    })
  }

  getLatestBuildForBranch(projectName, branchName, buildObject) {
    console.log('BuildObject')
    console.log(buildObject)
    const build = new Build(projectName, buildObject[0])
    console.log(build)

    return build
  }
}
