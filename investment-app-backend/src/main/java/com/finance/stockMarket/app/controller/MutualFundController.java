package com.finance.stockMarket.app.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.stockMarket.app.model.MutualFund;
import com.finance.stockMarket.app.service.MutualFundService;
import com.finance.stockMarket.app.utils.MarketDataUtil;
import com.finance.stockMarket.constants.MFConstants;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/app")
public class MutualFundController {

	@Autowired
	private MutualFundService mutualFundService;

	private static final Logger log = LoggerFactory.getLogger(MutualFundController.class);

	@GetMapping("/get-mutualfunds")
	public List<MutualFund> findAllMutualFunds() {
		return mutualFundService.findAllMutualFunds();
	}

	@GetMapping("/get-mf-api-data")
	public List<MutualFund> findMfApiMutualFunds() {
		return MarketDataUtil.getMFList();
	}

	@GetMapping("/exists-mutualfund/{schemeCode}")
	public ResponseEntity<Boolean> existsMutualFundBySchemeCode(@PathVariable("schemeCode") String schemeCode) {
		try {
			MutualFund found = mutualFundService.findBySchemeCode(schemeCode);
			return ResponseEntity.ok(found != null);
		} catch (Exception e) {
			log.error("Error checking existence of mutual fund for schemeCode: " + schemeCode, e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}

	// @GetMapping("/get-mutualfund-details/{schemeCode}")
	// public ResponseEntity<MutualFund>
	// getMutualFundDetailsBySchemeCode(@PathVariable("schemeCode") String
	// schemeCode) {
	// try {
	// // List<MutualFund> allFunds = MarketDataUtil.getMFList();
	// // MutualFund found = allFunds.stream()
	// // .filter(f -> String.valueOf(f.getSchemeCode()).equals(schemeCode))
	// // .findFirst()
	// // .orElse(null);
	// MutualFund found = MarketDataUtil.getMFDetailsList(schemeCode);
	// if (found != null) {
	// return ResponseEntity.ok(found);
	// } else {
	// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	// }
	// } catch (Exception e) {
	// log.error("Error fetching mutual fund details for schemeCode: " + schemeCode,
	// e);
	// return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	// }
	// }

	@PostMapping("/save-mutualfund")
	public ResponseEntity<String> saveMutualFund(@RequestBody MutualFund fund) {
		try {
			mutualFundService.saveMutualFund(fund);
		} catch (Exception e) {
			log.error("error while saving mutual fund: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(MFConstants.FAILED);
		}
		return ResponseEntity.ok(MFConstants.SUCCESS);
	}
}
