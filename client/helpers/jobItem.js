Template.jobItem.helpers({

    formattedTime: function () {
        console.log(this.time);
        return moment(this.time).format('ll');
    }

});