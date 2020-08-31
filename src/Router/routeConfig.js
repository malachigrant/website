import HomePage from 'pages/HomePage';
import ThemePage from 'pages/ThemePage';
import TodoPage from 'pages/TodoPage';

export const config = [
  { path: '/', name: 'Home', component: HomePage, exact: true },
  { path: '/theme', name: 'Theme', component: ThemePage },
  { path: '/todo', name: 'Todo', component: TodoPage },
];

export default config;
