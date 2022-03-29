package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCodeMaster is a Querydsl query type for CodeMaster
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCodeMaster extends EntityPathBase<CodeMaster> {

    private static final long serialVersionUID = -2115705803L;

    public static final QCodeMaster codeMaster = new QCodeMaster("codeMaster");

    public final StringPath cd = createString("cd");

    public final NumberPath<Long> cd_order = createNumber("cd_order", Long.class);

    public final StringPath cdNm = createString("cdNm");

    public QCodeMaster(String variable) {
        super(CodeMaster.class, forVariable(variable));
    }

    public QCodeMaster(Path<? extends CodeMaster> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCodeMaster(PathMetadata metadata) {
        super(CodeMaster.class, metadata);
    }

}

