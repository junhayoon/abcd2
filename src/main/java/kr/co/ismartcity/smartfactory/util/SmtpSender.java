/**
 * 
 */
package kr.co.ismartcity.smartfactory.util;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.extern.slf4j.Slf4j;

/**
 * @author true2k
 *
 */

@Slf4j
@Configuration
@ConfigurationProperties
@PropertySource(value = {
	"classpath:/application.yaml",
	"classpath:/application-common.yaml", "classpath:/application-sub.yaml" //"classpath:/application-${spring.profiles.active}.yaml"
})
public class SmtpSender {

	@Value("${smtp.serverIp}")
	private String serverIp;

	@Value("${smtp.serverPort}")
	private String serverPort;

	@Value("${smtp.senderEmail}")
	private String senderEmail;

	@Value("${smtp.recipientEmail}")
	private String recipientEmail;

	public void sendMail(String subject, String content) throws Exception {

	    try {
			
			Session session = null;
			Properties props = new Properties(); 
 
			props.put("mail.smtp.auth", "false");
			 //Put below to false, if no https is needed
			props.put("mail.smtp.starttls.enable", "false");
			//props.put("mail.smtp.host", "irisnina.cafe24.com");
			props.put("mail.smtp.host", serverIp);
			props.put("mail.smtp.port", serverPort);
			
			session = Session.getInstance(props);

			log.debug("host:"+serverIp);
			log.debug("port:"+serverPort);
			log.debug("sender:"+senderEmail);
			log.debug("recipientEmail:"+recipientEmail);
			log.debug("subject:"+subject);
			log.debug("content:"+content);
			
			MimeMessage message = new MimeMessage(session); 
			//
			message.setFrom(new InternetAddress(senderEmail));
			String receiver[] = recipientEmail.split(",");
			for (int i=0;i<receiver.length;i++) {
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(receiver[i].trim()));
			}

			message.setSubject(subject); 
			message.setContent(content, "text/html; charset=UTF-8");
//        message.setText(text); 

			// send the message 
			Transport.send(message); 

			log.debug("mailSend Transport.send");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	log.debug("mailSend end");
	}

}
