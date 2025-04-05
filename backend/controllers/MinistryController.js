const Ministry = require("../models/Ministry");

const getMinistries = async (req, res) => {
  try {
    const ministries = await Ministry.find({});
    res.status(200).json(ministries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMinistry = async (req, res) => {
  try {
    const { id } = req.params;

    const ministry = await Ministry.findById(id);

    if (!ministry) {
      return res.status(404).json({ message: "Ministry not found" });
    }

    res.status(200).json(ministry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMinistry = async (req, res) => {
  try {
    const { ministry_name } = req.body;

    // Corrected condition - check if ministry_name is MISSING
    if (!ministry_name) {
      return res.status(400).json({
        message: "Ministry Name Is Required."
      });
    }

    const ministry = await Ministry.create(req.body);
    res.status(200).json(ministry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateMinistry = async (req, res) => {
  try {
    const { id } = req.params;
    const ministry = await Ministry.findByIdAndUpdate(id, req.body);

    if (!ministry) {
      return res.status(404).json({ message: "Ministry Not Found" });
    }

    const updatedMinistry = await Ministry.findById(id);
    res.status(200).json(updatedMinistry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteMinistry = async (req, res) => {
  try {
    const { id } = req.params;
    const ministry = await Ministry.findByIdAndDelete(id);

    if (!ministry) {
      return res.status(404).json({ message: 'Ministry not found' });
    }

    res.status(200).json({ message: 'Ministry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getMinistries,
  getMinistry,
  createMinistry,
  updateMinistry,
  deleteMinistry,
};