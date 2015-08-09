Meteor.startup(function () {
    Job.remove({});

    var api = new HackerNewsApi();

    function getJobs() {
        var kids = api.getItem('9996333').data.kids;

        for (var i = 0; i < kids.length; i++) {
            var kid = kids[i];

            api.getItem(kid, function (err, resp) {
                if (!err) {
                    var job = api.commentToJob(resp.data);
                    if (job) {

                        var result = Job.find({ id: job.id }).fetch();
                        if(!result.length) {
                            Job.insert(job);
                        }
                    }
                }
            });
        }
    }

    if (Job.find({}).fetch().length === 0) {
        getJobs();
    }

    if (Skill.find({}).fetch().length === 0) {

        // dump programming languages into mongo collection
        //Skill.insert(skillList);
    }

    SyncedCron.add({
        name: 'Gets all of the information from the hacker news posts',
        schedule: function (parser) {
            return parser.text('every 20 minute');
        },
        job: getJobs
    });

    SyncedCron.start();
});