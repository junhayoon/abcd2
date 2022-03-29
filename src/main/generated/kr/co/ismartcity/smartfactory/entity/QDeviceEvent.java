package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QDeviceEvent is a Querydsl query type for DeviceEvent
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDeviceEvent extends EntityPathBase<DeviceEvent> {

    private static final long serialVersionUID = 1629984030L;

    public static final QDeviceEvent deviceEvent = new QDeviceEvent("deviceEvent");

    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);

    public final StringPath dev_serial = createString("dev_serial");

    public final StringPath event_type = createString("event_type");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath tm = createString("tm");

    public QDeviceEvent(String variable) {
        super(DeviceEvent.class, forVariable(variable));
    }

    public QDeviceEvent(Path<? extends DeviceEvent> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDeviceEvent(PathMetadata metadata) {
        super(DeviceEvent.class, metadata);
    }

}

