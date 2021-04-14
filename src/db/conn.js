const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Jyotindra21:Jyotindra21@cluster0.tw2yb.mongodb.net/mytable?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Connection $uccessful 0K !`);
}).catch((e) => {
    console.log(`no connection`);
})


