const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity
const users = [{
    id: 1, username: 'test', password: 'test', firstName: 'Daullath', lastName: 'Shiek',
    userInfo: {
        lastLogin: '02 June 2021',
        acctBalance: '3000',
        acctData: [{ date: '31-May-2021', desc: 'Room Rent', amount: '700' },
        { date: '01-Jun-2021', desc: 'Groceries', amount: '20' },]
    }
}];

module.exports = {
    authenticate,
    getAll,
    retrieveUserDetails
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPasswordUserInfo(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

async function retrieveUserDetails() {
    const user1 = users[0];
    console.log(user1);
    return { ...omitPassword(user1) };
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

function omitPasswordUserInfo(user) {
    const { password, userInfo, ...userWithoutPassword } = user;
    return userWithoutPassword;
}