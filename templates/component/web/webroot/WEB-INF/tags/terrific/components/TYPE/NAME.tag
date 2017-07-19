<%%@ tag body-content="empty" trimDirectiveWhitespaces="true" %>
<%%@ attribute name="tag" description="The tag name used for the module context (default=div)" type="java.lang.String" rtexprvalue="false" %>
<%%@ attribute name="htmlClasses" description="The HTML class values to add to the Terrific module element" type="java.lang.String" rtexprvalue="true" %>
<%%@ attribute name="decorator" description="The skin used for the module" type="java.lang.String" rtexprvalue="false" %>
<%%@ attribute name="dataConnectors" description="The data-connectors used for the module" type="java.lang.String" rtexprvalue="false" %>
<%%@ attribute name="attributes" description="Additional attributes as comma-separated list, e.g. id='123',role='banner'" type="java.lang.String" rtexprvalue="false" %>
<%%@ attribute name="template" description="The template used for rendering of the module" type="java.lang.String" rtexprvalue="false" %>

<%%@ include file="../../../../terrific/taglibs.jsp" %>

<terrific:mod
    name="<%= name %>"
    classPrefix="<%= typeShort %>"
    tag="${tag}"
    htmlClasses="${htmlClasses}"
    decorator="${decorator}"
    dataConnectors="${dataConnectors}"
    attributes="${attributes}"
>
    <%%@ include file="/WEB-INF/terrific/components/<%= types %>/<%= name %>/<%= name %>.jsp" %%>
</terrific:mod>
