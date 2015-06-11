this.Strokes = new Meteor.Collection("Strokes");

StrokeSchema = new SimpleSchema({
  name: {
    type: String,
    trim: true,
    min : 1,
    max : 12,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Name'
    },     
  },
  abbr: {
    type: String,
    trim: true,
    min : 1,
    max: 6,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Abbreviation'
    },     
  },
  teamId : {
    type : String,
  }  
})

this.Strokes.attachSchema(StrokeSchema);
this.Strokes.attachBehaviour('softRemovable');
this.Strokes.attachBehaviour('timestampable');

if (Meteor.isClient)
{
  Strokes.before.insert(function (userId, doc) {
    var teamId = Session.get('currentTeamId');
    doc.teamId = teamId;
  });
}

this.Strokes.allow({
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