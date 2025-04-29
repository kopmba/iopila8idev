const std = @import("std");

var buffer: [8]f32 = undefined;
const nullVal = -14211212;
const bound = std.BoundedArray([]f32, 4);

//build vector of 2
var b2: [2]f32 = undefined;
var l2 = List(f32){.items = &b2, .len = 0};
var b2_items = l2.items;

//build vector of 3
var b3: [3]f32 = undefined;
var l3 = List(f32){.items = &b3, .len = 0};
var b3_items = l3.items;

//build vector of 4
var b4: [4]f32 = undefined;
var l4 = List(f32){.items = &b4, .len = 0};
const b4_items = std.BoundedArray([]f32,1);

//build vector of 5
var b5: [5]f32 = undefined;
var l5 = List(f32){.items = &b5, .len = 0};
var b5_items = l5.items;

//build vector of 6
var b6: [6]f32 = undefined;
var l6 = List(f32){.items = &b6, .len = 0};
var b6_items = l6.items;

//build vector of 7
var b7: [7]f32 = undefined;
var l7 = List(f32){.items = &b7, .len = 0};
var b7_items = l7.items;

const Vect = struct {
    x1: f32,
    x2: f32,
    x3: f32,
    x4: f32,
    x5: f32,
    x6: f32,
    x7: f32,

    pub fn init2(a:f32, b:f32) Vect {
        return Vect{
            .x1 = a,
            .x2 = b,
            .x3 = nullVal,
            .x4 = nullVal,
            .x5 = nullVal,
            .x6 = nullVal,
            .x7 = nullVal,
        };
    }

    pub fn init3(a:f32, b:f32, c:f32) Vect {
        return Vect{
            .x1 = a,
            .x2 = b,
            .x3 = c,
            .x4 = nullVal,
            .x5 = nullVal,
            .x6 = nullVal,
            .x7 = nullVal,
        };
    }

    pub fn init4(a:f32, b:f32, c:f32, d:f32) Vect {
        return Vect{
            .x1 = a,
            .x2 = b,
            .x3 = c,
            .x4 = d,
            .x5 = nullVal,
            .x6 = nullVal,
            .x7 = nullVal,
        };
    }

    pub fn init5(a:f32, b:f32, c:f32, d:f32, e:f32) Vect {
        return Vect{
            .x1 = a,
            .x2 = b,
            .x3 = c,
            .x4 = d,
            .x5 = e,
            .x6 = nullVal,
            .x7 = nullVal,
        };
    }

    pub fn init6(a:f32, b:f32, c:f32, d:f32, e:f32, f:f32) Vect {
        return Vect{
            .x1 = a,
            .x2 = b,
            .x3 = c,
            .x4 = d,
            .x5 = e,
            .x6 = f,
            .x7 = nullVal,
        };
    }

    pub fn init7(a:f32, b:f32, c:f32, d:f32, e:f32, f:f32, g:f32) Vect {
        return Vect{
            .x1 = a,
            .x2 = b,
            .x3 = c,
            .x4 = d,
            .x5 = e,
            .x6 = f,
            .x7 = g
        };
    }

    pub fn build(self: Vect) !void {
        buildVect2(self);
        if(self.x3 != nullVal) {
            try buildVect3(self);
        } 
        if(self.x4 != nullVal) {
            try buildVect4(self);
        } 
        if(self.x5 != nullVal) {
            try buildVect5(self);
        } 
        if(self.x6 != nullVal) {
            try buildVect6(self);
        } 
        if(self.x7 != nullVal) {
            try buildVect7(self);
        } 
        
    }

    pub fn size(self: Vect) usize {
        if(self.x3 != nullVal) {
            return 3;
        } 
        if(self.x4 != nullVal) {
            return 4;
        } 
        if(self.x5 != nullVal) {
            return 5;
        } 
        if(self.x6 != nullVal) {
            return 6;
        } 
        if(self.x7 != nullVal) {
            return 7;
        } 
        return 2;
    }
    
};

