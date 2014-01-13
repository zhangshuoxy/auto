package ym.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface BaseService<T> {

	public void save(T obj);
	
	public void update(T obj);
	
	public void delete(T obj);
	
	public T findById(Class<T> clazz, Serializable id);
	
	public void deleteById(Class<T> clazz, Serializable id);
	
	public List  findByPage(String sql, int currentPage);
	
	public Map  findByQueryMap( Map queryMap);
	
	public List<T> findAll(Class<T> clazz);
}
