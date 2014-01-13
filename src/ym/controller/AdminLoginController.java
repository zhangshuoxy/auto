package ym.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 管理员登录
 * 
 */
@Controller
@RequestMapping("/admin")
public class AdminLoginController {

    
    /**
     * 登录初始页面
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public String login() {
	return "manager/admin_login";
    }
    
    /**
     * 登录请求
     * @param userName
     * @param password
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestParam("userName") String userName,
	    @RequestParam String password) {
	System.out.println("userName: " + userName);
	System.out.println("password: " + password);
	if(userName.equals(password))
	    return "manager/admin_login_success";
	else 
	    return "index";
    }
}
