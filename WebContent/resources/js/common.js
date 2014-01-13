//声明全局变量
//疾病类别全局变量
var CATEGORYVALUE;
// 当前页码全局变量，默认第一页
var CURPAGEID = 1;
// ajax请求的URL
var URL = null;
// 页面搜索请求的，返回autocomplete的数据
var SearchURL = null;
// 页面全文检索URL;
var IndexSearchURL = null;
// 当前城市或区域的ID
var AREAID;
// loading图片定时对象
var TIMER;
// loading图片定时1秒
var TIME = 1000;
//获取广告请求
var ADURL ="getAd";

function getCurrentCity() {
	var myprovince = remote_ip_info['province'];
	var mycity = remote_ip_info['city'];
	var mydistrict = remote_ip_info['district'];
	return mycity;
}
function LocalArea() {
}
LocalArea.prototype.city = null;
LocalArea.prototype.setCookies = function(key, value) {
	$.cookie(key, value, {
		expires : 365,
		path : '/'
	});
};
LocalArea.prototype.delCookies = function(key) {
	var del = function() {
		$.cookie(key, null,{path:"/"});
	};
	return del;
};
LocalArea.prototype.getCookies = function(key) {
	var get = function() {
		return $.cookie(key);
	};
	return get;
};
LocalArea.prototype.setCurrentCity = function() {
	var city = this.getCookies("city");
	var region = this.getCookies("region");
	if (city() != null) {
		$("#citySelect").val(city());
		if(region()!=null){
			$("#regionSelect").val(region());
			$("#regionList li").each(function() {
				if ($(this).html().indexOf(region()) >= 0) {
					$(this).addClass("curCity");
				}
			});
		}
		$("#cityList li").each(function() {
			if ($(this).html().indexOf(city()) >= 0) {
				$(this).addClass("curCity");
			}
		});
		
	} else {
		var c = getCurrentCity();
		$("#citySelect").val(c);
		this.setCookies("city", c);
		$("#cityList li").each(function() {
			if ($(this).html().indexOf(c) >= 0) {
				$(this).addClass("curCity");
			}
		});
	}
	
	
	// 设置全局城市id
	AREAID = $("#cityList li.curCity").attr("id");
	var idata = {
			"cityId" : $("#cityList li.curCity").attr("id")
		};
		var ajaxForm = new AjaxForm("getCities", "get", idata,false);
		ajaxForm.send(function(data){
			var cities = data.cities;
			var cList = "<li id='none' style='font-size:15px;font-weight:bold'>不限</li>";
			for(var i=0;i<cities.length;i++){
				cList = cList+"<li id="+cities[i].areaId+" class=''>"+cities[i].areaName+"</li>";
			}
			$("#regionList ul").html(cList);
			$("#regionList li").each(function() {
				if ($(this).html().indexOf(region()) >= 0) {
					$(this).addClass("curCity");
				}
			});
			if(typeof($("#regionList li.curCity").attr("id"))!="undefined"){
				AREAID = $("#regionList li.curCity").attr("id");
			}
		});	
};

