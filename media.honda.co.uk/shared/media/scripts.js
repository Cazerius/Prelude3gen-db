document.write("<meta http-equiv='imagetoolbar' content='no'>");

var server = '<!--#include virtual="/shared/media.ssi"-->';
var base = '<!--#include virtual="/shared/base.ssi"-->'; 
var section = "";
var folder = "";



function drawPage(title,fldr,id,hideMenu,hideTabs) {
	
	section = title;
	folder = fldr;
	
	document.write("<div id='dLogo'><a href='http://www.honda.co.uk'><img src='" + server + fldr + "media/logo.jpg' alt='Honda : The Power Of Dreams' border='0'></a></div>");
	
	document.write("<div id='dTitle'><a href='#'><img src='" + server + fldr + "media/title.jpg' alt='" + title + "' border='0'></a></div>");

	if (hideMenu==undefined) drawMenu(title,fldr,id);
	if (hideTabs==undefined) drawTabs();

}

function drawMenuTabs(title,fldr,id,hideMenu,hideTabs) {
	
	section = title;
	folder = fldr;
		
	if (hideMenu==undefined) drawMenu(title,fldr,id);
	if (hideTabs==undefined) drawTabs();

}


function drawMenu(title,fldr,id) {
	
	document.write("<div id=\"dMenu\"></div>");
	
	var url   = server + "/shared/media/menu.swf?list=" + server + fldr + "media/" + title + ".xml&btn_id=" + id;
			
	var so = new SWFObject(url, "fMenu", "175", "420", "6", "#FFFFFF");

	// add parameters
	so.addParam("salign", "t");
	so.addParam("quality", "best");
	so.addParam("scale", "noscale");
	so.addParam("menu", "false");
	so.addParam("wmode", "transparent");
	so.addParam("allowscriptaccess", "always");
	so.addParam("seamlesstabbing", "false");
	
	so.write("dMenu");
	
}






function drawTabs() {
	
	document.write("<div id=\"dTabs\"></div>");
	
	var url   = server + "/car/media/tabs_html_main.swf?htmlVersion=html";
			
	var so = new SWFObject(url, "fTabs", "950", "600", "6", "#FFFFFF");

	// add parameters
	so.addParam("salign", "t");
	so.addParam("quality", "best");
	so.addParam("scale", "noscale");
	so.addParam("menu", "false");
	so.addParam("wmode", "transparent");
	so.addParam("allowscriptaccess", "always");
	so.addParam("seamlesstabbing", "false");
	
	if (dealerView) {
		so.addVariable("dealerCode",dealerCode);
	}
	
	/*
	var tag = new FlashTag(server + "/car/media/overlay_html_main.swf", 950, 600);
	tag.wMode = "transparent";
	
	tag.setFlashvars(flashVars.join("&"));
	document.write(tag.toString());	   
	*/
	
	so.write("dTabs");
	
}

function drawLBTabs(model) {
	
	var url = server + "/car/media/tabs_control.swf";  
	  
	var so_tlb = new SWFObject(url, "fTabs", "950", "600", "6", "#000000");
	
	so_tlb.addVariable("htmlVersion"	, "html");
	so_tlb.addVariable("car_id"			, model);
	if (uid) so_tlb.addVariable("lcId"			, uid);

	so_tlb.addParam("menu","false");
	so_tlb.addParam("quality","best");
	so_tlb.addParam("wmode","transparent");
	so_tlb.addParam("allowscriptaccess", "always");
	so_tlb.write("dTabs");

}


