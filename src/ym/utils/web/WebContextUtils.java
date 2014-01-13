package ym.utils.web;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

/**
 * 获取WEB环境的工具类
 * 
 * 
 * @date 2012-4-23
 * 
 */
public class WebContextUtils {

    /**
     * 初始化
     * 
     * @param request
     * @param response
     */
    public static void init(HttpServletRequest request,
	    HttpServletResponse response) {
	requestThreadLocal.set(request);
	responseThreadLocal.set(response);
    }

    /**
     * 从Session范围获取到一个对象
     * 
     * @param <T>
     * @param entityName
     *            对象在session中的标识
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> T getObjFromSession(String entityName) {
	T t = null;
	if (StringUtils.isNotEmpty(entityName)) {
	    HttpSession session = getSession();
	    if (session != null) {
		t = (T) session.getAttribute(entityName);
	    }
	}
	return t;
    }

    /**
     * 将一个对象放入session范围
     * 
     * @param key
     *            对象存放在session中的标识
     * @param obj
     *            需存放的对象
     */
    public static void putObjIntoSession(String key, Object obj) {
	if (StringUtils.isNotEmpty(key)) {
	    HttpSession session = getSession();
	    if (session != null) {
		session.setAttribute(key, obj);
	    }
	}
    }

    /**
     * 将一个对象从session范围移除
     * 
     * @param key
     *            对象存放在session中的标识
     */
    public static void removeObjFromSession(String key) {
	if (StringUtils.isNotEmpty(key)) {
	    HttpSession session = getSession();
	    if (session != null) {
		session.removeAttribute(key);
	    }
	}
    }

    /**
     * 将一个对象放入request范围
     * 
     * @param key
     *            对象在request中的标识
     * @param obj
     */
    public static void putObjIntoRequest(String key, Object obj) {
	if (StringUtils.isNotEmpty(key)) {
	    HttpServletRequest request = getRequest();
	    if (request != null) {
		request.setAttribute(key, obj);
	    }
	}
    }

    /**
     * 从Request范围获取到一个对象
     * 
     * @param <T>
     * @param entityName
     *            对象在request中的标识
     * @return
     */
    @SuppressWarnings("unchecked")
    public static <T> T getObjFromRequest(String entityName) {
	T t = null;
	if (StringUtils.isNotEmpty(entityName)) {
	    HttpServletRequest request = getRequest();
	    if (request != null) {
		t = (T) request.getAttribute(entityName);
	    }
	}
	return t;
    }

    /**
     * 
     * @description 调用request的getParameter方法
     * 
     * @return
     * 
     * @author Michael.xz
     */
    public static String getParameter(String parameter) {
	return getRequest().getParameter(parameter);
    }

    /**
     * 
     * @description 调用request的getParameter方法
     * 
     * @return
     * 
     * @author Lucifer
     */
    public static String[] getParameters(String key) {
	return getRequest().getParameterValues(key);
    }

    /**
     * 用文件/文件夹名获得真实路径（传入参数都是相对于站点根目录,如"/folder/"）
     * 
     * @param folderName
     *            文件夹相对站点根目录的路径
     * @return
     */
    public static String getRealPathByName(String folderName) {
	return getSession().getServletContext().getRealPath(folderName)
		+ File.separator;
    }

    /**
     * 用文件/文件夹名获得相对路径 生成的文件夹路径最后带斜杠
     * 
     * @param request
     * @param folderName
     *            文件夹相对站点根目录的路径,如"folder"
     * @return
     */
    public static String getSitePathByName(String folderName) {
	return getRequest().getContextPath() + File.separator + folderName
		+ File.separator;
    }

    /**
     * 获取当前线程的HttpServletRequest对象
     * 
     * @return
     */
    public static HttpServletRequest getRequest() {
	return requestThreadLocal.get();
    }

    /**
     * 获取当前线程的HttpSession对象
     * 
     * @return
     */
    public static HttpSession getSession() {
	HttpServletRequest request = getRequest();
	HttpSession session = null;
	if (request != null) {
	    session = request.getSession();
	}

	return session;
    }

    /**
     * 获取当前线程的HttpServletResponse对象
     * 
     * @return
     */
    public static HttpServletResponse getResponse() {
	return responseThreadLocal.get();
    }

    /** 保存当前请求对象的引用 **/
    private static ThreadLocal<HttpServletRequest> requestThreadLocal = new ThreadLocal<HttpServletRequest>();
    /** 保存当前响应对象的引用 **/
    private static ThreadLocal<HttpServletResponse> responseThreadLocal = new ThreadLocal<HttpServletResponse>();
}