LocalArea.prototype.addLinstener=function(){

	var RegionLinstener=function(value){
		if(value) {
			$("#regionSelect").unbind();
			$("#regionList li").unbind();
		}
//		$(document).click(
//				function(e) {
//					var event = e || window.event;
//					if ($("#regionList").css("display") == "block") {
//						var h = $("#regionList").height();
//						if (e.pageX < 333 || e.pageX >609 || e.pageY < 10
//								|| e.pageY > 38 + h) {
//							if (e.pageX > 333 && e.pageX < 609 && e.pageY < 38
//									&& e.pageY > 18) {
//								//
//
//							} else {
//								$("#regionList").hide();
//							}
//						}
//					}
//				});
		$("#regionSelect").click(function() {
			if($("#regionList").css("display")=="none"){
				$("#regionList").slideToggle(200);
				if($("#cityList").css("display")!="none"){
					$("#cityList").slideToggle(200);
				}
			}else{
				$("#regionList").slideToggle(200);
			}
		});
		$("#regionList li").each(function() {
			$(this).click(function() {
				$("#regionSelect").val($(this).html());
				var category="";
				 if($.cookie("Category")!=null){
					 var category = "."+$.cookie("Category"); 
				 }
				//更新导航信息
				$(".nav a").eq(1).html(
						$(".nav a").eq(1).html().split(".")[0]
								+ "."+$("#citySelect").val()+"("
								+ $(this).html()+")"+category);
				
				$(this).addClass("curCity");
				$(this).siblings().removeClass("curCity");
				$("#regionList").hide();
				// 改变cookies
				if($(this).html()=="不限"){
					$.cookie('region', null,{path:"/"});
					$.cookie('regionid', null,{path:"/"});
				}else{
					var rcs = new LocalArea();
					rcs.setCookies("region", $(this).html());
					rcs.setCookies("regionid", $(this).attr("id"));
				}
				
				// 选择城市后，需要reload页面，当然在当前城市改变的情况下，如果没变，不需要reload
				if (URL != null) {
					if($(this).html()=="不限"){
						AREAID = $("#cityList li.curCity").attr("id");
					}else{
						if (AREAID != $("#regionList li.curCity").attr("id")) {
							AREAID = $("#regionList li.curCity").attr("id");
						}
					}
					switch (tabType) {
						case "1":
							// 发送医院请求
							var idata = {
								"areaId" : AREAID
							};
							var ajaxForm = new AjaxForm(URL, "get", idata,true);
							ajaxForm.send(ajaxForm.hospitalsList);
							break;
						case "2":
							// 发送医生请求
							var idata = {
								"areaId" : AREAID
							};
							var ajaxForm = new AjaxForm(URL, "get", idata,true);
							ajaxForm.send(ajaxForm.doctorsList);
							break;
						case "3":
							// 发送医理请求
							var ajaxForm = new AjaxForm(URL, "get", "",true);
							ajaxForm.send(ajaxForm.MedicalList);
							break;
						case "4":
							// 发送案例请求
							var ajaxForm = new AjaxForm(URL, "get", "",true);
							ajaxForm.send(ajaxForm.caseList);
							break;
						case "5":
							// 发送医院请求
							var ajaxForm = new AjaxForm(URL, "get", "",true);
							ajaxForm.send(ajaxForm.medicineList);
							break;
						default:

						}
					}
			});
		});
	};

	RegionLinstener(false);
	
//	$(document).click(
//			function(e) {
//				var event = e || window.event;
//				if ($("#cityList").css("display") == "block") {
//					var h = $("#cityList").height();
//					if (e.pageX < 265 || e.pageX > 345 || e.pageY < 10
//							|| e.pageY > 38 + h) {
//						if (e.pageX > 340 && e.pageX < 425 && e.pageY < 38
//								&& e.pageY > 18) {
//							//
//
//						} else {
//							$("#cityList").hide();
//						}
//					}
//				}
//			});
	$("#citySelect").click(function() {
		if($("#cityList").css("display")=="none"){
			$("#cityList").slideToggle();
			if($("#regionList").css("display")!="none"){
				$("#regionList").slideToggle();
			}
		}else{
			$("#cityList").slideToggle();
		}
	});
	$("#cityList li").each(function() {
		$(this).click(function() {
			if ($(this).attr("id")==0) return;
			$("#regionSelect").val("不限");
			var category="";
			 if($.cookie("Category")!=null){
				 var category = "."+$.cookie("Category"); 
			 }
			//更新导航信息
			$(".nav a").eq(1).html(
					$(".nav a").eq(1).html().split(".")[0]
							+ "."
							+ $(this).html()+category);
			$.cookie('region', null,{path:"/"});
			$.cookie('regionid', null,{path:"/"});
			var idata = {
					"cityId" : $(this).attr("id")
				};
				var ajaxForm = new AjaxForm("getCities", "get", idata,true);
				ajaxForm.send(function(data){
					var cities = data.cities;
					var cList = "";
					for(var i=0;i<cities.length;i++){
						cList = cList+"<li id="+cities[i].areaId+" class=''>"+cities[i].areaName+"</li>";
					}
					$("#regionList ul").html(cList);
					RegionLinstener(true);
				});	
			$("#citySelect").val($(this).html());
			$(this).addClass("curCity");
			$(this).siblings().removeClass("curCity");
			$("#cityList").hide();
			// 改变cookies
			var rcs = new LocalArea();
			rcs.setCookies("city", $(this).html());

			// 选择城市后，需要reload页面，当然在当前城市改变的情况下，如果没变，不需要reload
			if (URL != null) {
				if (AREAID != $("#cityList li.curCity").attr("id")) {
					AREAID = $("#cityList li.curCity").attr("id");

					switch (tabType) {
					case "1":
						// 发送医院请求
						var idata = {
							"areaId" : AREAID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.hospitalsList);
						break;
					case "2":
						// 发送医生请求
						var idata = {
							"areaId" : AREAID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.doctorsList);
						break;
					case "3":
						// 发送医理请求
						var ajaxForm = new AjaxForm(URL, "get", "",true);
						ajaxForm.send(ajaxForm.MedicalList);
						break;
					case "4":
						// 发送案例请求
						var ajaxForm = new AjaxForm(URL, "get", "",true);
						ajaxForm.send(ajaxForm.caseList);
						break;
					case "5":
						// 发送医院请求
						var ajaxForm = new AjaxForm(URL, "get", "",true);
						ajaxForm.send(ajaxForm.medicineList);
						break;
					default:

					}
				}
			}
		});
	});
};
LocalArea.prototype.getMousePos = function() {
	var e = event || window.event;
	return {
		"x" : e.pageX,
		"y" : e.pageX,
		"clientX" : e.clientX,
		"clientY" : e.clientY
	};
};

