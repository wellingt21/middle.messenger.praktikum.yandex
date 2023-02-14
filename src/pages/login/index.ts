import { renderDOM } from '../../core/renderDOM';
import { AuthPage } from './login';

window.addEventListener('DOMContentLoaded', () => {
  const authPage = new AuthPage();
  renderDOM('#app', authPage);
});
