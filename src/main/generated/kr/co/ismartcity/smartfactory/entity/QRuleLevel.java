package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRuleLevel is a Querydsl query type for RuleLevel
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRuleLevel extends EntityPathBase<RuleLevel> {

    private static final long serialVersionUID = -2142420062L;

    public static final QRuleLevel ruleLevel = new QRuleLevel("ruleLevel");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath levelId = createString("levelId");

    public final StringPath ruleId = createString("ruleId");

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final NumberPath<Float> value = createNumber("value", Float.class);

    public QRuleLevel(String variable) {
        super(RuleLevel.class, forVariable(variable));
    }

    public QRuleLevel(Path<? extends RuleLevel> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRuleLevel(PathMetadata metadata) {
        super(RuleLevel.class, metadata);
    }

}

