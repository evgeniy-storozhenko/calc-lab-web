package com.calclab.web.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;

import com.calclab.web.service.util.FunctionHelper;

public class CalcLabBridge {

    private static final String CALCLAB_HOME = System.getenv("CALCLAB_HOME");
    private static final String CALCLAB_LAUNCHER = System.getenv("CALCLAB_LAUNCHER");

    private String cachedFunctions = null;

    public String execute(String input) throws Exception {
        String result = "";
        try {
            final String[] command = { "java", "-jar", "plugins/" + CALCLAB_LAUNCHER, "-t", "json", "-i", input };

            ProcessBuilder calcProcessBuilder = new ProcessBuilder(command);
            calcProcessBuilder.directory(new File(CALCLAB_HOME));
            Process calcProcess = calcProcessBuilder.start();
            result = readProcessOutput(calcProcess);
            if (result.startsWith("An error has occurred.")) {
                throw new Exception();
            }
        } catch (IOException e) {
            result = e.getMessage();
            e.printStackTrace();
        }
        return result;
    }

    private String readProcessOutput(Process calcProcess) throws IOException {
        InputStreamReader isr = null;
        BufferedReader br = null;
        try {
            StringBuilder result = new StringBuilder();
            isr = new InputStreamReader(calcProcess.getInputStream(), "UTF8");
            br = new BufferedReader(isr);
            String line;
            while ((line = br.readLine()) != null) {
                result.append(line);
                result.append(System.lineSeparator());
            }
            return result.toString();
        } finally {
            if (br != null) {
                br.close();
            }
            if (isr != null) {
                isr.close();
            }
        }
    }

    public String functions() throws Exception {
        if (cachedFunctions != null) {
            return cachedFunctions;
        }

        String functions = execute("help;");

        String steps = "\"steps\":[\"\\n\\n";   // TODO make API in headless calc-lab
        String stepsEnd = "\"],\"operand\"";
        int startPos = functions.lastIndexOf(steps) + steps.length();
        int endPos = functions.lastIndexOf(stepsEnd);
        String funcContent = functions.substring(startPos, endPos);
        String[] functionArray = funcContent.split("Function: ");
        
        List<JSONObject> jsonResult = Arrays.stream(functionArray)
                .filter(item -> item != null && !item.isEmpty())
                .map(item -> FunctionHelper.transformToJson(item))
                .collect(Collectors.toList());

        cachedFunctions = jsonResult.toString();
        return cachedFunctions;
    }
}
