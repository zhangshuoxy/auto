package ym.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 后台管理
 * 
 */
@Controller
@RequestMapping("/manage")
public class ManageController {

    @RequestMapping(method = RequestMethod.GET)
    public String ready() {
	return "manager/manage";
    }

//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public ModelAndView managerPage(HttpServletRequest request) {
//	return new ModelAndView("manage");
//    }

}
