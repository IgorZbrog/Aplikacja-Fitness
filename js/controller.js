const { WorkoutModel } = require('./model');

class WorkoutController {
    constructor() {
        this.model = new WorkoutModel();
    }

    renderHome(req, res) {
        const data = {
            weekStats: this.model.getStats('week'),
            monthStats: this.model.getStats('month')
        };
        res.render('home', { body: 'home', ...data });
    }

    renderWorkouts(req, res) {
        const data = {
            workouts: this.model.getWorkouts(),
            error: null
        };
        res.render('workouts', { body: 'workouts', ...data });
    }

    handleAddOrEdit(req, res) {
        const { type, intensity, duration, date } = req.body;
        try {
            this.model.addWorkout(type, intensity, duration, date);
            res.redirect('/workouts');
        } catch (error) {
            const data = {
                workouts: this.model.getWorkouts(),
                error: error.message
            };
            res.render('workouts', { body: 'workouts', ...data });
        }
    }

    handleEditForm(req, res) {
        const { id } = req.params;
        const { type, intensity, duration, date } = req.body;
        try {
            this.model.editWorkout(parseInt(id), type, intensity, duration, date);
            res.redirect('/workouts');
        } catch (error) {
            const data = {
                workouts: this.model.getWorkouts(),
                error: error.message
            };
            res.render('workouts', { body: 'workouts', ...data });
        }
    }

    handleRemove(req, res) {
        const { id } = req.params;
        try {
            this.model.removeWorkout(parseInt(id));
            res.redirect('/workouts');
        } catch (error) {
            const data = {
                workouts: this.model.getWorkouts(),
                error: error.message
            };
            res.render('workouts', { body: 'workouts', ...data });
        }
    }

    renderStats(req, res) {
        const data = {
            weekStats: this.model.getStats('week'),
            monthStats: this.model.getStats('month'),
            typeStats: this.model.getStatsByType()
        };
        res.render('stats', { body: 'stats', ...data });
    }

    renderPlanner(req, res) {
        const today = new Date();
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        const calendar = Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
            const dailyWorkouts = this.model.getWorkoutsByDate(date);
            return { date, workouts: dailyWorkouts };
        });
        res.render('planner', { body: 'planner', calendar });
    }
}

module.exports = WorkoutController;