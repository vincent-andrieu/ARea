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

  Map<String, String> map;

  String typeKey;
  String typeData;

  subtype(this.subkey1, this.subkey2, this.map, this.typeKey, this.typeData);

  subtype.fromJson(dynamic json)
      : subkey1 = json[''],
        subkey2 = json[''],
        map = {},
        typeKey = json[''],
        typeData = json[''];

  Map<String, dynamic> toJson() {
    return {
      subkey1: map,
      subkey2: {
        typeKey: typeData
      },
    };
  }
}

class createAreaRequest {
  late subtype trigger;
  late subtype consequence;

  createAreaRequest(String triggerKey, Map<String, String> triggerData, String consequKey, Map<String, String> consequData) {
    trigger = subtype("inputs", "action", triggerData, "type", triggerKey);
    consequence = subtype("inputs", "reaction", consequData, "type", consequKey);
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