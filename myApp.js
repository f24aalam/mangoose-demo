require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name: 'Faizan Aalam', age: 26, favouriteFoods: ['chicken', 'bread']});
  person.save((error, data) => {
    if (error) return done(error)
    return done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  const persons = Person.create(arrayOfPeople, (error, data) => {
    if(error) return done(error)
    return done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).exec((error, data) => {
    if (error) return done(error);
    return done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).exec((error, data) => {
    if (error) return done(error);
    return done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId).exec((error, data) => {
    if (error) return done(error);
    return done(null, data);
  });
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  let person = await Person.findById(personId);
  person.favoriteFoods.push(foodToAdd);
  person.save((error, data) => {
    if (error) return done(error);
    return done(null, data);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (error, data) => {
    if (error) return done(error);
    return done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, data) => {
    if (error) return done(error);
    return done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (error, data) => {
    if (error) return done(error);
    return done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
