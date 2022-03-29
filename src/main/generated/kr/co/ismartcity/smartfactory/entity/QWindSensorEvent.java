package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QWindSensorEvent is a Querydsl query type for WindSensorEvent
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWindSensorEvent extends EntityPathBase<WindSensorEvent> {

    private static final long serialVersionUID = -1851452398L;

    public static final QWindSensorEvent windSensorEvent = new QWindSensorEvent("windSensorEvent");

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final StringPath device_ip = createString("device_ip");

    public final NumberPath<Integer> device_port = createNumber("device_port", Integer.class);

    public final StringPath recv_data = createString("recv_data");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final NumberPath<Double> wind_direction = createNumber("wind_direction", Double.class);

    public final NumberPath<Double> wind_speed = createNumber("wind_speed", Double.class);

    public QWindSensorEvent(String variable) {
        super(WindSensorEvent.class, forVariable(variable));
    }

    public QWindSensorEvent(Path<? extends WindSensorEvent> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWindSensorEvent(PathMetadata metadata) {
        super(WindSensorEvent.class, metadata);
    }

}

