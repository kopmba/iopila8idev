const std = @import("std");

var map = StringHashMap([]const u8).init(std.heap.page_allocator);
map.deinit();

//return detectProblems(seq,key) catch |err| {

const dst1 = 
	\\pub const #sname = struct {
	\\  #props
	\\  #methods
	\\}

const dst2 = 
	\\const #sname = struct {
	\\  #props
	\\  #methods
	\\}

const du1 = 
	\\pub const #uname = struct {
	\\  #props
	\\  #methods
	\\}

const du2 = 
	\\const #uname = struct {
	\\  #props
	\\  #methods
	\\}

const de1 = 
	\\pub const #ename = struct {
	\\  #enums
	\\}

const de2 = 
	\\const #uname = struct {
	\\  #enums
	\\}

const deu1 = 
	\\pub const #uename = struct {
	\\  #props
	\\  #methods
	\\}

const deu2 = 
	\\const #uename = struct {
	\\  #props
	\\  #methods
	\\}

const dfn1 =
	\\pub fn #fname(#params) {
	\\  #decls
	\\  return struct {
	\\    #iprops
	\\    #methods
	\\  }
	\\}

const dfn2 =
	\\fn #fname(#params) {
	\\  #decls
	\\  return struct {
	\\    #iprops
	\\    #methods
	\\  }
	\\}

const loopfor1 =
	\\for(#list) |#singles| {
	\\  #body
	\\}

const loopfor2 =
	\\inline for(#list) |#singles| {
	\\  #body
	\\}

const loopwhile1 =
	\\while(#condition):(#incr) {
	\\  #body
	\\}

const loopwhile2 =
	\\while(#condition) {
	\\  #body
	\\}

const switch1 =
	\\switch(#eval) {
	\\  #body
	\\}

const switch2 =
	\\const #decl = switch(#value) {
	\\  #body
	\\}

const if1 =
	\\if(#condition) {
	\\  #body
	\\}

const if2 =
	\\if(#condition) {
	\\  #body
	\\} else {
	\\  #body
	\\}

const if3 =
	\\if(#condition) {
	\\  #body
	\\} else if {
	\\  #body
	\\} else {
	\\  #body
	\\}

const if4 =
	\\if(#condition) {
	\\  #body
	\\} else if[n] {
	\\  #body
	\\} else {
	\\  #body
	\\}

const method1 =
	\\pub fn #fname(#params) #type {
	\\  #body
	\\}

const keys = .{
	dst1,dst2,dfn1,dfn2,loopfor1,loopfor2,loopwhile1,loopwhile2,switch,if1,if2,if3,if4
};

const values = .{
	my values
};

fn build() {
	for(keys, values) |key, value| {
		map.put(key,value);
	}
}

const prototype = enum {
	fn = "fn #fname(#params) #type",
	pfn = "pub fn #fname(#params) #type",
	dfn = "const #decl = fn(#params)",
	paFn = "#decl: fn(#params)",
	decl1 = "const #decl = #value",
	decl2 = "const #decl:#type = #value",
	decl3 = "var #decl = #value",
	decl4 = "var #decl:#type = #value",
	eqlSeq = "mem.eqlBytes(a,b)",
	indexOf = "mem.indexOf(t,b,c)",
	eql = "a == b",
	st1 = "a < b",
	st2 = "a <= b",
	gt1 = "a > b",
	gt2 = "a >= b",
	struct1 = "pub const #decl = struct",
	struct2 = "const #decl = struct",
	try = "try #value",
	sw1 = "#eval => #value,
	sw2 = "#eval => #decl = #value,
}
