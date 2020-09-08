import HomePage from 'pages/HomePage';
import ThemePage from 'pages/ThemePage';
import TodoPage from 'pages/TodoPage';

export const config = [
  { path: '/', name: 'Home', component: HomePage },
  {
    path: '/theme',
    name: 'Theme',
    component: ThemePage,
    subRoutes: [{ path: '/test', name: 'Theme test', component: HomePage }],
  },
  { path: '/todo', name: 'Todo', component: TodoPage },
];

export default config;
