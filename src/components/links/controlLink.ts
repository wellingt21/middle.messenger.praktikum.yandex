import Block from "../../core/block/block2";


interface ControlLinkProps {
    text: string;
    class?: string;
    events?: {
        click?: (event?: Event) => void;
    };
}

export default class ControlLink extends Block<any> {
    constructor(props: ControlLinkProps) {
        super({
            ...props,
        });
        console.log('control link built')
    }

    render (): string {

        return `
            <span {{#if class}}class="{{class}}" {{else}}class="button-link" {{/if}}>
              {{ text }} 
            </span>
        `
    }
}
