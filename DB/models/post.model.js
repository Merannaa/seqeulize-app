import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.model.js";

const Post = sequelize.define(
    "Post",
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
            },
        title:{
            type:DataTypes.STRING(55),
            allowNull:false
            },
        content:{
            type:DataTypes.STRING,
            allowNull:false,
            },
        author:{
            type:DataTypes.STRING,
            allowNull:false
            }
    },
    {
        timestamp:true,
        paranoid:true,
        deletedAt:"softDeleted"
    }
);
User.hasMany(Post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Post.belongsTo(User)
export default Post;