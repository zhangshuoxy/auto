package ym.dao.impl;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ym.dao.BaseDao;



@Repository
public class BaseDaoImpl<T> implements BaseDao<T> {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Override
	public void save(T obj) {
		sessionFactory.getCurrentSession().save(obj);
		
	}

	@Override
	public void update(T obj) {
		sessionFactory.getCurrentSession().update(obj);
		
	}

	@Override
	public void delete(T obj) {
		sessionFactory.getCurrentSession().delete(obj);
		
	}

	@Override
	public T findById(Class<T> clazz, Serializable id) {
		// TODO Auto-generated method stub
		return (T) sessionFactory.getCurrentSession().get(clazz, id);
	}

	@Override
	public void deleteById(Class<T> clazz, Serializable id) {
						
		T obj=findById(clazz, id);
		if(obj!=null)
			delete(obj);
	}

	@Override
	public List findByPage(String sql, int currentPage) {
		Session session=sessionFactory.getCurrentSession();
		SQLQuery query =session.createSQLQuery(sql);
		query.setFirstResult((currentPage-1)* 10).setMaxResults(10);
		
		return query.list();
	}

	@Override
	public Map findByQueryMap(Map queryMap) {
		    
		    Map map=new HashMap();
			Session session=sessionFactory.getCurrentSession();
			String count="select count"+queryMap.get("count");
			String entity=(String) queryMap.get("entity");
			String sql =(String) queryMap.get("sql");
			boolean hasParam=(Boolean) queryMap.get("hasParam");
			
			String count_sql=count+sql+queryMap.get("group");
			String entity_sql=entity+sql+queryMap.get("group")+queryMap.get("order");
			SQLQuery sqlQueryCount=session.createSQLQuery(count_sql);
			SQLQuery sqlQueryEntity=session.createSQLQuery(entity_sql);
			
			if(hasParam){
				sqlQueryCount.setProperties((Map)queryMap.get("params"));
				sqlQueryEntity.setProperties((Map)queryMap.get("params"));
				
			}
			List countlist=sqlQueryCount.list();
			int allCount=0;
			if(countlist!=null&&countlist.size()!=0)
			  allCount=((BigInteger) countlist.get(0)).intValue();
			int maxPage=(allCount %10 == 0) ? allCount/10 : allCount/10+1;
			
			int currentPage=(Integer) queryMap.get("page");
			if(currentPage>maxPage)
				currentPage=maxPage;
			int firstResult=(currentPage-1)*10;
		    List result=sqlQueryEntity.setFirstResult(firstResult).setMaxResults(10).list();
		 
		   map.put("list", result);
		   map.put("maxpage", maxPage);
			
			return map;
	}

	@Override
	public List<T> findAll(Class<T> clazz) {
		Session session=sessionFactory.getCurrentSession();
		String hql="from "+ clazz.getName();
	   List<T> list=session.createQuery(hql).list();
		return list;
	}

}
