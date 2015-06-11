this.SetContexts = new Meteor.Collection("setContexts");

SetContextSchema = new SimpleSchema({
  set : {
    type : String
  },
  workout : {
    type: String
  },
  athletes: {
    type: [String]
  },
  groups: {
    type: [String],
    optional : true
  },
  order: {
    type: Number,
  }
});

this.SetContexts.attachSchema(SetContextSchema);
this.SetContexts.attachBehaviour('softRemovable');
this.SetContexts.attachBehaviour('timestampable');

this.SetContexts.allow({
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
