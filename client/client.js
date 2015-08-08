Template.body.helpers({
    jobs: Job.find({})
});

Template.jobItem.helpers({
    getStates: function () {
        var stateCode = this.states[0];

        return States[stateCode];
    }
});