import { Sequelize } from "sequelize";

export const sequelize= new Sequelize(
  "b8lyf8xobiw7bqxnou1t",
  "usymdmj47tb0psve",
  "7hkxq4NCejaB2Dv8kPNM",{
    host:"b8lyf8xobiw7bqxnou1t-mysql.services.clever-cloud.com",
    dialect:"mysql"
})

export const db_connection=async()=>{
  try {
    await sequelize.sync({alter:true,force:false});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

