package org.vaadin.tarek;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.router.Route;

@Route("")
public class View extends Div {

    public View() {
        Div primaryComponent = new Div(new H2("Primary component"));
        Div secondaryComponent = new Div(new H2("Secondary component"));

        CollapsibleSplitLayout collapsibleSplitLayout = new CollapsibleSplitLayout(
                primaryComponent, secondaryComponent);
        collapsibleSplitLayout.setSizeFull();

        collapsibleSplitLayout.setPrimaryComponentCollapsible(true);
        collapsibleSplitLayout.setSecondaryComponentCollapsible(true);

        Button primaryToggle = new Button("Toggle primary's collapsibility",
                e -> collapsibleSplitLayout
                        .setPrimaryComponentCollapsible(!collapsibleSplitLayout
                                .isPrimaryComponentCollapsible()));
        Button secondaryToggle = new Button("Toggle secondary's collapsibility",
                e -> collapsibleSplitLayout.setSecondaryComponentCollapsible(
                        !collapsibleSplitLayout
                                .isSecondaryComponentCollapsible()));

        add(primaryToggle, secondaryToggle, collapsibleSplitLayout);
        setSizeFull();
    }
}
