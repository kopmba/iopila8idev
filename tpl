///this script needs user to provide Strings and operation object

const Content = struct {
  value:[]u8,
  parent:Content,
  objName:[]u8,
  loop_eval:[]u8,
  loop_len:i32,
  criteriaVal:[]u8,
  criteriaProp:[]u8,
  criteriaCond:[]u8,
  condValue:[]u8,
  subcontent:[]Content,
  caseContent:[]u8,
  cpl:[]u8,
}

fn retrieveFromIfCase(c:MapContent) !void {
  var exist:bool = true;
  var tpl:Strings = Strings.new(c.value);
  var len = 0;
  if(mem.eq(u8, tpl, "@If")) {
    while(exist) {
      const start = tpl.indexOf("@If");
      const end = tpl.indexOf("@EndIf");
      const val:Strings = Strings.new(tpl.substr(start, end+7));
      
      const ostart = val.indexOf("(");
      const oend = val.indexOf(")");
      const ifcond = val.substr(ostart, oend);
      
      const tplCond = operation.tpCond(ifcond);///todo
      const condv = operation.tpEql(ifcond);
      
      const content = Content.initIf(val, ifcond, tplCond, @ptrCast(condv), "If");
      ///check if exist in loop case
      const check:bool = checkIfFromLoopCase(c, content);
      if(!check) {
        c.add(content);
      }
      var newTpl:[]u8 = undefined;
      Strings.new(tpl).replace(tpl, val, ifcond, newTpl);
      tpl.str = newTpl;
      
      if(!mem.eq(u8, newTpl, "@If")) {
        exist = false;
        c.value = newTpl;
      }
    }
  }
}

fn retrieveFromLoopCase(c:MapContent) !void {
  var exist:bool = true;
  var tpl:Strings = Strings.new(c.value);
  var len = 0;
  if(mem.eq(u8, tpl, "@If")) {
    while(exist) {
      const start = tpl.indexOf("@If");
      const end = tpl.indexOf("@EndIf");
      const val:Strings = Strings.new(tpl.substr(start, end+7));
      
      const ostart = val.indexOf("(");
      const oend = val.indexOf(")");
      const loopEval = val.substr(ostart, oend);
      
      const loop_len = operation.lenEval(loopEval);
      const content = Content.initLoop(val, loopEval, @ptrCast(loop_len));
      ///check loo exist in if case
      const check:bool = checkLoopFromIfCase(c, content);
      if(!check) {
        c.add(content);
      }
      
      var newTpl:[]u8 = undefined;
      Strings.new(tpl).replace(tpl, val, loopEval, newTpl);
      tpl.str = newTpl;
      
      if(!mem.eq(u8, newTpl, "@If")) {
        exist = false;
        c.value = newTpl;
      }
    }
  }
}

fn checkIfFromLoopCase(c:MapContent, cif:Content) bool {
  var i = 0;
  cloops:[]Content = retrieveFromLoopCase(c);
  while(i<cloops.len):(i+=1) {
    if(mem.eq(u8, cloops[i].value, cif.value) {
      cif.parent = cloops[i];
      const len = cloops[i].subcontent.len;
      cloops[i].subcontent[len] = cif;
      return true;
    }
  }
  return false;
}

fn checLoopFromIfCase(c:MapContent, cloop:Content) bool {
  var i = 0;
  cifs:[]Content = retrieveFromIfCase(c);
  while(i<cifs.len):(i+=1) {
    if(mem.eq(u8, cifs[i].value, cloop.value) {
      cloop.parent = cifs[i];
      const len = cifs[i].subcontent.len;
      cloops[i].subcontent[len] = cloop;
      return true;
    }
  }
  return false;
}

const MapContent = struct {
    value:[]u8,
    subcontent:[]Content,
    
    pub fn add(self:*MapContent, content:Content) void {
      self.subContent.add(content);
    }
    
}

fn compileIf(c:Content, obj:anytype, props:List(Strings)) !void {
  var i = 0;
  c.objName = Strings.new(TypeOf(obj)).toLowerAll();
  var newVal:[]u8 = undefined;
  while(i<props.items.len):(i+=1) {
    const propValue = propertyValue(obj, props.items[i]); ///todo
    const criteriaProp = @ptrCast(propertyValue(obj, c.criteriaProp));
    const k = Strings.new(c.objName).append('.');
    const key = Strings.new(k).concat(props.items[i]);
    if(Strings.new(c.value).contains(key) 
    && Strings.new(criteriaProp).equals(c.cond) {
      Strings.new(c.value).replace(c.value, key, propValue, &newVal);
    }
  }
  c.cpl = newVal;
}

fn compileLoop(c:Content, obj:anytype, props:List(Strings)) !void {
  var i = 0;
  var j = 0;
  c.objName = Strings.new(TypeOf(obj)).toLowerAll();
  var newVal:[]u8 = undefined;
  var resultVal:Strings = Strings.new("");
  while(j<c.loop_len):(j+=1) {
    while(i<props.items.len):(i+=1) {
      const propValue = propertyValue(obj, props.items[i]); ///todo
      const criteriaProp = @ptrCast(propertyValue(obj, c.criteriaProp));
      const k = Strings.new(c.objName).append('.');
      const key = Strings.new(k).concat(props.items[i]);
      if(Strings.new(c.value).contains(key) 
       && Strings.new(criteriaProp).equals(c.cond) {
        Strings.new(c.value).replace(c.value, key, propValue, &newVal);
      }
      resultVal.concat(newVal);
      resultVal.concat("\n");
    }
  }
  c.cpl = resultVal;
}

fn compile(c:MapContent, objs:anytype, props:List(Strings)) !void {
  var j=0;
  var i=0;
  var newVal:[]u8 = undefined;
  while(i<objs.len):(i+=1) {
    c.objName = Strings.new(TypeOf(objs[i])).toLowerAll();
    while(j<props.items.len):(j+=1) {
      const propValue = propertyValue(obj[i], props.items[j]); ///todo
      const k = Strings.new(c.objName).append('.');
      const key = Strings.new(k).concat(props.items[j]);
      if(Strings.new(c.value).contains(key)) {
        Strings.new(c.value).replace(c.value, key, propValue, &newVal);
      }
    }
  }
  c.value = newVal;
}
  
fn output(map:MapContent, objs:anytype, props:List(Strings)) !void {
  var i=0;
  var j=0;
  var k=0;
  try retrieveFromIfCase(map);
  try retrieveFromLoopCase(map);
  while(i<map.subcontent.len):(i+=1) {
    while(j<objs.len):(j+=1) {
      if(map.subcontent[i].subcontent.len > 0) {
        while(k<map.subcontent[i].subcontent.len) {
          const c = map.subcontent[i].subcontent[k];
          if(mem.eq(u8, c.caseContent, "If")) {
            compileIf(c, objs[j], props);
          } else {
            compileLoop(c, objs[j], props);
          }
        }
      }
    }
  }
  
  try compile(map, objs, props);
}
