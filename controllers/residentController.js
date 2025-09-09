const Resident = require("../models/residentModel");

const getResidents = async (req, res, next) => {
  try {
    const residents = await Resident.getAllResidents();
    res.status(200).json(residents);
  } catch (err) {
    next(err);
  }
};

const getResident = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const resident = await Resident.getResidentsbyId(id);
    if (!resident) return res.status(404).send("Resident not found");
    res.status(200).json(resident);
  } catch (err) {
    next(err);
  }
};

const createResident = async (req, res, next) => {
  try {
    const newResident = await Resident.createResidents(req.body);
    res.status(201).json(newResident);
  } catch (err) {
    next(err);
  }
};

const updateResident = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const resident = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const updated = await Resident.updateResidentbyId(id, resident);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteResident = async (req, res, next) => {
  try {
    Resident.deleteResident(req.params.id);
    return res.status(204).send("Resident Deleted");
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