function AjaxForm(url, type, data,sync) {
	this.url = url;
	this.type = type;
	this.data = data;
	this.sync=sync;
}
//解析广告
AjaxForm.prototype.adList = function(data){
	var container = $("#adList");
	var adList = data.adList;
	var len = adList.length;
	var setHtml="<ul>";
	var row="";
	for(var i=0;i<len;i++){
		var adId = adList[i][0];
		var adTitle=adList[i][1];
		var adLink=adList[i][2];
		var adDescription=adList[i][3];
		row=row+"<li id='"+adId+"'>"+
			"<span class='adName'><a href='"+adLink+"' target='blank'>"+adTitle+"</a></span>"+
			"<span class='adDescription'><a href='"+adLink+"' target='blank'>"+adDescription+"</a></span>"+
			"<span class='adLink'><a href='"+adLink+"' target='blank'>"+adLink+"</a></span>"+
			"</li>";
	}
	var defaultAd="<li id='default'>"+
			"<span class='adName'><a href='http://www.daocao.com' target='blank'>欢迎使用稻草推广</a></span>"+
			"<span class='adDescription'><a href='http://www.daocao.com' target='blank'>咨询热线:010-1111111</a></span>"+
			"<span class='adLink'><a href='http://www.daocao.com' target='blank'>wwww.daocao.com</a></span>"+
			"</li>";
	setHtml= setHtml+row+defaultAd+"</ul>";
	container.html(setHtml);
};
// 解析医院列表函数
AjaxForm.prototype.hospitalsList = function(data) {
	var container = $("#contentBody");
	var hosiptalsInfo = data.hospitals;
	var len = hosiptalsInfo.length;
	var pageInfo = data.pageInfo;
	var setHtml = "<div class='hospitals'>"
			+ "<table  cellspacing='0' cellpadding='0' >"
			+ "<tbody>"
			+ "<tr class='tbheader'>"
			+ "<td width='25%'  ><div align='center'><strong>名称</strong></div></td>"
			+ " <td width='15%'  ><div align='center'><strong>等级</strong></div></td>"
			+ " <td width='15%'  ><div align='center'><strong>擅长</strong></div></td>"
			+ "<td width='44%'  ><div align='center'><strong>地址</strong></div></td>"
			//+ " <td width='25%'  ><div align='center'><strong>特色</strong></div></td>"
			+ "</tr>";
	var blankHtml = "<tr class='blk'>" + " <td colspan='6'>"
			+ "<div class='blank'>&nbsp;</div>" + "	</td>" + "</tr>";
	var tabbottom = "</tbody> </table>" + "</div>";
	var row = "";
	// 如果添加医院属性在这里
	for ( var i = 0; i < len; i++) {
		var hid = hosiptalsInfo[i][0];
		var hname = hosiptalsInfo[i][1];
		var haddress = hosiptalsInfo[i][2];
	//	var hf = hosiptalsInfo[i][3];
		var hscore = hosiptalsInfo[i][4];
		var hadvance = hosiptalsInfo[i][5];

		row = row + " <tr>" + "<td><a href='hospital?id=" + hid
				+ "' target='_blank'>" + hname + "</a></td>"
				+ "<td><p align='left'>" + hscore + "</p></td>" // 这个地方需要修改
				+ "<td><p align='left'>" + hadvance + "</p></td>" + // 这个地方需要修改
				"<td><p align='left'>" + haddress + "</p></td>";
				//+ "<td><p align='center'>" + hf + "</p></td>" 
		row = row  + "</tr>" + blankHtml;
	}
	setHtml = setHtml + blankHtml + row + tabbottom;
	container.html(setHtml);

	// 添加页面代码
	var pa = new pageNum();
	pa.setHtml($(".hospitals"), pageInfo);
};

