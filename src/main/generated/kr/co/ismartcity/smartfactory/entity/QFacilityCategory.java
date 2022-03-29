package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFacilityCategory is a Querydsl query type for FacilityCategory
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFacilityCategory extends EntityPathBase<FacilityCategory> {

    private static final long serialVersionUID = 100697543L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFacilityCategory facilityCategory = new QFacilityCategory("facilityCategory");

    public final StringPath categoryName = createString("categoryName");

    public final StringPath categorySymbol = createString("categorySymbol");

    public final BooleanPath categorySymbolRemovable = createBoolean("categorySymbolRemovable");

    public final StringPath ccode = createString("ccode");

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final BooleanPath enabled = createBoolean("enabled");

    public final BooleanPath hasRuleSet = createBoolean("hasRuleSet");

    public final ListPath<Object, SimplePath<Object>> properties = this.<Object, SimplePath<Object>>createList("properties", Object.class, SimplePath.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public QFacilityCategory(String variable) {
        this(FacilityCategory.class, forVariable(variable), INITS);
    }

    public QFacilityCategory(Path<? extends FacilityCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFacilityCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFacilityCategory(PathMetadata metadata, PathInits inits) {
        this(FacilityCategory.class, metadata, inits);
    }

    public QFacilityCategory(Class<? extends FacilityCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

