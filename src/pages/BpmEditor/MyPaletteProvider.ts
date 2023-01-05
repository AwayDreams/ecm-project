class MyPaletteProvider {
  eventBus: any;
  translate: any;
  static $inject: string[];
  

  constructor(eventBus, palette, translate) {
    this.eventBus = eventBus;
    this.translate = translate;
    

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    return function(entries) {
      console.log(entries);

      delete entries['hand-tool'];
      delete entries['space-tool'];
      delete entries['tool-separator'];
      delete entries['create.data-object'];
      delete entries['create.data-store'];
      delete entries['create.exclusive-gateway'];
      delete entries['create.intermediate-event'];
      delete entries['create.subprocess-expanded'];
      delete entries['global-connect-tool'];

      return entries;
    };
  }
}

MyPaletteProvider.$inject = [
  'eventBus',
  'palette',
  'translate'
];

export default {
  __init__: ["myPaletteProvider"],
  myPaletteProvider: ["type", MyPaletteProvider]
};