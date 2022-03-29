package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAirSensorWorkplace is a Querydsl query type for AirSensorWorkplace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAirSensorWorkplace extends EntityPathBase<AirSensorWorkplace> {

    private static final long serialVersionUID = 368284376L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAirSensorWorkplace airSensorWorkplace = new QAirSensorWorkplace("airSensorWorkplace");

    public final NumberPath<Integer> alarm = createNumber("alarm", Integer.class);

    public final NumberPath<Double> altitude = createNumber("altitude", Double.class);

    public final NumberPath<Integer> astrength = createNumber("astrength", Integer.class);

    public final StringPath cmd = createString("cmd");

    public final NumberPath<Double> co2 = createNumber("co2", Double.class);

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final QFacility facility;

    public final NumberPath<Double> humi = createNumber("humi", Double.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final StringPath mobius_ip = createString("mobius_ip");

    public final NumberPath<Double> pm1 = createNumber("pm1", Double.class);

    public final NumberPath<Double> pm10 = createNumber("pm10", Double.class);

    public final NumberPath<Double> pm25 = createNumber("pm25", Double.class);

    public final StringPath range = createString("range");

    public final StringPath recv_data = createString("recv_data");

    public final NumberPath<Long> recv_seq = createNumber("recv_seq", Long.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath server_info = createString("server_info");

    public final NumberPath<Double> temp = createNumber("temp", Double.class);

    public final NumberPath<Double> tvoc = createNumber("tvoc", Double.class);

    public final NumberPath<Integer> unit = createNumber("unit", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> update_date = createDateTime("update_date", java.time.LocalDateTime.class);

    public QAirSensorWorkplace(String variable) {
        this(AirSensorWorkplace.class, forVariable(variable), INITS);
    }

    public QAirSensorWorkplace(Path<? extends AirSensorWorkplace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAirSensorWorkplace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAirSensorWorkplace(PathMetadata metadata, PathInits inits) {
        this(AirSensorWorkplace.class, metadata, inits);
    }

    public QAirSensorWorkplace(Class<? extends AirSensorWorkplace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
    }

}

