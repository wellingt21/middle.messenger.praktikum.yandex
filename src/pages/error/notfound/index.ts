import { renderDOM } from '../../../core/renderDOM';
import { ErrorPage } from '../error';

window.addEventListener('DOMContentLoaded', () => {
  const error404 = new ErrorPage({
    statusCode: 404,
    errorMessage: 'Не туда попали',
  });
  renderDOM('#app', error404);
});
