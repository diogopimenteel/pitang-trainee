import mongoose from 'mongoose';

const ShortenerSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    hits: { type: Number, default: 0 },
    metadata: [mongoose.Schema.Types.Mixed],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  {
    timestamps: true,
  },
);

const ShortenerModel = mongoose.model('shortener', ShortenerSchema);

export default ShortenerModel;
