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
public class HomeController {

	@Autowired
	private BaseService<Staff> staffService;

	/**
	 * json返回当前城市
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/getCurrentCity",method=RequestMethod.GET)
	public ModelAndView getCurrentCity(HttpServletRequest request){
		ModelMap model = new ModelMap();
		//获取当前城市
		HttpRequestSender sender = new HttpRequestSender(request);
		String currentCity = sender.sender(HttpRequestSender.Method.GET).split(" ")[0];
		model.put("currentCity",currentCity);
		return new ModelAndView(new MappingJacksonJsonView(), model);
		
	}
	@RequestMapping(value="/home",method=RequestMethod.GET)
	public ModelAndView homePage(HttpServletRequest request){
		ModelMap model = new ModelMap();
		
	//	List<Staff> list=staffService.findAll(Staff.class);
		
		return new ModelAndView("index");
		
	}
	@RequestMapping(value="/intro",method=RequestMethod.GET)
	public ModelAndView introPage(HttpServletRequest request){
		ModelMap model = new ModelMap();
		
		//	List<Staff> list=staffService.findAll(Staff.class);
		
		return new ModelAndView("intro");
		
	}
	
}
