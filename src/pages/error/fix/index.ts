import { renderDom } from '../../../core/renderDom';
import { ErrorPage } from '../error';

window.addEventListener('DOMContentLoaded', () => {
  const error505 = new ErrorPage({
    statusCode: 505,
    errorMessage: 'Мы уже фиксим',
  });
  renderDom('#app', error505);
});
