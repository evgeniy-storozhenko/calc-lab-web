package com.calclab.web.service;

import org.springframework.stereotype.Service;

import com.calclab.web.model.CalcResult;

@Service("CalculationService")
public class CalculationServiceImpl implements CalculationService {

    public CalcResult execute(String input) {
        return new CalcResult(input);
    }

}
