const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const Employee = require('../models/Employee');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const resolvers = {
    Query: {
        login: async (_, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });
            if (!user) throw new AuthenticationError('Invalid credentials');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new AuthenticationError('Invalid credentials');

            return generateToken(user);
        },

      
    },
    Mutation: {
        signup: async (_, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();
            return generateToken(user);
        },
    }
    
};

module.exports = resolvers;
