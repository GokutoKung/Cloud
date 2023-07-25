const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const connection = mysql.createConnection({
  host: 'database-1.c4ge7ygbihr4.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'DUKjfy15',
  database: 'sop'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database successfully!');
  }
});

//global var
shiftKey = 10

//encrypt
function encrypt(plainText) {
  let cipherText = "";
  for (let i = 0; i < plainText.length; i++) {
    let ascii = plainText.charCodeAt(i);
    ascii += shiftKey;
    cipherText += String.fromCharCode(ascii);
  }
  return cipherText;
}
//decrypt
function decrypt(cipherText) {
  let plainText = "";
  for (let i = 0; i < cipherText.length; i++) {
    let ascii = cipherText.charCodeAt(i);
    ascii -= shiftKey;
    plainText += String.fromCharCode(ascii);
  }
  return plainText;
}

//get All user
app.get('/user', (req, res) => {
  connection.query('SELECT * FROM user', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//Login
app.post('/user/login', (req, res) => {
  const { email, password } = req.body
  const encryptPassword = encrypt(password);

  connection.query('SELECT * FROM user where email = ? and password = ?', [email, encryptPassword], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      rows[0].password = decrypt(rows[0].password);
      res.send(rows);
    }
  });
});

//create User
app.post('/user', (req, res) => {
  const { email, password, name, surname } = req.body;
  const encryptedPassword = encrypt(password);
  connection.query('INSERT INTO user (user_id, email, password, name, surname, role, rest_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [uuidv4(), email, encryptedPassword, name, surname, "User", null], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//update User
app.put('/user', (req, res) => {
  const { user_id, email, password, name, surname, role, rest_id } = req.body;
  const encryptedPassword = encrypt(password);
  connection.query('UPDATE user SET email = ?, password = ?, name = ?, surname = ?, role = ?, rest_id = ? WHERE user_id = ?',
    [email, encryptedPassword, name, surname, role, rest_id, user_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//get promotion
app.get('/promotion', (req, res) => {
  connection.query('SELECT * FROM promotion', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create promotion
app.post('/promotion', (req, res) => {
  const { code, quantity, discount } = req.body;
  connection.query('INSERT INTO promotion (promotion_id, code, quantity, discount) VALUES (?, ?, ?, ?)',
    [uuidv4(), code, quantity, discount], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//update promotion
app.put('/promotion', (req, res) => {
  const { promotion_id, code, quantity, discount } = req.body;
  connection.query('UPDATE promotion SET code = ?, quantity = ?, discount = ? WHERE promotion_id = ?',
    [code, quantity, discount, promotion_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//delete promotion
app.delete('/promotion', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM promotion WHERE promotion_id = ?', [id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//usePromotionCode
app.put('/promotion/useCode', (req, res) => {
  const { code } = req.body;
  connection.query('SELECT * FROM promotion where code = ?', [code], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
//       res.send(rows);
    }
    const { quantity, discount } = rows[0]
    if (quantity >= 1){
      connection.query('UPDATE promotion SET quantity = ? WHERE code = ?', [quantity - 1, code], (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Internal server error');
        }
        res.send({discount: discount});
      });
    }
    else {
      res.send({discount: 0})
    }
  });
});

//get food
app.get('/course/food', (req, res) => {
  connection.query('SELECT * FROM food', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//get menu
app.get('/course', (req, res) => {
  connection.query('SELECT * FROM course', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create menu
app.post('/course', (req, res) => {
  const { name, image, price, menu1, amount1, menu2, amount2, menu3, amount3, menu4, amount4, menu5, amount5 } = req.body;
  connection.query('INSERT INTO course (course_id, name, image, price, menu1, amount1, menu2, amount2, menu3, amount3, menu4, amount4, menu5, amount5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [uuidv4(), name, image, price, menu1, amount1, menu2, amount2, menu3, amount3, menu4, amount4, menu5, amount5], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//update menu
app.put('/course', (req, res) => {
  const { course_id, name, image, price, menu1, amount1, menu2, amount2, menu3, amount3, menu4, amount4, menu5, amount5 } = req.body;
  connection.query('UPDATE course SET name = ?, image = ?, price = ?, menu1 = ?, amount1 = ?, menu2 = ?, amount2 = ?, menu3 = ?, amount3 = ?, menu4 = ?, amount4 = ?, menu5 = ?, amount5 = ? WHERE course_id = ?',
    [name, image, price, menu1, amount1, menu2, amount2, menu3, amount3, menu4, amount4, menu5, amount5, course_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//delete menu
app.delete('/course', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM course WHERE course_id = ?', [id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//get review
app.post('/review/get', (req, res) => {
  const { rest_id } = req.body;
  connection.query('SELECT * FROM review where rest_id = ?', [rest_id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create review
app.post('/review', (req, res) => {
  const { comment, rest_id, user_id, rating } = req.body;
  connection.query('INSERT INTO review (rv_id, comment, rest_id, user_id, rating) VALUES (?, ?, ?, ?, ?)',
    [uuidv4(), comment, rest_id, user_id, rating], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//update review
app.put('/review', (req, res) => {
  const { rv_id, comment, rest_id, user_id, rating } = req.body;
  connection.query('UPDATE review SET comment = ?, rest_id = ?, user_id = ?, rating = ? WHERE rv_id = ?',
    [comment, rest_id, user_id, rating, rv_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//delete review
app.delete('/review', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM review WHERE rv_id = ?', [id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//get rating
app.post('/review/rating', (req, res) => {
  const { rest_id } = req.body;
  connection.query('SELECT avg(rating) as rating FROM review where rest_id = ?', [rest_id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//get restaurant
app.get('/rest', (req, res) => {
  connection.query('SELECT * FROM restaurant', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//update rating of restaurant
app.put('/rest', (req, res) => {
  const { rest_id, rating } = req.body;
  connection.query('UPDATE restaurant SET rating = ? WHERE rest_id = ?',
    [rating, rest_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//get seat
app.post('/seat', (req, res) => {
  const { id } = req.body;
  connection.query('SELECT * FROM seat where rest_id = ? order by table_no', [id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//update seat
app.put('/seat', (req, res) => {
  const { table_id, status, rest_id, table_no } = req.body;
  connection.query('UPDATE seat SET status = ?, rest_id = ?, table_no = ? WHERE table_id = ?',
    [status, rest_id, table_no, table_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//get reservation
app.get('/reservation', (req, res) => {
  connection.query('SELECT * FROM reservation', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create reservation
app.post('/reservation', (req, res) => {
  const { booking_date, eating_date, eating_time, user_id, status, rest_id } = req.body;
  const id = uuidv4();
  connection.query('INSERT INTO reservation (reserv_id, booking_date, eating_date, eating_time, user_id, status, rest_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, booking_date, eating_date, eating_time, user_id, "Waiting", rest_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send({ resv_id: id });

      }
    });
});

//update reservation
app.put('/reservation', (req, res) => {
  const { resver_id, booking_date, eating_date, eating_time, user_id, status, rest_id } = req.body;
  connection.query('UPDATE seat SET booking_date = ?, eating_date = ?, eating_time = ?, user_id = ?, status = ?, rest_id = ? WHERE reserv_id = ?',
    [booking_date, eating_date, eating_time, user_id, status, rest_id, reserv_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//get order
app.get('/order', (req, res) => {
  connection.query('SELECT * FROM ordercourse', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create order
app.post('/order', (req, res) => {
  const { price, discount, total_price, reserv_id } = req.body;
  connection.query('INSERT INTO ordercourse (order_id, price, discount, total_price, reserv_id) VALUES (?, ?, ?, ?, ?)',
    [uuidv4(), price, discount, total_price, reserv_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//get payment
app.get('/payment', (req, res) => {
  connection.query('SELECT * FROM payment', (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create payent
app.post('/payment', (req, res) => {
  const { image, date, time, price, reserv_id } = req.body;
  connection.query('INSERT INTO payment (payment_id, image, date, time, price, reserv_id) VALUES (?, ?, ?, ?, ?, ?)',
    [uuidv4(), image, date, time, price, reserv_id], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

//get online
app.post('/online/get', (req, res) => {
  const { user_id } = req.body;
  connection.query('SELECT * FROM online where user_id = ?', [user_id], (err, rows, fields) => {
    if (err) {
      console.error('Error executing query: ', err);
    } else {
      res.send(rows);
    }
  });
});

//create Online
app.post('/online', (req, res) => {
  const { course_name, user_id, rider, price } = req.body;
  connection.query('INSERT INTO online (online_id, course_name, user_id, rider, price, status) VALUES (?, ?, ?, ?, ?)',
    [uuidv4(), course_name, user_id, rider, price, "Delivery"], (err, rows, fields) => {
      if (err) {
        console.error('Error executing query: ', err);
      } else {
        res.send(rows);
      }
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});