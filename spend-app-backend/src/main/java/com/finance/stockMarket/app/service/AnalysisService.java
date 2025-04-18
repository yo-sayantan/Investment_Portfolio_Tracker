package com.finance.stockMarket.app.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.stockMarket.app.dto.LineChartDto;
import com.finance.stockMarket.app.dto.MarketData;
import com.finance.stockMarket.app.dto.PieChartDto;
import com.finance.stockMarket.app.model.OrderDetail;
import com.finance.stockMarket.app.repo.OrderRepo;
import com.finance.stockMarket.app.utils.MarketDataUtil;
import com.finance.stockMarket.constants.MFConstants;

@Service
public class AnalysisService {

	public class Pair {
		Double investedAmount;
		Double units;
		Double nav;

		Pair(Double investedAmount, Double units, Double nav) {
			super();
			this.investedAmount = investedAmount;
			this.units = units;
			this.nav = nav;
		}

	}

	@Autowired
	private OrderRepo orderRepo;

	public List<LineChartDto> getLineCharts(String userName) {
		List<LineChartDto> list = new ArrayList<>();

		List<OrderDetail> orderDetails = orderRepo.findByUserUsernameOrderByDateOfEventAsc(userName);

		Date date = orderDetails.get(0).getDateOfEvent();

		Map<String, TreeMap<Date, List<OrderDetail>>> orderDetailMap = new HashMap<>();
		Map<String, MarketData> marketDataMap = new HashMap<>();

		for (OrderDetail ord : orderDetails) {
			TreeMap<Date, List<OrderDetail>> map = orderDetailMap.get(ord.getMutualFund().getSchemeCode());
			if (map == null) {
				map = new TreeMap<>();
			}
			List<OrderDetail> ordList = map.get(ord.getDateOfEvent());
			if (ordList == null || ordList.size() == 0) {
				ordList = new ArrayList<>();
			}
			ordList.add(ord);
			map.put(ord.getDateOfEvent(), ordList);
			orderDetailMap.put(ord.getMutualFund().getSchemeCode(), map);
			if (marketDataMap.get(ord.getMutualFund().getSchemeCode()) == null) {
				marketDataMap.put(ord.getMutualFund().getSchemeCode(),
						MarketDataUtil.getHistoricalData(ord.getMutualFund().getSchemeCode()));
			}
		}

		Map<String, Pair> trackerMap = new HashMap<>();
		Map<String, Queue<OrderDetail>> sellTracker = new HashMap<>();

		while (date.before(new Date(System.currentTimeMillis()))) {
			LineChartDto dto = new LineChartDto();
			Double totalInvestedAmount = 0.0;
			Double totalCurrentAmount = 0.0;
			for (String code : orderDetailMap.keySet()) {
				if (marketDataMap.get(code).getNavData().get(date) == null) {
					if (trackerMap.get(code) != null) {
						totalInvestedAmount += trackerMap.get(code).investedAmount;
						totalCurrentAmount += trackerMap.get(code).units * trackerMap.get(code).nav;
					}
					continue;
				}
				Double currentNav = marketDataMap.get(code).getNavData().get(date);
				Double investedAmount = 0.0;
				Double totalUnits = 0.0;
				if (trackerMap.get(code) != null) {
					investedAmount = trackerMap.get(code).investedAmount;
					totalUnits = trackerMap.get(code).units;
				}

				Queue<OrderDetail> queue = sellTracker.get(code);
				if (queue == null)
					queue = new LinkedList<>();

				while (orderDetailMap.get(code).size() > 0 && !orderDetailMap.get(code).firstKey().after(date)) {
					for (OrderDetail ord : orderDetailMap.get(code).get(orderDetailMap.get(code).firstKey())) {
						if (ord.getSide().equals(MFConstants.BUY)) {
							queue.offer(ord);
							totalUnits += ord.getUnits();
							investedAmount += ord.getAmount();
						} else {
							investedAmount -= getSellInvestedAmount(ord.getAmount(), queue, ord.getUnits());
							totalUnits -= ord.getUnits();
						}
					}
					orderDetailMap.get(code).pollFirstEntry();
				}
				sellTracker.put(code, queue);
				totalInvestedAmount += investedAmount;
				totalCurrentAmount += totalUnits * currentNav;
				Pair pair = new Pair(investedAmount, totalUnits, currentNav);
				trackerMap.put(code, pair);
			}
			dto.setDate(date);
			dto.setCurrentAmount(totalCurrentAmount);
			dto.setInvestedAmount(totalInvestedAmount);
			list.add(dto);
			date = new Date(date.getTime() + MFConstants.ONE_DAY_IN_MILLIS);
		}

		return list;
	}

