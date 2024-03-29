/**
@license
Copyright (c) 2016 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ElementMixin } from '@vaadin/component-base/src/element-mixin.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
/**
 * `<collapsible-vaadin-split-layout>` is a Web Component implementing a split layout for two
 * content elements with a draggable splitter between them.
 *
 * ```html
 * <collapsible-vaadin-split-layout>
 *   <div>First content element</div>
 *   <div>Second content element</div>
 * </collapsible-vaadin-split-layout>
 * ```
 *
 * ### Horizontal and Vertical Layouts
 *
 * By default, the split's orientation is horizontal, meaning that the content elements are
 * positioned side by side in a flex container with a horizontal layout.
 *
 * You can change the split mode to vertical by setting the `orientation` attribute to `"vertical"`:
 *
 * ```html
 * <collapsible-vaadin-split-layout orientation="vertical">
 *   <div>Content on the top</div>
 *   <div>Content on the bottom</div>
 * </collapsible-vaadin-split-layout>
 * ```
 *
 * ### Layouts Combination
 *
 * For the layout contents, we usually use `<div>` elements in the examples,
 * although you can use any other elements as well.
 *
 * For instance, in order to have a nested vertical split layout inside a
 * horizontal one, you can include `<collapsible-vaadin-split-layout>` as a content element
 * inside another split layout:
 *
 * ```html
 * <collapsible-vaadin-split-layout>
 *   <div>First content element</div>
 *   <collapsible-vaadin-split-layout orientation="vertical">
 *     <div>Second content element</div>
 *     <div>Third content element</div>
 *   </collapsible-vaadin-split-layout>
 * </collapsible-vaadin-split-layout>
 * ```
 *
 * You can also trigger the vertical mode in JavaScript by setting the property:
 * `splitLayout.orientation = "vertical";`.
 *
 * ### Split Layout Element Height
 *
 * `<collapsible-vaadin-split-layout>` element itself is a flex container. It does not inherit
 * the parent height by default, but rather sets its height depending on the
 * content.
 *
 * You can use CSS to set the fixed height for the split layout, as usual with any
 * block element:
 *
 * ```html
 * <collapsible-vaadin-split-layout style="height: 200px;">
 *   <div>First content element</div>
 *   <div>Second content element</div>
 * </collapsible-vaadin-split-layout>
 * ```
 *
 * It is possible to define percentage height as well. Note that you have to set
 * the parent height in order to make percentages work correctly. In the following
 * example, the `<body>` is resized to fill the entire viewport, and the
 * `<collapsible-vaadin-split-layout>` element is set to take 100% height of the `<body>`:
 *
 * ```html
 * <body style="height: 100vh; margin: 0;">
 *   <collapsible-vaadin-split-layout style="height: 100%;">
 *     <div>First</div>
 *     <div>Second</div>
 *   </collapsible-vaadin-split-layout>
 * </body>
 * ```
 *
 * Alternatively, you can use a flexbox layout to make `<collapsible-vaadin-split-layout>`
 * fill up the parent:
 *
 * ```html
 * <body style="height: 100vh; margin: 0; display: flex;">
 *   <collapsible-vaadin-split-layout style="flex: 1;">
 *     <div>First</div>
 *     <div>Second</div>
 *   </collapsible-vaadin-split-layout>
 * </body>
 * ```
 *
 * ### Initial Splitter Position
 *
 * The initial splitter position is determined from the sizes of the content elements
 * inside the split layout. Therefore, changing `width` on the content elements
 * affects the initial splitter position for the horizontal layouts, while `height`
 * affects the vertical ones.
 *
 * Note that when the total size of the content elements does not fit the layout,
 * the content elements are scaled proportionally.
 *
 * When setting initial sizes with relative units, such as percentages, it is
 * recommended to assign the size for both content elements:
 *
 * ```html
 * <collapsible-vaadin-split-layout>
 *   <div style="width: 75%;">Three fourths</div>
 *   <div style="width: 25%;">One fourth</div>
 * </collapsible-vaadin-split-layout>
 * ```
 *
 * ### Size Limits
 *
 * The `min-width`/`min-height`, and `max-width`/`max-height` CSS size values
 * for the content elements are respected and used to limit the splitter position
 * when it is dragged.
 *
 * It is preferred to set the limits only for a single content element, in order
 * to avoid size conflicts:
 *
 * ```html
 * <collapsible-vaadin-split-layout>
 *   <div style="min-width: 50px; max-width: 150px;">First</div>
 *   <div>Second</div>
 * </collapsible-vaadin-split-layout>
 * ```
 *
 * ### Resize Notification
 *
 * This element implements `IronResizableBehavior` to notify the nested resizables
 * when the splitter is dragged. In order to define a resizable and receive that
 * notification in a nested element, include `IronResizableBehavior` and listen
 * for the `iron-resize` event.
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description | Theme for Element
 * ----------------|----------------|----------------
 * `splitter` | Split element | collapsible-vaadin-split-layout
 * `handle` | The handle of the splitter | collapsible-vaadin-split-layout
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends PolymerElement
 * @mixes ThemableMixin
 * @mixes GestureEventListeners
 * @demo demo/index.html
 */
