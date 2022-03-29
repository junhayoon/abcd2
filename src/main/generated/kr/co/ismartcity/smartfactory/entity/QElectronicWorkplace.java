package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QElectronicWorkplace is a Querydsl query type for ElectronicWorkplace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QElectronicWorkplace extends EntityPathBase<ElectronicWorkplace> {

    private static final long serialVersionUID = -1169555788L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QElectronicWorkplace electronicWorkplace = new QElectronicWorkplace("electronicWorkplace");

    public final NumberPath<Double> a = createNumber("a", Double.class);

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final StringPath date = createString("date");

    public final NumberPath<Integer> eventAlert = createNumber("eventAlert", Integer.class);

    public final StringPath extSensor1 = createString("extSensor1");

    public final StringPath extSensor2 = createString("extSensor2");

    public final QFacility facility;

    public final NumberPath<Double> hz = createNumber("hz", Double.class);

    public final StringPath id = createString("id");

    public final NumberPath<Double> igc = createNumber("igc", Double.class);

    public final NumberPath<Double> igo = createNumber("igo", Double.class);

    public final NumberPath<Double> igr = createNumber("igr", Double.class);

    public final NumberPath<Double> kwh = createNumber("kwh", Double.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Integer> leakAlert = createNumber("leakAlert", Integer.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final NumberPath<Double> om = createNumber("om", Double.class);

    public final NumberPath<Double> pf = createNumber("pf", Double.class);

    public final StringPath recv_data = createString("recv_data");

    public final NumberPath<Integer> rssi = createNumber("rssi", Integer.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath server_info = createString("server_info");

    public final DateTimePath<java.time.LocalDateTime> update_date = createDateTime("update_date", java.time.LocalDateTime.class);

    public final NumberPath<Double> v = createNumber("v", Double.class);

    public final NumberPath<Double> w = createNumber("w", Double.class);

    public QElectronicWorkplace(String variable) {
        this(ElectronicWorkplace.class, forVariable(variable), INITS);
    }

    public QElectronicWorkplace(Path<? extends ElectronicWorkplace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QElectronicWorkplace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QElectronicWorkplace(PathMetadata metadata, PathInits inits) {
        this(ElectronicWorkplace.class, metadata, inits);
    }

    public QElectronicWorkplace(Class<? extends ElectronicWorkplace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
    }

}

