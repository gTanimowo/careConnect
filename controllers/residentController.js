const Resident = require("../models/residentModel");

const getResidents = async (req, res, next) => {
  try {
    const residents = await Resident.getAllResidents();
    res.json(residents);
  } catch (err) {
    next(err);
  }
};

const getResident = async (req, res, next) => {
  try {
    const resident = await Resident.getResidentsbyId(req.params.id);
    if (!resident) return res.status(404).send("Resident not found");
    res.json(resident);
  } catch (err) {
    next(err);
  }
};

const createResident = async (req, res, next) => {
  if (req.role != "admin") {
    res.status(403).send("Cannot create a resident!");
  }
  try {
    const newResident = await Resident.createResidents(req.body);
    res.status(201).json(newResident);
  } catch (err) {
    next(err);
  }
};

const updateResident = async (req, res, next) => {
  try {
    const updated = await Resident.updateResidentbyId(req.params.id);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteResident = async (req, res, next) => {
  if (req.role != "admin") {
    res.status(404).send("Cannot delete a resident!");
  }
  try {
    Resident.deleteResident(req.params.id);
    res.status(204).send("Resident Deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getResidents,
  getResident,
  createResident,
  updateResident,
  deleteResident,
};