	public List<PieChartDto> getPieCharts(String username) {
		List<PieChartDto> pieChartData = new ArrayList<>();

		List<OrderDetail> orderDetails = orderRepo.findByUserUsernameOrderByDateOfEventAsc(username);

		Map<String, TreeMap<Date, List<OrderDetail>>> orderDetailMap = new HashMap<>();
		Map<String, MarketData> marketDataMap = new HashMap<>();

		for (OrderDetail ord : orderDetails) {
			TreeMap<Date, List<OrderDetail>> map = orderDetailMap.get(ord.getMutualFund().getSchemeCode());
			if (map == null) {
				map = new TreeMap<>();
			}
			List<OrderDetail> ordList = map.get(ord.getDateOfEvent());
			if (ordList == null || ordList.size() == 0) {
				ordList = new ArrayList<>();
			}
			ordList.add(ord);
			map.put(ord.getDateOfEvent(), ordList);
			orderDetailMap.put(ord.getMutualFund().getSchemeCode(), map);
			if (marketDataMap.get(ord.getMutualFund().getSchemeCode()) == null) {
				marketDataMap.put(ord.getMutualFund().getSchemeCode(),
						MarketDataUtil.getHistoricalData(ord.getMutualFund().getSchemeCode()));
			}
		}

		Map<String, Double> schemeInvestmentMap = new HashMap<>();
		Map<String, Double> schemeUnitsMap = new HashMap<>();

		for (String code : orderDetailMap.keySet()) {
			Double investedAmount = 0.0;
			Double totalUnits = 0.0;

			TreeMap<Date, List<OrderDetail>> dateMap = orderDetailMap.get(code);
			Queue<OrderDetail> queue = new LinkedList<>();

			for (Date date : dateMap.keySet()) {
				for (OrderDetail ord : dateMap.get(date)) {
					if (ord.getSide().equals(MFConstants.BUY)) {
						queue.offer(ord);
						totalUnits += ord.getUnits();
						investedAmount += ord.getAmount();
					} else {
						investedAmount -= getSellInvestedAmount(ord.getAmount(), queue, ord.getUnits());
						totalUnits -= ord.getUnits();
					}
				}
			}

			schemeInvestmentMap.put(code, investedAmount);
			schemeUnitsMap.put(code, totalUnits);
		}

		for (String code : schemeUnitsMap.keySet()) {
			Double totalUnits = schemeUnitsMap.get(code);
			Double currentNav = marketDataMap.get(code).getNavData().get(new Date());
			if (currentNav == null) {
				currentNav = MarketDataUtil.getLatestNav(code);
			}
			if (totalUnits <= 0.0) {
				continue;
			}
			Double currentValue = Math.round(totalUnits * currentNav * 100.0) / 100.0;
			String schemeName = orderDetails.stream()
					.filter(o -> o.getMutualFund().getSchemeCode().equals(code))
					.findFirst()
					.map(o -> o.getMutualFund().getSchemeName())
					.orElse(code);
			pieChartData.add(new PieChartDto(schemeName, currentValue));
		}

		return pieChartData;
	}

	private Double getSellInvestedAmount(Double amount, Queue<OrderDetail> queue, Double units) {
		Double sellInvestedAmount = 0.0;

		while (!queue.isEmpty() && units > 0.0) {
			if (queue.peek().getUnits().compareTo(units) == 1) {
				sellInvestedAmount += units * queue.peek().getNav();
				units = 0.0;
				queue.peek().setUnits(queue.peek().getUnits() - units);
			} else if (queue.peek().getUnits().equals(units)) {
				sellInvestedAmount += units * queue.peek().getNav();
				units = 0.0;
				queue.poll();
			} else { // queue.peek().getUnits() < units
				sellInvestedAmount += queue.peek().getUnits() * queue.peek().getNav();
				units = units - queue.peek().getUnits();
				queue.poll();
			}
		}

		return sellInvestedAmount;
	}
}
