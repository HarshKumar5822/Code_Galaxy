const Challenge = require('../models/Challenge');

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Public
const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a challenge
// @route   POST /api/challenges
// @access  Private/Admin
const createChallenge = async (req, res) => {
    const { title, description, difficulty, testCases, template } = req.body;

    try {
        const challenge = new Challenge({
            title,
            description,
            difficulty,
            testCases,
            template
        });

        const createdChallenge = await challenge.save();
        res.status(201).json(createdChallenge);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Run code (Dummy Evaluation)
// @route   POST /api/challenges/run
// @access  Private
const runCode = async (req, res) => {
    // For now, simple return. In real app, use Judge0 or VM.
    const { code, language } = req.body;

    // Simulating evaluation check
    // Here logic would be: Execute code against testCases

    res.json({
        output: "Code execution simulated. Output: Hello World",
        passed: true
    });
};

module.exports = { getChallenges, createChallenge, runCode };
