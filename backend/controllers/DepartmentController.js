const Department = require("../models/Department");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params; 
    
    const department = await Department.findById(id);
    
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    // Check if all required fields are present
    if (department_name) {
      return res.status(400).json({
        message: "Department Name Is Required."
      });
    }

    const department = await Department.create(req.body);
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndUpdate(id, req.body);

    if (!department) {
      return res.status(404).json({ message: "Department Not Found" });
    }

    const updatedDepartment = await Department.findById(id);
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};