// 解析医生列表函数
AjaxForm.prototype.doctorsList = function(data) {
	var container = $("#contentBody");
	var doctorsInfo = data.doctors;
	var len = doctorsInfo.length;
	var pageInfo = data.pageInfo;
	var remValue = data.recommendValue;
	var setHtml = "<div class='doctors'>"
			+ "<table  cellspacing='0' cellpadding='0' >"
			+ "<tbody>"
			+ "<tr class='tbheader'>"
			+ "<td width='20%'  ><div align='center'><strong>大夫</strong></div></td>"
			+ " <td width='20%'  ><div align='center'><strong>科室</strong></div></td>"
			+ "<td width='59%'  ><div align='center'><strong>咨询范围/擅长</strong></div></td>"
			+ "</tr>";
	var blankHtml = "<tr class='blk'>" + " <td colspan='3'>"
			+ "<div class='blank'>&nbsp;</div>" + "	</td>" + "</tr>";

	var tabbottom = "</tbody> </table>" + "</div>";
	var row = "";
	for ( var i = 0; i < len; i++) {
		var did = doctorsInfo[i][0];
		var dname = doctorsInfo[i][1];
		var dgrade = doctorsInfo[i][2];
		var dtitle = doctorsInfo[i][3];
		var ddep = doctorsInfo[i][4];
		var dskill = doctorsInfo[i][5];
		var dscore = doctorsInfo[i][6];
		var defaultScore = 2;
		/**
		 * 默认分数等级
		 */
		if (dscore >= defaultScore) {
			row = row + "<tr class='blk'>" + "<td colspan='3'>"
					+ "<div class='blank  recommend'>" + "<div class='recm'> "
					+ "<div style='float:left; width:120px;'>"
					+ "<span class='pic'></span>" + "</div>" + "</div> "
					+ "<div style='float: left;width:100%'>"
					+ "<div class='tda rec'> " + " <ul>"
					+ " <li id='recli' class='pepole'>" + "&nbsp;" + "	</li>"
					+ " <li >" + "<a href='doctor?id=" + did
					+ "' target='_blank'>" + dname + "</a>" + "</li>" + "<li>"
					+ " <p>" + dtitle + "</p> " + "  </li>" + " <li>" + "<p>"
					+ dgrade + "</p>" + " </li>" + " </ul>" + "</div> "
					+ "<div class='rec'>" + "  <ul>" + "<li class='pepole'>"
					+ ddep + "</li>" +

					"</ul>" + "</div> " + "<div class='rec'>" + "   <ul>"
					+ "<li class='pepole'>" + dskill + "</li>" +

					"</ul>" + "</div> " +

					"</div>" + "</div>" + "</td>" + "</tr>";
		} else {
			row = row + "<tr>" + "<td class='tda'>" + "<div class='pepole' style='float: left; width: 30px; height: 30px;'></div>"
					+"<div style='float: left; text-align: left;margin-top: 5px; width:100px'>"
					+"<ul>"
					+ "<li>"
					+ "<a href='doctor?id=" + did + "' target='_blank'>"
					+ dname + "</a>" + "</li>" + "<li>" + " <p>" + dtitle
					+ "</p> " + "  </li>" + " <li>" + "<p>" + dgrade + "</p>"
					+ "</li>" + "</ul></div>" + "</td>" + "<td><p align='left'>"
					+ ddep + "</p></td>" + "<td><p align='left'>" + dskill
					+ "</p></td>" + "</tr>";
		}
		row = row + blankHtml;
	}
	setHtml = setHtml + blankHtml + row + tabbottom;
	container.html(setHtml);

	// 添加页面代码
	var pa = new pageNum();
	pa.setHtml($(".doctors"), pageInfo);
};
// 解析医理类别
AjaxForm.prototype.MedicalList = function(data) {
	var container = $("#contentBody");
	var medicalInfo = data.medical;
	var len = medicalInfo.length;
	var pageInfo = data.pageInfo;
	var setHtml = "<div id='medical'>" + "<div class='list'>";

	var tabbottom = " </div>" + "</div>";
	var row = "";
	// 如果添加属性在这里
	for ( var i = 0; i < len; i++) {
		var mid = medicalInfo[i][0];
		var mname = medicalInfo[i][1];
		var mauthor = medicalInfo[i][2];
		var mcontent = medicalInfo[i][4];
		var mauthorId = medicalInfo[i][5];
		var mpubTime= medicalInfo[i][6];
		row = row
				+ " <div id='"+mid+"' class='medicalItem'>"
				+ "<ul>"
				+ "<li class='title'><span class='name'>"
				+ mname
				+ "</span><span class='author'>主治医生:<a href=doctor?id="+mauthorId+">"
				+ mauthor
				+ "</a></span><span class='time'>发布时间:"+mpubTime+"</span><b></b><div class='clear'></div></li>"
				+ "<li class='con'><span>&nbsp;&nbsp;&nbsp;&nbsp;"
				+ mcontent.replace("\r\n","<br>&nbsp;&nbsp;&nbsp;&nbsp;")
				+ "</span></li>"
				+ "</ul>" + "</div >";

	}
	setHtml = setHtml + row + tabbottom;
	container.html(setHtml);

	// 添加页面代码
	var pa = new pageNum();
	pa.setHtml($("#medical"), pageInfo);
	
	//添加点击监听
	$(".title").each(function(){
		$(this).click(function(){
			$(".medicalItem").find(".con").slideUp();
			$(".medicalItem").find("b").removeClass("active");
			if(!$(this).parent().find(".con").is(":visible")){
				$(this).parent().find(".con").slideDown();
				$(this).parent().find("b").addClass("active");
			}else{
				$(this).parent().find(".con").slideUp();
				$(this).parent().find("b").removeClass("active");
			}
			
		});
	});
};
//解析医药列表
AjaxForm.prototype.medicineList = function(data) {
	var container = $("#contentBody");
	var medicineInfo = data.medicine;
	var len = medicineInfo.length;
	var pageInfo = data.pageInfo;
	var setHtml = "<div id='medicinelist'>" + "<div class='list'>";
	var tabbottom = "</div></div>";
	var row = "";
	// 如果添加医院属性在这里
	for ( var i = 0; i < len; i++) {
		var mid = medicineInfo[i][0];
		//var mName = $.trim(medicineInfo[i][1]);
	//	var names=mName.split("\r\n");
		var gName=$.trim(medicineInfo[i][1]);
		var eName=$.trim(medicineInfo[i][2]);
		//var cName=$.trim(names[2]);
		var museTutorial = medicineInfo[i][3];
		var minfoFrom = medicineInfo[i][4];
		var apprNum = medicineInfo[i][5];
		var adapt = medicineInfo[i][6];
		var producer = medicineInfo[i][7];
		var otc = medicineInfo[i][8];
		var isOTC="<div class='imgbox'></div>";
		//isOTC="<div class='imgbox'><img src='images/star.png' /></div>";
		if(otc=="处方药"){
			isOTC="<div class='imgbox'><img src='images/star.png' /></div>";
			
		}
		row = row + "<div id='" + mid + "' class='medicineItem'>" + "<ul>"
				+ "<li class='title'><span class='name'>"+isOTC+"通用名称: "+ gName + "</span><span class='name'>" +"商用名称："+  eName + "</span><span class='name'>" +"批准文号："+  apprNum + "</span><b></b><div class='clear'></div></li>"
				+ "<li class='con'><table cellspacing='0' cellpadding='0'><tbody><tr><td>适应症:</td><td>"+adapt+"</td></tr><tr><td>生产厂家:</td><td>"+producer+"</td</tr><tr><td>主要用途:</td><td>"+museTutorial+"</td</tr></tbody></table></li>" + "</ul>" + "</div>";
	}
	setHtml = setHtml + row + tabbottom;
	container.html(setHtml);

	// 添加页面代码
	var pa = new pageNum();
	pa.setHtml($("#medicinelist"), pageInfo);

	
	//添加点击监听
	$(".title").each(function(){
		$(this).click(function(){
			$(".medicineItem").find(".con").slideUp();
			$(".medicineItem").find("b").removeClass("active");
			if(!$(this).parent().find(".con").is(":visible")){
				$(this).parent().find(".con").slideDown();
				$(this).parent().find("b").addClass("active");
			}else{
				$(this).parent().find(".con").slideUp();
				$(this).parent().find("b").removeClass("active");
			}
			
		});
	});
	// 小星星
//	$(".star").each(function() {
//		$(this).raty({
//			path : 'images',
//			readOnly : true,
//			score : $(this).attr("id")
//		});
//	});
};
// 解析案例列表函数
AjaxForm.prototype.caseList = function(data) {
	var container = $("#contentBody");
	var casesInfo = data.cases;
	var len = casesInfo.length;
	var pageInfo = data.pageInfo;
	var setHtml = "<div id='case'>" + "<div class='list'>";

	var tabbottom = " </div>" + "</div>";
	var row = "";
	// 如果添加案例属性在这里
	for ( var i = 0; i < len; i++) {
		var cid = casesInfo[i][0];
		var cname = casesInfo[i][1];
		var cdetail = casesInfo[i][2];
		var authorId = casesInfo[i][3];
		var caseAuthor = casesInfo[i][4];
		var pubtime = casesInfo[i][5];
		row = row
				+ " <div id='"+cid+"' class='caseItem'>"
				+ "<ul>"
				+ "<li class='title'><span class='name'>"
				+ cname
				+ "</span><span class='author'>主治医生:<a href='doctor?id="+authorId+"'>"+caseAuthor+"</a></span><span class='time'>发布时间:"+pubtime+"</span><b></b><div class='clear'></div></li>"
				+ "<li class='con'><span style='font-weight:normal'>&nbsp;&nbsp;&nbsp;&nbsp;"
				+ cdetail.replace("\r\n","<br>&nbsp;&nbsp;&nbsp;&nbsp;")
				+ "</span></li>"
				+ "</ul>" + "</div >";
	}
	setHtml = setHtml + row + tabbottom;
	container.html(setHtml);

	// 添加页面代码
	var pa = new pageNum();
	pa.setHtml($("#case"), pageInfo);
	
	
	//添加点击监听
	$(".title").each(function(){
		$(this).click(function(){
			$(".caseItem").find(".con").slideUp();
			$(".caseItem").find("b").removeClass("active");
			if(!$(this).parent().find(".con").is(":visible")){
				$(this).parent().find(".con").slideDown();
				$(this).parent().find("b").addClass("active");
			}else{
				$(this).parent().find(".con").slideUp();
				$(this).parent().find("b").removeClass("active");
			}
			
		});
	});
};
AjaxForm.prototype.send = function(callback) {
	$.ajax({
		type : this.type,
		url : this.url,
		data : this.data,
		dataType : "json",
		async : this.sync,
		// 是否从浏览器缓存里读取
		cache : true,
		beforeSend : function(XMLHttpRequest) {
			// 设置loading图片
//			var show = function show() {
//				$("#contentBody").html("<div id='loading'></div>");
//			};
//			$("#contentBody").empty();
//			TIMER = setTimeout(show, TIME);
			
			$("#contentBody").html("<div id='loading'></div>");
		},
		success : function(data) {
//			clearTimeout(TIMER);
//			$("#contentBody").html("");
			
			$("#contentBody").html("");
			callback(data);
		},
		complete : function(XMLHttpRequest) {
			// HideLoading();
		},
		error : function() {
			// 请求出错处理
			//alert("error");
		}
	});
};
function init() {
	// 生成City框的HTML并添加當前城市
	var cs = new LocalArea();
	// 显示正在定位城市
	$("#citySelect").val("定位中");
	cs.setCurrentCity();
	cs.addLinstener();
};
/**
 * 左边导航
 * 
 * @returns
 */
