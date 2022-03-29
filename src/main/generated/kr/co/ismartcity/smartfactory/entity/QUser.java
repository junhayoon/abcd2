package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1547170351L;

    public static final QUser user = new QUser("user");

    public final StringPath department = createString("department");

    public final StringPath email = createString("email");

    public final BooleanPath enabled = createBoolean("enabled");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final MapPath<String, Object, SimplePath<Object>> layouts = this.<String, Object, SimplePath<Object>>createMap("layouts", String.class, Object.class, SimplePath.class);

    public final StringPath mobilePhone = createString("mobilePhone");

    public final StringPath name = createString("name");

    public final StringPath officeFax = createString("officeFax");

    public final StringPath officePhone = createString("officePhone");

    public final StringPath organization = createString("organization");

    public final StringPath password = createString("password");

    public final SetPath<UserRole, QUserRole> roles = this.<UserRole, QUserRole>createSet("roles", UserRole.class, QUserRole.class, PathInits.DIRECT2);

    public final StringPath username = createString("username");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

