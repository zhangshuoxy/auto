package ym.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import ym.dao.BaseDao;
import ym.dao.impl.BaseDaoImpl;
import ym.service.BaseService;


@Service
public class BaseServiceImpl<T> implements BaseService<T> {
	
	@Autowired
	private BaseDao<T> baseDao;

	@Override
	public void save(T obj) {
		baseDao.save(obj);
		
	}

	@Override
	public void update(T obj) {
		baseDao.update(obj);
		
	}

	@Override
	public void delete(T obj) {
		baseDao.delete(obj);		
	}

	@Override
	public T findById(Class<T> clazz, Serializable id) {
		return baseDao.findById(clazz, id);
	}

	@Override
	public void deleteById(Class<T> clazz, Serializable id) {

		baseDao.deleteById(clazz, id);
	}

	@Override
	public List findByPage(String sql, int currentPage) {
		return baseDao.findByPage(sql, currentPage);
	}

	@Override
	public Map findByQueryMap(Map query) {
		return baseDao.findByQueryMap(query);
	}

	@Override
	public List<T> findAll(Class<T> clazz) {
		
		return baseDao.findAll(clazz);
	}

	
}
