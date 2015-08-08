HackerNewsApi = function () {
    this.base = 'https://hacker-news.firebaseio.com/v0/item/';
    this.suffix = '.json?print=pretty';
};


HackerNewsApi.prototype = {
    getItem: function (id, callback) {
        if (typeof callback === 'function') {
            Meteor.http.get(this.base + id + this.suffix, callback);
        }
        else {
            return Meteor.http.get(this.base + id + this.suffix);
        }
    },
    commentToJob: function (comment) {
        var _this = this;

        var job = {
            id: comment.id,
            city: 'Palo Alto',
            state: 'CA',
            name: 'Fletch Robotics',
            isRemote: false,
            isFullTime: false,
            isContract: true,
            time: moment(comment.time).format('ll'),
            skills: ['C#', 'Haskell', 'React'],
            author: comment.by,
            text: _this._cleanText(comment.text)
        };

        return job;
    },

    _cleanText: function (text) {
        text = text.replace(/&#x2F;/g, '/');
        text = text.replace(/&#x27;/g, '\'');


        return text;
    },

    _matchSkills: function (text) {

    }
};