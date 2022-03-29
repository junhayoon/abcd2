package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QItstraffic is a Querydsl query type for Itstraffic
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QItstraffic extends EntityPathBase<Itstraffic> {

    private static final long serialVersionUID = -1883242021L;

    public static final QItstraffic itstraffic = new QItstraffic("itstraffic");

    public final StringPath created_date = createString("created_date");

    public final NumberPath<Long> f_node_id = createNumber("f_node_id", Long.class);

    public final NumberPath<Integer> link_id = createNumber("link_id", Integer.class);

    public final StringPath link_no = createString("link_no");

    public final DateTimePath<java.time.LocalDateTime> reg_date = createDateTime("reg_date", java.time.LocalDateTime.class);

    public final StringPath road_drc_type = createString("road_drc_type");

    public final StringPath road_name = createString("road_name");

    public final NumberPath<Integer> sno = createNumber("sno", Integer.class);

    public final NumberPath<Double> speed = createNumber("speed", Double.class);

    public final NumberPath<Long> t_node_id = createNumber("t_node_id", Long.class);

    public final StringPath travel_time = createString("travel_time");

    public QItstraffic(String variable) {
        super(Itstraffic.class, forVariable(variable));
    }

    public QItstraffic(Path<? extends Itstraffic> path) {
        super(path.getType(), path.getMetadata());
    }

    public QItstraffic(PathMetadata metadata) {
        super(Itstraffic.class, metadata);
    }

}

