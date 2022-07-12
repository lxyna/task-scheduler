import { Box, Checkbox, Group, Space, Title, useMantineTheme } from '@mantine/core';

export default function TaskCard({ task }) {
    const theme = useMantineTheme();

    return (
        <Box sx={{
            backgroundColor: theme.colors.dark[6],
            padding: '1em',
            margin: '.5em',
            width: '80%',
            borderRadius: '.5em',
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Title order={4}>{task.title}</Title>
                <Box>{task.description}</Box>
            </Box>
            {task.subtasks.length > 0 &&
            <>
                <Space h='md'/>
                <Group
                    spacing='sm'
                    size='sm'
                    direction='column'
                >
                    {task.subtasks.map((x, i) =>
                        <Checkbox
                            key={i}
                            defaultChecked={x.completed}
                            label={x.description}
                        />
                    )}
                </Group>
            </>
            }
        </Box>
    );
}