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
            // Insert data to database
            Newspaper.create({ title,description, content, category,imgavatar,imgdesc })
                .then(() => res.redirect('/'))
                .catch(next)
        }
    }
}

module.exports = new AddController;