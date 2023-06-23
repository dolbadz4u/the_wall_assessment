const mysql = require("mysql2");
const Constants = require("../config/database");

const dbconnection = mysql.createPool(Constants.DATABASE);

dbconnection.executeQuery = async (query) => {
    return new Promise((resolve, reject) => {
        dbconnection.query(query, (error, result) => {
            let response_data = { status: false, result: [], error: null };
            
            if(error){
                response_data.error = error;
            }
            else{
                response_data.status = true;
                response_data.result = result;
            }

            resolve(response_data);
        });
    });
}

module.exports = dbconnection;