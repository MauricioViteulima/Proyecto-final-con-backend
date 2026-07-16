import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Publication = sequelize.define(
  'Publication',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    datos1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    datos2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    datos3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'publications',
    timestamps: false,
  },
)

export default Publication
