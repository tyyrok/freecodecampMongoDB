require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
let Person;

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({ name: "Julia", age: 25, favoriteFoods: ["French Fries", "Vegy Burger"] });
  newPerson.save(function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });

};
let arrayOfPeople = [
  { name: "Max", age: 19, favoriteFoods: ["Junky Food", "Marhsmallow"] }, { name: "Jarwis", age: 86, favoriteFoods: ["Beans", "Spaghetti"] }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });

};
let personName = "Max";
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    done(null, data);
  });
};
let food = "Beans";
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    console.log(data);
    done(null, data);
  });
};
let personId = 1;
const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId}, function(err, person){
    if (err) return console.log(err);
    
    person.favoriteFoods.push(foodToAdd);
    
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.log(err);

    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select("-age").exec((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
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
