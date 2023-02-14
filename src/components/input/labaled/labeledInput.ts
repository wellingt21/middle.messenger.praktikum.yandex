
// import { validateInput } from '../../../../utils/validation/validateInput';

import Block from "../../../core/block/block2";
import Input from "../input";

interface LabeledInputProps {
  labelText?: string;
  type: string;
  name: string;
  id: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  events?: {
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
    input?: (event: Event) => void;
  };
}

export default class LabeledInput extends Block<any> {
  constructor(props: LabeledInputProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
        type: this.props.type,
        name: this.props.name,
        id: this.props.id,
        disabled: this.props.disabled,
        value: this.props.value,
        placeholder: this.props.placeholder,
        onBlur: this.props.blur,
        onFocus: this.props.focus,
        // events: { focusin: onFocus, focusout: onBlur }
    }) as unknown as Block;
  }

  protected componentDidUpdate(
    newProps: LabeledInputProps,
  ): boolean {
    (this.children.input as Block<any>).setState({
      value: newProps.value,
    });

    return true;
  }

    render() {
        return `
            <label class="text-input" for={{id}}>{{ labelText }}
                {{{input}}}
                <div class="text-input__tip" id="tip_{{id}}">
                {{tip}}
                </div>
                <p class="text-input__validation" id="validate_{{id}}">{{errorMessage}}</p>
            </label>
        `
    }
}
