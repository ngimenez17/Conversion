this.Courses = new Meteor.Collection("Courses");

CourseSchema = new SimpleSchema({
  distance : {
    type : Number, 
    min : 0,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Distance'
    },     
  },
  metric: {
    type: String,
    min : 1,
    allowedValues: ['Meters', 'Yards'],
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Metric',      
      options: [
        {label: "Meters", value: "Meters"},
        {label: "Yards", value: "Yards"},
      ]
    }        
  },
  teamId : {
    type : String,
  }   
})

this.Courses.attachSchema(CourseSchema);
this.Courses.attachBehaviour('softRemovable');
this.Courses.attachBehaviour('timestampable');

if (Meteor.isClient)
{
  Courses.before.insert(function (userId, doc) {
    var teamId = Session.get('currentTeamId');
    doc.teamId = teamId;
  });
}

this.Courses.allow({
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