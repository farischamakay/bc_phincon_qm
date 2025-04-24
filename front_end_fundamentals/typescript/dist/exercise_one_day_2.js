let students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 90 },
  { name: "Charlie", score: 78 },
];

let studentsShallowCopy = [...students];
let studentsDeepCopy = JSON.parse(JSON.stringify(students));

studentsShallowCopy[0].score = 95;
studentsDeepCopy[1].score = 88;

console.log("Original Array:", students);
console.log("Shallow Copy:", studentsShallowCopy);
console.log("Deep Copy:", studentsDeepCopy);