function drawFlash(id,w,h,src,bg,trans,FlashVars) {
	//for placing flash in a page bypassing IE active object issue. (mbw)
	//name, width, height, source path (excl media server), background colour, trans=true for wmode transparent.
	var dFlashStr;
	if (FlashVars==undefined) FlashVars = "";
	dFlashStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' width='" + w + "' height='" + h + "' id='" + id + "'>";
	dFlashStr += "<param name='AllowScriptAccess' value='always'/>";
	dFlashStr += "<param name='movie' value='" + server + src + "' />";
	dFlashStr += "<param name='menu' value='false' />";
	dFlashStr += "<param name='quality' value='best' />";
	dFlashStr += "<param name='salign' value='t' />";
	dFlashStr += "<param name='scale' value='noscale' />";
	if (bg!="") {
		dFlashStr += "<param name='bgcolor' value='"+bg+"' />";
	}
	if (trans) {
		dFlashStr += "<param name='wmode' value='transparent' />";
	}
	
	dFlashStr += "<param name='FlashVars' value='mediaServer=" + server + "&" + FlashVars   +"' />";

	dFlashStr += "<embed src='" + server + src + "' AllowScriptAccess='always' menu='false' quality='best' scale='noscale' width='" + w + "' height='" + h + "' name='" + id + "' ";
	if (bg!="") {
		dFlashStr += " bgcolor='"+bg+"' ";
	}
	if (trans) {
		dFlashStr += " wmode='transparent' ";
	}
	dFlashStr += "FlashVars='mediaServer=" + server + "&" + FlashVars +"'";

	dFlashStr += " type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />";
	dFlashStr += "</object>";

	document.write(dFlashStr);
}


//function called from flash tabs to correctly z-order the divs in the page and hide the select boxes.
function changeTabs(action) {
	if (action == 'hide') {
		document.getElementById('dTabs').style.zIndex=20;
		unhideSelect();
	}
	if (action == 'show') {
		hideSelect();
		document.getElementById('dTabs').style.zIndex=50;
	}
}

//function called from flash tabs to correctly z-order the divs in the page and hide the select boxes.
function changePanel(action) {

	if (action == 'hide') {
		if (document.getElementById('dFooterPanel'))		document.getElementById('dFooterPanel').style.zIndex=-60;
		unhideSelect();
	}
	if (action == 'show') {
		hideSelect();
		if (document.getElementById('dFooterPanel'))		document.getElementById('dFooterPanel').style.zIndex=60;
	}
}
  
// Hide all select boxes
function hideSelect() {
	if (document.all) {
		for (formIdx=0; formIdx<document.forms.length; formIdx++) {
			var theForm = document.forms[formIdx];
			for (elementIdx=0; elementIdx<theForm.elements.length; elementIdx++) {
				if(theForm[elementIdx].type == "select-one") {
					theForm[elementIdx].style.visibility = "hidden";
				}
			}
		}
	}
}

// Unhide all select boxes
function unhideSelect() {
	if (document.all) {
		
		for (formIdx=0; formIdx<document.forms.length; formIdx++) {
			var theForm = document.forms[formIdx];
			for(elementIdx=0; elementIdx<theForm.elements.length; elementIdx++) {
				if(theForm[elementIdx].type == "select-one") {
					theForm[elementIdx].style.visibility = "visible";
				}
			}
		}
	}
}


//dealerView
var dealerView, dealerCode;
function checkDealerView() {
	
	dealerView = false;
	dealerCode = "";
	debug = "";
	
	function getDealerCode(str,name,endChar) {
		var start, end, gdc;
		str = str.toUpperCase();
		name = name.toUpperCase();
		gdc = null;
		var start = str.indexOf(name + "=")
		if (start!=-1) {
			end = str.indexOf(endChar,start);
			if (end==-1) end = str.length;
			gdc = unescape(str.substring(start+name.length+1,end));
			gdc = gdc.replace(/\+/g," ");
		}  
		return gdc;	
	}

	qdc = getDealerCode(location.search.substring(1),"dealerCode","&");
	
	if (qdc!=null) {
		dealerView = true;
		dealerCode = qdc;
		debug += "dealer code found in querystring\n";
		//set cookie so we remember it
		document.cookie = "HUKDLR=" + qdc + ";path=/;";
	}
	else {
		debug += "dealer code NOT found in querystring\n";
		cdc = getDealerCode(document.cookie,"HUKDLR",";");
		if (cdc!=null) {
			debug += "dealer code found in cookie\n";
			dealerView = true;
			dealerCode = cdc;
		}
		else {
			debug += "dealer code NOT found in cookie\n";
		}
	}
	
	debug += "\ndealerView = " + dealerView + "  dealerCode = " + dealerCode;

	
	//document.write("<div style='position:absolute; left:1000; top:200; color:#ffffff; font-family:verdana; font-size:10px;'>" + debug + "</div>");

}

	
	
