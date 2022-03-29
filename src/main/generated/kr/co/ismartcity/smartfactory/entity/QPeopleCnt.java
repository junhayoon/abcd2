package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QPeopleCnt is a Querydsl query type for PeopleCnt
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPeopleCnt extends EntityPathBase<PeopleCnt> {

    private static final long serialVersionUID = -1930704364L;

    public static final QPeopleCnt peopleCnt = new QPeopleCnt("peopleCnt");

    public final StringPath camId = createString("camId");

    public final DateTimePath<java.time.LocalDateTime> create_date = createDateTime("create_date", java.time.LocalDateTime.class);

    public final StringPath inOut = createString("inOut");

    public final NumberPath<Long> inpMs = createNumber("inpMs", Long.class);

    public final DateTimePath<java.time.LocalDateTime> inpTm = createDateTime("inpTm", java.time.LocalDateTime.class);

    public final NumberPath<Long> lineNo = createNumber("lineNo", Long.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath server_info = createString("server_info");

    public final NumberPath<Long> totCnt = createNumber("totCnt", Long.class);

    public QPeopleCnt(String variable) {
        super(PeopleCnt.class, forVariable(variable));
    }

    public QPeopleCnt(Path<? extends PeopleCnt> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPeopleCnt(PathMetadata metadata) {
        super(PeopleCnt.class, metadata);
    }

}

