package org.vaadin.tarek;

public enum CollapsibleSplitLayoutVariant {
    LUMO_MINIMAL("minimal"), LUMO_SMALL("small");

    private final String variant;

    CollapsibleSplitLayoutVariant(String variant) {
        this.variant = variant;
    }

    /**
     * Gets the variant name.
     *
     * @return variant name
     */
    public String getVariantName() {
        return variant;
    }
}
