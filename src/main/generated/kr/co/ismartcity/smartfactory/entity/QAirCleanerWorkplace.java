package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAirCleanerWorkplace is a Querydsl query type for AirCleanerWorkplace
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAirCleanerWorkplace extends EntityPathBase<AirCleanerWorkplace> {

    private static final long serialVersionUID = -960411868L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAirCleanerWorkplace airCleanerWorkplace = new QAirCleanerWorkplace("airCleanerWorkplace");

    public final NumberPath<Integer> astrength = createNumber("astrength", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final QFacility facility;

    public final StringPath mobius_ip = createString("mobius_ip");

    public final StringPath mode = createString("mode");

    public final StringPath power = createString("power");

    public final StringPath recv_data = createString("recv_data");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath server_info = createString("server_info");

    public final DateTimePath<java.time.LocalDateTime> update_date = createDateTime("update_date", java.time.LocalDateTime.class);

    public QAirCleanerWorkplace(String variable) {
        this(AirCleanerWorkplace.class, forVariable(variable), INITS);
    }

    public QAirCleanerWorkplace(Path<? extends AirCleanerWorkplace> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAirCleanerWorkplace(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAirCleanerWorkplace(PathMetadata metadata, PathInits inits) {
        this(AirCleanerWorkplace.class, metadata, inits);
    }

    public QAirCleanerWorkplace(Class<? extends AirCleanerWorkplace> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.facility = inits.isInitialized("facility") ? new QFacility(forProperty("facility"), inits.get("facility")) : null;
    }

}

