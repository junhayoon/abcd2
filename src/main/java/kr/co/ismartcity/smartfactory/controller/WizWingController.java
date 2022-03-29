package kr.co.ismartcity.smartfactory.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ismartcity.smartfactory.entity.DronStation;
import kr.co.ismartcity.smartfactory.service.DronStationService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class WizWingController {

	// 버퍼 사이즈 설정
	private final static int BUFFER_SIZE = 1024;

	@Autowired
	public DronStationService dronStationService;

	static ServerSocket server = null;
	static ExecutorService receiver = null;
	//static String serverIP = "192.168.10.102";
	//static int serverPort = 2000;

	//gcs 소켓
	static String serverIP = "172.16.1.101";
	static int serverPort = 9999;

	//테스트
//	static String serverIP = "192.168.74.1";
//	static int serverPort = 9999;

	private PrintWriter pw;

	@PostConstruct
	public void getWizWingInit() {
		// 서버 인스턴스 생성 (프로그램이 종료 될때 자동 close)

		try {
			server = new ServerSocket(9999);

			// 9999 포트에 서버를 대기 시킨다.
			//InetSocketAddress ipep = new InetSocketAddress("172.16.1.75", 8282);
			// 서버 인스턴스에 소켓 정보 bind
			//server.bind(ipep);
			// 콘솔 출력
			log.debug("WizWing ServerSocket Initialize complete");
			// 클라이언트로 부터 메시지를 대기하는 스래드 풀
			receiver = Executors.newCachedThreadPool();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@PreDestroy
	public void getWizWingDestroy() {
		try {

			if(server != null) {
				server.close();
				server = null;
				log.debug("WizWing ServerSocket Destroy complete");
			}

			if(receiver != null) {
				//receiver.shutdown();
				receiver.shutdownNow();
				receiver = null;
				log.debug("WizWing receiver shutdown complete");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 실행 함수
		@PreAuthorize("isAuthenticated()")
		@GetMapping("/api/wizWingData")
		public void getWizWingData(Principal principal) {

			try {
				// 서버는 무한 대기
				while (true) {

					if (server == null || server.isClosed()) {

						break;

//						log.debug("WizWing Socket serveris closed. retry after 5 second. server:"+ server);
//						try {
//							Thread.sleep(5000);
//							//log.debug("WizWing Socket server is closed. 5 second sleep end. server:"+ server);
//						} catch (Exception e) {
//							// TODO Auto-generated catch block
//							//e.printStackTrace();
//						}
//						continue;
					}

					try {

						log.debug("WizWing new Client connected principal:" + principal.toString());

						// 클라이언트로 부터 접속 대기한다.
						Socket client = server.accept();
						// 접속 정보 콘솔 출력
						log.debug("WizWing Client connected IP address =" + client.getRemoteSocketAddress().toString());
						// 클라이언트 스래드 풀 시작
						receiver.execute(() -> {
							// client가 종료되면 소켓을 close한다.
							// OutputStream과 InputStream를 받는다.
							try (
								OutputStream send = client.getOutputStream();
								InputStream recv = client.getInputStream();
									)
							{
								log.debug("WizWing receiver Client IP address =" + client.getRemoteSocketAddress().toString());
								// 메시지 작성
								String msg = "Welcome server! 스마트시티\r\n>";
								// byte 변환
								byte[] b = msg.getBytes();
								// 클라이언트로 전송
								send.write(b);
								// 버퍼
								StringBuffer sb = new StringBuffer();
								// 메시지 대기 루프
								while (true) {
									// 버퍼 생성
									b = new byte[BUFFER_SIZE];
									// 메시지를 받는다.
									recv.read(b, 0, b.length);
									// byte를 String으로 변환
									msg = new String(b);

									try {
										ObjectMapper mapper = new ObjectMapper();
										DronStation dron = mapper.readValue(msg, DronStation.class);
										dronStationService.addDronStation(dron);
									}catch(Throwable e) {
										continue;
									}



//									DronStation dron = new DronStation();
//									String[] colSplit = msg.split(",");
//									for(int i=0; i < colSplit.length; i++) {
//										int idx = colSplit[i].indexOf(":");
//										if(colSplit[i].indexOf("lat") > -1) {
//											dron.setLat(Double.parseDouble(colSplit[i].substring(idx+1)));
//										} else if(colSplit[i].indexOf("lng") > -1) {
//											dron.setLng(Double.parseDouble(colSplit[i].substring(idx+1)));
//										} else if(colSplit[i].indexOf("alt") > -1) {
//											dron.setAlt(Double.parseDouble(colSplit[i].substring(idx+1)));
//										} else if(colSplit[i].indexOf("roll") > -1) {
//											dron.setRoll(Double.parseDouble(colSplit[i].substring(idx+1)));
//										} else if(colSplit[i].indexOf("pitch") > -1) {
//											dron.setPitch(colSplit[i].substring(idx+1));
//										} else if(colSplit[i].indexOf("yaw") > -1) {
//											dron.setYaw(Double.parseDouble(colSplit[i].substring(idx+1)));
//										} else if(colSplit[i].indexOf("hs") > -1) {
//											dron.setHs(colSplit[i].substring(idx+1));
//										} else if(colSplit[i].indexOf("vs") > -1) {
//											dron.setVs(colSplit[i].substring(idx+1));
//										} else if(colSplit[i].indexOf("vol") > -1) {
//											dron.setVol(colSplit[i].substring(idx+1));
//										} else if(colSplit[i].indexOf("cur") > -1) {
//											dron.setCur(colSplit[i].substring(idx+1));
//										} else if(colSplit[i].indexOf("ftime") > -1) {
//											dron.setFtime(colSplit[i].substring(idx+1).trim());
//										}
//									}
//
//									log.debug("WizWing ************** dron : " + dron);
//
//									dronStationService.addDronStation(dron);
//									// 버퍼 비우기
//									sb.setLength(0);
//									// 메시지 콘솔 출력

									// exit 메시지일 경우 메시지 대기 루프를 종료한다.
									if ("exit\r\n".equals(msg)) {
										break;
									}
								}
								send.close();
								recv.close();
							} catch (Throwable e) {
								// 에러 발생시 콘솔 출력
								e.printStackTrace();
							} finally {
								try {
									if(client != null) {
										client.close();
									}
								} catch (Throwable e) {
									// 에러 발생시 콘솔 출력
									e.printStackTrace();
								}
								// 접속이 종료되면 접속 정보를 콘솔 출력
								log.debug("WizWing Client disconnected IP address =" + client.getRemoteSocketAddress().toString());
							}
							try {
								if(client != null) {
									client.close();
								}
							} catch (Throwable e) {
								// 에러 발생시 콘솔 출력
								e.printStackTrace();
							}
						});
					} catch (Throwable e) {
						// 에러 발생시 콘솔 출력
						if (server == null || server.isClosed()) {
							log.debug("Maybe WizWing server is Stopped. server:" + server);
						} else {
							e.printStackTrace();
						}
					}
				}
			} catch (Throwable e) {
				// 에러 발생시 콘솔 출력
				e.printStackTrace();
			} finally {

			}
		}

	// 실행 함수
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/wizWingPTZControl")
	public void wizWingPTZControl(Principal principal, @RequestParam(required=true, value="HexaCode") String hexaCode) {
		try {
			@SuppressWarnings("resource")
			Socket clientSend = new Socket(serverIP, serverPort);
			try {
				OutputStream sendWrite = clientSend.getOutputStream();
				byte[] sendPacket = new byte[24];
				sendPacket = hexaCode.getBytes();

				sendWrite.write(sendPacket);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}



	@PostMapping("/api/wizWingPosSend")
	public void wizWingPosSend(Principal principal, @RequestBody Map<String, Object> dronPos) {
		try {
			//@SuppressWarnings("resource")
			Socket clientSend = new Socket(serverIP, serverPort);
			try {
				JSONObject jsonObject =  new JSONObject(dronPos);
				ObjectMapper mapper = new ObjectMapper();

				pw = new PrintWriter(clientSend.getOutputStream());
				String jsonSend = mapper.writeValueAsString(jsonObject);

				log.debug("@@@@@@@@@222 : " + jsonSend);

				//메시지 발송
				pw.println(jsonSend);
				pw.flush();

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
