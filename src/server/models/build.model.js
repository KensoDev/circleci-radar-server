export default class Build {
  constructor(name, buildObject) {
		this.name = name;
		this.status = buildObject.status;
		this.build_num = buildObject.build_num;
  }
}
