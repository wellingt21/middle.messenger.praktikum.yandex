
// import { withRouter } from '../../../hocs/withRouter';
import Block from "../../core/block/Block";

interface LinkProps {
    text: string;
    href: string;
    class?: string;
    events?: {
        click: () => void;
    };
}

export default  class BaseLink extends Block<any> {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: () => this.navigate(),
            },
        });
    }

    navigate() {
        this.router.go(this.props.href)

    }

    render (): string {
        return `
            <span
              {{#if class}}
                class={{class}}
              {{else}}
                class="button-link"
              {{/if}}
              href={{ href }}>
              {{ text }}
            </span>
        `
    }
}

// TODO: implement it with router
// export const Link = withRouter(BaseLink);
