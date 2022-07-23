import { ActionIcon, Button, Group, Modal, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useState } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import { Pencil } from 'tabler-icons-react';

const taskListState = atom({
    key: 'task_list',
    default: [],
});

export default function AddTask() {
    const classification = [
        {value: '0', label: 'Work'},
        {value: '1', label: 'Study'},
        {value: '2', label: 'Personal'}
    ];

    const [opened, setOpened] = useState(false);
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            priority: 0,
            classification: '0',
        }
    });

    const setTaskList = useSetRecoilState(taskListState);

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Create task"
            >
                <form onSubmit={form.onSubmit(values => {
                    fetch('http://localhost:5000/new', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })
                        .then(body => body.json())
                        .then(task => {
                            setTaskList((old) => [
                                ...old,
                                task,
                            ]);
                            setOpened(false);
                            form.reset();
                        });
                })}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <TextInput
                            required
                            label="Title"
                            {...form.getInputProps('title')}
                        />

                        <TextInput
                            required
                            label="Description"
                            {...form.getInputProps('description')}
                        />

                        <NumberInput
                            required
                            label="Priority"
                            {...form.getInputProps('priority')}
                        />

                        <Select
                            required
                            label="Classification"
                            data={classification}
                            {...form.getInputProps('classification')}
                        />
                    </div>
                    <Group position="right" mt="md">
                        <Button type="submit">Submit</Button>
                    </Group>
                </form>
            </Modal>
            <ActionIcon
                variant="filled"
                sx={{ borderRadius: '25%' }}
                size='xl'
                onClick={() => setOpened(true)}
                color='green'
            >
                <Pencil/>
            </ActionIcon>
        </>
    );
}