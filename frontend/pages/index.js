import { AppShell, Box, useMantineTheme } from '@mantine/core';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

export default function Home() {
    const theme = useMantineTheme();

    return (
        <AppShell
            sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
            padding="md"
            styles={{
                body: {
                    flex: 1
                },
                main: {
                    backgroundColor: theme.colors.dark[8]
                }
            }}
        >
            <TaskList/>
            <Box sx={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                <AddTask/>
            </Box>
        </AppShell>
    );
}