package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFacility is a Querydsl query type for Facility
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFacility extends EntityPathBase<Facility> {

    private static final long serialVersionUID = 1885543849L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFacility facility = new QFacility("facility");

    public final StringPath addr = createString("addr");

    public final BooleanPath autoControl = createBoolean("autoControl");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final BooleanPath enabled = createBoolean("enabled");

    public final QFacilityCategory facilityCategory;

    public final StringPath facilityName = createString("facilityName");

    public final StringPath fcode = createString("fcode");

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final StringPath mobiusId = createString("mobiusId");

    public final MapPath<String, Object, SimplePath<Object>> properties = this.<String, Object, SimplePath<Object>>createMap("properties", String.class, Object.class, SimplePath.class);

    public final BooleanPath revData = createBoolean("revData");

    public final EnumPath<kr.co.ismartcity.smartfactory.model.FacilityStatus> status = createEnum("status", kr.co.ismartcity.smartfactory.model.FacilityStatus.class);

    public final StringPath syscategoryCd = createString("syscategoryCd");

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public final QWorkplace workplace;

    public QFacility(String variable) {
        this(Facility.class, forVariable(variable), INITS);
    }

    public QFacility(Path<? extends Facility> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFacility(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFacility(PathMetadata metadata, PathInits inits) {
        this(Facility.class, metadata, inits);
    }

    public QFacility(Class<? extends Facility> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.facilityCategory = inits.isInitialized("facilityCategory") ? new QFacilityCategory(forProperty("facilityCategory"), inits.get("facilityCategory")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
        this.workplace = inits.isInitialized("workplace") ? new QWorkplace(forProperty("workplace"), inits.get("workplace")) : null;
    }

}

