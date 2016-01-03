package com.calclab.web.controller;

import com.calclab.web.model.CalcResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.calclab.web.service.CalculationService;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/calculationService")
public class CalculationController {

    @Autowired
    private CalculationService calculationService;

    @RequestMapping(value = "/execute", method = RequestMethod.POST, produces="application/json")
    public @ResponseBody
    String execute(@RequestParam(value = "input") String input) {
        return calculationService.execute(input);
    }

}