function leftNavForm() {
}
leftNavForm.prototype.setCookies = function(key, value) {
	$.cookie(key, value, {
		expires : 365,
		path : '/'
	});
};
leftNavForm.prototype.delCookies = function(key) {
	var del = function() {
		$.cookie(key, null,{path:"/"});
	};
	return del;
};
leftNavForm.prototype.getCookies = function(key) {
	var get = function() {
		return $.cookie(key);
	};
	return get;
};
leftNavForm.prototype.addListener = function() {
	var getcid  =new leftNavForm().getCookies("CategoryId");
	if(getcid()!=null){
		CATEGORYVALUE = getcid();
		$("#navList li").each(function(){
			if($(this).attr("id")==CATEGORYVALUE){
				//$("#categoryvalue").val(CATEGORYVALUE);
				$("#navList li").removeClass("active");
				$(this).addClass("active");
				return;
			}
		});
	}
	$("#navList li").each(
			function() {
				//点击事件
				$(this).click(
						function() {
							$("#navList li").removeClass("active");
							$(this).addClass("active");
							// 设置cookies
							var ln = new leftNavForm();
							ln.setCookies("Category", $(this).html());
							ln.setCookies("CategoryId", $(this).attr("id"));						
							// 设置全局变量
							CATEGORYVALUE = $("#navList li.active").attr("id");
							// 隐藏的input，如果使用上面全局变量，可以不用
							 //$("#categoryvalue").val(CATEGORYVALUE);
							// 发送ajax请求
							switch (tabType) {
							case "1":
								// 更新顶部导航信息
								$(".nav a").eq(1).html(
										$(".nav a").eq(1).html().split(".")[0]
												+ "."
												+ $(".nav a").eq(1).html()
														.split(".")[1] + "."
												+ $(this).html());
								var idata = {
									"areaId" : AREAID,
									"cancerCategoryId" : CATEGORYVALUE
								};
								var ajaxForm = new AjaxForm(URL, "get", idata,true);
								ajaxForm.send(ajaxForm.hospitalsList);
								break;
							case "2":
								// 发送医生请求
								// 更新顶部导航信息
								$(".nav a").eq(1).html(
										$(".nav a").eq(1).html().split(".")[0]
												+ "."
												+ $(".nav a").eq(1).html()
														.split(".")[1] + "."
												+ $(this).html());
								var idata = {
									"areaId" : AREAID,
									"cancerCategoryId" : CATEGORYVALUE
								};
								var ajaxForm = new AjaxForm(URL, "get", idata,true);
								ajaxForm.send(ajaxForm.doctorsList);
								break;
							case "3":
								// 发送医理请求
								// 更新顶部导航信息
								$(".nav a").eq(1).html(
										$(".nav a").eq(1).html().split(".")[0]
												+ "." + $(this).html());
								var idata = {
									"cancerCategoryId" : CATEGORYVALUE
								};
								var ajaxForm = new AjaxForm(URL, "get", idata,true);
								ajaxForm.send(ajaxForm.MedicalList);
								break;
							case "4":
								// 发送案例请求
								// 更新顶部导航信息
								$(".nav a").eq(1).html(
										$(".nav a").eq(1).html().split(".")[0]
												+ "." + $(this).html());
								var idata = {
									"cancerCategoryId" : CATEGORYVALUE
								};
								var ajaxForm = new AjaxForm(URL, "get", idata,true);
								ajaxForm.send(ajaxForm.caseList);
								break;
							case "5":
								// 更新顶部导航信息
								$(".nav a").eq(1).html(
										$(".nav a").eq(1).html().split(".")[0]
												+ "." + $(this).html());
								var idata = {
									"cancerCategoryId" : CATEGORYVALUE
								};
								var ajaxForm = new AjaxForm(URL, "get", idata,true);
								ajaxForm.send(ajaxForm.medicineList);
								break;
							default:

							}

						});
			});
};
function pageNum() {

}
pageNum.prototype.setHtml = function(obj, data) {
	var pages=data.pages;
	var cpage=data.curpage;
	var max=data.totalpage;
	var option="<option value ='na' selected='selected'>请选择</option>";
	
	for(var i=1;i<=max;i++){
		option+=" <option value ='"+i+"'>"+i+"</option>";
		
	}
	jQuery("#sup").html(option);
	jQuery("#sdn").html(option);
	//console.info("c="+cpage);
	var begin="<div class='pg'><a "+((cpage==1)?(" href='javascript:void(0)'>"):(" href='javascript:void(0)' p='1'>"))+"首页</a>";
	var pre="<a class='pre'"+((cpage-1==0)?(" href='javascript:void(0)'>"):("href='javascript:void(0)'>"))+"上一页</a>";
	var next="<a class='nxt'"+((cpage+1>max)?(" href='javascript:void(0)'>"):(" href='javascript:void(0)'>"))+"下一页</a>";
	var end="<a "+((cpage==max)?(" href='javascript:void(0)'>"):(" href='javascript:void(0)'p='"+ max+"' >"))+"末页</a></div>";
	var pageinfo="";
	var shots= new Array();
	shots=pages;
	var num=shots.length;
	for(var i=0;i<num;i++){
		//console.info(shots[i]);
			if(i==0){
	 	   	if(shots[i]!=1&&shots[i]%5==0){
	 			pageinfo+="<a href='javascript:void(0)'p='"+shots[i]+"'>"+"..."+"</a>";
				//console.info('i=0');
	 		 }
	 	   	else{
	 	   		if(shots[i]!=cpage){
	 			pageinfo+="<a href='javascript:void(0)'>"+shots[i]+"</a>";
				//console.info('i=0');
	 	   		}
	 	   		else{
	 	   		pageinfo+="<strong>"+shots[i]+"</strong>";
				//console.info('i=c');	
	 	   		}
	 		 }
	 	   	continue;
		   }
		
		if(shots[i]==cpage){
			pageinfo+="<strong>"+shots[i]+"</strong>";
			//console.info('i=c');	
		 	continue;
		}
 	if(num>5){
		if(i==num-1){
		if(shots[num-1]%5==1){
 			pageinfo+="<a href='javascript:void(0)' p='"+shots[num-1]+"'>"+"..."+"</a>";
 			//console.info('i=num-1');
	 	}
	 	continue;
 		}
 	}
		pageinfo+="<a href='javascript:void(0)'>"+shots[i]+"</a>";
	}
	var full=begin+pre+pageinfo+next+end;
	obj.append(full);
	// 设置监听器
	this.addListener(max);
};

