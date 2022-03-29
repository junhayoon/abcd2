package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPollutionStandard is a Querydsl query type for PollutionStandard
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPollutionStandard extends EntityPathBase<PollutionStandard> {

    private static final long serialVersionUID = -29324991L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPollutionStandard pollutionStandard = new QPollutionStandard("pollutionStandard");

    public final NumberPath<Double> co2High = createNumber("co2High", Double.class);

    public final NumberPath<Double> co2Low = createNumber("co2Low", Double.class);

    public final NumberPath<Double> co2Middle = createNumber("co2Middle", Double.class);

    public final NumberPath<Double> coHigh = createNumber("coHigh", Double.class);

    public final NumberPath<Double> coLow = createNumber("coLow", Double.class);

    public final NumberPath<Double> coMiddle = createNumber("coMiddle", Double.class);

    public final DateTimePath<java.time.LocalDateTime> createDateTime = createDateTime("createDateTime", java.time.LocalDateTime.class);

    public final QUser createUser;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Double> no2High = createNumber("no2High", Double.class);

    public final NumberPath<Double> no2Low = createNumber("no2Low", Double.class);

    public final NumberPath<Double> no2Middle = createNumber("no2Middle", Double.class);

    public final NumberPath<Double> o3High = createNumber("o3High", Double.class);

    public final NumberPath<Double> o3Low = createNumber("o3Low", Double.class);

    public final NumberPath<Double> o3Middle = createNumber("o3Middle", Double.class);

    public final NumberPath<Double> pm10High = createNumber("pm10High", Double.class);

    public final NumberPath<Double> pm10Low = createNumber("pm10Low", Double.class);

    public final NumberPath<Double> pm10Middle = createNumber("pm10Middle", Double.class);

    public final NumberPath<Double> pm1High = createNumber("pm1High", Double.class);

    public final NumberPath<Double> pm1Low = createNumber("pm1Low", Double.class);

    public final NumberPath<Double> pm1Middle = createNumber("pm1Middle", Double.class);

    public final NumberPath<Double> pm25High = createNumber("pm25High", Double.class);

    public final NumberPath<Double> pm25Low = createNumber("pm25Low", Double.class);

    public final NumberPath<Double> pm25Middle = createNumber("pm25Middle", Double.class);

    public final NumberPath<Double> so2High = createNumber("so2High", Double.class);

    public final NumberPath<Double> so2Low = createNumber("so2Low", Double.class);

    public final NumberPath<Double> so2Middle = createNumber("so2Middle", Double.class);

    public final NumberPath<Double> tvocHigh = createNumber("tvocHigh", Double.class);

    public final NumberPath<Double> tvocLow = createNumber("tvocLow", Double.class);

    public final NumberPath<Double> tvocMiddle = createNumber("tvocMiddle", Double.class);

    public final DateTimePath<java.time.LocalDateTime> updateDateTime = createDateTime("updateDateTime", java.time.LocalDateTime.class);

    public final QUser updateUser;

    public QPollutionStandard(String variable) {
        this(PollutionStandard.class, forVariable(variable), INITS);
    }

    public QPollutionStandard(Path<? extends PollutionStandard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPollutionStandard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPollutionStandard(PathMetadata metadata, PathInits inits) {
        this(PollutionStandard.class, metadata, inits);
    }

    public QPollutionStandard(Class<? extends PollutionStandard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createUser = inits.isInitialized("createUser") ? new QUser(forProperty("createUser")) : null;
        this.updateUser = inits.isInitialized("updateUser") ? new QUser(forProperty("updateUser")) : null;
    }

}

