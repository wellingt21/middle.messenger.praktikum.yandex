import Block from '../../core/block/Block'

export default class ErrorPage extends Block<Record<string, never>> {
  protected render (): string {
    return `
      <main class="flex justify-around m-">
        <section class="w-340">
          <form class="signup-form flex flex-col gap-3 items-center">
            <h1 class="signup-form-title">500</h1>
            <h2 class="signup-form-title">Мы уже фиксим</h2>
            {{{Button text="Назад к чатам" modificator="primary" type="submit" action="/" }}}
          </form>
        </section>
      </main>
    `
  }
}
