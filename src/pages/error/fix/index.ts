import { renderDOM } from '../../../core/renderDOM';
import { ErrorPage } from '../error';

window.addEventListener('DOMContentLoaded', () => {
  const error505 = new ErrorPage({
    statusCode: 505,
    errorMessage: 'Мы уже фиксим',
  });
  renderDOM('#app', error505);
});
