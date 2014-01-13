package ym.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpRequestSender {

	
	//http://int.dpool.sina.com.cn/iplookup /iplookup.php?format=json&ip=123.123.123.123
//	private final static String URL = "whois.pconline.com.cn";
	private final static String URL ="int.dpool.sina.com.cn";

	public static enum Method {
		POST, GET
	};

	private String results;
	private HttpClient httpClient;
	private URI uri;
	private List<NameValuePair> qparams;
	private HttpServletRequest request;

	private String getIpAddr() {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	public HttpRequestSender() {
		this.httpClient = new DefaultHttpClient();
		this.qparams = new ArrayList<NameValuePair>();
	}
	
	public HttpRequestSender(HttpServletRequest request) {
		this.httpClient = new DefaultHttpClient();
		this.request = request;
		this.qparams = new ArrayList<NameValuePair>();
	}

	public String sender(Method method) {
		if (method.equals(Method.GET)) {
//			String localIp = getIpAddr();
//			if (localIp.equals("127.0.0.1")) {
//				return "本地";
//			}
			this.qparams.add(new BasicNameValuePair("format", "json"));
			this.qparams.add(new BasicNameValuePair("ip", "123.123.123.123"));
//			System.out.println("IP" + getIpAddr());

			try {
				this.uri = URIUtils.createURI("http", "int.dpool.sina.com.cn",
						-1, "/iplookup/iplookup.php",
						URLEncodedUtils.format(this.qparams, "UTF-8"), null);
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			HttpGet httpget = new HttpGet(uri);

			HttpResponse response = null;
			try {
				response = this.httpClient.execute(httpget);
				HttpEntity entity = response.getEntity();
				this.results = EntityUtils.toString(entity);
				System.out.println(response.getProtocolVersion());
				System.out.println(response.getStatusLine().getStatusCode());
				System.out.println(response.getStatusLine().getReasonPhrase());
				System.out.println(response.getStatusLine().toString());
			} catch (ClientProtocolException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return results;

	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		HttpRequestSender hs = new HttpRequestSender();
		System.out.println(hs.sender(Method.GET));
	}
}
