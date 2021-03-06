package rw.wasac.epanet;

import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * Managing for epanet Coordinate and Junction object
 * @author Jin Igarashi
 * @version 1.0
 */
public class Coordinate {
	public String id;
	public Double lon;
	public Double lat;
	public Integer altitude;
	public Double lon_utm;
	public Double lat_utm;
	public Integer demand;
	public String pattern;
	
	/**
	 * Constructor
	 * @param id Coodinate ID
	 * @param lon Longitude. EPSG4326, 6digit
	 * @param lat Latitude. EPSG4326, 6digit
	 * @param altitude altitude. unit is meter
	 * @param lon_utm x coordinate for UTM36S
	 * @param lat_utm y coordinate for UTM36S
	 */
	public Coordinate(String id,Double lon,Double lat, Integer altitude,Double lon_utm, Double lat_utm) {
		this.id = id;
		this.lon = Util.setScale(lon,6);
		this.lat = Util.setScale(lat,6);
		this.altitude = altitude;
		this.lon_utm = Util.setScale(lon_utm,3);
		this.lat_utm = Util.setScale(lat_utm,3);
		this.demand = 0;
		this.pattern = "";
	}
	
	/**
	 * create header text for JUNCTIONS section
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public static void create_header_junction(OutputStreamWriter osw) throws IOException {
		osw.write("[JUNCTIONS]\r\n");
		osw.write(String.format(";%s\t%s\t%s\t%s\r\n", 
				Util.padding("ID", 15),
				Util.padding("Elev", 10),
				Util.padding("Demand", 10),
				Util.padding("Pattern", 10)
				));
	}
	
	/**
	 * add data of junction for JUNCTIONS section
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void add_junction(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.altitude), 10),
				Util.padding(String.valueOf(this.demand), 10),
				Util.padding(this.pattern, 10)
			));
	}
	
	/**
	 * create header text for COORDINATES section
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public static void create_header_coordinates(OutputStreamWriter osw) throws IOException {
		osw.write("[COORDINATES]\r\n");
		osw.write(String.format(";%s\t%s\t%s\r\n", 
				Util.padding("Node", 15),
				Util.padding("X-Coord", 10),
				Util.padding("Y-Coord", 10)
				));
	}
	
	/**
	 * add data of coordinate for COORDINATES section
	 * @param osw OutputStreamWriter
	 * @throws IOException IOException
	 */
	public void add_coordinate(OutputStreamWriter osw) throws IOException {
		osw.write(String.format(" %s\t%s\t%s;\r\n", 
				Util.padding(String.valueOf(this.id), 15),
				Util.padding(String.valueOf(this.lon), 10),
				Util.padding(String.valueOf(this.lat), 10)
			));
	}
}
