const Performance = require('../models/Performance');

// Create performance review
const createReview = async (req, res) => {
    try {
        const review = await Performance.create({
            ...req.body,
            evaluator: req.user._id
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get reviews of an employee
const getEmployeeReviews = async (req, res) => {
    try {
        const reviews = await Performance.find({ user: req.params.id }).populate('evaluator');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get reviews given by current evaluator
const getMyReviews = async (req, res) => {
    try {
        const reviews = await Performance.find({ evaluator: req.user._id }).populate('user');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    createReview, 
    getEmployeeReviews, 
    getMyReviews 
};
