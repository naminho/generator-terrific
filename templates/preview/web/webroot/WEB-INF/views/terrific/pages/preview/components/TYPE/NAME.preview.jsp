<%%@ page trimDirectiveWhitespaces="true"%>
<%%@ include file="../../../../../../terrific/taglibs.jsp" %>

<template:page-preview pageTitle="${pageTitle}">

    <div>
        <a href="/terrific/preview/pages/preview/index">Back</a>
    </div>

    <div>
        <h1><%- Name %></h1>
    </div>

    <div>
        <h2>Regular <%- Name %></h2>
        <div class="g-row g-layout--three">
            <div class="g-col">
                <<%- type %>:<%- name %> />
            </div>
        </div>
    </div>

</template:page-preview>
