package kr.co.ismartcity.smartfactory.config;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.Security;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

import javax.annotation.PreDestroy;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.openssl.PEMReader;
import org.eclipse.paho.client.mqttv3.DisconnectedBufferOptions;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.querydsl.core.types.dsl.StringTemplate;

import kr.co.ismartcity.smartfactory.service.ThreadPoolService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@ConfigurationProperties
@PropertySource(value = {
	"classpath:/application.yaml",
	"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
})
public class MqttConfig {

	@Value("${mqtt.clientId}")
	private String clientId;

	@Value("${mqtt.completionTimeout}")
	private int completionTimeout;

	@Value("${mqtt.qos}")
	private int qos;

	@Value("${mqtt.url}")
	private String url;
	
    @Value("${mqtt.url2}")
    private String url2;

	@Value("${mqtt.topic}")
	private String topic;

	@Value("${mobius.rn}")
	private String rn;

	@Value("${mobius.aeid}")
	private String aeid;

	@Value("${mqtt.cafile}")
	private String cafile;

	@Value("${mqtt.tlsv}")
	private String tlsv;

	@Value("${mobius.address}")
	private String mobius_address;

    
    @Value("${mobius.address2}")
    private String mobius_address2;

	@Autowired
	ThreadPoolService threadPoolService;

	@Autowired
	@Qualifier("mobiusJsonParser")
	JsonParser mobiusJsonParser;

    static MqttClientCallback mqttClientCallback = null;
    static MqttClientCallback mqttClientCallback2 = null;
    static MqttAsyncClient mqttClient = null;
    static MqttAsyncClient mqttClient2 = null;
    //게이트웨이 통신(101번) 라우팅

    @Bean
	public MqttAsyncClient mqttAsyncClient() {
    	mqttClientCallback = new MqttClientCallback(mobiusJsonParser, rn, aeid);

		try {
			log.debug(String.format("mqttAsyncClient() url(%s)", url));

			InetAddress local = null;
			try {
				local = InetAddress.getLocalHost();
				log.debug("local.getHostName() : " + local.getHostName());
			} catch (Exception e1) {
				e1.printStackTrace();
			}

			String mqtt_client_id = clientId + "_" + local.getHostName();
			log.debug("mqtt_client_id : " + mqtt_client_id);

            //mqttClient = new MqttAsyncClient(url, clientId + "_" + RandomStringUtils.random(5, true, false), new MemoryPersistence());
			mqttClient = new MqttAsyncClient(url, mqtt_client_id, new MemoryPersistence());
            mqttClient.setCallback(mqttClientCallback);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setConnectionTimeout(completionTimeout);
            options.setKeepAliveInterval(completionTimeout);
            options.setMaxInflight(10000000);
        	options.setCleanSession(true);
        	options.setAutomaticReconnect(true);

            if(url.contains("ssl")) {
            	Security.addProvider(new BouncyCastleProvider());

            	InputStream streamCafile = this.getClass().getResourceAsStream("/certs" + cafile);

            	PEMReader reader = new PEMReader(new InputStreamReader(streamCafile));
        		X509Certificate caCert = (X509Certificate)reader.readObject();
        		reader.close();

        		KeyStore caKs = KeyStore.getInstance(KeyStore.getDefaultType());
        		caKs.load(null, null);
        		caKs.setCertificateEntry("ca-certificate", caCert);
        		TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        		tmf.init(caKs);

        		SSLContext sslContext = SSLContext.getInstance(tlsv);
            	sslContext.init(null, tmf.getTrustManagers(), null);

            	options.setSocketFactory(sslContext.getSocketFactory());
            }

			log.debug("mqttAsyncClient() mqttClient.isConnected():"+ mqttClient.isConnected());

            if (!mqttClient.isConnected()) { // 중복 수신 방지

    			log.debug(String.format("mqttAsyncClient() mqttClient.connect start"));
                mqttClient.connect(options, null, new IMqttActionListener() {
                    @Override
                    public void onSuccess(IMqttToken asyncActionToken) {
                        try {
                        	DisconnectedBufferOptions bufferOptions = new DisconnectedBufferOptions();
                        	bufferOptions.setBufferEnabled(true);
                        	bufferOptions.setBufferSize(10000);
                        	bufferOptions.setPersistBuffer(false);
                        	bufferOptions.setDeleteOldestMessages(false);
                        	mqttClient.setBufferOpts(bufferOptions);

                        	mqttClient.unsubscribe(topic); // 중복 수신 방지

                        	mqttClient.unsubscribe(topic); // 중복 수신 방지

                        	mqttClient.subscribe(topic, qos);
                			log.debug("mqttAsyncClient() mqttClient.subscribe start topic:(" + topic + "), qos:(" + qos + ")");

                        } catch (MqttException me) {
                            me.printStackTrace();
                        }
                    }

                    @Override
                    public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                        exception.printStackTrace();
                    }
                });
            }

        } catch (MqttException me) {
            me.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} catch (CertificateException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		}

