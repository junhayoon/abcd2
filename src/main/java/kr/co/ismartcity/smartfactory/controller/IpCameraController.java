package kr.co.ismartcity.smartfactory.controller;

import java.security.Principal;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.onvif.ver10.schema.PTZStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.onvif.soap.OnvifDevice;
import de.onvif.soap.devices.PtzDevices;
import kr.co.ismartcity.smartfactory.service.MessageSourceService;
import kr.co.ismartcity.smartfactory.service.NotificationService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RestController
@EnableConfigurationProperties
public class IpCameraController {
	
	@Autowired
	NotificationService notiService;
	
    @Autowired
    MessageSourceService messageSourceService;
    
    private static String cameraPort 	= "8080";
    private static String user			= "admin";
    private static String password		= "admin";
    
    private static HashMap<String, OnvifDevice> listOnvif = new HashMap<String, OnvifDevice>();
	
	
    @Secured("ROLE_ADMIN")
    @GetMapping("/api/camera/move")
	public void moveCamera(Principal principal, @RequestParam(required=true, value="ip") String ip,
															@RequestParam(required=false, value="up", defaultValue="false") boolean up,
															@RequestParam(required=false, value="down", defaultValue="false") boolean down,
															@RequestParam(required=false, value="left", defaultValue="false") boolean left,
															@RequestParam(required=false, value="right", defaultValue="false") boolean right,
															@RequestParam(required=false, value="velocity", defaultValue="1") int velocity,
															HttpServletResponse response) {
    	moveCamera(ip, up, down, left, right, velocity, true);
	}
    
    @Secured("ROLE_ADMIN")
   	@GetMapping("/api/camera/moveContinuously")
   	public void moveCameraContinuingly(Principal principal, @RequestParam(required=true, value="ip") String ip,
   															@RequestParam(required=false, value="up", defaultValue="false") boolean up,
   															@RequestParam(required=false, value="down", defaultValue="false") boolean down,
   															@RequestParam(required=false, value="left", defaultValue="false") boolean left,
   															@RequestParam(required=false, value="right", defaultValue="false") boolean right,
   															@RequestParam(required=false, value="velocity", defaultValue="1") int velocity,
   															HttpServletResponse response) {
       	moveCamera(ip, up, down, left, right, velocity, false);
   	}
    
    @Secured("ROLE_ADMIN")
    @GetMapping("/api/camera/zoom")
	public void zoomCamera(Principal principal, @RequestParam(required=true, value="ip") String ip,
															@RequestParam(required=false, value="zoomIn", defaultValue="true") boolean zoomIn,
															@RequestParam(required=false, value="velocity", defaultValue="1") int velocity,
															HttpServletResponse response) {
    	zoomCamera(ip, zoomIn, velocity, true);		
	}
    
   
       
    @Secured("ROLE_ADMIN")
    @GetMapping("/api/camera/zoomContinuously")
   	public void zoomCameraContinuously(Principal principal, @RequestParam(required=true, value="ip") String ip,
   															@RequestParam(required=false, value="zoomIn", defaultValue="true") boolean zoomIn,
   															@RequestParam(required=false, value="velocity", defaultValue="1") int velocity,
   															HttpServletResponse response) {
       	zoomCamera(ip, zoomIn, velocity, false);   		
   	}
    
    @Secured("ROLE_ADMIN")
    @GetMapping("/api/camera/stop")
	public void stopCamera(Principal principal, @RequestParam(required=true, value="ip") String ip,	HttpServletResponse response) {		
    	stopCamera(ip);
	}
		
	public void moveCamera(String ip, boolean up, boolean down, boolean left, boolean right, int velocity, boolean autostop) {
		log.debug(String.format("moveCamera() 1... ip(%s) up(%b) down(%b) left(%b) right(%b) velocity(%d) autostop(%b)", ip, up, down, left, right, velocity, autostop));
		
		boolean ret = false;
		if (ip != null) {
			OnvifDevice cam = connectCamera(ip);
			
			try {
				PtzDevices ptz = cam.getPtz();
				String profileToken = cam.getProfileToken();

		        //if (ptz.isContinuosMoveSupported(profileToken))
		        {
		        	//PTZStatus ptzStatus = ptz.getStatus(profileToken);
		        	
		        	float movePan = 0;
		        	float moveTilt = 0;

		        	//pan 짐벌 : 좌우, tilt 카메라 : 상하
		        	if (up) {
		        		//ret = ptz.continuousMove(profileToken, 0, 1, 0);
		        		moveTilt += 0.1f * velocity;
		        	}
		        	if (down) {
		        		//ret = ptz.continuousMove(profileToken, 0, -1, 0);
		        		moveTilt += -0.1f * velocity;		        		
		        	}
		        	if (left) {
		        		//ret = ptz.continuousMove(profileToken, -1, 0, 0);
		        		movePan += -0.1f * velocity;		        		
		        	}
		        	if (right) {
		        		//ret = ptz.continuousMove(profileToken, 1, 0, 0);
		        		movePan += 0.1f * velocity;		        		
		        	}
		        	
		        	log.debug(String.format("moveCamera() 2... ##### movePan(%f) moveTilt(%f)", movePan, moveTilt));		    		
		    		
		        	
		        	ret = ptz.continuousMove(profileToken, movePan, moveTilt, 0);
		        	
		        	if (autostop)
		        		ret = ptz.stopMove(profileToken);
		        }
		        
			} catch (Exception e) {
				e.printStackTrace();
				
				removeCamera(ip);
			}
		}
		
		log.debug(String.format("moveCamera() end... ret(%b)", ret));
	}
		
