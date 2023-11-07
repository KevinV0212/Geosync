// test data for map pins
const testPins = [];
// political

testPins.push({
  Id: 1,
  Country: "Vatican City",
  Title: "Apostolic Palace",
  Description:
    "The Apostolic Palace (Latin: Palatium Apostolicum; Italian: Palazzo Apostolico) is the official residence of the Pope, the head of the Catholic Church, located in Vatican City. ",
  Longitude: 41.903611,
  Latitude: 12.456389,
  Political: true,
  Military: false,
  Economic: false,
  Social: false,
  Information: false,
  Infrastructure: false,
});
// Military

testPins.push({
  Id: 2,
  Country: "Vatican City",
  Title: "Arch of the Bells",
  Description:
    "Arch of the Bells is a city gate in Municipio Roma XIV, Rome, Lazio. Arch of the Bells is situated nearby to the post office Poste Vaticane and the square Basilica Forecourt.",
  Longitude: 41.90181285056788,
  Latitude: 12.45490191086849,
  Political: false,
  Military: true,
  Economic: false,
  Social: false,
  Information: false,
  Infrastructure: false,
});

// Economic

testPins.push({
  Id: 2,
  Country: "Vatican City",
  Title: "Institute for Works of Religion",
  Description:
    "The Institute for the Works of Religion, commonly known as the Vatican Bank, is a financial institution that is situated inside Vatican City and run by a Board of Superintendence, which reports to a Commission of Cardinals and the Pope. ",
  Longitude: 41.90392764880936,
  Latitude: 12.456710497480108,
  Political: false,
  Military: false,
  Economic: true,
  Social: false,
  Information: false,
  Infrastructure: false,
});

// Social
testPins.push({
  Id: 3,
  Country: "Vatican City",
  Title: "St Peter's Basilica",
  Description:
    "The Papal Basilica of Saint Peter in the Vatican, or simply Saint Peter's Basilica, is a church built in the Renaissance style located in Vatican City, the papal enclave that is within the city of Rome, Italy.",
  Longitude: 41.902238539127566,
  Latitude: 12.45394742493224,
  Political: false,
  Military: false,
  Economic: false,
  Social: true,
  Information: false,
  Infrastructure: false,
});

// Infrastructure
testPins.push({
  Id: 4,
  Country: "Vatican City",
  Title: "Vatican City Heliport",
  Description:
    "Vatican City Heliport consists of a 25 × 17 m rectangular concrete landing area linked with a circular parking area. It is used for short journeys from or to Vatican City by the pope and visiting heads of state",
  Longitude: 41.902042409599204,
  Latitude: 12.44643048878754,
  Political: false,
  Military: false,
  Economic: false,
  Social: false,
  Infrastructure: true,
  Information: false,
});
// Information
testPins.push({
  Id: 5,
  Country: "Vatican City",
  Title: "Poste Vaticane (centrale)",
  Description: "Post office in the center of Vatican City",
  Longitude: 41.90432369914862,
  Latitude: 12.456147610805392,
  Political: false,
  Military: false,
  Economic: false,
  Social: false,
  Infrastructure: false,
  Information: true,
});

module.exports = {
  testPins,
};
