const mysql = require('mysql2');
const MYSQL_CONFIG = require('../config/mysql.config');

const mysqlPool  = mysql.createPool(MYSQL_CONFIG);

const getUserList = () => {
    return new Promise((resolve, reject) => {
        mysqlPool.query('SELECT * FROM `user`', function (err, results, fields) {
            resolve(results)
        })
    })
};

const login = (account) => {
    return new Promise(async (resolve, reject) => {
        mysqlPool.query(`select * from user where account = '${account}' limit 1`, function (err, results, fields) {
            resolve(results)
        });
    })
};

module.exports = {
    getUserList, login
};
