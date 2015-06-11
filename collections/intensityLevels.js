this.IntensityLevels = new Meteor.Collection("IntensityLevels");

IntensityLevelSchema = new SimpleSchema({
  name : {
    type : String,
    min : 1,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Name'
    },     
  },
  stars : {
    type : Number,
    min : 1,
    max: 5, 
    autoform: {
      'label-type': 'placeholder',
      placeholder: '1 to 5 Stars',
      options: [
        {label: "1 star", value: 1},
        {label: '2 stars', value: 2},
        {label: '3 stars', value: 3},
        {label: '4 stars', value: 4},        
        {label: '5 stars', value: 5},
      ]      
    },     
  },
  teamId : {
    type : String,
  }
});

this.IntensityLevels.attachSchema(IntensityLevelSchema);
this.IntensityLevels.attachBehaviour('softRemovable');
this.IntensityLevels.attachBehaviour('timestampable');

if (Meteor.isClient)
{
  IntensityLevels.before.insert(function (userId, doc) {
    var teamId = Session.get('currentTeamId');
    doc.teamId = teamId;
  });
}

this.IntensityLevels.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
    //return true;
  },
  update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
    //return true;
  },
});