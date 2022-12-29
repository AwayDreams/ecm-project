class CustomContextPadProvider {
  static $inject: string[];
  constructor(contextPad) {
    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    return function (entries) {
      console.log("entries2", entries)

      delete entries['append.gateway'];
      delete entries['append.intermediate-event'];
      delete entries['append.text-annotation'];
      delete entries['replace'];

      return entries;
    };
  }
}

CustomContextPadProvider.$inject = ["contextPad"];

export default {
  __init__: ["customContextPadProvider"],
  customContextPadProvider: ["type", CustomContextPadProvider]
};
