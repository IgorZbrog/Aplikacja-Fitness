class WorkoutController {
    constructor(model, view, router) {
        this.model = model;
        this.view = view;
        this.router = router;
        this.router.onPageChange(page => this.updateView(page));
        this.updateView("home");
    }

    updateView(page) {
        const data = {
            workouts: this.model.getWorkouts(),
            weekStats: this.model.getStats("week"),
            monthStats: this.model.getStats("month"),
            typeStats: this.model.getStatsByType(),
            error: null
        };

        const handlers = {
            handleAddOrEdit: (id, type, intensity, duration, date) => {
                try {
                    if (id) {
                        this.model.editWorkout(id, type, intensity, duration, date);
                    } else {
                        this.model.addWorkout(type, intensity, duration, date);
                    }
                    data.error = null;
                    this.updateView(page);
                } catch (error) {
                    data.error = error.message;
                    this.view.renderWorkouts(data, handlers);
                }
            },
            handleGetWorkout: id => this.model.getWorkouts().find(w => w.id === id),
            handleRemove: id => {
                try {
                    this.model.removeWorkout(id);
                    data.error = null;
                    this.updateView(page);
                } catch (error) {
                    data.error = error.message;
                    this.view.renderWorkouts(data, handlers);
                }
            }
        };

        this.view.renderPage(page, data, handlers);
    }
}