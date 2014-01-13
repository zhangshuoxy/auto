package ym.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.DocumentId;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.Store;

/*
 * 卡车信息
 */


@Entity
@Table(name="truck")

public class Truck {
	
	private int truckId;
	private String truckName;
	private float price;
	private String pictures;
	
	//参考http://product.360che.com/m47/11849_para.html
	//基本信息 
	
	private String model;
	private String type;
	private String driveType;
	private String wheelbase;
	private String length;
	private String width;
	private String height;
	private String weight;
	private String ratedLoad;
	private String maxQuality;
	private String maxSpeed;
	private String placeOfMake;
	private String tonnage;
	private String comment;
	
	//货箱参数
	private String container_length;
	private String container_width;
	private String container_height;
	private String container_style;
	
	//发动机
	private String engine_model;
	private int cylinder_num;
	private String  fuel;
	private String cylinder_type;
	private int displacement;
	private String emission;
	private String maxPower;
	private String horsepower;
	private String torque;
	private String maxTorqueSpeed;
	private String speed;
	private String engine_style;
	
	//驾驶室
	private String cabType;
	private String maxPerson;
	private String seatsRows;
	
	//变速箱
	private String gearbox_type;
	private String shiftMode;
	private String forwardGears;
	private String backGears;
	
	//底盘
	private String frontAxle;
	private String frontAxleLoad;
	private String rearAxle;
	private String reartAxleLoad;
	private String driveRatio;
	private String springNum;
	
	//轮胎
	private int tireNum;
	private String tireType;
	
	//油箱
	private String tankMaterial;
	private int  tankCapacity;
	
	
	@Id
	@Column(name="truckId",length=11)
	@GenericGenerator(name = "idGenerator", strategy = "assigned")
	@GeneratedValue(generator = "idGenerator")
	public int getTruckId() {
		return truckId;
	}
	public void setTruckId(int truckId) {
		this.truckId = truckId;
	}
	
	@Column(name="truckName",length=100)
	public String getTruckName() {
		return truckName;
	}
	public void setTruckName(String truckName) {
		this.truckName = truckName;
	}
	
	@Column(name="price")
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	
	@Column(name="pictures",length=300)
	public String getPictures() {
		return pictures;
	}
	public void setPictures(String pictures) {
		this.pictures = pictures;
	}
	@Column(name="model",length=50)
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	
	@Column(name="type",length=50)
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Column(name="driveType",length=50)
	public String getDriveType() {
		return driveType;
	}
	public void setDriveType(String driveType) {
		this.driveType = driveType;
	}
	@Column(name="wheelbase",length=10)
	public String getWheelbase() {
		return wheelbase;
	}
	public void setWheelbase(String wheelbase) {
		this.wheelbase = wheelbase;
	}
	@Column(name="length",length=10)
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	@Column(name="width",length=10)
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	@Column(name="height",length=10)
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	@Column(name="weight",length=10)
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	@Column(name="rateLoad",length=10)
	public String getRatedLoad() {
		return ratedLoad;
	}
	public void setRatedLoad(String ratedLoad) {
		this.ratedLoad = ratedLoad;
	}
	@Column(name="maxQuality",length=10)
	public String getMaxQuality() {
		return maxQuality;
	}
	public void setMaxQuality(String maxQuality) {
		this.maxQuality = maxQuality;
	}
	@Column(name="maxSpeed",length=10)
	public String getMaxSpeed() {
		return maxSpeed;
	}
	public void setMaxSpeed(String maxSpeed) {
		this.maxSpeed = maxSpeed;
	}
	@Column(name="palaceOfMake",length=10)
	public String getPlaceOfMake() {
		return placeOfMake;
	}
	public void setPlaceOfMake(String placeOfMake) {
		this.placeOfMake = placeOfMake;
	}
	
	@Column(name="tonnage",length=10)
	public String getTonnage() {
		return tonnage;
	}
	public void setTonnage(String tonnage) {
		this.tonnage = tonnage;
	}
	@Column(name="comment",length=10)
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	@Column(name="container_length",length=10)
	public String getContainer_length() {
		return container_length;
	}
	public void setContainer_length(String container_length) {
		this.container_length = container_length;
	}
	
	@Column(name="container_width",length=5)
	public String getContainer_width() {
		return container_width;
	}
	public void setContainer_width(String container_width) {
		this.container_width = container_width;
	}
	
	@Column(name="container_height",length=5)
	public String getContainer_height() {
		return container_height;
	}
	public void setContainer_height(String container_height) {
		this.container_height = container_height;
	}
	@Column(name="container_style",length=20)
	public String getContainer_style() {
		return container_style;
	}
	public void setContainer_style(String container_style) {
		this.container_style = container_style;
	}
	@Column(name="engine_model",length=5)
	public String getEngine_model() {
		return engine_model;
	}
	public void setEngine_model(String engine_model) {
		this.engine_model = engine_model;
	}
	
