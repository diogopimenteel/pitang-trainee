const express = require("express");
const crypto = require("crypto");

const app = express();

app.use(express.json());

const PORT = 3000;

const users = [
    {
        id: crypto.randomUUID(),
        name: "Diogo",
        city: "Recife"
    }
];

app.get("/api/user", (request, response) => {
    response.send({ users });
});

app.get("/api/user/:id", (request, response) => {
    const {id} = request.params;
    
    const user = users.find((user) => user.id === id);

    if (!user) {
        return response.status(404).send({ message: "User not found." });
    }
    
    response.status(200).send({ user });
});


/*
[^...]  -> busca por ocorrências que não sejam as dentro dos colchetes
a-zà-ú  -> letras com ou sem acentos
gi      -> busca por toda a string (g) e não diferencia maiúsculas de minúsculas (i)
*/
const validateName = name => String(name).match(/[^a-zà-ú]/gi) || !name;

const validateCity = city => typeof city !== "string" || !city;

const search = id => users.findIndex((user) => user.id === id);

app.post("/api/user", (request, response) => {
    const { name, city } = request.body;

    if (validateName(name) || validateCity(city)) {
        return response.status(400).send({ message: "Invalid input data." });
    }

    const user = {
        id: crypto.randomUUID(),
        name,
        city
    };

    users.push(user);

    response.status(201).send({ message : "User created successfully.", user });
});

app.put("/api/user/:id", (request, response) => {
    const { id } = request.params;
    const { name, city } = request.body;
    const index = search(id);

    if (index === -1) {
        return response.status(400).send({ message: "User not found."});
    } 
    else if (validateName(name) || validateCity(city)) {
        return response.status(400).send({ message: "Invalid input data." });
    }

    users[index].name = request.body.name;
    users[index].city = request.body.city;

    response.status(200).send({ message: "User updated successfully.", user: users[index] });
});

app.delete("/api/user/:id", (request, response) => {
    const { id } = request.params;
    const index = search(id);

    if (index === -1) {
        return response.status(400).send({ message: "User not found."});
    }

    users.splice(index, 1);

    return response.status(200).send({ message: "User successfully removed."});
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});