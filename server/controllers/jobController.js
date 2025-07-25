const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, company, status } = req.body;
    const newJob = new Job({
      title,
      company,
      status,
      user: req.user._id, 
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error('Create job error:', err);
    res.status(500).json({ message: 'Server error while creating job.' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Fetch jobs error:', err);
    res.status(500).json({ message: 'Failed to fetch jobs.' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found or unauthorized.' });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    console.error('Update job error:', err);
    res.status(500).json({ message: 'Failed to update job.' });
  }
};


exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found or unauthorized.' });
    }

    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (err) {
    console.error('Delete job error:', err);
    res.status(500).json({ message: 'Failed to delete job.' });
  }
};
