package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRuleSet is a Querydsl query type for RuleSet
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRuleSet extends EntityPathBase<RuleSet> {

    private static final long serialVersionUID = -761998336L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRuleSet ruleSet = new QRuleSet("ruleSet");

    public final StringPath artifactId = createString("artifactId");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath ruleContent = createString("ruleContent");

    public final StringPath ruleId = createString("ruleId");

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public final StringPath version = createString("version");

    public QRuleSet(String variable) {
        this(RuleSet.class, forVariable(variable), INITS);
    }

    public QRuleSet(Path<? extends RuleSet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRuleSet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRuleSet(PathMetadata metadata, PathInits inits) {
        this(RuleSet.class, metadata, inits);
    }

    public QRuleSet(Class<? extends RuleSet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