	public void zoomCamera(String ip, boolean zoomIn, int velocity, boolean autostop) {
		log.debug(String.format("zoomCamera() 1... ip(%s) zoomin(%b) velocity(%d) autostop(%b)", ip, zoomIn, velocity, autostop));
		
		boolean ret = false;
		if (ip != null) {
			OnvifDevice cam = connectCamera(ip);
			
			try {
				PtzDevices ptz = cam.getPtz();
				String profileToken = cam.getProfileToken();

		        //if (ptz.isContinuosMoveSupported(profileToken))
		        {

		        	if (zoomIn) {
		        		ret = ptz.continuousMove(profileToken, 0, 0, 0.1f * velocity);
		        	} else {
		        		ret = ptz.continuousMove(profileToken, 0, 0, -0.1f * velocity);
		        	}
		        	
		        	if (autostop)
		        		ret = ptz.stopMove(profileToken);
		        }
		        
			} catch (Exception e) {
				e.printStackTrace();
				
				removeCamera(ip);
			}
		}
		
		log.debug(String.format("zoomCamera() end... ret(%b)", ret));
	}
	
	public void stopCamera(String ip) {
//		log.debug(String.format("stopCamera() 1... ip(%s)", ip));
		
		boolean ret = false;
		if (ip != null) {
			OnvifDevice cam = connectCamera(ip);
			
			try {
				PtzDevices ptz = cam.getPtz();
				String profileToken = cam.getProfileToken();
				
				// if (ptz.isContinuosMoveSupported(profileToken)) 
		        {
		        	ret = ptz.stopMove(profileToken);		        	
		        }
		        
			} catch (Exception e) {
				e.printStackTrace();
				
				removeCamera(ip);
			}
		}
		
//		log.debug(String.format("stopCamera() end... ret(%b)", ret));		
	}
	
	public static OnvifDevice connectCamera(String ip) {
		OnvifDevice cam = null;
		String cameraAddress = null;
		try {
			if (ip != null) {
				cam = listOnvif.get(ip);
				if (cam == null) {
//					List<Profile> profiles = cam.getDevices().getProfiles();
//			        String profileToken = profiles.get(0).getToken();        
//					PtzDevices ptz = cam.getPtz();

					cameraAddress = ip + ":" + cameraPort;				
					cam = new OnvifDevice(cameraAddress, user, password);
					
					listOnvif.put(ip, cam);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			
			removeCamera(ip);
		}

		log.debug(String.format("connectCamera() end... cam(%s)", cam));
		
		return cam;
	}
	
	public static void removeCamera(String ip) {
		OnvifDevice cam = null;
		try {
			if (ip != null) {
				cam = listOnvif.remove(ip);				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		log.debug(String.format("removeCamera() end... cam(%s)", cam));
	}
	
	public void test_controlCamera(String ip, boolean up, boolean down, boolean left, boolean right, boolean zoomIn, boolean zoomOut) {
		
		if (ip != null) {
			OnvifDevice cam = connectCamera(ip);
			PtzDevices ptz = cam.getPtz();
			
			try {
				String profileToken = "MediaProfile000";
				boolean ret = false;
		        if (ptz.isContinuosMoveSupported(profileToken)) {
		        	PTZStatus ptzStatus = ptz.getStatus(profileToken);

		        	//pan 짐벌 : 좌우, tilt 카메라 : 상하
//		        	if (up) {
//		        		ret = ptz.continuousMove(profileToken, ptzStatus.getPosition().getPanTilt().getX(), 1, ptzStatus.getPosition().getZoom().getX());
//		        	} else if (down) {
//		        		ret = ptz.continuousMove(profileToken, ptzStatus.getPosition().getPanTilt().getX(), -1, ptzStatus.getPosition().getZoom().getX());
//		        	} else if (left) {
//		        		ret = ptz.continuousMove(profileToken, 1, ptzStatus.getPosition().getPanTilt().getY(), ptzStatus.getPosition().getZoom().getX());
//		        	} else {
//		        		ret = ptz.continuousMove(profileToken, -1, ptzStatus.getPosition().getPanTilt().getY(), ptzStatus.getPosition().getZoom().getX());
//		        	}	  
		        	
		        	if (up) {
		        		ret = ptz.continuousMove(profileToken, 0, 1, 0);
		        	} else if (down) {
		        		ret = ptz.continuousMove(profileToken, 0, -1, 0);
		        	} else if (left) {
		        		ret = ptz.continuousMove(profileToken, -1, 0, 0);
		        	} else if (right) {
		        		ret = ptz.continuousMove(profileToken, 1, 0, 0);
		        	} else if (zoomIn) {
		        		ret = ptz.continuousMove(profileToken, 0, 0, 1);
		        	} else {
		        		ret = ptz.continuousMove(profileToken, 0, 0, -1);
		        	}
		        	
		        	ret = ptz.stopMove(profileToken);		        
		        	System.out.println(String.format("ptz_ctrl() 3... ret(%b)", ret));
		        }
		        
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}
}
