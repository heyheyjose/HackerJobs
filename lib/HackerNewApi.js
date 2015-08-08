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
            states: _this._matchState(comment.text),
            name: 'Fletch Robotics',
            isRemote: _this._isRemote(comment.text),
            isFullTime: _this._isFullTime(comment.text),
            isContract: _this._isContract(comment.text),
            time: moment(comment.time).format('ll'),
            skills: ['C#', 'Haskell', 'React'],
            author: comment.by,
            text: _this._cleanText(comment.text)
        };

        return job;
    },

    /**
     * Cleans up the html codes that are returned by hacker news
     * @param text
     * @returns {string}
     * @private
     */
    _cleanText: function (text) {
        text = text.replace(/&#x2F;/g, '/');
        text = text.replace(/&#x27;/g, '\'');
        return text;
    },

    /**
     * Tries to find if a remote is a keyword inside the comment text, later should be smart enough to see if it is full or partially remote
     * @param text
     * @returns {boolean}
     * @private
     */
    _isRemote: function(text) {
        return !!(text.match(/remote/i) || []).length;
    },

    _isFullTime: function(text) {
        return !!(text.match(/full\s?time/i) || []).length;
    },

    _isContract: function(text) {
        return !!(text.match(/contract/i) || []).length;
    },

    _matchState: function(text) {
        var stateAbbrevs = Object.keys(States);
        var states = [];

        stateAbbrevs.forEach(function(state) {
            var stateRegex = new RegExp('\\s' + state + '\\s');
            if(text.match(stateRegex)) {
                states.push(state);
            }
        });

        return states;
    }
};