const express=require('express')
const articleRouter=require("./routes/articles")
const Article=require('./models/article')
const mongoose=require("mongoose")
const app=express()
app.use(express.urlencoded({extended:false}))
const dotenv=require("dotenv");
dotenv.config();
const methodOverride=require('method-override')
const port=process.env.PORT || 3002;
const username=process.env.MONGODB_USERNAME;
const password=process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.rbgpnkp.mongodb.net/blogDB`,{
useNewUrlParser:true,
useUnifiedTopology:true,
});
app.set('view engine','ejs')
app.use(methodOverride('_method'))

/*app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article1',
        createdAt: new Date(),
        description: 'Test1 description'
    }

    ]
    res.render("articles/index", { articles: articles })
})*/
app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({createdAt:'desc'})
    res.render("articles/index", { articles: articles })
})
app.use('/articles',articleRouter)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})