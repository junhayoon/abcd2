package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDashboardEvent is a Querydsl query type for DashboardEvent
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDashboardEvent extends EntityPathBase<DashboardEvent> {

    private static final long serialVersionUID = -223156500L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDashboardEvent dashboardEvent = new QDashboardEvent("dashboardEvent");

    public final QCode category;

    public final BooleanPath checking = createBoolean("checking");

    public final StringPath confirmMessage = createString("confirmMessage");

    public final QUser confirmUser;

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final StringPath dashFacility = createString("dashFacility");

    public final QCode event;

    public final QFacility facility;

    public final StringPath gateway = createString("gateway");

    public final QCode grade;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public QDashboardEvent(String variable) {
        this(DashboardEvent.class, forVariable(variable), INITS);
    }

    public QDashboardEvent(Path<? extends DashboardEvent> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDashboardEvent(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDashboardEvent(PathMetadata metadata, PathInits inits) {
        this(DashboardEvent.class, metadata, inits);
    }

    public QDashboardEvent(Class<? extends DashboardEvent> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new QCode(forProperty("category"), inits.get("category")) : null;
        this.confirmUser = inits.isInitialized("confirmUser") ? new QUser(forProperty("confirmUser")) : null;
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.event = inits.isInitialized("event") ? new QCode(forProperty("event"), inits.get("event")) : null;
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
        this.grade = inits.isInitialized("grade") ? new QCode(forProperty("grade"), inits.get("grade")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

