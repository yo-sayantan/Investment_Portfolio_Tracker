package com.finance.SugerMarket.test;

import java.io.File;
import com.finance.SugerMarket.app.service.CamsKFinTechPDFPerserService;

public class PDFTest {
	public static void main(String[] args) {
		try {
			File file = new File("C:\\ZZZ\\CAMS_SUBHAM.pdf");
			CamsKFinTechPDFPerserService ob = new CamsKFinTechPDFPerserService();
			ob.processFile(file, null, "Limbo123");

		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
