<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="${resroot}/css/style.css" type="text/css" />
<link type="text/css" rel="stylesheet" href="${resroot}/css/footer.css">
<link type="text/css" rel="stylesheet" href="${resroot}/css/header.css">
<%-- <link type="text/css" rel="stylesheet"
	href="${bootstrap}/css/bootstrap.css">
<link type="text/css" rel="stylesheet"
	href="${bootstrap}/css/bootstrap-responsive.css"> --%>
<script type="text/javascript" src="${resroot}/js/jquery-1.8.3.js"></script>
<title>后台管理页面</title>
</head>
<body>
	<div>
		<%-- <c:if test="${param.loginerror eq 'novalid' }">
			<p><span class="label label-warning">输入的用户名和密码不匹配！</span></p>
        </c:if> --%>
		<form action="<c:url value="/admin/login"></c:url>" method="post">
			<table>
				<tr>
					<td class="span2" style="text-align: right">用户名：</td>
					<td><input class="input-xlarge" type="text" name="userName"></td>
					<td></td>
				</tr>
				<tr>
					<td class="span2" style="text-align: right">密码：</td>
					<td><input class="input-xlarge" type="password"
						name="password"></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td><input class="btn btn-primary" type="submit" value="管理员登录"></td>
					<td></td>
				</tr>
			</table>
		</form>
	</div>
	<div>
		<jsp:include page="../footer/footer.jsp" />
	</div>
</body>
</html>