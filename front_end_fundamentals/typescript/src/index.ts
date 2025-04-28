import { name } from "./module";
console.log(name);

let office = {
  event: "Training React",
  location: "Jakarta",
  building: {
    name: "Kokas",
    floors: 18,
  },
};

const { event = office.event } = office;