	@Column(name="cylinder_num",length=3)
	public int getCylinder_num() {
		return cylinder_num;
	}
	public void setCylinder_num(int cylinder_num) {
		this.cylinder_num = cylinder_num;
	}
	@Column(name="fule",length=25)
	public String getFuel() {
		return fuel;
	}
	public void setFuel(String fuel) {
		this.fuel = fuel;
	}
	@Column(name="cylinder_type",length=25)
	public String getCylinder_type() {
		return cylinder_type;
	}
	public void setCylinder_type(String cylinder_type) {
		this.cylinder_type = cylinder_type;
	}
	@Column(name="displacement",length=5)
	public int getDisplacement() {
		return displacement;
	}
	public void setDisplacement(int displacement) {
		this.displacement = displacement;
	}
	@Column(name="emission",length=5)
	public String getEmission() {
		return emission;
	}
	public void setEmission(String emission) {
		this.emission = emission;
	}
	@Column(name="maxPower",length=5)
	public String getMaxPower() {
		return maxPower;
	}
	public void setMaxPower(String maxPower) {
		this.maxPower = maxPower;
	}
	@Column(name="horsepower",length=5)
	public String getHorsepower() {
		return horsepower;
	}
	public void setHorsepower(String horsepower) {
		this.horsepower = horsepower;
	}
	@Column(name="torque",length=15)
	public String getTorque() {
		return torque;
	}
	public void setTorque(String torque) {
		this.torque = torque;
	}
	@Column(name="maxTorqueSpeed",length=15)
	public String getMaxTorqueSpeed() {
		return maxTorqueSpeed;
	}
	public void setMaxTorqueSpeed(String maxTorqueSpeed) {
		this.maxTorqueSpeed = maxTorqueSpeed;
	}
	@Column(name="speed",length=20)
	public String getSpeed() {
		return speed;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	
	@Column(name="engine_style",length=25)
	public String getEngine_style() {
		return engine_style;
	}
	public void setEngine_style(String engine_style) {
		this.engine_style = engine_style;
	}
	@Column(name="cabType",length=20)
	public String getCabType() {
		return cabType;
	}
	public void setCabType(String cabType) {
		this.cabType = cabType;
	}
	
	@Column(name="maxPerson",length=3)
	public String getMaxPerson() {
		return maxPerson;
	}
	public void setMaxPerson(String maxPerson) {
		this.maxPerson = maxPerson;
	}
	@Column(name="seatsRows",length=2)
	public String getSeatsRows() {
		return seatsRows;
	}
	public void setSeatsRows(String seatsRows) {
		this.seatsRows = seatsRows;
	}
	@Column(name="gearbox_type",length=15)
	public String getGearbox_type() {
		return gearbox_type;
	}
	public void setGearbox_type(String gearbox_type) {
		this.gearbox_type = gearbox_type;
	}
	@Column(name="shiftMode",length=15)
	public String getShiftMode() {
		return shiftMode;
	}
	public void setShiftMode(String shiftMode) {
		this.shiftMode = shiftMode;
	}
	
	@Column(name="forwardGears",length=5)
	public String getForwardGears() {
		return forwardGears;
	}
	public void setForwardGears(String forwardGears) {
		this.forwardGears = forwardGears;
	}
	@Column(name="backGears",length=5)
	public String getBackGears() {
		return backGears;
	}
	public void setBackGears(String backGears) {
		this.backGears = backGears;
	}
	@Column(name="frontAxle",length=50)
	public String getFrontAxle() {
		return frontAxle;
	}
	public void setFrontAxle(String frontAxle) {
		this.frontAxle = frontAxle;
	}
	
	@Column(name="frontAxleLoad",length=20)
	public String getFrontAxleLoad() {
		return frontAxleLoad;
	}
	public void setFrontAxleLoad(String frontAxleLoad) {
		this.frontAxleLoad = frontAxleLoad;
	}
	
	@Column(name="rearAxle",length=50)
	public String getRearAxle() {
		return rearAxle;
	}
	public void setRearAxle(String rearAxle) {
		this.rearAxle = rearAxle;
	}
	
	@Column(name="rearAxleLoad",length=20)
	public String getReartAxleLoad() {
		return reartAxleLoad;
	}
	public void setReartAxleLoad(String reartAxleLoad) {
		this.reartAxleLoad = reartAxleLoad;
	}
	@Column(name="driveRation",length=5)
	public String getDriveRatio() {
		return driveRatio;
	}
	public void setDriveRatio(String driveRatio) {
		this.driveRatio = driveRatio;
	}
	@Column(name="springNum",length=3)
	public String getSpringNum() {
		return springNum;
	}
	public void setSpringNum(String springNum) {
		this.springNum = springNum;
	}
	@Column(name="tireNum",length=3)
	public int getTireNum() {
		return tireNum;
	}
	public void setTireNum(int tireNum) {
		this.tireNum = tireNum;
	}
	@Column(name="tireType",length=10)
	public String getTireType() {
		return tireType;
	}
	public void setTireType(String tireType) {
		this.tireType = tireType;
	}
	@Column(name="tankMaterial",length=10)
	public String getTankMaterial() {
		return tankMaterial;
	}
	public void setTankMaterial(String tankMaterial) {
		this.tankMaterial = tankMaterial;
	}
	@Column(name="tankCapacity",length=10)
	public int getTankCapacity() {
		return tankCapacity;
	}
	public void setTankCapacity(int tankCapacity) {
		this.tankCapacity = tankCapacity;
	}

	
}