checkDealerView();



//functions for allowing calls into certain areas of HCE
document.write("<scr"+"ipt type='text/javascript' src='" + server + "/car/media/javascript/HCEFunctions.js'></scr"+"ipt>");
//sophus tracking include
document.write("<scr"+"ipt language='JavaScript' type='text/javascript' src='" + server + "/shared/media/touchClarity/logging.js'></scr"+"ipt>");
//starcom tracking include - see starcom.jsp
document.write("<div style='position:absolute;left:-50;'><img height='1' width='1' src='" + base + "/service/tags/starcom.jsp?path=" + location.pathname + "&qs=" + location.search + "'/></div>");
//jquery
document.write("<scr"+"ipt type='text/javascript' src='" + server + "/shared/media/jquery-1.2.3.pack.js'></scr"+"ipt>");


function DCLKSpotlightTag(cat_str, sub_cat_str, type)
{
	var axel = Math.random() * 10000000000000;
	type = type ? type : 1; // default type to 1

	var pix = new Image();

	pix.src = "http://mail.honda.co.uk/cgi-bin2/buyrate?type="+type+"&category="+cat_str+"&subcategory="+sub_cat_str+"&id=" + axel;

	return void(null);
}




function MM_preloadImages() { //v2.0
  if (document.images) {
    var imgFiles = MM_preloadImages.arguments;
    if (document.preloadArray==null) document.preloadArray = new Array();
    var i = document.preloadArray.length;
    with (document) for (var j=0; j<imgFiles.length; j++) if (imgFiles[j].charAt(0)!="#"){
      preloadArray[i] = new Image;
      preloadArray[i++].src = imgFiles[j];
  } }
}


//UNIVERSAL FLASH->JS FUNCTION
function doFunctions() {

	var funcList   	= new Array();
	var func	   	= new Array();
	var silent  	= arguments[0];
	var argsStr		= silent;
	
	for (var i=1;i<arguments.length;i++) {
		 var arg = arguments[i];
		 argsStr += ",'" + arg + "'";
		 if (arg == "exec") {
		 	if (i!=1) funcList.push(func);
		 	func = new Array();
		 }
		 else {
			func.push(arg);
		 }
	}
	funcList.push(func);

	if (!silent) alert("doFunctions(" + argsStr + ")");

	for (var i=0;i<funcList.length;i++) {
		var funcStr = funcList[i][0] + "(";
		if (funcList[i].length > 0) {
			for (var j=1;j<funcList[i].length;j++) {
				funcStr += "'" + funcList[i][j] + "',";
			}
			if (funcList[i].length>1) funcStr = funcStr.substr(0,funcStr.length-1);
			funcStr += ");";
			if (!silent) alert("trying:\n" + funcStr);
			try {
				eval(funcStr);
			}
			catch(exception) {
				if (!silent) alert("failed:\n" + exception);
			}
		}
	}
}




/**
 * SWFObject v1.4.4: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * **SWFObject is the SWF embed script formerly known as FlashObject. The name was changed for
 *   legal reasons.
 */