pageNum.prototype.addListener = function(max) {
	var pagelent =max;
	$(".pg a").each(function() {
		$(this).click(function() {
			if ($(this).attr("class") == "curpage") {
				// do nothing
				return;
			}
			if ($(this).attr("class") == "pre") {
				if (parseInt(CURPAGEID) > 1) {
					CURPAGEID = parseInt(CURPAGEID) - 1;
					// 发送ajax请求

					switch (tabType) {
					case "1":
						// 发送ajax请求
						var idata = {
							"areaId" : AREAID,
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.hospitalsList);
						break;
					case "2":
						// 发送医生请求
						// 发送ajax请求
						var idata = {
							"areaId" : AREAID,
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.doctorsList);
						break;
					case "3":
						// 发送医理请求
						// 发送ajax请求
						var idata = {
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.MedicalList);
						break;
					case "4":
						// 发送案例请求
						// 发送ajax请求
						var idata = {
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.caseList);
						break;
					case "5":
						// 发送ajax请求
						var idata = {
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.medicineList);
						break;
					default:

					}
					return;
				} else {
					// do nothing;
					return;
				}
			}
			if ($(this).attr("class") == "nxt") {
				if (parseInt(CURPAGEID) < pagelent) {
					CURPAGEID = parseInt(CURPAGEID) + 1;
					switch (tabType) {
					case "1":
						// 发送ajax请求
						var idata = {
							"areaId" : AREAID,
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.hospitalsList);
						break;
					case "2":
						// 发送医生请求
						// 发送ajax请求
						var idata = {
							"areaId" : AREAID,
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.doctorsList);
						break;
					case "3":
						// 发送医理请求
						var idata = {
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.MedicalList);
						break;
					case "4":
						// 发送案例请求
						// 发送ajax请求
						var idata = {
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.caseList);
						break;
					case "5":
						// 发送ajax请求
						var idata = {
							"cancerCategoryId" : CATEGORYVALUE,
							"page" : CURPAGEID
						};
						var ajaxForm = new AjaxForm(URL, "get", idata,true);
						ajaxForm.send(ajaxForm.medicineList);
						break;
					default:

					}
					return;
				} else {
					// do nothing;
					return;
				}
			}
			CURPAGEID = $(this).html();
			if(isNaN(CURPAGEID))
			CURPAGEID=$(this).attr("p");
			
			// 发送ajax请求
//			var idata = {
//				"areaId" : AREAID,
//				"cancerCategoryId" : CATEGORYVALUE,
//				"page" : parseInt(CURPAGEID)
//			};
//			var ajaxForm = new AjaxForm(URL, "get", idata,true);
//			ajaxForm.send(ajaxForm.hospitalsList);
			switch (tabType) {
			case "1":
				// 发送ajax请求
				var idata = {
					"areaId" : AREAID,
					"cancerCategoryId" : CATEGORYVALUE,
					"page" : CURPAGEID
				};
				var ajaxForm = new AjaxForm(URL, "get", idata,true);
				ajaxForm.send(ajaxForm.hospitalsList);
				break;
			case "2":
				// 发送医生请求
				// 发送ajax请求
				var idata = {
					"areaId" : AREAID,
					"cancerCategoryId" : CATEGORYVALUE,
					"page" : CURPAGEID
				};
				var ajaxForm = new AjaxForm(URL, "get", idata,true);
				ajaxForm.send(ajaxForm.doctorsList);
				break;
			case "3":
				// 发送医理请求
				var idata = {
					"cancerCategoryId" : CATEGORYVALUE,
					"page" : CURPAGEID
				};
				var ajaxForm = new AjaxForm(URL, "get", idata,true);
				ajaxForm.send(ajaxForm.MedicalList);
				break;
			case "4":
				// 发送案例请求
				// 发送ajax请求
				var idata = {
					"cancerCategoryId" : CATEGORYVALUE,
					"page" : CURPAGEID
				};
				var ajaxForm = new AjaxForm(URL, "get", idata,true);
				ajaxForm.send(ajaxForm.caseList);
				break;
			case "5":
				// 发送ajax请求
				var idata = {
					"cancerCategoryId" : CATEGORYVALUE,
					"page" : CURPAGEID
				};
				var ajaxForm = new AjaxForm(URL, "get", idata,true);
				ajaxForm.send(ajaxForm.medicineList);
				break;
			default:

			}
		});
	});
};

