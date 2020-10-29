const _ = require('lodash');

module.exports = (index) => {
    let title = '', cdata = '';
    if (_.isArray(index.EE_DOC_DATA.DOC.SECTION)) {
        if (_.isArray(index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE)) {
            if (index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0].PARAGRAPH) {
                if (_.isArray(index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0].PARAGRAPH)) {
                    title = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0]._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0].PARAGRAPH[0]._cdata
                } else {
                    title = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0]._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0].PARAGRAPH._cdata
                }
            } else {
                title = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE[0]._attributes.title
            }
        } else {
            if (index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE.PARAGRAPH) {
                if (_.isArray(index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE.PARAGRAPH)) {
                    title = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE.PARAGRAPH[0]._cdata
                } else {
                    title = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE.PARAGRAPH._cdata
                }
            } else {
                title = index.EE_DOC_DATA.DOC.SECTION[0].ARTICLE._attributes.title
            }
        }
    } else {
        if (_.isArray(index.EE_DOC_DATA.DOC.SECTION.ARTICLE)) {
            if (index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0].PARAGRAPH) {
                if (_.isArray(index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0].PARAGRAPH)) {
                    title = index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0]._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0].PARAGRAPH[0]._cdata
                } else {
                    title = index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0]._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0].PARAGRAPH._cdata
                }
            } else {
                title = index.EE_DOC_DATA.DOC.SECTION.ARTICLE[0]._attributes.title
            }
        } else {
            if (index.EE_DOC_DATA.DOC.SECTION.ARTICLE.PARAGRAPH) {
                if (_.isArray(index.EE_DOC_DATA.DOC.SECTION.ARTICLE.PARAGRAPH)) {
                    title = index.EE_DOC_DATA.DOC.SECTION.ARTICLE._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION.ARTICLE.PARAGRAPH[0]._cdata
                } else {
                    title = index.EE_DOC_DATA.DOC.SECTION.ARTICLE._attributes.title
                    cdata = index.EE_DOC_DATA.DOC.SECTION.ARTICLE.PARAGRAPH._cdata
                }
            } else {
                title = index.EE_DOC_DATA.DOC.SECTION.ARTICLE._attributes.title
            }
        }
    }

    return { title, cdata }
}