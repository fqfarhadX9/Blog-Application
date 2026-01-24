require ("dotenv").config();
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser");
const checkAuthenticationCookie = require("./middlewares/authentication");
const blogRoute = require("./routes/blog");
const Blogs = require("./models/blog")

const PORT = process.env.PORT ||8001;
const app = express();

mongoose.connect(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get("/", async(req, res) => {
    const allblogs = await Blogs.find({});
    console.log("blogs:", allblogs);
    return res.render("home",{
        user: req.user,
        blogs: allblogs
    });
})
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));