function tabController() {
	switch (tabType) {
	case "1":
		// 1、全局变量设置
		URL = "hospitals/hospitalsJson";
		SearchURL = "hospitals/searchhospitals";
		// 2、设置按钮高亮
		$("#navigatorBar li").eq(1).addClass("active");
	
		// 4、添加左边导航监听事件
		var left_nav = new leftNavForm();
		left_nav.addListener();
		
		// 3、显示上面导航信息
		var city = $("#citySelect").val();
		var region=$("#regionSelect").val();
		var getcid  =new leftNavForm().getCookies("Category");
		var category= getcid()==null?"":"."+getcid();
		var reg = region!="不限"?"("+region + ")":"";
		var nav = "<a  href=''#' target='_blank'>稻草搜索</a>  &gt; "
			+ "<a  href=''#' target='_blank'>医院." + city+reg+category+ "</a>  &gt; "
			+ "<span>医院列表</span>";
		$(".nav").html(nav);
		
		// 5发送医院请求,传入回调函数
		var idata = {
			"areaId" : AREAID,
			"cancerCategoryId" : CATEGORYVALUE
		};
		
		var ajaxForm = new AjaxForm(URL, "get", idata,true);
		ajaxForm.send(ajaxForm.hospitalsList);
		// 6、searchbox
		var sb = new searchBox("医院搜索");
		sb.setSearchBtn();
		sb.initListener();
		
		//7、获取广告
		var ajaxForm = new AjaxForm(ADURL, "get", {"areaId":AREAID,"pageId":tabType},true);
		ajaxForm.send(ajaxForm.adList);
		break;
	case "2":
		// 发送医生请求
		// 1、全局变量设置
		URL = "doctors/doctorsJson";
		SearchURL = "doctors/searchDoctors";
		// 2、设置按钮高亮
		$("#navigatorBar li").eq(2).addClass("active");

		// 4添加左边导航监听事件
		var left_nav = new leftNavForm();
		left_nav.addListener();
		
		// 3、显示上面导航信息
		var city = $("#citySelect").val();
		var region=$("#regionSelect").val();
		var getcid  =new leftNavForm().getCookies("Category");
		var category= getcid()==null?"":"."+getcid();
		var reg = region!="不限"?"("+region + ")":"";
		var nav = "<a  href=''#' target='_blank'>稻草搜索</a>  &gt; "
			+ "<a  href=''#' target='_blank'>大夫." +city+reg+category+ "</a>  &gt; "
			+ "<span>专家列表</span>";
		
		$(".nav").html(nav);
		
		
		
		// 5、发送请求,传入回调函数
		var idata = {
				"areaId" : AREAID,
				"cancerCategoryId" : CATEGORYVALUE
			};
		var ajaxForm = new AjaxForm(URL, "get", idata,true);
		ajaxForm.send(ajaxForm.doctorsList);
		
		
		// 6、searchbox
		var sb = new searchBox("专家搜索");
		sb.setSearchBtn();
		sb.initListener();
		
		//7、获取广告
		var ajaxForm = new AjaxForm(ADURL, "get", {"areaId":AREAID,"pageId":tabType},true);
		ajaxForm.send(ajaxForm.adList);
		break;
	case "3":
		// 发送医理请求
		// 1、全局变量设置
		URL = "medical/medicalJson";
		SearchURL = "medical/searchMedical";
		// 2、设置按钮高亮
		$("#navigatorBar li").eq(3).addClass("active");

		// 3、显示上面导航信息
		var nav = "<a  href=''#' target='_blank'>稻草搜索</a>  &gt; "
				+ "<a  href=''#' target='_blank'>医理</a>  &gt; "
				+ "<span>类别列表</span>";
		$(".nav").html(nav);
		// 4、发送医理请求,传入回调函数
		var ajaxForm = new AjaxForm(URL, "get", "",true);
		ajaxForm.send(ajaxForm.MedicalList);
		// 5添加左边导航监听事件
		var left_nav = new leftNavForm();
		left_nav.addListener();
		
		// 6、searchbox
		var sb = new searchBox("医理搜索");
		sb.setSearchBtn();
		sb.initListener();
		
		//7、获取广告
		var ajaxForm = new AjaxForm(ADURL, "get", {"areaId":AREAID,"pageId":tabType},true);
		ajaxForm.send(ajaxForm.adList);
		break;
	case "4":
		// 发送案例请求
		// 1、全局变量设置
		URL = "case/caseJson";
		SearchURL = "case/searchCase";
		// 2、设置按钮高亮
		$("#navigatorBar li").eq(4).addClass("active");

		// 3、显示上面导航信息
		var nav = "<a  href=''#' target='_blank'>稻草搜索</a>  &gt; "
				+ "<a  href=''#' target='_blank'>案例</a>  &gt; "
				+ "<span>案例列表</span>";
		$(".nav").html(nav);
		// 4、发送案例请求,传入回调函数
		var ajaxForm = new AjaxForm(URL, "get", "",true);
		ajaxForm.send(ajaxForm.caseList);
		// 5添加左边导航监听事件
		var left_nav = new leftNavForm();
		left_nav.addListener();

		// 6、searchbox
		var sb = new searchBox("案例搜索");
		sb.setSearchBtn();
		sb.initListener();
		
		//7、获取广告
		var ajaxForm = new AjaxForm(ADURL, "get", {"areaId":AREAID,"pageId":tabType},true);
		ajaxForm.send(ajaxForm.adList);
		break;
	case "5":
		// 发送医药请求
		// 1、全局变量设置
		URL = "medicine/medicineJson";
		SearchURL = "medicine/searchMedicine";
		// 2、设置按钮高亮
		$("#navigatorBar li").eq(5).addClass("active");

		// 3、显示上面导航信息
		var nav = "<a  href=''#' target='_blank'>稻草搜索</a>  &gt; "
				+ "<a  href=''#' target='_blank'>药物</a>  &gt; "
				+ "<span>医药列表</span>";
		$(".nav").html(nav);
		// 4、发送医院请求,传入回调函数
		var ajaxForm = new AjaxForm(URL, "get", "",true);
		ajaxForm.send(ajaxForm.medicineList);
		// 5添加左边导航监听事件
		var left_nav = new leftNavForm();
		left_nav.addListener();
		// 6、searchbox
		var sb = new searchBox("医药搜索");
		sb.setSearchBtn();
		sb.initListener();
		
		//7、获取广告
		var ajaxForm = new AjaxForm(ADURL, "get", {"areaId":AREAID,"pageId":tabType},true);
		ajaxForm.send(ajaxForm.adList);
		break;
	default:

	}
}

