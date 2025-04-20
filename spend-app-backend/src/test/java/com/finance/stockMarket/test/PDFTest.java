package com.finance.stockMarket.test;

import java.io.File;

import com.finance.stockMarket.app.service.CamsKFinTechPDFPerserService;

public class PDFTest {
	public static void main(String[] args) {
		try {
			File file = new File("C:\\ZZZ\\CAMS.pdf");
			CamsKFinTechPDFPerserService ob = new CamsKFinTechPDFPerserService();
			ob.processFile(file, null, "Limbo123");

		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
