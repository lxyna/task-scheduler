import { ActionIcon, Badge, Box, Group, Title, useMantineTheme } from '@mantine/core';
import { atom, useRecoilState } from 'recoil';
import { Check } from 'tabler-icons-react';

const taskListState = atom({
    key: 'task_list',
    default: [],
});

export default function TaskCard({ task }) {
    const theme = useMantineTheme();
    const [taskList, setTaskList] = useRecoilState(taskListState);

    const completeTask = () => {
        fetch('http://localhost:5000/complete', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: task.id })
        })
            .then(body => body.json())
            .then(new_task => {
                const index = taskList.findIndex(t => t.id == task.id);
                const newTaskList = [...taskList.slice(0, index), new_task, ...taskList.slice(index + 1)];
                setTaskList(newTaskList);
            });
    };

    return (
        <Box sx={{
            backgroundColor: theme.colors.dark[6],
            padding: '1em',
            margin: '.5em',
            width: '80%',
            borderRadius: '.5em',
        }}>
            <Group sx={{ justifyContent: 'space-between'}}>
                <Group direction='row' align='center'>
                    <Title order={3}>{task.title}</Title>
                    <Badge>{['Work', 'Study', 'Personal'][task.classification]}</Badge>
                </Group>
                <Group sx={{ margin: '.25em'}}>
                    <ActionIcon
                        variant='filled'
                        color='blue'
                        onClick={completeTask}
                    >
                        <Check/>
                    </ActionIcon>
                </Group>
            </Group>
            <Box>{task.description}</Box>
        </Box>
    );
}