const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport")

const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const posts = require("./routes/api/posts");
const app = express();


//Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

// DB Config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//passwport middleware 
app.use(passport.initialize())

require('./config/passport')(passport)

//Use Routes

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
