export const template = `
  <form action="{{ action }}">
      <button 
        class="button  {{#if modification}}button_{{modification}}{{/if}}" 
        type="{{type}}" 
        formaction="{{ action }}">
          {{ text }}
      </button>
  </form>
`
