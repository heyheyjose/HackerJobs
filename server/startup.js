Meteor.startup(function () {
    Job.remove({});

    function getComments() {
        var api = new HackerNewsApi();
        var kids = api.getItem('9996333').data.kids;

        if (Comment.find({}).fetch().length === 0) {
            kids.forEach(function (kid) {
                api.getItem(kid, function (err, resp) {
                    if (!err) {
                        Comment.insert(resp.data);
                    }
                });
            });
        }
    }

    getComments();

    /*SyncedCron.add({
        name: 'Gets all of the information from the hacker news posts',
        schedule: function (parser) {
            return parser.text('every 1 minute');
        },
        job: getComments
    });*/

    //SyncedCron.start();
});