if(typeof deconcept=="undefined"){var deconcept=new Object();}
if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}
if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}
deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a,_b){if(!document.getElementById){return;}
this.DETECT_KEY=_b?_b:"detectflash";
this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);
this.params=new Object();
this.variables=new Object();
this.attributes=new Array();
if(_1){this.setAttribute("swf",_1);}
if(id){this.setAttribute("id",id);}
if(w){this.setAttribute("width",w);}
if(h){this.setAttribute("height",h);}
if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}
this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();
if(c){this.addParam("bgcolor",c);}
var q=_8?_8:"high";
this.addParam("quality",q);
this.setAttribute("useExpressInstall",_7);
this.setAttribute("doExpressInstall",false);
var _d=(_9)?_9:window.location;
this.setAttribute("xiRedirectUrl",_d);
this.setAttribute("redirectUrl","");
if(_a){this.setAttribute("redirectUrl",_a);}};
deconcept.SWFObject.prototype={setAttribute:function(_e,_f){
this.attributes[_e]=_f;
},getAttribute:function(_10){
return this.attributes[_10];
},addParam:function(_11,_12){
this.params[_11]=_12;
},getParams:function(){
return this.params;
},addVariable:function(_13,_14){
this.variables[_13]=_14;
},getVariable:function(_15){
return this.variables[_15];
},getVariables:function(){
return this.variables;
},getVariablePairs:function(){
var _16=new Array();
var key;
var _18=this.getVariables();
for(key in _18){_16.push(key+"="+_18[key]);}
return _16;},getSWFHTML:function(){var _19="";
if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){
if(this.getAttribute("doExpressInstall")){
this.addVariable("MMplayerType","PlugIn");}
_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\"";
_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";
var _1a=this.getParams();
for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}
var _1c=this.getVariablePairs().join("&");
if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";
}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");}
_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\">";
_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";
var _1d=this.getParams();
for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}
var _1f=this.getVariablePairs().join("&");
if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}
return _19;
},write:function(_20){
if(this.getAttribute("useExpressInstall")){
var _21=new deconcept.PlayerVersion([6,0,65]);
if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){
this.setAttribute("doExpressInstall",true);
this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));
document.title=document.title.slice(0,47)+" - Flash Player Installation";
this.addVariable("MMdoctitle",document.title);}}
if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){
var n=(typeof _20=="string")?document.getElementById(_20):_20;
n.innerHTML=this.getSWFHTML();return true;
}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}
return false;}};
deconcept.SWFObjectUtil.getPlayerVersion=function(){
var _23=new deconcept.PlayerVersion([0,0,0]);
if(navigator.plugins&&navigator.mimeTypes.length){
var x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}
}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}
catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}
catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}
catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}
return _23;};
deconcept.PlayerVersion=function(_27){
this.major=_27[0]!=null?parseInt(_27[0]):0;
this.minor=_27[1]!=null?parseInt(_27[1]):0;
this.rev=_27[2]!=null?parseInt(_27[2]):0;
};
deconcept.PlayerVersion.prototype.versionIsValid=function(fv){
	
if(this.major<fv.major){return false;}
if(this.major>fv.major){return true;}
if(this.minor<fv.minor){return false;}
if(this.minor>fv.minor){return true;}
if(this.rev<fv.rev){
return false;
}return true;};
deconcept.util={getRequestParameter:function(_29){
var q=document.location.search||document.location.hash;
if(q){var _2b=q.substring(1).split("&");
for(var i=0;i<_2b.length;i++){
if(_2b[i].substring(0,_2b[i].indexOf("="))==_29){
return _2b[i].substring((_2b[i].indexOf("=")+1));}}}
return "";}};
deconcept.SWFObjectUtil.cleanupSWFs=function(){if(window.opera||!document.all){return;}
var _2d=document.getElementsByTagName("OBJECT");
for(var i=0;i<_2d.length;i++){_2d[i].style.display="none";for(var x in _2d[i]){
if(typeof _2d[i][x]=="function"){_2d[i][x]=function(){};}}}};
deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};
__flash_savedUnloadHandler=function(){};
if(typeof window.onunload=="function"){
var _30=window.onunload;
window.onunload=function(){
deconcept.SWFObjectUtil.cleanupSWFs();_30();};
}else{window.onunload=deconcept.SWFObjectUtil.cleanupSWFs;}};
if(typeof window.onbeforeunload=="function"){
var oldBeforeUnload=window.onbeforeunload;
window.onbeforeunload=function(){
deconcept.SWFObjectUtil.prepUnload();
oldBeforeUnload();};
}else{window.onbeforeunload=deconcept.SWFObjectUtil.prepUnload;}
if(Array.prototype.push==null){
Array.prototype.push=function(_31){
this[this.length]=_31;
return this.length;};}
var getQueryParamValue=deconcept.util.getRequestParameter;
var FlashObject=deconcept.SWFObject;
var SWFObject=deconcept.SWFObject;


//SESSION COOKIE CODE

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}
function sessionCookie(c_name)
{
	cookiestr=getCookie(c_name);
	if (cookiestr==null || cookiestr=="") {
		cookiestr = new Date().getTime();
		document.cookie=c_name+ "=" +escape(cookiestr);
	}
	return cookiestr;	//cookie found
}






