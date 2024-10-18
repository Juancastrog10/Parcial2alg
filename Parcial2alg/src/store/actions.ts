export const addTask = (payload: any) => {
    return {
        action: 'ADD_TASK',
        payload: payload,
    };
};

export  const deleteTask = (payload: number) => {
    return {
        action: 'DELETE_TASK',
        payload: payload, 
    };
};


// Acción para completar/alternar tarea
export  const markAsCompleted = (taskId: number) => {
    return {
        action: 'MARK_AS_COMPLETED',
        payload: taskId, 
    };
};