const express = require('express');
const mysql   = require('mysql');

const router  = express.Router();

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306       ,
    user     : 'root'     ,
    password : '1234'     ,
    database : 'board'    ,
    insecureAuth : true
});

connection.connect();

router.get('/',(req, res, next)=>{
    res.redirect('/board/1');
});

router.get('/write', (req, res, next)=>{
    res.render('write', {title: '글 쓰기'});
}); // 순서 유의하도록 할 것 page 보다 먼저 오면 안됨.

router.get('/:page', (req, res, next)=>{
    let query = connection.query(
        'SELECT idx, title, writer, hit, DATE_FORMAT(moddate, "%Y/%m/%d %T") AS moddate FROM board1 ORDER BY idx DESC',
        (err, rows)=> {
            if(err) console.log(err)
            console.log('rows : ' + rows);
            res.render('board', {title:'Board List', rows : rows});
        });
});

router.get('/read/:idx', (req, res, next)=>{
    let idx = req.params.idx;
    console.log("idx: "+idx);

    connection.beginTransaction((err)=>{
        if(err) console.log(err);
        connection.query("UPDATE board1 SET hit=hit+1 WHERE idx=?",[idx],(err)=>{
            if(err){
                console.log(err);
                connection.rollback(()=>{
                    console.error('rollback error!');
                }); // end of rollback
            } // end of if
        }); // end of query

        connection.query('SELECT idx, title, content, writer, hit, DATE_FORMAT(moddate, "%Y/%m/%d %T")'
                        + ' AS moddate, DATE_FORMAT(regdate, "%Y/%m/%d %T") as regdate FROM board1 WHERE idx=?'
                        , [idx], (err, rows, next)=> {
            // start query
            if(err){
                console.log(err);
                connection.rollback(()=>{
                    console.error('rollback error!');
                }); // end of rollback
            }
            else{
                connection.commit((err)=>{
                    if(err) console.log(err);
                    res.render('read', { title: rows[0].title, rows : rows});
                }); // end of commit
            } // end of if
        }); // end of query

    }); // end of transaction
}); // end of router


router.post('/write', (req, res, next)=>{
    let body     = req.body;

    let writer   = body.writer;
    let title    = body.title;
    let content  = body.content;
    let password = body.password;

    connection.beginTransaction((err)=>{
        if(err) console.log(err);

        connection.query('INSERT INTO board1(title, writer, content, password) VALUES(?, ?, ?, ?)'
                        , [title, writer, content, password]
                        , (err)=>{
            if(err){
                console.log(err);
                connection.rollback(()=>{
                    console.error('rollback error!');
                }); // end of rollback
            }
        }); // end of query

        connection.query("SELECT LAST_INSERT_ID() AS idx", (err, rows)=>{
             if(err){
                console.log(err);
                connection.rollback(()=>{
                    console.error('rollback error!');
                }); // end of rollback
             }
             else{
                connection.commit((err)=>{
                    if(err) console.log(err);
                    console.log("rows : " + rows);
                    let idx = rows[0].idx;
                    res.redirect('/board/read'+idx);
                }); // end of commit
             } // end of if
        }); // end of query
    }) // end of transaction
});

module.exports = router;
