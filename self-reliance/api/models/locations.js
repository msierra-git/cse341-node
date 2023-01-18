function LocationModel(posts) {
   this.locationID = posts.body.locationID;
   this.locationType = posts.body.locationType;
   this.locationName = posts.body.locationName;
   this.address = posts.body.address;
   this.contactPerson = posts.body.contactPerson;
   this.contactNumber = posts.body.contactNumber;
   this.roomName = posts.body.roomName;
   this.capacity = posts.body.capacity;
}

module.exports = LocationModel;
