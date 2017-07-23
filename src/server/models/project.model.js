import mongoose from 'mongoose'
import uuidv4 from 'uuid/v4'

const ProjectSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, unique: true },
    org: { type: String },
    vcs: { type: String },
  },
  {
    timestamps: true,
  },
)

ProjectSchema.statics = {
  list({ skip = 0, limit = 100 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec()
  },
}

ProjectSchema.method({})

export default mongoose.model('Project', ProjectSchema)
