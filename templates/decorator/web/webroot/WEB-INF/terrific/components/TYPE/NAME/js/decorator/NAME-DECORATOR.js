// @flow

import T from 'terrific';
import $ from 'jquery';

/**
 * Basic Decorator description.
 */
T.Module.<%= Name %>.<%= Decorator %> = T.createDecorator({
	start(resolve: () => void) {
		// this.$ctx will contain a jQuery reference to the root element in the DOM.
		this._parent.start(resolve);
	},

	sync() {
		// Called when start() method of all registered modules was called.
	}
});
