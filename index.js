const express = require('express');
const app = express();
app.use(express.json())

let notes = [{
		id: 1,
		content: "HTML is easy",
		date: "2019-05-30T17:30:31.098Z",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2019-05-30T18:39:34.091Z",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2019-05-30T19:20:14.298Z",
		important: true
	}
]

let persons = [{
			id: 1,
			name: "Juan",
			number: "123456789"
		}, {
			id: 2,
			name: "Maria",
			number: "987654321"
		}, {
			id: 3,
			name: "Jose",
			number: "123456789"
		}, {
			id: 4,
			name: "Pedro",
			number: "123456789"
		}, {
			id: 5,
			name: "Juana",
			number: "123456789"
		},
]


app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

// GET /api/notes obtengo todas las notas
app.get("/api/persons",(req, res) => {
	res.json(persons);
});

app.get("/api/persons/info", (req, res) => {
	const total = persons.length;
	const date = new Date();
	const result = `<p>Total of persons: ${total}</p><br><p>${date}</p>`;
	res.send(result);

})

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find(pers => pers.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
})

// GET /api/notes/:id obtengo una nota en especifico
app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	const note = notes.find(note => note.id === id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
	console.log(note)
});

//delete /api/notes/:id elimino una nota en especifico
app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id)
	response.status(204).end();
});

//post /api/notes envio una nota como json
const generateId = () => {
	const maxId = notes.length > 0 ?
		Math.max(...notes.map(n => n.id)) :
		0
	return maxId + 1
}

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'sin contenido'
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId(),
	}

	notes = notes.concat(note)

	response.json(note)
})

const port = 3000;//puerto
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});