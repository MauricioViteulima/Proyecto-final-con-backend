import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Endpoint1 = sequelize.define(
  'Endpoint1',
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
    tableName: 'endpoint1',
    timestamps: false,
  },
)

export default Endpoint1
