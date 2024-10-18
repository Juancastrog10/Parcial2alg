import { dispatch } from "../../store/store.js";
import { deleteTask, markAsCompleted } from "../../store/actions"; // Importar la acción

export enum Attribute {
    'uid' = 'uid',
    'utitle' = 'utitle',
    'description' = 'description',
    'completedTask' = 'completedTask'
}

class TaskItem extends HTMLElement {
    uid?: any;
    utitle?: string;
    description?: string;
    completedTask?: boolean;

    static get observedAttributes() {
        return Object.keys(Attribute);
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (propName === Attribute.uid) {
            this.uid = newValue ? Number(newValue) : undefined; // Asegúrate de que uid sea un número
        } else if (propName === Attribute.completedTask) {
            this.completedTask = newValue === 'true'; // Asegúrate de convertirlo a booleano
        } else {
            this[propName] = newValue; // Este sigue siendo string o undefined
        }
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            const isCompleted = this.getAttribute('completedTask') === 'true'; // Verifica si está completada

            this.shadowRoot.innerHTML = `
                

                <div class="task-item ${isCompleted ? 'completed' : ''}">
                    <div class="item-info">
                        <h2>${this.getAttribute('utitle')}</h2>
                        <p>${this.getAttribute('description')}</p>
                    </div>
                    <button class="delete-btn">Delete</button>
                    <input type="checkbox" class="completed-checkbox" ${isCompleted ? 'checked' : ''}>
                    <label>${isCompleted ? 'Task completed' : 'Mark as Completed'}</label>
                </div>
            `;

            // Botón para eliminar tarea
            const deleteBtn = this.shadowRoot.querySelector('.delete-btn');
            deleteBtn?.addEventListener('click', () => {
                dispatch(deleteTask(Number(this.uid))); 
            });

            // Checkbox para completar tarea
            const completedCheckbox = this.shadowRoot.querySelector('.completed-checkbox');
            completedCheckbox?.addEventListener('change', (event: Event) => {
                const isChecked = (event.target as HTMLInputElement).checked;
                if (isChecked) {
                    dispatch(markAsCompleted(Number(this.uid))); // Marcar tarea como completada
                } else {
                    // Si tienes una acción para desmarcar, puedes agregarla aquí
                    dispatch(markAsCompleted(Number(this.uid))); // Deberías definir una acción para desmarcar
                }
            });
        }
    }
}

customElements.define('task-item', TaskItem);
export default TaskItem;