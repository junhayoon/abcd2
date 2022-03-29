package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTrafficLine is a Querydsl query type for TrafficLine
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTrafficLine extends EntityPathBase<TrafficLine> {

    private static final long serialVersionUID = 1560718027L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTrafficLine trafficLine = new QTrafficLine("trafficLine");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Long> linkId = createNumber("linkId", Long.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final NumberPath<Double> speed = createNumber("speed", Double.class);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public QTrafficLine(String variable) {
        this(TrafficLine.class, forVariable(variable), INITS);
    }

    public QTrafficLine(Path<? extends TrafficLine> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTrafficLine(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTrafficLine(PathMetadata metadata, PathInits inits) {
        this(TrafficLine.class, metadata, inits);
    }

    public QTrafficLine(Class<? extends TrafficLine> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

