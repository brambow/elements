/**
 * Takes a Context Consumer component (or context object that has a Consumer)
 * and binds all the given components to this Consumer instance, returning
 * the components passed in as an array.
 *
 * @example
 * const context = createContext({})
 * const [BoundComp1, BoundComp2] = bindComponentsTo(context)(Comp1, Comp2)
 */
const bindComponentsTo = Consumer => (...components) =>
  components.map(Component => Component.bindTo(Consumer.Consumer || Consumer));

export default bindComponentsTo;
