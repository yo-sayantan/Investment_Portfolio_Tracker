package com.finance.stockMarket.app.dto;

public class PieChartDto {
    private String schemeName;
    private double investedAmount;

    public PieChartDto() {
    }

    public PieChartDto(String schemeName, double investedAmount) {
        this.schemeName = schemeName;
        this.investedAmount = investedAmount;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public double getInvestedAmount() {
        return investedAmount;
    }

    public void setInvestedAmount(double investedAmount) {
        this.investedAmount = investedAmount;
    }
}