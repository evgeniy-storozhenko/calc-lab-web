package com.calclab.web.service;

import com.calclab.web.model.CalcResult;

public interface CalculationService {

	CalcResult execute(String input);
	
}
