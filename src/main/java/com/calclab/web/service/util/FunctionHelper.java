package com.calclab.web.service.util;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;

public class FunctionHelper {

    public static final JSONObject transformToJson(String function) {
        JSONObject jsonFunction = new JSONObject();
        try {
            String[] funcDetails = function.split("Syntax:|Description:|Example:|Result:");
            funcDetails = Arrays.stream(funcDetails)
                    .map(item -> item.replace("\\n", "").replace("\\t", "").trim())
                    .collect(Collectors.toList()).toArray(new String[0]);

            if (funcDetails.length > 0) {
                jsonFunction.put("name", funcDetails[0]);
                ArrayList<JSONObject> details = new ArrayList<>();
                for (int i = 1; i <= funcDetails.length; i++) {
                    if (i % 4 == 0) {
                        JSONObject description = new JSONObject();
                        description.put("syntax", funcDetails[i-3]);
                        description.put("description", funcDetails[i-2]);
                        description.put("example", funcDetails[i-1]);
                        description.put("result", funcDetails[i-1]);
                        details.add(description);
                    }
                }
                jsonFunction.put("details", details);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonFunction;
    }

}
