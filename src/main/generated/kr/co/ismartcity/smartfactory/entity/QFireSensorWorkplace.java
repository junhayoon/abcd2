package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFireSensorWorkplace is a Querydsl query type for FireSensorWorkplace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFireSensorWorkplace extends EntityPathBase<FireSensorWorkplace> {

    private static final long serialVersionUID = 236311072L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFireSensorWorkplace fireSensorWorkplace = new QFireSensorWorkplace("fireSensorWorkplace");

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final QFacility facility;

    public final BooleanPath fireflag = createBoolean("fireflag");

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> update_date = createDateTime("update_date", java.time.LocalDateTime.class);

    public QFireSensorWorkplace(String variable) {
        this(FireSensorWorkplace.class, forVariable(variable), INITS);
    }

    public QFireSensorWorkplace(Path<? extends FireSensorWorkplace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFireSensorWorkplace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFireSensorWorkplace(PathMetadata metadata, PathInits inits) {
        this(FireSensorWorkplace.class, metadata, inits);
    }

    public QFireSensorWorkplace(Class<? extends FireSensorWorkplace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
    }

}

