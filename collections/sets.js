this.Sets = new Meteor.Collection("Sets");

InnerSetSchema = new SimpleSchema({
  _id : {
    type : Number,
    min : 0,
  },
  distance : {
    type : Number,
    min : 0,
    optional: true
  },
  repetitions : {
    type : Number,
    min : 0,
    optional: true
  },
  interval_sec : {
    type : Number,
    min : 0,
    optional: true
  },
  interval_min : {
    type : Number,
    min : 0,
    optional: true
  },
  type : {
    type : String,
    optional: true
  },
  stroke : {
    type : String,
    optional: true
  },
  energy_zone : {
    type : String,
    optional: true
  },

  //This is the text blob
  description : {
    type : String,
    optional : true
  }

});

SetSchema = new SimpleSchema({
  _id : {
    type: Number,
    decimal : true
  },
  loop : {
    type : Number,
    min : 0,
  },
  sets : {
    type : [InnerSetSchema],
    custom : function(){
      var result = monotonic_increasing(this.value);
      if(!result){
        return "There are duplicate ids or not in order ids"
      }
    },
  },
  name : {
    type: String,
    optional: true
  },
  
  //These three are for the original creator, set once then FINAL
  coachId : {
    type: String
  },
  teamId : {
    type: String
  },
  date_time : {
    type: Date
  },

  //These two just handle sharing. Second one is an array of coach ids
  shareCounter : {
    type: Number,
    defaultValue: 0,
  },
  coachesSharedWith : {
    type: [String],
    defaultValue : [],
  }
});

this.Sets.attachSchema(SetSchema);
this.Sets.attachBehaviour('softRemovable');
this.Sets.attachBehaviour('timestampable');

this.Sets.allow({
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




