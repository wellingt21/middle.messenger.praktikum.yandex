import { renderDom } from '../../core/renderDom';
import { AuthPage } from './login';

window.addEventListener('DOMContentLoaded', () => {
  const authPage = new AuthPage();
  renderDom('#app', authPage);
});
