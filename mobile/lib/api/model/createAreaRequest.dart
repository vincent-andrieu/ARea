/*
{
  "trigger": {
    "inputs": {
      "username": "aypierre"
    },
    "action": {
      "type": "TWITCH_STREAM"
    }
  },
  "consequence": {
    "inputs": {
      "message": "New live on twitch"
    },
    "reaction": {
      "type": "TWITTER_MSG"
    }
  }
}
*/

class subtype {
  String subkey1;
  String subkey2;

  String inputKey;
  String inputData;

  String typeKey;
  String typeData;

  subtype(this.subkey1, this.subkey2, this.inputKey, this.inputData, this.typeKey, this.typeData);

  subtype.fromJson(dynamic json)
      : subkey1 = json[''],
        subkey2 = json[''],
        inputKey = json[''],
        inputData = json[''],
        typeKey = json[''],
        typeData = json[''];

  Map<String, dynamic> toJson() {
    return {
      subkey1: {
        inputKey: inputData
      },
      subkey2: {
        typeKey: typeData
      },
    };
  }
}

class createAreaRequest {
  late subtype trigger;
  late subtype consequence;

  createAreaRequest(String triggerKey, String consequKey, String triggerparams, String consequparams, String triggerdata, String consequdata) {
    trigger = subtype("inputs", "action", triggerKey, triggerparams, "type", triggerdata);
    consequence = subtype("inputs", "reaction", consequKey, consequparams, "type", consequdata);
  }

  createAreaRequest.fromJson(dynamic json)
      : trigger = subtype.fromJson(json['trigger']),
        consequence = subtype.fromJson(json['consequence']);

  Map<String, dynamic> toJson() {
    return {
      'trigger': trigger.toJson(),
      'consequence': consequence.toJson()
    };
  }
}