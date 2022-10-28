const Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const Newspaper = require('../models/Newspaper');

class SiteController {
    home (req, res, next) {
        Newspaper.findAll({})
            .then(news => {
                res.render('home', {
                    news
                })
            })
            .catch(next)
    }

    category (req, res, next) {
        Newspaper.findAll({ where: {category: req.params.category} })
            .then(news => {
                res.render('home', {
                    news
                })
            })
            .catch(next)
    }

    details (req, res, next) {
        Newspaper.findOne({ where: { slug: req.params.slug } })
            .then(info => {
                res.render('details/detail-news', {
                    info
                })
            })
            .catch(next)
    }

    
    search (req, res, next) {
        let { term } = req.query;
        let termLowerCase = term.toLowerCase();
        let termFirstUpperCase = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();

        Newspaper.findAll({
            where: {
             [Op.or]: [
               { title: { [Op.like]: `%${term}%` } },
               { description: { [Op.like]: `%${term}%` } },
               { title: { [Op.like]: `%${termLowerCase}%` } },
               { title: { [Op.like]: `%${termFirstUpperCase}%` } },
               { description: { [Op.like]: `%${termLowerCase}%` } },
               { description: { [Op.like]: `%${termFirstUpperCase}%` } },
             ]
           }
           })
            .then(news => {
                res.render('home', {
                    news
                })
            })
            .catch(next)
    }
}

module.exports = new SiteController;