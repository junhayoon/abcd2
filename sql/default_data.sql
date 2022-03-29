INSERT INTO `smartfactory`.`role`(`id`,`role_id`,`role_name`)VALUES(1,'ADMIN','관리자');
INSERT INTO `smartfactory`.`role`(`id`,`role_id`,`role_name`)VALUES(2,'USER','운영자');
INSERT INTO `smartfactory`.`role`(`id`,`role_id`,`role_name`)VALUES(3,'PILOT','드론관리자');
INSERT INTO `smartfactory`.`role`(`id`,`role_id`,`role_name`)VALUES(4,'GUEST','이용자');

INSERT INTO `smartfactory`.`users`(`id`,`password`,`username`,`name`,`department`,`email`,`enabled`,`mobile_phone`,`office_fax`,`office_phone`,`organization`)
VALUES(1,'$2a$10$I48HLGoWzfvvun44vJmlzeZ9RC12djnrTXlCdcXC29s3GWoF/sNee','admin','관리자','Admin','hywoo@ismartcity.co.kr',1,'01085796339','0324585759','0324585700','Incheon SmartCity');

INSERT INTO `smartfactory`.`user_role`(`user_id`,`role_id`)VALUES(1,1);