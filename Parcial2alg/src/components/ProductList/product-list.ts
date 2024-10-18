import { appState, dispatch } from "../../store/store.js";
import { Task } from "../../types/tasks";
import TaskItem, { Attribute } from "../task-item/taskItem";

class TaskList extends HTMLElement {
    tasks: Task[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.tasks = appState.tasks

        const taskListContainer = this.shadowRoot?.querySelector('.task-list');

        this.tasks.forEach(task => {
            // Verifica que 'uid', 'utitle', y 'description' existan
            if (task.uid && task.utitle && task.description) {
                const taskItem = this.ownerDocument.createElement('task-item') as TaskItem;
                taskItem.setAttribute(Attribute.uid, task.uid.toString());
                taskItem.setAttribute(Attribute.utitle, task.utitle);
                taskItem.setAttribute(Attribute.description, task.description);
                taskItem.setAttribute(Attribute.completedTask, task.completedTask ? 'true' : 'false');


                taskListContainer?.appendChild(taskItem);
            } else {
                console.error('Task is missing required attributes:', task);
            }
        });
                
    }


    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        
            <h2>Tasks</h2>
            <div class="task-list">
            </div>
        `;
        
    }
}

customElements.define('task-list', TaskList);
export default TaskList