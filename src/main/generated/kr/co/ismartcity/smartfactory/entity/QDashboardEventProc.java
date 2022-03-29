package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDashboardEventProc is a Querydsl query type for DashboardEventProc
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QDashboardEventProc extends EntityPathBase<DashboardEventProc> {

    private static final long serialVersionUID = -808862L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDashboardEventProc dashboardEventProc = new QDashboardEventProc("dashboardEventProc");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final QDashboardEvent event;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath procDesc = createString("procDesc");

    public final QCode process;

    public QDashboardEventProc(String variable) {
        this(DashboardEventProc.class, forVariable(variable), INITS);
    }

    public QDashboardEventProc(Path<? extends DashboardEventProc> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDashboardEventProc(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDashboardEventProc(PathMetadata metadata, PathInits inits) {
        this(DashboardEventProc.class, metadata, inits);
    }

    public QDashboardEventProc(Class<? extends DashboardEventProc> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.event = inits.isInitialized("event") ? new QDashboardEvent(forProperty("event"), inits.get("event")) : null;
        this.process = inits.isInitialized("process") ? new QCode(forProperty("process"), inits.get("process")) : null;
    }

}

