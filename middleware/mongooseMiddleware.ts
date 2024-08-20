// const UserSchema = new Schema({
// 	username: String,
// 	email: String,
// 	password: String,
// 	isSuspended: {
// 	  type: Boolean,
// 	  default: false
// 	}
//   });

//   // Middleware to handle cascading deletions
//   UserSchema.pre('remove', async function(next) {
// 	// Assuming you have a Post model associated with users
// 	await this.model('Post').deleteMany({ user: this._id });

// 	// Assuming you have a Comment model associated with users
// 	await this.model('Comment').deleteMany({ user: this._id });

// 	next();
//   });

//   // Middleware to handle user suspension
//   UserSchema.pre('save', async function(next) {
// 	if (this.isModified('isSuspended') && this.isSuspended) {
// 	  // Hide or modify associated documents when user is suspended
// 	  await this.model('Post').updateMany(
// 		{ user: this._id },
// 		{ $set: { isHidden: true } }
// 	  );
// 	  await this.model('Comment').updateMany(
// 		{ user: this._id },
// 		{ $set: { isHidden: true } }
// 	  );
// 	}
// 	next();
//   });

//   const User = mongoose.model('User', UserSchema);

/**
 * Using the structure of teh above set up
 */
// To delete a user and all associated documents
// const user = await User.findById(userId);
// await user.remove();

// // To suspend a user
// const user = await User.findById(userId);
// user.isSuspended = true;
// await user.save();

// Expiring documents after a given time based on a field
// const UserSchema = new Schema({
// 	username: String,
// 	email: String,
// 	password: String,
// 	emailVerified: {
// 	  type: Boolean,
// 	  default: false
// 	},
// 	createdAt: {
// 	  type: Date,
// 	  default: Date.now,
// 	  expires: '2d' // This sets a 2-day expiration
// 	}
//   });

//   // Create a TTL index
//   UserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 }); // 172800 seconds = 2 days

//   // Add a pre-save hook to reset createdAt if emailVerified becomes true
//   UserSchema.pre('save', function(next) {
// 	if (this.isModified('emailVerified') && this.emailVerified) {
// 	  this.createdAt = undefined; // This will prevent the document from being deleted
// 	}
// 	next();
//   });
