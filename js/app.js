document.addEventListener("DOMContentLoaded", () => {
    const model = new WorkoutModel();
    const view = new WorkoutView();
    const router = new Router();
    const controller = new WorkoutController(model, view, router);
});