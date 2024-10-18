import { addObserver, appState } from "../store/store.js"; 
import '../components/task-form/taskForm';
import '../components/task-list/taskList'; 

class Dashboard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // Suscribir el componente a los cambios en el estado global
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            
            <div class="dashboard">
                <h1>Task list</h1>
                <task-form></task-form> <!-- Formulario para agregar nuevas tareas -->
                <task-list></task-list> <!-- Lista de tareas actuales -->
            </div>
        `;
    }
}

customElements.define('app-dashboard', Dashboard);
export default Dashboard;