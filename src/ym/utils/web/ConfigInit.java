package ym.utils.web;

import javax.servlet.ServletContext;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.context.ServletContextAware;

/**
 * 初使化一些配制放在application对像中
 * 
 */
public class ConfigInit implements ServletContextAware {

    public void init() {
	if (StringUtils.isBlank(resourceRoot)) {
	    resourceRoot = "resources";
	}
	servletContext.setAttribute("resourceRoot",
		servletContext.getContextPath() + "/" + resourceRoot);
    }

    private ServletContext servletContext;

    @Override
    public void setServletContext(ServletContext servletContext) {
	this.servletContext = servletContext;
    }

    private String resourceRoot;

    public void setResourceRoot(String resourceRoot) {
	this.resourceRoot = resourceRoot;
    }

    public String getResourceRoot() {
	return resourceRoot;
    }
}
