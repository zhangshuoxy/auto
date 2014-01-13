package ym.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import ym.model.Staff;
import ym.service.BaseService;
import ym.utils.HttpRequestSender;


@Controller
public class AutoController {

	@Autowired
	private BaseService<Staff> staffService;

	/**
	 * json返回当前城市
	 * @param request
	 * @return
	 */
	
	@RequestMapping(value="/auto",method=RequestMethod.GET)
	public ModelAndView autoPage(HttpServletRequest request){
		ModelMap model = new ModelMap();
		
	//	List<Staff> list=staffService.findAll(Staff.class);
		
		return new ModelAndView("autos");
		
	}
	@RequestMapping(value="/pic",method=RequestMethod.GET)
	public ModelAndView picPage(HttpServletRequest request){
		ModelMap model = new ModelMap();
		
		//	List<Staff> list=staffService.findAll(Staff.class);
		
		return new ModelAndView("pics");
		
	}
	@RequestMapping(value="/photo",method=RequestMethod.GET)
	public ModelAndView photoPage(HttpServletRequest request){
		ModelMap model = new ModelMap();
		
		//	List<Staff> list=staffService.findAll(Staff.class);
		
		return new ModelAndView("photos");
		
	}
	
}
