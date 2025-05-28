const express = require('express');
const path = require('path');
const WorkoutController = require('./js/controller');

const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use((req, res, next) => {
    console.log(`Żądanie: ${req.method} ${req.url}`);
    next();
});


app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded({ extended: true }));


const controller = new WorkoutController();


app.get('/', (req, res) => controller.renderHome(req, res));
app.get('/workouts', (req, res) => controller.renderWorkouts(req, res));
app.post('/workouts', (req, res) => controller.handleAddOrEdit(req, res));
app.post('/workouts/edit/:id', (req, res) => controller.handleEditForm(req, res));
app.post('/workouts/delete/:id', (req, res) => controller.handleRemove(req, res));
app.get('/stats', (req, res) => controller.renderStats(req, res));
app.get('/planner', (req, res) => controller.renderPlanner(req, res));


app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});