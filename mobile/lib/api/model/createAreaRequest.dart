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

  subtype.fromJson(dynamic json, String subKey1, String subKey2, String typekey)
      : subkey1 = subKey1,
        subkey2 = subKey2,
        map = Map<String, String>.from(json[subKey1]),
        typeKey = typekey,
        typeData = json[subKey2][typekey];

  Map<String, dynamic> toJson() {
    return {
      subkey1: map,
      subkey2: {typeKey: typeData},
    };
  }
}

class createAreaRequest {
  String id = "";
  late subtype trigger;
  late subtype consequence;

  createAreaRequest(String triggerKey, Map<String, String> triggerData,
      String consequKey, Map<String, String> consequData) {
    trigger = subtype("inputs", "action", triggerData, "type", triggerKey);
    consequence =
        subtype("inputs", "reaction", consequData, "type", consequKey);
  }

  createAreaRequest.fromJson(dynamic json)
      : id = json['_id'],
        trigger = subtype.fromJson(json['trigger'], "inputs", "action", "type"),
        consequence =
            subtype.fromJson(json['consequence'], "inputs", "reaction", "type");

  Map<String, dynamic> toJson() {
    return {'trigger': trigger.toJson(), 'consequence': consequence.toJson()};
  }
}
