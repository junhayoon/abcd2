package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QTrafficLineTmp is a Querydsl query type for TrafficLineTmp
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTrafficLineTmp extends EntityPathBase<TrafficLineTmp> {

    private static final long serialVersionUID = -1965119924L;

    public static final QTrafficLineTmp trafficLineTmp = new QTrafficLineTmp("trafficLineTmp");

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Integer> linkId = createNumber("linkId", Integer.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final NumberPath<Integer> odr = createNumber("odr", Integer.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath upDown = createString("upDown");

    public QTrafficLineTmp(String variable) {
        super(TrafficLineTmp.class, forVariable(variable));
    }

    public QTrafficLineTmp(Path<? extends TrafficLineTmp> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTrafficLineTmp(PathMetadata metadata) {
        super(TrafficLineTmp.class, metadata);
    }

}

