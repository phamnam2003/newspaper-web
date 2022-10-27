const express = require('express');
const app = express();
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const bodyParser = require('body-parser');
const db = require('./config/db/database');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use(express.json());
// HTTP logger
app.use(morgan('combined'));

// Connect to DB
db.authenticate()
    .then(() => console.log('Database is connected...'))
    .catch(err => console.log(err))

// Template Engine
app.engine('hbs', handlebars.engine({ 
    extname: 'hbs',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        timePost: (passedString, startString, endString) => {
            // convert to String and substring
            var theString = passedString.toString().substring(startString, endString);
            const daysEng = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const monthEng = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let weakday = theString.substring(0, 3);
            let day = theString.substring(8, 10);
            let month = theString.substring(4, 7);
            let year = theString.substring(10, 15);
            let hour = theString.substring(17);

            // day
            for (let i = 0; i< daysEng.length; i++) {
                if (weakday === daysEng[i]) {
                    weakday = `Thứ ${i + 1}`;
                    break;
                }
            }

            // month
            for (let i = 0; i< monthEng.length; i++) {
                if (month == monthEng[i]) {
                    month = `tháng ${i}`;
                    break;
                }
            }

            // hour
            hour = hour.toString().replace(':', ' giờ ') + ' phút';

            theString = `${weakday}, ngày ${day} ${month} năm ${year}`
            // return String time
            return new Handlebars.SafeString(theString);
        },
        kindOfNews: (category) => {
            var kind = '';
            if (category == 'politics') {
                kind = 'Chính trị';
            }
            else if (category == 'medical') {
                kind = 'Y tế';
            }
            else if (category == 'sports') {
                kind = 'Thể thao';
            }
            else if (category == 'military') {
                kind = 'Quân sự';
            }
            else if (category == 'enviroment') {
                kind = 'Môi trường';
            }
            else if (category == 'education') {
                kind = 'Giáo dục';
            }
            return kind;
        },
        subString: (passedString, startString, endString) => {
            var theString = passedString.toString().substring(startString, endString) + '...';
            return new Handlebars.SafeString(theString);
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// routes init
route(app);

app.listen(port, (req, res) => {
    console.log(`Connected to http://localhost:${port}`);
});
