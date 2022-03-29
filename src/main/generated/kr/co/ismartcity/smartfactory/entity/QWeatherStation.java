package kr.co.ismartcity.smartfactory.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QWeatherStation is a Querydsl query type for WeatherStation
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QWeatherStation extends EntityPathBase<WeatherStation> {

    private static final long serialVersionUID = 1785076006L;

    public static final QWeatherStation weatherStation = new QWeatherStation("weatherStation");

    public final StringPath addr = createString("addr");

    public final NumberPath<Long> code = createNumber("code", Long.class);

    public final StringPath descript = createString("descript");

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final StringPath name = createString("name");

    public QWeatherStation(String variable) {
        super(WeatherStation.class, forVariable(variable));
    }

    public QWeatherStation(Path<? extends WeatherStation> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWeatherStation(PathMetadata metadata) {
        super(WeatherStation.class, metadata);
    }

}

