package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QWindSensorInfo is a Querydsl query type for WindSensorInfo
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWindSensorInfo extends EntityPathBase<WindSensorInfo> {

    private static final long serialVersionUID = 633123894L;

    public static final QWindSensorInfo windSensorInfo = new QWindSensorInfo("windSensorInfo");

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final StringPath memo = createString("memo");

    public final StringPath sensor_id = createString("sensor_id");

    public final StringPath sensor_ip = createString("sensor_ip");

    public final StringPath sensor_port = createString("sensor_port");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QWindSensorInfo(String variable) {
        super(WindSensorInfo.class, forVariable(variable));
    }

    public QWindSensorInfo(Path<? extends WindSensorInfo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWindSensorInfo(PathMetadata metadata) {
        super(WindSensorInfo.class, metadata);
    }

}

