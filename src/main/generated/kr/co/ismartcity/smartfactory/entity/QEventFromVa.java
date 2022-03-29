package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QEventFromVa is a Querydsl query type for EventFromVa
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QEventFromVa extends EntityPathBase<EventFromVa> {

    private static final long serialVersionUID = -1365111191L;

    public static final QEventFromVa eventFromVa = new QEventFromVa("eventFromVa");

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final StringPath ezn = createString("ezn");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath obj = createString("obj");

    public final StringPath recv_data = createString("recv_data");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath stat = createString("stat");

    public final StringPath tm = createString("tm");

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> update_date = createDateTime("update_date", java.time.LocalDateTime.class);

    public final NumberPath<Integer> vaId = createNumber("vaId", Integer.class);

    public QEventFromVa(String variable) {
        super(EventFromVa.class, forVariable(variable));
    }

    public QEventFromVa(Path<? extends EventFromVa> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEventFromVa(PathMetadata metadata) {
        super(EventFromVa.class, metadata);
    }

}

