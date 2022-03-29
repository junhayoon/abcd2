package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCode is a Querydsl query type for Code
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCode extends EntityPathBase<Code> {

    private static final long serialVersionUID = -1547710477L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCode code = new QCode("code");

    public final StringPath cd = createString("cd");

    public final NumberPath<Long> cd_order = createNumber("cd_order", Long.class);

    public final StringPath cdNm = createString("cdNm");

    public final QCodeMaster codeMaster;

    public QCode(String variable) {
        this(Code.class, forVariable(variable), INITS);
    }

    public QCode(Path<? extends Code> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCode(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCode(PathMetadata metadata, PathInits inits) {
        this(Code.class, metadata, inits);
    }

    public QCode(Class<? extends Code> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.codeMaster = inits.isInitialized("codeMaster") ? new QCodeMaster(forProperty("codeMaster")) : null;
    }

}

