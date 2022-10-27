const Sequelize  = require('sequelize');
const Newspaper = require('../models/Newspaper');

class SiteController {
    home (req, res, next) {
        Newspaper.findAll({ order: Sequelize.literal('rand()'), limit: 5 })
            .then(news => {
                res.render('home', {
                    news
                })
            })
            .catch(next)
    }

    add (req, res, next) {
        
            let {title, description, content, category, imgavatar, imgdesc} = data
        
            // Insert into database
            Newspaper.create({
                title, description, content, category, imgavatar, imgdesc
            })  
                .then(newspaper => res.redirect('/'))
                .catch(err => console.log(err))
    }
}

module.exports = new SiteController;