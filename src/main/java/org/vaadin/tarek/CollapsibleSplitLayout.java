package org.vaadin.tarek;

import java.util.Objects;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.HasSize;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.dom.ElementConstants;
import com.vaadin.flow.internal.StateTree;
import com.vaadin.flow.shared.Registration;

public class CollapsibleSplitLayout
        extends GeneratedCollapsibleVaadinSplitLayout<CollapsibleSplitLayout>
        implements HasSize {

    /**
     * numeration of all available orientation for VaadinSplitLayout component
     */
    public enum Orientation {
        HORIZONTAL, VERTICAL;
    }

    private Component primaryComponent;
    private boolean primaryComponentCollapsible;
    private Component secondaryComponent;
    private boolean secondaryComponentCollapsible;
    private Double splitterPosition;

    private StateTree.ExecutionRegistration updateStylesRegistration;

    /**
     * Constructs an empty VaadinSplitLayout.
     */
    public CollapsibleSplitLayout() {
        setOrientation(Orientation.HORIZONTAL);
        addAttachListener(
                e -> requestStylesUpdatesForSplitterPosition(e.getUI()));
    }

    /**
     * Constructs a VaadinSplitLayout with the given initial components to set
     * to the primary and secondary splits.
     *
     * @param primaryComponent
     *            the component set to the primary split
     * @param secondaryComponent
     *            the component set to the secondary split
     */
    public CollapsibleSplitLayout(Component primaryComponent,
            Component secondaryComponent) {
        this();
        addToPrimary(primaryComponent);
        addToSecondary(secondaryComponent);
    }

    /**
     * Adds a listener for the {@code splitter-dragend} event, which is fired
     * when the user has stopped resizing the splitter with drag and drop.
     *
     * @param listener
     *            the listener to add
     * @return a registration for removing the listener
     */
    @Override
    public Registration addSplitterDragendListener(
            ComponentEventListener<SplitterDragendEvent<CollapsibleSplitLayout>> listener) {
        return super.addSplitterDragendListener(listener);
    }

    /**
     * Sets the given components to the primary split of this layout, i.e. the
     * left split if in horizontal mode and the top split if in vertical mode.
     * <p>
     * <b>Note:</b> Calling this method with multiple arguments will wrap the
     * components inside a {@code <div>} element.
     * <p>
     * <b>Note:</b> Removing the primary component through the component API
     * will move the secondary component to the primary split, causing this
     * layout to desync with the server. This is a known issue.
     *
     * @see #setOrientation(Orientation)
     */
    @Override
    public void addToPrimary(Component... components) {
        if (components.length == 1) {
            primaryComponent = components[0];
        } else {
            Div container = new Div();
            container.add(components);
            primaryComponent = container;
        }
        setComponents();
    }

    /**
     * Sets the given components to the secondary split of this layout, i.e. the
     * right split if in horizontal mode and the bottom split if in vertical
     * mode.
     * <p>
     * <b>Note:</b> Calling this method with multiple arguments will wrap the
     * components inside a {@code <div>} element.
     *
     * @see #setOrientation(Orientation)
     */
    @Override
    public void addToSecondary(Component... components) {
        if (components.length == 1) {
            secondaryComponent = components[0];
        } else {
            Div container = new Div();
            container.add(components);
            secondaryComponent = container;
        }
        setComponents();
    }

    /**
     * Get the orientation of the SplitLayout.
     * <p>
     * Default value is {@link Orientation#HORIZONTAL}.
     * <p>
     * <em>NOTE:</em> This property is not synchronized automatically from the
     * client side, so the returned value may not be the same as in client side.
     * </p>
     *
     *
     * @return the {@code orientation} property of the SplitLayout.
     */
    public Orientation getOrientation() {
        return Orientation.valueOf(super.getOrientationString().toUpperCase());
    }

    /**
     * Get the component currently set to the primary split.
     *
     * @return the primary component, may be null
     */
    public Component getPrimaryComponent() {
        return primaryComponent;
    }

    /**
     * Get the component currently set to the secondary split.
     *
     * @return the primary component, may be null
     */
    public Component getSecondaryComponent() {
        return secondaryComponent;
    }

    /**
     * See {@link #setPrimaryComponentCollapsible(boolean)}
     *
     * @return whether the primary component is collapsible
     */
    public boolean isPrimaryComponentCollapsible() {
        return primaryComponentCollapsible;
    }

    /**
     * See {@link #setSecondaryComponentCollapsible(boolean)}
     *
     * @return whether the secondary component is collapsible
     */
    public boolean isSecondaryComponentCollapsible() {
        return secondaryComponentCollapsible;
    }

    @Override
    public void remove(Component... components) {
        super.remove(components);
    }

    /**
     * Removes the primary and the secondary components.
     */
    @Override
    public void removeAll() {
        super.removeAll();
    }

    private void requestStylesUpdatesForSplitterPosition(UI ui) {
        if (updateStylesRegistration != null) {
            updateStylesRegistration.remove();
        }
        updateStylesRegistration = ui.beforeClientResponse(this, context -> {
            // Remove flex property for primary and secondary children.
            final String JS = "for(let i = 0;i < this.children.length;i++)"
                    + "if(this.children[i].slot === 'primary'"
                    + "   || this.children[i].slot === 'secondary')"
                    + "this.children[i].style.flex = ''";
            getElement().executeJs(JS);

            // Update width or height if splitter position is set.
            updateStylesForSplitterPosition();

            updateStylesRegistration = null;
        });
    }

    private void setComponents() {
        removeAll();
        if (primaryComponent == null) {
            super.addToPrimary(new Div());
        } else {
            super.addToPrimary(primaryComponent);
        }
        if (secondaryComponent == null) {
            super.addToSecondary(new Div());
        } else {
            super.addToSecondary(secondaryComponent);
        }
    }

    private void setInnerComponentStyle(String styleName, String value,
            boolean primary) {
        Component innerComponent = primary ? primaryComponent
                : secondaryComponent;
        if (innerComponent != null) {
            innerComponent.getElement().getStyle().set(styleName, value);
        } else {
            getElement().executeJs(
                    "var element = this.children[$0]; if (element) { element.style[$1]=$2; }",
                    primary ? 0 : 1, styleName, value);
        }
    }

    /**
     * Set the orientation of the SplitLayout.
     * <p>
     * Default value is {@link Orientation#HORIZONTAL}.
     *
     *
     * @param orientation
     *            the orientation of the SplitLayout. Valid enumerate values are
     *            VERTICAL and HORIZONTAL, never {@code null}
     */
    public void setOrientation(Orientation orientation) {
        Objects.requireNonNull(orientation, "Orientation cannot be null");
        this.setOrientation(orientation.toString().toLowerCase());
    }

    /**
     * If set to true, will enable the user to collapse the primary component of
     * the VaadinSplitLayout.
     *
     * @param isCollapsible
     *            The boolean value to set
     */
    public void setPrimaryComponentCollapsible(boolean isCollapsible) {
        primaryComponentCollapsible = isCollapsible;
        updateCollapsibleComponents();
    }

    /**
     * Set a style to the component in the primary split.
     *
     * @param styleName
     *            name of the style to set
     * @param value
     *            the value to set
     */
    public void setPrimaryStyle(String styleName, String value) {
        setInnerComponentStyle(styleName, value, true);
    }

    /**
     * If set to true, will enable the user to collapse the secondary component
     * of the VaadinSplitLayout.
     *
     * @param isCollapsible
     *            The boolean value to set
     */
    public void setSecondaryComponentCollapsible(boolean isCollapsible) {
        secondaryComponentCollapsible = isCollapsible;
        updateCollapsibleComponents();
    }

    /**
     * Set a style to the component in the secondary split.
     *
     * @param styleName
     *            name of the style to set
     * @param value
     *            the value to set
     */
    public void setSecondaryStyle(String styleName, String value) {
        setInnerComponentStyle(styleName, value, false);
    }

    /**
     * Sets the relative position of the splitter in percentages. The given
     * value is used to set how much space is given to the primary component
     * relative to the secondary component. In horizontal mode this is the width
     * of the component and in vertical mode this is the height. The given value
     * will automatically be clamped to the range [0, 100].
     *
     * @param position
     *            the relative position of the splitter, in percentages
     */
    public void setSplitterPosition(double position) {
        splitterPosition = position;
        getUI().ifPresent(this::requestStylesUpdatesForSplitterPosition);
    }

    private void updateCollapsibleComponents() {
        String attributeName = "collapsible-components";

        if (isPrimaryComponentCollapsible()
                && isSecondaryComponentCollapsible()) {
            getElement().setAttribute(attributeName, "primaryAndSecondary");
        } else if (isPrimaryComponentCollapsible()) {
            getElement().setAttribute(attributeName, "primary");
        } else if (isSecondaryComponentCollapsible()) {
            getElement().setAttribute(attributeName, "secondary");
        } else {
            getElement().setAttribute(attributeName, "none");
        }
    }

    private void updateStylesForSplitterPosition() {
        if (splitterPosition == null) {
            return;
        }
        double primary = Math.min(Math.max(splitterPosition, 0), 100);
        double secondary = 100 - primary;
        String styleName;
        if (getOrientation() == Orientation.VERTICAL) {
            styleName = ElementConstants.STYLE_HEIGHT;
        } else {
            styleName = ElementConstants.STYLE_WIDTH;
        }
        setPrimaryStyle(styleName, primary + "%");
        setSecondaryStyle(styleName, secondary + "%");
    }
}
