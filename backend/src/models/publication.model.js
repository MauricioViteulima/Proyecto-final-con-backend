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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sellerId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'sellerId',
    },
    sellerName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'sellerName',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'disponible',
    },
    interestedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'interestedCount',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'createdAt',
    },
  },
  {
    tableName: 'publications',
    timestamps: false,
  },
)

export default Publication
