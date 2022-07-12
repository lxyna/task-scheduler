import { AppShell, useMantineTheme } from '@mantine/core';
import TaskList from '../components/TaskList';

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
        </AppShell>
    );
}