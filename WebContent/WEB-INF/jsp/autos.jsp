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
<script type="text/javascript" src="${resroot}/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${resroot}/js/jquery.cookie.js"></script>
<script type="text/javascript" src="${resroot}/js/common.js"></script>
<script type="text/javascript" src="${resroot}/js/pic.js"></script>
<!-- <script type="text/javascript"	src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js"></script>  -->

<script type="text/javascript">

$(function() {

$("#auto").addClass("current");

});
</script>
<title>首页-唐山市东风汽车销售有限公司</title>
</head>
<body>
	<jsp:include page="header/header.jsp" />
	<div class="content">
	
	<div class="siderbarl">
	
	
		<div class="leftbas brands">
			<h2>唐山东风 主营品牌</h2>
			<dl>
				<dt>
					<img width="54px" height="54px" title="东风" alt="东风"	src="images/m_36_b.jpg"><span title="东风">东风</span>
				</dt>
				<dd>
					<h3 title="东风">东风</h3>
					<a title="东风X8" href="#">东风X8</a> 
					<a title="东风X5" href="#">东风X5</a>
					<a title="东风X9" href="#">东风X9</a> 
					<a title="东风X6" href="#">东风X6</a>
				</dd>
			</dl>
		</div>

		<div id="salers" class="leftbas salers">
			<h2>唐山东风 企业员工</h2>
			<a target="_blank" href="staff" class="more">更多&gt;&gt;</a>
			<div class="salelist">
				<img title="13323299969" alt="13323299969"src="http://vip.360che.com/Upload/SalerImages/634394092297553750.jpg">
				<ul>
					<li><label>姓名：</label>崔金彪<i class="medal"></i></li>
					<li><label>职务：</label>销售经理</li>
					<li><label>电话：</label><span>18931565027</span></li>
					<li><label>理念：</label><span>关怀每一个人，关爱每一部车</span></li>
				</ul>
			</div>
			<div class="salelist">
				<img title="13323299969" alt="13323299969"src="http://vip.360che.com/Upload/SalerImages/634394092297553750.jpg">
				<ul>
					<li><label>姓名：</label>崔金彪<i class="medal"></i></li>
					<li><label>职务：</label>销售经理</li>
					<li><label>电话：</label><span>18931565027</span></li>
					<li><label>理念：</label><span>关怀每一个人，关爱每一部车</span></li>
				</ul>
			</div>
			<div class="salelist">
				<img title="13323299969" alt="13323299969"src="http://vip.360che.com/Upload/SalerImages/nopic.gif">
				<ul>
					<li><label>姓名：</label>崔金彪<i class="medal"></i></li>
					<li><label>职务：</label>销售经理</li>
					<li><label>电话：</label><span>18931565027</span></li>
					<li><label>理念：</label><span>关怀每一个人，关爱每一部车</span></li>
				</ul>
			</div>
		</div>
		<!--  
		<div class="leftbas map_card">
				<h2>唐山东风 地图</h2>
				<p>店面地址:唐山市路南区唐柏路与205国道交叉口西100米</p>
				<div>
					<iframe width="266" scrolling="no" height="189" frameborder="0"
						src="http://map.dealer.easypass.cn/map/id_100047245/S_S/W_255/H_189/Z_12/google.htm"
						marginheight="0" marginwidth="0" id="IFRAME1">
					</iframe>
				</div>
				<a href="/100047245/contact.html#map">查看大图&gt;&gt;</a>
		</div>
		
		-->
		</div>
		
		<div class="siderbarr">
	
			<div class="seventhnav">
			<div class="bt3">
				<div class="retitle0">热销车型</div>
				<div class="bt31">车型型号</div>
				<div class="bt32">经销商报价</div>
				<div class="bt33">更新时间</div>
			</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7108_index.html"><img
						alt="东风 大力神重卡 290马力 8X4 自卸车(DFL3311AXA)"
						src="http://img.360che.com/imgc/150x100/0/75/75936.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7108_index.html">东风 大力神重卡
										290马力 8X4 自卸车(DFL3311AXA)</a>
								</td>
								<td><span class="nr-jg">28.6万 - 29.2万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：15.99吨
										发动机型号：玉柴 YC6M290-33 变速箱型号：法士特 9JS135B 前进档档位数：9 货箱(斗)长度：7.1米
										货箱(斗)形式：后翻自卸式 轴距：1950+3100+1350mm 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7045_index.html"><img
						alt="东风 大力神重卡 260马力 8X4 自卸车(DFL3311AX1A)"
						src="http://img.360che.com/imgc/150x100/0/43/43387.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7045_index.html">东风 大力神重卡
										260马力 8X4 自卸车(DFL3311AX1A)</a>
								</td>
								<td><span class="nr-jg">27.3万 - 27.9万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：15.99吨
										发动机型号：玉柴 YC6A260-33 变速箱型号：法士特 9JS119 前进档档位数：9 货箱(斗)长度：7.6米
										货箱(斗)形式：后翻自卸式 轴距：1950+3600+1350mm 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m3/950_index.html"><img
						alt="东风 大力神重卡 340马力 8X4 自卸车(排半平头)(DFL3310A13)"
						src="http://img.360che.com/imgc/150x100/0/43/43387.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m3/950_index.html">东风 大力神重卡
										340马力 8X4 自卸车(排半平头)(DFL3310A13)</a>
								</td>
								<td><span class="nr-jg">37万 - 37万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：15.605吨
										发动机型号：玉柴 YC6M340-33 变速箱型号：陕齿 RT-11509G 前进档档位数：9 货箱(斗)长度：8.2米
										货箱(斗)形式：自卸式 轴距：1950+4250+1350mm 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank"
						href="http://www.360che.com/m47/11849_index.html"><img
						alt="东风 天龙重卡 260马力 8X4 仓栅载货车(DFL5311CCQAX3A)"
						src="http://img.360che.com/imgc/150x100/0/92/92210.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m47/11849_index.html">东风 天龙重卡
										260马力 8X4 仓栅载货车(DFL5311CCQAX3A)</a>
								</td>
								<td><span class="nr-jg">26.9万 - 27.2万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：19.835吨
										发动机型号：康明斯C260 33 变速箱型号：法士特 9JS119TB 前进档档位数：9 货箱(斗)形式：仓栅式
										货箱(斗)长度：9.6米 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7140_index.html"><img
						alt="东风 天龙重卡 260马力 8X4 栏板载货车(DFL1311AX3A)"
						src="http://img.360che.com/imgc/150x100/0/71/71616.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7140_index.html">东风 天龙重卡
										260马力 8X4 栏板载货车(DFL1311AX3A)</a>
								</td>
								<td><span class="nr-jg">26.5万 - 26.8万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：19.835吨
										发动机型号：东风康明斯 C260 33 变速箱型号：东风 DF8S1200A 前进档档位数：8 货箱(斗)形式：栏板式
										货箱(斗)长度：9.6米 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7140_index.html"><img
						alt="东风 天龙重卡 260马力 8X4 栏板载货车(DFL1311AX3A)"
						src="http://img.360che.com/imgc/150x100/0/71/71616.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7140_index.html">东风 天龙重卡
										260马力 8X4 栏板载货车(DFL1311AX3A)</a>
								</td>
								<td><span class="nr-jg">26.5万 - 26.8万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：19.835吨
										发动机型号：东风康明斯 C260 33 变速箱型号：东风 DF8S1200A 前进档档位数：8 货箱(斗)形式：栏板式
										货箱(斗)长度：9.6米 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7140_index.html"><img
						alt="东风 天龙重卡 260马力 8X4 栏板载货车(DFL1311AX3A)"
						src="http://img.360che.com/imgc/150x100/0/71/71616.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7140_index.html">东风 天龙重卡
										260马力 8X4 栏板载货车(DFL1311AX3A)</a>
								</td>
								<td><span class="nr-jg">26.5万 - 26.8万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：19.835吨
										发动机型号：东风康明斯 C260 33 变速箱型号：东风 DF8S1200A 前进档档位数：8 货箱(斗)形式：栏板式
										货箱(斗)长度：9.6米 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7140_index.html"><img
						alt="东风 天龙重卡 260马力 8X4 栏板载货车(DFL1311AX3A)"
						src="http://img.360che.com/imgc/150x100/0/71/71616.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7140_index.html">东风 天龙重卡
										260马力 8X4 栏板载货车(DFL1311AX3A)</a>
								</td>
								<td><span class="nr-jg">26.5万 - 26.8万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：19.835吨
										发动机型号：东风康明斯 C260 33 变速箱型号：东风 DF8S1200A 前进档档位数：8 货箱(斗)形式：栏板式
										货箱(斗)长度：9.6米 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
			<div class="nr3">
				<div class="nr31">
					<a target="_blank" href="http://www.360che.com/m28/7140_index.html"><img
						alt="东风 天龙重卡 260马力 8X4 栏板载货车(DFL1311AX3A)"
						src="http://img.360che.com/imgc/150x100/0/71/71616.jpg">
					</a>
				</div>
				<div class="nr32">
					<table width="100%" cellspacing="0" cellpadding="0" border="0">
						<tbody>
							<tr>
								<td><a class="nr-cxm"
									href="http://www.360che.com/m28/7140_index.html">东风 天龙重卡
										260马力 8X4 栏板载货车(DFL1311AX3A)</a>
								</td>
								<td><span class="nr-jg">26.5万 - 26.8万</span>
								</td>
								<td><span class="nr-rq">07-15</span>
								</td>
							</tr>
							<tr>
								<td colspan="3"><div class="nr-cs">额定载重：19.835吨
										发动机型号：东风康明斯 C260 33 变速箱型号：东风 DF8S1200A 前进档档位数：8 货箱(斗)形式：栏板式
										货箱(斗)长度：9.6米 燃油种类：柴油 排放标准：国三/欧三</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
			</div>
		</div>


	</div>
	

	<jsp:include page="footer/footer.jsp" />
</body>
</html>