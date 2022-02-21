enum ParameterType {
  TEXT,
  DATETIME,
  TIME,
  URL,
  NUMBER,
}

String enumToString(ParameterType type) {
  Map<ParameterType, String> map = {
    ParameterType.TEXT: "TEXT",
    ParameterType.DATETIME: "DATETIME",
    ParameterType.TIME: "TIME",
    ParameterType.URL: "URL",
    ParameterType.NUMBER: "NUMBER"
  };
  return map[type]!;
}

ParameterType stringToEnum(String token) {
  Map<String, ParameterType> map = {
    "TEXT": ParameterType.TEXT,
    "DATETIME": ParameterType.DATETIME,
    "TIME": ParameterType.TIME,
    "URL": ParameterType.URL,
    "NUMBER": ParameterType.NUMBER,
  };
  return map[token]!;
}