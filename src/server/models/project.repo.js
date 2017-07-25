import { Project } from './index'

export default class ProjectRepo {
  static list() {
    return Project.findAll()
  }
}
