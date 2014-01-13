package ym.utils;

import it.sauronsoftware.base64.Base64;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieOp {

	private static final int COOKIESTIME =365*24*60 * 60;
	
	public void setCookies(String key,String value,HttpServletResponse response){
		Cookie cookie = new Cookie(key, Base64.encode(value, "UTF-8"));
		cookie.setMaxAge(COOKIESTIME);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
	public String getCookies(String key,String value,HttpServletRequest request){
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie coo : cookies) {
				if (coo.getName().equals(key)) {
					return Base64.decode(coo.getValue(), "UTF-8");
				}else{
					continue;
				}
			}
		}		
		return null;

	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
