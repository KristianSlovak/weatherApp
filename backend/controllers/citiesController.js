const City = require("../models/citiesModel");
const mongoose = require("mongoose");

const getCities = async (req, res) => {
  const user_id = req.user._id;

  const cities = await City.find({ user_id });

  res.status(200).json(cities);
};

const getCity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You do not have this city." });
  }

  const city = await City.findById(id);

  if (!city) {
    res.status(404).json({ error: "You do not have this city." });
  }

  res.status(200).json(city);
};

const addCity = async (req, res) => {
  const { cityName, cityCountry } = req.body;

  let emptyFields = [];

  if (!cityName) {
    emptyFields.push("cityName");
  }

  if (!cityCountry) {
    emptyFields.push("cityCountry");
  }

  if (emptyFields.length > 0) {
    return res.statu(400).json({ error: "City cannot be added!" });
  }

  try {
    const user_id = req.user._id;
    const city = await City.create({ cityName, cityCountry, user_id });
    res.status(200).json(city);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "You do not have this city" });
  }

  const city = await City.findOneAndDelete({ _id: id });

  if (!city) {
    return res.status(400).json({ error: "You do not have this city" });
  }

  res.status(200).json(city);
};

module.exports = { getCities, getCity, addCity, deleteCity };
