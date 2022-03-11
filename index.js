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

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>');
});

// GET /api/notes obtengo todas las notas
app.get("/api/notes",(req, res) => {
	res.json(notes);
});

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
app.post('/api/notes', (request, response) => {
	const note = request.body
	console.log(note)
	response.json(note)
});

const port = 3000;//puerto
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});