package org.vaadin.tarek;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.vaadin.flow.component.ClickNotifier;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.HasTheme;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.shared.Registration;

@NpmPackage(value = "@polymer/polymer", version = "3.5.1")
@NpmPackage(value = "@polymer/iron-resizable-behavior", version = "3.0.1")
@JsModule("./src/collapsible-vaadin-split-layout.js")
@JsModule("./src/collapsible-vaadin-split-layout-styles.js")
@Tag("collapsible-vaadin-split-layout")
public abstract class GeneratedCollapsibleVaadinSplitLayout<R extends GeneratedCollapsibleVaadinSplitLayout<R>>
        extends Component
        implements HasStyle, ClickNotifier<R>, HasTheme {

    @DomEvent("iron-resize")
    public static class IronResizeEvent<R extends GeneratedCollapsibleVaadinSplitLayout<R>>
            extends ComponentEvent<R> {
        public IronResizeEvent(R source, boolean fromClient) {
            super(source, fromClient);
        }
    }

    @DomEvent("splitter-dragend")
    public static class SplitterDragendEvent<R extends GeneratedCollapsibleVaadinSplitLayout<R>>
            extends ComponentEvent<R> {
        public SplitterDragendEvent(R source, boolean fromClient) {
            super(source, fromClient);
        }
    }

    /**
     * Adds a listener for {@code iron-resize} events fired by the webcomponent.
     *
     * @param listener
     *            the listener
     * @return a {@link Registration} for removing the event listener
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    protected Registration addIronResizeListener(
            ComponentEventListener<IronResizeEvent<R>> listener) {
        return addListener(IronResizeEvent.class,
                (ComponentEventListener) listener);
    }

    /**
     * Adds a listener for {@code splitter-dragend} events fired by the
     * webcomponent.
     *
     * @param listener
     *            the listener
     * @return a {@link Registration} for removing the event listener
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    protected Registration addSplitterDragendListener(
            ComponentEventListener<SplitterDragendEvent<R>> listener) {
        return addListener(SplitterDragendEvent.class,
                (ComponentEventListener) listener);
    }

    /**
     * Adds theme variants to the component.
     *
     * @param variants
     *            theme variants to add
     */
    public void addThemeVariants(CollapsibleSplitLayoutVariant... variants) {
        getThemeNames().addAll(Stream.of(variants)
                .map(CollapsibleSplitLayoutVariant::getVariantName)
                .collect(Collectors.toList()));
    }

    /**
     * Adds the given components as children of this component at the slot
     * 'primary'.
     *
     * @param components
     *            The components to add.
     * @see <a href=
     *      "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">MDN
     *      page about slots</a>
     * @see <a href=
     *      "https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element">Spec
     *      website about slots</a>
     */
    protected void addToPrimary(Component... components) {
        for (Component component : components) {
            component.getElement().setAttribute("slot", "primary");
            getElement().appendChild(component.getElement());
        }
    }

    /**
     * Adds the given components as children of this component at the slot
     * 'secondary'.
     *
     * @param components
     *            The components to add.
     * @see <a href=
     *      "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">MDN
     *      page about slots</a>
     * @see <a href=
     *      "https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element">Spec
     *      website about slots</a>
     */
    protected void addToSecondary(Component... components) {
        for (Component component : components) {
            component.getElement().setAttribute("slot", "secondary");
            getElement().appendChild(component.getElement());
        }
    }

    /**
     * <p>
     * Description copied from corresponding location in WebComponent:
     * </p>
     * <p>
     * The split layout's orientation. Possible values are:
     * {@code horizontal|vertical}.
     * <p>
     * This property is not synchronized automatically from the client side, so
     * the returned value may not be the same as in client side.
     * </p>
     *
     * @return the {@code orientation} property from the webcomponent
     */
    protected String getOrientationString() {
        return getElement().getProperty("orientation");
    }

    /**
     * Removes the given child components from this component.
     *
     * @param components
     *            The components to remove.
     * @throws IllegalArgumentException
     *             if any of the components is not a child of this component.
     */
    protected void remove(Component... components) {
        for (Component component : components) {
            if (getElement().equals(component.getElement().getParent())) {
                component.getElement().removeAttribute("slot");
                getElement().removeChild(component.getElement());
            } else {
                throw new IllegalArgumentException("The given component ("
                        + component + ") is not a child of this component");
            }
        }
    }

    /**
     * Removes all contents from this component, this includes child components,
     * text content as well as child elements that have been added directly to
     * this component using the {@link Element} API.
     */
    protected void removeAll() {
        getElement().getChildren()
                .forEach(child -> child.removeAttribute("slot"));
        getElement().removeAllChildren();
    }

    /**
     * Removes theme variants from the component.
     *
     * @param variants
     *            theme variants to remove
     */
    public void removeThemeVariants(CollapsibleSplitLayoutVariant... variants) {
        getThemeNames().removeAll(Stream.of(variants)
                .map(CollapsibleSplitLayoutVariant::getVariantName)
                .collect(Collectors.toList()));
    }

    /**
     * <p>
     * Description copied from corresponding location in WebComponent:
     * </p>
     * <p>
     * The split layout's orientation. Possible values are:
     * {@code horizontal|vertical}.
     * </p>
     *
     * @param orientation
     *            the String value to set
     */
    protected void setOrientation(String orientation) {
        getElement().setProperty("orientation",
                orientation == null ? "" : orientation);
    }
}
