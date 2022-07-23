import { Badge, Box, Group, Title, useMantineTheme } from '@mantine/core';

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
            <Group>
                <Title order={3}>{task.title}</Title>
                <Badge>{['Work', 'Study', 'School'][task.classification]}</Badge>
            </Group>
            <Box>{task.description}</Box>
        </Box>
    );
}