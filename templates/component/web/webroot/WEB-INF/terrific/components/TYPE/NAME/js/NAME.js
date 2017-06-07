/**
 * Basic Module description.
 */
T.Module.<%= Name %> = T.createModule({
  _selectors: {},
  _eventNames: {},
  _stateClasses: {},

  start(resolve) {
    // this.$ctx will contain a jQuery reference to the root element in the DOM.
    resolve();
  },

  sync() {
    // Called when start() method of all registered modules was called.
  }
});
