var express = require('express');
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { people: [{image: 'logo.jpg', title: 'Test', text: 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test'}] });
});

app.get('/sendFile', (req, res) => {
    res.render('upload');
});

app.post('/sendFile', upload.any(), (req, res) => {
    res.sendStatus(200);
});

app.listen(3000, () => console.log("Listening on port 3000."));