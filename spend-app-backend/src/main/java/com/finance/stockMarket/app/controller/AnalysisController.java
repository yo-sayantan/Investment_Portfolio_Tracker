package com.finance.stockMarket.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.stockMarket.app.dto.LineChartDto;
import com.finance.stockMarket.app.dto.PieChartDto;
import com.finance.stockMarket.app.service.AnalysisService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/app")
public class AnalysisController extends BaseController {

	@Autowired
	private AnalysisService analysisService;

	@GetMapping("/get-line-chart")
	public List<LineChartDto> getLineCharts() {
		return analysisService.getLineCharts(getUserName());
	}

	@GetMapping("/get-pie-chart")
	public List<PieChartDto> getPieCharts() {
		return analysisService.getPieCharts(getUserName());
	}
}