const Tensor = struct {
    items: []Vect,
    size: i32,

    pub fn init(items: []Vect, size: i32) Tensor {
        
        return Tensor {
            .items = items,
            .size = size, //default 1
        };
    }

    pub fn init(items: []Vect) Tensor {
        
        return Tensor {
            .items = items,
            .size = 1, //default 1
        };
    }

    pub fn push(self: Tensor, v: Vect) !void {
        //case for 4x4 matrix
        try v.build();
        self.items[self.size] = v;
        self.size = self.size + 1;
        std.debug.print("vector added in Tensor: {}\n", .{v});
        std.debug.print("New tensor: {}\n", .{self});
        try build(self);
        std.debug.print("New tensor after build: {}\n", .{self});
    }

    pub fn build(self: Tensor) !void {
        var matrix = try bound.init(0); 
        std.debug.print("Result Matrix : {}\n", .{matrix});
        var k:i8 = 0;
        while(k < 4) {
            if(k == 0) {
                var newMatBuff: [4]f32 = undefined;
                newMatBuff[0] = self.items[0].x1;
                newMatBuff[1] = self.items[1].x1;
                newMatBuff[2] = self.items[2].x1;
                newMatBuff[3] = self.items[3].x1;
                k = k + 1;
                std.debug.print("Mat buff k=0: {any}\n", .{newMatBuff});
                try matrix.append(&newMatBuff);
            }

            if(k == 1) {
                var newMatBuff: [4]f32 = undefined;
                newMatBuff[0] = self.items[0].x2;
                newMatBuff[1] = self.items[1].x2;
                newMatBuff[2] = self.items[2].x2;
                newMatBuff[3] = self.items[3].x2;
                k = k + 1;
                try matrix.append(&newMatBuff);
                std.debug.print("Mat buff k=1: {any}\n", .{newMatBuff});
            }

            if(k == 2) {
                var newMatBuff: [4]f32 = undefined;
                newMatBuff[0] = self.items[0].x3;
                newMatBuff[1] = self.items[1].x3;
                newMatBuff[2] = self.items[2].x3;
                newMatBuff[3] = self.items[3].x3;
                k = k + 1;
                std.debug.print("Mat buff k=2: {any}\n", .{newMatBuff});
                try matrix.append(&newMatBuff);
            }

            if(k == 3) {
                var newMatBuff: [4]f32 = undefined;
                newMatBuff[0] = self.items[0].x4;
                newMatBuff[1] = self.items[1].x4;
                newMatBuff[2] = self.items[2].x4;
                newMatBuff[3] = self.items[3].x4;
                k = k + 1;
                std.debug.print("Mat buff k=3: {any}\n", .{newMatBuff});
                try matrix.append(&newMatBuff);
            }
        }

        
    }
};

fn buildVect2(v: Vect) void {
    l2.items[0] = v.x1;
    l2.items[1] = v.x2;
    l2.len = l2.items.len;
}

fn buildVect3(v: Vect) void {
    l3.items[0] = v.x1;
    l3.items[1] = v.x2;
    l3.items[2] = v.x3;
    l3.len = l3.items.len;
}

fn buildVect4(v: Vect) !void {
    l4.items[0] = v.x1;
    l4.items[1] = v.x2;
    l4.items[2] = v.x3;
    l4.items[3] = v.x4;
    l4.len = l4.items.len;

    var b4items = try b4_items.init(0);
    std.debug.print("Checking de b4 : {}\n", .{b4items});
    try b4items.append(l4.items);
    std.debug.print("New checking of b4 : {}\n", .{b4items});
}

fn buildVect5(v: Vect) void {
    l5.items[0] = v.x1;
    l5.items[1] = v.x2;
    l5.items[2] = v.x3;
    l5.items[3] = v.x4;
    l5.items[4] = v.x5;
    l5.len = l4.items.len;
}

fn buildVect6(v: Vect) void {
    l6.items[0] = v.x1;
    l6.items[1] = v.x2;
    l6.items[2] = v.x3;
    l6.items[3] = v.x4;
    l6.items[4] = v.x5;
    l6.items[5] = v.x6;
    l6.len = l6.items.len;
}

fn buildVect7(v: Vect) void {
    l7.items[0] = v.x1;
    l7.items[1] = v.x2;
    l7.items[2] = v.x3;
    l7.items[3] = v.x4;
    l7.items[4] = v.x5;
    l7.items[5] = v.x6;
    l7.items[6] = v.x7;
    l7.len = l7.items.len;
}

fn List(comptime T: type) type {
    return struct {
        items: []T,
        len: usize,
    };
}

test "Vect builder" {
    const v = Vect.init4(1.0, 0.0, 4.0, -1.0);
    const v2 = Vect.init2(1.0, 0.0);
    const v3 = Vect.init3(1.0, 0.0, 2.1);
    try buildVect4(v);
    buildVect2(v2);
    try v3.build();

    try std.testing.expect(v3.x1 == l3.items[0]);
}

test "Push vector in Tensor" {
    const v = Vect.init4(1.0, 0.0, 4.0, -1.0);
    const s = v.size();
    std.debug.print("My Size vector : {}\n", .{s});
    var b: [4]Vect = undefined;
    b[0] = v;
    const t = Tensor.init(&b, 1);
    std.debug.print("My Size tensor : {}\n", .{t.l});
    const v2 = Vect.init4(1.0, 2.0, 1.0, -1.0);
    try t.push(v2);
    std.debug.print("My tensors : {any}\n", .{t.items});
    try std.testing.expect(t.l == 2);
}

test "Lists" {
    // The generic List data structure can be instantiated by passing in a type:
    var buf: [10]Vect = undefined;
    var list = List(Vect){
        .items = &buf,
        .len = 0,
    };
    list.items[0] = Vect.init2(1.0, 0.0);
    list.len = list.len + 1;
    try testing.expect(list.len == 1);
}

test "build" {
    const v2 = Vect.init2(1.0, 0.0);
    const v3 = Vect.init3(1.0, 0.0, 4.0);
    try testing.expect(v2.x1 == 1.0);
    try testing.expect(v3.x3 == 4.0); 
}