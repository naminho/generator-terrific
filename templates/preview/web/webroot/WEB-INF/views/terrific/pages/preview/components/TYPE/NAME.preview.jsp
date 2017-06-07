<%%@ page trimDirectiveWhitespaces="true"%>
<%%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%%@ taglib prefix="template" tagdir="/WEB-INF/tags/terrific/template"%>
<%%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>
<%%@ taglib prefix="atoms" tagdir="/WEB-INF/tags/terrific/components/atoms" %>
<%%@ taglib prefix="molecules" tagdir="/WEB-INF/tags/terrific/components/molecules" %>
<%%@ taglib prefix="organisms" tagdir="/WEB-INF/tags/terrific/components/organisms" %>

<template:page-preview pageTitle="${pageTitle}">

    <div>
        <a href="/terrific/preview/pages/preview/index">Back</a>
    </div>

    <div>
        <h1><%- Name %></h1>
    </div>

    <div>
        <h2>Regular <%- Name %></h2>
        <div class="g-row">
            <div class="g-col-3">
                <<%- types %>:<%- name %> />
            </div>
        </div>
    </div>

</template:page-preview>
