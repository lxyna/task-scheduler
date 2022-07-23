import { Group } from '@mantine/core';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import TaskCard from './TaskCard';

const taskListState = atom({
    key: 'task_list',
    default: [],
});


export default function TaskList() {
    const [taskList, setTaskList] = useRecoilState(taskListState);

    useEffect(() => {
        fetch('http://localhost:5000/fetch', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(tasks => setTaskList(tasks));

    }, [setTaskList]);

    return (
        <Group direction='column' align='center' sx={{ margin: '.5em' }}>
            {Array.from(taskList)
                .sort((a, b) => b.priority - a.priority)
                .map(task =>
                    !task.completed && <TaskCard key={task.id} task={task}/>
                )}
        </Group>
    );
}