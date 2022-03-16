// Contains only fields that should be publicly viewable
exports.userPublic = function(doc) {
    data = doc.data();
    return {
        username: doc.id,
        bio: data.bio
    }
}

// Contains only fields that should be viewable by the owner of the account
exports.userPrivate = function(doc) {
    data = doc.data();
    return {
        username: doc.id,
        email: data.email
    };
}

// Contains all fields, including sensitive security data
exports.userSensitive = function(doc) {
    user = doc.data();
    user.username = doc.id;
    return user;
}