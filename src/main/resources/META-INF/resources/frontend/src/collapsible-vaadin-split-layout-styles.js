import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="lumo-collapsible-split-layout" theme-for="collapsible-vaadin-split-layout">
  <template>
    <style>
      [part="splitter"] {
        min-width: var(--lumo-space-s);
        min-height: var(--lumo-space-s);
        background-color: var(--lumo-contrast-5pct);
        transition: 0.1s background-color;
      }

      [part="handle"] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--lumo-size-m);
        height: var(--lumo-size-m);
      }

      [part="handle"]::after {
        content: "";
        display: block;
        width: 4px;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        border-radius: var(--lumo-border-radius);
        background-color: var(--lumo-contrast-30pct);
        transition: 0.1s opacity, 0.1s background-color;
      }

      :host([orientation="vertical"]) [part="handle"]::after {
        width: 100%;
        height: 4px;
      }

      /* Hover style */

      [part="splitter"]:hover [part="handle"]::after {
        background-color: var(--lumo-contrast-40pct);
      }

      /* Disable hover for touch devices */
      @media (pointer: coarse) {
        [part="splitter"]:hover [part="handle"]::after {
          background-color: var(--lumo-contrast-30pct);
        }
      }

      /* Active style */

      [part="splitter"]:active [part="handle"]::after {
        background-color: var(--lumo-contrast-50pct);
      }

      /* Small/minimal */

      :host([theme~="small"]) > [part="splitter"] {
        border-left: 1px solid var(--lumo-contrast-10pct);
        border-top: 1px solid var(--lumo-contrast-10pct);
      }

      :host([theme~="small"]) > [part="splitter"],
      :host([theme~="minimal"]) > [part="splitter"] {
        min-width: 0;
        min-height: 0;
        background-color: transparent;
      }

      :host([theme~="small"]) > [part="splitter"]::after,
      :host([theme~="minimal"]) > [part="splitter"]::after {
        content: "";
        position: absolute;
        top: -4px;
        right: -4px;
        bottom: -4px;
        left: -4px;
      }

      :host([theme~="small"]) > [part="splitter"] > [part="handle"]::after,
      :host([theme~="minimal"]) > [part="splitter"] > [part="handle"]::after {
        opacity: 0;
      }

      :host([theme~="small"]) > [part="splitter"]:hover > [part="handle"]::after,
      :host([theme~="small"]) > [part="splitter"]:active > [part="handle"]::after,
      :host([theme~="minimal"]) > [part="splitter"]:hover > [part="handle"]::after,
      :host([theme~="minimal"]) > [part="splitter"]:active > [part="handle"]::after {
        opacity: 1;
      }

      /* RTL specific styles */

      :host([theme~="small"][dir="rtl"]) > [part="splitter"] {
        border-left: auto;
        border-right: 1px solid var(--lumo-contrast-10pct);
      }
      
	:host(:not([collapsible-components="none"])) [part="handle"] {
		display: none;
	}
	
	:host(:not([collapsible-components="none"])) [part="toggle"] {
		cursor: default;
		background-color: var(--lumo-contrast-10pct);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
		border-radius: 1em;
	}
	
	:host([orientation="vertical"]) [part="toggle"] {
		transform: translate3d(-50%, -50%, 0) rotate(90deg);
	}
	
	:host(:not([collapsible-components="none"])) [part="splitter"]:hover [part="toggle"] {
		background-color: var(--lumo-contrast-40pct);
	}
	
	:host(:not([collapsible-components="none"])) [part="toggle-left"]:hover {
		background-color: var(--lumo-contrast-40pct);
		border-radius: 1em;
	}
	
	:host(:not([collapsible-components="none"])) [part="toggle-right"]:hover {
		background-color: var(--lumo-contrast-40pct);
		border-radius: 1em;
	}
	
	:host([collapsible-components="primary"]) [part="toggle-left"]::after,
	:host([collapsible-components="primaryAndSecondary"]) [part="toggle-left"]::after,
	:host([secondary-collapsed]) [part="toggle-left"]::after {
		color: var(--lumo-contrast-60pct);
		font-family: "lumo-icons";
		content: var(--lumo-icons-angle-left);
	}
	
	:host([primary-collapsed]) [part="toggle-left"]::after {
		display: none;
	}
	
	:host([collapsible-components="secondary"]) [part="toggle-right"]::after,
	:host([collapsible-components="primaryAndSecondary"]) [part="toggle-right"]::after,
	:host([primary-collapsed]) [part="toggle-right"]::after {
		content: var(--lumo-icons-angle-right);
		font-family: "lumo-icons";
		color: var(--lumo-contrast-60pct);
	}
	
	:host([secondary-collapsed]) [part="toggle-right"]::after {
		display: none;
	}
      
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
