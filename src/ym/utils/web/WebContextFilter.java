package ym.utils.web;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * 将request 和response放入webcontextutils的localthreads中
 * 
 * @date 2010-3-30
 * 
 */
public class WebContextFilter implements Filter {

    public void doFilter(ServletRequest request, ServletResponse response,
	    FilterChain chain) throws IOException, ServletException {
	// 初始化线程变量
	WebContextUtils.init((HttpServletRequest) request,
		(HttpServletResponse) response);
	chain.doFilter(request, response);
    }

    public void init(FilterConfig config) throws ServletException {

    }

    public void destroy() {

    }
}
