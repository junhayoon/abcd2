package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDronStation is a Querydsl query type for DronStation
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDronStation extends EntityPathBase<DronStation> {

    private static final long serialVersionUID = -1893211967L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDronStation dronStation = new QDronStation("dronStation");

    public final NumberPath<Double> alt = createNumber("alt", Double.class);

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final StringPath cur = createString("cur");

    public final StringPath dron_gubn = createString("dron_gubn");

    public final StringPath ftime = createString("ftime");

    public final StringPath hs = createString("hs");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final NumberPath<Double> lng = createNumber("lng", Double.class);

    public final StringPath pitch = createString("pitch");

    public final NumberPath<Double> roll = createNumber("roll", Double.class);

    public final StringPath sat = createString("sat");

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public final StringPath vol = createString("vol");

    public final StringPath vs = createString("vs");

    public final NumberPath<Double> yaw = createNumber("yaw", Double.class);

    public QDronStation(String variable) {
        this(DronStation.class, forVariable(variable), INITS);
    }

    public QDronStation(Path<? extends DronStation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDronStation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDronStation(PathMetadata metadata, PathInits inits) {
        this(DronStation.class, metadata, inits);
    }

    public QDronStation(Class<? extends DronStation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

