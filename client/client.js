Template.body.helpers({
    jobs: Job.find({})
});

Template.jobItem.helpers({
    getStates: function () {
        var stateCode = this.states[0];
        return States[stateCode];
    }
});

Template.jobItem.events({
    'click #toggle-post': function(e) {
        var $a = $(e.currentTarget);

        var text = $a.find('span').text();

        if(text === 'Hide') {
            $a.find('span').text('Show');
        }
        else {
            $a.find('span').text('Hide');
        }

        $a.siblings('.raw-text').toggle();
    }
});