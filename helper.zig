const std = @import("std");
const mem = @import("mem");

const Param = struct {
    name:[]u8,
    type:[]u8, //type can be a callback
};

const Method = struct {
    name:[]u8,
    type:[]u8, //returnType
    access:[]u8,
    params:[]Params,
    line:[]u8,
};

const Variable = struct {
    name:[]u8,
    type:[]u8,
    id:[]u8, //const or var
    value:[]u8,
    line:[]u8,

};

const StructObj = struct {
    name:[]u8,
    access:[]u8,
    id:[]u8, //const or var
    line:[]u8,

}

const Property = struct {
    name:[]u8,
    type:[]u8,
    line:[]u8,
    
}

fn trimLeft(val: []const u8) []const u8 {
    var i: usize = 0;
    while (i < val.len) : (i += 1) {
        if (val[i] != ' ') {
            return val[i..];
        }
    }
    return val;
}

fn trimRight(val: []const u8) []const u8 {
    var i: usize = val.len;
    while (i > 0) : (i -= 1) {
        if (val[i - 1] != ' ') {
            return val[0..i];
        }
    }
    return val;
}

fn trim(val: []const u8, ctx:[]u8) []const u8 {

    if(mem.eqlBytes(ctx, "left") {
        var i: usize = 0;
        while (i < val.len) : (i += 1) {
            if (val[i] == ' ') {
                return val[0..i-1];
            }
        }
    } 
    
    if(mem.eqlBytes(ctx, "right") {
        var i: usize = val.len;
        while (i >= val.len) : (i -= 1) {
            if (val[i] == ' ') {
                return val[i+1..];
            }
        }
    } 

    return val;
}

fn splitLineStruct(line:[]const u8, split:u8) StructObj {

    var s = StructObj{};
    s.line = line;
    var newLine = "";
    if (std.mem.indexOf(u8, trimLeft(line), "pub")) {
        s.access = "pub";
        newLine = trimLeft(line[4..]);
        
    }

    if (std.mem.indexOf(u8, trimLeft(lwp), "const")) {
            s.id = "const";
            newLine = trimLeft(line[6..]);
        } if (std.mem.indexOf(u8, trimLeft(line), "pub")) {
            s.id = "var";
            newLine = trimLeft(line[4..]);
        }
    
    const val = std.mem.splitScalar(u8, trimLeft(newLine), split);
    s.name = val;
    
}

fn splitLineFunction(line:[]const u8, split:u8) Method {
    var m:Method = Method{};
    m.line = line;
    if (std.mem.indexOf(u8, trimLeft(line), "pub")) |_| {
        m.access = "pub";
        const lwp = trimLeft(line[4..]);

        if (std.mem.indexOf(u8, trimLeft(lwp), "fn")) |_| {
            const lwf = trimLeft(line[2..]);
            if (std.mem.indexOf(u8, lwf, "{")) |start| {
                const newLine = trimRight(lwf[0..start-1]);
                //set return type
                m.type = trim(newLine, "left");
                const index = mem.indexOf(u8,newLine,m.type);
                //set name
                m.name = trim(newLine, "right");
                const fpline = trimLeft(newLine[m.name.len-1..])[1..];
                const pline = trimRight(fpline[0..index]);
                
                const pit = mem.splitScalar(u8,pline[0..pline.len-2],split);
    
                var count:usize = 0;
    
                while (pit.next()) |param| {
                    const tit = mem.splitScalar(u8,trimLeft(param),':');
                    const p = Param{.name=tit.first(),.type=fntype(tit.rest()),.old=null};
                    params[count] = p;
                    count = count + 1;
                }
            }
        } 
    }
    
    return m;
}

fn fntype(t:[]u8) []u8 {
    if(mem.indexOf(u8, t, fn) != -1) {
        return trim(t, "left");
    }
    return t;
}

fn splitLineVariable(line:[]const u8, split:u8) Variable {
    var v = Variable{};
    v.line = line;
    var newLine = "";
    if (std.mem.indexOf(u8, trimLeft(line), "pub")) {
        s.access = "pub";
        newLine = trimLeft(line[4..]);

    }

    if (std.mem.indexOf(u8, trimLeft(lwp), "const")) {
        v.id = "const";
        newLine = trimLeft(line[6..]);
    }
    if (std.mem.indexOf(u8, trimLeft(line), "pub")) {
        v.id = "var";
        newLine = trimLeft(line[4..]);
    }
    
    const val = std.mem.splitScalar(u8, trimLeft(newLine), split);
    const first = val.next();
    const other = val.next();
    v.value = trimRight(trimLeft(other));
    const newVal = std.mem.splitScalar(u8, trimLeft(first),':');
    
    v.name = newVal.next();
    v.type = newVal.next();

    return v;
}

fn splitLineProperty(line:[]const u8, split:u8) Property {
    const it = mem.splitScalar(u8,trimRight(trimLeft(line)), split);
    const p = Property{.name=it.first(),.type=fntype(it.rest()),.line=line,.old=null};
    
}

fn splitLineParams(line:[]const u8, split:u8) []Params {
    const pit = mem.splitScalar(u8,pline[0..pline.len-2],split);
    var count:usize = 0;
    
    while (pit.next()) |param| {
        const tit = mem.splitScalar(u8,trimLeft(param),split);
        const p = Param{.name=tit.first(),.type=fntype(tit.rest()),.old=null};
        params[count] = p;
        count = count + 1;
    }
}
