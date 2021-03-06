// Core
import moment from "moment";

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
export const sortTasksByDate = (tasks) => {
    return tasks.sort((task1, task2) => {
        if (moment(task1.created).unix() < moment(task2.created).unix()) {
            return 1;
        } else if (
            moment(task1.created).unix() > moment(task2.created).unix()
        ) {
            return -1;
        }

        return 0;
    });
};
export const sortTasksByGroup = (tasks) => {
    // получаем массив с тасками с favorite === true и completed === false
    const favorite = tasks.filter((task) => task.favorite && !task.completed);
    // получаем массив с тасками с favorite === false и completed === false
    const usual = tasks.filter((task) => !task.favorite && !task.completed);
    // получаем массив с тасками completed === true и сортировка по времени создания
    const completed = sortTasksByDate(tasks.filter((task) => task.completed));

    const sortedCompleted = [
        ...completed.sort((task1, task2) => {
            if (task1.favorite && !task2.favorite) {
                return -1;
            } else if (!task1.favorite && task2.favorite) {
                return 1;
            }

            return 0;
        })
    ];

    return [
        ...sortTasksByDate(favorite),
        ...sortTasksByDate(usual),
        ...sortedCompleted
    ];
};
