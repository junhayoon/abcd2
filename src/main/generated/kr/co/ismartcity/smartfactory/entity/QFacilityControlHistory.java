package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFacilityControlHistory is a Querydsl query type for FacilityControlHistory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFacilityControlHistory extends EntityPathBase<FacilityControlHistory> {

    private static final long serialVersionUID = -2119232896L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFacilityControlHistory facilityControlHistory = new QFacilityControlHistory("facilityControlHistory");

    public final BooleanPath autoControlled = createBoolean("autoControlled");

    public final StringPath controlType = createString("controlType");

    public final DateTimePath<java.time.LocalDateTime> create_date_time = createDateTime("create_date_time", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final QFacility facility;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QFacilityControlHistory(String variable) {
        this(FacilityControlHistory.class, forVariable(variable), INITS);
    }

    public QFacilityControlHistory(Path<? extends FacilityControlHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFacilityControlHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFacilityControlHistory(PathMetadata metadata, PathInits inits) {
        this(FacilityControlHistory.class, metadata, inits);
    }

    public QFacilityControlHistory(Class<? extends FacilityControlHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
    }

}

