export default class Build {
  constructor(name, buildObject) {
    this.name = name
    this.status = buildObject.status
    this.build_num = buildObject.build_num
    this.build_url = buildObject.build_url
    this.commit_url = buildObject.commit_url
  }
}