class CollapsibleSplitLayoutElement extends
	ElementMixin(
		ThemableMixin(
			GestureEventListeners(
				mixinBehaviors([IronResizableBehavior], PolymerElement)))) {
	static get template() {
		return html`
    <style>
      :host {
        display: flex;
        overflow: hidden !important;
        transform: translateZ(0);
      }

      :host([hidden]) {
        display: none !important;
      }

      :host([orientation="vertical"]) {
        flex-direction: column;
      }

      :host ::slotted(*) {
        flex: 1 1 auto;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }

      [part="splitter"] {
        flex: none;
        position: relative;
        z-index: 1;
        overflow: visible;
        min-width: 8px;
        min-height: 8px;
      }

      :host(:not([orientation="vertical"])) > [part="splitter"] {
        cursor: ew-resize;
      }

      :host([orientation="vertical"]) > [part="splitter"] {
        cursor: ns-resize;
      }

      [part="handle"] {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    </style>
    <slot id="primary" name="primary"></slot>
    <div part="splitter" id="splitter" on-track="_onHandleTrack" on-down="_setPointerEventsNone" on-up="_restorePointerEvents">
      <div part="handle"></div>
      <div part="toggle">
        <div part="toggle-left" on-click="_onToggleLeft"></div>
        <div part="toggle-right" on-click="_onToggleRight"></div>
      </div>
    </div>
    <slot id="secondary" name="secondary"></slot>

    <div hidden="">
      <!-- Workaround to fix a Shady style scoping issue caused by dynamic slot naming of the child elements (primary/secondary) -->
      <slot></slot>
    </div>
`;
	}

	static get is() {
		return 'collapsible-vaadin-split-layout';
	}

	static get version() {
		return '1.0.0';
	}

	static get properties() {
		return {
			/**
			 * The split layout's orientation. Possible values are: `horizontal|vertical`.
			 */
			orientation: {
				type: String,
				reflectToAttribute: true,
				value: 'horizontal'
			},
			/**
			 * The split layout's collapsible components. Possible values are: `none|primary|secondary|primaryAndSecondary`.
			 */
			collapsibleComponents: {
				type: String,
				reflectToAttribute: true,
				value: 'none'
			},
			/**
			 * If true the primary component is collapsed. If the secondary component was collapsed, setting primaryCollapsed to true
			 * will set secondaryCollapsed to false.
			 */
			primaryCollapsed: {
				type: Boolean,
				value: false,
				reflectToAttribute: true,
				notify: true,
				observer: '_primaryCollapsedChanged'
			},
			/**
			 * If true the secondary component is collapsed. If the primary component was collapsed, setting secondaryCollapsed to true
			 * will set secondaryCollapsed to false.
			 */
			secondaryCollapsed: {
				type: Boolean,
				value: false,
				reflectToAttribute: true,
				notify: true,
				observer: '_secondaryCollapsedChanged'
			},

			_previousPrimaryPointerEvents: String,
			_previousSecondaryPointerEvents: String
		};
	}

	ready() {
		super.ready();
		new FlattenedNodesObserver(this, this._processChildren);
	}

	_onToggleLeft(e) {
		if (this.secondaryCollapsed) {
			this.secondaryCollapsed = false;
			var size = this.orientation === 'vertical' ? 'height' : 'width';
			if (this._secondaryChild.getBoundingClientRect()[size] < 1) {
				this._secondaryChild.style.flexBasis = "20px"
			}
		} else {
			this.primaryCollapsed = true;
		}
	}

	_onToggleRight(e) {
		if (this.primaryCollapsed) {
			this.primaryCollapsed = false;
			var size = this.orientation === 'vertical' ? 'height' : 'width';
			if (this._primaryChild.getBoundingClientRect()[size] < 1) {
				this._primaryChild.style.flexBasis = "20px"
			}
		} else {
			this.secondaryCollapsed = true;
		}
	}

	_primaryCollapsedChanged(primaryCollapsed) {
		if (this._primaryChild && this._secondaryChild) {
			this._primaryChild.style.display = primaryCollapsed ? 'none' : 'flex';
			this.notifyResize();
		}
	}

	_secondaryCollapsedChanged(secondaryCollapsed) {
		if (this._primaryChild && this._secondaryChild) {
			this._secondaryChild.style.display = secondaryCollapsed ? 'none' : 'flex';
			this.notifyResize();
		}
	}

	_processChildren() {
		console.log('_processChildren');
		this.getEffectiveChildren().forEach((child, i) => {
			if (i === 0) {
				this._primaryChild = child;
				child.setAttribute('slot', 'primary');
			} else if (i == 1) {
				this._secondaryChild = child;
				child.setAttribute('slot', 'secondary');
			} else {
				child.removeAttribute('slot');
			}
		});
	}

	_setFlexBasis(element, flexBasis, containerSize) {
		flexBasis = Math.max(0, Math.min(flexBasis, containerSize));
		if (flexBasis === 0) {
			// Pure zero does not play well in Safari
			flexBasis = 0.000001;
		}
		element.style.flex = '1 1 ' + flexBasis + 'px';
	}

	_setPointerEventsNone(event) {
		if (!this._primaryChild || !this._secondaryChild) {
			return;
		}
		this._previousPrimaryPointerEvents = this._primaryChild.style.pointerEvents;
		this._previousSecondaryPointerEvents = this._secondaryChild.style.pointerEvents;
		this._primaryChild.style.pointerEvents = 'none';
		this._secondaryChild.style.pointerEvents = 'none';

		event.preventDefault();
	}

	_restorePointerEvents() {
		if (!this._primaryChild || !this._secondaryChild) {
			return;
		}
		this._primaryChild.style.pointerEvents = this._previousPrimaryPointerEvents;
		this._secondaryChild.style.pointerEvents = this._previousSecondaryPointerEvents;
	}

	_onHandleTrack(event) {
		if (!this._primaryChild || !this._secondaryChild) {
			return;
		}

		var size = this.orientation === 'vertical' ? 'height' : 'width';
		if (event.detail.state === 'start') {
			this._startSize = {
				container: this.getBoundingClientRect()[size] - this.$.splitter.getBoundingClientRect()[size],
				primary: this._primaryChild.getBoundingClientRect()[size],
				secondary: this._secondaryChild.getBoundingClientRect()[size]
			};

			return;
		}

		var distance = this.orientation === 'vertical' ? event.detail.dy : event.detail.dx;
		const isRtl = this.orientation !== 'vertical' && this.getAttribute('dir') === 'rtl';
		const dirDistance = isRtl ? -distance : distance;

		this._setFlexBasis(this._primaryChild, this._startSize.primary + dirDistance, this._startSize.container);
		this._setFlexBasis(this._secondaryChild, this._startSize.secondary - dirDistance, this._startSize.container);

		if (this.primaryCollapsed || this.secondaryCollapsed) {
			this.primaryCollapsed = false;
			this.secondaryCollapsed = false;
		}

		this.notifyResize();

		if (event.detail.state === 'end') {
			this.dispatchEvent(new CustomEvent('splitter-dragend'));

			if (this.collapsibleComponents != 'none') {
				if (this._primaryChild.getBoundingClientRect()[size] < 1) {
					this.primaryCollapsed = true;
				} else if (this._secondaryChild.getBoundingClientRect()[size] < 1) {
					this.secondaryCollapsed = true;
				}
			}


			delete this._startSize;
		}
	}

	/**
	 * Fired when the splitter is dragged. Non-bubbling. Fired for the splitter
	 * element and any nested elements with `IronResizableBehavior`.
	 *
	 * @event iron-resize
	 */

	/**
	 * Fired after dragging the splitter have ended.
	 *
	 * @event splitter-dragend
	 */
}

customElements.define(CollapsibleSplitLayoutElement.is, CollapsibleSplitLayoutElement);

export { CollapsibleSplitLayoutElement };
