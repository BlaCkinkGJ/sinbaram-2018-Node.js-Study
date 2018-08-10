const mysql      = require('mysql2');
const _connection = mysql.createConnection({
    user : 'root',
    password : 'tlswlgmd12',
    database : 'mydb',
    port : 3306,
    ssl : true
});


class DB {
    constructor() {
        this.connection = _connection;
        this.tableName  = 'post';

        this.connection.connect((err) => {
            if (err) {
                console.log("Connection error!");
                console.log(err);
            } else {
                console.log("Connection Established");
            }
        });
    }
    getPosts(queryParam = "title, image, author", callback) {
        let sql = 'SELECT ' + queryParam + ' FROM ' + this.tableName;
        this.connection.query(sql, (err, posts, fields) => {
            callback(err, posts);
        });
    }
    insertPost(queryParam = "title, image, author", insertParams, callback) {
        let sql = 'INSERT INTO ' + this.tableName + ' ' + queryParam + ' Values(?, ?, ?)';
        let params = insertParams;
        this.connection.query(sql, params, (err ,posts, fields) => {
            callback(err, posts);
        });
    }
}

module.exports = { DB : new DB() };