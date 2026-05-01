const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/", (request, response) => {
  response.json(persons);
});

app.get("/info/", (request, response) => {
  response.send(info(persons));
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((persons) => persons.id !== id);

  response.status(204).end();
});

const info = (persons) => {
  const length = persons.length;
  const date = new Date();
  return `<div>
      <p>Phonebook has info for ${length} people</p>
      <p>${date}</p>
    </div>`;
};

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  const duplicate = persons.some((person) => person.name === body.name);

  if (!body.name || !body.number || duplicate) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const generateId = () => {
  return String(Math.floor(Math.random() * 1000000));
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