		return mqttClient;
	}

    // 다이렉트 센서통신(99번 라우팅)
    @Bean
    public MqttAsyncClient mqttAsyncClient2() {
    	
    	
    	mqttClientCallback2 = new MqttClientCallback(mobiusJsonParser, rn, aeid);
    	
    	try {
    		log.debug(String.format("mqttAsyncClient() url(%s)", url2));
    		
    		InetAddress local = null;
    		try {
    			local = InetAddress.getLocalHost();
    			log.debug("local.getHostName() : " + local.getHostName());
    		} catch (Exception e1) {
    			e1.printStackTrace();
    		}
    		
    		String mqtt_client_id = clientId + "_" + local.getHostName();
    		log.debug("mqtt_client_id : " + mqtt_client_id);
    		
    		//mqttClient = new MqttAsyncClient(url, clientId + "_" + RandomStringUtils.random(5, true, false), new MemoryPersistence());
    		mqttClient2 = new MqttAsyncClient(url2, mqtt_client_id, new MemoryPersistence());
    		mqttClient2.setCallback(mqttClientCallback2);
    		
    		MqttConnectOptions options = new MqttConnectOptions();
    		options.setConnectionTimeout(completionTimeout);
    		options.setKeepAliveInterval(completionTimeout);
    		options.setMaxInflight(10000000);
    		options.setCleanSession(true);
    		options.setAutomaticReconnect(true);
    		
    		if(url.contains("ssl")) {
    			Security.addProvider(new BouncyCastleProvider());
    			
    			InputStream streamCafile = this.getClass().getResourceAsStream("/certs" + cafile);
    			
    			PEMReader reader = new PEMReader(new InputStreamReader(streamCafile));
    			X509Certificate caCert = (X509Certificate)reader.readObject();
    			reader.close();
    			
    			KeyStore caKs = KeyStore.getInstance(KeyStore.getDefaultType());
    			caKs.load(null, null);
    			caKs.setCertificateEntry("ca-certificate", caCert);
    			TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
    			tmf.init(caKs);
    			
    			SSLContext sslContext = SSLContext.getInstance(tlsv);
    			sslContext.init(null, tmf.getTrustManagers(), null);
    			
    			options.setSocketFactory(sslContext.getSocketFactory());
    		}
    		
    		log.debug("mqttAsyncClient() mqttClient.isConnected():"+ mqttClient2.isConnected());
    		
    		if (!mqttClient2.isConnected()) { // 중복 수신 방지
    			
    			log.debug(String.format("mqttAsyncClient() mqttClient.connect start"));
    			mqttClient2.connect(options, null, new IMqttActionListener() {
    				@Override
    				public void onSuccess(IMqttToken asyncActionToken) {
    					try {
    						DisconnectedBufferOptions bufferOptions = new DisconnectedBufferOptions();
    						bufferOptions.setBufferEnabled(true);
    						bufferOptions.setBufferSize(10000);
    						bufferOptions.setPersistBuffer(false);
    						bufferOptions.setDeleteOldestMessages(false);
    						mqttClient2.setBufferOpts(bufferOptions);
    						
    						mqttClient2.unsubscribe(topic); // 중복 수신 방지
    						
    						mqttClient2.unsubscribe(topic); // 중복 수신 방지
    						
    						mqttClient2.subscribe(topic, qos);
    						log.debug("mqttAsyncClient() mqttClient.subscribe start topic:(" + topic + "), qos:(" + qos + ")");
    						
    					} catch (MqttException me) {
    						me.printStackTrace();
    					}
    				}
    				
    				@Override
    				public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
    					exception.printStackTrace();
    				}
    			});
    		}
    		
    	} catch (MqttException me) {
    		me.printStackTrace();
    	} catch (NoSuchAlgorithmException e) {
    		e.printStackTrace();
    	} catch (IOException e) {
    		e.printStackTrace();
    	} catch (KeyStoreException e) {
    		e.printStackTrace();
    	} catch (CertificateException e) {
    		e.printStackTrace();
    	} catch (KeyManagementException e) {
    		e.printStackTrace();
    	}
    	
    	return mqttClient;
    }


    @PreDestroy
    public void destroySubscribe() {
    	try {
			log.debug("destroySubscribe mqttClient:(" + mqttClient + ")");
    		if (mqttClient != null) {
    			log.debug("mqttAsyncClient() mqttClient.unsubscribe start topic:(" + topic + ")");
    			mqttClient.unsubscribe(topic);
    		}
		} catch (MqttException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // 중복 수신 방지
    }

	public class MqttClientCallback implements MqttCallback{

		private JsonParser mobiusJsonParser;
		private String rn;
		private String aeid;

		public MqttClientCallback(JsonParser mobiusJsonParser, String rn, String aeid) {
			super();
			this.mobiusJsonParser = mobiusJsonParser;
			this.rn = rn;
			this.aeid = aeid;
		}

		@Override
		public void connectionLost(Throwable arg0)
		{
			log.error("mqtt Lost connection");
		}

		@Override
		public void deliveryComplete(IMqttDeliveryToken arg0)
		{
			log.debug("mqtt Send completed!");
		}

		@SuppressWarnings("unchecked")
		@Override
		public void messageArrived(String topic, MqttMessage message) throws Exception
		{
			try {
				String messageStr = new String(message.getPayload(), "utf-8");
				
				//log.debug("++++++++++++++++++++++++++++ {}", messageStr);
				
				// 2022.01.05 정재훈 추가
				// time 값이 안들어오는 센서가 있어서 임시로 time값 부여
				int commaIndex = messageStr.indexOf("TIME") + 7;
				char comma = messageStr.charAt(commaIndex);
				if(comma == ',') {
					LocalDateTime now = LocalDateTime.now();
					String time = now.format(DateTimeFormatter.ofPattern("YYYYMMDDHHmmSS"));
					
					StringBuffer sb = new StringBuffer();
					sb.append(messageStr);
					sb.insert(commaIndex, time);
					
					messageStr = sb.toString();
					//messageStr.replaceAll("\\\"", "\"");
				}
				
				Map<String, Object> obj = this.mobiusJsonParser.parseMap(messageStr);
				if(obj != null) {
					String toObj = (String)obj.get("to");

					//log.debug("mqtt mobius_address:"+ toObj + ":" + mobius_address);
					//101번과 99번 동시에 셋팅위해 조건문 제거
					if (toObj.contains(mobius_address) || toObj.contains(mobius_address2)) { // 네트웍 카드가 2개인 경우 2중으로 수신되는 현상 방지

					log.debug("mqtt mobius_address:"+ toObj + ":" + mobius_address);
	
						Map<String, Object> pcObj = (Map<String, Object>)obj.get("pc");
						if(pcObj != null) {
							Map<String, Object> sgnObj = (Map<String, Object>)pcObj.get("m2m:sgn");
							if(sgnObj != null) {
								String sur = (String)sgnObj.get("sur");
								String surFull = (String)sgnObj.get("sur");
								Map<String, Object> nevObj = (Map<String, Object>)sgnObj.get("nev");
								if(nevObj != null) {
									Map<String, Object> repObj = (Map<String, Object>)nevObj.get("rep");
									if(repObj != null) {
										Map<String, Object> cinObj = (Map<String, Object>)repObj.get("m2m:cin");
										if(cinObj != null && !aeid.equalsIgnoreCase((String)cinObj.get("cr"))) {
											sur = sur.replace("/"+rn, "");
											sur = sur.replace("Smartfactory", "");
											sur = sur.substring(0, sur.lastIndexOf('/'));
											//log.debug("++++++++++++++++++++++++++++ {}, {}, {}, {}", aeid, cinObj.get("cr"), sur, cinObj);
											if(cinObj.get("con").toString().contains("type=Buffer")) {
												log.debug("7777777777"+cinObj.get("con"));
											} 
											//if(cinObj.get("con").toString().contains("UID=1004")) {
											log.debug("7777777777"+cinObj.get("con"));
											//}
											cinObj.get("con");
											//Map<String, JSONObject> data2222 = (Map<String, JSONObject>)con;
											
											//JSONObject json = new JSONObject(String.valueOf(false) );
											//Map<String, String>
											//Map<String, String> conObj2 = (Map<String, String>)cinObj.get("UID");
											//Map<String, Map<String, Object>> conObj = (Map<String, Map<String, Object>>)cinObj.get("con");
											//log.debug("6666666666666666"+conObj);
											//Map<String, Object> dataObj = (Map<String, Object>)conObj.get("DATA");
											//log.debug("55555555555"+dataObj);
											//String dataTime = (String)dataObj.get("TIME");
	//										if(dataTime==null) {
	//											log.debug("null");
	//										}
	//										
	
	//										log.debug(dataTime);
	//										if(dataTime==null) {
	//											
	//
	//										}
	//										
	//										
											
											threadPoolService.parseMobius(sur, cinObj, surFull);
	//										if (sur.startsWith("/AirSensor")) {
	//											String mobiusId = sur;
	//											mqttAirSensorService.recvAirQuality(mobiusId, cinObj);
	//										}
										}
									}
								}
							}
						}
					} else {
						log.debug("mqtt mobius_address not match");
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

    }
	/*
	@Bean
	public MessageChannel mqttInputChannel() {
		return new DirectChannel();
	}

	@Bean
	public MessageProducer inbound() {
		MqttPahoMessageDrivenChannelAdapter adapter = new MqttPahoMessageDrivenChannelAdapter(url, clientId + "_" + RandomStringUtils.random(5, true, false), topic);
		adapter.setCompletionTimeout(completionTimeout);
		adapter.setConverter(new DefaultPahoMessageConverter());
		adapter.setQos(qos);
		adapter.setOutputChannel(mqttInputChannel());
		return adapter;
	}

	@ConfigurationProperties("mobius")
	@Bean
	@ServiceActivator(inputChannel = "mqttInputChannel")
	public MessageHandler handler() {

		return new MessageHandler() {

			@Value("${rn}")
			private String rn;

			@Value("${aeid}")
			private String aeid;

			@SuppressWarnings("unchecked")
			@Override
			public void handleMessage(Message<?> message) throws MessagingException {
				Map<String, Object> obj = mobiusJsonParser.parseMap((String) message.getPayload());
				if(obj != null) {
					Map<String, Object> pcObj = (Map<String, Object>)obj.get("pc");
					if(pcObj != null) {
						Map<String, Object> sgnObj = (Map<String, Object>)pcObj.get("m2m:sgn");
						if(sgnObj != null) {
							String sur = (String)sgnObj.get("sur");
							Map<String, Object> nevObj = (Map<String, Object>)sgnObj.get("nev");
							if(nevObj != null) {
								Map<String, Object> repObj = (Map<String, Object>)nevObj.get("rep");
								if(repObj != null) {
									Map<String, Object> cinObj = (Map<String, Object>)repObj.get("m2m:cin");
									if(cinObj != null && !aeid.equalsIgnoreCase((String)cinObj.get("cr"))) {
										sur = sur.replace("/"+rn, "");
										sur = sur.replace("SmartHarbor", "");
										sur = sur.substring(0, sur.lastIndexOf('/'));
										// log.debug("++++++++++++++++++++++++++++ {}, {}, {}, {}", aeid, cinObj.get("cr"), sur, cinObj);
										if(sur.matches("\\/([0-9])+\\/ECO")) {
											ecoService.parseEco(sur, cinObj);
										} else {
											log.debug("This is not matched with my thyme id. {}, {}, {}, {}", aeid, cinObj.get("cr"), sur, cinObj);
										}
									}
								}
							}
						}
					}
				}
			}

		};

	}
	*/
	@Bean
	public JsonParser mobiusJsonParser() {
		return JsonParserFactory.getJsonParser();
	}

	@Bean
	public RestTemplate mobiusRestTemplate() {
		TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

	    SSLContext sslContext = null;
		try {
			sslContext = SSLContexts.custom()
			                .loadTrustMaterial(null, acceptingTrustStrategy)
			                .build();
		} catch (KeyManagementException | NoSuchAlgorithmException | KeyStoreException e) {
			e.printStackTrace();
		}

	    SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);

	    CloseableHttpClient httpClient = HttpClients.custom()
	                    .setSSLSocketFactory(csf)
	                    .build();

	    HttpComponentsClientHttpRequestFactory requestFactory =
	                    new HttpComponentsClientHttpRequestFactory();

	    requestFactory.setHttpClient(httpClient);
	    RestTemplate restTemplate = new RestTemplate(requestFactory);
	    return restTemplate;
	}
}
