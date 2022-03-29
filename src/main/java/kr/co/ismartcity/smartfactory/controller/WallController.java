package kr.co.ismartcity.smartfactory.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.nio.Buffer;
import java.nio.ByteOrder;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ismartcity.smartfactory.entity.FreeSetLine;
import lombok.Data;

@Data
@RestController
@EnableConfigurationProperties
public class WallController {

	String ip = "172.16.1.100";
	int port = 8882;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/wallFreeSetInfo")
	public List<HashMap<String, String>> getWallFreeSetInfo(Principal principal, HttpServletResponse response) throws IOException {
		if(principal != null) {
			List<HashMap<String, String>> freeSetInfo = new ArrayList<HashMap<String, String>>();
			Socket socket = null;
			try {
				socket = new Socket(ip, port);
				
				byte[] send_data = new byte[8];
				int cmd = 0x203;
				int dataSize = 0;
						
				ByteBuffer buff = ByteBuffer.allocate(Integer.SIZE/8);
				buff.order(ByteOrder.LITTLE_ENDIAN);
						
				buff.putInt(cmd);
				System.arraycopy(buff.array(), 0, send_data, 0, buff.array().length);
					
				((Buffer) buff).clear();
				buff.putInt(dataSize);
				System.arraycopy(buff.array(), 0, send_data, 4, buff.array().length);
						
				OutputStream out = socket.getOutputStream();
				out.write(send_data);
				
				InputStream in = socket.getInputStream();
				byte[] cd = new byte[4];
				in.read(cd);
						
				byte[] ds = new byte[4];
				in.read(ds);
					
				int presetCount = ByteArrayToInt(ds);
				System.out.println(presetCount);
				
				presetCount = (presetCount - 4)/256;  
				//Data size에 result 값이 포함되기 때문에 4를 뺍니다.
				//하나의 프리셋에 256 바이트 정보가 오기 때문에 256로 나누어주면 창의 개수가 나옵니다.
						
				byte[] result = new byte[4];
				in.read(result);
						
				String hex = ByteArrayToHex(cd);
				hex = ByteArrayToHex(ds);
				hex = ByteArrayToHex(result);
				
				byte[] presetName = new byte[256];
				
				for(int i = 0; i<presetCount;i++)
				{
					HashMap<String, String> m = new HashMap<String, String>();
					in.read(presetName);
					m.put("preseName", new String(presetName, "UTF-8"));
					freeSetInfo.add(m);
				}
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				socket.close();
			}
			return freeSetInfo;
		} 
		return null;
	}
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping("/api/WallFreeSetAction")
	public List<FreeSetLine> setWallFreeSetAction(Principal principal, @RequestParam(required=true, value="presetName") String presetName,
																 HttpServletResponse response) throws IOException {
		if(principal != null) {
			Socket socket = null;
			try {
				socket = new Socket(ip, port);
				byte[] send_data = new byte[264];
				int cmd = 0x211;
				int dataSize = 256;
				byte[] temp = presetName.getBytes("UTF-8"); 
				
				ByteBuffer buff = ByteBuffer.allocate(Integer.SIZE/8);
				buff.order(ByteOrder.LITTLE_ENDIAN);
				
				buff.putInt(cmd);
				System.arraycopy(buff.array(), 0, send_data, 0, buff.array().length);
						
				((Buffer) buff).clear();
				buff.putInt(dataSize);
				System.arraycopy(buff.array(), 0, send_data, 4, buff.array().length);
						
				System.arraycopy(temp, 0, send_data, 8, temp.length);
					
				OutputStream out = socket.getOutputStream();
				out.write(send_data);
				
				InputStream in = socket.getInputStream();
				
				byte[] cd = new byte[4];
				in.read(cd);
				byte[] ds = new byte[4];
				in.read(ds);		
				byte[] result = new byte[4];
				in.read(result);

				String hex = ByteArrayToHex(cd);
				hex = ByteArrayToHex(ds);
				hex = ByteArrayToHex(result);
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				socket.close();
			}
		}
		return null;
	}
	
	public String ByteArrayToHex(byte[] a)
	{
		StringBuilder sb=new StringBuilder();
		for(byte b: a)
		{
			sb.append(String.format("%02x" , b&0xff));
		}
		return sb.toString();
	}
	
	public int ByteArrayToInt(byte[] bytes) {
		ByteBuffer buff = ByteBuffer.allocate(Integer.SIZE/8);
		buff.order(ByteOrder.LITTLE_ENDIAN);
		buff.put(bytes);
		buff.flip();
		return buff.getInt();
	}
}
