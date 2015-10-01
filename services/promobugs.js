var fs = require('fs');
var jsdom = require('jsdom');
var jquery = fs.readFileSync('./jquery.js', 'utf-8');
var promobugs = require('./schemas/promobugs');

var promobugsService = {
  getDeals: function() {
    return jsdom.env({
      url: promobugs.url, 
      src: [jquery],
      done: function(err, window) {
        var $ = window.$;
        var results = [];  

        $(promobugs.listItemQuery).each(function() {
          results.push({
            title: $(this).find(promobugs.title.query).text(),
            link: window.document.location.origin + $(this).find(promobugs.link.query).attr(promobugs.link.attr),
            threadId: $(this).attr('id'),
            date: $(this).find(promobugs.date.query).attr(promobugs.date.attr)
          });
        });

        return results;
      }
    });
  }
};

module.exports = promobugsService;
