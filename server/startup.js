Meteor.startup(function () {
    Job.remove({});
    Language.remove({});

    var api = new HackerNewsApi();

    function getJobs() {
        var kids = api.getItem('9996333').data.kids;

        for (var i = 0; i < 3; i++) {
            var kid = kids[i];

            api.getItem(kid, function (err, resp) {
                if (!err) {
                    var job = api.commentToJob(resp.data);
                    if (job) {
                        Job.insert(job);
                    }
                }
            });
        }
    }

    getJobs();

    if (Language.find({}).fetch().length === 0) {

        // dump programming languages into mongo collection
        Language.insert(LanguageList);
    }



    /*SyncedCron.add({
     name: 'Gets all of the information from the hacker news posts',
     schedule: function (parser) {
     return parser.text('every 1 minute');
     },
     job: getComments
     });*/

    //SyncedCron.start();
});