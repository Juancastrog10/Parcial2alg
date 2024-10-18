import { appState, dispatch } from "../../store/store.js";
import { Actions } from '../../types/tasks';
import { addTask } from "../../store/actions";

export enum Attribute {
    'uid' = 'uid',
    'utitle' = 'utitle',
    'description' = 'description',
}

class TaskForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <form id="task-form">
                <input type="text" id="title" name="title" placeholder="Title" required>
                <input type="text" id="description" name="description" placeholder="Description" required>
                <button type="submit" id="btn">Add task</button>
            </form>
        `;

        const title = this.shadowRoot?.querySelector<HTMLInputElement>('#title');
        const description = this.shadowRoot?.querySelector<HTMLInputElement>('#description');
        const form = this.shadowRoot?.querySelector<HTMLFormElement>('#task-form');

        // Añadir tarea
        form?.addEventListener('submit', (e) => {
            e.preventDefault();

            // Verificar que title y description no sean null
            if (title && description) {
                const atitle = title.value.trim();
                const adescription = description.value.trim();

                // Asegúrate de que ambas variables no estén vacías
                if (atitle && adescription) {
                    // Generar un uid único
                    const uid = appState.tasks.length ? appState.tasks[appState.tasks.length - 1].uid + 1 : 1;
                    console.log('Despachando acción:', { uid, utitle: atitle, description: adescription });
                    dispatch(addTask({ uid, utitle: atitle, description: adescription, completedTask: false }));

                    // Limpiar los campos del formulario
                    title.value = '';
                    description.value = '';
                } else {
                    console.log('Por favor, ingresa un título y una descripción.');
                }
            }
        });
    }
}

customElements.define('task-form', TaskForm);
export default TaskForm;