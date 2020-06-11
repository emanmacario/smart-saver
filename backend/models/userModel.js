// Schema for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
})

// Store password as hashes in database
userSchema.pre('save', function(next) {
    var user = this;

    // Only hash the password if it has been modified
    if (!user.isModified('password')) {
        return next();
    }
    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        // Hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            // Override the old hash with the new hashed password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

const User = mongoose.model('User', userSchema);
module.exports = User;