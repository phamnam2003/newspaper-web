const Sequelize  = require('sequelize');
const Newspaper = require('../models/Newspaper');

class AddController {
    form (req, res, next) {
        res.render('add');
    }

    add (req, res, next) {
        let { title, description, content, category, imgavatar, imgdesc } = req.body;
        let errors = [];

        // Validate Fields
        if (!title) {
            errors.push({text: 'Phần tiêu đề bài viết đang để trống'});
        }
        if (!description) {
            errors.push({text: 'Phần mô tả bài viết đang để trống'});
        }
        if (!content) {
            errors.push({text: 'Phần nội dung bài viết đang để trống'});
        }
        if (!category) {
            errors.push({text: 'Phần thể loại bài viết đang để trống'});
        }
        if (!imgavatar) {
            errors.push({text: 'Đường link ảnh chính bài viết đang để trống'});
        }
        if (!imgdesc) {
            errors.push({text: 'Đường link ảnh phụ bài viết đang để trống'});
        }

        // Check for Error
        if (errors.length > 0) {
            res.render('add', {
                errors,
                title,description, content, category,imgavatar,imgdesc
            })
        }
        else {
            const politics = ['Chính trị', 'chính trị', 'chinh tri', 'Chinh tri', 'Chính Trị', 'chính Trị', 'chinh Tri', 'ct', 'CT', 'cT', 'Ct', ];
            const military = ['Quân sự', 'quân sự', 'quân Sự', 'quan su', 'Quan Su', 'Quan su', 'qs', 'Qs', 'qS', 'QS'];
            const education = ['Giáo dục', 'giáo dục', 'giáo Dục', 'Giao duc', 'giao Duc', 'Giao Duc', 'gd', 'Gd', 'GD', 'gD'];
            const enviroment = ['Môi trường', 'môi trường', 'môi Trường', 'Moi truong', 'Moi Truong', 'moi Truong', 'mt', 'Mt', 'MT', 'mT'];
            const sport = ['Thể thao', 'Thể Thao', 'thể thao', 'the thao', 'The thao', 'The Thao', 'tt', 'TT', 'Tt', 'tT'];
            const medical = ['Y tế', 'y tế', 'y Tế', 'Y te', 'Y Te', 'y te', 'y Te', 'yt', 'Yt', 'YT', 'yT'];

            if (politics.includes(category)) {
                category = 'polictics';
            }
            else if (military.includes(category)) {
                category = 'military';
            }
            else if (education.includes(category)) {
                category = 'education';
            }
            else if (enviroment.includes(category)) {
                category = 'enviroment';
            }
            else if (sport.includes(category)) {
                category = 'sports';
            }
            else if (medical.includes(category)) {
                category = 'medical';
            }

            // Insert data to database
            Newspaper.create({ title,description, content, category,imgavatar,imgdesc })
                .then(() => res.redirect('/'))
                .catch(next)
        }
    }
}

module.exports = new AddController;