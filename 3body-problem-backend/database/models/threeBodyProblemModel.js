import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const threeBodyProblemSchema = new mongoose.Schema({
  simulationId: {
    type: String,
    default: uuid,
  },
  masses: {
    type: [Number],
    required: true,
  },
  velocities: {
    type: [Number],
    required: true,
  },
  positions: {
    type: [Number],
    required: true,
  },
  timeScaleFactor: {
    type: Number,
    required: true,
  },
  dimensionless: {
    type: Boolean,
    required: true,
  },
  // Slider settings
  massSlider: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
  },
  timeScaleFactorSlider: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
  },
  // Other settings
  paleOrbitalPaths: {
    type: Boolean,
    required: true,
  },
  densities: {
    type: [Number],
    required: true,
  },
  // Output values
  diameters: {
    type: [Number],
    required: true,
  },
  largestDistanceMeters: {
    type: Number,
    required: true,
  },
  isDeleted:{
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const threeBodyProblemModel = mongoose.model('ThreeBodyProblem', threeBodyProblemSchema);

export default threeBodyProblemModel;