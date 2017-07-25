export default class Build {
  constructor(name, buildObject) {
    this.name = name
    this.status = buildObject.status
    this.build_num = buildObject.build_num
    this.build_url = buildObject.build_url
    this.org = buildObject.username
    this.build_time_millis = buildObject.build_time_millis
    this.vcs_revision = buildObject.vcs_revision
    this.vcs_url = buildObject.vcs_url
    this.user = buildObject.user
    this.subject = buildObject.subject
  }
}
