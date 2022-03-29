package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWorkplace is a Querydsl query type for Workplace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWorkplace extends EntityPathBase<Workplace> {

    private static final long serialVersionUID = 1073546832L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWorkplace workplace = new QWorkplace("workplace");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public final QWeatherStation weatherStation;

    public final StringPath workplaceAddr = createString("workplaceAddr");

    public final StringPath workplaceGateway = createString("workplaceGateway");

    public final StringPath workplaceName = createString("workplaceName");

    public final StringPath workplaceTel = createString("workplaceTel");

    public QWorkplace(String variable) {
        this(Workplace.class, forVariable(variable), INITS);
    }

    public QWorkplace(Path<? extends Workplace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWorkplace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWorkplace(PathMetadata metadata, PathInits inits) {
        this(Workplace.class, metadata, inits);
    }

    public QWorkplace(Class<? extends Workplace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
        this.weatherStation = inits.isInitialized("weatherStation") ? new QWeatherStation(forProperty("weatherStation")) : null;
    }

}

