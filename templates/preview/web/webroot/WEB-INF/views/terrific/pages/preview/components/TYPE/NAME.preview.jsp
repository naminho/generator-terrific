<%%@ page trimDirectiveWhitespaces="true"%>
<%%@ include file="../../../../../../terrific/taglibs.jsp" %>

<template:page-preview pageTitle="${pageTitle}">
	<atom:link linkName="Back" url="/terrific/preview/pages/preview/index" />
    <atom:title><%- Name %></atom:title>
    <div>
		<atom:title tag="h2">Regular <%- Name %></atom:title>
        <div class="g-row g-layout--three h-space">
            <div class="g-col">
                <<%- type %>:<%- name %> />
            </div>
        </div>
    </div>
</template:page-preview>
