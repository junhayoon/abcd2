package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVmsTokens is a Querydsl query type for VmsTokens
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QVmsTokens extends EntityPathBase<VmsTokens> {

    private static final long serialVersionUID = -376535280L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVmsTokens vmsTokens = new QVmsTokens("vmsTokens");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final StringPath inodepApiSerial = createString("inodepApiSerial");

    public final StringPath inodepAuthToken = createString("inodepAuthToken");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public final StringPath vmsId = createString("vmsId");

    public QVmsTokens(String variable) {
        this(VmsTokens.class, forVariable(variable), INITS);
    }

    public QVmsTokens(Path<? extends VmsTokens> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVmsTokens(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVmsTokens(PathMetadata metadata, PathInits inits) {
        this(VmsTokens.class, metadata, inits);
    }

    public QVmsTokens(Class<? extends VmsTokens> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