function searchBox(value) {
	this.value = value;
}
searchBox.prototype.setSearchBtn = function() {
	$("#searchButton").val(this.value);
	
	//点击搜索按钮
	$("#searchButton").click(function(){
		if($("#searchBox").val()==""){
			return;
		}
		var idata = {
				"q" : encodeURI($("#searchBox").val()),
				"flag":1,
				"limit":20,
				"tabType":tabType
			};
		var form = new AjaxForm("searchDbIndex", "get", idata,true);
		switch (tabType) {
		case "1":		
			form.send(form.hospitalsList);
			$("#searchBox").val("");
			break;
		case "2":
			form.send(form.doctorsList);
			$("#searchBox").val("");
			break;
		case "3":
			form.send(form.MedicalList);
			$("#searchBox").val("");
			break;
		case "4":
			form.send(form.caseList);
			$("#searchBox").val("");
			break;
		case "5":
			form.send(form.medicineList);
			$("#searchBox").val("");
			break;
		default:
		
		}
	});
};
searchBox.prototype.initListener = function() {
	
	$("#searchBox").autocomplete("searchDbIndex", {
		max : 20, // 列表里的条目数
		delay:0,
		cacheLength:20,
		matchSubject:1,
		minChars : 0, // 自动完成激活之前填入的最小字符
		width : 377, // 提示的宽度，溢出隐藏
		scrollHeight : 300, // 提示的高度，溢出显示滚动条
		matchContains : true, // 包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
		autoFill : false, // 自动填充
 //       mustMatch: false,    //是否全匹配, 如数据中没有此数据,将无法输入
		scroll:true,
		dataType:"json", 
		extraParams:{"tabType":tabType},
		 parse: function(data) {
	           return $.map(eval(data.result), function(row) {
	            return {             
	            	data: row,                   
	                value: row[0],                   
	                result: row[1]            
	        };});},    
		formatItem : function(data, i, max) {
			return data[1];
		},
		formatMatch : function(data, i, max) {
			return data[1];
		},
		formatResult : function(row) {
			return data[1];
		}
	}).result(function(event, data, formatted) {
				var idata = {
				"xid" : data[0]
			};
		var form = new AjaxForm(SearchURL, "get", idata,true);
		switch (tabType) {
		case "1":		
			form.send(form.hospitalsList);
			$("#searchBox").val("");
			break;
		case "2":
			form.send(form.doctorsList);
			$("#searchBox").val("");
			break;
		case "3":
			form.send(form.MedicalList);
			$("#searchBox").val("");
			break;
		case "4":
			form.send(form.caseList);
			$("#searchBox").val("");
			break;
		case "5":
			form.send(form.medicineList);
			$("#searchBox").val("");
			break;
		default:
		
		}
	});
};