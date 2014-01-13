package ym.utils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class PageUtil implements Serializable, Cloneable {

	private static final long serialVersionUID = 1L;

	private int intPage = 1;// 当前的页数

	private long maxPage = 0;// 总页数

	private int displaySize = 5;// 页面显示页数

	private int pageSize = 10;// 每页显示的条数

	private long maxCount;// 总记录条数

	private List<Integer> pageRow = new ArrayList<Integer>();// 页码数组

	public PageUtil() {
		super();
	}

	public int getIntPage() {
		return this.intPage;
	}

	public void setInPage(int intPage) {
		if (intPage > 0 && intPage <= maxPage) {
			this.intPage = intPage;
		} else if (intPage <= 0) {
			this.intPage = 1;
		} else if (intPage > maxPage) {
			this.intPage = (int) maxPage;
		}
		setPageRows(this.intPage,(int) maxPage);
	}

	public long getMaxCount() {
		return this.maxCount;
	}

	public void setMaxCount(long maxCount) {
		this.maxCount = maxCount;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getDisplaySize() {
		return displaySize;
	}

	public void setDisplaySize(int displaySize) {
		this.displaySize = displaySize;
	}

	public long getMaxPage() {
		return this.maxPage;
	}

	public void setMaxPage(long count) {
		setMaxCount(count);
		if (count <= 0) {
			maxPage = 1;
		} else {
			if (count % pageSize == 0) {
				maxPage = count / pageSize;
			} else {
				maxPage = count / pageSize + 1;
			}
		}
		setInPage(this.intPage);
	}

	public List<Integer> getPageRow() {
		return this.pageRow;
	}
	public void setPageRows(int intPage, int maxPage) {

		System.out.println("当前页:" + intPage + " 总页数:" + maxPage);
		int pages = 1;

		if (maxPage % (this.displaySize) == 0)
			pages = maxPage / this.displaySize;
		else
			pages = maxPage / this.displaySize + 1;

		int curpage = 1;
		if (intPage % (this.displaySize) == 0)
			curpage = intPage / this.displaySize;
		else
			curpage = intPage / this.displaySize + 1;

		int beginIndex = (curpage - 1) * this.displaySize + 1;
		if (curpage > 1) {
			// int endIndex=0;
			System.out.print("...");
			beginIndex = beginIndex - 1;
		}
		int endIndex = curpage * this.displaySize > maxPage ? maxPage : curpage
				* this.displaySize;
		int end = endIndex;
		if (endIndex < maxPage) {
			endIndex = endIndex + 1;
		}

		for (int i = beginIndex; i <= endIndex; i++) {
			if (i == intPage) {
				pageRow.add(new Integer(i));
				System.out.print(i + "* ");
				continue;
			}
			pageRow.add(i);
			System.out.print(i + " ");

		}
		if (end < maxPage) {
			System.out.print("...");
		}

	}

	
	public void fristInitPage(int intPage, int pageSize, int displaySize) {
		this.intPage = intPage;
		this.setDisplaySize(displaySize);
		this.setPageSize(pageSize);
	}

	public void secondInitPage(long count) {
		this.setMaxPage(count);
	}

	

	@Override
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

	public static void main(String args[]) {
		PageUtil pvo = new PageUtil();
		// pvo.fristInitPage(3, 10, 5);//当前 每页显示的条数 页面显示页数
		// pvo.secondInitPage(60);
		// List<Integer> maxPage=pvo.getPageRow();
		// for (int i = 0; i < maxPage.size(); i++) {
		// System.out.println(maxPage.get(i));
		// }
		pvo.setPageSize(10); // 页面显示页数
		for (int j = 1; j < 20; j++)
			for (int i = 1; i <= j; i++) {
				pvo.setPageRows(i, j);// 当前 最大
				System.out.println("");

			}
	}
}
