class Router {
    constructor() {
        this.routes = ["home", "workouts", "stats", "planner"];
        this.pageChangeCallbacks = [];

        window.addEventListener("hashchange", () => this.handleRouteChange());
        document.addEventListener("click", event => {
            const link = event.target.closest("a[data-page]");
            if (link) {
                event.preventDefault();
                const page = link.getAttribute("data-page");
                window.location.hash = page;
            }
        });
    }

    onPageChange(callback) {
        this.pageChangeCallbacks.push(callback);
    }

    handleRouteChange() {
        const page = window.location.hash.slice(1) || "home";
        if (this.routes.includes(page)) {
            this.pageChangeCallbacks.forEach(cb => cb(page));
        } else {
            window.location.hash = "home";
        }
    }
}