package ym.model;

import java.io.Serializable;

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

@Entity
@Table(name="promotion")
public class Promotion implements Serializable{
	
	/**
	 * 促销信息
	 */
	private static final long serialVersionUID = 1178960909338738214L;
	private int promotionId;
	private String title;
	private String date;
	
	

	@Id
	@GenericGenerator(name = "idGenerator", strategy = "assigned")
	@GeneratedValue(generator = "idGenerator")
	@Column(unique=true,nullable=false,name="promotionId",length=11)
	public int getPromotionId() {
		return promotionId;
	}
	
	public void setPromotionId(int promotionId) {
		this.promotionId = promotionId;
	}

	
	@Column(name="title",length=50)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name="date",length=50)
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	

}
