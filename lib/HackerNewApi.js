HackerNewsApi = function () {
    this.base = 'https://hacker-news.firebaseio.com/v0/item/';
    this.suffix = '.json?print=pretty';
};


HackerNewsApi.prototype = {
    getItem: function (id, callback) {
        console.log(this.base + id + this.suffix);
        if (typeof callback === 'function') {
            Meteor.http.get(this.base + id + this.suffix, callback);
        }
        else {
            return Meteor.http.get(this.base + id + this.suffix);
        }
    }
};