package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGasSensorWorkplace is a Querydsl query type for GasSensorWorkplace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGasSensorWorkplace extends EntityPathBase<GasSensorWorkplace> {

    private static final long serialVersionUID = 228707689L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGasSensorWorkplace gasSensorWorkplace = new QGasSensorWorkplace("gasSensorWorkplace");

    public final NumberPath<Integer> bbc = createNumber("bbc", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final NumberPath<Integer> entrps = createNumber("entrps", Integer.class);

    public final NumberPath<Integer> error_status = createNumber("error_status", Integer.class);

    public final QFacility facility;

    public final NumberPath<Double> gas_error_delay_time = createNumber("gas_error_delay_time", Double.class);

    public final NumberPath<Integer> gas_error_status = createNumber("gas_error_status", Integer.class);

    public final NumberPath<Integer> gas_hige_set_data = createNumber("gas_hige_set_data", Integer.class);

    public final NumberPath<Float> gas_mesure = createNumber("gas_mesure", Float.class);

    public final StringPath gas_sensor = createString("gas_sensor");

    public final BooleanPath gasflag = createBoolean("gasflag");

    public final NumberPath<Integer> high_set_data = createNumber("high_set_data", Integer.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> leak_delay_time = createNumber("leak_delay_time", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final NumberPath<Integer> low_set_data = createNumber("low_set_data", Integer.class);

    public final NumberPath<Integer> mesure = createNumber("mesure", Integer.class);

    public final NumberPath<Double> open_delay_time = createNumber("open_delay_time", Double.class);

    public final NumberPath<Integer> open_set_data = createNumber("open_set_data", Integer.class);

    public final StringPath recv_data = createString("recv_data");

    public final StringPath sensor_code = createString("sensor_code");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath server_info = createString("server_info");

    public final DateTimePath<java.time.LocalDateTime> update_date = createDateTime("update_date", java.time.LocalDateTime.class);

    public final NumberPath<Float> warn_1 = createNumber("warn_1", Float.class);

    public final NumberPath<Float> warn_2 = createNumber("warn_2", Float.class);

    public final NumberPath<Double> wet_delay_time = createNumber("wet_delay_time", Double.class);

    public QGasSensorWorkplace(String variable) {
        this(GasSensorWorkplace.class, forVariable(variable), INITS);
    }

    public QGasSensorWorkplace(Path<? extends GasSensorWorkplace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGasSensorWorkplace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGasSensorWorkplace(PathMetadata metadata, PathInits inits) {
        this(GasSensorWorkplace.class, metadata, inits);
    }

    public QGasSensorWorkplace(Class<? extends GasSensorWorkplace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
    }

}

