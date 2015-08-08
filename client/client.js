Template.body.helpers({
    jobs: Job.find({}),

    formattedTime: function () {
        return moment(this.time).format('ll');
    }
});