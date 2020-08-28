package org.vaadin.tarek;

import org.junit.Assert;
import org.junit.Test;

import com.vaadin.testbench.TestBenchElement;

public class ViewIT extends AbstractViewTest {

    @Test
    public void componentWorks() {
        final TestBenchElement collapsibleSplitLayout = $(
                "collapsible-vaadin-split-layout").first();
        // Check that collapsible-vaadin-split-layout contains at least one
        // other element, which means that
        // is has been upgraded to a custom element and not just rendered as an empty
        // tag
        Assert.assertTrue(
                collapsibleSplitLayout.$(TestBenchElement.class).all()
                        .size() > 0);
    }
}
