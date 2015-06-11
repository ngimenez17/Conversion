this.Groups = new Meteor.Collection("Groups");

GroupSchema = new SimpleSchema({
  name : {
    type : String,
    min : 1,
    max : 14,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Name'
    },     
  },
  abbr : {
    type : String,
    min : 1,
    max: 3,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Abbreviation'
    },    
  },
  teamId : {
    type : String,
  },
  athletes: {
    type: [String],
  }  
});

this.Groups.attachSchema(GroupSchema);
this.Groups.attachBehaviour('softRemovable');
this.Groups.attachBehaviour('timestampable');

if (Meteor.isClient)
{
  Groups.before.insert(function (userId, doc) {
    var teamId = Session.get('currentTeamId');
    doc.teamId = teamId;
  });
}

this.Groups.allow({
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