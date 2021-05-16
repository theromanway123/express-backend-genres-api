# RESTful API CRUD using Express.js and JOI
\
This api allows basic CRUD operations on a mock database which stores genres.\
Checkout mockdata.js to see data structure\
\
\
Helps me understand the basics of using Express.js with Joi.js for input validation using schema\
\
#Usage\
\
GET /api/overview : homepage\
GET /api/generes (all) : get all generes\
GET /api/generes/{genre name} : get information regarding a particular genere\
POST /api/generes/ : create a new genere\
PUT /api/generes/ :replace the genere\
DELETE /api/generes/{genere name} :delete the genere\
\
\
Shoutout to Mosh Hamedamni for this amazing tutorial of Node.js\

# Instructions

1) Install dependencies using \
```bash
  npm init
```
2) Run server.js \
```bash
   node server.js
```
or (for development server)
```bash
  nodemon server.js 
```


