import { EventBus } from '../event/EventBus';
import set from '../helpers/set';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
    private state: any = {};

    public set(path: string, data: unknown) {
        set(this.state, path, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();


// TODO: check how to with store
// export function withStore(mapStateToProps: (state: any) => any) {
//   return function wrap(Component: typeof Block) {
//     let previousState: any;
//
//     // @ts-ignore
//     return class WithStore extends Component {
//       constructor(props: any) {
//         previousState = mapStateToProps(store.getState());
//
//         super({ ...props, ...previousState });
//
//         store.on(StoreEvents.Updated, () => {
//           const stateProps = mapStateToProps(store.getState());
//
//           previousState = stateProps;
//
//           this.setProps({ ...stateProps });
//         });
//       }
//     };
//   };
// }

export default store;
