package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUticImsOpen is a Querydsl query type for UticImsOpen
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUticImsOpen extends EntityPathBase<UticImsOpen> {

    private static final long serialVersionUID = 1319095226L;

    public static final QUticImsOpen uticImsOpen = new QUticImsOpen("uticImsOpen");

    public final StringPath address_jibun = createString("address_jibun");

    public final StringPath address_jibun_cd = createString("address_jibun_cd");

    public final StringPath address_new = createString("address_new");

    public final StringPath end_date = createString("end_date");

    public final StringPath incident_id = createString("incident_id");

    public final StringPath incident_region_cd = createString("incident_region_cd");

    public final StringPath incident_title = createString("incident_title");

    public final StringPath incidente_grade_cd = createString("incidente_grade_cd");

    public final StringPath incidente_sub_type_cd = createString("incidente_sub_type_cd");

    public final StringPath incidente_traffic_cd = createString("incidente_traffic_cd");

    public final StringPath incidente_type_cd = createString("incidente_type_cd");

    public final StringPath lane = createString("lane");

    public final StringPath link_id = createString("link_id");

    public final StringPath location_data = createString("location_data");

    public final NumberPath<Double> location_dataX = createNumber("location_dataX", Double.class);

    public final NumberPath<Double> location_dataY = createNumber("location_dataY", Double.class);

    public final StringPath location_type_cd = createString("location_type_cd");

    public final DateTimePath<java.time.LocalDateTime> reg_date = createDateTime("reg_date", java.time.LocalDateTime.class);

    public final StringPath road_name = createString("road_name");

    public final NumberPath<Integer> sno = createNumber("sno", Integer.class);

    public final StringPath source_code = createString("source_code");

    public final StringPath start_date = createString("start_date");

    public QUticImsOpen(String variable) {
        super(UticImsOpen.class, forVariable(variable));
    }

    public QUticImsOpen(Path<? extends UticImsOpen> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUticImsOpen(PathMetadata metadata) {
        super(UticImsOpen.class, metadata);
    }

}

