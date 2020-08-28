# Collapsible SplitLayout

An extension of Vaadin SplitLayout to enable collapsing components

One or both of the SplitLayout's components can be made collapsible using
```
CollapsibleSplitLayout collapsibleSplitLayout = new CollapsibleSplitLayout(
                new Paragraph("Primary component"),
                new Paragraph("Secondary component"));

collapsibleSplitLayout.setPrimaryComponentCollapsible(true);
collapsibleSplitLayout.setSecondaryComponentCollapsible(true);
```

![collapsible-layout.png](collapsible-layout.png?raw=true")
