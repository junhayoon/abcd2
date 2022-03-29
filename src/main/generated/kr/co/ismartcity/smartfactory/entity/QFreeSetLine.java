package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFreeSetLine is a Querydsl query type for FreeSetLine
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFreeSetLine extends EntityPathBase<FreeSetLine> {

    private static final long serialVersionUID = 784022180L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFreeSetLine freeSetLine = new QFreeSetLine("freeSetLine");

    public final StringPath coordinateType = createString("coordinateType");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final StringPath freeSetArea = createString("freeSetArea");

    public final StringPath freeSetNo = createString("freeSetNo");

    public final StringPath grade = createString("grade");

    public final StringPath groupNo = createString("groupNo");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final NumberPath<Integer> sortNo = createNumber("sortNo", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public final StringPath useYn = createString("useYn");

    public QFreeSetLine(String variable) {
        this(FreeSetLine.class, forVariable(variable), INITS);
    }

    public QFreeSetLine(Path<? extends FreeSetLine> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFreeSetLine(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFreeSetLine(PathMetadata metadata, PathInits inits) {
        this(FreeSetLine.class, metadata, inits);
    }

    public QFreeSetLine(Class<? extends FreeSetLine> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

