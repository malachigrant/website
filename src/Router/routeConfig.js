import HomePage from 'pages/HomePage';
import ThemePage from 'pages/ThemePage';

export const config = [
  { path: '/', name: 'Home', component: HomePage, exact: true },
  { path: '/theme', name: 'Theme', component: ThemePage },
];

export default config;
