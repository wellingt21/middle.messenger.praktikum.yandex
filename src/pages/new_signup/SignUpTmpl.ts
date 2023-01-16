const templateSignUp = `
  <main class="flex justify-around m-3">
      <section class="w-340">
          <form class="signup-form">
              <h1 class="signup-form-title">Регистрация</h1>
              {{#each fields}}
                  {{> input placeholder=placeholder id=id type=type}}
              {{/each}}
              {{> button text="Зарегистрироваться" modificator="primary"}}
              <a class="signup-form-registration-link flex justify-center mt-2" href="/login">Войти</a>
          </form>
      </section>
  </main>`

export default templateSignUp

// TODO: make buttons works
