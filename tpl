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

