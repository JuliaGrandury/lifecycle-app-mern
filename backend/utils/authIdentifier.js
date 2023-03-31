function validateIdentifier(identifier) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(identifier)) {
        return 'email'
    } else {
        return 'username'
    }
}

module.exports = {
    validateIdentifier
}