package com.finance.stockMarket.auth.memory;
import java.util.HashMap;
import java.util.Map;

import com.finance.stockMarket.auth.model.Token;

public class Tokens {
	public static Map<String, Token> tokenMap = new HashMap<>();
}