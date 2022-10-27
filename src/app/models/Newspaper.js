const Sequelize = require('sequelize');
const db = require('../../config/db/database');
const SequelizeSlugify = require('sequelize-slugify');

const Newspaper = db.define('newspaper', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    postingtime: {
        type: Sequelize.DATE,
        allowedProtoMethods: {
            trim: true
        }
    },
    content: {
        type: Sequelize.TEXT, 
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    category: {
        type: Sequelize.TEXT,
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    imgavatar: {
        type: Sequelize.TEXT,
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    imgdesc: {
        type: Sequelize.TEXT,
        allowNull: false,
        allowedProtoMethods: {
            trim: true
        }
    },
    slug: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    timestamps: false
})

SequelizeSlugify.slugifyModel(Newspaper, {
    source: ['title'],
    suffixSource: [],
    slugOptions: { lower: true },
    overwrite: false,
    column: 'slug',
    incrementalSeparator: '-',
    passTransaction: true,
    paranoid: true,
    bulkUpdate: false
});

module.exports = Newspaper;