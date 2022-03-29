package kr.co.ismartcity.smartfactory.util;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RequestAPI
{
	public enum BodyType
	{
		FORM_DATA,
		RAW;
	}

	protected String url = "http://localhost";
	protected int port = 8099;

	final private RestTemplate restTemplate = new RestTemplate();


	@PostConstruct
	public void init()
	{
		//restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		HttpClient httpClient = HttpClientBuilder.create()
				.setRedirectStrategy(new LaxRedirectStrategy())
				.build(); factory.setHttpClient(httpClient);

		restTemplate.setRequestFactory(factory);

	}


	public Object callGetAPI(String subUrl, Object bodyData, Class retuenType) throws Exception
	{
		return callGetAPI(subUrl, makeHeader(), bodyData, retuenType);
	}


	public Object callGetAPI(String subUrl, HttpHeaders headers, Object bodyData, Class retuenType) throws URISyntaxException
	{
	    URI uri = getUri(subUrl, makeGetParams(bodyData));
	    log.debug("@@@@@@@@@@@@@@@@@@@@@@@@@@ : " + uri);
		HttpEntity<Object> request = new HttpEntity<>(null, headers);

		ResponseEntity<Object> response = restTemplate.exchange(
	    		uri, HttpMethod.GET, request, retuenType);

//	    ResponseEntity<Object> response = restTemplate.exchange(
//	    		"https://www.utic.go.kr:449/guide/imsOpenData.do?&key=89m6Hz1zkJDw6NC76srCmg18SY9KBMt1OFjdBHLcE2jvRTVfmrP3xCojNVILjtk5", HttpMethod.GET, request, retuenType);


	    return response.getBody();

	}


	public Object callPostAPI(String subUrl, BodyType bodyType, Object bodyData, Class retuenType) throws URISyntaxException
	{
		return callPostAPI(subUrl, makeHeader(), bodyType, bodyData, retuenType);
	}


	public Object callPostAPI(String subUrl, HttpHeaders headers, BodyType bodyType, Object bodyData, Class retuenType) throws URISyntaxException
	{
		URI uri = getUri(subUrl, null);

		HttpEntity<Object> request = null;

		if(bodyType == BodyType.FORM_DATA)
		{
			MultiValueMap<String, Object> parameters = makePostPrams(bodyData);
			request = new HttpEntity<>(parameters, headers);
		}
		else
		{
			String parameters = getObjectToString(bodyData);
			request = new HttpEntity<>(parameters, headers);
		}
		return restTemplate.postForObject(uri, request, retuenType);
	}



	private URI getUri(String subUrl, String params) throws URISyntaxException
	{
		URI uri;

		if(params != null) //URL에 파라메터를 추가해야 할때
		{
		    if(port == 0)
		    	uri = new URI(String.format("%s/%s?%s", url, subUrl, params));
		    else
		    	uri = new URI(String.format("%s:%d/%s?%s", url, port, subUrl, params));
		}
		else
		{
		    if(port == 0)
		    	uri = new URI(String.format("%s/%s", url, subUrl));
		    else
		    	uri = new URI(String.format("%s:%d/%s", url, port, subUrl));
		}
	    return uri;
	}



	/**
	 * Object 타입 검사
	 * @param bodyData
	 * @return
	 */
	private String getObjectToString(Object bodyData)
	{
		String strResult = "";

	    if(bodyData != null)
	    {
	    	if(bodyData instanceof JSONObject || bodyData instanceof String)
	    		strResult = bodyData.toString();
	    	else
	    		log.debug("타입 오류");
	    }
		return strResult;
	}





	/**
	 * Get 파라메터 생성
	 * @param jData
	 * @return
	 * @throws Exception
	 */
	protected String makeGetParams(Object bodyData)
	{
		String strParams = null;
	    if(bodyData != null && !bodyData.equals(""))
	    {
	    	String strJSON = getObjectToString(bodyData);
	    	JSONObject jData = new JSONObject(strJSON);

			List<NameValuePair> params = new LinkedList<NameValuePair>();
			Iterator iter = jData.keys();
			while (iter.hasNext()) {
				String key = (String) iter.next();
				params.add(new BasicNameValuePair(key, jData.getString(key)));
			}
			strParams = URLEncodedUtils.format(params, "utf-8");
	    }
		return strParams;
	}



	/**
	 * Post 파라메터 생성
	 * @param jData
	 * @return
	 * @throws Exception
	 */
	private MultiValueMap<String, Object> makePostPrams(Object bodyData)
	{
		MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
		if(bodyData != null && !bodyData.equals(""))
		{
			String strJSON = getObjectToString(bodyData);
			JSONObject jData = new JSONObject(strJSON);
			Iterator iter = jData.keys();
			while (iter.hasNext()) {
				String key = (String) iter.next();
				params.add(key, jData.get(key));
			}
		}
		return params;
	}


	/**
	 * 헤더 생서
	 * @return
	 * @throws Exception
	 */
	protected  HttpHeaders makeHeader()
	{
		HttpHeaders headers = new HttpHeaders();
		return headers;
	}

}


