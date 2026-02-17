var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/toposort/index.js
var require_toposort = __commonJS({
  "node_modules/toposort/index.js"(exports, module) {
    module.exports = function(edges) {
      return toposort2(uniqueNodes(edges), edges);
    };
    module.exports.array = toposort2;
    function toposort2(nodes, edges) {
      var cursor = nodes.length, sorted = new Array(cursor), visited = {}, i2 = cursor, outgoingEdges = makeOutgoingEdges(edges), nodesHash = makeNodesHash(nodes);
      edges.forEach(function(edge) {
        if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
          throw new Error("Unknown node. There is an unknown node in the supplied edges.");
        }
      });
      while (i2--) {
        if (!visited[i2]) visit(nodes[i2], i2, /* @__PURE__ */ new Set());
      }
      return sorted;
      function visit(node, i3, predecessors) {
        if (predecessors.has(node)) {
          var nodeRep;
          try {
            nodeRep = ", node was:" + JSON.stringify(node);
          } catch (e) {
            nodeRep = "";
          }
          throw new Error("Cyclic dependency" + nodeRep);
        }
        if (!nodesHash.has(node)) {
          throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(node));
        }
        if (visited[i3]) return;
        visited[i3] = true;
        var outgoing = outgoingEdges.get(node) || /* @__PURE__ */ new Set();
        outgoing = Array.from(outgoing);
        if (i3 = outgoing.length) {
          predecessors.add(node);
          do {
            var child = outgoing[--i3];
            visit(child, nodesHash.get(child), predecessors);
          } while (i3);
          predecessors.delete(node);
        }
        sorted[--cursor] = node;
      }
    }
    function uniqueNodes(arr) {
      var res = /* @__PURE__ */ new Set();
      for (var i2 = 0, len = arr.length; i2 < len; i2++) {
        var edge = arr[i2];
        res.add(edge[0]);
        res.add(edge[1]);
      }
      return Array.from(res);
    }
    function makeOutgoingEdges(arr) {
      var edges = /* @__PURE__ */ new Map();
      for (var i2 = 0, len = arr.length; i2 < len; i2++) {
        var edge = arr[i2];
        if (!edges.has(edge[0])) edges.set(edge[0], /* @__PURE__ */ new Set());
        if (!edges.has(edge[1])) edges.set(edge[1], /* @__PURE__ */ new Set());
        edges.get(edge[0]).add(edge[1]);
      }
      return edges;
    }
    function makeNodesHash(arr) {
      var res = /* @__PURE__ */ new Map();
      for (var i2 = 0, len = arr.length; i2 < len; i2++) {
        res.set(arr[i2], i2);
      }
      return res;
    }
  }
});

// node_modules/@bufbuild/protobuf/dist/esm/private/assert.js
function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}
var FLOAT32_MAX = 34028234663852886e22;
var FLOAT32_MIN = -34028234663852886e22;
var UINT32_MAX = 4294967295;
var INT32_MAX = 2147483647;
var INT32_MIN = -2147483648;
function assertInt32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid int 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
    throw new Error("invalid int 32: " + arg);
}
function assertUInt32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid uint 32: " + typeof arg);
  if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
    throw new Error("invalid uint 32: " + arg);
}
function assertFloat32(arg) {
  if (typeof arg !== "number")
    throw new Error("invalid float 32: " + typeof arg);
  if (!Number.isFinite(arg))
    return;
  if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
    throw new Error("invalid float 32: " + arg);
}

// node_modules/@bufbuild/protobuf/dist/esm/private/enum.js
var enumTypeSymbol = /* @__PURE__ */ Symbol("@bufbuild/protobuf/enum-type");
function getEnumType(enumObject) {
  const t2 = enumObject[enumTypeSymbol];
  assert(t2, "missing enum type on enum object");
  return t2;
}
function setEnumType(enumObject, typeName, values, opt) {
  enumObject[enumTypeSymbol] = makeEnumType(typeName, values.map((v8) => ({
    no: v8.no,
    name: v8.name,
    localName: enumObject[v8.no]
  })), opt);
}
function makeEnumType(typeName, values, _opt) {
  const names = /* @__PURE__ */ Object.create(null);
  const numbers = /* @__PURE__ */ Object.create(null);
  const normalValues = [];
  for (const value of values) {
    const n3 = normalizeEnumValue(value);
    normalValues.push(n3);
    names[value.name] = n3;
    numbers[value.no] = n3;
  }
  return {
    typeName,
    values: normalValues,
    // We do not surface options at this time
    // options: opt?.options ?? Object.create(null),
    findName(name) {
      return names[name];
    },
    findNumber(no) {
      return numbers[no];
    }
  };
}
function makeEnum(typeName, values, opt) {
  const enumObject = {};
  for (const value of values) {
    const n3 = normalizeEnumValue(value);
    enumObject[n3.localName] = n3.no;
    enumObject[n3.no] = n3.localName;
  }
  setEnumType(enumObject, typeName, values, opt);
  return enumObject;
}
function normalizeEnumValue(value) {
  if ("localName" in value) {
    return value;
  }
  return Object.assign(Object.assign({}, value), { localName: value.name });
}

// node_modules/@bufbuild/protobuf/dist/esm/message.js
var Message = class {
  /**
   * Compare with a message of the same type.
   * Note that this function disregards extensions and unknown fields.
   */
  equals(other) {
    return this.getType().runtime.util.equals(this.getType(), this, other);
  }
  /**
   * Create a deep copy.
   */
  clone() {
    return this.getType().runtime.util.clone(this);
  }
  /**
   * Parse from binary data, merging fields.
   *
   * Repeated fields are appended. Map entries are added, overwriting
   * existing keys.
   *
   * If a message field is already present, it will be merged with the
   * new data.
   */
  fromBinary(bytes, options) {
    const type = this.getType(), format = type.runtime.bin, opt = format.makeReadOptions(options);
    format.readMessage(this, opt.readerFactory(bytes), bytes.byteLength, opt);
    return this;
  }
  /**
   * Parse a message from a JSON value.
   */
  fromJson(jsonValue, options) {
    const type = this.getType(), format = type.runtime.json, opt = format.makeReadOptions(options);
    format.readMessage(type, jsonValue, opt, this);
    return this;
  }
  /**
   * Parse a message from a JSON string.
   */
  fromJsonString(jsonString, options) {
    let json;
    try {
      json = JSON.parse(jsonString);
    } catch (e) {
      throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${e instanceof Error ? e.message : String(e)}`);
    }
    return this.fromJson(json, options);
  }
  /**
   * Serialize the message to binary data.
   */
  toBinary(options) {
    const type = this.getType(), bin = type.runtime.bin, opt = bin.makeWriteOptions(options), writer = opt.writerFactory();
    bin.writeMessage(this, writer, opt);
    return writer.finish();
  }
  /**
   * Serialize the message to a JSON value, a JavaScript value that can be
   * passed to JSON.stringify().
   */
  toJson(options) {
    const type = this.getType(), json = type.runtime.json, opt = json.makeWriteOptions(options);
    return json.writeMessage(this, opt);
  }
  /**
   * Serialize the message to a JSON string.
   */
  toJsonString(options) {
    var _a3;
    const value = this.toJson(options);
    return JSON.stringify(value, null, (_a3 = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a3 !== void 0 ? _a3 : 0);
  }
  /**
   * Override for serialization behavior. This will be invoked when calling
   * JSON.stringify on this message (i.e. JSON.stringify(msg)).
   *
   * Note that this will not serialize google.protobuf.Any with a packed
   * message because the protobuf JSON format specifies that it needs to be
   * unpacked, and this is only possible with a type registry to look up the
   * message type.  As a result, attempting to serialize a message with this
   * type will throw an Error.
   *
   * This method is protected because you should not need to invoke it
   * directly -- instead use JSON.stringify or toJsonString for
   * stringified JSON.  Alternatively, if actual JSON is desired, you should
   * use toJson.
   */
  toJSON() {
    return this.toJson({
      emitDefaultValues: true
    });
  }
  /**
   * Retrieve the MessageType of this message - a singleton that represents
   * the protobuf message declaration and provides metadata for reflection-
   * based operations.
   */
  getType() {
    return Object.getPrototypeOf(this).constructor;
  }
};

// node_modules/@bufbuild/protobuf/dist/esm/private/message-type.js
function makeMessageType(runtime, typeName, fields, opt) {
  var _a3;
  const localName = (_a3 = opt === null || opt === void 0 ? void 0 : opt.localName) !== null && _a3 !== void 0 ? _a3 : typeName.substring(typeName.lastIndexOf(".") + 1);
  const type = {
    [localName]: function(data2) {
      runtime.util.initFields(this);
      runtime.util.initPartial(data2, this);
    }
  }[localName];
  Object.setPrototypeOf(type.prototype, new Message());
  Object.assign(type, {
    runtime,
    typeName,
    fields: runtime.util.newFieldList(fields),
    fromBinary(bytes, options) {
      return new type().fromBinary(bytes, options);
    },
    fromJson(jsonValue, options) {
      return new type().fromJson(jsonValue, options);
    },
    fromJsonString(jsonString, options) {
      return new type().fromJsonString(jsonString, options);
    },
    equals(a4, b7) {
      return runtime.util.equals(type, a4, b7);
    }
  });
  return type;
}

// node_modules/@bufbuild/protobuf/dist/esm/google/varint.js
function varint64read() {
  let lowBits = 0;
  let highBits = 0;
  for (let shift = 0; shift < 28; shift += 7) {
    let b7 = this.buf[this.pos++];
    lowBits |= (b7 & 127) << shift;
    if ((b7 & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  let middleByte = this.buf[this.pos++];
  lowBits |= (middleByte & 15) << 28;
  highBits = (middleByte & 112) >> 4;
  if ((middleByte & 128) == 0) {
    this.assertBounds();
    return [lowBits, highBits];
  }
  for (let shift = 3; shift <= 31; shift += 7) {
    let b7 = this.buf[this.pos++];
    highBits |= (b7 & 127) << shift;
    if ((b7 & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
  }
  throw new Error("invalid varint");
}
function varint64write(lo, hi2, bytes) {
  for (let i2 = 0; i2 < 28; i2 = i2 + 7) {
    const shift = lo >>> i2;
    const hasNext = !(shift >>> 7 == 0 && hi2 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  const splitBits = lo >>> 28 & 15 | (hi2 & 7) << 4;
  const hasMoreBits = !(hi2 >> 3 == 0);
  bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
  if (!hasMoreBits) {
    return;
  }
  for (let i2 = 3; i2 < 31; i2 = i2 + 7) {
    const shift = hi2 >>> i2;
    const hasNext = !(shift >>> 7 == 0);
    const byte = (hasNext ? shift | 128 : shift) & 255;
    bytes.push(byte);
    if (!hasNext) {
      return;
    }
  }
  bytes.push(hi2 >>> 31 & 1);
}
var TWO_PWR_32_DBL = 4294967296;
function int64FromString(dec) {
  const minus = dec[0] === "-";
  if (minus) {
    dec = dec.slice(1);
  }
  const base = 1e6;
  let lowBits = 0;
  let highBits = 0;
  function add1e6digit(begin, end) {
    const digit1e6 = Number(dec.slice(begin, end));
    highBits *= base;
    lowBits = lowBits * base + digit1e6;
    if (lowBits >= TWO_PWR_32_DBL) {
      highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
      lowBits = lowBits % TWO_PWR_32_DBL;
    }
  }
  add1e6digit(-24, -18);
  add1e6digit(-18, -12);
  add1e6digit(-12, -6);
  add1e6digit(-6);
  return minus ? negate(lowBits, highBits) : newBits(lowBits, highBits);
}
function int64ToString(lo, hi2) {
  let bits = newBits(lo, hi2);
  const negative = bits.hi & 2147483648;
  if (negative) {
    bits = negate(bits.lo, bits.hi);
  }
  const result = uInt64ToString(bits.lo, bits.hi);
  return negative ? "-" + result : result;
}
function uInt64ToString(lo, hi2) {
  ({ lo, hi: hi2 } = toUnsigned(lo, hi2));
  if (hi2 <= 2097151) {
    return String(TWO_PWR_32_DBL * hi2 + lo);
  }
  const low = lo & 16777215;
  const mid = (lo >>> 24 | hi2 << 8) & 16777215;
  const high = hi2 >> 16 & 65535;
  let digitA = low + mid * 6777216 + high * 6710656;
  let digitB = mid + high * 8147497;
  let digitC = high * 2;
  const base = 1e7;
  if (digitA >= base) {
    digitB += Math.floor(digitA / base);
    digitA %= base;
  }
  if (digitB >= base) {
    digitC += Math.floor(digitB / base);
    digitB %= base;
  }
  return digitC.toString() + decimalFrom1e7WithLeadingZeros(digitB) + decimalFrom1e7WithLeadingZeros(digitA);
}
function toUnsigned(lo, hi2) {
  return { lo: lo >>> 0, hi: hi2 >>> 0 };
}
function newBits(lo, hi2) {
  return { lo: lo | 0, hi: hi2 | 0 };
}
function negate(lowBits, highBits) {
  highBits = ~highBits;
  if (lowBits) {
    lowBits = ~lowBits + 1;
  } else {
    highBits += 1;
  }
  return newBits(lowBits, highBits);
}
var decimalFrom1e7WithLeadingZeros = (digit1e7) => {
  const partial = String(digit1e7);
  return "0000000".slice(partial.length) + partial;
};
function varint32write(value, bytes) {
  if (value >= 0) {
    while (value > 127) {
      bytes.push(value & 127 | 128);
      value = value >>> 7;
    }
    bytes.push(value);
  } else {
    for (let i2 = 0; i2 < 9; i2++) {
      bytes.push(value & 127 | 128);
      value = value >> 7;
    }
    bytes.push(1);
  }
}
function varint32read() {
  let b7 = this.buf[this.pos++];
  let result = b7 & 127;
  if ((b7 & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b7 = this.buf[this.pos++];
  result |= (b7 & 127) << 7;
  if ((b7 & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b7 = this.buf[this.pos++];
  result |= (b7 & 127) << 14;
  if ((b7 & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b7 = this.buf[this.pos++];
  result |= (b7 & 127) << 21;
  if ((b7 & 128) == 0) {
    this.assertBounds();
    return result;
  }
  b7 = this.buf[this.pos++];
  result |= (b7 & 15) << 28;
  for (let readBytes = 5; (b7 & 128) !== 0 && readBytes < 10; readBytes++)
    b7 = this.buf[this.pos++];
  if ((b7 & 128) != 0)
    throw new Error("invalid varint");
  this.assertBounds();
  return result >>> 0;
}

// node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
function makeInt64Support() {
  const dv = new DataView(new ArrayBuffer(8));
  const ok = typeof BigInt === "function" && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function" && true;
  if (ok) {
    const MIN = BigInt("-9223372036854775808"), MAX = BigInt("9223372036854775807"), UMIN = BigInt("0"), UMAX = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: true,
      parse(value) {
        const bi2 = typeof value == "bigint" ? value : BigInt(value);
        if (bi2 > MAX || bi2 < MIN) {
          throw new Error(`int64 invalid: ${value}`);
        }
        return bi2;
      },
      uParse(value) {
        const bi2 = typeof value == "bigint" ? value : BigInt(value);
        if (bi2 > UMAX || bi2 < UMIN) {
          throw new Error(`uint64 invalid: ${value}`);
        }
        return bi2;
      },
      enc(value) {
        dv.setBigInt64(0, this.parse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      uEnc(value) {
        dv.setBigInt64(0, this.uParse(value), true);
        return {
          lo: dv.getInt32(0, true),
          hi: dv.getInt32(4, true)
        };
      },
      dec(lo, hi2) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi2, true);
        return dv.getBigInt64(0, true);
      },
      uDec(lo, hi2) {
        dv.setInt32(0, lo, true);
        dv.setInt32(4, hi2, true);
        return dv.getBigUint64(0, true);
      }
    };
  }
  const assertInt64String = (value) => assert(/^-?[0-9]+$/.test(value), `int64 invalid: ${value}`);
  const assertUInt64String = (value) => assert(/^[0-9]+$/.test(value), `uint64 invalid: ${value}`);
  return {
    zero: "0",
    supported: false,
    parse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return value;
    },
    uParse(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return value;
    },
    enc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertInt64String(value);
      return int64FromString(value);
    },
    uEnc(value) {
      if (typeof value != "string") {
        value = value.toString();
      }
      assertUInt64String(value);
      return int64FromString(value);
    },
    dec(lo, hi2) {
      return int64ToString(lo, hi2);
    },
    uDec(lo, hi2) {
      return uInt64ToString(lo, hi2);
    }
  };
}
var protoInt64 = makeInt64Support();

// node_modules/@bufbuild/protobuf/dist/esm/scalar.js
var ScalarType;
(function(ScalarType2) {
  ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
  ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
  ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
  ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
  ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
  ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
  ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
  ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
  ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
  ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
  ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
  ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
  ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
  ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
  ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
var LongType;
(function(LongType2) {
  LongType2[LongType2["BIGINT"] = 0] = "BIGINT";
  LongType2[LongType2["STRING"] = 1] = "STRING";
})(LongType || (LongType = {}));

// node_modules/@bufbuild/protobuf/dist/esm/private/scalars.js
function scalarEquals(type, a4, b7) {
  if (a4 === b7) {
    return true;
  }
  if (type == ScalarType.BYTES) {
    if (!(a4 instanceof Uint8Array) || !(b7 instanceof Uint8Array)) {
      return false;
    }
    if (a4.length !== b7.length) {
      return false;
    }
    for (let i2 = 0; i2 < a4.length; i2++) {
      if (a4[i2] !== b7[i2]) {
        return false;
      }
    }
    return true;
  }
  switch (type) {
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return a4 == b7;
  }
  return false;
}
function scalarZeroValue(type, longType) {
  switch (type) {
    case ScalarType.BOOL:
      return false;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      return longType == 0 ? protoInt64.zero : "0";
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      return 0;
    case ScalarType.BYTES:
      return new Uint8Array(0);
    case ScalarType.STRING:
      return "";
    default:
      return 0;
  }
}
function isScalarZeroValue(type, value) {
  switch (type) {
    case ScalarType.BOOL:
      return value === false;
    case ScalarType.STRING:
      return value === "";
    case ScalarType.BYTES:
      return value instanceof Uint8Array && !value.byteLength;
    default:
      return value == 0;
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/binary-encoding.js
var WireType;
(function(WireType2) {
  WireType2[WireType2["Varint"] = 0] = "Varint";
  WireType2[WireType2["Bit64"] = 1] = "Bit64";
  WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
  WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
  WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
  WireType2[WireType2["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));
var BinaryWriter = class {
  constructor(textEncoder) {
    this.stack = [];
    this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
    this.chunks = [];
    this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.chunks.push(new Uint8Array(this.buf));
    let len = 0;
    for (let i2 = 0; i2 < this.chunks.length; i2++)
      len += this.chunks[i2].length;
    let bytes = new Uint8Array(len);
    let offset = 0;
    for (let i2 = 0; i2 < this.chunks.length; i2++) {
      bytes.set(this.chunks[i2], offset);
      offset += this.chunks[i2].length;
    }
    this.chunks = [];
    return bytes;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    this.stack.push({ chunks: this.chunks, buf: this.buf });
    this.chunks = [];
    this.buf = [];
    return this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let chunk = this.finish();
    let prev = this.stack.pop();
    if (!prev)
      throw new Error("invalid state, fork stack empty");
    this.chunks = prev.chunks;
    this.buf = prev.buf;
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(fieldNo, type) {
    return this.uint32((fieldNo << 3 | type) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(chunk) {
    if (this.buf.length) {
      this.chunks.push(new Uint8Array(this.buf));
      this.buf = [];
    }
    this.chunks.push(chunk);
    return this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(value) {
    assertUInt32(value);
    while (value > 127) {
      this.buf.push(value & 127 | 128);
      value = value >>> 7;
    }
    this.buf.push(value);
    return this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(value) {
    assertInt32(value);
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(value) {
    this.buf.push(value ? 1 : 0);
    return this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(value) {
    this.uint32(value.byteLength);
    return this.raw(value);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(value) {
    let chunk = this.textEncoder.encode(value);
    this.uint32(chunk.byteLength);
    return this.raw(chunk);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(value) {
    assertFloat32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setFloat32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(value) {
    let chunk = new Uint8Array(8);
    new DataView(chunk.buffer).setFloat64(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(value) {
    assertUInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setUint32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(value) {
    assertInt32(value);
    let chunk = new Uint8Array(4);
    new DataView(chunk.buffer).setInt32(0, value, true);
    return this.raw(chunk);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(value) {
    assertInt32(value);
    value = (value << 1 ^ value >> 31) >>> 0;
    varint32write(value, this.buf);
    return this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.enc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(value) {
    let chunk = new Uint8Array(8), view = new DataView(chunk.buffer), tc = protoInt64.uEnc(value);
    view.setInt32(0, tc.lo, true);
    view.setInt32(4, tc.hi, true);
    return this.raw(chunk);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(value) {
    let tc = protoInt64.enc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(value) {
    let tc = protoInt64.enc(value), sign = tc.hi >> 31, lo = tc.lo << 1 ^ sign, hi2 = (tc.hi << 1 | tc.lo >>> 31) ^ sign;
    varint64write(lo, hi2, this.buf);
    return this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(value) {
    let tc = protoInt64.uEnc(value);
    varint64write(tc.lo, tc.hi, this.buf);
    return this;
  }
};
var BinaryReader = class {
  constructor(buf, textDecoder) {
    this.varint64 = varint64read;
    this.uint32 = varint32read;
    this.buf = buf;
    this.len = buf.length;
    this.pos = 0;
    this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder();
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
    if (fieldNo <= 0 || wireType < 0 || wireType > 5)
      throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
    return [fieldNo, wireType];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(wireType, fieldNo) {
    let start = this.pos;
    switch (wireType) {
      case WireType.Varint:
        while (this.buf[this.pos++] & 128) {
        }
        break;
      // eslint-disable-next-line
      // @ts-ignore TS7029: Fallthrough case in switch
      case WireType.Bit64:
        this.pos += 4;
      // eslint-disable-next-line
      // @ts-ignore TS7029: Fallthrough case in switch
      case WireType.Bit32:
        this.pos += 4;
        break;
      case WireType.LengthDelimited:
        let len = this.uint32();
        this.pos += len;
        break;
      case WireType.StartGroup:
        for (; ; ) {
          const [fn4, wt6] = this.tag();
          if (wt6 === WireType.EndGroup) {
            if (fieldNo !== void 0 && fn4 !== fieldNo) {
              throw new Error("invalid end group tag");
            }
            break;
          }
          this.skip(wt6, fn4);
        }
        break;
      default:
        throw new Error("cant skip wire type " + wireType);
    }
    this.assertBounds();
    return this.buf.subarray(start, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let zze = this.uint32();
    return zze >>> 1 ^ -(zze & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return protoInt64.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return protoInt64.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [lo, hi2] = this.varint64();
    let s3 = -(lo & 1);
    lo = (lo >>> 1 | (hi2 & 1) << 31) ^ s3;
    hi2 = hi2 >>> 1 ^ s3;
    return protoInt64.dec(lo, hi2);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [lo, hi2] = this.varint64();
    return lo !== 0 || hi2 !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return protoInt64.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return protoInt64.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, true);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, true);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let len = this.uint32(), start = this.pos;
    this.pos += len;
    this.assertBounds();
    return this.buf.subarray(start, start + len);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.textDecoder.decode(this.bytes());
  }
};

// node_modules/@bufbuild/protobuf/dist/esm/private/extensions.js
function makeExtension(runtime, typeName, extendee, field) {
  let fi2;
  return {
    typeName,
    extendee,
    get field() {
      if (!fi2) {
        const i2 = typeof field == "function" ? field() : field;
        i2.name = typeName.split(".").pop();
        i2.jsonName = `[${typeName}]`;
        fi2 = runtime.util.newFieldList([i2]).list()[0];
      }
      return fi2;
    },
    runtime
  };
}
function createExtensionContainer(extension) {
  const localName = extension.field.localName;
  const container = /* @__PURE__ */ Object.create(null);
  container[localName] = initExtensionField(extension);
  return [container, () => container[localName]];
}
function initExtensionField(ext) {
  const field = ext.field;
  if (field.repeated) {
    return [];
  }
  if (field.default !== void 0) {
    return field.default;
  }
  switch (field.kind) {
    case "enum":
      return field.T.values[0].no;
    case "scalar":
      return scalarZeroValue(field.T, field.L);
    case "message":
      const T7 = field.T, value = new T7();
      return T7.fieldWrapper ? T7.fieldWrapper.unwrapField(value) : value;
    case "map":
      throw "map fields are not allowed to be extensions";
  }
}
function filterUnknownFields(unknownFields, field) {
  if (!field.repeated && (field.kind == "enum" || field.kind == "scalar")) {
    for (let i2 = unknownFields.length - 1; i2 >= 0; --i2) {
      if (unknownFields[i2].no == field.no) {
        return [unknownFields[i2]];
      }
    }
    return [];
  }
  return unknownFields.filter((uf) => uf.no === field.no);
}

// node_modules/@bufbuild/protobuf/dist/esm/proto-base64.js
var encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
var decTable = [];
for (let i2 = 0; i2 < encTable.length; i2++)
  decTable[encTable[i2].charCodeAt(0)] = i2;
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");
var protoBase64 = {
  /**
   * Decodes a base64 string to a byte array.
   *
   * - ignores white-space, including line breaks and tabs
   * - allows inner padding (can decode concatenated base64 strings)
   * - does not require padding
   * - understands base64url encoding:
   *   "-" instead of "+",
   *   "_" instead of "/",
   *   no padding
   */
  dec(base64Str) {
    let es2 = base64Str.length * 3 / 4;
    if (base64Str[base64Str.length - 2] == "=")
      es2 -= 2;
    else if (base64Str[base64Str.length - 1] == "=")
      es2 -= 1;
    let bytes = new Uint8Array(es2), bytePos = 0, groupPos = 0, b7, p5 = 0;
    for (let i2 = 0; i2 < base64Str.length; i2++) {
      b7 = decTable[base64Str.charCodeAt(i2)];
      if (b7 === void 0) {
        switch (base64Str[i2]) {
          // @ts-ignore TS7029: Fallthrough case in switch
          case "=":
            groupPos = 0;
          // reset state when padding found
          // @ts-ignore TS7029: Fallthrough case in switch
          case "\n":
          case "\r":
          case "	":
          case " ":
            continue;
          // skip white-space, and padding
          default:
            throw Error("invalid base64 string.");
        }
      }
      switch (groupPos) {
        case 0:
          p5 = b7;
          groupPos = 1;
          break;
        case 1:
          bytes[bytePos++] = p5 << 2 | (b7 & 48) >> 4;
          p5 = b7;
          groupPos = 2;
          break;
        case 2:
          bytes[bytePos++] = (p5 & 15) << 4 | (b7 & 60) >> 2;
          p5 = b7;
          groupPos = 3;
          break;
        case 3:
          bytes[bytePos++] = (p5 & 3) << 6 | b7;
          groupPos = 0;
          break;
      }
    }
    if (groupPos == 1)
      throw Error("invalid base64 string.");
    return bytes.subarray(0, bytePos);
  },
  /**
   * Encode a byte array to a base64 string.
   */
  enc(bytes) {
    let base64 = "", groupPos = 0, b7, p5 = 0;
    for (let i2 = 0; i2 < bytes.length; i2++) {
      b7 = bytes[i2];
      switch (groupPos) {
        case 0:
          base64 += encTable[b7 >> 2];
          p5 = (b7 & 3) << 4;
          groupPos = 1;
          break;
        case 1:
          base64 += encTable[p5 | b7 >> 4];
          p5 = (b7 & 15) << 2;
          groupPos = 2;
          break;
        case 2:
          base64 += encTable[p5 | b7 >> 6];
          base64 += encTable[b7 & 63];
          groupPos = 0;
          break;
      }
    }
    if (groupPos) {
      base64 += encTable[p5];
      base64 += "=";
      if (groupPos == 1)
        base64 += "=";
    }
    return base64;
  }
};

// node_modules/@bufbuild/protobuf/dist/esm/extension-accessor.js
function getExtension(message, extension, options) {
  assertExtendee(extension, message);
  const opt = extension.runtime.bin.makeReadOptions(options);
  const ufs = filterUnknownFields(message.getType().runtime.bin.listUnknownFields(message), extension.field);
  const [container, get] = createExtensionContainer(extension);
  for (const uf of ufs) {
    extension.runtime.bin.readField(container, opt.readerFactory(uf.data), extension.field, uf.wireType, opt);
  }
  return get();
}
function setExtension(message, extension, value, options) {
  assertExtendee(extension, message);
  const readOpt = extension.runtime.bin.makeReadOptions(options);
  const writeOpt = extension.runtime.bin.makeWriteOptions(options);
  if (hasExtension(message, extension)) {
    const ufs = message.getType().runtime.bin.listUnknownFields(message).filter((uf) => uf.no != extension.field.no);
    message.getType().runtime.bin.discardUnknownFields(message);
    for (const uf of ufs) {
      message.getType().runtime.bin.onUnknownField(message, uf.no, uf.wireType, uf.data);
    }
  }
  const writer = writeOpt.writerFactory();
  let f6 = extension.field;
  if (!f6.opt && !f6.repeated && (f6.kind == "enum" || f6.kind == "scalar")) {
    f6 = Object.assign(Object.assign({}, extension.field), { opt: true });
  }
  extension.runtime.bin.writeField(f6, value, writer, writeOpt);
  const reader = readOpt.readerFactory(writer.finish());
  while (reader.pos < reader.len) {
    const [no, wireType] = reader.tag();
    const data2 = reader.skip(wireType, no);
    message.getType().runtime.bin.onUnknownField(message, no, wireType, data2);
  }
}
function hasExtension(message, extension) {
  const messageType = message.getType();
  return extension.extendee.typeName === messageType.typeName && !!messageType.runtime.bin.listUnknownFields(message).find((uf) => uf.no == extension.field.no);
}
function assertExtendee(extension, message) {
  assert(extension.extendee.typeName == message.getType().typeName, `extension ${extension.typeName} can only be applied to message ${extension.extendee.typeName}`);
}

// node_modules/@bufbuild/protobuf/dist/esm/private/reflect.js
function isFieldSet(field, target) {
  const localName = field.localName;
  if (field.repeated) {
    return target[localName].length > 0;
  }
  if (field.oneof) {
    return target[field.oneof.localName].case === localName;
  }
  switch (field.kind) {
    case "enum":
    case "scalar":
      if (field.opt || field.req) {
        return target[localName] !== void 0;
      }
      if (field.kind == "enum") {
        return target[localName] !== field.T.values[0].no;
      }
      return !isScalarZeroValue(field.T, target[localName]);
    case "message":
      return target[localName] !== void 0;
    case "map":
      return Object.keys(target[localName]).length > 0;
  }
}
function clearField(field, target) {
  const localName = field.localName;
  const implicitPresence = !field.opt && !field.req;
  if (field.repeated) {
    target[localName] = [];
  } else if (field.oneof) {
    target[field.oneof.localName] = { case: void 0 };
  } else {
    switch (field.kind) {
      case "map":
        target[localName] = {};
        break;
      case "enum":
        target[localName] = implicitPresence ? field.T.values[0].no : void 0;
        break;
      case "scalar":
        target[localName] = implicitPresence ? scalarZeroValue(field.T, field.L) : void 0;
        break;
      case "message":
        target[localName] = void 0;
        break;
    }
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/is-message.js
function isMessage(arg, type) {
  if (arg === null || typeof arg != "object") {
    return false;
  }
  if (!Object.getOwnPropertyNames(Message.prototype).every((m4) => m4 in arg && typeof arg[m4] == "function")) {
    return false;
  }
  const actualType = arg.getType();
  if (actualType === null || typeof actualType != "function" || !("typeName" in actualType) || typeof actualType.typeName != "string") {
    return false;
  }
  return type === void 0 ? true : actualType.typeName == type.typeName;
}

// node_modules/@bufbuild/protobuf/dist/esm/private/field-wrapper.js
function wrapField(type, value) {
  if (isMessage(value) || !type.fieldWrapper) {
    return value;
  }
  return type.fieldWrapper.wrapField(value);
}
var wktWrapperToScalarType = {
  "google.protobuf.DoubleValue": ScalarType.DOUBLE,
  "google.protobuf.FloatValue": ScalarType.FLOAT,
  "google.protobuf.Int64Value": ScalarType.INT64,
  "google.protobuf.UInt64Value": ScalarType.UINT64,
  "google.protobuf.Int32Value": ScalarType.INT32,
  "google.protobuf.UInt32Value": ScalarType.UINT32,
  "google.protobuf.BoolValue": ScalarType.BOOL,
  "google.protobuf.StringValue": ScalarType.STRING,
  "google.protobuf.BytesValue": ScalarType.BYTES
};

// node_modules/@bufbuild/protobuf/dist/esm/private/json-format.js
var jsonReadDefaults = {
  ignoreUnknownFields: false
};
var jsonWriteDefaults = {
  emitDefaultValues: false,
  enumAsInteger: false,
  useProtoFieldName: false,
  prettySpaces: 0
};
function makeReadOptions(options) {
  return options ? Object.assign(Object.assign({}, jsonReadDefaults), options) : jsonReadDefaults;
}
function makeWriteOptions(options) {
  return options ? Object.assign(Object.assign({}, jsonWriteDefaults), options) : jsonWriteDefaults;
}
var tokenNull = /* @__PURE__ */ Symbol();
var tokenIgnoredUnknownEnum = /* @__PURE__ */ Symbol();
function makeJsonFormat() {
  return {
    makeReadOptions,
    makeWriteOptions,
    readMessage(type, json, options, message) {
      if (json == null || Array.isArray(json) || typeof json != "object") {
        throw new Error(`cannot decode message ${type.typeName} from JSON: ${debugJsonValue(json)}`);
      }
      message = message !== null && message !== void 0 ? message : new type();
      const oneofSeen = /* @__PURE__ */ new Map();
      const registry = options.typeRegistry;
      for (const [jsonKey, jsonValue] of Object.entries(json)) {
        const field = type.fields.findJsonName(jsonKey);
        if (field) {
          if (field.oneof) {
            if (jsonValue === null && field.kind == "scalar") {
              continue;
            }
            const seen = oneofSeen.get(field.oneof);
            if (seen !== void 0) {
              throw new Error(`cannot decode message ${type.typeName} from JSON: multiple keys for oneof "${field.oneof.name}" present: "${seen}", "${jsonKey}"`);
            }
            oneofSeen.set(field.oneof, jsonKey);
          }
          readField(message, jsonValue, field, options, type);
        } else {
          let found = false;
          if ((registry === null || registry === void 0 ? void 0 : registry.findExtension) && jsonKey.startsWith("[") && jsonKey.endsWith("]")) {
            const ext = registry.findExtension(jsonKey.substring(1, jsonKey.length - 1));
            if (ext && ext.extendee.typeName == type.typeName) {
              found = true;
              const [container, get] = createExtensionContainer(ext);
              readField(container, jsonValue, ext.field, options, ext);
              setExtension(message, ext, get(), options);
            }
          }
          if (!found && !options.ignoreUnknownFields) {
            throw new Error(`cannot decode message ${type.typeName} from JSON: key "${jsonKey}" is unknown`);
          }
        }
      }
      return message;
    },
    writeMessage(message, options) {
      const type = message.getType();
      const json = {};
      let field;
      try {
        for (field of type.fields.byNumber()) {
          if (!isFieldSet(field, message)) {
            if (field.req) {
              throw `required field not set`;
            }
            if (!options.emitDefaultValues) {
              continue;
            }
            if (!canEmitFieldDefaultValue(field)) {
              continue;
            }
          }
          const value = field.oneof ? message[field.oneof.localName].value : message[field.localName];
          const jsonValue = writeField(field, value, options);
          if (jsonValue !== void 0) {
            json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
          }
        }
        const registry = options.typeRegistry;
        if (registry === null || registry === void 0 ? void 0 : registry.findExtensionFor) {
          for (const uf of type.runtime.bin.listUnknownFields(message)) {
            const ext = registry.findExtensionFor(type.typeName, uf.no);
            if (ext && hasExtension(message, ext)) {
              const value = getExtension(message, ext, options);
              const jsonValue = writeField(ext.field, value, options);
              if (jsonValue !== void 0) {
                json[ext.field.jsonName] = jsonValue;
              }
            }
          }
        }
      } catch (e) {
        const m4 = field ? `cannot encode field ${type.typeName}.${field.name} to JSON` : `cannot encode message ${type.typeName} to JSON`;
        const r2 = e instanceof Error ? e.message : String(e);
        throw new Error(m4 + (r2.length > 0 ? `: ${r2}` : ""));
      }
      return json;
    },
    readScalar(type, json, longType) {
      return readScalar(type, json, longType !== null && longType !== void 0 ? longType : LongType.BIGINT, true);
    },
    writeScalar(type, value, emitDefaultValues) {
      if (value === void 0) {
        return void 0;
      }
      if (emitDefaultValues || isScalarZeroValue(type, value)) {
        return writeScalar(type, value);
      }
      return void 0;
    },
    debug: debugJsonValue
  };
}
function debugJsonValue(json) {
  if (json === null) {
    return "null";
  }
  switch (typeof json) {
    case "object":
      return Array.isArray(json) ? "array" : "object";
    case "string":
      return json.length > 100 ? "string" : `"${json.split('"').join('\\"')}"`;
    default:
      return String(json);
  }
}
function readField(target, jsonValue, field, options, parentType) {
  let localName = field.localName;
  if (field.repeated) {
    assert(field.kind != "map");
    if (jsonValue === null) {
      return;
    }
    if (!Array.isArray(jsonValue)) {
      throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`);
    }
    const targetArray = target[localName];
    for (const jsonItem of jsonValue) {
      if (jsonItem === null) {
        throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonItem)}`);
      }
      switch (field.kind) {
        case "message":
          targetArray.push(field.T.fromJson(jsonItem, options));
          break;
        case "enum":
          const enumValue = readEnum(field.T, jsonItem, options.ignoreUnknownFields, true);
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetArray.push(enumValue);
          }
          break;
        case "scalar":
          try {
            targetArray.push(readScalar(field.T, jsonItem, field.L, true));
          } catch (e) {
            let m4 = `cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonItem)}`;
            if (e instanceof Error && e.message.length > 0) {
              m4 += `: ${e.message}`;
            }
            throw new Error(m4);
          }
          break;
      }
    }
  } else if (field.kind == "map") {
    if (jsonValue === null) {
      return;
    }
    if (typeof jsonValue != "object" || Array.isArray(jsonValue)) {
      throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`);
    }
    const targetMap = target[localName];
    for (const [jsonMapKey, jsonMapValue] of Object.entries(jsonValue)) {
      if (jsonMapValue === null) {
        throw new Error(`cannot decode field ${parentType.typeName}.${field.name} from JSON: map value null`);
      }
      let key;
      try {
        key = readMapKey(field.K, jsonMapKey);
      } catch (e) {
        let m4 = `cannot decode map key for field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`;
        if (e instanceof Error && e.message.length > 0) {
          m4 += `: ${e.message}`;
        }
        throw new Error(m4);
      }
      switch (field.V.kind) {
        case "message":
          targetMap[key] = field.V.T.fromJson(jsonMapValue, options);
          break;
        case "enum":
          const enumValue = readEnum(field.V.T, jsonMapValue, options.ignoreUnknownFields, true);
          if (enumValue !== tokenIgnoredUnknownEnum) {
            targetMap[key] = enumValue;
          }
          break;
        case "scalar":
          try {
            targetMap[key] = readScalar(field.V.T, jsonMapValue, LongType.BIGINT, true);
          } catch (e) {
            let m4 = `cannot decode map value for field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`;
            if (e instanceof Error && e.message.length > 0) {
              m4 += `: ${e.message}`;
            }
            throw new Error(m4);
          }
          break;
      }
    }
  } else {
    if (field.oneof) {
      target = target[field.oneof.localName] = { case: localName };
      localName = "value";
    }
    switch (field.kind) {
      case "message":
        const messageType = field.T;
        if (jsonValue === null && messageType.typeName != "google.protobuf.Value") {
          return;
        }
        let currentValue = target[localName];
        if (isMessage(currentValue)) {
          currentValue.fromJson(jsonValue, options);
        } else {
          target[localName] = currentValue = messageType.fromJson(jsonValue, options);
          if (messageType.fieldWrapper && !field.oneof) {
            target[localName] = messageType.fieldWrapper.unwrapField(currentValue);
          }
        }
        break;
      case "enum":
        const enumValue = readEnum(field.T, jsonValue, options.ignoreUnknownFields, false);
        switch (enumValue) {
          case tokenNull:
            clearField(field, target);
            break;
          case tokenIgnoredUnknownEnum:
            break;
          default:
            target[localName] = enumValue;
            break;
        }
        break;
      case "scalar":
        try {
          const scalarValue = readScalar(field.T, jsonValue, field.L, false);
          switch (scalarValue) {
            case tokenNull:
              clearField(field, target);
              break;
            default:
              target[localName] = scalarValue;
              break;
          }
        } catch (e) {
          let m4 = `cannot decode field ${parentType.typeName}.${field.name} from JSON: ${debugJsonValue(jsonValue)}`;
          if (e instanceof Error && e.message.length > 0) {
            m4 += `: ${e.message}`;
          }
          throw new Error(m4);
        }
        break;
    }
  }
}
function readMapKey(type, json) {
  if (type === ScalarType.BOOL) {
    switch (json) {
      case "true":
        json = true;
        break;
      case "false":
        json = false;
        break;
    }
  }
  return readScalar(type, json, LongType.BIGINT, true).toString();
}
function readScalar(type, json, longType, nullAsZeroValue) {
  if (json === null) {
    if (nullAsZeroValue) {
      return scalarZeroValue(type, longType);
    }
    return tokenNull;
  }
  switch (type) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
      if (json === "NaN")
        return Number.NaN;
      if (json === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (json === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (json === "") {
        break;
      }
      if (typeof json == "string" && json.trim().length !== json.length) {
        break;
      }
      if (typeof json != "string" && typeof json != "number") {
        break;
      }
      const float = Number(json);
      if (Number.isNaN(float)) {
        break;
      }
      if (!Number.isFinite(float)) {
        break;
      }
      if (type == ScalarType.FLOAT)
        assertFloat32(float);
      return float;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
      let int32;
      if (typeof json == "number")
        int32 = json;
      else if (typeof json == "string" && json.length > 0) {
        if (json.trim().length === json.length)
          int32 = Number(json);
      }
      if (int32 === void 0)
        break;
      if (type == ScalarType.UINT32 || type == ScalarType.FIXED32)
        assertUInt32(int32);
      else
        assertInt32(int32);
      return int32;
    // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      if (typeof json != "number" && typeof json != "string")
        break;
      const long = protoInt64.parse(json);
      return longType ? long.toString() : long;
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
      if (typeof json != "number" && typeof json != "string")
        break;
      const uLong = protoInt64.uParse(json);
      return longType ? uLong.toString() : uLong;
    // bool:
    case ScalarType.BOOL:
      if (typeof json !== "boolean")
        break;
      return json;
    // string:
    case ScalarType.STRING:
      if (typeof json !== "string") {
        break;
      }
      try {
        encodeURIComponent(json);
      } catch (e) {
        throw new Error("invalid UTF8");
      }
      return json;
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      if (json === "")
        return new Uint8Array(0);
      if (typeof json !== "string")
        break;
      return protoBase64.dec(json);
  }
  throw new Error();
}
function readEnum(type, json, ignoreUnknownFields, nullAsZeroValue) {
  if (json === null) {
    if (type.typeName == "google.protobuf.NullValue") {
      return 0;
    }
    return nullAsZeroValue ? type.values[0].no : tokenNull;
  }
  switch (typeof json) {
    case "number":
      if (Number.isInteger(json)) {
        return json;
      }
      break;
    case "string":
      const value = type.findName(json);
      if (value !== void 0) {
        return value.no;
      }
      if (ignoreUnknownFields) {
        return tokenIgnoredUnknownEnum;
      }
      break;
  }
  throw new Error(`cannot decode enum ${type.typeName} from JSON: ${debugJsonValue(json)}`);
}
function canEmitFieldDefaultValue(field) {
  if (field.repeated || field.kind == "map") {
    return true;
  }
  if (field.oneof) {
    return false;
  }
  if (field.kind == "message") {
    return false;
  }
  if (field.opt || field.req) {
    return false;
  }
  return true;
}
function writeField(field, value, options) {
  if (field.kind == "map") {
    assert(typeof value == "object" && value != null);
    const jsonObj = {};
    const entries = Object.entries(value);
    switch (field.V.kind) {
      case "scalar":
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = writeScalar(field.V.T, entryValue);
        }
        break;
      case "message":
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = entryValue.toJson(options);
        }
        break;
      case "enum":
        const enumType = field.V.T;
        for (const [entryKey, entryValue] of entries) {
          jsonObj[entryKey.toString()] = writeEnum(enumType, entryValue, options.enumAsInteger);
        }
        break;
    }
    return options.emitDefaultValues || entries.length > 0 ? jsonObj : void 0;
  }
  if (field.repeated) {
    assert(Array.isArray(value));
    const jsonArr = [];
    switch (field.kind) {
      case "scalar":
        for (let i2 = 0; i2 < value.length; i2++) {
          jsonArr.push(writeScalar(field.T, value[i2]));
        }
        break;
      case "enum":
        for (let i2 = 0; i2 < value.length; i2++) {
          jsonArr.push(writeEnum(field.T, value[i2], options.enumAsInteger));
        }
        break;
      case "message":
        for (let i2 = 0; i2 < value.length; i2++) {
          jsonArr.push(value[i2].toJson(options));
        }
        break;
    }
    return options.emitDefaultValues || jsonArr.length > 0 ? jsonArr : void 0;
  }
  switch (field.kind) {
    case "scalar":
      return writeScalar(field.T, value);
    case "enum":
      return writeEnum(field.T, value, options.enumAsInteger);
    case "message":
      return wrapField(field.T, value).toJson(options);
  }
}
function writeEnum(type, value, enumAsInteger) {
  var _a3;
  assert(typeof value == "number");
  if (type.typeName == "google.protobuf.NullValue") {
    return null;
  }
  if (enumAsInteger) {
    return value;
  }
  const val = type.findNumber(value);
  return (_a3 = val === null || val === void 0 ? void 0 : val.name) !== null && _a3 !== void 0 ? _a3 : value;
}
function writeScalar(type, value) {
  switch (type) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case ScalarType.INT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
      assert(typeof value == "number");
      return value;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case ScalarType.FLOAT:
    // assertFloat32(value);
    case ScalarType.DOUBLE:
      assert(typeof value == "number");
      if (Number.isNaN(value))
        return "NaN";
      if (value === Number.POSITIVE_INFINITY)
        return "Infinity";
      if (value === Number.NEGATIVE_INFINITY)
        return "-Infinity";
      return value;
    // string:
    case ScalarType.STRING:
      assert(typeof value == "string");
      return value;
    // bool:
    case ScalarType.BOOL:
      assert(typeof value == "boolean");
      return value;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
      assert(typeof value == "bigint" || typeof value == "string" || typeof value == "number");
      return value.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case ScalarType.BYTES:
      assert(value instanceof Uint8Array);
      return protoBase64.enc(value);
  }
}

// node_modules/@bufbuild/protobuf/dist/esm/private/binary-format.js
var unknownFieldsSymbol = /* @__PURE__ */ Symbol("@bufbuild/protobuf/unknown-fields");
var readDefaults = {
  readUnknownFields: true,
  readerFactory: (bytes) => new BinaryReader(bytes)
};
var writeDefaults = {
  writeUnknownFields: true,
  writerFactory: () => new BinaryWriter()
};
function makeReadOptions2(options) {
  return options ? Object.assign(Object.assign({}, readDefaults), options) : readDefaults;
}
function makeWriteOptions2(options) {
  return options ? Object.assign(Object.assign({}, writeDefaults), options) : writeDefaults;
}
function makeBinaryFormat() {
  return {
    makeReadOptions: makeReadOptions2,
    makeWriteOptions: makeWriteOptions2,
    listUnknownFields(message) {
      var _a3;
      return (_a3 = message[unknownFieldsSymbol]) !== null && _a3 !== void 0 ? _a3 : [];
    },
    discardUnknownFields(message) {
      delete message[unknownFieldsSymbol];
    },
    writeUnknownFields(message, writer) {
      const m4 = message;
      const c5 = m4[unknownFieldsSymbol];
      if (c5) {
        for (const f6 of c5) {
          writer.tag(f6.no, f6.wireType).raw(f6.data);
        }
      }
    },
    onUnknownField(message, no, wireType, data2) {
      const m4 = message;
      if (!Array.isArray(m4[unknownFieldsSymbol])) {
        m4[unknownFieldsSymbol] = [];
      }
      m4[unknownFieldsSymbol].push({ no, wireType, data: data2 });
    },
    readMessage(message, reader, lengthOrEndTagFieldNo, options, delimitedMessageEncoding) {
      const type = message.getType();
      const end = delimitedMessageEncoding ? reader.len : reader.pos + lengthOrEndTagFieldNo;
      let fieldNo, wireType;
      while (reader.pos < end) {
        [fieldNo, wireType] = reader.tag();
        if (delimitedMessageEncoding === true && wireType == WireType.EndGroup) {
          break;
        }
        const field = type.fields.find(fieldNo);
        if (!field) {
          const data2 = reader.skip(wireType, fieldNo);
          if (options.readUnknownFields) {
            this.onUnknownField(message, fieldNo, wireType, data2);
          }
          continue;
        }
        readField2(message, reader, field, wireType, options);
      }
      if (delimitedMessageEncoding && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      (wireType != WireType.EndGroup || fieldNo !== lengthOrEndTagFieldNo)) {
        throw new Error(`invalid end group tag`);
      }
    },
    readField: readField2,
    writeMessage(message, writer, options) {
      const type = message.getType();
      for (const field of type.fields.byNumber()) {
        if (!isFieldSet(field, message)) {
          if (field.req) {
            throw new Error(`cannot encode field ${type.typeName}.${field.name} to binary: required field not set`);
          }
          continue;
        }
        const value = field.oneof ? message[field.oneof.localName].value : message[field.localName];
        writeField2(field, value, writer, options);
      }
      if (options.writeUnknownFields) {
        this.writeUnknownFields(message, writer);
      }
      return writer;
    },
    writeField(field, value, writer, options) {
      if (value === void 0) {
        return void 0;
      }
      writeField2(field, value, writer, options);
    }
  };
}
function readField2(target, reader, field, wireType, options) {
  let { repeated, localName } = field;
  if (field.oneof) {
    target = target[field.oneof.localName];
    if (target.case != localName) {
      delete target.value;
    }
    target.case = localName;
    localName = "value";
  }
  switch (field.kind) {
    case "scalar":
    case "enum":
      const scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
      let read = readScalar2;
      if (field.kind == "scalar" && field.L > 0) {
        read = readScalarLTString;
      }
      if (repeated) {
        let arr = target[localName];
        const isPacked = wireType == WireType.LengthDelimited && scalarType != ScalarType.STRING && scalarType != ScalarType.BYTES;
        if (isPacked) {
          let e = reader.uint32() + reader.pos;
          while (reader.pos < e) {
            arr.push(read(reader, scalarType));
          }
        } else {
          arr.push(read(reader, scalarType));
        }
      } else {
        target[localName] = read(reader, scalarType);
      }
      break;
    case "message":
      const messageType = field.T;
      if (repeated) {
        target[localName].push(readMessageField(reader, new messageType(), options, field));
      } else {
        if (isMessage(target[localName])) {
          readMessageField(reader, target[localName], options, field);
        } else {
          target[localName] = readMessageField(reader, new messageType(), options, field);
          if (messageType.fieldWrapper && !field.oneof && !field.repeated) {
            target[localName] = messageType.fieldWrapper.unwrapField(target[localName]);
          }
        }
      }
      break;
    case "map":
      let [mapKey, mapVal] = readMapEntry(field, reader, options);
      target[localName][mapKey] = mapVal;
      break;
  }
}
function readMessageField(reader, message, options, field) {
  const format = message.getType().runtime.bin;
  const delimited = field === null || field === void 0 ? void 0 : field.delimited;
  format.readMessage(
    message,
    reader,
    delimited ? field.no : reader.uint32(),
    // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    options,
    delimited
  );
  return message;
}
function readMapEntry(field, reader, options) {
  const length = reader.uint32(), end = reader.pos + length;
  let key, val;
  while (reader.pos < end) {
    const [fieldNo] = reader.tag();
    switch (fieldNo) {
      case 1:
        key = readScalar2(reader, field.K);
        break;
      case 2:
        switch (field.V.kind) {
          case "scalar":
            val = readScalar2(reader, field.V.T);
            break;
          case "enum":
            val = reader.int32();
            break;
          case "message":
            val = readMessageField(reader, new field.V.T(), options, void 0);
            break;
        }
        break;
    }
  }
  if (key === void 0) {
    key = scalarZeroValue(field.K, LongType.BIGINT);
  }
  if (typeof key != "string" && typeof key != "number") {
    key = key.toString();
  }
  if (val === void 0) {
    switch (field.V.kind) {
      case "scalar":
        val = scalarZeroValue(field.V.T, LongType.BIGINT);
        break;
      case "enum":
        val = field.V.T.values[0].no;
        break;
      case "message":
        val = new field.V.T();
        break;
    }
  }
  return [key, val];
}
function readScalarLTString(reader, type) {
  const v8 = readScalar2(reader, type);
  return typeof v8 == "bigint" ? v8.toString() : v8;
}
function readScalar2(reader, type) {
  switch (type) {
    case ScalarType.STRING:
      return reader.string();
    case ScalarType.BOOL:
      return reader.bool();
    case ScalarType.DOUBLE:
      return reader.double();
    case ScalarType.FLOAT:
      return reader.float();
    case ScalarType.INT32:
      return reader.int32();
    case ScalarType.INT64:
      return reader.int64();
    case ScalarType.UINT64:
      return reader.uint64();
    case ScalarType.FIXED64:
      return reader.fixed64();
    case ScalarType.BYTES:
      return reader.bytes();
    case ScalarType.FIXED32:
      return reader.fixed32();
    case ScalarType.SFIXED32:
      return reader.sfixed32();
    case ScalarType.SFIXED64:
      return reader.sfixed64();
    case ScalarType.SINT64:
      return reader.sint64();
    case ScalarType.UINT32:
      return reader.uint32();
    case ScalarType.SINT32:
      return reader.sint32();
  }
}
function writeField2(field, value, writer, options) {
  assert(value !== void 0);
  const repeated = field.repeated;
  switch (field.kind) {
    case "scalar":
    case "enum":
      let scalarType = field.kind == "enum" ? ScalarType.INT32 : field.T;
      if (repeated) {
        assert(Array.isArray(value));
        if (field.packed) {
          writePacked(writer, scalarType, field.no, value);
        } else {
          for (const item of value) {
            writeScalar2(writer, scalarType, field.no, item);
          }
        }
      } else {
        writeScalar2(writer, scalarType, field.no, value);
      }
      break;
    case "message":
      if (repeated) {
        assert(Array.isArray(value));
        for (const item of value) {
          writeMessageField(writer, options, field, item);
        }
      } else {
        writeMessageField(writer, options, field, value);
      }
      break;
    case "map":
      assert(typeof value == "object" && value != null);
      for (const [key, val] of Object.entries(value)) {
        writeMapEntry(writer, options, field, key, val);
      }
      break;
  }
}
function writeMapEntry(writer, options, field, key, value) {
  writer.tag(field.no, WireType.LengthDelimited);
  writer.fork();
  let keyValue = key;
  switch (field.K) {
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
      keyValue = Number.parseInt(key);
      break;
    case ScalarType.BOOL:
      assert(key == "true" || key == "false");
      keyValue = key == "true";
      break;
  }
  writeScalar2(writer, field.K, 1, keyValue);
  switch (field.V.kind) {
    case "scalar":
      writeScalar2(writer, field.V.T, 2, value);
      break;
    case "enum":
      writeScalar2(writer, ScalarType.INT32, 2, value);
      break;
    case "message":
      assert(value !== void 0);
      writer.tag(2, WireType.LengthDelimited).bytes(value.toBinary(options));
      break;
  }
  writer.join();
}
function writeMessageField(writer, options, field, value) {
  const message = wrapField(field.T, value);
  if (field.delimited)
    writer.tag(field.no, WireType.StartGroup).raw(message.toBinary(options)).tag(field.no, WireType.EndGroup);
  else
    writer.tag(field.no, WireType.LengthDelimited).bytes(message.toBinary(options));
}
function writeScalar2(writer, type, fieldNo, value) {
  assert(value !== void 0);
  let [wireType, method] = scalarTypeInfo(type);
  writer.tag(fieldNo, wireType)[method](value);
}
function writePacked(writer, type, fieldNo, value) {
  if (!value.length) {
    return;
  }
  writer.tag(fieldNo, WireType.LengthDelimited).fork();
  let [, method] = scalarTypeInfo(type);
  for (let i2 = 0; i2 < value.length; i2++) {
    writer[method](value[i2]);
  }
  writer.join();
}
function scalarTypeInfo(type) {
  let wireType = WireType.Varint;
  switch (type) {
    case ScalarType.BYTES:
    case ScalarType.STRING:
      wireType = WireType.LengthDelimited;
      break;
    case ScalarType.DOUBLE:
    case ScalarType.FIXED64:
    case ScalarType.SFIXED64:
      wireType = WireType.Bit64;
      break;
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.FLOAT:
      wireType = WireType.Bit32;
      break;
  }
  const method = ScalarType[type].toLowerCase();
  return [wireType, method];
}

// node_modules/@bufbuild/protobuf/dist/esm/private/util-common.js
function makeUtilCommon() {
  return {
    setEnumType,
    initPartial(source, target) {
      if (source === void 0) {
        return;
      }
      const type = target.getType();
      for (const member of type.fields.byMember()) {
        const localName = member.localName, t2 = target, s3 = source;
        if (s3[localName] == null) {
          continue;
        }
        switch (member.kind) {
          case "oneof":
            const sk = s3[localName].case;
            if (sk === void 0) {
              continue;
            }
            const sourceField = member.findField(sk);
            let val = s3[localName].value;
            if (sourceField && sourceField.kind == "message" && !isMessage(val, sourceField.T)) {
              val = new sourceField.T(val);
            } else if (sourceField && sourceField.kind === "scalar" && sourceField.T === ScalarType.BYTES) {
              val = toU8Arr(val);
            }
            t2[localName] = { case: sk, value: val };
            break;
          case "scalar":
          case "enum":
            let copy = s3[localName];
            if (member.T === ScalarType.BYTES) {
              copy = member.repeated ? copy.map(toU8Arr) : toU8Arr(copy);
            }
            t2[localName] = copy;
            break;
          case "map":
            switch (member.V.kind) {
              case "scalar":
              case "enum":
                if (member.V.T === ScalarType.BYTES) {
                  for (const [k7, v8] of Object.entries(s3[localName])) {
                    t2[localName][k7] = toU8Arr(v8);
                  }
                } else {
                  Object.assign(t2[localName], s3[localName]);
                }
                break;
              case "message":
                const messageType = member.V.T;
                for (const k7 of Object.keys(s3[localName])) {
                  let val2 = s3[localName][k7];
                  if (!messageType.fieldWrapper) {
                    val2 = new messageType(val2);
                  }
                  t2[localName][k7] = val2;
                }
                break;
            }
            break;
          case "message":
            const mt6 = member.T;
            if (member.repeated) {
              t2[localName] = s3[localName].map((val2) => isMessage(val2, mt6) ? val2 : new mt6(val2));
            } else {
              const val2 = s3[localName];
              if (mt6.fieldWrapper) {
                if (
                  // We can't use BytesValue.typeName as that will create a circular import
                  mt6.typeName === "google.protobuf.BytesValue"
                ) {
                  t2[localName] = toU8Arr(val2);
                } else {
                  t2[localName] = val2;
                }
              } else {
                t2[localName] = isMessage(val2, mt6) ? val2 : new mt6(val2);
              }
            }
            break;
        }
      }
    },
    // TODO use isFieldSet() here to support future field presence
    equals(type, a4, b7) {
      if (a4 === b7) {
        return true;
      }
      if (!a4 || !b7) {
        return false;
      }
      return type.fields.byMember().every((m4) => {
        const va3 = a4[m4.localName];
        const vb = b7[m4.localName];
        if (m4.repeated) {
          if (va3.length !== vb.length) {
            return false;
          }
          switch (m4.kind) {
            case "message":
              return va3.every((a5, i2) => m4.T.equals(a5, vb[i2]));
            case "scalar":
              return va3.every((a5, i2) => scalarEquals(m4.T, a5, vb[i2]));
            case "enum":
              return va3.every((a5, i2) => scalarEquals(ScalarType.INT32, a5, vb[i2]));
          }
          throw new Error(`repeated cannot contain ${m4.kind}`);
        }
        switch (m4.kind) {
          case "message":
            return m4.T.equals(va3, vb);
          case "enum":
            return scalarEquals(ScalarType.INT32, va3, vb);
          case "scalar":
            return scalarEquals(m4.T, va3, vb);
          case "oneof":
            if (va3.case !== vb.case) {
              return false;
            }
            const s3 = m4.findField(va3.case);
            if (s3 === void 0) {
              return true;
            }
            switch (s3.kind) {
              case "message":
                return s3.T.equals(va3.value, vb.value);
              case "enum":
                return scalarEquals(ScalarType.INT32, va3.value, vb.value);
              case "scalar":
                return scalarEquals(s3.T, va3.value, vb.value);
            }
            throw new Error(`oneof cannot contain ${s3.kind}`);
          case "map":
            const keys = Object.keys(va3).concat(Object.keys(vb));
            switch (m4.V.kind) {
              case "message":
                const messageType = m4.V.T;
                return keys.every((k7) => messageType.equals(va3[k7], vb[k7]));
              case "enum":
                return keys.every((k7) => scalarEquals(ScalarType.INT32, va3[k7], vb[k7]));
              case "scalar":
                const scalarType = m4.V.T;
                return keys.every((k7) => scalarEquals(scalarType, va3[k7], vb[k7]));
            }
            break;
        }
      });
    },
    // TODO use isFieldSet() here to support future field presence
    clone(message) {
      const type = message.getType(), target = new type(), any = target;
      for (const member of type.fields.byMember()) {
        const source = message[member.localName];
        let copy;
        if (member.repeated) {
          copy = source.map(cloneSingularField);
        } else if (member.kind == "map") {
          copy = any[member.localName];
          for (const [key, v8] of Object.entries(source)) {
            copy[key] = cloneSingularField(v8);
          }
        } else if (member.kind == "oneof") {
          const f6 = member.findField(source.case);
          copy = f6 ? { case: source.case, value: cloneSingularField(source.value) } : { case: void 0 };
        } else {
          copy = cloneSingularField(source);
        }
        any[member.localName] = copy;
      }
      for (const uf of type.runtime.bin.listUnknownFields(message)) {
        type.runtime.bin.onUnknownField(any, uf.no, uf.wireType, uf.data);
      }
      return target;
    }
  };
}
function cloneSingularField(value) {
  if (value === void 0) {
    return value;
  }
  if (isMessage(value)) {
    return value.clone();
  }
  if (value instanceof Uint8Array) {
    const c5 = new Uint8Array(value.byteLength);
    c5.set(value);
    return c5;
  }
  return value;
}
function toU8Arr(input) {
  return input instanceof Uint8Array ? input : new Uint8Array(input);
}

// node_modules/@bufbuild/protobuf/dist/esm/private/proto-runtime.js
function makeProtoRuntime(syntax, newFieldList, initFields) {
  return {
    syntax,
    json: makeJsonFormat(),
    bin: makeBinaryFormat(),
    util: Object.assign(Object.assign({}, makeUtilCommon()), {
      newFieldList,
      initFields
    }),
    makeMessageType(typeName, fields, opt) {
      return makeMessageType(this, typeName, fields, opt);
    },
    makeEnum,
    makeEnumType,
    getEnumType,
    makeExtension(typeName, extendee, field) {
      return makeExtension(this, typeName, extendee, field);
    }
  };
}

// node_modules/@bufbuild/protobuf/dist/esm/private/field-list.js
var InternalFieldList = class {
  constructor(fields, normalizer) {
    this._fields = fields;
    this._normalizer = normalizer;
  }
  findJsonName(jsonName) {
    if (!this.jsonNames) {
      const t2 = {};
      for (const f6 of this.list()) {
        t2[f6.jsonName] = t2[f6.name] = f6;
      }
      this.jsonNames = t2;
    }
    return this.jsonNames[jsonName];
  }
  find(fieldNo) {
    if (!this.numbers) {
      const t2 = {};
      for (const f6 of this.list()) {
        t2[f6.no] = f6;
      }
      this.numbers = t2;
    }
    return this.numbers[fieldNo];
  }
  list() {
    if (!this.all) {
      this.all = this._normalizer(this._fields);
    }
    return this.all;
  }
  byNumber() {
    if (!this.numbersAsc) {
      this.numbersAsc = this.list().concat().sort((a4, b7) => a4.no - b7.no);
    }
    return this.numbersAsc;
  }
  byMember() {
    if (!this.members) {
      this.members = [];
      const a4 = this.members;
      let o3;
      for (const f6 of this.list()) {
        if (f6.oneof) {
          if (f6.oneof !== o3) {
            o3 = f6.oneof;
            a4.push(o3);
          }
        } else {
          a4.push(f6);
        }
      }
    }
    return this.members;
  }
};

// node_modules/@bufbuild/protobuf/dist/esm/private/names.js
function localFieldName(protoName, inOneof) {
  const name = protoCamelCase(protoName);
  if (inOneof) {
    return name;
  }
  return safeObjectProperty(safeMessageProperty(name));
}
function localOneofName(protoName) {
  return localFieldName(protoName, false);
}
var fieldJsonName = protoCamelCase;
function protoCamelCase(snakeCase) {
  let capNext = false;
  const b7 = [];
  for (let i2 = 0; i2 < snakeCase.length; i2++) {
    let c5 = snakeCase.charAt(i2);
    switch (c5) {
      case "_":
        capNext = true;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        b7.push(c5);
        capNext = false;
        break;
      default:
        if (capNext) {
          capNext = false;
          c5 = c5.toUpperCase();
        }
        b7.push(c5);
        break;
    }
  }
  return b7.join("");
}
var reservedObjectProperties = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
var reservedMessageProperties = /* @__PURE__ */ new Set([
  // names reserved by the runtime
  "getType",
  "clone",
  "equals",
  "fromBinary",
  "fromJson",
  "fromJsonString",
  "toBinary",
  "toJson",
  "toJsonString",
  // names reserved by the runtime for the future
  "toObject"
]);
var fallback = (name) => `${name}$`;
var safeMessageProperty = (name) => {
  if (reservedMessageProperties.has(name)) {
    return fallback(name);
  }
  return name;
};
var safeObjectProperty = (name) => {
  if (reservedObjectProperties.has(name)) {
    return fallback(name);
  }
  return name;
};

// node_modules/@bufbuild/protobuf/dist/esm/private/field.js
var InternalOneofInfo = class {
  constructor(name) {
    this.kind = "oneof";
    this.repeated = false;
    this.packed = false;
    this.opt = false;
    this.req = false;
    this.default = void 0;
    this.fields = [];
    this.name = name;
    this.localName = localOneofName(name);
  }
  addField(field) {
    assert(field.oneof === this, `field ${field.name} not one of ${this.name}`);
    this.fields.push(field);
  }
  findField(localName) {
    if (!this._lookup) {
      this._lookup = /* @__PURE__ */ Object.create(null);
      for (let i2 = 0; i2 < this.fields.length; i2++) {
        this._lookup[this.fields[i2].localName] = this.fields[i2];
      }
    }
    return this._lookup[localName];
  }
};

// node_modules/@bufbuild/protobuf/dist/esm/private/field-normalize.js
function normalizeFieldInfos(fieldInfos, packedByDefault) {
  var _a3, _b, _c, _d, _e2, _f;
  const r2 = [];
  let o3;
  for (const field of typeof fieldInfos == "function" ? fieldInfos() : fieldInfos) {
    const f6 = field;
    f6.localName = localFieldName(field.name, field.oneof !== void 0);
    f6.jsonName = (_a3 = field.jsonName) !== null && _a3 !== void 0 ? _a3 : fieldJsonName(field.name);
    f6.repeated = (_b = field.repeated) !== null && _b !== void 0 ? _b : false;
    if (field.kind == "scalar") {
      f6.L = (_c = field.L) !== null && _c !== void 0 ? _c : LongType.BIGINT;
    }
    f6.delimited = (_d = field.delimited) !== null && _d !== void 0 ? _d : false;
    f6.req = (_e2 = field.req) !== null && _e2 !== void 0 ? _e2 : false;
    f6.opt = (_f = field.opt) !== null && _f !== void 0 ? _f : false;
    if (field.packed === void 0) {
      if (packedByDefault) {
        f6.packed = field.kind == "enum" || field.kind == "scalar" && field.T != ScalarType.BYTES && field.T != ScalarType.STRING;
      } else {
        f6.packed = false;
      }
    }
    if (field.oneof !== void 0) {
      const ooname = typeof field.oneof == "string" ? field.oneof : field.oneof.name;
      if (!o3 || o3.name != ooname) {
        o3 = new InternalOneofInfo(ooname);
      }
      f6.oneof = o3;
      o3.addField(f6);
    }
    r2.push(f6);
  }
  return r2;
}

// node_modules/@bufbuild/protobuf/dist/esm/proto3.js
var proto3 = makeProtoRuntime(
  "proto3",
  (fields) => {
    return new InternalFieldList(fields, (source) => normalizeFieldInfos(source, true));
  },
  // TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
  (target) => {
    for (const member of target.getType().fields.byMember()) {
      if (member.opt) {
        continue;
      }
      const name = member.localName, t2 = target;
      if (member.repeated) {
        t2[name] = [];
        continue;
      }
      switch (member.kind) {
        case "oneof":
          t2[name] = { case: void 0 };
          break;
        case "enum":
          t2[name] = 0;
          break;
        case "map":
          t2[name] = {};
          break;
        case "scalar":
          t2[name] = scalarZeroValue(member.T, member.L);
          break;
        case "message":
          break;
      }
    }
  }
);

// node_modules/@bufbuild/protobuf/dist/esm/service-type.js
var MethodKind;
(function(MethodKind2) {
  MethodKind2[MethodKind2["Unary"] = 0] = "Unary";
  MethodKind2[MethodKind2["ServerStreaming"] = 1] = "ServerStreaming";
  MethodKind2[MethodKind2["ClientStreaming"] = 2] = "ClientStreaming";
  MethodKind2[MethodKind2["BiDiStreaming"] = 3] = "BiDiStreaming";
})(MethodKind || (MethodKind = {}));
var MethodIdempotency;
(function(MethodIdempotency2) {
  MethodIdempotency2[MethodIdempotency2["NoSideEffects"] = 1] = "NoSideEffects";
  MethodIdempotency2[MethodIdempotency2["Idempotent"] = 2] = "Idempotent";
})(MethodIdempotency || (MethodIdempotency = {}));

// node_modules/@bufbuild/protobuf/dist/esm/create-registry.js
function createRegistry(...types) {
  const messages = {};
  const enums = {};
  const services = {};
  const extensionsByName = /* @__PURE__ */ new Map();
  const extensionsByExtendee = /* @__PURE__ */ new Map();
  const registry = {
    findMessage(typeName) {
      return messages[typeName];
    },
    findEnum(typeName) {
      return enums[typeName];
    },
    findService(typeName) {
      return services[typeName];
    },
    findExtensionFor(typeName, no) {
      var _a3, _b;
      return (_b = (_a3 = extensionsByExtendee.get(typeName)) === null || _a3 === void 0 ? void 0 : _a3.get(no)) !== null && _b !== void 0 ? _b : void 0;
    },
    findExtension(typeName) {
      var _a3;
      return (_a3 = extensionsByName.get(typeName)) !== null && _a3 !== void 0 ? _a3 : void 0;
    }
  };
  function addType(type) {
    var _a3;
    if ("fields" in type) {
      if (!registry.findMessage(type.typeName)) {
        messages[type.typeName] = type;
        type.fields.list().forEach(addField);
      }
    } else if ("methods" in type) {
      if (!registry.findService(type.typeName)) {
        services[type.typeName] = type;
        for (const method of Object.values(type.methods)) {
          addType(method.I);
          addType(method.O);
        }
      }
    } else if ("extendee" in type) {
      if (!extensionsByName.has(type.typeName)) {
        extensionsByName.set(type.typeName, type);
        const extendeeName = type.extendee.typeName;
        if (!extensionsByExtendee.has(extendeeName)) {
          extensionsByExtendee.set(extendeeName, /* @__PURE__ */ new Map());
        }
        (_a3 = extensionsByExtendee.get(extendeeName)) === null || _a3 === void 0 ? void 0 : _a3.set(type.field.no, type);
        addType(type.extendee);
        addField(type.field);
      }
    } else {
      enums[type.typeName] = type;
    }
  }
  function addField(field) {
    if (field.kind == "message") {
      addType(field.T);
    } else if (field.kind == "map" && field.V.kind == "message") {
      addType(field.V.T);
    } else if (field.kind == "enum") {
      addType(field.T);
    }
  }
  for (const type of types) {
    addType(type);
  }
  return registry;
}

// node_modules/@bufbuild/protobuf/dist/esm/google/protobuf/timestamp_pb.js
var Timestamp = class _Timestamp extends Message {
  constructor(data2) {
    super();
    this.seconds = protoInt64.zero;
    this.nanos = 0;
    proto3.util.initPartial(data2, this);
  }
  fromJson(json, options) {
    if (typeof json !== "string") {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: ${proto3.json.debug(json)}`);
    }
    const matches = json.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
    if (!matches) {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
    }
    const ms = Date.parse(matches[1] + "-" + matches[2] + "-" + matches[3] + "T" + matches[4] + ":" + matches[5] + ":" + matches[6] + (matches[8] ? matches[8] : "Z"));
    if (Number.isNaN(ms)) {
      throw new Error(`cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string`);
    }
    if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
      throw new Error(`cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    this.seconds = protoInt64.parse(ms / 1e3);
    this.nanos = 0;
    if (matches[7]) {
      this.nanos = parseInt("1" + matches[7] + "0".repeat(9 - matches[7].length)) - 1e9;
    }
    return this;
  }
  toJson(options) {
    const ms = Number(this.seconds) * 1e3;
    if (ms < Date.parse("0001-01-01T00:00:00Z") || ms > Date.parse("9999-12-31T23:59:59Z")) {
      throw new Error(`cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
    }
    if (this.nanos < 0) {
      throw new Error(`cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative`);
    }
    let z7 = "Z";
    if (this.nanos > 0) {
      const nanosStr = (this.nanos + 1e9).toString().substring(1);
      if (nanosStr.substring(3) === "000000") {
        z7 = "." + nanosStr.substring(0, 3) + "Z";
      } else if (nanosStr.substring(6) === "000") {
        z7 = "." + nanosStr.substring(0, 6) + "Z";
      } else {
        z7 = "." + nanosStr + "Z";
      }
    }
    return new Date(ms).toISOString().replace(".000Z", z7);
  }
  toDate() {
    return new Date(Number(this.seconds) * 1e3 + Math.ceil(this.nanos / 1e6));
  }
  static now() {
    return _Timestamp.fromDate(/* @__PURE__ */ new Date());
  }
  static fromDate(date) {
    const ms = date.getTime();
    return new _Timestamp({
      seconds: protoInt64.parse(Math.floor(ms / 1e3)),
      nanos: ms % 1e3 * 1e6
    });
  }
  static fromBinary(bytes, options) {
    return new _Timestamp().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new _Timestamp().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new _Timestamp().fromJsonString(jsonString, options);
  }
  static equals(a4, b7) {
    return proto3.util.equals(_Timestamp, a4, b7);
  }
};
Timestamp.runtime = proto3;
Timestamp.typeName = "google.protobuf.Timestamp";
Timestamp.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);

// node_modules/@bufbuild/protobuf/dist/esm/google/protobuf/duration_pb.js
var Duration = class _Duration extends Message {
  constructor(data2) {
    super();
    this.seconds = protoInt64.zero;
    this.nanos = 0;
    proto3.util.initPartial(data2, this);
  }
  fromJson(json, options) {
    if (typeof json !== "string") {
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${proto3.json.debug(json)}`);
    }
    const match = json.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
    if (match === null) {
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${proto3.json.debug(json)}`);
    }
    const longSeconds = Number(match[1]);
    if (longSeconds > 315576e6 || longSeconds < -315576e6) {
      throw new Error(`cannot decode google.protobuf.Duration from JSON: ${proto3.json.debug(json)}`);
    }
    this.seconds = protoInt64.parse(longSeconds);
    if (typeof match[2] == "string") {
      const nanosStr = match[2] + "0".repeat(9 - match[2].length);
      this.nanos = parseInt(nanosStr);
      if (longSeconds < 0 || Object.is(longSeconds, -0)) {
        this.nanos = -this.nanos;
      }
    }
    return this;
  }
  toJson(options) {
    if (Number(this.seconds) > 315576e6 || Number(this.seconds) < -315576e6) {
      throw new Error(`cannot encode google.protobuf.Duration to JSON: value out of range`);
    }
    let text = this.seconds.toString();
    if (this.nanos !== 0) {
      let nanosStr = Math.abs(this.nanos).toString();
      nanosStr = "0".repeat(9 - nanosStr.length) + nanosStr;
      if (nanosStr.substring(3) === "000000") {
        nanosStr = nanosStr.substring(0, 3);
      } else if (nanosStr.substring(6) === "000") {
        nanosStr = nanosStr.substring(0, 6);
      }
      text += "." + nanosStr;
      if (this.nanos < 0 && Number(this.seconds) == 0) {
        text = "-" + text;
      }
    }
    return text + "s";
  }
  static fromBinary(bytes, options) {
    return new _Duration().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new _Duration().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new _Duration().fromJsonString(jsonString, options);
  }
  static equals(a4, b7) {
    return proto3.util.equals(_Duration, a4, b7);
  }
};
Duration.runtime = proto3;
Duration.typeName = "google.protobuf.Duration";
Duration.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  },
  {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]);

// node_modules/@bufbuild/protobuf/dist/esm/google/protobuf/any_pb.js
var Any = class _Any extends Message {
  constructor(data2) {
    super();
    this.typeUrl = "";
    this.value = new Uint8Array(0);
    proto3.util.initPartial(data2, this);
  }
  toJson(options) {
    var _a3;
    if (this.typeUrl === "") {
      return {};
    }
    const typeName = this.typeUrlToName(this.typeUrl);
    const messageType = (_a3 = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a3 === void 0 ? void 0 : _a3.findMessage(typeName);
    if (!messageType) {
      throw new Error(`cannot encode message google.protobuf.Any to JSON: "${this.typeUrl}" is not in the type registry`);
    }
    const message = messageType.fromBinary(this.value);
    let json = message.toJson(options);
    if (typeName.startsWith("google.protobuf.") || (json === null || Array.isArray(json) || typeof json !== "object")) {
      json = { value: json };
    }
    json["@type"] = this.typeUrl;
    return json;
  }
  fromJson(json, options) {
    var _a3;
    if (json === null || Array.isArray(json) || typeof json != "object") {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: expected object but got ${json === null ? "null" : Array.isArray(json) ? "array" : typeof json}`);
    }
    if (Object.keys(json).length == 0) {
      return this;
    }
    const typeUrl = json["@type"];
    if (typeof typeUrl != "string" || typeUrl == "") {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: "@type" is empty`);
    }
    const typeName = this.typeUrlToName(typeUrl), messageType = (_a3 = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a3 === void 0 ? void 0 : _a3.findMessage(typeName);
    if (!messageType) {
      throw new Error(`cannot decode message google.protobuf.Any from JSON: ${typeUrl} is not in the type registry`);
    }
    let message;
    if (typeName.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(json, "value")) {
      message = messageType.fromJson(json["value"], options);
    } else {
      const copy = Object.assign({}, json);
      delete copy["@type"];
      message = messageType.fromJson(copy, options);
    }
    this.packFrom(message);
    return this;
  }
  packFrom(message) {
    this.value = message.toBinary();
    this.typeUrl = this.typeNameToUrl(message.getType().typeName);
  }
  unpackTo(target) {
    if (!this.is(target.getType())) {
      return false;
    }
    target.fromBinary(this.value);
    return true;
  }
  unpack(registry) {
    if (this.typeUrl === "") {
      return void 0;
    }
    const messageType = registry.findMessage(this.typeUrlToName(this.typeUrl));
    if (!messageType) {
      return void 0;
    }
    return messageType.fromBinary(this.value);
  }
  is(type) {
    if (this.typeUrl === "") {
      return false;
    }
    const name = this.typeUrlToName(this.typeUrl);
    let typeName = "";
    if (typeof type === "string") {
      typeName = type;
    } else {
      typeName = type.typeName;
    }
    return name === typeName;
  }
  typeNameToUrl(name) {
    return `type.googleapis.com/${name}`;
  }
  typeUrlToName(url2) {
    if (!url2.length) {
      throw new Error(`invalid type url: ${url2}`);
    }
    const slash = url2.lastIndexOf("/");
    const name = slash >= 0 ? url2.substring(slash + 1) : url2;
    if (!name.length) {
      throw new Error(`invalid type url: ${url2}`);
    }
    return name;
  }
  static pack(message) {
    const any = new _Any();
    any.packFrom(message);
    return any;
  }
  static fromBinary(bytes, options) {
    return new _Any().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new _Any().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new _Any().fromJsonString(jsonString, options);
  }
  static equals(a4, b7) {
    return proto3.util.equals(_Any, a4, b7);
  }
};
Any.runtime = proto3;
Any.typeName = "google.protobuf.Any";
Any.fields = proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "type_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]);

// node_modules/@bufbuild/protobuf/dist/esm/google/protobuf/field_mask_pb.js
var FieldMask = class _FieldMask extends Message {
  constructor(data2) {
    super();
    this.paths = [];
    proto3.util.initPartial(data2, this);
  }
  toJson(options) {
    function protoCamelCase2(snakeCase) {
      let capNext = false;
      const b7 = [];
      for (let i2 = 0; i2 < snakeCase.length; i2++) {
        let c5 = snakeCase.charAt(i2);
        switch (c5) {
          case "_":
            capNext = true;
            break;
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            b7.push(c5);
            capNext = false;
            break;
          default:
            if (capNext) {
              capNext = false;
              c5 = c5.toUpperCase();
            }
            b7.push(c5);
            break;
        }
      }
      return b7.join("");
    }
    return this.paths.map((p5) => {
      if (p5.match(/_[0-9]?_/g) || p5.match(/[A-Z]/g)) {
        throw new Error('cannot encode google.protobuf.FieldMask to JSON: lowerCamelCase of path name "' + p5 + '" is irreversible');
      }
      return protoCamelCase2(p5);
    }).join(",");
  }
  fromJson(json, options) {
    if (typeof json !== "string") {
      throw new Error("cannot decode google.protobuf.FieldMask from JSON: " + proto3.json.debug(json));
    }
    if (json === "") {
      return this;
    }
    function camelToSnake(str) {
      if (str.includes("_")) {
        throw new Error("cannot decode google.protobuf.FieldMask from JSON: path names must be lowerCamelCase");
      }
      const sc = str.replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase());
      return sc[0] === "_" ? sc.substring(1) : sc;
    }
    this.paths = json.split(",").map(camelToSnake);
    return this;
  }
  static fromBinary(bytes, options) {
    return new _FieldMask().fromBinary(bytes, options);
  }
  static fromJson(jsonValue, options) {
    return new _FieldMask().fromJson(jsonValue, options);
  }
  static fromJsonString(jsonString, options) {
    return new _FieldMask().fromJsonString(jsonString, options);
  }
  static equals(a4, b7) {
    return proto3.util.equals(_FieldMask, a4, b7);
  }
};
FieldMask.runtime = proto3;
FieldMask.typeName = "google.protobuf.FieldMask";
FieldMask.fields = proto3.util.newFieldList(() => [
  { no: 1, name: "paths", kind: "scalar", T: 9, repeated: true }
]);

// node_modules/@connectrpc/connect/dist/esm/code.js
var Code;
(function(Code2) {
  Code2[Code2["Canceled"] = 1] = "Canceled";
  Code2[Code2["Unknown"] = 2] = "Unknown";
  Code2[Code2["InvalidArgument"] = 3] = "InvalidArgument";
  Code2[Code2["DeadlineExceeded"] = 4] = "DeadlineExceeded";
  Code2[Code2["NotFound"] = 5] = "NotFound";
  Code2[Code2["AlreadyExists"] = 6] = "AlreadyExists";
  Code2[Code2["PermissionDenied"] = 7] = "PermissionDenied";
  Code2[Code2["ResourceExhausted"] = 8] = "ResourceExhausted";
  Code2[Code2["FailedPrecondition"] = 9] = "FailedPrecondition";
  Code2[Code2["Aborted"] = 10] = "Aborted";
  Code2[Code2["OutOfRange"] = 11] = "OutOfRange";
  Code2[Code2["Unimplemented"] = 12] = "Unimplemented";
  Code2[Code2["Internal"] = 13] = "Internal";
  Code2[Code2["Unavailable"] = 14] = "Unavailable";
  Code2[Code2["DataLoss"] = 15] = "DataLoss";
  Code2[Code2["Unauthenticated"] = 16] = "Unauthenticated";
})(Code || (Code = {}));

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/code-string.js
function codeToString(value) {
  const name = Code[value];
  if (typeof name != "string") {
    return value.toString();
  }
  return name[0].toLowerCase() + name.substring(1).replace(/[A-Z]/g, (c5) => "_" + c5.toLowerCase());
}
var stringToCode;
function codeFromString(value) {
  if (!stringToCode) {
    stringToCode = {};
    for (const value2 of Object.values(Code)) {
      if (typeof value2 == "string") {
        continue;
      }
      stringToCode[codeToString(value2)] = value2;
    }
  }
  return stringToCode[value];
}

// node_modules/@connectrpc/connect/dist/esm/connect-error.js
var ConnectError = class _ConnectError extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with error.
   */
  constructor(message, code = Code.Unknown, metadata, outgoingDetails, cause) {
    super(createMessage(message, code));
    this.name = "ConnectError";
    Object.setPrototypeOf(this, new.target.prototype);
    this.rawMessage = message;
    this.code = code;
    this.metadata = new Headers(metadata !== null && metadata !== void 0 ? metadata : {});
    this.details = outgoingDetails !== null && outgoingDetails !== void 0 ? outgoingDetails : [];
    this.cause = cause;
  }
  /**
   * Convert any value - typically a caught error into a ConnectError,
   * following these rules:
   * - If the value is already a ConnectError, return it as is.
   * - If the value is an AbortError from the fetch API, return the message
   *   of the AbortError with code Canceled.
   * - For other Errors, return the error message with code Unknown by default.
   * - For other values, return the values String representation as a message,
   *   with the code Unknown by default.
   * The original value will be used for the "cause" property for the new
   * ConnectError.
   */
  static from(reason, code = Code.Unknown) {
    if (reason instanceof _ConnectError) {
      return reason;
    }
    if (reason instanceof Error) {
      if (reason.name == "AbortError") {
        return new _ConnectError(reason.message, Code.Canceled);
      }
      return new _ConnectError(reason.message, code, void 0, void 0, reason);
    }
    return new _ConnectError(String(reason), code, void 0, void 0, reason);
  }
  static [Symbol.hasInstance](v8) {
    if (!(v8 instanceof Error)) {
      return false;
    }
    if (Object.getPrototypeOf(v8) === _ConnectError.prototype) {
      return true;
    }
    return v8.name === "ConnectError" && "code" in v8 && typeof v8.code === "number" && "metadata" in v8 && "details" in v8 && Array.isArray(v8.details) && "rawMessage" in v8 && typeof v8.rawMessage == "string" && "cause" in v8;
  }
  findDetails(typeOrRegistry) {
    const registry = "typeName" in typeOrRegistry ? {
      findMessage: (typeName) => typeName === typeOrRegistry.typeName ? typeOrRegistry : void 0
    } : typeOrRegistry;
    const details = [];
    for (const data2 of this.details) {
      if ("getType" in data2) {
        if (registry.findMessage(data2.getType().typeName)) {
          details.push(data2);
        }
        continue;
      }
      const type = registry.findMessage(data2.type);
      if (type) {
        try {
          details.push(type.fromBinary(data2.value));
        } catch (_8) {
        }
      }
    }
    return details;
  }
};
function createMessage(message, code) {
  return message.length ? `[${codeToString(code)}] ${message}` : `[${codeToString(code)}]`;
}

// node_modules/@connectrpc/connect/dist/esm/http-headers.js
function appendHeaders(...headers) {
  const h7 = new Headers();
  for (const e of headers) {
    e.forEach((value, key) => {
      h7.append(key, value);
    });
  }
  return h7;
}

// node_modules/@connectrpc/connect/dist/esm/any-client.js
function makeAnyClient(service, createMethod) {
  const client = {};
  for (const [localName, methodInfo] of Object.entries(service.methods)) {
    const method = createMethod(Object.assign(Object.assign({}, methodInfo), {
      localName,
      service
    }));
    if (method != null) {
      client[localName] = method;
    }
  }
  return client;
}

// node_modules/@connectrpc/connect/dist/esm/protocol/compression.js
var compressedFlag = 1;

// node_modules/@connectrpc/connect/dist/esm/protocol/envelope.js
function createEnvelopeReadableStream(stream) {
  let reader;
  let buffer = new Uint8Array(0);
  function append(chunk) {
    const n3 = new Uint8Array(buffer.length + chunk.length);
    n3.set(buffer);
    n3.set(chunk, buffer.length);
    buffer = n3;
  }
  return new ReadableStream({
    start() {
      reader = stream.getReader();
    },
    async pull(controller) {
      let header = void 0;
      for (; ; ) {
        if (header === void 0 && buffer.byteLength >= 5) {
          let length = 0;
          for (let i2 = 1; i2 < 5; i2++) {
            length = (length << 8) + buffer[i2];
          }
          header = { flags: buffer[0], length };
        }
        if (header !== void 0 && buffer.byteLength >= header.length + 5) {
          break;
        }
        const result = await reader.read();
        if (result.done) {
          break;
        }
        append(result.value);
      }
      if (header === void 0) {
        if (buffer.byteLength == 0) {
          controller.close();
          return;
        }
        controller.error(new ConnectError("premature end of stream", Code.DataLoss));
        return;
      }
      const data2 = buffer.subarray(5, 5 + header.length);
      buffer = buffer.subarray(5 + header.length);
      controller.enqueue({
        flags: header.flags,
        data: data2
      });
    }
  });
}
function encodeEnvelope(flags, data2) {
  const bytes = new Uint8Array(data2.length + 5);
  bytes.set(data2, 5);
  const v8 = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  v8.setUint8(0, flags);
  v8.setUint32(1, data2.length);
  return bytes;
}

// node_modules/@connectrpc/connect/dist/esm/protocol/async-iterable.js
var __asyncValues = function(o3) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m4 = o3[Symbol.asyncIterator], i2;
  return m4 ? m4.call(o3) : (o3 = typeof __values === "function" ? __values(o3) : o3[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2);
  function verb(n3) {
    i2[n3] = o3[n3] && function(v8) {
      return new Promise(function(resolve2, reject) {
        v8 = o3[n3](v8), settle(resolve2, reject, v8.done, v8.value);
      });
    };
  }
  function settle(resolve2, reject, d4, v8) {
    Promise.resolve(v8).then(function(v9) {
      resolve2({ value: v9, done: d4 });
    }, reject);
  }
};
var __await = function(v8) {
  return this instanceof __await ? (this.v = v8, this) : new __await(v8);
};
var __asyncGenerator = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g8 = generator.apply(thisArg, _arguments || []), i2, q7 = [];
  return i2 = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2;
  function awaitReturn(f6) {
    return function(v8) {
      return Promise.resolve(v8).then(f6, reject);
    };
  }
  function verb(n3, f6) {
    if (g8[n3]) {
      i2[n3] = function(v8) {
        return new Promise(function(a4, b7) {
          q7.push([n3, v8, a4, b7]) > 1 || resume(n3, v8);
        });
      };
      if (f6) i2[n3] = f6(i2[n3]);
    }
  }
  function resume(n3, v8) {
    try {
      step(g8[n3](v8));
    } catch (e) {
      settle(q7[0][3], e);
    }
  }
  function step(r2) {
    r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q7[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f6, v8) {
    if (f6(v8), q7.shift(), q7.length) resume(q7[0][0], q7[0][1]);
  }
};
var __asyncDelegator = function(o3) {
  var i2, p5;
  return i2 = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i2[Symbol.iterator] = function() {
    return this;
  }, i2;
  function verb(n3, f6) {
    i2[n3] = o3[n3] ? function(v8) {
      return (p5 = !p5) ? { value: __await(o3[n3](v8)), done: false } : f6 ? f6(v8) : v8;
    } : f6;
  }
};
function createAsyncIterable(items) {
  return __asyncGenerator(this, arguments, function* createAsyncIterable_1() {
    yield __await(yield* __asyncDelegator(__asyncValues(items)));
  });
}

// node_modules/@connectrpc/connect/dist/esm/promise-client.js
var __asyncValues2 = function(o3) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m4 = o3[Symbol.asyncIterator], i2;
  return m4 ? m4.call(o3) : (o3 = typeof __values === "function" ? __values(o3) : o3[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2);
  function verb(n3) {
    i2[n3] = o3[n3] && function(v8) {
      return new Promise(function(resolve2, reject) {
        v8 = o3[n3](v8), settle(resolve2, reject, v8.done, v8.value);
      });
    };
  }
  function settle(resolve2, reject, d4, v8) {
    Promise.resolve(v8).then(function(v9) {
      resolve2({ value: v9, done: d4 });
    }, reject);
  }
};
var __await2 = function(v8) {
  return this instanceof __await2 ? (this.v = v8, this) : new __await2(v8);
};
var __asyncDelegator2 = function(o3) {
  var i2, p5;
  return i2 = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i2[Symbol.iterator] = function() {
    return this;
  }, i2;
  function verb(n3, f6) {
    i2[n3] = o3[n3] ? function(v8) {
      return (p5 = !p5) ? { value: __await2(o3[n3](v8)), done: false } : f6 ? f6(v8) : v8;
    } : f6;
  }
};
var __asyncGenerator2 = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g8 = generator.apply(thisArg, _arguments || []), i2, q7 = [];
  return i2 = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2;
  function awaitReturn(f6) {
    return function(v8) {
      return Promise.resolve(v8).then(f6, reject);
    };
  }
  function verb(n3, f6) {
    if (g8[n3]) {
      i2[n3] = function(v8) {
        return new Promise(function(a4, b7) {
          q7.push([n3, v8, a4, b7]) > 1 || resume(n3, v8);
        });
      };
      if (f6) i2[n3] = f6(i2[n3]);
    }
  }
  function resume(n3, v8) {
    try {
      step(g8[n3](v8));
    } catch (e) {
      settle(q7[0][3], e);
    }
  }
  function step(r2) {
    r2.value instanceof __await2 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q7[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f6, v8) {
    if (f6(v8), q7.shift(), q7.length) resume(q7[0][0], q7[0][1]);
  }
};
function createClient(service, transport) {
  return makeAnyClient(service, (method) => {
    switch (method.kind) {
      case MethodKind.Unary:
        return createUnaryFn(transport, service, method);
      case MethodKind.ServerStreaming:
        return createServerStreamingFn(transport, service, method);
      case MethodKind.ClientStreaming:
        return createClientStreamingFn(transport, service, method);
      case MethodKind.BiDiStreaming:
        return createBiDiStreamingFn(transport, service, method);
      default:
        return null;
    }
  });
}
function createUnaryFn(transport, service, method) {
  return async function(input, options) {
    var _a3, _b;
    const response = await transport.unary(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, input, options === null || options === void 0 ? void 0 : options.contextValues);
    (_a3 = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a3 === void 0 ? void 0 : _a3.call(options, response.header);
    (_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 ? void 0 : _b.call(options, response.trailer);
    return response.message;
  };
}
function createServerStreamingFn(transport, service, method) {
  return function(input, options) {
    return handleStreamResponse(transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, createAsyncIterable([input]), options === null || options === void 0 ? void 0 : options.contextValues), options);
  };
}
function createClientStreamingFn(transport, service, method) {
  return async function(request, options) {
    var _a3, e_1, _b, _c;
    var _d, _e2;
    const response = await transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues);
    (_d = options === null || options === void 0 ? void 0 : options.onHeader) === null || _d === void 0 ? void 0 : _d.call(options, response.header);
    let singleMessage;
    let count = 0;
    try {
      for (var _f = true, _g = __asyncValues2(response.message), _h; _h = await _g.next(), _a3 = _h.done, !_a3; _f = true) {
        _c = _h.value;
        _f = false;
        const message = _c;
        singleMessage = message;
        count++;
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (!_f && !_a3 && (_b = _g.return)) await _b.call(_g);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    if (!singleMessage) {
      throw new ConnectError("protocol error: missing response message", Code.Unimplemented);
    }
    if (count > 1) {
      throw new ConnectError("protocol error: received extra messages for client streaming method", Code.Unimplemented);
    }
    (_e2 = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _e2 === void 0 ? void 0 : _e2.call(options, response.trailer);
    return singleMessage;
  };
}
function createBiDiStreamingFn(transport, service, method) {
  return function(request, options) {
    return handleStreamResponse(transport.stream(service, method, options === null || options === void 0 ? void 0 : options.signal, options === null || options === void 0 ? void 0 : options.timeoutMs, options === null || options === void 0 ? void 0 : options.headers, request, options === null || options === void 0 ? void 0 : options.contextValues), options);
  };
}
function handleStreamResponse(stream, options) {
  const it7 = (function() {
    return __asyncGenerator2(this, arguments, function* () {
      var _a3, _b;
      const response = yield __await2(stream);
      (_a3 = options === null || options === void 0 ? void 0 : options.onHeader) === null || _a3 === void 0 ? void 0 : _a3.call(options, response.header);
      yield __await2(yield* __asyncDelegator2(__asyncValues2(response.message)));
      (_b = options === null || options === void 0 ? void 0 : options.onTrailer) === null || _b === void 0 ? void 0 : _b.call(options, response.trailer);
    });
  })()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => it7.next()
    })
  };
}

// node_modules/@connectrpc/connect/dist/esm/protocol/signals.js
function createLinkedAbortController(...signals) {
  const controller = new AbortController();
  const sa4 = signals.filter((s3) => s3 !== void 0).concat(controller.signal);
  for (const signal of sa4) {
    if (signal.aborted) {
      onAbort.apply(signal);
      break;
    }
    signal.addEventListener("abort", onAbort);
  }
  function onAbort() {
    if (!controller.signal.aborted) {
      controller.abort(getAbortSignalReason(this));
    }
    for (const signal of sa4) {
      signal.removeEventListener("abort", onAbort);
    }
  }
  return controller;
}
function createDeadlineSignal(timeoutMs) {
  const controller = new AbortController();
  const listener = () => {
    controller.abort(new ConnectError("the operation timed out", Code.DeadlineExceeded));
  };
  let timeoutId;
  if (timeoutMs !== void 0) {
    if (timeoutMs <= 0)
      listener();
    else
      timeoutId = setTimeout(listener, timeoutMs);
  }
  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId)
  };
}
function getAbortSignalReason(signal) {
  if (!signal.aborted) {
    return void 0;
  }
  if (signal.reason !== void 0) {
    return signal.reason;
  }
  const e = new Error("This operation was aborted");
  e.name = "AbortError";
  return e;
}

// node_modules/@connectrpc/connect/dist/esm/context-values.js
function createContextValues() {
  return {
    get(key) {
      return key.id in this ? this[key.id] : key.defaultValue;
    },
    set(key, value) {
      this[key.id] = value;
      return this;
    },
    delete(key) {
      delete this[key.id];
      return this;
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/protocol/create-method-url.js
function createMethodUrl(baseUrl, service, method) {
  const s3 = typeof service == "string" ? service : service.typeName;
  const m4 = typeof method == "string" ? method : method.name;
  return baseUrl.toString().replace(/\/?$/, `/${s3}/${m4}`);
}

// node_modules/@connectrpc/connect/dist/esm/protocol/normalize.js
function normalize(type, message) {
  return message instanceof type ? message : new type(message);
}
function normalizeIterable(messageType, input) {
  function transform(result) {
    if (result.done === true) {
      return result;
    }
    return {
      done: result.done,
      value: normalize(messageType, result.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const it7 = input[Symbol.asyncIterator]();
      const res = {
        next: () => it7.next().then(transform)
      };
      if (it7.throw !== void 0) {
        res.throw = (e) => it7.throw(e).then(transform);
      }
      if (it7.return !== void 0) {
        res.return = (v8) => it7.return(v8).then(transform);
      }
      return res;
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/interceptor.js
function applyInterceptors(next, interceptors) {
  var _a3;
  return (_a3 = interceptors === null || interceptors === void 0 ? void 0 : interceptors.concat().reverse().reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (n3, i2) => i2(n3),
    next
  )) !== null && _a3 !== void 0 ? _a3 : next;
}

// node_modules/@connectrpc/connect/dist/esm/protocol/serialization.js
function getJsonOptions(options) {
  var _a3;
  const o3 = Object.assign({}, options);
  (_a3 = o3.ignoreUnknownFields) !== null && _a3 !== void 0 ? _a3 : o3.ignoreUnknownFields = true;
  return o3;
}
function createClientMethodSerializers(method, useBinaryFormat, jsonOptions, binaryOptions) {
  const input = useBinaryFormat ? createBinarySerialization(method.I, binaryOptions) : createJsonSerialization(method.I, jsonOptions);
  const output = useBinaryFormat ? createBinarySerialization(method.O, binaryOptions) : createJsonSerialization(method.O, jsonOptions);
  return { parse: output.parse, serialize: input.serialize };
}
function createBinarySerialization(messageType, options) {
  return {
    parse(data2) {
      try {
        return messageType.fromBinary(data2, options);
      } catch (e) {
        const m4 = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`parse binary: ${m4}`, Code.Internal);
      }
    },
    serialize(data2) {
      try {
        return data2.toBinary(options);
      } catch (e) {
        const m4 = e instanceof Error ? e.message : String(e);
        throw new ConnectError(`serialize binary: ${m4}`, Code.Internal);
      }
    }
  };
}
function createJsonSerialization(messageType, options) {
  var _a3, _b;
  const textEncoder = (_a3 = options === null || options === void 0 ? void 0 : options.textEncoder) !== null && _a3 !== void 0 ? _a3 : new TextEncoder();
  const textDecoder = (_b = options === null || options === void 0 ? void 0 : options.textDecoder) !== null && _b !== void 0 ? _b : new TextDecoder();
  const o3 = getJsonOptions(options);
  return {
    parse(data2) {
      try {
        const json = textDecoder.decode(data2);
        return messageType.fromJsonString(json, o3);
      } catch (e) {
        throw ConnectError.from(e, Code.InvalidArgument);
      }
    },
    serialize(data2) {
      try {
        const json = data2.toJsonString(o3);
        return textEncoder.encode(json);
      } catch (e) {
        throw ConnectError.from(e, Code.Internal);
      }
    }
  };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/content-type.js
var contentTypeRegExp = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i;
var contentTypeUnaryProto = "application/proto";
var contentTypeUnaryJson = "application/json";
var contentTypeStreamProto = "application/connect+proto";
var contentTypeStreamJson = "application/connect+json";
function parseContentType(contentType) {
  const match = contentType === null || contentType === void 0 ? void 0 : contentType.match(contentTypeRegExp);
  if (!match) {
    return void 0;
  }
  const stream = !!match[1];
  const binary = !!match[3];
  return { stream, binary };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/error-json.js
function errorFromJson(jsonValue, metadata, fallback2) {
  var _a3;
  if (metadata) {
    new Headers(metadata).forEach((value, key) => fallback2.metadata.append(key, value));
  }
  if (typeof jsonValue !== "object" || jsonValue == null || Array.isArray(jsonValue)) {
    throw fallback2;
  }
  let code = fallback2.code;
  if ("code" in jsonValue && typeof jsonValue.code === "string") {
    code = (_a3 = codeFromString(jsonValue.code)) !== null && _a3 !== void 0 ? _a3 : code;
  }
  const message = jsonValue.message;
  if (message != null && typeof message !== "string") {
    throw fallback2;
  }
  const error = new ConnectError(message !== null && message !== void 0 ? message : "", code, metadata);
  if ("details" in jsonValue && Array.isArray(jsonValue.details)) {
    for (const detail of jsonValue.details) {
      if (detail === null || typeof detail != "object" || Array.isArray(detail) || typeof detail.type != "string" || typeof detail.value != "string") {
        throw fallback2;
      }
      try {
        error.details.push({
          type: detail.type,
          value: protoBase64.dec(detail.value),
          debug: detail.debug
        });
      } catch (e) {
        throw fallback2;
      }
    }
  }
  return error;
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/end-stream.js
var endStreamFlag = 2;
function endStreamFromJson(data2) {
  const parseErr = new ConnectError("invalid end stream", Code.Unknown);
  let jsonValue;
  try {
    jsonValue = JSON.parse(typeof data2 == "string" ? data2 : new TextDecoder().decode(data2));
  } catch (e) {
    throw parseErr;
  }
  if (typeof jsonValue != "object" || jsonValue == null || Array.isArray(jsonValue)) {
    throw parseErr;
  }
  const metadata = new Headers();
  if ("metadata" in jsonValue) {
    if (typeof jsonValue.metadata != "object" || jsonValue.metadata == null || Array.isArray(jsonValue.metadata)) {
      throw parseErr;
    }
    for (const [key, values] of Object.entries(jsonValue.metadata)) {
      if (!Array.isArray(values) || values.some((value) => typeof value != "string")) {
        throw parseErr;
      }
      for (const value of values) {
        metadata.append(key, value);
      }
    }
  }
  const error = "error" in jsonValue && jsonValue.error != null ? errorFromJson(jsonValue.error, metadata, parseErr) : void 0;
  return { metadata, error };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/headers.js
var headerContentType = "Content-Type";
var headerUnaryContentLength = "Content-Length";
var headerUnaryEncoding = "Content-Encoding";
var headerUnaryAcceptEncoding = "Accept-Encoding";
var headerTimeout = "Connect-Timeout-Ms";
var headerProtocolVersion = "Connect-Protocol-Version";
var headerUserAgent = "User-Agent";

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/http-status.js
function codeFromHttpStatus(httpStatus) {
  switch (httpStatus) {
    case 400:
      return Code.Internal;
    case 401:
      return Code.Unauthenticated;
    case 403:
      return Code.PermissionDenied;
    case 404:
      return Code.Unimplemented;
    case 429:
      return Code.Unavailable;
    case 502:
      return Code.Unavailable;
    case 503:
      return Code.Unavailable;
    case 504:
      return Code.Unavailable;
    default:
      return Code.Unknown;
  }
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/trailer-mux.js
function trailerDemux(header) {
  const h7 = new Headers(), t2 = new Headers();
  header.forEach((value, key) => {
    if (key.toLowerCase().startsWith("trailer-")) {
      t2.append(key.substring(8), value);
    } else {
      h7.append(key, value);
    }
  });
  return [h7, t2];
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/version.js
var protocolVersion = "1";

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/request-header.js
function requestHeader(methodKind, useBinaryFormat, timeoutMs, userProvidedHeaders, setUserAgent) {
  const result = new Headers(userProvidedHeaders !== null && userProvidedHeaders !== void 0 ? userProvidedHeaders : {});
  if (timeoutMs !== void 0) {
    result.set(headerTimeout, `${timeoutMs}`);
  }
  result.set(headerContentType, methodKind == MethodKind.Unary ? useBinaryFormat ? contentTypeUnaryProto : contentTypeUnaryJson : useBinaryFormat ? contentTypeStreamProto : contentTypeStreamJson);
  result.set(headerProtocolVersion, protocolVersion);
  if (setUserAgent && !result.has(headerUserAgent)) {
    result.set(headerUserAgent, "connect-es/1.7.0");
  }
  return result;
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/validate-response.js
function validateResponse(methodKind, useBinaryFormat, status, headers) {
  const mimeType = headers.get(headerContentType);
  const parsedType = parseContentType(mimeType);
  if (status !== 200) {
    const errorFromStatus = new ConnectError(`HTTP ${status}`, codeFromHttpStatus(status), headers);
    if (methodKind == MethodKind.Unary && parsedType && !parsedType.binary) {
      return { isUnaryError: true, unaryError: errorFromStatus };
    }
    throw errorFromStatus;
  }
  const allowedContentType = {
    binary: useBinaryFormat,
    stream: methodKind !== MethodKind.Unary
  };
  if ((parsedType === null || parsedType === void 0 ? void 0 : parsedType.binary) !== allowedContentType.binary || parsedType.stream !== allowedContentType.stream) {
    throw new ConnectError(`unsupported content type ${mimeType}`, parsedType === void 0 ? Code.Unknown : Code.Internal, headers);
  }
  return { isUnaryError: false };
}

// node_modules/@connectrpc/connect/dist/esm/protocol-connect/get-request.js
var contentTypePrefix = "application/";
function encodeMessageForUrl(message, useBase64) {
  if (useBase64) {
    return protoBase64.enc(message).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } else {
    return encodeURIComponent(new TextDecoder().decode(message));
  }
}
function transformConnectPostToGetRequest(request, message, useBase64) {
  let query = `?connect=v${protocolVersion}`;
  const contentType = request.header.get(headerContentType);
  if ((contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(contentTypePrefix)) === 0) {
    query += "&encoding=" + encodeURIComponent(contentType.slice(contentTypePrefix.length));
  }
  const compression = request.header.get(headerUnaryEncoding);
  if (compression !== null && compression !== "identity") {
    query += "&compression=" + encodeURIComponent(compression);
    useBase64 = true;
  }
  if (useBase64) {
    query += "&base64=1";
  }
  query += "&message=" + encodeMessageForUrl(message, useBase64);
  const url2 = request.url + query;
  const header = new Headers(request.header);
  [
    headerProtocolVersion,
    headerContentType,
    headerUnaryContentLength,
    headerUnaryEncoding,
    headerUnaryAcceptEncoding
  ].forEach((h7) => header.delete(h7));
  return Object.assign(Object.assign({}, request), {
    init: Object.assign(Object.assign({}, request.init), { method: "GET" }),
    url: url2,
    header
  });
}

// node_modules/@connectrpc/connect/dist/esm/protocol/run-call.js
function runUnaryCall(opt) {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = Object.assign(Object.assign({}, opt.req), { message: normalize(opt.req.method.I, opt.req.message), signal });
  return next(req).then((res) => {
    done();
    return res;
  }, abort);
}
function runStreamingCall(opt) {
  const next = applyInterceptors(opt.next, opt.interceptors);
  const [signal, abort, done] = setupSignal(opt);
  const req = Object.assign(Object.assign({}, opt.req), { message: normalizeIterable(opt.req.method.I, opt.req.message), signal });
  let doneCalled = false;
  signal.addEventListener("abort", function() {
    var _a3, _b;
    const it7 = opt.req.message[Symbol.asyncIterator]();
    if (!doneCalled) {
      (_a3 = it7.throw) === null || _a3 === void 0 ? void 0 : _a3.call(it7, this.reason).catch(() => {
      });
    }
    (_b = it7.return) === null || _b === void 0 ? void 0 : _b.call(it7).catch(() => {
    });
  });
  return next(req).then((res) => {
    return Object.assign(Object.assign({}, res), { message: {
      [Symbol.asyncIterator]() {
        const it7 = res.message[Symbol.asyncIterator]();
        return {
          next() {
            return it7.next().then((r2) => {
              if (r2.done == true) {
                doneCalled = true;
                done();
              }
              return r2;
            }, abort);
          }
          // We deliberately omit throw/return.
        };
      }
    } });
  }, abort);
}
function setupSignal(opt) {
  const { signal, cleanup } = createDeadlineSignal(opt.timeoutMs);
  const controller = createLinkedAbortController(opt.signal, signal);
  return [
    controller.signal,
    function abort(reason) {
      const e = ConnectError.from(signal.aborted ? getAbortSignalReason(signal) : reason);
      controller.abort(e);
      cleanup();
      return Promise.reject(e);
    },
    function done() {
      cleanup();
      controller.abort();
    }
  ];
}

// node_modules/@connectrpc/connect-web/dist/esm/assert-fetch-api.js
function assertFetchApi() {
  try {
    new Headers();
  } catch (_8) {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}

// node_modules/@connectrpc/connect-web/dist/esm/connect-transport.js
var __await3 = function(v8) {
  return this instanceof __await3 ? (this.v = v8, this) : new __await3(v8);
};
var __asyncGenerator3 = function(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g8 = generator.apply(thisArg, _arguments || []), i2, q7 = [];
  return i2 = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
    return this;
  }, i2;
  function awaitReturn(f6) {
    return function(v8) {
      return Promise.resolve(v8).then(f6, reject);
    };
  }
  function verb(n3, f6) {
    if (g8[n3]) {
      i2[n3] = function(v8) {
        return new Promise(function(a4, b7) {
          q7.push([n3, v8, a4, b7]) > 1 || resume(n3, v8);
        });
      };
      if (f6) i2[n3] = f6(i2[n3]);
    }
  }
  function resume(n3, v8) {
    try {
      step(g8[n3](v8));
    } catch (e) {
      settle(q7[0][3], e);
    }
  }
  function step(r2) {
    r2.value instanceof __await3 ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q7[0][2], r2);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f6, v8) {
    if (f6(v8), q7.shift(), q7.length) resume(q7[0][0], q7[0][1]);
  }
};
function createConnectTransport(options) {
  var _a3;
  assertFetchApi();
  const useBinaryFormat = (_a3 = options.useBinaryFormat) !== null && _a3 !== void 0 ? _a3 : false;
  return {
    async unary(service, method, signal, timeoutMs, header, message, contextValues) {
      var _a4;
      const { serialize, parse: parse2 } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
      timeoutMs = timeoutMs === void 0 ? options.defaultTimeoutMs : timeoutMs <= 0 ? void 0 : timeoutMs;
      return await runUnaryCall({
        interceptors: options.interceptors,
        signal,
        timeoutMs,
        req: {
          stream: false,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            credentials: (_a4 = options.credentials) !== null && _a4 !== void 0 ? _a4 : "same-origin",
            redirect: "error",
            mode: "cors"
          },
          header: requestHeader(method.kind, useBinaryFormat, timeoutMs, header, false),
          contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
          message
        },
        next: async (req) => {
          var _a5;
          const useGet = options.useHttpGet === true && method.idempotency === MethodIdempotency.NoSideEffects;
          let body = null;
          if (useGet) {
            req = transformConnectPostToGetRequest(req, serialize(req.message), useBinaryFormat);
          } else {
            body = serialize(req.message);
          }
          const fetch2 = (_a5 = options.fetch) !== null && _a5 !== void 0 ? _a5 : globalThis.fetch;
          const response = await fetch2(req.url, Object.assign(Object.assign({}, req.init), { headers: req.header, signal: req.signal, body }));
          const { isUnaryError, unaryError } = validateResponse(method.kind, useBinaryFormat, response.status, response.headers);
          if (isUnaryError) {
            throw errorFromJson(await response.json(), appendHeaders(...trailerDemux(response.headers)), unaryError);
          }
          const [demuxedHeader, demuxedTrailer] = trailerDemux(response.headers);
          return {
            stream: false,
            service,
            method,
            header: demuxedHeader,
            message: useBinaryFormat ? parse2(new Uint8Array(await response.arrayBuffer())) : method.O.fromJson(await response.json(), getJsonOptions(options.jsonOptions)),
            trailer: demuxedTrailer
          };
        }
      });
    },
    async stream(service, method, signal, timeoutMs, header, input, contextValues) {
      var _a4;
      const { serialize, parse: parse2 } = createClientMethodSerializers(method, useBinaryFormat, options.jsonOptions, options.binaryOptions);
      function parseResponseBody(body, trailerTarget, header2, signal2) {
        return __asyncGenerator3(this, arguments, function* parseResponseBody_1() {
          const reader = createEnvelopeReadableStream(body).getReader();
          let endStreamReceived = false;
          for (; ; ) {
            const result = yield __await3(reader.read());
            if (result.done) {
              break;
            }
            const { flags, data: data2 } = result.value;
            if ((flags & compressedFlag) === compressedFlag) {
              throw new ConnectError(`protocol error: received unsupported compressed output`, Code.Internal);
            }
            if ((flags & endStreamFlag) === endStreamFlag) {
              endStreamReceived = true;
              const endStream = endStreamFromJson(data2);
              if (endStream.error) {
                const error = endStream.error;
                header2.forEach((value, key) => {
                  error.metadata.append(key, value);
                });
                throw error;
              }
              endStream.metadata.forEach((value, key) => trailerTarget.set(key, value));
              continue;
            }
            yield yield __await3(parse2(data2));
          }
          if ("throwIfAborted" in signal2) {
            signal2.throwIfAborted();
          }
          if (!endStreamReceived) {
            throw "missing EndStreamResponse";
          }
        });
      }
      async function createRequestBody(input2) {
        if (method.kind != MethodKind.ServerStreaming) {
          throw "The fetch API does not support streaming request bodies";
        }
        const r2 = await input2[Symbol.asyncIterator]().next();
        if (r2.done == true) {
          throw "missing request message";
        }
        return encodeEnvelope(0, serialize(r2.value));
      }
      timeoutMs = timeoutMs === void 0 ? options.defaultTimeoutMs : timeoutMs <= 0 ? void 0 : timeoutMs;
      return await runStreamingCall({
        interceptors: options.interceptors,
        timeoutMs,
        signal,
        req: {
          stream: true,
          service,
          method,
          url: createMethodUrl(options.baseUrl, service, method),
          init: {
            method: "POST",
            credentials: (_a4 = options.credentials) !== null && _a4 !== void 0 ? _a4 : "same-origin",
            redirect: "error",
            mode: "cors"
          },
          header: requestHeader(method.kind, useBinaryFormat, timeoutMs, header, false),
          contextValues: contextValues !== null && contextValues !== void 0 ? contextValues : createContextValues(),
          message: input
        },
        next: async (req) => {
          var _a5;
          const fetch2 = (_a5 = options.fetch) !== null && _a5 !== void 0 ? _a5 : globalThis.fetch;
          const fRes = await fetch2(req.url, Object.assign(Object.assign({}, req.init), { headers: req.header, signal: req.signal, body: await createRequestBody(req.message) }));
          validateResponse(method.kind, useBinaryFormat, fRes.status, fRes.headers);
          if (fRes.body === null) {
            throw "missing response body";
          }
          const trailer = new Headers();
          const res = Object.assign(Object.assign({}, req), { header: fRes.headers, trailer, message: parseResponseBody(fRes.body, trailer, fRes.headers, req.signal) });
          return res;
        }
      });
    }
  };
}

// node_modules/@audiotool/nexus/dist/lang-K-8hAzE4.js
var s = (t2) => {
  throw t2 instanceof Error ? t2 : new Error(t2);
};
function c(t2, r2) {
  if (!t2)
    throw new Error(r2 ?? "assertion failed");
}
var i = (t2, r2) => new Promise((e) => {
  if ((r2 == null ? void 0 : r2.aborted) ?? false) {
    e();
    return;
  }
  const o3 = setTimeout(e, t2);
  r2 == null || r2.addEventListener(
    "abort",
    () => {
      clearTimeout(o3), e();
    },
    { once: true }
  );
});
var w = (t2, r2, e) => {
  const o3 = new AbortController(), n3 = Promise.withResolvers(), a4 = async () => {
    for (; ; ) {
      if (o3.signal.aborted)
        return n3.resolve();
      await t2(o3.signal), await i(r2, o3.signal);
    }
  };
  return (e == null ? void 0 : e.immediateTrigger) ?? true ? a4() : i(r2, o3.signal).then(a4), {
    terminate: async () => {
      o3.abort(), await n3.promise;
    }
  };
};

// node_modules/@audiotool/nexus/dist/types-Cztu157p.js
var os = Object.defineProperty;
var rs = (Ta2, i2, t2) => i2 in Ta2 ? os(Ta2, i2, { enumerable: true, configurable: true, writable: true, value: t2 }) : Ta2[i2] = t2;
var n = (Ta2, i2, t2) => rs(Ta2, typeof i2 != "symbol" ? i2 + "" : i2, t2);
var m = class m2 extends Message {
  constructor(i2) {
    super(), proto3.util.initPartial(i2, this);
  }
  static fromBinary(i2, t2) {
    return new m2().fromBinary(i2, t2);
  }
  static fromJson(i2, t2) {
    return new m2().fromJson(i2, t2);
  }
  static fromJsonString(i2, t2) {
    return new m2().fromJsonString(i2, t2);
  }
  static equals(i2, t2) {
    return proto3.util.equals(m2, i2, t2);
  }
};
n(m, "runtime", proto3), n(m, "typeName", "audiotool.document.v1.Empty"), n(m, "fields", proto3.util.newFieldList(() => []));
var o = m;
var l = class l2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gain", 0);
    n(this, "panning", 0);
    n(this, "isActive", false);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new l2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new l2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new l2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(l2, t2, a4);
  }
};
n(l, "runtime", proto3), n(l, "typeName", "audiotool.document.v1.entity.audio_device.v1.AudioDevice"), n(l, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 8, name: "audio_output", kind: "message", T: o }
]));
var ba = l;
var d = class d2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "blendModeIndex", 0);
    n(this, "audioInputA");
    n(this, "audioInputB");
    n(this, "audioInputC");
    n(this, "audioOutput");
    n(this, "mergeCoords");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new d2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new d2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new d2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(d2, t2, a4);
  }
};
n(d, "runtime", proto3), n(d, "typeName", "audiotool.document.v1.entity.audio_merger.v1.AudioMerger"), n(d, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "blend_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 6, name: "audio_input_a", kind: "message", T: o },
  { no: 7, name: "audio_input_b", kind: "message", T: o },
  { no: 8, name: "audio_input_c", kind: "message", T: o },
  { no: 9, name: "audio_output", kind: "message", T: o },
  { no: 10, name: "merge_coords", kind: "message", T: Ia }
]));
var La = d;
var c2 = class c3 extends Message {
  constructor(t2) {
    super();
    n(this, "x", 0);
    n(this, "y", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new c3().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new c3().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new c3().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(c3, t2, a4);
  }
};
n(c2, "runtime", proto3), n(c2, "typeName", "audiotool.document.v1.entity.audio_merger.v1.AudioMergerCoordinates"), n(c2, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "x",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "y",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var Ia = c2;
var u = class u2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "blendModeIndex", 0);
    n(this, "audioInput");
    n(this, "audioOutputA");
    n(this, "audioOutputB");
    n(this, "audioOutputC");
    n(this, "splitCoords");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new u2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new u2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new u2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(u2, t2, a4);
  }
};
n(u, "runtime", proto3), n(u, "typeName", "audiotool.document.v1.entity.audio_splitter.v1.AudioSplitter"), n(u, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "blend_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 6, name: "audio_input", kind: "message", T: o },
  { no: 7, name: "audio_output_a", kind: "message", T: o },
  { no: 8, name: "audio_output_b", kind: "message", T: o },
  { no: 9, name: "audio_output_c", kind: "message", T: o },
  { no: 10, name: "split_coords", kind: "message", T: za }
]));
var Pa = u;
var f = class f2 extends Message {
  constructor(t2) {
    super();
    n(this, "x", 0);
    n(this, "y", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new f2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new f2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new f2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(f2, t2, a4);
  }
};
n(f, "runtime", proto3), n(f, "typeName", "audiotool.document.v1.entity.audio_splitter.v1.AudioSplitterCoordinates"), n(f, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "x",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "y",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var za = f;
var p = class p2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "thresholdGain", 0);
    n(this, "attackMs", 0);
    n(this, "sustainMs", 0);
    n(this, "releaseMs", 0);
    n(this, "filterModeIndex", 0);
    n(this, "cutoffFrequencyHz", 0);
    n(this, "filterModulationDepth", 0);
    n(this, "filterResonance", 0);
    n(this, "gain", 0);
    n(this, "mix", 0);
    n(this, "audioInput");
    n(this, "sideChainInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new p2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new p2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new p2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(p2, t2, a4);
  }
};
n(p, "runtime", proto3), n(p, "typeName", "audiotool.document.v1.entity.auto_filter.v1.AutoFilter"), n(p, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "threshold_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "sustain_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "filter_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 10,
    name: "cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "filter_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "filter_resonance",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 15, name: "audio_input", kind: "message", T: o },
  { no: 16, name: "side_chain_input", kind: "message", T: o },
  { no: 17, name: "audio_output", kind: "message", T: o },
  {
    no: 18,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Da = p;
var k = class k2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "filterLowHz", 0);
    n(this, "filterHighHz", 0);
    n(this, "highGain", 0);
    n(this, "highAudioOutput");
    n(this, "midGain", 0);
    n(this, "midAudioOutput");
    n(this, "lowGain", 0);
    n(this, "lowAudioOutput");
    n(this, "audioInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new k2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new k2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new k2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(k2, t2, a4);
  }
};
n(k, "runtime", proto3), n(k, "typeName", "audiotool.document.v1.entity.band_splitter.v1.BandSplitter"), n(k, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "filter_low_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "filter_high_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "high_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 8, name: "high_audio_output", kind: "message", T: o },
  {
    no: 9,
    name: "mid_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 10, name: "mid_audio_output", kind: "message", T: o },
  {
    no: 11,
    name: "low_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 12, name: "low_audio_output", kind: "message", T: o },
  { no: 13, name: "audio_input", kind: "message", T: o }
]));
var Oa = k;
var T = class T2 extends Message {
  constructor(t2) {
    super();
    n(this, "entityId", "");
    n(this, "fieldIndex", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new T2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new T2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new T2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(T2, t2, a4);
  }
};
n(T, "runtime", proto3), n(T, "typeName", "audiotool.document.v1.Pointer"), n(T, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "entity_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "field_index", kind: "scalar", T: 13, repeated: true }
]));
var r = T;
var y = class y2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gain", 0);
    n(this, "tuneSemitones", 0);
    n(this, "cutoffFrequencyHz", 0);
    n(this, "filterResonance", 0);
    n(this, "filterEnvelopeModulationDepth", 0);
    n(this, "filterDecay", 0);
    n(this, "accent", 0);
    n(this, "waveformIndex", 0);
    n(this, "patternIndex", 0);
    n(this, "patternSlots", []);
    n(this, "microTuning");
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new y2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new y2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new y2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(y2, t2, a4);
  }
};
n(y, "runtime", proto3), n(y, "typeName", "audiotool.document.v1.entity.bassline.v1.Bassline"), n(y, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "tune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "filter_resonance",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "filter_envelope_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "filter_decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "accent",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "waveform_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 13,
    name: "pattern_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 14, name: "pattern_slots", kind: "message", T: o, repeated: true },
  { no: 15, name: "micro_tuning", kind: "message", T: r },
  { no: 16, name: "audio_input", kind: "message", T: o },
  { no: 17, name: "audio_output", kind: "message", T: o },
  {
    no: 18,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ma = y;
var g = class g2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "groove");
    n(this, "length", 0);
    n(this, "steps", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new g2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new g2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new g2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(g2, t2, a4);
  }
};
n(g, "runtime", proto3), n(g, "typeName", "audiotool.document.v1.entity.bassline.v1.BasslinePattern"), n(g, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  { no: 3, name: "groove", kind: "message", T: r },
  {
    no: 4,
    name: "length",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 5, name: "steps", kind: "message", T: Ya, repeated: true }
]));
var Aa = g;
var v = class v2 extends Message {
  constructor(t2) {
    super();
    n(this, "key", 0);
    n(this, "transposeOctaves", 0);
    n(this, "isActive", false);
    n(this, "doesSlide", false);
    n(this, "isAccented", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new v2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new v2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new v2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(v2, t2, a4);
  }
};
n(v, "runtime", proto3), n(v, "typeName", "audiotool.document.v1.entity.bassline.v1.BasslineStep"), n(v, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "key",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "transpose_octaves",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "does_slide",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "is_accented",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ya = v;
var w2 = class w3 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gain", 0);
    n(this, "accentAmount", 0);
    n(this, "isActive", false);
    n(this, "patternSlots", []);
    n(this, "patternIndex", 0);
    n(this, "bassdrum");
    n(this, "snaredrum");
    n(this, "tomCongaLow");
    n(this, "tomCongaMid");
    n(this, "tomCongaHigh");
    n(this, "rimClaves");
    n(this, "clapMaracas");
    n(this, "cowbell");
    n(this, "cymbal");
    n(this, "openHihat");
    n(this, "closedHihat");
    n(this, "audioOutput");
    n(this, "notesInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new w3().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new w3().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new w3().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(w3, t2, a4);
  }
};
n(w2, "runtime", proto3), n(w2, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8"), n(w2, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "accent_amount",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 8, name: "pattern_slots", kind: "message", T: o, repeated: true },
  {
    no: 9,
    name: "pattern_index",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 10, name: "bassdrum", kind: "message", T: Va },
  { no: 11, name: "snaredrum", kind: "message", T: Ua },
  { no: 12, name: "tom_conga_low", kind: "message", T: Ea },
  { no: 13, name: "tom_conga_mid", kind: "message", T: Wa },
  { no: 14, name: "tom_conga_high", kind: "message", T: ja },
  { no: 15, name: "rim_claves", kind: "message", T: Ka },
  { no: 16, name: "clap_maracas", kind: "message", T: Za },
  { no: 17, name: "cowbell", kind: "message", T: $a },
  { no: 18, name: "cymbal", kind: "message", T: Qa },
  { no: 19, name: "open_hihat", kind: "message", T: Ra },
  { no: 20, name: "closed_hihat", kind: "message", T: Ca },
  { no: 21, name: "audio_output", kind: "message", T: o },
  { no: 22, name: "notes_input", kind: "message", T: o }
]));
var Xa = w2;
var J = class J2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "groove");
    n(this, "length", 0);
    n(this, "stepScaleIndex", 0);
    n(this, "steps", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new J2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new J2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new J2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(J2, t2, a4);
  }
};
n(J, "runtime", proto3), n(J, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8Pattern"), n(J, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  { no: 3, name: "groove", kind: "message", T: r },
  {
    no: 4,
    name: "length",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "step_scale_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 6, name: "steps", kind: "message", T: Ha, repeated: true }
]));
var Ga = J;
var h = class h2 extends Message {
  constructor(t2) {
    super();
    n(this, "bassdrumIsActive", false);
    n(this, "snaredrumIsActive", false);
    n(this, "tomCongaLowIsActive", false);
    n(this, "tomCongaMidIsActive", false);
    n(this, "tomCongaHighIsActive", false);
    n(this, "rimClavesIsActive", false);
    n(this, "clapMaracasIsActive", false);
    n(this, "cowbellIsActive", false);
    n(this, "cymbalIsActive", false);
    n(this, "openHihatIsActive", false);
    n(this, "closedHihatIsActive", false);
    n(this, "isAccented", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new h2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new h2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new h2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(h2, t2, a4);
  }
};
n(h, "runtime", proto3), n(h, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8PatternStep"), n(h, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "bassdrum_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "snaredrum_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "tom_conga_low_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "tom_conga_mid_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "tom_conga_high_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "rim_claves_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "clap_maracas_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "cowbell_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 9,
    name: "cymbal_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 10,
    name: "open_hihat_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 11,
    name: "closed_hihat_is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 12,
    name: "is_accented",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ha = h;
var x = class x2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tone", 0);
    n(this, "decay", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new x2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new x2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new x2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(x2, t2, a4);
  }
};
n(x, "runtime", proto3), n(x, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8Bassdrum"), n(x, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tone",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var Va = x;
var q = class q2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tone", 0);
    n(this, "snappy", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new q2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new q2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new q2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(q2, t2, a4);
  }
};
n(q, "runtime", proto3), n(q, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8Snaredrum"), n(q, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tone",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "snappy",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var Ua = q;
var S = class S2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tuning", 0);
    n(this, "instrumentTypeIndex", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new S2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new S2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new S2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(S2, t2, a4);
  }
};
n(S, "runtime", proto3), n(S, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8TomCongaLow"), n(S, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tuning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "instrument_type_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var Ea = S;
var _ = class _2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tuning", 0);
    n(this, "instrumentTypeIndex", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new _2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new _2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new _2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(_2, t2, a4);
  }
};
n(_, "runtime", proto3), n(_, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8TomCongaMid"), n(_, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tuning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "instrument_type_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var Wa = _;
var B = class B2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tuning", 0);
    n(this, "instrumentTypeIndex", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new B2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new B2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new B2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(B2, t2, a4);
  }
};
n(B, "runtime", proto3), n(B, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8TomCongaHigh"), n(B, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tuning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "instrument_type_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var ja = B;
var F = class F2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "instrumentTypeIndex", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new F2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new F2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new F2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(F2, t2, a4);
  }
};
n(F, "runtime", proto3), n(F, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8RimClaves"), n(F, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "instrument_type_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 3, name: "audio_output", kind: "message", T: o }
]));
var Ka = F;
var N = class N2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "instrumentTypeIndex", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new N2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new N2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new N2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(N2, t2, a4);
  }
};
n(N, "runtime", proto3), n(N, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8ClapMaracas"), n(N, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "instrument_type_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 3, name: "audio_output", kind: "message", T: o }
]));
var Za = N;
var b = class b2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new b2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new b2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new b2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(b2, t2, a4);
  }
};
n(b, "runtime", proto3), n(b, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8Cowbell"), n(b, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 2, name: "audio_output", kind: "message", T: o }
]));
var $a = b;
var L = class L2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tone", 0);
    n(this, "decay", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new L2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new L2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new L2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(L2, t2, a4);
  }
};
n(L, "runtime", proto3), n(L, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8Cymbal"), n(L, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tone",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var Qa = L;
var I = class I2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "decay", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new I2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new I2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new I2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(I2, t2, a4);
  }
};
n(I, "runtime", proto3), n(I, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8OpenHihat"), n(I, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 3, name: "audio_output", kind: "message", T: o }
]));
var Ra = I;
var P = class P2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new P2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new P2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new P2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(P2, t2, a4);
  }
};
n(P, "runtime", proto3), n(P, "typeName", "audiotool.document.v1.entity.beatbox8.v1.Beatbox8ClosedHihat"), n(P, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 2, name: "audio_output", kind: "message", T: o }
]));
var Ca = P;
var z = class z2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gain", 0);
    n(this, "accentAmount", 0);
    n(this, "isActive", false);
    n(this, "patternSlots", []);
    n(this, "patternIndex", 0);
    n(this, "bassdrum");
    n(this, "snaredrum");
    n(this, "tomLow");
    n(this, "tomMid");
    n(this, "tomHigh");
    n(this, "rim");
    n(this, "clap");
    n(this, "hihat");
    n(this, "crash");
    n(this, "ride");
    n(this, "audioOutput");
    n(this, "notesInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new z2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new z2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new z2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(z2, t2, a4);
  }
};
n(z, "runtime", proto3), n(z, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9"), n(z, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "accent_amount",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 8, name: "pattern_slots", kind: "message", T: o, repeated: true },
  {
    no: 9,
    name: "pattern_index",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 10, name: "bassdrum", kind: "message", T: ee },
  { no: 11, name: "snaredrum", kind: "message", T: ie },
  { no: 12, name: "tom_low", kind: "message", T: ya },
  { no: 13, name: "tom_mid", kind: "message", T: ya },
  { no: 14, name: "tom_high", kind: "message", T: ya },
  { no: 15, name: "rim", kind: "message", T: se },
  { no: 16, name: "clap", kind: "message", T: oe },
  { no: 17, name: "hihat", kind: "message", T: re },
  { no: 18, name: "crash", kind: "message", T: me },
  { no: 19, name: "ride", kind: "message", T: le },
  { no: 20, name: "audio_output", kind: "message", T: o },
  { no: 21, name: "notes_input", kind: "message", T: o }
]));
var ne = z;
var D = class D2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "groove");
    n(this, "length", 0);
    n(this, "stepScaleIndex", 0);
    n(this, "steps", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new D2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new D2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new D2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(D2, t2, a4);
  }
};
n(D, "runtime", proto3), n(D, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Pattern"), n(D, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  { no: 3, name: "groove", kind: "message", T: r },
  {
    no: 4,
    name: "length",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "step_scale_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 6, name: "steps", kind: "message", T: ae, repeated: true }
]));
var te = D;
var O = class O2 extends Message {
  constructor(t2) {
    super();
    n(this, "bassdrumStepIndex", 0);
    n(this, "snaredrumStepIndex", 0);
    n(this, "tomLowStepIndex", 0);
    n(this, "tomMidStepIndex", 0);
    n(this, "tomHighStepIndex", 0);
    n(this, "rimStepIndex", 0);
    n(this, "clapStepIndex", 0);
    n(this, "closedHihatStepIndex", 0);
    n(this, "openHihatStepIndex", 0);
    n(this, "crashStepIndex", 0);
    n(this, "rideStepIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new O2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new O2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new O2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(O2, t2, a4);
  }
};
n(O, "runtime", proto3), n(O, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9PatternStep"), n(O, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "bassdrum_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "snaredrum_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "tom_low_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 4,
    name: "tom_mid_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "tom_high_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "rim_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 7,
    name: "clap_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 8,
    name: "closed_hihat_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "open_hihat_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 10,
    name: "crash_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 11,
    name: "ride_step_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var ae = O;
var M = class M2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tone", 0);
    n(this, "attack", 0);
    n(this, "decay", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new M2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new M2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new M2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(M2, t2, a4);
  }
};
n(M, "runtime", proto3), n(M, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Bassdrum"), n(M, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tone",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "attack",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 5, name: "audio_output", kind: "message", T: o }
]));
var ee = M;
var A = class A2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tune", 0);
    n(this, "tone", 0);
    n(this, "snappy", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new A2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new A2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new A2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(A2, t2, a4);
  }
};
n(A, "runtime", proto3), n(A, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Snaredrum"), n(A, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tune",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "tone",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "snappy",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 5, name: "audio_output", kind: "message", T: o }
]));
var ie = A;
var Y = class Y2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tune", 0);
    n(this, "decay", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Y2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Y2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Y2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Y2, t2, a4);
  }
};
n(Y, "runtime", proto3), n(Y, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Tom"), n(Y, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tune",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var ya = Y;
var X = class X2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new X2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new X2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new X2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(X2, t2, a4);
  }
};
n(X, "runtime", proto3), n(X, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Rim"), n(X, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 2, name: "audio_output", kind: "message", T: o }
]));
var se = X;
var G = class G2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new G2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new G2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new G2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(G2, t2, a4);
  }
};
n(G, "runtime", proto3), n(G, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Clap"), n(G, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 2, name: "audio_output", kind: "message", T: o }
]));
var oe = G;
var H = class H2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "closedDecay", 0);
    n(this, "openDecay", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new H2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new H2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new H2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(H2, t2, a4);
  }
};
n(H, "runtime", proto3), n(H, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Hihat"), n(H, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "closed_decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "open_decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "audio_output", kind: "message", T: o }
]));
var re = H;
var V = class V2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tune", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new V2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new V2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new V2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(V2, t2, a4);
  }
};
n(V, "runtime", proto3), n(V, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Crash"), n(V, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tune",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 3, name: "audio_output", kind: "message", T: o }
]));
var me = V;
var U = class U2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "tune", 0);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new U2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new U2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new U2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(U2, t2, a4);
  }
};
n(U, "runtime", proto3), n(U, "typeName", "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Ride"), n(U, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tune",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 3, name: "audio_output", kind: "message", T: o }
]));
var le = U;
var E = class E2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "postGain", 0);
    n(this, "panning", 0);
    n(this, "aux1");
    n(this, "aux2");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new E2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new E2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new E2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(E2, t2, a4);
  }
};
n(E, "runtime", proto3), n(E, "typeName", "audiotool.document.v1.entity.centroid.v1.Centroid"), n(E, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 7, name: "aux_1", kind: "message", T: wa },
  { no: 8, name: "aux_2", kind: "message", T: wa },
  { no: 9, name: "audio_output", kind: "message", T: o }
]));
var de = E;
var W = class W2 extends Message {
  constructor(t2) {
    super();
    n(this, "sendGain", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new W2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new W2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new W2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(W2, t2, a4);
  }
};
n(W, "runtime", proto3), n(W, "typeName", "audiotool.document.v1.entity.centroid.v1.CentroidAux"), n(W, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "send_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 2, name: "audio_input", kind: "message", T: o },
  { no: 3, name: "audio_output", kind: "message", T: o }
]));
var wa = W;
var j = class j2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "centroid");
    n(this, "orderAmongChannels", 0);
    n(this, "displayName", "");
    n(this, "audioInput");
    n(this, "preGain", 0);
    n(this, "eqHighGainDb", 0);
    n(this, "eqMidFrequency", 0);
    n(this, "eqMidGainDb", 0);
    n(this, "eqLowGainDb", 0);
    n(this, "aux1SendGain", 0);
    n(this, "aux2SendGain", 0);
    n(this, "useAuxPreMode", false);
    n(this, "panning", 0);
    n(this, "postGain", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new j2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new j2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new j2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(j2, t2, a4);
  }
};
n(j, "runtime", proto3), n(j, "typeName", "audiotool.document.v1.entity.centroid.v1.CentroidChannel"), n(j, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "centroid", kind: "message", T: r },
  {
    no: 3,
    name: "order_among_channels",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 5, name: "audio_input", kind: "message", T: o },
  {
    no: 6,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "eq_high_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "eq_mid_frequency",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "eq_mid_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "eq_low_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "aux1_send_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "aux2_send_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "use_aux_pre_mode",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 14,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 17,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ce = j;
var K = class K2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "tempoBpm", 0);
    n(this, "baseFrequencyHz", 0);
    n(this, "signatureNumerator", 0);
    n(this, "signatureDenominator", 0);
    n(this, "durationTicks", 0);
    n(this, "defaultGroove");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new K2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new K2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new K2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(K2, t2, a4);
  }
};
n(K, "runtime", proto3), n(K, "typeName", "audiotool.document.v1.entity.config.v1.Config"), n(K, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "tempo_bpm",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "base_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "signature_numerator",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "signature_denominator",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "duration_ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 7, name: "default_groove", kind: "message", T: r }
]));
var ue = K;
var Z = class Z2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "postGain", 0);
    n(this, "crossfade", 0);
    n(this, "panning", 0);
    n(this, "blendModeIndex", 0);
    n(this, "channelA");
    n(this, "channelB");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Z2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Z2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Z2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Z2, t2, a4);
  }
};
n(Z, "runtime", proto3), n(Z, "typeName", "audiotool.document.v1.entity.crossfader.v1.Crossfader"), n(Z, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "crossfade",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "blend_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 9, name: "channel_a", kind: "message", T: Ja },
  { no: 10, name: "channel_b", kind: "message", T: Ja },
  { no: 11, name: "audio_output", kind: "message", T: o }
]));
var fe = Z;
var $ = class $2 extends Message {
  constructor(t2) {
    super();
    n(this, "preGain", 0);
    n(this, "eqLowFrequencyHz", 0);
    n(this, "eqLowGainDb", 0);
    n(this, "lowKillEnabled", false);
    n(this, "eqMidFrequencyHz", 0);
    n(this, "eqMidGainDb", 0);
    n(this, "midKillEnabled", false);
    n(this, "eqHighFrequencyHz", 0);
    n(this, "eqHighGainDb", 0);
    n(this, "highKillEnabled", false);
    n(this, "audioInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new $2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new $2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new $2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals($2, t2, a4);
  }
};
n($, "runtime", proto3), n($, "typeName", "audiotool.document.v1.entity.crossfader.v1.CrossfaderChannel"), n($, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "eq_low_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "eq_low_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "low_kill_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "eq_mid_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "eq_mid_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "mid_kill_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "eq_high_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "eq_high_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "high_kill_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o }
]));
var Ja = $;
var Q = class Q2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gainDb", 0);
    n(this, "isActive", false);
    n(this, "spectrumModeIndex", 0);
    n(this, "lowPass");
    n(this, "highPass");
    n(this, "lowShelf");
    n(this, "highShelf");
    n(this, "peak1");
    n(this, "peak2");
    n(this, "peak3");
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Q2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Q2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Q2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Q2, t2, a4);
  }
};
n(Q, "runtime", proto3), n(Q, "typeName", "audiotool.document.v1.entity.curve.v1.Curve"), n(Q, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "spectrum_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 8, name: "low_pass", kind: "message", T: ha },
  { no: 9, name: "high_pass", kind: "message", T: ha },
  { no: 10, name: "low_shelf", kind: "message", T: xa },
  { no: 11, name: "high_shelf", kind: "message", T: xa },
  { no: 12, name: "peak_1", kind: "message", T: ga },
  { no: 13, name: "peak_2", kind: "message", T: ga },
  { no: 14, name: "peak_3", kind: "message", T: ga },
  { no: 15, name: "audio_input", kind: "message", T: o },
  { no: 16, name: "audio_output", kind: "message", T: o }
]));
var pe = Q;
var R = class R2 extends Message {
  constructor(t2) {
    super();
    n(this, "cutoffFrequencyHz", 0);
    n(this, "filterSlopeIndex", 0);
    n(this, "q", 0);
    n(this, "isEnabled", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new R2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new R2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new R2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(R2, t2, a4);
  }
};
n(R, "runtime", proto3), n(R, "typeName", "audiotool.document.v1.entity.curve.v1.CurvePass"), n(R, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "filter_slope_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "q",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ha = R;
var C = class C2 extends Message {
  constructor(t2) {
    super();
    n(this, "centerFrequencyHz", 0);
    n(this, "gainDb", 0);
    n(this, "isEnabled", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new C2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new C2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new C2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(C2, t2, a4);
  }
};
n(C, "runtime", proto3), n(C, "typeName", "audiotool.document.v1.entity.curve.v1.CurveShelf"), n(C, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "center_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var xa = C;
var nn = class nn2 extends Message {
  constructor(t2) {
    super();
    n(this, "centerFrequencyHz", 0);
    n(this, "gainDb", 0);
    n(this, "q", 0);
    n(this, "isEnabled", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new nn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new nn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new nn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(nn2, t2, a4);
  }
};
n(nn, "runtime", proto3), n(nn, "typeName", "audiotool.document.v1.entity.curve.v1.CurvePeak"), n(nn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "center_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "q",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ga = nn;
var tn = class tn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "fromSocket");
    n(this, "toSocket");
    n(this, "colorIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new tn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new tn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new tn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(tn2, t2, a4);
  }
};
n(tn, "runtime", proto3), n(tn, "typeName", "audiotool.document.v1.entity.desktop_audio_cable.v1.DesktopAudioCable"), n(tn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "from_socket", kind: "message", T: r },
  { no: 3, name: "to_socket", kind: "message", T: r },
  {
    no: 4,
    name: "color_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var ke = tn;
var an = class an2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "fromSocket");
    n(this, "toSocket");
    n(this, "colorIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new an2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new an2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new an2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(an2, t2, a4);
  }
};
n(an, "runtime", proto3), n(an, "typeName", "audiotool.document.v1.entity.desktop_note_cable.v1.DesktopNoteCable"), n(an, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "from_socket", kind: "message", T: r },
  { no: 3, name: "to_socket", kind: "message", T: r },
  {
    no: 4,
    name: "color_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var Te = an;
var en = class en2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "toneFrequencyHz", 0);
    n(this, "powerFactor", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new en2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new en2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new en2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(en2, t2, a4);
  }
};
n(en, "runtime", proto3), n(en, "typeName", "audiotool.document.v1.entity.exciter.v1.Exciter"), n(en, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "audio_input", kind: "message", T: o },
  { no: 6, name: "audio_output", kind: "message", T: o },
  {
    no: 7,
    name: "tone_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "power_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ye = en;
var sn = class sn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "soundfontId", "");
    n(this, "gain", 0);
    n(this, "notesInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new sn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new sn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new sn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(sn2, t2, a4);
  }
};
n(sn, "runtime", proto3), n(sn, "typeName", "audiotool.document.v1.entity.gakki.v1.Gakki"), n(sn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "soundfont_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 7, name: "notes_input", kind: "message", T: o },
  { no: 8, name: "audio_output", kind: "message", T: o }
]));
var ge = sn;
var on = class on2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "filter1");
    n(this, "filter2");
    n(this, "mix", 0);
    n(this, "gainDb", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new on2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new on2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new on2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(on2, t2, a4);
  }
};
n(on, "runtime", proto3), n(on, "typeName", "audiotool.document.v1.entity.graphical_eq.v1.GraphicalEQ"), n(on, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "filter_1", kind: "message", T: qa },
  { no: 6, name: "filter_2", kind: "message", T: qa },
  {
    no: 7,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 9, name: "audio_input", kind: "message", T: o },
  { no: 10, name: "audio_output", kind: "message", T: o },
  {
    no: 11,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ve = on;
var rn = class rn2 extends Message {
  constructor(t2) {
    super();
    n(this, "gainDb", 0);
    n(this, "frequencyHz", 0);
    n(this, "q", 0);
    n(this, "stereoSeparation", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new rn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new rn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new rn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(rn2, t2, a4);
  }
};
n(rn, "runtime", proto3), n(rn, "typeName", "audiotool.document.v1.entity.graphical_eq.v1.GraphicalEQFilter"), n(rn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "q",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "stereo_separation",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var qa = rn;
var mn = class mn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "thresholdDb", 0);
    n(this, "ratio", 0);
    n(this, "kneeDbRange", 0);
    n(this, "makeupGainDb", 0);
    n(this, "attackMs", 0);
    n(this, "releaseIsSynced", false);
    n(this, "releaseTimeNormalized", 0);
    n(this, "rmsWindowMs", 0);
    n(this, "isActive", false);
    n(this, "audioOutput");
    n(this, "audioInput");
    n(this, "sideChainInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new mn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new mn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new mn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(mn2, t2, a4);
  }
};
n(mn, "runtime", proto3), n(mn, "typeName", "audiotool.document.v1.entity.gravity.v1.Gravity"), n(mn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "threshold_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "ratio",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "knee_db_range",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "makeup_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "release_is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 11,
    name: "release_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "rms_window_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 14, name: "audio_output", kind: "message", T: o },
  { no: 15, name: "audio_input", kind: "message", T: o },
  { no: 16, name: "side_chain_input", kind: "message", T: o }
]));
var we = mn;
var ln = class ln2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "functionIndex", 0);
    n(this, "durationTicks", 0);
    n(this, "impact", 0);
    n(this, "displayName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ln2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ln2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ln2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ln2, t2, a4);
  }
};
n(ln, "runtime", proto3), n(ln, "typeName", "audiotool.document.v1.entity.groove.v1.Groove"), n(ln, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "function_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "duration_ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "impact",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Je = ln;
var dn = class dn2 extends Message {
  constructor(t2) {
    super();
    n(this, "isSynced", false);
    n(this, "attackTimeNormalized", 0);
    n(this, "attackSlopeFactor", 0);
    n(this, "decayTimeNormalized", 0);
    n(this, "decaySlopeFactor", 0);
    n(this, "decayIsLooped", false);
    n(this, "sustainFactor", 0);
    n(this, "releaseTimeNormalized", 0);
    n(this, "releaseSlopeFactor", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new dn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new dn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new dn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(dn2, t2, a4);
  }
};
n(dn, "runtime", proto3), n(dn, "typeName", "audiotool.document.v1.entity.adsr_envelope.v1.AdsrEnvelope"), n(dn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "attack_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "attack_slope_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "decay_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "decay_slope_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "decay_is_looped",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "sustain_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "release_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "release_slope_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var ma = dn;
var cn = class cn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "microTuning");
    n(this, "tuneSemitones", 0);
    n(this, "gain", 0);
    n(this, "playModeIndex", 0);
    n(this, "glideMs", 0);
    n(this, "velocityFactor", 0);
    n(this, "unisonoCount", 0);
    n(this, "unisonoDetuneSemitones", 0);
    n(this, "unisonoStereoSpreadFactor", 0);
    n(this, "operatorDetuneModeIndex", 0);
    n(this, "operatorA");
    n(this, "operatorB");
    n(this, "operatorC");
    n(this, "operatorD");
    n(this, "envelopeMain");
    n(this, "envelope2");
    n(this, "envelope3");
    n(this, "pitchEnvelope");
    n(this, "lfo1");
    n(this, "lfo2");
    n(this, "filter");
    n(this, "notesInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new cn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new cn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new cn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(cn2, t2, a4);
  }
};
n(cn, "runtime", proto3), n(cn, "typeName", "audiotool.document.v1.entity.heisenberg.v1.Heisenberg"), n(cn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "micro_tuning", kind: "message", T: r },
  {
    no: 6,
    name: "tune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "play_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "glide_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "velocity_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "unisono_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 12,
    name: "unisono_detune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "unisono_stereo_spread_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "operator_detune_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 15, name: "operator_a", kind: "message", T: fa },
  { no: 16, name: "operator_b", kind: "message", T: fa },
  { no: 17, name: "operator_c", kind: "message", T: fa },
  { no: 18, name: "operator_d", kind: "message", T: fa },
  { no: 19, name: "envelope_main", kind: "message", T: ma },
  { no: 20, name: "envelope_2", kind: "message", T: ma },
  { no: 21, name: "envelope_3", kind: "message", T: ma },
  { no: 22, name: "pitch_envelope", kind: "message", T: xe },
  { no: 23, name: "lfo_1", kind: "message", T: Sa },
  { no: 24, name: "lfo_2", kind: "message", T: Sa },
  { no: 25, name: "filter", kind: "message", T: qe },
  { no: 26, name: "notes_input", kind: "message", T: o },
  { no: 27, name: "audio_output", kind: "message", T: o },
  {
    no: 28,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var he = cn;
var un = class un2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "panning", 0);
    n(this, "detuneFactor", 0);
    n(this, "frequencyOffsetHz", 0);
    n(this, "waveformIndex", 0);
    n(this, "usePitchEnvelope", false);
    n(this, "modulationFactorA", 0);
    n(this, "modulationFactorB", 0);
    n(this, "modulationFactorC", 0);
    n(this, "modulationFactorD", 0);
    n(this, "velocityAmplitudeModulationDepth", 0);
    n(this, "envelopeMainAmplitudeModulationDepth", 0);
    n(this, "envelope2AmplitudeModulationDepth", 0);
    n(this, "envelope3AmplitudeModulationDepth", 0);
    n(this, "lfo1AmplitudeModulationDepth", 0);
    n(this, "lfo2AmplitudeModulationDepth", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new un2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new un2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new un2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(un2, t2, a4);
  }
};
n(un, "runtime", proto3), n(un, "typeName", "audiotool.document.v1.entity.heisenberg.v1.HeisenbergOperator"), n(un, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "detune_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "frequency_offset_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "waveform_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "use_pitch_envelope",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "modulation_factor_a",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "modulation_factor_b",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "modulation_factor_c",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "modulation_factor_d",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "velocity_amplitude_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "envelope_main_amplitude_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "envelope_2_amplitude_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "envelope_3_amplitude_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "lfo_1_amplitude_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "lfo_2_amplitude_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var fa = un;
var fn = class fn2 extends Message {
  constructor(t2) {
    super();
    n(this, "isSynced", false);
    n(this, "doesRestart", false);
    n(this, "rateNormalized", 0);
    n(this, "offsetFactor", 0);
    n(this, "delayTimeNormalized", 0);
    n(this, "blendTimeNormalized", 0);
    n(this, "waveformIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new fn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new fn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new fn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(fn2, t2, a4);
  }
};
n(fn, "runtime", proto3), n(fn, "typeName", "audiotool.document.v1.entity.heisenberg.v1.HeisenbergLFO"), n(fn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "does_restart",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "rate_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "offset_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "delay_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "blend_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "waveform_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var Sa = fn;
var pn = class pn2 extends Message {
  constructor(t2) {
    super();
    n(this, "isSynced", false);
    n(this, "loopDecayIndex", 0);
    n(this, "attackRangeFactor", 0);
    n(this, "attackTimeNormalized", 0);
    n(this, "attackSlopeFactor", 0);
    n(this, "decayRangeFactor", 0);
    n(this, "decayTimeNormalized", 0);
    n(this, "decaySlopeFactor", 0);
    n(this, "sustainRangeFactor", 0);
    n(this, "releaseTimeNormalized", 0);
    n(this, "releaseSlopeFactor", 0);
    n(this, "releaseRangeFactor", 0);
    n(this, "semitoneRange", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new pn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new pn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new pn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(pn2, t2, a4);
  }
};
n(pn, "runtime", proto3), n(pn, "typeName", "audiotool.document.v1.entity.heisenberg.v1.HeisenbergPitchEnvelope"), n(pn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "loop_decay_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "attack_range_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "attack_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "attack_slope_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "decay_range_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "decay_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "decay_slope_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "sustain_range_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "release_time_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "release_slope_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "release_range_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "semitone_range",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]));
var xe = pn;
var kn = class kn2 extends Message {
  constructor(t2) {
    super();
    n(this, "cutoffFrequencyHz", 0);
    n(this, "resonance", 0);
    n(this, "filterType", 0);
    n(this, "orderIndex", 0);
    n(this, "velocityCutoffModulationDepth", 0);
    n(this, "envelopeMainCutoffModulationDepth", 0);
    n(this, "envelope2CutoffModulationDepth", 0);
    n(this, "envelope3CutoffModulationDepth", 0);
    n(this, "lfo1CutoffModulationDepth", 0);
    n(this, "lfo2CutoffModulationDepth", 0);
    n(this, "keyboardTrackingAmount", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new kn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new kn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new kn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(kn2, t2, a4);
  }
};
n(kn, "runtime", proto3), n(kn, "typeName", "audiotool.document.v1.entity.heisenberg.v1.HeisenbergFilter"), n(kn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "resonance",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "filter_type",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "order_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "velocity_cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "envelope_main_cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "envelope_2_cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "envelope_3_cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "lfo_1_cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "lfo_2_cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "keyboard_tracking_amount",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var qe = kn;
var Tn = class Tn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "microTuning");
    n(this, "gain", 0);
    n(this, "decayTime", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "filters", []);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Tn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Tn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Tn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Tn2, t2, a4);
  }
};
n(Tn, "runtime", proto3), n(Tn, "typeName", "audiotool.document.v1.entity.helmholtz.v1.Helmholtz"), n(Tn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "micro_tuning", kind: "message", T: r },
  {
    no: 6,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "decay_time",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 10, name: "filters", kind: "message", T: _e, repeated: true },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var Se = Tn;
var yn = class yn2 extends Message {
  constructor(t2) {
    super();
    n(this, "isActive", false);
    n(this, "gain", 0);
    n(this, "panning", 0);
    n(this, "frequencyNote", 0);
    n(this, "frequencyTuneSemitones", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new yn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new yn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new yn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(yn2, t2, a4);
  }
};
n(yn, "runtime", proto3), n(yn, "typeName", "audiotool.document.v1.entity.helmholtz.v1.HelmholtzFilter"), n(yn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "frequency_note",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "frequency_tune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var _e = yn;
var gn = class gn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "postGain", 0);
    n(this, "channels", []);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new gn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new gn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new gn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(gn2, t2, a4);
  }
};
n(gn, "runtime", proto3), n(gn, "typeName", "audiotool.document.v1.entity.kobolt.v1.Kobolt"), n(gn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 6, name: "channels", kind: "message", T: Fe, repeated: true },
  { no: 7, name: "audio_output", kind: "message", T: o }
]));
var Be = gn;
var vn = class vn2 extends Message {
  constructor(t2) {
    super();
    n(this, "audioInput");
    n(this, "gain", 0);
    n(this, "panning", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new vn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new vn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new vn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(vn2, t2, a4);
  }
};
n(vn, "runtime", proto3), n(vn, "typeName", "audiotool.document.v1.entity.kobolt.v1.KoboltChannel"), n(vn, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "audio_input", kind: "message", T: o },
  {
    no: 2,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var Fe = vn;
var wn = class wn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "mainOutputGain", 0);
    n(this, "mainOutput");
    n(this, "globalModulationDepth", 0);
    n(this, "patternSlots", []);
    n(this, "patternIndex", 0);
    n(this, "channels", []);
    n(this, "notesInput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new wn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new wn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new wn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(wn2, t2, a4);
  }
};
n(wn, "runtime", proto3), n(wn, "typeName", "audiotool.document.v1.entity.machiniste.v1.Machiniste"), n(wn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "main_output_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 12, name: "main_output", kind: "message", T: o },
  {
    no: 6,
    name: "global_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 7, name: "pattern_slots", kind: "message", T: o, repeated: true },
  {
    no: 8,
    name: "pattern_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 9, name: "channels", kind: "message", T: Pe, repeated: true },
  { no: 11, name: "notes_input", kind: "message", T: o },
  {
    no: 13,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ne = wn;
var Jn = class Jn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "groove");
    n(this, "stepScaleIndex", 0);
    n(this, "length", 0);
    n(this, "channelPatterns", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Jn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Jn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Jn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Jn2, t2, a4);
  }
};
n(Jn, "runtime", proto3), n(Jn, "typeName", "audiotool.document.v1.entity.machiniste.v1.MachinistePattern"), n(Jn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  { no: 3, name: "groove", kind: "message", T: r },
  {
    no: 4,
    name: "step_scale_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "length",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 6, name: "channel_patterns", kind: "message", T: Le, repeated: true }
]));
var be = Jn;
var hn = class hn2 extends Message {
  constructor(t2) {
    super();
    n(this, "isExclusive", false);
    n(this, "isMuted", false);
    n(this, "steps", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new hn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new hn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new hn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(hn2, t2, a4);
  }
};
n(hn, "runtime", proto3), n(hn, "typeName", "audiotool.document.v1.entity.machiniste.v1.MachinisteChannelPattern"), n(hn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_exclusive",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 3, name: "steps", kind: "message", T: Ie, repeated: true }
]));
var Le = hn;
var xn = class xn2 extends Message {
  constructor(t2) {
    super();
    n(this, "isActive", false);
    n(this, "modulationDepth", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new xn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new xn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new xn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(xn2, t2, a4);
  }
};
n(xn, "runtime", proto3), n(xn, "typeName", "audiotool.document.v1.entity.machiniste.v1.MachinisteStep"), n(xn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var Ie = xn;
var qn = class qn2 extends Message {
  constructor(t2) {
    super();
    n(this, "sample");
    n(this, "startTrimFactor", 0);
    n(this, "startTrimModulationDepth", 0);
    n(this, "endTrimFactor", 0);
    n(this, "endTrimModulationDepth", 0);
    n(this, "pitchSemitones", 0);
    n(this, "pitchModulationDepth", 0);
    n(this, "filterTypeIndex", 0);
    n(this, "cutoffFrequencyHz", 0);
    n(this, "cutoffModulationDepth", 0);
    n(this, "resonance", 0);
    n(this, "resonanceModulationDepth", 0);
    n(this, "envelopePeakRatio", 0);
    n(this, "envelopeRatioModulationDepth", 0);
    n(this, "envelopeSlope", 0);
    n(this, "envelopeSlopeModulationDepth", 0);
    n(this, "panning", 0);
    n(this, "panningModulationDepth", 0);
    n(this, "gain", 0);
    n(this, "gainModulationDepth", 0);
    n(this, "channelOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new qn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new qn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new qn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(qn2, t2, a4);
  }
};
n(qn, "runtime", proto3), n(qn, "typeName", "audiotool.document.v1.entity.machiniste.v1.MachinisteChannel"), n(qn, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: r },
  {
    no: 2,
    name: "start_trim_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "start_trim_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "end_trim_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "end_trim_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "pitch_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "pitch_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "filter_type_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "cutoff_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "resonance",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "resonance_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "envelope_peak_ratio",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "envelope_ratio_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "envelope_slope",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "envelope_slope_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 17,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 18,
    name: "panning_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 19,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 20,
    name: "gain_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 21, name: "channel_output", kind: "message", T: o }
]));
var Pe = qn;
var Sn = class Sn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "isActive", false);
    n(this, "velocity", 0);
    n(this, "stepLengthIndex", 0);
    n(this, "repeat", 0);
    n(this, "gateRatio", 0);
    n(this, "arpeggiationModeIndex", 0);
    n(this, "randomSeed", 0);
    n(this, "octaves", 0);
    n(this, "holdNotes", false);
    n(this, "holdNotesUntilNote", 0);
    n(this, "ignorePatternStepParameters", false);
    n(this, "patternIsSynced", false);
    n(this, "patternSlots", []);
    n(this, "patternIndex", 0);
    n(this, "notesInput");
    n(this, "notesOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Sn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Sn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Sn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Sn2, t2, a4);
  }
};
n(Sn, "runtime", proto3), n(Sn, "typeName", "audiotool.document.v1.entity.matrix_arpeggiator.v1.MatrixArpeggiator"), n(Sn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "velocity",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "step_length_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 8,
    name: "repeat",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 9,
    name: "gate_ratio",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "arpeggiation_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 11,
    name: "random_seed",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 12,
    name: "octaves",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 13,
    name: "hold_notes",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 14,
    name: "hold_notes_until_note",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 15,
    name: "ignore_pattern_step_parameters",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 16,
    name: "pattern_is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 17, name: "pattern_slots", kind: "message", T: o, repeated: true },
  {
    no: 18,
    name: "pattern_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 19, name: "notes_input", kind: "message", T: o },
  { no: 20, name: "notes_output", kind: "message", T: o }
]));
var ze = Sn;
var _n = class _n2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "groove");
    n(this, "length", 0);
    n(this, "steps", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new _n2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new _n2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new _n2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(_n2, t2, a4);
  }
};
n(_n, "runtime", proto3), n(_n, "typeName", "audiotool.document.v1.entity.matrix_arpeggiator.v1.MatrixArpeggiatorPattern"), n(_n, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  { no: 3, name: "groove", kind: "message", T: r },
  {
    no: 4,
    name: "length",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "steps", kind: "message", T: Oe, repeated: true }
]));
var De = _n;
var Bn = class Bn2 extends Message {
  constructor(t2) {
    super();
    n(this, "overrideVelocity", false);
    n(this, "stepVelocity", 0);
    n(this, "isMuted", false);
    n(this, "isTied", false);
    n(this, "isChord", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Bn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Bn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Bn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Bn2, t2, a4);
  }
};
n(Bn, "runtime", proto3), n(Bn, "typeName", "audiotool.document.v1.entity.matrix_arpeggiator.v1.MatrixArpeggiatorPatternStep"), n(Bn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "override_velocity",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "step_velocity",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "is_tied",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "is_chord",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Oe = Bn;
var Fn = class Fn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "semitones", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Fn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Fn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Fn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Fn2, t2, a4);
  }
};
n(Fn, "runtime", proto3), n(Fn, "typeName", "audiotool.document.v1.entity.micro_tuning_octave.v1.MicroTuningOctave"), n(Fn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "semitones", kind: "scalar", T: 2, repeated: true }
]));
var Me = Fn;
var Nn = class Nn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gain", 0);
    n(this, "auxSendGain", 0);
    n(this, "auxIsPreGain", false);
    n(this, "channel1");
    n(this, "channel2");
    n(this, "channel3");
    n(this, "channel4");
    n(this, "mainOutput");
    n(this, "auxSendOutput");
    n(this, "auxReturnInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Nn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Nn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Nn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Nn2, t2, a4);
  }
};
n(Nn, "runtime", proto3), n(Nn, "typeName", "audiotool.document.v1.entity.minimixer.v1.Minimixer"), n(Nn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "aux_send_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "aux_is_pre_gain",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 8, name: "channel_1", kind: "message", T: pa },
  { no: 9, name: "channel_2", kind: "message", T: pa },
  { no: 10, name: "channel_3", kind: "message", T: pa },
  { no: 11, name: "channel_4", kind: "message", T: pa },
  { no: 12, name: "main_output", kind: "message", T: o },
  { no: 13, name: "aux_send_output", kind: "message", T: o },
  { no: 14, name: "aux_return_input", kind: "message", T: o }
]));
var Ae = Nn;
var bn = class bn2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "panning", 0);
    n(this, "auxSendGain", 0);
    n(this, "auxIsPreGain", false);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    n(this, "audioInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new bn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new bn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new bn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(bn2, t2, a4);
  }
};
n(bn, "runtime", proto3), n(bn, "typeName", "audiotool.document.v1.entity.minimixer.v1.MinimixerChannel"), n(bn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "aux_send_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "aux_is_pre_gain",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 7, name: "audio_input", kind: "message", T: o }
]));
var pa = bn;
var Ln = class Ln2 extends Message {
  constructor(t2) {
    super();
    n(this, "orderAmongStrips", 0);
    n(this, "displayName", "");
    n(this, "colorIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Ln2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Ln2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Ln2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Ln2, t2, a4);
  }
};
n(Ln, "runtime", proto3), n(Ln, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerStripDisplayParameters"), n(Ln, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "order_among_strips",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "color_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var la = Ln;
var In = class In2 extends Message {
  constructor(t2) {
    super();
    n(this, "highPassCutoffFrequencyHz", 0);
    n(this, "lowPassCutoffFrequencyHz", 0);
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new In2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new In2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new In2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(In2, t2, a4);
  }
};
n(In, "runtime", proto3), n(In, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerTrimFilter"), n(In, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "high_pass_cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "low_pass_cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var da = In;
var Pn = class Pn2 extends Message {
  constructor(t2) {
    super();
    n(this, "panning", 0);
    n(this, "postGain", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Pn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Pn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Pn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Pn2, t2, a4);
  }
};
n(Pn, "runtime", proto3), n(Pn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerStripFaderParameters"), n(Pn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ca = Pn;
var zn = class zn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayParameters");
    n(this, "preGain", 0);
    n(this, "trimFilter");
    n(this, "insertOutput");
    n(this, "insertInput");
    n(this, "faderParameters");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new zn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new zn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new zn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(zn2, t2, a4);
  }
};
n(zn, "runtime", proto3), n(zn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerAux"), n(zn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "display_parameters", kind: "message", T: la },
  {
    no: 3,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "trim_filter", kind: "message", T: da },
  { no: 5, name: "insert_output", kind: "message", T: o },
  { no: 6, name: "insert_input", kind: "message", T: o },
  { no: 7, name: "fader_parameters", kind: "message", T: ca }
]));
var Ye = zn;
var Dn = class Dn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "gain", 0);
    n(this, "auxSend");
    n(this, "auxReceive");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Dn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Dn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Dn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Dn2, t2, a4);
  }
};
n(Dn, "runtime", proto3), n(Dn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerAuxRoute"), n(Dn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 3, name: "aux_send", kind: "message", T: r },
  { no: 4, name: "aux_receive", kind: "message", T: r }
]));
var Xe = Dn;
var On = class On2 extends Message {
  constructor(t2) {
    super();
    n(this, "attackMs", 0);
    n(this, "releaseMs", 0);
    n(this, "makeupGainDb", 0);
    n(this, "detectionModeIndex", 0);
    n(this, "ratio", 0);
    n(this, "thresholdDb", 0);
    n(this, "isActive", false);
    n(this, "sideChainInput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new On2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new On2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new On2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(On2, t2, a4);
  }
};
n(On, "runtime", proto3), n(On, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerCompressor"), n(On, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "makeup_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "detection_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "ratio",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "threshold_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 8, name: "side_chain_input", kind: "message", T: o }
]));
var _a = On;
var Mn = class Mn2 extends Message {
  constructor(t2) {
    super();
    n(this, "lowShelfFrequencyHz", 0);
    n(this, "lowShelfGainDb", 0);
    n(this, "lowMidFrequencyHz", 0);
    n(this, "lowMidGainDb", 0);
    n(this, "highMidFrequencyHz", 0);
    n(this, "highMidGainDb", 0);
    n(this, "highShelfFrequencyHz", 0);
    n(this, "highShelfGainDb", 0);
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Mn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Mn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Mn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Mn2, t2, a4);
  }
};
n(Mn, "runtime", proto3), n(Mn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerEq"), n(Mn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "low_shelf_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "low_shelf_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "low_mid_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "low_mid_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "high_mid_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "high_mid_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "high_shelf_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "high_shelf_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ba = Mn;
var An = class An2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "audioInput");
    n(this, "displayParameters");
    n(this, "preGain", 0);
    n(this, "doesPhaseReverse", false);
    n(this, "trimFilter");
    n(this, "compressor");
    n(this, "eq");
    n(this, "auxSendsAreActive", false);
    n(this, "auxSend");
    n(this, "sideChainOutput");
    n(this, "faderParameters");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new An2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new An2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new An2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(An2, t2, a4);
  }
};
n(An, "runtime", proto3), n(An, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerChannel"), n(An, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "audio_input", kind: "message", T: o },
  { no: 3, name: "display_parameters", kind: "message", T: la },
  {
    no: 4,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "does_phase_reverse",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 6, name: "trim_filter", kind: "message", T: da },
  { no: 7, name: "compressor", kind: "message", T: _a },
  { no: 8, name: "eq", kind: "message", T: Ba },
  {
    no: 9,
    name: "aux_sends_are_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 10, name: "aux_send", kind: "message", T: o },
  { no: 11, name: "side_chain_output", kind: "message", T: o },
  { no: 12, name: "fader_parameters", kind: "message", T: ca }
]));
var Ge = An;
var Yn = class Yn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayParameters");
    n(this, "preGain", 0);
    n(this, "trimFilter");
    n(this, "feedbackFactor", 0);
    n(this, "stepCount", 0);
    n(this, "stepLengthIndex", 0);
    n(this, "faderParameters");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Yn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Yn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Yn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Yn2, t2, a4);
  }
};
n(Yn, "runtime", proto3), n(Yn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerDelayAux"), n(Yn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "display_parameters", kind: "message", T: la },
  {
    no: 3,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "trim_filter", kind: "message", T: da },
  {
    no: 5,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "step_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 7,
    name: "step_length_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 8, name: "fader_parameters", kind: "message", T: ca }
]));
var He = Yn;
var Xn = class Xn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayParameters");
    n(this, "trimFilter");
    n(this, "compressor");
    n(this, "eq");
    n(this, "insertOutput");
    n(this, "insertInput");
    n(this, "auxSendsAreActive", false);
    n(this, "auxSend");
    n(this, "sideChainOutput");
    n(this, "faderParameters");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Xn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Xn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Xn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Xn2, t2, a4);
  }
};
n(Xn, "runtime", proto3), n(Xn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerGroup"), n(Xn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "display_parameters", kind: "message", T: la },
  { no: 3, name: "trim_filter", kind: "message", T: da },
  { no: 4, name: "compressor", kind: "message", T: _a },
  { no: 5, name: "eq", kind: "message", T: Ba },
  { no: 6, name: "insert_output", kind: "message", T: o },
  { no: 7, name: "insert_input", kind: "message", T: o },
  {
    no: 8,
    name: "aux_sends_are_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 9, name: "aux_send", kind: "message", T: o },
  { no: 10, name: "side_chain_output", kind: "message", T: o },
  { no: 11, name: "fader_parameters", kind: "message", T: ca }
]));
var Ve = Xn;
var Gn = class Gn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "doBypassInserts", false);
    n(this, "insertOutput");
    n(this, "insertInput");
    n(this, "panning", 0);
    n(this, "postGain", 0);
    n(this, "limiterEnabled", false);
    n(this, "isMuted", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Gn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Gn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Gn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Gn2, t2, a4);
  }
};
n(Gn, "runtime", proto3), n(Gn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerMaster"), n(Gn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "do_bypass_inserts",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 6, name: "insert_output", kind: "message", T: o },
  { no: 7, name: "insert_input", kind: "message", T: o },
  {
    no: 8,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "limiter_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 11,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ue = Gn;
var Hn = class Hn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayParameters");
    n(this, "preGain", 0);
    n(this, "trimFilter");
    n(this, "roomSizeFactor", 0);
    n(this, "preDelayTimeMs", 0);
    n(this, "dampFactor", 0);
    n(this, "faderParameters");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Hn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Hn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Hn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Hn2, t2, a4);
  }
};
n(Hn, "runtime", proto3), n(Hn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerReverbAux"), n(Hn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "display_parameters", kind: "message", T: la },
  {
    no: 3,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 4, name: "trim_filter", kind: "message", T: da },
  {
    no: 5,
    name: "room_size_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "pre_delay_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "damp_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 8, name: "fader_parameters", kind: "message", T: ca }
]));
var Ee = Hn;
var Vn = class Vn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "from");
    n(this, "to");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Vn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Vn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Vn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Vn2, t2, a4);
  }
};
n(Vn, "runtime", proto3), n(Vn, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerSideChainCable"), n(Vn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "from", kind: "message", T: r },
  { no: 3, name: "to", kind: "message", T: r }
]));
var We = Vn;
var Un = class Un2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "childStrip");
    n(this, "groupStrip");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Un2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Un2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Un2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Un2, t2, a4);
  }
};
n(Un, "runtime", proto3), n(Un, "typeName", "audiotool.document.v1.entity.mixer.v1.MixerStripGrouping"), n(Un, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "child_strip", kind: "message", T: r },
  { no: 3, name: "group_strip", kind: "message", T: r }
]));
var je = Un;
var En = class En2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "notesInput");
    n(this, "channels", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new En2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new En2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new En2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(En2, t2, a4);
  }
};
n(En, "runtime", proto3), n(En, "typeName", "audiotool.document.v1.entity.note_splitter.v1.NoteSplitter"), n(En, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "notes_input", kind: "message", T: o },
  { no: 6, name: "channels", kind: "message", T: Ze, repeated: true }
]));
var Ke = En;
var Wn = class Wn2 extends Message {
  constructor(t2) {
    super();
    n(this, "notesOutput");
    n(this, "velocityModulation", 0);
    n(this, "isMuted", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Wn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Wn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Wn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Wn2, t2, a4);
  }
};
n(Wn, "runtime", proto3), n(Wn, "typeName", "audiotool.document.v1.entity.note_splitter.v1.NoteSplitterChannel"), n(Wn, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "notes_output", kind: "message", T: o },
  {
    no: 2,
    name: "velocity_modulation",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ze = Wn;
var jn = class jn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "leftFactor", 0);
    n(this, "rightFactor", 0);
    n(this, "leftPanning", 0);
    n(this, "rightPanning", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new jn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new jn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new jn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(jn2, t2, a4);
  }
};
n(jn, "runtime", proto3), n(jn, "typeName", "audiotool.document.v1.entity.panorama.v1.Panorama"), n(jn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "left_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "right_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "left_panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "right_panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 9, name: "audio_input", kind: "message", T: o },
  { no: 10, name: "audio_output", kind: "message", T: o },
  {
    no: 11,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var $e = jn;
var Kn = class Kn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "preDelayLeftTimeSemibreveIndex", 0);
    n(this, "preDelayLeftTimeMs", 0);
    n(this, "preDelayLeftPanning", 0);
    n(this, "preDelayRightTimeSemibreveIndex", 0);
    n(this, "preDelayRightTimeMs", 0);
    n(this, "preDelayRightPanning", 0);
    n(this, "feedbackDelayTimeSemibreveIndex", 0);
    n(this, "feedbackDelayTimeMs", 0);
    n(this, "lfoSpeedHz", 0);
    n(this, "lfoModulationDepthMs", 0);
    n(this, "feedbackFactor", 0);
    n(this, "stereoCrossFactor", 0);
    n(this, "filterMinHz", 0);
    n(this, "filterMaxHz", 0);
    n(this, "dryGain", 0);
    n(this, "wetGain", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Kn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Kn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Kn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Kn2, t2, a4);
  }
};
n(Kn, "runtime", proto3), n(Kn, "typeName", "audiotool.document.v1.entity.pulsar.v1.Pulsar"), n(Kn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "pre_delay_left_time_semibreve_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "pre_delay_left_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "pre_delay_left_panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "pre_delay_right_time_semibreve_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "pre_delay_right_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "pre_delay_right_panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "feedback_delay_time_semibreve_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 12,
    name: "feedback_delay_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "lfo_speed_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "lfo_modulation_depth_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "stereo_cross_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 17,
    name: "filter_min_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 18,
    name: "filter_max_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 19,
    name: "dry_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 20,
    name: "wet_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 21,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 22, name: "audio_input", kind: "message", T: o },
  { no: 23, name: "audio_output", kind: "message", T: o }
]));
var Qe = Kn;
var Zn = class Zn2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "notesInput");
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "gain", 0);
    n(this, "oscillatorA");
    n(this, "oscillatorB");
    n(this, "oscillatorC");
    n(this, "noise");
    n(this, "audio");
    n(this, "filter");
    n(this, "lfo");
    n(this, "filterEnvelope");
    n(this, "amplitudeEnvelope");
    n(this, "glideTimeMs", 0);
    n(this, "tuneSemitones", 0);
    n(this, "playModeIndex", 0);
    n(this, "microTuning");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Zn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Zn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Zn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Zn2, t2, a4);
  }
};
n(Zn, "runtime", proto3), n(Zn, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.Pulverisateur"), n(Zn, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "notes_input", kind: "message", T: o },
  { no: 6, name: "audio_input", kind: "message", T: o },
  { no: 7, name: "audio_output", kind: "message", T: o },
  {
    no: 8,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 9, name: "oscillator_a", kind: "message", T: Ce },
  { no: 10, name: "oscillator_b", kind: "message", T: ni },
  { no: 11, name: "oscillator_c", kind: "message", T: ti },
  { no: 12, name: "noise", kind: "message", T: ai },
  { no: 13, name: "audio", kind: "message", T: ei },
  { no: 14, name: "filter", kind: "message", T: ii },
  { no: 15, name: "lfo", kind: "message", T: si },
  { no: 16, name: "filter_envelope", kind: "message", T: oi },
  { no: 18, name: "amplitude_envelope", kind: "message", T: ri },
  {
    no: 19,
    name: "glide_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 20,
    name: "tune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 21,
    name: "play_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 22, name: "micro_tuning", kind: "message", T: r },
  {
    no: 23,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Re = Zn;
var $n = class $n2 extends Message {
  constructor(t2) {
    super();
    n(this, "channel");
    n(this, "oscillator");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new $n2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new $n2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new $n2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals($n2, t2, a4);
  }
};
n($n, "runtime", proto3), n($n, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurOscillatorA"), n($n, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "channel", kind: "message", T: ua },
  { no: 2, name: "oscillator", kind: "message", T: va }
]));
var Ce = $n;
var Qn = class Qn2 extends Message {
  constructor(t2) {
    super();
    n(this, "channel");
    n(this, "oscillator");
    n(this, "hardSyncToOscillatorA", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Qn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Qn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Qn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Qn2, t2, a4);
  }
};
n(Qn, "runtime", proto3), n(Qn, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurOscillatorB"), n(Qn, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "channel", kind: "message", T: ua },
  { no: 2, name: "oscillator", kind: "message", T: va },
  {
    no: 3,
    name: "hard_sync_to_oscillator_a",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ni = Qn;
var Rn = class Rn2 extends Message {
  constructor(t2) {
    super();
    n(this, "channel");
    n(this, "oscillator");
    n(this, "doesTrackKeyboard", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Rn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Rn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Rn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Rn2, t2, a4);
  }
};
n(Rn, "runtime", proto3), n(Rn, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurOscillatorC"), n(Rn, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "channel", kind: "message", T: ua },
  { no: 2, name: "oscillator", kind: "message", T: va },
  {
    no: 3,
    name: "does_track_keyboard",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ti = Rn;
var Cn = class Cn2 extends Message {
  constructor(t2) {
    super();
    n(this, "channel");
    n(this, "color", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Cn2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Cn2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Cn2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Cn2, t2, a4);
  }
};
n(Cn, "runtime", proto3), n(Cn, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurNoise"), n(Cn, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "channel", kind: "message", T: ua },
  {
    no: 2,
    name: "color",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var ai = Cn;
var nt = class nt2 extends Message {
  constructor(t2) {
    super();
    n(this, "channel");
    n(this, "drive", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new nt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new nt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new nt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(nt2, t2, a4);
  }
};
n(nt, "runtime", proto3), n(nt, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurAudio"), n(nt, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "channel", kind: "message", T: ua },
  {
    no: 2,
    name: "drive",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var ei = nt;
var tt = class tt2 extends Message {
  constructor(t2) {
    super();
    n(this, "modeIndex", 0);
    n(this, "cutoffFrequencyHz", 0);
    n(this, "resonance", 0);
    n(this, "filterSpacing", 0);
    n(this, "keyboardTrackingAmount", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new tt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new tt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new tt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(tt2, t2, a4);
  }
};
n(tt, "runtime", proto3), n(tt, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurFilter"), n(tt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "cutoff_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "resonance",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "filter_spacing",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "keyboard_tracking_amount",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var ii = tt;
var at = class at2 extends Message {
  constructor(t2) {
    super();
    n(this, "waveform", 0);
    n(this, "rateIsSynced", false);
    n(this, "rateNormalized", 0);
    n(this, "restartOnNote", false);
    n(this, "targetsOscillatorAPitch", false);
    n(this, "targetsOscillatorBPitch", false);
    n(this, "targetsOscillatorCPitch", false);
    n(this, "targetsFilterCutoff", false);
    n(this, "targetsPulseWidth", false);
    n(this, "modulationDepth", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new at2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new at2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new at2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(at2, t2, a4);
  }
};
n(at, "runtime", proto3), n(at, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurLfo"), n(at, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "waveform",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "rate_is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "rate_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "restart_on_note",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "targets_oscillator_a_pitch",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "targets_oscillator_b_pitch",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "targets_oscillator_c_pitch",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "targets_filter_cutoff",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 9,
    name: "targets_pulse_width",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 10,
    name: "modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var si = at;
var et = class et2 extends Message {
  constructor(t2) {
    super();
    n(this, "attackMs", 0);
    n(this, "decayMs", 0);
    n(this, "decayIsLooped", false);
    n(this, "sustainFactor", 0);
    n(this, "releaseMs", 0);
    n(this, "modulationDepth", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new et2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new et2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new et2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(et2, t2, a4);
  }
};
n(et, "runtime", proto3), n(et, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurFilterEnvelope"), n(et, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "decay_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "decay_is_looped",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "sustain_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 17,
    name: "modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var oi = et;
var it = class it2 extends Message {
  constructor(t2) {
    super();
    n(this, "attackMs", 0);
    n(this, "decayMs", 0);
    n(this, "decayIsLooped", false);
    n(this, "sustainFactor", 0);
    n(this, "releaseMs", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new it2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new it2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new it2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(it2, t2, a4);
  }
};
n(it, "runtime", proto3), n(it, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurAmplitudeEnvelope"), n(it, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "decay_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "decay_is_looped",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "sustain_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var ri = it;
var st = class st2 extends Message {
  constructor(t2) {
    super();
    n(this, "isActive", false);
    n(this, "panning", 0);
    n(this, "gain", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new st2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new st2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new st2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(st2, t2, a4);
  }
};
n(st, "runtime", proto3), n(st, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurChannel"), n(st, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var ua = st;
var ot = class ot2 extends Message {
  constructor(t2) {
    super();
    n(this, "tuneSemitones", 0);
    n(this, "tuneOctaves", 0);
    n(this, "waveform", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ot2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ot2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ot2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ot2, t2, a4);
  }
};
n(ot, "runtime", proto3), n(ot, "typeName", "audiotool.document.v1.entity.pulverisateur.v1.PulverisateurOscillator"), n(ot, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "tune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "tune_octaves",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "waveform",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var va = ot;
var rt = class rt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "gainDb", 0);
    n(this, "rmsWindowMs", 0);
    n(this, "isActive", false);
    n(this, "spectrumModeIndex", 0);
    n(this, "splitFrequencyHz", []);
    n(this, "bands", []);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new rt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new rt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new rt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(rt2, t2, a4);
  }
};
n(rt, "runtime", proto3), n(rt, "typeName", "audiotool.document.v1.entity.quantum.v1.Quantum"), n(rt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "rms_window_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "spectrum_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 9, name: "split_frequency_hz", kind: "scalar", T: 2, repeated: true },
  { no: 10, name: "bands", kind: "message", T: li, repeated: true },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var mi = rt;
var mt = class mt2 extends Message {
  constructor(t2) {
    super();
    n(this, "thresholdDb", 0);
    n(this, "ratio", 0);
    n(this, "kneeDb", 0);
    n(this, "attackMs", 0);
    n(this, "releaseMs", 0);
    n(this, "makeupGainDb", 0);
    n(this, "isCompressorActive", false);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new mt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new mt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new mt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(mt2, t2, a4);
  }
};
n(mt, "runtime", proto3), n(mt, "typeName", "audiotool.document.v1.entity.quantum.v1.QuantumBand"), n(mt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "threshold_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "ratio",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "knee_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "makeup_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_compressor_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 9,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var li = mt;
var lt = class lt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "preDelayMs", 0);
    n(this, "lowPassFrequencyHz", 0);
    n(this, "highPassFrequencyHz", 0);
    n(this, "filterSlopeIndex", 0);
    n(this, "dryGain", 0);
    n(this, "wetGain", 0);
    n(this, "isActive", false);
    n(this, "plateDecay", 0);
    n(this, "plateDamp", 0);
    n(this, "inputDiffusion", 0);
    n(this, "tankDiffusion", 0);
    n(this, "vibratoDepth", 0);
    n(this, "vibratoFrequencyHz", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new lt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new lt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new lt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(lt2, t2, a4);
  }
};
n(lt, "runtime", proto3), n(lt, "typeName", "audiotool.document.v1.entity.quasar.v1.Quasar"), n(lt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "pre_delay_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "low_pass_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "high_pass_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "filter_slope_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "dry_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "wet_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 12,
    name: "plate_decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "plate_damp",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "input_diffusion",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "tank_diffusion",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "vibrato_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 17,
    name: "vibrato_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 18, name: "audio_input", kind: "message", T: o },
  { no: 19, name: "audio_output", kind: "message", T: o }
]));
var di = lt;
var dt = class dt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "patternSlots", []);
    n(this, "patternIndex", 0);
    n(this, "channelConfigs", []);
    n(this, "shuffleConfig");
    n(this, "speedConfig");
    n(this, "stopConfig");
    n(this, "gateConfig");
    n(this, "stutterConfig");
    n(this, "scratchConfig");
    n(this, "reverseConfig");
    n(this, "audioInput");
    n(this, "masterOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new dt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new dt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new dt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(dt2, t2, a4);
  }
};
n(dt, "runtime", proto3), n(dt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.Rasselbock"), n(dt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "pattern_slots", kind: "message", T: o, repeated: true },
  {
    no: 6,
    name: "pattern_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 7, name: "channel_configs", kind: "message", T: pi, repeated: true },
  { no: 8, name: "shuffle_config", kind: "message", T: ki },
  { no: 9, name: "speed_config", kind: "message", T: Ti },
  { no: 10, name: "stop_config", kind: "message", T: yi },
  { no: 11, name: "gate_config", kind: "message", T: gi },
  { no: 12, name: "stutter_config", kind: "message", T: vi },
  { no: 13, name: "scratch_config", kind: "message", T: wi },
  { no: 14, name: "reverse_config", kind: "message", T: Ji },
  { no: 15, name: "audio_input", kind: "message", T: o },
  { no: 16, name: "master_output", kind: "message", T: o },
  {
    no: 17,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ci = dt;
var ct = class ct2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "length", 0);
    n(this, "channelPatterns", []);
    n(this, "effectOrder", []);
    n(this, "effectPatterns", []);
    n(this, "groove");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ct2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ct2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ct2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ct2, t2, a4);
  }
};
n(ct, "runtime", proto3), n(ct, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockPattern"), n(ct, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  {
    no: 3,
    name: "length",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 4, name: "channel_patterns", kind: "message", T: Fa, repeated: true },
  { no: 5, name: "effect_order", kind: "scalar", T: 2, repeated: true },
  { no: 6, name: "effect_patterns", kind: "message", T: Fa, repeated: true },
  { no: 7, name: "groove", kind: "message", T: r }
]));
var ui = ct;
var ut = class ut2 extends Message {
  constructor(t2) {
    super();
    n(this, "steps", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ut2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ut2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ut2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ut2, t2, a4);
  }
};
n(ut, "runtime", proto3), n(ut, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockRowPattern"), n(ut, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "steps", kind: "message", T: fi, repeated: true }
]));
var Fa = ut;
var ft = class ft2 extends Message {
  constructor(t2) {
    super();
    n(this, "isOn", false);
    n(this, "isEnd", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ft2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ft2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ft2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ft2, t2, a4);
  }
};
n(ft, "runtime", proto3), n(ft, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockStep"), n(ft, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_on",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "is_end",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var fi = ft;
var pt = class pt2 extends Message {
  constructor(t2) {
    super();
    n(this, "gain", 0);
    n(this, "panning", 0);
    n(this, "mix", 0);
    n(this, "mixMode", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new pt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new pt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new pt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(pt2, t2, a4);
  }
};
n(pt, "runtime", proto3), n(pt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockChannel"), n(pt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "panning",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "mix_mode",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 7, name: "audio_output", kind: "message", T: o }
]));
var pi = pt;
var kt = class kt2 extends Message {
  constructor(t2) {
    super();
    n(this, "intervalIndex", 0);
    n(this, "seed", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new kt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new kt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new kt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(kt2, t2, a4);
  }
};
n(kt, "runtime", proto3), n(kt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockShuffle"), n(kt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "interval_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "seed",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ki = kt;
var Tt = class Tt2 extends Message {
  constructor(t2) {
    super();
    n(this, "speedRatioIndex", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Tt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Tt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Tt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Tt2, t2, a4);
  }
};
n(Tt, "runtime", proto3), n(Tt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockSpeed"), n(Tt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "speed_ratio_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ti = Tt;
var yt = class yt2 extends Message {
  constructor(t2) {
    super();
    n(this, "durationIndex", 0);
    n(this, "doesSpinback", false);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new yt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new yt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new yt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(yt2, t2, a4);
  }
};
n(yt, "runtime", proto3), n(yt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockStop"), n(yt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "duration_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "does_spinback",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 3,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var yi = yt;
var gt = class gt2 extends Message {
  constructor(t2) {
    super();
    n(this, "intervalDurationIndex", 0);
    n(this, "durationFactor", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new gt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new gt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new gt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(gt2, t2, a4);
  }
};
n(gt, "runtime", proto3), n(gt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockGate"), n(gt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "interval_duration_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "duration_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var gi = gt;
var vt = class vt2 extends Message {
  constructor(t2) {
    super();
    n(this, "intervalDurationIndex", 0);
    n(this, "scaleFactor", 0);
    n(this, "pitchSemitones", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new vt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new vt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new vt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(vt2, t2, a4);
  }
};
n(vt, "runtime", proto3), n(vt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockStutter"), n(vt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "interval_duration_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "scale_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "pitch_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var vi = vt;
var wt = class wt2 extends Message {
  constructor(t2) {
    super();
    n(this, "rateBars", 0);
    n(this, "modulationDepth", 0);
    n(this, "modulationOffset", 0);
    n(this, "modulationShapeIndex", 0);
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new wt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new wt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new wt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(wt2, t2, a4);
  }
};
n(wt, "runtime", proto3), n(wt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockScratch"), n(wt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "rate_bars",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 2,
    name: "modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "modulation_offset",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "modulation_shape_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var wi = wt;
var Jt = class Jt2 extends Message {
  constructor(t2) {
    super();
    n(this, "isMuted", false);
    n(this, "isSoloed", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Jt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Jt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Jt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Jt2, t2, a4);
  }
};
n(Jt, "runtime", proto3), n(Jt, "typeName", "audiotool.document.v1.entity.rasselbock.v1.RasselbockReverse"), n(Jt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 2,
    name: "is_soloed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ji = Jt;
var ht = class ht2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "audioInput1");
    n(this, "audioInput2");
    n(this, "audioOutput");
    n(this, "gain", 0);
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ht2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ht2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ht2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ht2, t2, a4);
  }
};
n(ht, "runtime", proto3), n(ht, "typeName", "audiotool.document.v1.entity.ring_modulator.v1.RingModulator"), n(ht, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "audio_input_1", kind: "message", T: o },
  { no: 6, name: "audio_input_2", kind: "message", T: o },
  { no: 7, name: "audio_output", kind: "message", T: o },
  {
    no: 8,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var hi = ht;
var xt = class xt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "sampleName", "");
    n(this, "uploadStartTime", protoInt64.zero);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new xt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new xt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new xt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(xt2, t2, a4);
  }
};
n(xt, "runtime", proto3), n(xt, "typeName", "audiotool.document.v1.entity.sample.v1.Sample"), n(xt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "sample_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "upload_start_time",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }
]));
var xi = xt;
var qt = class qt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "microTuning");
    n(this, "gain", 0);
    n(this, "stereoDetuneShift", 0);
    n(this, "tuneSemitones", 0);
    n(this, "tuneASemitones", 0);
    n(this, "tuneBSemitones", 0);
    n(this, "glideMs", 0);
    n(this, "mixAB", 0);
    n(this, "lfoMixModulationDepth", 0);
    n(this, "lfoGainModulationDepth", 0);
    n(this, "lfoStereoDetuneShiftModulationDepth", 0);
    n(this, "lfoPanningModulationDepth", 0);
    n(this, "envelopeMixModulationDepth", 0);
    n(this, "envelopeTuneModulationDepth", 0);
    n(this, "envelopeLfoRateModulationDepth", 0);
    n(this, "envelopeLfoAmountModulationDepth", 0);
    n(this, "velocityGainModulationDepth", 0);
    n(this, "velocityMixModulationDepth", 0);
    n(this, "keyboardMixModulationDepth", 0);
    n(this, "notePlayModeIndex", 0);
    n(this, "lfo");
    n(this, "amplitudeEnvelope");
    n(this, "modulationEnvelope");
    n(this, "modulationEnvelopeHasRelease", false);
    n(this, "soundA");
    n(this, "soundB");
    n(this, "notesInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new qt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new qt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new qt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(qt2, t2, a4);
  }
};
n(qt, "runtime", proto3), n(qt, "typeName", "audiotool.document.v1.entity.space.v1.Space"), n(qt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "micro_tuning", kind: "message", T: r },
  {
    no: 6,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "stereo_detune_shift",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "tune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "tune_a_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "tune_b_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "glide_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "mix_a_b",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "lfo_mix_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "lfo_gain_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "lfo_stereo_detune_shift_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "lfo_panning_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 17,
    name: "envelope_mix_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 18,
    name: "envelope_tune_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 19,
    name: "envelope_lfo_rate_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 20,
    name: "envelope_lfo_amount_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 21,
    name: "velocity_gain_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 22,
    name: "velocity_mix_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 23,
    name: "keyboard_mix_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 24,
    name: "note_play_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 25, name: "lfo", kind: "message", T: Si },
  { no: 26, name: "amplitude_envelope", kind: "message", T: ma },
  { no: 27, name: "modulation_envelope", kind: "message", T: ma },
  {
    no: 28,
    name: "modulation_envelope_has_release",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 29, name: "sound_a", kind: "message", T: Na },
  { no: 30, name: "sound_b", kind: "message", T: Na },
  { no: 31, name: "notes_input", kind: "message", T: o },
  { no: 32, name: "audio_output", kind: "message", T: o },
  {
    no: 33,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var qi = qt;
var St = class St2 extends Message {
  constructor(t2) {
    super();
    n(this, "waveformIndex", 0);
    n(this, "rateNormalized", 0);
    n(this, "phaseOffset", 0);
    n(this, "isSynced", false);
    n(this, "doesRetrigger", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new St2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new St2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new St2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(St2, t2, a4);
  }
};
n(St, "runtime", proto3), n(St, "typeName", "audiotool.document.v1.entity.space.v1.SpaceLFO"), n(St, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "waveform_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "rate_normalized",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "phase_offset",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "is_synced",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "does_retrigger",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Si = St;
var _t = class _t2 extends Message {
  constructor(t2) {
    super();
    n(this, "dispersion", 0);
    n(this, "vaporisation", 0);
    n(this, "brightness", 0);
    n(this, "metal", 0);
    n(this, "separation", 0);
    n(this, "harmonicsCount", 0);
    n(this, "combFilterAmount", 0);
    n(this, "combFilterRate", 0);
    n(this, "combFilterWidth", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new _t2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new _t2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new _t2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(_t2, t2, a4);
  }
};
n(_t, "runtime", proto3), n(_t, "typeName", "audiotool.document.v1.entity.space.v1.SpaceSound"), n(_t, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "dispersion",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 2,
    name: "vaporisation",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "brightness",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "metal",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "separation",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 6,
    name: "harmonics_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 7,
    name: "comb_filter_amount",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "comb_filter_rate",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "comb_filter_width",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var Na = _t;
var Bt = class Bt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "expression", 0);
    n(this, "dynamics", 0);
    n(this, "reverb", 0);
    n(this, "release", 0);
    n(this, "tightness", 0);
    n(this, "vibrato", 0);
    n(this, "simpleMix", 0);
    n(this, "stereoPan", 0);
    n(this, "adsrAttack", 0);
    n(this, "adsrDecay", 0);
    n(this, "adsrSustain", 0);
    n(this, "adsrRelease", 0);
    n(this, "globalGain", 0);
    n(this, "globalPan", 0);
    n(this, "globalTune", 0);
    n(this, "stereoFlip", 0);
    n(this, "stereoSpread", 0);
    n(this, "variation", 0);
    n(this, "delay", 0);
    n(this, "amount", 0);
    n(this, "distortion", 0);
    n(this, "lushVerb", 0);
    n(this, "pedalVol", 0);
    n(this, "pedalDyn", 0);
    n(this, "length", 0);
    n(this, "timeMachine", 0);
    n(this, "stretch", 0);
    n(this, "softPedal", 0);
    n(this, "response", 0);
    n(this, "mallet", 0);
    n(this, "stopMute", 0);
    n(this, "direction", 0);
    n(this, "lowPassFilter", 0);
    n(this, "portamento", 0);
    n(this, "generalPurpose1", 0);
    n(this, "generalPurpose2", 0);
    n(this, "generalPurpose3", 0);
    n(this, "generalPurpose4", 0);
    n(this, "generalPurpose5", 0);
    n(this, "generalPurpose6", 0);
    n(this, "generalPurpose7", 0);
    n(this, "generalPurpose8", 0);
    n(this, "generalPurpose9", 0);
    n(this, "speed", 0);
    n(this, "compression", 0);
    n(this, "scale", 0);
    n(this, "depth", 0);
    n(this, "noiseFx", 0);
    n(this, "grainSpeed", 0);
    n(this, "audioOutput");
    n(this, "notesInput");
    n(this, "state", new Uint8Array(0));
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Bt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Bt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Bt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Bt2, t2, a4);
  }
};
n(Bt, "runtime", proto3), n(Bt, "typeName", "audiotool.document.v1.entity.spitfire_labs_vst3_plugin.v1.SpitfireLabsVst3Plugin"), n(Bt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "expression",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "dynamics",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "reverb",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "release",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "tightness",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "vibrato",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "simple_mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "stereo_pan",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 13,
    name: "adsr_attack",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "adsr_decay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 15,
    name: "adsr_sustain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 16,
    name: "adsr_release",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 17,
    name: "global_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 18,
    name: "global_pan",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 19,
    name: "global_tune",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 20,
    name: "stereo_flip",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 21,
    name: "stereo_spread",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 22,
    name: "variation",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 23,
    name: "delay",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 24,
    name: "amount",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 25,
    name: "distortion",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 26,
    name: "lush_verb",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 27,
    name: "pedal_vol",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 28,
    name: "pedal_dyn",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 29,
    name: "length",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 30,
    name: "time_machine",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 31,
    name: "stretch",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 32,
    name: "soft_pedal",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 33,
    name: "response",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 34,
    name: "mallet",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 35,
    name: "stop_mute",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 36,
    name: "direction",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 37,
    name: "low_pass_filter",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 38,
    name: "portamento",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 39,
    name: "general_purpose1",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 40,
    name: "general_purpose2",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 41,
    name: "general_purpose3",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 42,
    name: "general_purpose4",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 43,
    name: "general_purpose5",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 44,
    name: "general_purpose6",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 45,
    name: "general_purpose7",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 46,
    name: "general_purpose8",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 47,
    name: "general_purpose9",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 48,
    name: "speed",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 49,
    name: "compression",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 50,
    name: "scale",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 51,
    name: "depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 52,
    name: "noise_fx",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 53,
    name: "grain_speed",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 54, name: "audio_output", kind: "message", T: o },
  { no: 57, name: "notes_input", kind: "message", T: o },
  {
    no: 58,
    name: "state",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]));
var _i = Bt;
var Ft = class Ft2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "channelsAreInverted", false);
    n(this, "frequencyHz", 0);
    n(this, "stereoWidth", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Ft2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Ft2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Ft2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Ft2, t2, a4);
  }
};
n(Ft, "runtime", proto3), n(Ft, "typeName", "audiotool.document.v1.entity.stereo_enhancer.v1.StereoEnhancer"), n(Ft, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "channels_are_inverted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "stereo_width",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 8, name: "audio_input", kind: "message", T: o },
  { no: 9, name: "audio_output", kind: "message", T: o },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Bi = Ft;
var Nt = class Nt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "delayTimeMs", 0);
    n(this, "feedbackFactor", 0);
    n(this, "lfoFrequencyHz", 0);
    n(this, "lfoModulationDepth", 0);
    n(this, "spreadFactor", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Nt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Nt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Nt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Nt2, t2, a4);
  }
};
n(Nt, "runtime", proto3), n(Nt, "typeName", "audiotool.document.v1.entity.stompbox_chorus.v1.StompboxChorus"), n(Nt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "delay_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "lfo_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "lfo_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "spread_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var Fi = Nt;
var bt = class bt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "attackMs", 0);
    n(this, "releaseMs", 0);
    n(this, "makeupGainDb", 0);
    n(this, "detectionModeIndex", 0);
    n(this, "ratio", 0);
    n(this, "thresholdDb", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "sideChainInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new bt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new bt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new bt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(bt2, t2, a4);
  }
};
n(bt, "runtime", proto3), n(bt, "typeName", "audiotool.document.v1.entity.stompbox_compressor.v1.StompboxCompressor"), n(bt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "makeup_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "detection_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "ratio",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "threshold_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 12, name: "audio_input", kind: "message", T: o },
  { no: 13, name: "side_chain_input", kind: "message", T: o },
  { no: 14, name: "audio_output", kind: "message", T: o }
]));
var Ni = bt;
var Lt = class Lt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "preGain", 0);
    n(this, "downsamplingFactor", 0);
    n(this, "postGain", 0);
    n(this, "bits", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Lt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Lt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Lt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Lt2, t2, a4);
  }
};
n(Lt, "runtime", proto3), n(Lt, "typeName", "audiotool.document.v1.entity.stompbox_crusher.v1.StompboxCrusher"), n(Lt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "downsampling_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "bits",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 9,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var bi = Lt;
var It = class It2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "stepCount", 0);
    n(this, "stepLengthIndex", 0);
    n(this, "feedbackFactor", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new It2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new It2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new It2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(It2, t2, a4);
  }
};
n(It, "runtime", proto3), n(It, "typeName", "audiotool.document.v1.entity.stompbox_delay.v1.StompboxDelay"), n(It, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "step_count",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 6,
    name: "step_length_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 7,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 10, name: "audio_input", kind: "message", T: o },
  { no: 11, name: "audio_output", kind: "message", T: o }
]));
var Li = It;
var Pt = class Pt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "delayTimeMs", 0);
    n(this, "feedbackFactor", 0);
    n(this, "lfoFrequencyHz", 0);
    n(this, "lfoModulationDepth", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Pt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Pt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Pt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Pt2, t2, a4);
  }
};
n(Pt, "runtime", proto3), n(Pt, "typeName", "audiotool.document.v1.entity.stompbox_flanger.v1.StompboxFlanger"), n(Pt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "delay_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "lfo_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "lfo_modulation_depth",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 10, name: "audio_input", kind: "message", T: o },
  { no: 11, name: "audio_output", kind: "message", T: o }
]));
var Ii = Pt;
var zt = class zt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "attackMs", 0);
    n(this, "releaseMs", 0);
    n(this, "postGain", 0);
    n(this, "isInverted", false);
    n(this, "holdMs", 0);
    n(this, "thresholdGain", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "sideChainInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new zt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new zt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new zt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(zt2, t2, a4);
  }
};
n(zt, "runtime", proto3), n(zt, "typeName", "audiotool.document.v1.entity.stompbox_gate.v1.StompboxGate"), n(zt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "is_inverted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 9,
    name: "hold_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "threshold_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 12, name: "audio_input", kind: "message", T: o },
  { no: 13, name: "side_chain_input", kind: "message", T: o },
  { no: 14, name: "audio_output", kind: "message", T: o }
]));
var Pi = zt;
var Dt = class Dt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "frequencyHz", 0);
    n(this, "bandwidthFactor", 0);
    n(this, "postGainDb", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Dt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Dt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Dt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Dt2, t2, a4);
  }
};
n(Dt, "runtime", proto3), n(Dt, "typeName", "audiotool.document.v1.entity.stompbox_parametric_equalizer.v1.StompboxParametricEqualizer"), n(Dt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "bandwidth_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "post_gain_db",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 9, name: "audio_input", kind: "message", T: o },
  { no: 10, name: "audio_output", kind: "message", T: o }
]));
var zi = Dt;
var Ot = class Ot2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "minFrequencyHz", 0);
    n(this, "maxFrequencyHz", 0);
    n(this, "feedbackFactor", 0);
    n(this, "lfoFrequencyHz", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Ot2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Ot2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Ot2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Ot2, t2, a4);
  }
};
n(Ot, "runtime", proto3), n(Ot, "typeName", "audiotool.document.v1.entity.stompbox_phaser.v1.StompboxPhaser"), n(Ot, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "min_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "max_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "lfo_frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var Di = Ot;
var Mt = class Mt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "stepCount", 0);
    n(this, "stepLengthIndex", 0);
    n(this, "feedbackFactor", 0);
    n(this, "tuneFactor", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Mt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Mt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Mt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Mt2, t2, a4);
  }
};
n(Mt, "runtime", proto3), n(Mt, "typeName", "audiotool.document.v1.entity.stompbox_pitch_delay.v1.StompboxPitchDelay"), n(Mt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "step_count",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "step_length_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 7,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "tune_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var Oi = Mt;
var At = class At2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "roomSizeFactor", 0);
    n(this, "preDelayTimeMs", 0);
    n(this, "feedbackFactor", 0);
    n(this, "dampFactor", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new At2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new At2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new At2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(At2, t2, a4);
  }
};
n(At, "runtime", proto3), n(At, "typeName", "audiotool.document.v1.entity.stompbox_reverb.v1.StompboxReverb"), n(At, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "room_size_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "pre_delay_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "feedback_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "damp_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var Mi = At;
var Yt = class Yt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "filterModeIndex", 0);
    n(this, "frequencyHz", 0);
    n(this, "resonanceFactor", 0);
    n(this, "bandWidthHz", 0);
    n(this, "mix", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Yt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Yt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Yt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Yt2, t2, a4);
  }
};
n(Yt, "runtime", proto3), n(Yt, "typeName", "audiotool.document.v1.entity.stompbox_slope.v1.StompboxSlope"), n(Yt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "filter_mode_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "frequency_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "resonance_factor",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "band_width_hz",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 11, name: "audio_input", kind: "message", T: o },
  { no: 12, name: "audio_output", kind: "message", T: o }
]));
var Ai = Yt;
var Xt = class Xt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "detuneSemitones", 0);
    n(this, "delayTimeMs", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Xt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Xt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Xt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Xt2, t2, a4);
  }
};
n(Xt, "runtime", proto3), n(Xt, "typeName", "audiotool.document.v1.entity.stompbox_stereo_detune.v1.StompboxStereoDetune"), n(Xt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "detune_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "delay_time_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 8, name: "audio_input", kind: "message", T: o },
  { no: 9, name: "audio_output", kind: "message", T: o }
]));
var Yi = Xt;
var Gt = class Gt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "drive", 0);
    n(this, "tone", 0);
    n(this, "postGain", 0);
    n(this, "isActive", false);
    n(this, "audioInput");
    n(this, "audioOutput");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Gt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Gt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Gt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Gt2, t2, a4);
  }
};
n(Gt, "runtime", proto3), n(Gt, "typeName", "audiotool.document.v1.entity.stompbox_tube.v1.StompboxTube"), n(Gt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "drive",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "tone",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "post_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 9, name: "audio_input", kind: "message", T: o },
  { no: 10, name: "audio_output", kind: "message", T: o }
]));
var Xi = Gt;
var Ht = class Ht2 extends Message {
  constructor(t2) {
    super();
    n(this, "positionTicks", 0);
    n(this, "durationTicks", 0);
    n(this, "collectionOffsetTicks", 0);
    n(this, "loopOffsetTicks", 0);
    n(this, "loopDurationTicks", 0);
    n(this, "isEnabled", false);
    n(this, "colorIndex", 0);
    n(this, "displayName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Ht2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Ht2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Ht2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Ht2, t2, a4);
  }
};
n(Ht, "runtime", proto3), n(Ht, "typeName", "audiotool.document.v1.entity.region.v1.Region"), n(Ht, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "position_ticks",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 2,
    name: "duration_ticks",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "collection_offset_ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "loop_offset_ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "loop_duration_ticks",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 6,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "color_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 8,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var ka = Ht;
var Vt = class Vt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "region");
    n(this, "track");
    n(this, "playbackAutomationCollection");
    n(this, "sample");
    n(this, "gain", 0);
    n(this, "fadeInDurationTicks", 0);
    n(this, "fadeInSlope", 0);
    n(this, "fadeOutDurationTicks", 0);
    n(this, "fadeOutSlope", 0);
    n(this, "timestretchMode", 0);
    n(this, "pitchShiftSemitones", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Vt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Vt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Vt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Vt2, t2, a4);
  }
};
n(Vt, "runtime", proto3), n(Vt, "typeName", "audiotool.document.v1.entity.timeline.v1.audio.AudioRegion"), n(Vt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "region", kind: "message", T: ka },
  { no: 3, name: "track", kind: "message", T: r },
  { no: 4, name: "playback_automation_collection", kind: "message", T: r },
  { no: 5, name: "sample", kind: "message", T: r },
  {
    no: 6,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "fade_in_duration_ticks",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 8,
    name: "fade_in_slope",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "fade_out_duration_ticks",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 10,
    name: "fade_out_slope",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "timestretch_mode",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 12,
    name: "pitch_shift_semitones",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }
]));
var Gi = Vt;
var Ut = class Ut2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "orderAmongTracks", 0);
    n(this, "isEnabled", false);
    n(this, "groove");
    n(this, "player");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Ut2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Ut2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Ut2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Ut2, t2, a4);
  }
};
n(Ut, "runtime", proto3), n(Ut, "typeName", "audiotool.document.v1.entity.timeline.v1.audio.AudioTrack"), n(Ut, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "order_among_tracks",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 4, name: "groove", kind: "message", T: r },
  { no: 5, name: "player", kind: "message", T: r }
]));
var Hi = Ut;
var Et = class Et2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Et2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Et2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Et2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Et2, t2, a4);
  }
};
n(Et, "runtime", proto3), n(Et, "typeName", "audiotool.document.v1.entity.timeline.v1.automation.AutomationCollection"), n(Et, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Vi = Et;
var Wt = class Wt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "collection");
    n(this, "positionTicks", 0);
    n(this, "value", 0);
    n(this, "slope", 0);
    n(this, "interpolation", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Wt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Wt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Wt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Wt2, t2, a4);
  }
};
n(Wt, "runtime", proto3), n(Wt, "typeName", "audiotool.document.v1.entity.timeline.v1.automation.AutomationEvent"), n(Wt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "collection", kind: "message", T: r },
  {
    no: 3,
    name: "position_ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "value",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 5,
    name: "slope",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "interpolation",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }
]));
var Ui = Wt;
var jt = class jt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "region");
    n(this, "collection");
    n(this, "track");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new jt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new jt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new jt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(jt2, t2, a4);
  }
};
n(jt, "runtime", proto3), n(jt, "typeName", "audiotool.document.v1.entity.timeline.v1.automation.AutomationRegion"), n(jt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "region", kind: "message", T: ka },
  { no: 3, name: "collection", kind: "message", T: r },
  { no: 4, name: "track", kind: "message", T: r }
]));
var Ei = jt;
var Kt = class Kt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "orderAmongTracks", 0);
    n(this, "isEnabled", false);
    n(this, "automatedParameter");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Kt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Kt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Kt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Kt2, t2, a4);
  }
};
n(Kt, "runtime", proto3), n(Kt, "typeName", "audiotool.document.v1.entity.timeline.v1.automation.AutomationTrack"), n(Kt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "order_among_tracks",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 4, name: "automated_parameter", kind: "message", T: r }
]));
var Wi = Kt;
var Zt = class Zt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "isEnabled", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Zt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Zt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Zt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Zt2, t2, a4);
  }
};
n(Zt, "runtime", proto3), n(Zt, "typeName", "audiotool.document.v1.entity.timeline.v1.automation.TempoAutomationTrack"), n(Zt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ji = Zt;
var $t = class $t2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new $t2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new $t2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new $t2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals($t2, t2, a4);
  }
};
n($t, "runtime", proto3), n($t, "typeName", "audiotool.document.v1.entity.timeline.v1.note.NoteCollection"), n($t, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Ki = $t;
var Qt = class Qt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "collection");
    n(this, "positionTicks", 0);
    n(this, "durationTicks", 0);
    n(this, "pitch", 0);
    n(this, "velocity", 0);
    n(this, "doesSlide", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Qt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Qt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Qt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Qt2, t2, a4);
  }
};
n(Qt, "runtime", proto3), n(Qt, "typeName", "audiotool.document.v1.entity.timeline.v1.note.Note"), n(Qt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "collection", kind: "message", T: r },
  {
    no: 3,
    name: "position_ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "duration_ticks",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 5,
    name: "pitch",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 6,
    name: "velocity",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 7,
    name: "does_slide",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Zi = Qt;
var Rt = class Rt2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "region");
    n(this, "collection");
    n(this, "track");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Rt2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Rt2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Rt2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Rt2, t2, a4);
  }
};
n(Rt, "runtime", proto3), n(Rt, "typeName", "audiotool.document.v1.entity.timeline.v1.note.NoteRegion"), n(Rt, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "region", kind: "message", T: ka },
  { no: 3, name: "collection", kind: "message", T: r },
  { no: 4, name: "track", kind: "message", T: r }
]));
var $i = Rt;
var Ct = class Ct2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "orderAmongTracks", 0);
    n(this, "isEnabled", false);
    n(this, "groove");
    n(this, "player");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new Ct2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new Ct2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new Ct2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(Ct2, t2, a4);
  }
};
n(Ct, "runtime", proto3), n(Ct, "typeName", "audiotool.document.v1.entity.timeline.v1.note.NoteTrack"), n(Ct, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "order_among_tracks",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 4, name: "groove", kind: "message", T: r },
  { no: 5, name: "player", kind: "message", T: r }
]));
var Qi = Ct;
var na = class na2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "region");
    n(this, "patternIndex", 0);
    n(this, "track");
    n(this, "restart", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new na2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new na2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new na2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(na2, t2, a4);
  }
};
n(na, "runtime", proto3), n(na, "typeName", "audiotool.document.v1.entity.timeline.v1.pattern.PatternRegion"), n(na, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "region", kind: "message", T: ka },
  {
    no: 3,
    name: "pattern_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 4, name: "track", kind: "message", T: r },
  {
    no: 5,
    name: "restart",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var Ri = na;
var ta = class ta2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "orderAmongTracks", 0);
    n(this, "isEnabled", false);
    n(this, "player");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ta2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ta2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ta2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ta2, t2, a4);
  }
};
n(ta, "runtime", proto3), n(ta, "typeName", "audiotool.document.v1.entity.timeline.v1.pattern.PatternTrack"), n(ta, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "order_among_tracks",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "is_enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 4, name: "player", kind: "message", T: r }
]));
var Ci = ta;
var aa = class aa2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "audioInput");
    n(this, "audioOutput");
    n(this, "gain", 0);
    n(this, "isMuted", false);
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new aa2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new aa2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new aa2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(aa2, t2, a4);
  }
};
n(aa, "runtime", proto3), n(aa, "typeName", "audiotool.document.v1.entity.tiny_gain.v1.TinyGain"), n(aa, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 5, name: "audio_input", kind: "message", T: o },
  { no: 6, name: "audio_output", kind: "message", T: o },
  {
    no: 7,
    name: "gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "is_muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 9,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ns = aa;
var ea = class ea2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "patternIndex", 0);
    n(this, "patternSlots", []);
    n(this, "microTuning");
    n(this, "noteOutput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ea2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ea2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ea2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ea2, t2, a4);
  }
};
n(ea, "runtime", proto3), n(ea, "typeName", "audiotool.document.v1.entity.tonematrix.v1.Tonematrix"), n(ea, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "pattern_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 6, name: "pattern_slots", kind: "message", T: o, repeated: true },
  { no: 7, name: "micro_tuning", kind: "message", T: r },
  { no: 8, name: "note_output", kind: "message", T: o },
  { no: 9, name: "audio_output", kind: "message", T: o },
  {
    no: 10,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var ts = ea;
var ia = class ia2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "slot");
    n(this, "steps", []);
    n(this, "groove");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ia2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ia2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ia2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ia2, t2, a4);
  }
};
n(ia, "runtime", proto3), n(ia, "typeName", "audiotool.document.v1.entity.tonematrix.v1.TonematrixPattern"), n(ia, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "slot", kind: "message", T: r },
  { no: 3, name: "steps", kind: "message", T: es, repeated: true },
  { no: 4, name: "groove", kind: "message", T: r }
]));
var as = ia;
var sa = class sa2 extends Message {
  constructor(t2) {
    super();
    n(this, "notes", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new sa2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new sa2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new sa2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(sa2, t2, a4);
  }
};
n(sa, "runtime", proto3), n(sa, "typeName", "audiotool.document.v1.entity.tonematrix.v1.TonematrixStep"), n(sa, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "notes", kind: "scalar", T: 8, repeated: true }
]));
var es = sa;
var oa = class oa2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "displayName", "");
    n(this, "positionX", 0);
    n(this, "positionY", 0);
    n(this, "preGain", 0);
    n(this, "mix", 0);
    n(this, "autoDrive", 0);
    n(this, "attackMs", 0);
    n(this, "releaseMs", 0);
    n(this, "thresholdGain", 0);
    n(this, "invertEnvelope", false);
    n(this, "finalSlope", 0);
    n(this, "finalY", 0);
    n(this, "audioInput");
    n(this, "sideChainInput");
    n(this, "audioOutput");
    n(this, "isActive", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new oa2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new oa2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new oa2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(oa2, t2, a4);
  }
};
n(oa, "runtime", proto3), n(oa, "typeName", "audiotool.document.v1.entity.waveshaper.v1.Waveshaper"), n(oa, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "position_x",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 4,
    name: "position_y",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 5,
    name: "pre_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 6,
    name: "mix",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 8,
    name: "auto_drive",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 9,
    name: "attack_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 10,
    name: "release_ms",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 11,
    name: "threshold_gain",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 12,
    name: "invert_envelope",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 13,
    name: "final_slope",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 14,
    name: "final_y",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 15, name: "audio_input", kind: "message", T: o },
  { no: 16, name: "side_chain_input", kind: "message", T: o },
  { no: 17, name: "audio_output", kind: "message", T: o },
  {
    no: 18,
    name: "is_active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var is = oa;
var ra = class ra2 extends Message {
  constructor(t2) {
    super();
    n(this, "id", "");
    n(this, "x", 0);
    n(this, "y", 0);
    n(this, "slope", 0);
    n(this, "waveshaper");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, a4) {
    return new ra2().fromBinary(t2, a4);
  }
  static fromJson(t2, a4) {
    return new ra2().fromJson(t2, a4);
  }
  static fromJsonString(t2, a4) {
    return new ra2().fromJsonString(t2, a4);
  }
  static equals(t2, a4) {
    return proto3.util.equals(ra2, t2, a4);
  }
};
n(ra, "runtime", proto3), n(ra, "typeName", "audiotool.document.v1.entity.waveshaper.v1.WaveshaperAnchor"), n(ra, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "x",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 3,
    name: "y",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  {
    no: 4,
    name: "slope",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  },
  { no: 5, name: "waveshaper", kind: "message", T: r }
]));
var ss = ra;
var cs = {
  "audiotool.document.v1.entity.audio_device.v1.AudioDevice": "audioDevice",
  "audiotool.document.v1.entity.audio_merger.v1.AudioMerger": "audioMerger",
  "audiotool.document.v1.entity.audio_splitter.v1.AudioSplitter": "audioSplitter",
  "audiotool.document.v1.entity.auto_filter.v1.AutoFilter": "autoFilter",
  "audiotool.document.v1.entity.band_splitter.v1.BandSplitter": "bandSplitter",
  "audiotool.document.v1.entity.bassline.v1.Bassline": "bassline",
  "audiotool.document.v1.entity.bassline.v1.BasslinePattern": "basslinePattern",
  "audiotool.document.v1.entity.beatbox8.v1.Beatbox8": "beatbox8",
  "audiotool.document.v1.entity.beatbox8.v1.Beatbox8Pattern": "beatbox8Pattern",
  "audiotool.document.v1.entity.beatbox9.v1.Beatbox9": "beatbox9",
  "audiotool.document.v1.entity.beatbox9.v1.Beatbox9Pattern": "beatbox9Pattern",
  "audiotool.document.v1.entity.centroid.v1.Centroid": "centroid",
  "audiotool.document.v1.entity.centroid.v1.CentroidChannel": "centroidChannel",
  "audiotool.document.v1.entity.config.v1.Config": "config",
  "audiotool.document.v1.entity.crossfader.v1.Crossfader": "crossfader",
  "audiotool.document.v1.entity.curve.v1.Curve": "curve",
  "audiotool.document.v1.entity.desktop_audio_cable.v1.DesktopAudioCable": "desktopAudioCable",
  "audiotool.document.v1.entity.desktop_note_cable.v1.DesktopNoteCable": "desktopNoteCable",
  "audiotool.document.v1.entity.exciter.v1.Exciter": "exciter",
  "audiotool.document.v1.entity.gakki.v1.Gakki": "gakki",
  "audiotool.document.v1.entity.graphical_eq.v1.GraphicalEQ": "graphicalEQ",
  "audiotool.document.v1.entity.gravity.v1.Gravity": "gravity",
  "audiotool.document.v1.entity.groove.v1.Groove": "groove",
  "audiotool.document.v1.entity.heisenberg.v1.Heisenberg": "heisenberg",
  "audiotool.document.v1.entity.helmholtz.v1.Helmholtz": "helmholtz",
  "audiotool.document.v1.entity.kobolt.v1.Kobolt": "kobolt",
  "audiotool.document.v1.entity.machiniste.v1.Machiniste": "machiniste",
  "audiotool.document.v1.entity.machiniste.v1.MachinistePattern": "machinistePattern",
  "audiotool.document.v1.entity.matrix_arpeggiator.v1.MatrixArpeggiator": "matrixArpeggiator",
  "audiotool.document.v1.entity.matrix_arpeggiator.v1.MatrixArpeggiatorPattern": "matrixArpeggiatorPattern",
  "audiotool.document.v1.entity.micro_tuning_octave.v1.MicroTuningOctave": "microTuningOctave",
  "audiotool.document.v1.entity.minimixer.v1.Minimixer": "minimixer",
  "audiotool.document.v1.entity.mixer.v1.MixerAux": "mixerAux",
  "audiotool.document.v1.entity.mixer.v1.MixerAuxRoute": "mixerAuxRoute",
  "audiotool.document.v1.entity.mixer.v1.MixerChannel": "mixerChannel",
  "audiotool.document.v1.entity.mixer.v1.MixerDelayAux": "mixerDelayAux",
  "audiotool.document.v1.entity.mixer.v1.MixerGroup": "mixerGroup",
  "audiotool.document.v1.entity.mixer.v1.MixerMaster": "mixerMaster",
  "audiotool.document.v1.entity.mixer.v1.MixerReverbAux": "mixerReverbAux",
  "audiotool.document.v1.entity.mixer.v1.MixerSideChainCable": "mixerSideChainCable",
  "audiotool.document.v1.entity.mixer.v1.MixerStripGrouping": "mixerStripGrouping",
  "audiotool.document.v1.entity.note_splitter.v1.NoteSplitter": "noteSplitter",
  "audiotool.document.v1.entity.panorama.v1.Panorama": "panorama",
  "audiotool.document.v1.entity.pulsar.v1.Pulsar": "pulsar",
  "audiotool.document.v1.entity.pulverisateur.v1.Pulverisateur": "pulverisateur",
  "audiotool.document.v1.entity.quantum.v1.Quantum": "quantum",
  "audiotool.document.v1.entity.quasar.v1.Quasar": "quasar",
  "audiotool.document.v1.entity.rasselbock.v1.Rasselbock": "rasselbock",
  "audiotool.document.v1.entity.rasselbock.v1.RasselbockPattern": "rasselbockPattern",
  "audiotool.document.v1.entity.ring_modulator.v1.RingModulator": "ringModulator",
  "audiotool.document.v1.entity.sample.v1.Sample": "sample",
  "audiotool.document.v1.entity.space.v1.Space": "space",
  "audiotool.document.v1.entity.spitfire_labs_vst3_plugin.v1.SpitfireLabsVst3Plugin": "spitfireLabsVst3Plugin",
  "audiotool.document.v1.entity.stereo_enhancer.v1.StereoEnhancer": "stereoEnhancer",
  "audiotool.document.v1.entity.stompbox_chorus.v1.StompboxChorus": "stompboxChorus",
  "audiotool.document.v1.entity.stompbox_compressor.v1.StompboxCompressor": "stompboxCompressor",
  "audiotool.document.v1.entity.stompbox_crusher.v1.StompboxCrusher": "stompboxCrusher",
  "audiotool.document.v1.entity.stompbox_delay.v1.StompboxDelay": "stompboxDelay",
  "audiotool.document.v1.entity.stompbox_flanger.v1.StompboxFlanger": "stompboxFlanger",
  "audiotool.document.v1.entity.stompbox_gate.v1.StompboxGate": "stompboxGate",
  "audiotool.document.v1.entity.stompbox_parametric_equalizer.v1.StompboxParametricEqualizer": "stompboxParametricEqualizer",
  "audiotool.document.v1.entity.stompbox_phaser.v1.StompboxPhaser": "stompboxPhaser",
  "audiotool.document.v1.entity.stompbox_pitch_delay.v1.StompboxPitchDelay": "stompboxPitchDelay",
  "audiotool.document.v1.entity.stompbox_reverb.v1.StompboxReverb": "stompboxReverb",
  "audiotool.document.v1.entity.stompbox_slope.v1.StompboxSlope": "stompboxSlope",
  "audiotool.document.v1.entity.stompbox_stereo_detune.v1.StompboxStereoDetune": "stompboxStereoDetune",
  "audiotool.document.v1.entity.stompbox_tube.v1.StompboxTube": "stompboxTube",
  "audiotool.document.v1.entity.timeline.v1.audio.AudioRegion": "audioRegion",
  "audiotool.document.v1.entity.timeline.v1.audio.AudioTrack": "audioTrack",
  "audiotool.document.v1.entity.timeline.v1.automation.AutomationCollection": "automationCollection",
  "audiotool.document.v1.entity.timeline.v1.automation.AutomationEvent": "automationEvent",
  "audiotool.document.v1.entity.timeline.v1.automation.AutomationRegion": "automationRegion",
  "audiotool.document.v1.entity.timeline.v1.automation.AutomationTrack": "automationTrack",
  "audiotool.document.v1.entity.timeline.v1.automation.TempoAutomationTrack": "tempoAutomationTrack",
  "audiotool.document.v1.entity.timeline.v1.note.Note": "note",
  "audiotool.document.v1.entity.timeline.v1.note.NoteCollection": "noteCollection",
  "audiotool.document.v1.entity.timeline.v1.note.NoteRegion": "noteRegion",
  "audiotool.document.v1.entity.timeline.v1.note.NoteTrack": "noteTrack",
  "audiotool.document.v1.entity.timeline.v1.pattern.PatternRegion": "patternRegion",
  "audiotool.document.v1.entity.timeline.v1.pattern.PatternTrack": "patternTrack",
  "audiotool.document.v1.entity.tiny_gain.v1.TinyGain": "tinyGain",
  "audiotool.document.v1.entity.tonematrix.v1.Tonematrix": "tonematrix",
  "audiotool.document.v1.entity.tonematrix.v1.TonematrixPattern": "tonematrixPattern",
  "audiotool.document.v1.entity.waveshaper.v1.Waveshaper": "waveshaper",
  "audiotool.document.v1.entity.waveshaper.v1.WaveshaperAnchor": "waveshaperAnchor"
};
var us = {
  audioDevice: ba,
  audioMerger: La,
  audioSplitter: Pa,
  autoFilter: Da,
  bandSplitter: Oa,
  bassline: Ma,
  basslinePattern: Aa,
  beatbox8: Xa,
  beatbox8Pattern: Ga,
  beatbox9: ne,
  beatbox9Pattern: te,
  centroid: de,
  centroidChannel: ce,
  config: ue,
  crossfader: fe,
  curve: pe,
  desktopAudioCable: ke,
  desktopNoteCable: Te,
  exciter: ye,
  gakki: ge,
  graphicalEQ: ve,
  gravity: we,
  groove: Je,
  heisenberg: he,
  helmholtz: Se,
  kobolt: Be,
  machiniste: Ne,
  machinistePattern: be,
  matrixArpeggiator: ze,
  matrixArpeggiatorPattern: De,
  microTuningOctave: Me,
  minimixer: Ae,
  mixerAux: Ye,
  mixerAuxRoute: Xe,
  mixerChannel: Ge,
  mixerDelayAux: He,
  mixerGroup: Ve,
  mixerMaster: Ue,
  mixerReverbAux: Ee,
  mixerSideChainCable: We,
  mixerStripGrouping: je,
  noteSplitter: Ke,
  panorama: $e,
  pulsar: Qe,
  pulverisateur: Re,
  quantum: mi,
  quasar: di,
  rasselbock: ci,
  rasselbockPattern: ui,
  ringModulator: hi,
  sample: xi,
  space: qi,
  spitfireLabsVst3Plugin: _i,
  stereoEnhancer: Bi,
  stompboxChorus: Fi,
  stompboxCompressor: Ni,
  stompboxCrusher: bi,
  stompboxDelay: Li,
  stompboxFlanger: Ii,
  stompboxGate: Pi,
  stompboxParametricEqualizer: zi,
  stompboxPhaser: Di,
  stompboxPitchDelay: Oi,
  stompboxReverb: Mi,
  stompboxSlope: Ai,
  stompboxStereoDetune: Yi,
  stompboxTube: Xi,
  audioRegion: Gi,
  audioTrack: Hi,
  automationCollection: Vi,
  automationEvent: Ui,
  automationRegion: Ei,
  automationTrack: Wi,
  tempoAutomationTrack: ji,
  note: Zi,
  noteCollection: Ki,
  noteRegion: $i,
  noteTrack: Qi,
  patternRegion: Ri,
  patternTrack: Ci,
  tinyGain: ns,
  tonematrix: ts,
  tonematrixPattern: as,
  waveshaper: is,
  waveshaperAnchor: ss
};

// node_modules/@audiotool/nexus/dist/audiotool-api-D9u-oGp3.js
var Sr = Object.defineProperty;
var wr = (i2, s3, t2) => s3 in i2 ? Sr(i2, s3, { enumerable: true, configurable: true, writable: true, value: t2 }) : i2[s3] = t2;
var a = (i2, s3, t2) => wr(i2, typeof s3 != "symbol" ? s3 + "" : s3, t2);
var S3 = class S4 extends Message {
  constructor(t2) {
    super();
    a(this, "values", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new S4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new S4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new S4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(S4, t2, n3);
  }
};
a(S3, "runtime", proto3), a(S3, "typeName", "audiotool.audiograph.v1.Graph"), a(S3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "values", kind: "scalar", T: 13, repeated: true }
]));
var In3 = S3;
var w4 = class w5 extends Message {
  constructor(t2) {
    super();
    a(this, "resourceName", "");
    a(this, "graphs", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new w5().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new w5().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new w5().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(w5, t2, n3);
  }
};
a(w4, "runtime", proto3), a(w4, "typeName", "audiotool.audiograph.v1.Audiograph"), a(w4, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "resource_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "graphs", kind: "message", T: In3, repeated: true }
]));
var gn3 = w4;
var Ya2 = /* @__PURE__ */ ((i2) => (i2[i2.GET_AUDIOGRAPH_RESOLUTION_UNSPECIFIED = 0] = "GET_AUDIOGRAPH_RESOLUTION_UNSPECIFIED", i2[i2.GET_AUDIOGRAPH_RESOLUTION_120 = 120] = "GET_AUDIOGRAPH_RESOLUTION_120", i2[i2.GET_AUDIOGRAPH_RESOLUTION_240 = 240] = "GET_AUDIOGRAPH_RESOLUTION_240", i2[i2.GET_AUDIOGRAPH_RESOLUTION_480 = 480] = "GET_AUDIOGRAPH_RESOLUTION_480", i2[i2.GET_AUDIOGRAPH_RESOLUTION_960 = 960] = "GET_AUDIOGRAPH_RESOLUTION_960", i2[i2.GET_AUDIOGRAPH_RESOLUTION_1920 = 1920] = "GET_AUDIOGRAPH_RESOLUTION_1920", i2[i2.GET_AUDIOGRAPH_RESOLUTION_3840 = 3840] = "GET_AUDIOGRAPH_RESOLUTION_3840", i2))(Ya2 || {});
proto3.util.setEnumType(Ya2, "audiotool.audiograph.v1.GetAudiographResolution", [
  { no: 0, name: "GET_AUDIOGRAPH_RESOLUTION_UNSPECIFIED" },
  { no: 120, name: "GET_AUDIOGRAPH_RESOLUTION_120" },
  { no: 240, name: "GET_AUDIOGRAPH_RESOLUTION_240" },
  { no: 480, name: "GET_AUDIOGRAPH_RESOLUTION_480" },
  { no: 960, name: "GET_AUDIOGRAPH_RESOLUTION_960" },
  { no: 1920, name: "GET_AUDIOGRAPH_RESOLUTION_1920" },
  { no: 3840, name: "GET_AUDIOGRAPH_RESOLUTION_3840" }
]);
var va2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.MONO = 1] = "MONO", i2[i2.STEREO = 2] = "STEREO", i2))(va2 || {});
proto3.util.setEnumType(va2, "audiotool.audiograph.v1.GetAudiographChannels", [
  { no: 0, name: "GET_AUDIOGRAPH_CHANNELS_UNSPECIFIED" },
  { no: 1, name: "GET_AUDIOGRAPH_CHANNELS_MONO" },
  { no: 2, name: "GET_AUDIOGRAPH_CHANNELS_STEREO" }
]);
var I3 = class I4 extends Message {
  constructor(t2) {
    super();
    a(this, "resourceNames", []);
    a(this, "resolution", 0);
    a(this, "channels", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new I4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new I4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new I4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(I4, t2, n3);
  }
};
a(I3, "runtime", proto3), a(I3, "typeName", "audiotool.audiograph.v1.GetAudiographsRequest"), a(I3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "resource_names", kind: "scalar", T: 9, repeated: true },
  { no: 2, name: "resolution", kind: "enum", T: proto3.getEnumType(Ya2) },
  { no: 3, name: "channels", kind: "enum", T: proto3.getEnumType(va2) }
]));
var Jn3 = I3;
var g3 = class g4 extends Message {
  constructor(t2) {
    super();
    a(this, "audiographs", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new g4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new g4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new g4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(g4, t2, n3);
  }
};
a(g3, "runtime", proto3), a(g3, "typeName", "audiotool.audiograph.v1.GetAudiographsResponse"), a(g3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "audiographs", kind: "message", T: gn3, repeated: true }
]));
var Pn3 = g3;
var yr = {
  typeName: "audiotool.audiograph.v1.AudiographService",
  methods: {
    /**
     * Get Audiographs
     *
     * @generated from rpc audiotool.audiograph.v1.AudiographService.GetAudiographs
     */
    getAudiographs: {
      name: "GetAudiographs",
      I: Jn3,
      O: Pn3,
      kind: MethodKind.Unary
    }
  }
};
var E3;
var Tr = (E3 = class extends Message {
  constructor(t2) {
    super();
    a(this, "target");
    a(this, "relatives", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new E3().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new E3().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new E3().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(E3, t2, n3);
  }
}, a(E3, "runtime", proto3), a(E3, "typeName", "audiotool.document.v1.preset.v1.Preset"), a(E3, "fields", proto3.util.newFieldList(() => [
  { no: 2, name: "target", kind: "message", T: Any },
  { no: 3, name: "relatives", kind: "message", T: Any, repeated: true }
])), E3);
var Da2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.OWNER = 1] = "OWNER", i2[i2.OWNER_UNPUBLISHED = 2] = "OWNER_UNPUBLISHED", i2[i2.EDITOR = 3] = "EDITOR", i2[i2.EDITOR_UNPUBLISHED = 4] = "EDITOR_UNPUBLISHED", i2[i2.VIEWER = 5] = "VIEWER", i2))(Da2 || {});
proto3.util.setEnumType(Da2, "audiotool.project.v1.ProjectRoleType", [
  { no: 0, name: "PROJECT_ROLE_TYPE_UNSPECIFIED" },
  { no: 1, name: "PROJECT_ROLE_TYPE_OWNER" },
  { no: 2, name: "PROJECT_ROLE_TYPE_OWNER_UNPUBLISHED" },
  { no: 3, name: "PROJECT_ROLE_TYPE_EDITOR" },
  { no: 4, name: "PROJECT_ROLE_TYPE_EDITOR_UNPUBLISHED" },
  { no: 5, name: "PROJECT_ROLE_TYPE_VIEWER" }
]);
var J3 = class J4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "userName", "");
    a(this, "roleType", 0);
    a(this, "createTime");
    a(this, "updateTime");
    a(this, "creatorName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new J4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new J4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new J4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(J4, t2, n3);
  }
};
a(J3, "runtime", proto3), a(J3, "typeName", "audiotool.project.v1.ProjectRole"), a(J3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "user_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "role_type", kind: "enum", T: proto3.getEnumType(Da2) },
  { no: 4, name: "create_time", kind: "message", T: Timestamp },
  { no: 5, name: "update_time", kind: "message", T: Timestamp },
  {
    no: 6,
    name: "creator_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var sn3 = J3;
var P3 = class P4 extends Message {
  constructor(t2) {
    super();
    a(this, "parent", "");
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    a(this, "filter", "");
    a(this, "orderBy", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new P4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new P4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new P4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(P4, t2, n3);
  }
};
a(P3, "runtime", proto3), a(P3, "typeName", "audiotool.project.v1.ListProjectRolesRequest"), a(P3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "parent",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "order_by",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var On3 = P3;
var O3 = class O4 extends Message {
  constructor(t2) {
    super();
    a(this, "projectRoles", []);
    a(this, "nextPageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new O4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new O4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new O4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(O4, t2, n3);
  }
};
a(O3, "runtime", proto3), a(O3, "typeName", "audiotool.project.v1.ListProjectRolesResponse"), a(O3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project_roles", kind: "message", T: sn3, repeated: true },
  {
    no: 2,
    name: "next_page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var yn3 = O3;
var y3 = class y4 extends Message {
  constructor(t2) {
    super();
    a(this, "parent", "");
    a(this, "projectRole");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new y4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new y4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new y4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(y4, t2, n3);
  }
};
a(y3, "runtime", proto3), a(y3, "typeName", "audiotool.project.v1.CreateProjectRoleRequest"), a(y3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "parent",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "project_role", kind: "message", T: sn3 }
]));
var kn3 = y3;
var k3 = class k4 extends Message {
  constructor(t2) {
    super();
    a(this, "projectRole");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new k4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new k4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new k4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(k4, t2, n3);
  }
};
a(k3, "runtime", proto3), a(k3, "typeName", "audiotool.project.v1.CreateProjectRoleResponse"), a(k3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project_role", kind: "message", T: sn3 }
]));
var Nn3 = k3;
var N3 = class N4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new N4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new N4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new N4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(N4, t2, n3);
  }
};
a(N3, "runtime", proto3), a(N3, "typeName", "audiotool.project.v1.DeleteProjectRoleRequest"), a(N3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Bn3 = N3;
var B3 = class B4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new B4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new B4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new B4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(B4, s3, t2);
  }
};
a(B3, "runtime", proto3), a(B3, "typeName", "audiotool.project.v1.DeleteProjectRoleResponse"), a(B3, "fields", proto3.util.newFieldList(() => []));
var An3 = B3;
var A3 = class A4 extends Message {
  constructor(t2) {
    super();
    a(this, "projectRole");
    a(this, "updateMask");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new A4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new A4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new A4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(A4, t2, n3);
  }
};
a(A3, "runtime", proto3), a(A3, "typeName", "audiotool.project.v1.UpdateProjectRoleRequest"), a(A3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project_role", kind: "message", T: sn3 },
  { no: 2, name: "update_mask", kind: "message", T: FieldMask }
]));
var Ln3 = A3;
var L3 = class L4 extends Message {
  constructor(t2) {
    super();
    a(this, "projectRole");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new L4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new L4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new L4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(L4, t2, n3);
  }
};
a(L3, "runtime", proto3), a(L3, "typeName", "audiotool.project.v1.UpdateProjectRoleResponse"), a(L3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project_role", kind: "message", T: sn3 }
]));
var pn3 = L3;
var kr = {
  typeName: "audiotool.project.v1.ProjectRoleService",
  methods: {
    /**
     * Lists all ProjectRoles for a project.
     *
     * @generated from rpc audiotool.project.v1.ProjectRoleService.ListProjectRoles
     */
    listProjectRoles: {
      name: "ListProjectRoles",
      I: On3,
      O: yn3,
      kind: MethodKind.Unary
    },
    /**
     * Creates a ProjectRole.
     *
     * @generated from rpc audiotool.project.v1.ProjectRoleService.CreateProjectRole
     */
    createProjectRole: {
      name: "CreateProjectRole",
      I: kn3,
      O: Nn3,
      kind: MethodKind.Unary
    },
    /**
     * Deletes a ProjectRole.
     *
     * @generated from rpc audiotool.project.v1.ProjectRoleService.DeleteProjectRole
     */
    deleteProjectRole: {
      name: "DeleteProjectRole",
      I: Bn3,
      O: An3,
      kind: MethodKind.Unary
    },
    /**
     * Updates a ProjectRole.
     *
     * @generated from rpc audiotool.project.v1.ProjectRoleService.UpdateProjectRole
     */
    updateProjectRole: {
      name: "UpdateProjectRole",
      I: Ln3,
      O: pn3,
      kind: MethodKind.Unary
    }
  }
};
var Ha2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.NO_RIGHTS_RESERVED = 1] = "NO_RIGHTS_RESERVED", i2[i2.CREATIVE_COMMONS = 2] = "CREATIVE_COMMONS", i2[i2.CREATIVE_COMMONS_NON_COMMERCIAL = 3] = "CREATIVE_COMMONS_NON_COMMERCIAL", i2[i2.ALL_RIGHTS_RESERVED = 4] = "ALL_RIGHTS_RESERVED", i2[i2.ROYALTY_FREE = 5] = "ROYALTY_FREE", i2))(Ha2 || {});
proto3.util.setEnumType(Ha2, "audiotool.project.v1.TrackLicense", [
  { no: 0, name: "TRACK_LICENSE_UNSPECIFIED" },
  { no: 1, name: "TRACK_LICENSE_NO_RIGHTS_RESERVED" },
  { no: 2, name: "TRACK_LICENSE_CREATIVE_COMMONS" },
  { no: 3, name: "TRACK_LICENSE_CREATIVE_COMMONS_NON_COMMERCIAL" },
  { no: 4, name: "TRACK_LICENSE_ALL_RIGHTS_RESERVED" },
  { no: 5, name: "TRACK_LICENSE_ROYALTY_FREE" }
]);
var p3 = class p4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "userNames", []);
    a(this, "creatorName", "");
    a(this, "trackName", "");
    a(this, "remixOfTrackName", "");
    a(this, "copyOfProjectName", "");
    a(this, "copyOfProjectCommitIndex", 0);
    a(this, "displayName", "");
    a(this, "description", "");
    a(this, "createTime");
    a(this, "updateTime");
    a(this, "playDuration");
    a(this, "tags", []);
    a(this, "coverUrl", "");
    a(this, "snapshotUrl", "");
    a(this, "bpm", 0);
    a(this, "genreName", "");
    a(this, "downloadAllowed", false);
    a(this, "copyAllowed", false);
    a(this, "license", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new p4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new p4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new p4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(p4, t2, n3);
  }
};
a(p3, "runtime", proto3), a(p3, "typeName", "audiotool.project.v1.Project"), a(p3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "user_names", kind: "scalar", T: 9, repeated: true },
  {
    no: 3,
    name: "creator_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "track_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "remix_of_track_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "copy_of_project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 7,
    name: "copy_of_project_commit_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 8,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 9,
    name: "description",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 10, name: "create_time", kind: "message", T: Timestamp },
  { no: 11, name: "update_time", kind: "message", T: Timestamp },
  { no: 12, name: "play_duration", kind: "message", T: Duration },
  { no: 13, name: "tags", kind: "scalar", T: 9, repeated: true },
  {
    no: 14,
    name: "cover_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 15,
    name: "snapshot_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 16,
    name: "bpm",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 17,
    name: "genre_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 18,
    name: "download_allowed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 19,
    name: "copy_allowed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 20, name: "license", kind: "enum", T: proto3.getEnumType(Ha2) }
]));
var f3 = p3;
var C3 = class C4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    a(this, "documentServiceUrl", "");
    a(this, "studioPrefixUrl", "");
    a(this, "documentServicePrefixUrl", "");
    a(this, "audioEnginePrefixUrl", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new C4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new C4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new C4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(C4, t2, n3);
  }
};
a(C3, "runtime", proto3), a(C3, "typeName", "audiotool.project.v1.Session"), a(C3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 },
  {
    no: 2,
    name: "document_service_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "studio_prefix_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "document_service_prefix_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "audio_engine_prefix_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var En3 = C3;
var qa2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.ALL = 1] = "ALL", i2[i2.METADATA = 2] = "METADATA", i2[i2.AUDIO = 3] = "AUDIO", i2))(qa2 || {});
proto3.util.setEnumType(qa2, "audiotool.project.v1.SyncTrackMode", [
  { no: 0, name: "SYNC_TRACK_MODE_UNSPECIFIED" },
  { no: 1, name: "SYNC_TRACK_MODE_ALL" },
  { no: 2, name: "SYNC_TRACK_MODE_METADATA" },
  { no: 3, name: "SYNC_TRACK_MODE_AUDIO" }
]);
var U3 = class U4 extends Message {
  constructor(t2) {
    super();
    a(this, "filter", "");
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    a(this, "orderBy", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new U4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new U4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new U4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(U4, t2, n3);
  }
};
a(U3, "runtime", proto3), a(U3, "typeName", "audiotool.project.v1.ListProjectsRequest"), a(U3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "order_by",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Cn3 = U3;
var F3 = class F4 extends Message {
  constructor(t2) {
    super();
    a(this, "projects", []);
    a(this, "nextPageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new F4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new F4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new F4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(F4, t2, n3);
  }
};
a(F3, "runtime", proto3), a(F3, "typeName", "audiotool.project.v1.ListProjectsResponse"), a(F3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "projects", kind: "message", T: f3, repeated: true },
  {
    no: 2,
    name: "next_page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Un3 = F3;
var M3 = class M4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new M4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new M4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new M4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(M4, t2, n3);
  }
};
a(M3, "runtime", proto3), a(M3, "typeName", "audiotool.project.v1.GetProjectRequest"), a(M3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Fn3 = M3;
var x3 = class x4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new x4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new x4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new x4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(x4, t2, n3);
  }
};
a(x3, "runtime", proto3), a(x3, "typeName", "audiotool.project.v1.GetProjectResponse"), a(x3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 }
]));
var Mn3 = x3;
var h3 = class h4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new h4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new h4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new h4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(h4, t2, n3);
  }
};
a(h3, "runtime", proto3), a(h3, "typeName", "audiotool.project.v1.CreateProjectRequest"), a(h3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 }
]));
var xn3 = h3;
var V3 = class V4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new V4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new V4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new V4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(V4, t2, n3);
  }
};
a(V3, "runtime", proto3), a(V3, "typeName", "audiotool.project.v1.CreateProjectResponse"), a(V3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 }
]));
var hn3 = V3;
var R3 = class R4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "data", new Uint8Array(0));
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new R4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new R4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new R4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(R4, t2, n3);
  }
};
a(R3, "runtime", proto3), a(R3, "typeName", "audiotool.project.v1.UploadCoverRequest"), a(R3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]));
var Vn3 = R3;
var Y3 = class Y4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Y4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Y4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Y4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Y4, t2, n3);
  }
};
a(Y3, "runtime", proto3), a(Y3, "typeName", "audiotool.project.v1.UploadCoverResponse"), a(Y3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 }
]));
var Rn3 = Y3;
var v3 = class v4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    a(this, "updateMask");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new v4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new v4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new v4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(v4, t2, n3);
  }
};
a(v3, "runtime", proto3), a(v3, "typeName", "audiotool.project.v1.UpdateProjectRequest"), a(v3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 },
  { no: 2, name: "update_mask", kind: "message", T: FieldMask }
]));
var Yn3 = v3;
var D3 = class D4 extends Message {
  constructor(t2) {
    super();
    a(this, "project");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new D4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new D4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new D4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(D4, t2, n3);
  }
};
a(D3, "runtime", proto3), a(D3, "typeName", "audiotool.project.v1.UpdateProjectResponse"), a(D3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project", kind: "message", T: f3 }
]));
var vn3 = D3;
var H3 = class H4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new H4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new H4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new H4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(H4, t2, n3);
  }
};
a(H3, "runtime", proto3), a(H3, "typeName", "audiotool.project.v1.DeleteProjectRequest"), a(H3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Dn3 = H3;
var q3 = class q4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new q4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new q4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new q4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(q4, s3, t2);
  }
};
a(q3, "runtime", proto3), a(q3, "typeName", "audiotool.project.v1.DeleteProjectResponse"), a(q3, "fields", proto3.util.newFieldList(() => []));
var Hn3 = q3;
var X3 = class X4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "mode", 0);
    a(this, "commitIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new X4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new X4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new X4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(X4, t2, n3);
  }
};
a(X3, "runtime", proto3), a(X3, "typeName", "audiotool.project.v1.SyncTrackRequest"), a(X3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "mode", kind: "enum", T: proto3.getEnumType(qa2) },
  {
    no: 3,
    name: "commit_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var qn3 = X3;
var _3 = class _4 extends Message {
  constructor(t2) {
    super();
    a(this, "projectName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new _4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new _4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new _4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(_4, t2, n3);
  }
};
a(_3, "runtime", proto3), a(_3, "typeName", "audiotool.project.v1.OpenSessionRequest"), a(_3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Xn3 = _3;
var b3 = class b4 extends Message {
  constructor(t2) {
    super();
    a(this, "session");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new b4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new b4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new b4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(b4, t2, n3);
  }
};
a(b3, "runtime", proto3), a(b3, "typeName", "audiotool.project.v1.OpenSessionResponse"), a(b3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "session", kind: "message", T: En3 }
]));
var _n3 = b3;
var j3 = class j4 extends Message {
  constructor(t2) {
    super();
    a(this, "projectName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new j4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new j4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new j4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(j4, t2, n3);
  }
};
a(j3, "runtime", proto3), a(j3, "typeName", "audiotool.project.v1.CloseSessionRequest"), a(j3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var G3 = class G4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new G4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new G4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new G4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(G4, s3, t2);
  }
};
a(G3, "runtime", proto3), a(G3, "typeName", "audiotool.project.v1.CloseSessionResponse"), a(G3, "fields", proto3.util.newFieldList(() => []));
var K3 = class K4 extends Message {
  constructor(t2) {
    super();
    a(this, "filter", "");
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    a(this, "orderBy", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new K4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new K4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new K4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(K4, t2, n3);
  }
};
a(K3, "runtime", proto3), a(K3, "typeName", "audiotool.project.v1.ListSessionsRequest"), a(K3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "order_by",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var bn3 = K3;
var z3 = class z4 extends Message {
  constructor(t2) {
    super();
    a(this, "sessions", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new z4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new z4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new z4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(z4, t2, n3);
  }
};
a(z3, "runtime", proto3), a(z3, "typeName", "audiotool.project.v1.ListSessionsResponse"), a(z3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sessions", kind: "message", T: En3, repeated: true }
]));
var jn3 = z3;
var Q3 = class Q4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new Q4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new Q4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new Q4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(Q4, s3, t2);
  }
};
a(Q3, "runtime", proto3), a(Q3, "typeName", "audiotool.project.v1.GetLatestVersionBundleRequest"), a(Q3, "fields", proto3.util.newFieldList(() => []));
var Gn3 = Q3;
var W3 = class W4 extends Message {
  constructor(t2) {
    super();
    a(this, "studioPrefixUrl", "");
    a(this, "documentServicePrefixUrl", "");
    a(this, "audioEnginePrefixUrl", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new W4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new W4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new W4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(W4, t2, n3);
  }
};
a(W3, "runtime", proto3), a(W3, "typeName", "audiotool.project.v1.GetLatestVersionBundleResponse"), a(W3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "studio_prefix_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "document_service_prefix_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "audio_engine_prefix_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Kn3 = W3;
var $3 = class $4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "metadata");
    a(this, "done", false);
    a(this, "result", { case: void 0 });
    a(this, "owners", []);
    a(this, "createTime");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new $4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new $4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new $4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals($4, t2, n3);
  }
};
a($3, "runtime", proto3), a($3, "typeName", "audiotool.longrunning.v1.Operation"), a($3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "metadata", kind: "message", T: Any },
  {
    no: 3,
    name: "done",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  { no: 4, name: "error", kind: "message", T: zn3, oneof: "result" },
  { no: 5, name: "response", kind: "message", T: Any, oneof: "result" },
  { no: 6, name: "owners", kind: "scalar", T: 9, repeated: true },
  { no: 7, name: "create_time", kind: "message", T: Timestamp }
]));
var ln3 = $3;
var Z3 = class Z4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Z4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Z4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Z4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Z4, t2, n3);
  }
};
a(Z3, "runtime", proto3), a(Z3, "typeName", "audiotool.longrunning.v1.GetOperationRequest"), a(Z3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var tt3 = class tt4 extends Message {
  constructor(t2) {
    super();
    a(this, "operation");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new tt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new tt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new tt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(tt4, t2, n3);
  }
};
a(tt3, "runtime", proto3), a(tt3, "typeName", "audiotool.longrunning.v1.GetOperationResponse"), a(tt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "operation", kind: "message", T: ln3 }
]));
var nt3 = class nt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "filter", "");
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new nt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new nt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new nt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(nt4, t2, n3);
  }
};
a(nt3, "runtime", proto3), a(nt3, "typeName", "audiotool.longrunning.v1.ListOperationsRequest"), a(nt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 4,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 1,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var at3 = class at4 extends Message {
  constructor(t2) {
    super();
    a(this, "operations", []);
    a(this, "nextPageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new at4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new at4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new at4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(at4, t2, n3);
  }
};
a(at3, "runtime", proto3), a(at3, "typeName", "audiotool.longrunning.v1.ListOperationsResponse"), a(at3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "operations", kind: "message", T: ln3, repeated: true },
  {
    no: 2,
    name: "next_page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var rt3 = class rt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new rt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new rt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new rt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(rt4, t2, n3);
  }
};
a(rt3, "runtime", proto3), a(rt3, "typeName", "audiotool.longrunning.v1.CancelOperationRequest"), a(rt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var it3 = class it4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new it4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new it4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new it4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(it4, s3, t2);
  }
};
a(it3, "runtime", proto3), a(it3, "typeName", "audiotool.longrunning.v1.CancelOperationResponse"), a(it3, "fields", proto3.util.newFieldList(() => []));
var st3 = class st4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new st4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new st4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new st4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(st4, t2, n3);
  }
};
a(st3, "runtime", proto3), a(st3, "typeName", "audiotool.longrunning.v1.DeleteOperationRequest"), a(st3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var et3 = class et4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new et4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new et4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new et4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(et4, s3, t2);
  }
};
a(et3, "runtime", proto3), a(et3, "typeName", "audiotool.longrunning.v1.DeleteOperationResponse"), a(et3, "fields", proto3.util.newFieldList(() => []));
var ot3 = class ot4 extends Message {
  constructor(t2) {
    super();
    a(this, "code", 0);
    a(this, "message", "");
    a(this, "details", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new ot4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new ot4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new ot4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(ot4, t2, n3);
  }
};
a(ot3, "runtime", proto3), a(ot3, "typeName", "audiotool.longrunning.v1.Status"), a(ot3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "code",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 2,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "details", kind: "message", T: Any, repeated: true }
]));
var zn3 = ot3;
var Nr = {
  typeName: "audiotool.project.v1.ProjectService",
  methods: {
    /**
     * List the projects.option
     *
     * @generated from rpc audiotool.project.v1.ProjectService.ListProjects
     */
    listProjects: {
      name: "ListProjects",
      I: Cn3,
      O: Un3,
      kind: MethodKind.Unary
    },
    /**
     * Get a project.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.GetProject
     */
    getProject: {
      name: "GetProject",
      I: Fn3,
      O: Mn3,
      kind: MethodKind.Unary
    },
    /**
     * Create a project.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.CreateProject
     */
    createProject: {
      name: "CreateProject",
      I: xn3,
      O: hn3,
      kind: MethodKind.Unary
    },
    /**
     * Upload a cover.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.UploadCover
     */
    uploadCover: {
      name: "UploadCover",
      I: Vn3,
      O: Rn3,
      kind: MethodKind.Unary
    },
    /**
     * Update a project.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.UpdateProject
     */
    updateProject: {
      name: "UpdateProject",
      I: Yn3,
      O: vn3,
      kind: MethodKind.Unary
    },
    /**
     * Delete a project.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.DeleteProject
     */
    deleteProject: {
      name: "DeleteProject",
      I: Dn3,
      O: Hn3,
      kind: MethodKind.Unary
    },
    /**
     * SyncTrack a will create or update a track.
     *
     * The project will be used as leading source for the track.
     * This RPC kicks off a process where user can listen to via the events api.
     *
     * Another optimistic approach is to trigger GetTrack with the returned track_name.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.SyncTrack
     */
    syncTrack: {
      name: "SyncTrack",
      I: qn3,
      O: ln3,
      kind: MethodKind.Unary
    },
    /**
     * Open a session. This will create a new session if one does not exist.
     *
     * This is used to allow multiple users to work on a project at the same time and opens the
     * Document. The returned session contains the URLs to connect to the DocumentService
     * which uses his own proto for communication. (audiotool.document.v1.DocumentService)
     *
     * @generated from rpc audiotool.project.v1.ProjectService.OpenSession
     */
    openSession: {
      name: "OpenSession",
      I: Xn3,
      O: _n3,
      kind: MethodKind.Unary
    },
    /**
     * List sessions.
     *
     * This gives all the sessions where a user can join and are active at the request time.
     *
     * @generated from rpc audiotool.project.v1.ProjectService.ListSessions
     */
    listSessions: {
      name: "ListSessions",
      I: bn3,
      O: jn3,
      kind: MethodKind.Unary
    },
    /**
     * Get Latest Version Bundle
     *
     * This returns the latest bundle version required for session to allow potential quicker pre-loading
     *
     * @generated from rpc audiotool.project.v1.ProjectService.GetLatestVersionBundle
     */
    getLatestVersionBundle: {
      name: "GetLatestVersionBundle",
      I: Gn3,
      O: Kn3,
      kind: MethodKind.Unary
    }
  }
};
var dn3 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.ONE_SHOT = 1] = "ONE_SHOT", i2[i2.LOOP = 2] = "LOOP", i2))(dn3 || {});
proto3.util.setEnumType(dn3, "audiotool.sample.v1.SampleType", [
  { no: 0, name: "SAMPLE_TYPE_UNSPECIFIED" },
  { no: 1, name: "SAMPLE_TYPE_ONE_SHOT" },
  { no: 2, name: "SAMPLE_TYPE_LOOP" }
]);
var fn3 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.SAFE = 1] = "SAFE", i2[i2.UNSAFE = 2] = "UNSAFE", i2))(fn3 || {});
proto3.util.setEnumType(fn3, "audiotool.sample.v1.SampleClearance", [
  { no: 0, name: "SAMPLE_CLEARANCE_UNSPECIFIED" },
  { no: 1, name: "SAMPLE_CLEARANCE_SAFE" },
  { no: 2, name: "SAMPLE_CLEARANCE_UNSAFE" }
]);
var Tn3 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.PUBLIC = 1] = "PUBLIC", i2[i2.UNLISTED = 2] = "UNLISTED", i2[i2.PRIVATE = 3] = "PRIVATE", i2))(Tn3 || {});
proto3.util.setEnumType(Tn3, "audiotool.sample.v1.SampleUsage", [
  { no: 0, name: "SAMPLE_USAGE_UNSPECIFIED" },
  { no: 1, name: "SAMPLE_USAGE_PUBLIC" },
  { no: 2, name: "SAMPLE_USAGE_UNLISTED" },
  { no: 3, name: "SAMPLE_USAGE_PRIVATE" }
]);
var mt3 = class mt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "displayName", "");
    a(this, "description", "");
    a(this, "ownerName", "");
    a(this, "favoritedByUser", false);
    a(this, "numFavorites", 0);
    a(this, "numUsages", 0);
    a(this, "bpm", 0);
    a(this, "sampleType", 0);
    a(this, "playDuration");
    a(this, "createTime");
    a(this, "updateTime");
    a(this, "clearance", 0);
    a(this, "usage", 0);
    a(this, "tags", []);
    a(this, "mp3Url", "");
    a(this, "wavUrl", "");
    a(this, "previewMp3Url", "");
    a(this, "flacUrl", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new mt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new mt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new mt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(mt4, t2, n3);
  }
};
a(mt3, "runtime", proto3), a(mt3, "typeName", "audiotool.sample.v1.Sample"), a(mt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "description",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "owner_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "favorited_by_user",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "num_favorites",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 7,
    name: "num_usages",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 8,
    name: "bpm",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  { no: 9, name: "sample_type", kind: "enum", T: proto3.getEnumType(dn3) },
  { no: 10, name: "play_duration", kind: "message", T: Duration },
  { no: 11, name: "create_time", kind: "message", T: Timestamp },
  { no: 12, name: "update_time", kind: "message", T: Timestamp },
  { no: 13, name: "clearance", kind: "enum", T: proto3.getEnumType(fn3) },
  { no: 14, name: "usage", kind: "enum", T: proto3.getEnumType(Tn3) },
  { no: 15, name: "tags", kind: "scalar", T: 9, repeated: true },
  {
    no: 16,
    name: "mp3_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 17,
    name: "wav_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 18,
    name: "preview_mp3_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 19,
    name: "flac_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var T3 = mt3;
var Xa2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.NONE = 1] = "NONE", i2[i2.INVALID_INPUT = 2] = "INVALID_INPUT", i2[i2.INTERNAL = 3] = "INTERNAL", i2))(Xa2 || {});
proto3.util.setEnumType(Xa2, "audiotool.sample.v1.SampleConvertDoneErrorType", [
  { no: 0, name: "SAMPLE_CONVERT_DONE_ERROR_TYPE_UNSPECIFIED" },
  { no: 1, name: "SAMPLE_CONVERT_DONE_ERROR_TYPE_NONE" },
  { no: 2, name: "SAMPLE_CONVERT_DONE_ERROR_TYPE_INVALID_INPUT" },
  { no: 3, name: "SAMPLE_CONVERT_DONE_ERROR_TYPE_INTERNAL" }
]);
var ut3 = class ut4 extends Message {
  constructor(t2) {
    super();
    a(this, "id", "");
    a(this, "createTime");
    a(this, "event", { case: void 0 });
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new ut4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new ut4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new ut4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(ut4, t2, n3);
  }
};
a(ut3, "runtime", proto3), a(ut3, "typeName", "audiotool.sample.v1.SampleEvent"), a(ut3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "create_time", kind: "message", T: Timestamp },
  { no: 3, name: "sample_convert_done", kind: "message", T: Wn3, oneof: "event" }
]));
var Qn3 = ut3;
var lt3 = class lt4 extends Message {
  constructor(t2) {
    super();
    a(this, "sample");
    a(this, "error", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new lt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new lt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new lt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(lt4, t2, n3);
  }
};
a(lt3, "runtime", proto3), a(lt3, "typeName", "audiotool.sample.v1.SampleConvertDone"), a(lt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: T3 },
  { no: 2, name: "error", kind: "enum", T: proto3.getEnumType(Xa2) }
]));
var Wn3 = lt3;
var ct3 = class ct4 extends Message {
  constructor(t2) {
    super();
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    a(this, "filter", "");
    a(this, "orderBy", "");
    a(this, "textSearch", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new ct4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new ct4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new ct4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(ct4, t2, n3);
  }
};
a(ct3, "runtime", proto3), a(ct3, "typeName", "audiotool.sample.v1.ListSamplesRequest"), a(ct3, "fields", proto3.util.newFieldList(() => [
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "order_by",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 6,
    name: "text_search",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var $n3 = ct3;
var Et3 = class Et4 extends Message {
  constructor(t2) {
    super();
    a(this, "samples", []);
    a(this, "nextPageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Et4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Et4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Et4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Et4, t2, n3);
  }
};
a(Et3, "runtime", proto3), a(Et3, "typeName", "audiotool.sample.v1.ListSamplesResponse"), a(Et3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "samples", kind: "message", T: T3, repeated: true },
  {
    no: 2,
    name: "next_page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Zn3 = Et3;
var dt3 = class dt4 extends Message {
  constructor(t2) {
    super();
    a(this, "sample");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new dt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new dt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new dt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(dt4, t2, n3);
  }
};
a(dt3, "runtime", proto3), a(dt3, "typeName", "audiotool.sample.v1.CreateSampleRequest"), a(dt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: T3 }
]));
var ta3 = dt3;
var ft3 = class ft4 extends Message {
  constructor(t2) {
    super();
    a(this, "uploadUrl", "");
    a(this, "headers", {});
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new ft4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new ft4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new ft4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(ft4, t2, n3);
  }
};
a(ft3, "runtime", proto3), a(ft3, "typeName", "audiotool.sample.v1.SampleUploadEndpoint"), a(ft3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "upload_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "headers", kind: "map", K: 9, V: {
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  } }
]));
var na3 = ft3;
var Tt3 = class Tt4 extends Message {
  constructor(t2) {
    super();
    a(this, "sample");
    a(this, "uploadEndpoint");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Tt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Tt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Tt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Tt4, t2, n3);
  }
};
a(Tt3, "runtime", proto3), a(Tt3, "typeName", "audiotool.sample.v1.CreateSampleResponse"), a(Tt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: T3 },
  { no: 2, name: "upload_endpoint", kind: "message", T: na3 }
]));
var aa3 = Tt3;
var St3 = class St4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new St4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new St4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new St4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(St4, t2, n3);
  }
};
a(St3, "runtime", proto3), a(St3, "typeName", "audiotool.sample.v1.UploadSampleFinishedRequest"), a(St3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var ra3 = St3;
var wt3 = class wt4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new wt4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new wt4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new wt4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(wt4, s3, t2);
  }
};
a(wt3, "runtime", proto3), a(wt3, "typeName", "audiotool.sample.v1.UploadSampleFinishedResponse"), a(wt3, "fields", proto3.util.newFieldList(() => []));
var ia3 = wt3;
var It3 = class It4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new It4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new It4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new It4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(It4, t2, n3);
  }
};
a(It3, "runtime", proto3), a(It3, "typeName", "audiotool.sample.v1.GetSampleRequest"), a(It3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var sa3 = It3;
var gt3 = class gt4 extends Message {
  constructor(t2) {
    super();
    a(this, "sample");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new gt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new gt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new gt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(gt4, t2, n3);
  }
};
a(gt3, "runtime", proto3), a(gt3, "typeName", "audiotool.sample.v1.GetSampleResponse"), a(gt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: T3 }
]));
var ea3 = gt3;
var Jt3 = class Jt4 extends Message {
  constructor(t2) {
    super();
    a(this, "sample");
    a(this, "updateMask");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Jt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Jt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Jt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Jt4, t2, n3);
  }
};
a(Jt3, "runtime", proto3), a(Jt3, "typeName", "audiotool.sample.v1.UpdateSampleRequest"), a(Jt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: T3 },
  { no: 2, name: "update_mask", kind: "message", T: FieldMask }
]));
var oa3 = Jt3;
var Pt3 = class Pt4 extends Message {
  constructor(t2) {
    super();
    a(this, "sample");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Pt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Pt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Pt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Pt4, t2, n3);
  }
};
a(Pt3, "runtime", proto3), a(Pt3, "typeName", "audiotool.sample.v1.UpdateSampleResponse"), a(Pt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "sample", kind: "message", T: T3 }
]));
var ma2 = Pt3;
var Ot3 = class Ot4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Ot4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Ot4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Ot4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Ot4, t2, n3);
  }
};
a(Ot3, "runtime", proto3), a(Ot3, "typeName", "audiotool.sample.v1.DeleteSampleRequest"), a(Ot3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var ua2 = Ot3;
var yt3 = class yt4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new yt4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new yt4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new yt4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals(yt4, s3, t2);
  }
};
a(yt3, "runtime", proto3), a(yt3, "typeName", "audiotool.sample.v1.DeleteSampleResponse"), a(yt3, "fields", proto3.util.newFieldList(() => []));
var la2 = yt3;
var kt3 = class kt4 extends Message {
  constructor(t2) {
    super();
    a(this, "names", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new kt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new kt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new kt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(kt4, t2, n3);
  }
};
a(kt3, "runtime", proto3), a(kt3, "typeName", "audiotool.sample.v1.ListenRequest"), a(kt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "names", kind: "scalar", T: 9, repeated: true }
]));
var ca2 = kt3;
var Nt3 = class Nt4 extends Message {
  constructor(t2) {
    super();
    a(this, "event");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Nt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Nt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Nt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Nt4, t2, n3);
  }
};
a(Nt3, "runtime", proto3), a(Nt3, "typeName", "audiotool.sample.v1.ListenResponse"), a(Nt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "event", kind: "message", T: Qn3 }
]));
var Ea2 = Nt3;
var Br = {
  typeName: "audiotool.sample.v1.SampleService",
  methods: {
    /**
     * Lists the samples.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.ListSamples
     */
    listSamples: {
      name: "ListSamples",
      I: $n3,
      O: Zn3,
      kind: MethodKind.Unary
    },
    /**
     * Create a sample.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.CreateSample
     */
    createSample: {
      name: "CreateSample",
      I: ta3,
      O: aa3,
      kind: MethodKind.Unary
    },
    /**
     * UploadSampleFinished is called from the client when the upload of a sample is finished so the
     * server can start processing the Data. An URL for the upload will be returned by CreateSample.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.UploadSampleFinished
     */
    uploadSampleFinished: {
      name: "UploadSampleFinished",
      I: ra3,
      O: ia3,
      kind: MethodKind.Unary
    },
    /**
     * Gets a sample.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.GetSample
     */
    getSample: {
      name: "GetSample",
      I: sa3,
      O: ea3,
      kind: MethodKind.Unary
    },
    /**
     * Updates a sample.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.UpdateSample
     */
    updateSample: {
      name: "UpdateSample",
      I: oa3,
      O: ma2,
      kind: MethodKind.Unary
    },
    /**
     * Deletes a sample.
     *
     * A sample can be deleted if it is not used by a project (document-service) and if the user has
     * the correct permissions.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.DeleteSample
     */
    deleteSample: {
      name: "DeleteSample",
      I: ua2,
      O: la2,
      kind: MethodKind.Unary
    },
    /**
     * Listen for samples.
     *
     * This is a server streaming RPC. The client sends a request and gets a stream of responses.
     * This can be used when a sample is created and announced as being uploaded in a
     * collaborative session, the other clients can listen for the sample and start processing it as
     * soon as it is ready.
     *
     * The server will have a history which lasts for a certain time frame and size and sends out
     * historical events to the client. This makes it easy to retrieve non-racy events.
     *
     * @generated from rpc audiotool.sample.v1.SampleService.Listen
     */
    listen: {
      name: "Listen",
      I: ca2,
      O: Ea2,
      kind: MethodKind.ServerStreaming
    }
  }
};
var Bt3 = class Bt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "displayName", "");
    a(this, "createTime");
    a(this, "description", "");
    a(this, "numTracks", 0);
    a(this, "numAlbums", 0);
    a(this, "numFollowers", 0);
    a(this, "numFollowing", 0);
    a(this, "tags", []);
    a(this, "avatarUrl", "");
    a(this, "links", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Bt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Bt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Bt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Bt4, t2, n3);
  }
};
a(Bt3, "runtime", proto3), a(Bt3, "typeName", "audiotool.user.v1.User"), a(Bt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "create_time", kind: "message", T: Timestamp },
  {
    no: 4,
    name: "description",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "num_tracks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 6,
    name: "num_albums",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 7,
    name: "num_followers",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 8,
    name: "num_following",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 9, name: "tags", kind: "scalar", T: 9, repeated: true },
  {
    no: 10,
    name: "avatar_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 11, name: "links", kind: "scalar", T: 9, repeated: true }
]));
var en3 = Bt3;
var un3 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.PUBLIC = 1] = "PUBLIC", i2[i2.USERS_FOLLOWING = 2] = "USERS_FOLLOWING", i2[i2.DISABLED = 3] = "DISABLED", i2))(un3 || {});
proto3.util.setEnumType(un3, "audiotool.user.v1.CommentMode", [
  { no: 0, name: "COMMENT_MODE_UNSPECIFIED" },
  { no: 1, name: "COMMENT_MODE_PUBLIC" },
  { no: 2, name: "COMMENT_MODE_USERS_FOLLOWING" },
  { no: 3, name: "COMMENT_MODE_DISABLED" }
]);
var At3 = class At4 extends Message {
  constructor(t2) {
    super();
    a(this, "userPageCommentMode", 0);
    a(this, "defaultTrackCommentMode", 0);
    a(this, "defaultPlaylistCommentMode", 0);
    a(this, "showOnlineStatus", false);
    a(this, "showAsListener", false);
    a(this, "newsletterSubscriber", false);
    a(this, "allowLinksOnUserPageComments", false);
    a(this, "allowLinksOnTrackComments", false);
    a(this, "allowLinksOnPlaylistComments", false);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new At4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new At4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new At4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(At4, t2, n3);
  }
};
a(At3, "runtime", proto3), a(At3, "typeName", "audiotool.user.v1.Settings"), a(At3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "user_page_comment_mode", kind: "enum", T: proto3.getEnumType(un3) },
  { no: 2, name: "default_track_comment_mode", kind: "enum", T: proto3.getEnumType(un3) },
  { no: 3, name: "default_playlist_comment_mode", kind: "enum", T: proto3.getEnumType(un3) },
  {
    no: 4,
    name: "show_online_status",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 5,
    name: "show_as_listener",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "newsletter_subscriber",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 7,
    name: "allow_links_on_user_page_comments",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 8,
    name: "allow_links_on_track_comments",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 9,
    name: "allow_links_on_playlist_comments",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }
]));
var cn3 = At3;
var Lt3 = class Lt4 extends Message {
  constructor(t2) {
    super();
    a(this, "filter", "");
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    a(this, "orderBy", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Lt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Lt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Lt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Lt4, t2, n3);
  }
};
a(Lt3, "runtime", proto3), a(Lt3, "typeName", "audiotool.user.v1.ListUsersRequest"), a(Lt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "order_by",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var da2 = Lt3;
var pt3 = class pt4 extends Message {
  constructor(t2) {
    super();
    a(this, "users", []);
    a(this, "nextPageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new pt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new pt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new pt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(pt4, t2, n3);
  }
};
a(pt3, "runtime", proto3), a(pt3, "typeName", "audiotool.user.v1.ListUsersResponse"), a(pt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "users", kind: "message", T: en3, repeated: true },
  {
    no: 2,
    name: "next_page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var fa2 = pt3;
var Ct3 = class Ct4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Ct4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Ct4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Ct4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Ct4, t2, n3);
  }
};
a(Ct3, "runtime", proto3), a(Ct3, "typeName", "audiotool.user.v1.GetUserRequest"), a(Ct3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Ta = Ct3;
var Ut3 = class Ut4 extends Message {
  constructor(t2) {
    super();
    a(this, "user");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Ut4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Ut4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Ut4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Ut4, t2, n3);
  }
};
a(Ut3, "runtime", proto3), a(Ut3, "typeName", "audiotool.user.v1.GetUserResponse"), a(Ut3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "user", kind: "message", T: en3 }
]));
var Sa2 = Ut3;
var Ft3 = class Ft4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Ft4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Ft4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Ft4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Ft4, t2, n3);
  }
};
a(Ft3, "runtime", proto3), a(Ft3, "typeName", "audiotool.user.v1.DeleteUserRequest"), a(Ft3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var wa2 = Ft3;
var Mt3 = class Mt4 extends Message {
  constructor(t2) {
    super();
    a(this, "user");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Mt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Mt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Mt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Mt4, t2, n3);
  }
};
a(Mt3, "runtime", proto3), a(Mt3, "typeName", "audiotool.user.v1.DeleteUserResponse"), a(Mt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "user", kind: "message", T: en3 }
]));
var Ia2 = Mt3;
var xt3 = class xt4 extends Message {
  constructor(t2) {
    super();
    a(this, "user");
    a(this, "updateMask");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new xt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new xt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new xt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(xt4, t2, n3);
  }
};
a(xt3, "runtime", proto3), a(xt3, "typeName", "audiotool.user.v1.UpdateUserRequest"), a(xt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "user", kind: "message", T: en3 },
  { no: 2, name: "update_mask", kind: "message", T: FieldMask }
]));
var ga2 = xt3;
var ht3 = class ht4 extends Message {
  constructor(t2) {
    super();
    a(this, "user");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new ht4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new ht4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new ht4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(ht4, t2, n3);
  }
};
a(ht3, "runtime", proto3), a(ht3, "typeName", "audiotool.user.v1.UpdateUserResponse"), a(ht3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "user", kind: "message", T: en3 }
]));
var Ja2 = ht3;
var Vt3 = class Vt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Vt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Vt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Vt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Vt4, t2, n3);
  }
};
a(Vt3, "runtime", proto3), a(Vt3, "typeName", "audiotool.user.v1.GetSettingsRequest"), a(Vt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Pa2 = Vt3;
var Rt3 = class Rt4 extends Message {
  constructor(t2) {
    super();
    a(this, "settings");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Rt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Rt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Rt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Rt4, t2, n3);
  }
};
a(Rt3, "runtime", proto3), a(Rt3, "typeName", "audiotool.user.v1.GetSettingsResponse"), a(Rt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "settings", kind: "message", T: cn3 }
]));
var Oa2 = Rt3;
var Yt3 = class Yt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "settings");
    a(this, "updateMask");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Yt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Yt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Yt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Yt4, t2, n3);
  }
};
a(Yt3, "runtime", proto3), a(Yt3, "typeName", "audiotool.user.v1.UpdateSettingsRequest"), a(Yt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "settings", kind: "message", T: cn3 },
  { no: 3, name: "update_mask", kind: "message", T: FieldMask }
]));
var ya2 = Yt3;
var vt3 = class vt4 extends Message {
  constructor(t2) {
    super();
    a(this, "settings");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new vt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new vt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new vt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(vt4, t2, n3);
  }
};
a(vt3, "runtime", proto3), a(vt3, "typeName", "audiotool.user.v1.UpdateSettingsResponse"), a(vt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "settings", kind: "message", T: cn3 }
]));
var ka2 = vt3;
var Dt3 = class Dt4 extends Message {
  constructor(t2) {
    super();
    a(this, "data", new Uint8Array(0));
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Dt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Dt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Dt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Dt4, t2, n3);
  }
};
a(Dt3, "runtime", proto3), a(Dt3, "typeName", "audiotool.user.v1.UploadAvatarRequest"), a(Dt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]));
var Na2 = Dt3;
var Ht3 = class Ht4 extends Message {
  constructor(t2) {
    super();
    a(this, "avatarUrl", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Ht4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Ht4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Ht4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Ht4, t2, n3);
  }
};
a(Ht3, "runtime", proto3), a(Ht3, "typeName", "audiotool.user.v1.UploadAvatarResponse"), a(Ht3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "avatar_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Ba2 = Ht3;
var Ar = {
  typeName: "audiotool.user.v1.UserService",
  methods: {
    /**
     * Lists the users.
     *
     * @generated from rpc audiotool.user.v1.UserService.ListUsers
     */
    listUsers: {
      name: "ListUsers",
      I: da2,
      O: fa2,
      kind: MethodKind.Unary
    },
    /**
     * Gets a user.
     *
     * @generated from rpc audiotool.user.v1.UserService.GetUser
     */
    getUser: {
      name: "GetUser",
      I: Ta,
      O: Sa2,
      kind: MethodKind.Unary
    },
    /**
     * Delete a user.
     *
     * @generated from rpc audiotool.user.v1.UserService.DeleteUser
     */
    deleteUser: {
      name: "DeleteUser",
      I: wa2,
      O: Ia2,
      kind: MethodKind.Unary
    },
    /**
     * Update a user.
     *
     * @generated from rpc audiotool.user.v1.UserService.UpdateUser
     */
    updateUser: {
      name: "UpdateUser",
      I: ga2,
      O: Ja2,
      kind: MethodKind.Unary
    },
    /**
     * Get the settings of a user.
     *
     * @generated from rpc audiotool.user.v1.UserService.GetSettings
     */
    getSettings: {
      name: "GetSettings",
      I: Pa2,
      O: Oa2,
      kind: MethodKind.Unary
    },
    /**
     * Update the settings of a user.
     *
     * @generated from rpc audiotool.user.v1.UserService.UpdateSettings
     */
    updateSettings: {
      name: "UpdateSettings",
      I: ya2,
      O: ka2,
      kind: MethodKind.Unary
    },
    /**
     * Upload an avatar for the logged in user.
     *
     * @generated from rpc audiotool.user.v1.UserService.UploadAvatar
     */
    uploadAvatar: {
      name: "UploadAvatar",
      I: Na2,
      O: Ba2,
      kind: MethodKind.Unary
    }
  }
};
var mr = async (i2, s3) => {
  try {
    return await fetch(i2, s3);
  } catch (t2) {
    return new Error("error during fetch", { cause: t2 });
  }
};
var Aa2 = "###keepalive###";
var Lr = ({
  baseUrl: i2,
  useBinaryFormat: s3,
  typeRegistry: t2,
  getToken: n3
}) => createConnectTransport({
  baseUrl: i2,
  useBinaryFormat: s3,
  fetch: async (rn3, u4) => {
    const { headers: c5, keepalive: tn3 } = Cr(u4 == null ? void 0 : u4.headers);
    return c5.set("Authorization", await n3()), fetch(rn3, {
      credentials: "omit",
      ...u4,
      headers: c5,
      keepalive: tn3
    });
  },
  jsonOptions: {
    typeRegistry: t2
  }
});
var pr = (i2) => {
  if (i2 === void 0)
    return;
  const s3 = (i2 == null ? void 0 : i2.keepalive) ?? false, t2 = new Headers(i2 == null ? void 0 : i2.headers);
  return t2.set(Aa2, s3 ? "true" : "false"), i2 = {
    ...i2,
    headers: t2
  }, delete i2.keepalive, i2;
};
var Cr = (i2) => {
  const s3 = new Headers(i2), t2 = s3.get(Aa2) === "true";
  return s3.delete(Aa2), { headers: s3, keepalive: t2 };
};
var on3 = (i2, s3, t2) => {
  const u4 = ((l4) => l4 instanceof ConnectError ? l4.code === Code.Unavailable || l4.code === Code.Unknown : false), c5 = createClient(i2, s3), tn3 = {};
  return Object.entries(i2.methods).forEach(([l4, ja2]) => {
    if (ja2.kind !== MethodKind.Unary) {
      tn3[l4] = c5[l4];
      return;
    }
    const Sn3 = c5[l4];
    tn3[l4] = async (wn3, m4) => {
      var Ga2, Ka2, za2, Qa2;
      for (m4 = pr(m4); ; )
        try {
          const nn3 = await Sn3(
            wn3,
            m4
          );
          return (Ga2 = m4 == null ? void 0 : m4.callIsOk) == null || Ga2.setValue(true), nn3;
        } catch (nn3) {
          if ((Ka2 = m4 == null ? void 0 : m4.callIsOk) == null || Ka2.setValue(false), !(nn3 instanceof Error && u4(nn3)))
            return new Error(`${i2.typeName}.${l4} threw error`, {
              cause: nn3
            });
          if ((za2 = m4 == null ? void 0 : m4.onRetry) == null || za2.call(m4, nn3), ((m4 == null ? void 0 : m4.logIfRetrying) ?? true) && console.warn(
            `${i2.typeName}.${l4} call failed, retrying in 2000 ms. Error:`,
            nn3
          ), await i(
            2e3 + Math.random() * 2e3 * 0.1,
            // pass in signal for earlier return in case of abort
            m4 == null ? void 0 : m4.signal
          ), ((Qa2 = m4 == null ? void 0 : m4.signal) == null ? void 0 : Qa2.aborted) ?? false)
            return new Error(`${i2.typeName}.${l4} was aborted`, {
              cause: nn3
            });
          continue;
        }
    };
  }), tn3;
};
var Ur = (i2) => {
  const s3 = i2 == null ? void 0 : i2.typeUrl;
  if (s3 === void 0)
    return;
  const t2 = s3.split("/").pop();
  return cs[t2];
};
var _r = (i2) => cs[i2.getType().typeName] ?? s();
var br = (i2) => Any.pack(i2);
var Fr = createRegistry(...Object.values(us));
var Mr = (i2) => {
  if (i2 !== void 0)
    return i2.unpack(Fr);
};
var jr = (i2) => Mr(i2) ?? s("couldn't unpack any entity of type " + (i2 == null ? void 0 : i2.typeUrl));
var Gr = (i2) => i2.charAt(0).toLowerCase() + i2.slice(1);
var _a2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.AUTO_FILTER = 1] = "AUTO_FILTER", i2[i2.BAND_SPLITTER = 2] = "BAND_SPLITTER", i2[i2.BASSLINE = 3] = "BASSLINE", i2[i2.BEATBOX8 = 4] = "BEATBOX8", i2[i2.BEATBOX9 = 5] = "BEATBOX9", i2[i2.CROSSFADER = 6] = "CROSSFADER", i2[i2.CURVE = 7] = "CURVE", i2[i2.EXCITER = 8] = "EXCITER", i2[i2.GRAPHICAL_EQ = 9] = "GRAPHICAL_EQ", i2[i2.GRAVITY = 10] = "GRAVITY", i2[i2.HEISENBERG = 11] = "HEISENBERG", i2[i2.HELMHOLTZ = 12] = "HELMHOLTZ", i2[i2.MACHINISTE = 13] = "MACHINISTE", i2[i2.MATRIX = 14] = "MATRIX", i2[i2.NOTE_SPLITTER = 15] = "NOTE_SPLITTER", i2[i2.PANORAMA = 16] = "PANORAMA", i2[i2.PULSAR = 17] = "PULSAR", i2[i2.PULVERISATEUR = 18] = "PULVERISATEUR", i2[i2.QUANTUM = 19] = "QUANTUM", i2[i2.QUASAR = 20] = "QUASAR", i2[i2.RASSELBOCK = 21] = "RASSELBOCK", i2[i2.SPACE = 22] = "SPACE", i2[i2.STEREO_ENHANCER = 23] = "STEREO_ENHANCER", i2[i2.STOMPBOX_CHORUS = 24] = "STOMPBOX_CHORUS", i2[i2.STOMPBOX_COMPRESSOR = 25] = "STOMPBOX_COMPRESSOR", i2[i2.STOMPBOX_CRUSHER = 26] = "STOMPBOX_CRUSHER", i2[i2.STOMPBOX_DELAY = 27] = "STOMPBOX_DELAY", i2[i2.STOMPBOX_FLANGER = 28] = "STOMPBOX_FLANGER", i2[i2.STOMPBOX_GATE = 29] = "STOMPBOX_GATE", i2[i2.STOMPBOX_PARAMETRIC_EQUALIZER = 30] = "STOMPBOX_PARAMETRIC_EQUALIZER", i2[i2.STOMPBOX_PHASER = 31] = "STOMPBOX_PHASER", i2[i2.STOMPBOX_PITCH_DELAY = 32] = "STOMPBOX_PITCH_DELAY", i2[i2.STOMPBOX_REVERB = 33] = "STOMPBOX_REVERB", i2[i2.STOMPBOX_SLOPE = 34] = "STOMPBOX_SLOPE", i2[i2.STOMPBOX_STEREO_DETUNE = 35] = "STOMPBOX_STEREO_DETUNE", i2[i2.STOMPBOX_TUBE = 36] = "STOMPBOX_TUBE", i2[i2.TONEMATRIX = 37] = "TONEMATRIX", i2[i2.WAVESHAPER = 38] = "WAVESHAPER", i2[i2.GAKKI = 39] = "GAKKI", i2))(_a2 || {});
proto3.util.setEnumType(_a2, "audiotool.preset.v1.PresetDeviceType", [
  { no: 0, name: "PRESET_DEVICE_TYPE_UNSPECIFIED" },
  { no: 1, name: "PRESET_DEVICE_TYPE_AUTO_FILTER" },
  { no: 2, name: "PRESET_DEVICE_TYPE_BAND_SPLITTER" },
  { no: 3, name: "PRESET_DEVICE_TYPE_BASSLINE" },
  { no: 4, name: "PRESET_DEVICE_TYPE_BEATBOX8" },
  { no: 5, name: "PRESET_DEVICE_TYPE_BEATBOX9" },
  { no: 6, name: "PRESET_DEVICE_TYPE_CROSSFADER" },
  { no: 7, name: "PRESET_DEVICE_TYPE_CURVE" },
  { no: 8, name: "PRESET_DEVICE_TYPE_EXCITER" },
  { no: 9, name: "PRESET_DEVICE_TYPE_GRAPHICAL_EQ" },
  { no: 10, name: "PRESET_DEVICE_TYPE_GRAVITY" },
  { no: 11, name: "PRESET_DEVICE_TYPE_HEISENBERG" },
  { no: 12, name: "PRESET_DEVICE_TYPE_HELMHOLTZ" },
  { no: 13, name: "PRESET_DEVICE_TYPE_MACHINISTE" },
  { no: 14, name: "PRESET_DEVICE_TYPE_MATRIX" },
  { no: 15, name: "PRESET_DEVICE_TYPE_NOTE_SPLITTER" },
  { no: 16, name: "PRESET_DEVICE_TYPE_PANORAMA" },
  { no: 17, name: "PRESET_DEVICE_TYPE_PULSAR" },
  { no: 18, name: "PRESET_DEVICE_TYPE_PULVERISATEUR" },
  { no: 19, name: "PRESET_DEVICE_TYPE_QUANTUM" },
  { no: 20, name: "PRESET_DEVICE_TYPE_QUASAR" },
  { no: 21, name: "PRESET_DEVICE_TYPE_RASSELBOCK" },
  { no: 22, name: "PRESET_DEVICE_TYPE_SPACE" },
  { no: 23, name: "PRESET_DEVICE_TYPE_STEREO_ENHANCER" },
  { no: 24, name: "PRESET_DEVICE_TYPE_STOMPBOX_CHORUS" },
  { no: 25, name: "PRESET_DEVICE_TYPE_STOMPBOX_COMPRESSOR" },
  { no: 26, name: "PRESET_DEVICE_TYPE_STOMPBOX_CRUSHER" },
  { no: 27, name: "PRESET_DEVICE_TYPE_STOMPBOX_DELAY" },
  { no: 28, name: "PRESET_DEVICE_TYPE_STOMPBOX_FLANGER" },
  { no: 29, name: "PRESET_DEVICE_TYPE_STOMPBOX_GATE" },
  { no: 30, name: "PRESET_DEVICE_TYPE_STOMPBOX_PARAMETRIC_EQUALIZER" },
  { no: 31, name: "PRESET_DEVICE_TYPE_STOMPBOX_PHASER" },
  { no: 32, name: "PRESET_DEVICE_TYPE_STOMPBOX_PITCH_DELAY" },
  { no: 33, name: "PRESET_DEVICE_TYPE_STOMPBOX_REVERB" },
  { no: 34, name: "PRESET_DEVICE_TYPE_STOMPBOX_SLOPE" },
  { no: 35, name: "PRESET_DEVICE_TYPE_STOMPBOX_STEREO_DETUNE" },
  { no: 36, name: "PRESET_DEVICE_TYPE_STOMPBOX_TUBE" },
  { no: 37, name: "PRESET_DEVICE_TYPE_TONEMATRIX" },
  { no: 38, name: "PRESET_DEVICE_TYPE_WAVESHAPER" },
  { no: 39, name: "PRESET_DEVICE_TYPE_GAKKI" }
]);
var ba2 = /* @__PURE__ */ ((i2) => (i2[i2.UNSPECIFIED = 0] = "UNSPECIFIED", i2[i2.PUBLIC = 1] = "PUBLIC", i2[i2.UNLISTED = 2] = "UNLISTED", i2[i2.PRIVATE = 3] = "PRIVATE", i2))(ba2 || {});
proto3.util.setEnumType(ba2, "audiotool.preset.v1.PresetUsage", [
  { no: 0, name: "PRESET_USAGE_UNSPECIFIED" },
  { no: 1, name: "PRESET_USAGE_PUBLIC" },
  { no: 2, name: "PRESET_USAGE_UNLISTED" },
  { no: 3, name: "PRESET_USAGE_PRIVATE" }
]);
var qt3 = class qt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    a(this, "displayName", "");
    a(this, "description", "");
    a(this, "ownerName", "");
    a(this, "favoritedByUser", false);
    a(this, "numFavorites", 0);
    a(this, "numUsages", 0);
    a(this, "createTime");
    a(this, "updateTime");
    a(this, "usage", 0);
    a(this, "tags", []);
    a(this, "deviceType", 0);
    a(this, "dataUrl", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new qt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new qt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new qt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(qt4, t2, n3);
  }
};
a(qt3, "runtime", proto3), a(qt3, "typeName", "audiotool.preset.v1.Preset"), a(qt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "display_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "description",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "owner_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "favorited_by_user",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 6,
    name: "num_favorites",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 7,
    name: "num_usages",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  { no: 8, name: "create_time", kind: "message", T: Timestamp },
  { no: 9, name: "update_time", kind: "message", T: Timestamp },
  { no: 10, name: "usage", kind: "enum", T: proto3.getEnumType(ba2) },
  { no: 11, name: "tags", kind: "scalar", T: 9, repeated: true },
  { no: 12, name: "device_type", kind: "enum", T: proto3.getEnumType(_a2) },
  {
    no: 13,
    name: "data_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var an3 = qt3;
var Xt3 = class Xt4 extends Message {
  constructor(t2) {
    super();
    a(this, "filter", "");
    a(this, "pageSize", 0);
    a(this, "pageToken", "");
    a(this, "orderBy", "");
    a(this, "textSearch", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Xt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Xt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Xt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Xt4, t2, n3);
  }
};
a(Xt3, "runtime", proto3), a(Xt3, "typeName", "audiotool.preset.v1.ListPresetsRequest"), a(Xt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "page_size",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  },
  {
    no: 3,
    name: "page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "order_by",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 5,
    name: "text_search",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var La2 = Xt3;
var _t3 = class _t4 extends Message {
  constructor(t2) {
    super();
    a(this, "presets", []);
    a(this, "nextPageToken", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new _t4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new _t4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new _t4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(_t4, t2, n3);
  }
};
a(_t3, "runtime", proto3), a(_t3, "typeName", "audiotool.preset.v1.ListPresetsResponse"), a(_t3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "presets", kind: "message", T: an3, repeated: true },
  {
    no: 2,
    name: "next_page_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var pa2 = _t3;
var bt3 = class bt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new bt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new bt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new bt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(bt4, t2, n3);
  }
};
a(bt3, "runtime", proto3), a(bt3, "typeName", "audiotool.preset.v1.GetPresetRequest"), a(bt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Ca2 = bt3;
var jt3 = class jt4 extends Message {
  constructor(t2) {
    super();
    a(this, "preset");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new jt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new jt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new jt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(jt4, t2, n3);
  }
};
a(jt3, "runtime", proto3), a(jt3, "typeName", "audiotool.preset.v1.GetPresetResponse"), a(jt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "preset", kind: "message", T: an3 }
]));
var Ua2 = jt3;
var Gt3 = class Gt4 extends Message {
  constructor(t2) {
    super();
    a(this, "preset");
    a(this, "data");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Gt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Gt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Gt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Gt4, t2, n3);
  }
};
a(Gt3, "runtime", proto3), a(Gt3, "typeName", "audiotool.preset.v1.CreatePresetRequest"), a(Gt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "preset", kind: "message", T: an3 },
  { no: 2, name: "data", kind: "message", T: Any }
]));
var Fa2 = Gt3;
var Kt3 = class Kt4 extends Message {
  constructor(t2) {
    super();
    a(this, "preset");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Kt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Kt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Kt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Kt4, t2, n3);
  }
};
a(Kt3, "runtime", proto3), a(Kt3, "typeName", "audiotool.preset.v1.CreatePresetResponse"), a(Kt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "preset", kind: "message", T: an3 }
]));
var Ma2 = Kt3;
var zt3 = class zt4 extends Message {
  constructor(t2) {
    super();
    a(this, "preset");
    a(this, "updateMask");
    a(this, "data");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new zt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new zt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new zt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(zt4, t2, n3);
  }
};
a(zt3, "runtime", proto3), a(zt3, "typeName", "audiotool.preset.v1.UpdatePresetRequest"), a(zt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "preset", kind: "message", T: an3 },
  { no: 2, name: "update_mask", kind: "message", T: FieldMask },
  { no: 3, name: "data", kind: "message", T: Any }
]));
var xa2 = zt3;
var Qt3 = class Qt4 extends Message {
  constructor(t2) {
    super();
    a(this, "preset");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Qt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Qt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Qt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Qt4, t2, n3);
  }
};
a(Qt3, "runtime", proto3), a(Qt3, "typeName", "audiotool.preset.v1.UpdatePresetResponse"), a(Qt3, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "preset", kind: "message", T: an3 }
]));
var ha2 = Qt3;
var Wt3 = class Wt4 extends Message {
  constructor(t2) {
    super();
    a(this, "name", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Wt4().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Wt4().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Wt4().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Wt4, t2, n3);
  }
};
a(Wt3, "runtime", proto3), a(Wt3, "typeName", "audiotool.preset.v1.DeletePresetRequest"), a(Wt3, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Va2 = Wt3;
var $t3 = class $t4 extends Message {
  constructor(s3) {
    super(), proto3.util.initPartial(s3, this);
  }
  static fromBinary(s3, t2) {
    return new $t4().fromBinary(s3, t2);
  }
  static fromJson(s3, t2) {
    return new $t4().fromJson(s3, t2);
  }
  static fromJsonString(s3, t2) {
    return new $t4().fromJsonString(s3, t2);
  }
  static equals(s3, t2) {
    return proto3.util.equals($t4, s3, t2);
  }
};
a($t3, "runtime", proto3), a($t3, "typeName", "audiotool.preset.v1.DeletePresetResponse"), a($t3, "fields", proto3.util.newFieldList(() => []));
var Ra2 = $t3;
var xr = {
  typeName: "audiotool.preset.v1.PresetService",
  methods: {
    /**
     * Lists the presets.
     *
     * @generated from rpc audiotool.preset.v1.PresetService.ListPresets
     */
    listPresets: {
      name: "ListPresets",
      I: La2,
      O: pa2,
      kind: MethodKind.Unary
    },
    /**
     * Gets a preset.
     *
     * @generated from rpc audiotool.preset.v1.PresetService.GetPreset
     */
    getPreset: {
      name: "GetPreset",
      I: Ca2,
      O: Ua2,
      kind: MethodKind.Unary
    },
    /**
     * Create a preset.
     *
     * @generated from rpc audiotool.preset.v1.PresetService.CreatePreset
     */
    createPreset: {
      name: "CreatePreset",
      I: Fa2,
      O: Ma2,
      kind: MethodKind.Unary
    },
    /**
     * Update a preset.
     *
     * @generated from rpc audiotool.preset.v1.PresetService.UpdatePreset
     */
    updatePreset: {
      name: "UpdatePreset",
      I: xa2,
      O: ha2,
      kind: MethodKind.Unary
    },
    /**
     * Deletes a preset.
     *
     * A preset can always be deleted. If the preset is in use by a project,
     * the project must handle the missing link to the preset.
     *
     * @generated from rpc audiotool.preset.v1.PresetService.DeletePreset
     */
    deletePreset: {
      name: "DeletePreset",
      I: Va2,
      O: Ra2,
      kind: MethodKind.Unary
    }
  }
};
var ur = (i2) => {
  const s3 = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i, t2 = i2.match(s3);
  return t2 == null ? new Error() : t2[0];
};
var hr = (i2) => {
  const s3 = on3(xr, i2);
  return {
    list: async (t2, n3) => {
      const rn3 = `preset.device_type == '${Vr[t2]}'`;
      n3 !== void 0 && n3.length > 1 && (n3 = `${n3.replace(/['"]/g, "").toLowerCase().split(" ").filter((l4) => l4.length > 1).join(" & ")}`);
      const u4 = await s3.listPresets({
        filter: rn3,
        textSearch: n3
      });
      if (u4 instanceof Error)
        throw u4;
      return await Promise.all(
        u4.presets.map(
          (c5) => lr(c5)
        )
      );
    },
    get: async (t2) => {
      const n3 = await s3.getPreset({
        name: `presets/${ur(t2)}`
      });
      if (n3 instanceof Error)
        throw n3;
      if (n3.preset === void 0)
        throw new Error(`No preset found for UUID "${ur(t2)}"`);
      return lr(n3.preset);
    }
  };
};
var Vr = {
  autoFilter: "PRESET_DEVICE_TYPE_AUTO_FILTER",
  bandSplitter: "PRESET_DEVICE_TYPE_BAND_SPLITTER",
  bassline: "PRESET_DEVICE_TYPE_BASSLINE",
  beatbox8: "PRESET_DEVICE_TYPE_BEATBOX8",
  beatbox9: "PRESET_DEVICE_TYPE_BEATBOX9",
  crossfader: "PRESET_DEVICE_TYPE_CROSSFADER",
  curve: "PRESET_DEVICE_TYPE_CURVE",
  exciter: "PRESET_DEVICE_TYPE_EXCITER",
  graphicalEQ: "PRESET_DEVICE_TYPE_GRAPHICAL_EQ",
  gravity: "PRESET_DEVICE_TYPE_GRAVITY",
  heisenberg: "PRESET_DEVICE_TYPE_HEISENBERG",
  helmholtz: "PRESET_DEVICE_TYPE_HELMHOLTZ",
  machiniste: "PRESET_DEVICE_TYPE_MACHINISTE",
  matrixArpeggiator: "PRESET_DEVICE_TYPE_MATRIX",
  gakki: "PRESET_DEVICE_TYPE_GAKKI",
  noteSplitter: "PRESET_DEVICE_TYPE_NOTE_SPLITTER",
  panorama: "PRESET_DEVICE_TYPE_PANORAMA",
  pulsar: "PRESET_DEVICE_TYPE_PULSAR",
  pulverisateur: "PRESET_DEVICE_TYPE_PULVERISATEUR",
  quantum: "PRESET_DEVICE_TYPE_QUANTUM",
  quasar: "PRESET_DEVICE_TYPE_QUASAR",
  rasselbock: "PRESET_DEVICE_TYPE_RASSELBOCK",
  space: "PRESET_DEVICE_TYPE_SPACE",
  stereoEnhancer: "PRESET_DEVICE_TYPE_STEREO_ENHANCER",
  stompboxChorus: "PRESET_DEVICE_TYPE_STOMPBOX_CHORUS",
  stompboxCompressor: "PRESET_DEVICE_TYPE_STOMPBOX_COMPRESSOR",
  stompboxCrusher: "PRESET_DEVICE_TYPE_STOMPBOX_CRUSHER",
  stompboxDelay: "PRESET_DEVICE_TYPE_STOMPBOX_DELAY",
  stompboxFlanger: "PRESET_DEVICE_TYPE_STOMPBOX_FLANGER",
  stompboxGate: "PRESET_DEVICE_TYPE_STOMPBOX_GATE",
  stompboxParametricEqualizer: "PRESET_DEVICE_TYPE_STOMPBOX_PARAMETRIC_EQUALIZER",
  stompboxPhaser: "PRESET_DEVICE_TYPE_STOMPBOX_PHASER",
  stompboxPitchDelay: "PRESET_DEVICE_TYPE_STOMPBOX_PITCH_DELAY",
  stompboxReverb: "PRESET_DEVICE_TYPE_STOMPBOX_REVERB",
  stompboxSlope: "PRESET_DEVICE_TYPE_STOMPBOX_SLOPE",
  stompboxStereoDetune: "PRESET_DEVICE_TYPE_STOMPBOX_STEREO_DETUNE",
  stompboxTube: "PRESET_DEVICE_TYPE_STOMPBOX_TUBE",
  tonematrix: "PRESET_DEVICE_TYPE_TONEMATRIX",
  waveshaper: "PRESET_DEVICE_TYPE_WAVESHAPER"
};
var lr = async (i2) => {
  const s3 = i2, t2 = await fetch(i2.dataUrl, {
    credentials: "omit"
  }).then((c5) => c5.arrayBuffer()), n3 = new Tr();
  if (!Any.fromBinary(new Uint8Array(t2)).unpackTo(n3))
    throw new Error("Failed to unpack preset data");
  if (n3.target === void 0)
    throw new Error("Preset data does not contain a target");
  const u4 = Ur(n3.target);
  if (u4 === void 0)
    throw new Error("Preset data does not contain an entity");
  return {
    meta: s3,
    data: n3,
    entityType: u4
  };
};
var Kr = async (i2, s3) => {
  const t2 = Lr({
    baseUrl: s3 ?? "https://rpc.audiotool.com/",
    useBinaryFormat: false,
    typeRegistry: createRegistry(Tr),
    getToken: i2
  }), n3 = on3(
    Nr,
    t2
  ), rn3 = on3(Ar, t2), u4 = on3(
    kr,
    t2
  ), c5 = hr(t2), tn3 = on3(
    Br,
    t2
  ), l4 = on3(
    yr,
    t2
  );
  return {
    authorizedFetch: async (Sn3, wn3) => mr(Sn3, {
      credentials: "omit",
      ...wn3
    }),
    fetch: mr,
    userService: rn3,
    projectService: n3,
    projectRoleService: u4,
    sampleService: tn3,
    presets: c5,
    audioGraphService: l4
  };
};

// node_modules/@audiotool/nexus/dist/hash-map-CMrPM1s6.js
var v5 = (i2) => {
  throw TypeError(i2);
};
var M5 = (i2, e, s3) => e.has(i2) || v5("Cannot " + s3);
var t = (i2, e, s3) => (M5(i2, e, "read from private field"), s3 ? s3.call(i2) : e.get(i2));
var h5 = (i2, e, s3) => e.has(i2) ? v5("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i2) : e.set(i2, s3);
var o2 = (i2, e, s3, r2) => (M5(i2, e, "write to private field"), r2 ? r2.call(i2, s3) : e.set(i2, s3), s3);
var l3;
var A5 = class {
  constructor() {
    h5(this, l3, /* @__PURE__ */ new Set());
  }
  // A set allows us to remove while iterating
  subscribe(e) {
    return t(this, l3).add(e), { terminate: () => t(this, l3).delete(e) };
  }
  notify(e) {
    t(this, l3).forEach((s3) => s3(e));
  }
  terminate() {
    t(this, l3).clear();
  }
};
l3 = /* @__PURE__ */ new WeakMap();
var f4;
var c4;
var g5;
var E4 = class {
  constructor(e) {
    h5(this, f4, new A5());
    h5(this, c4);
    h5(this, g5, V5(t(this, f4)));
    o2(this, c4, e);
  }
  getValue() {
    return t(this, g5).call(this), t(this, c4);
  }
  setValue(e) {
    t(this, c4) !== e && (o2(this, c4, e), t(this, f4).notify(e));
  }
  subscribe(e, s3 = false) {
    return s3 && e(t(this, c4)), t(this, f4).subscribe(e);
  }
  terminate() {
    t(this, f4).terminate();
  }
};
f4 = /* @__PURE__ */ new WeakMap(), c4 = /* @__PURE__ */ new WeakMap(), g5 = /* @__PURE__ */ new WeakMap();
var u3;
var y5;
var n2;
u3 = /* @__PURE__ */ new WeakMap(), y5 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ new WeakMap();
var V5 = (i2) => () => {
};
var d3;
var m3;
var b5;
var T4 = class {
  /** if `warnAfterMs` is set, the lock will emit a warning if a call to `lock.acquire()
   * tok more than `warnAfterMs` milliseconds.
   */
  constructor(e) {
    h5(this, d3, false);
    h5(this, m3, []);
    h5(this, b5);
    o2(this, b5, (e == null ? void 0 : e.warnAfterMs) ?? void 0);
  }
  /**
   * Wait until no other async thread holds a lock, then returns a lock.
   *
   * Once the lock is held, all other threads that call `acquire()` will have to wait until
   * the lock is released.
   *
   *
   * Release the lock with `lock.release()`.
   *
   * Example:
   * ```ts
   * const lock = new AsyncLock()
   * ...
   * const l = await lock.acquire()
   * // do stuff
   * l.release()
   * ```
   *
   */
  async acquire() {
    let e = () => {
    };
    t(this, b5) !== void 0 && (e = k5(
      t(this, b5),
      `Waited for lock.acquire() for more than ${t(this, b5)} ms, deadlock?`
    )), t(this, d3) && await new Promise((r2) => t(this, m3).push(r2)), e(), o2(this, d3, true);
    let s3 = false;
    return {
      release: () => {
        var r2;
        if (s3)
          throw new Error("Lock already released");
        s3 = true, t(this, m3).length > 0 ? (r2 = t(this, m3).shift()) == null || r2() : o2(this, d3, false);
      }
    };
  }
  /**
   * Execute a function after acquiring a lock, and release the lock after the function is done.
   *
   * Example:
   * ```ts
   * const v = await lock.runAcquired(() => {
   *  // do something
   *  return 42
   * })
   * ```
   *
   * This function is **safe against exceptions**. If the function throws an exception, the lock
   * is released before the exception is thrown.
   *
   */
  async runAcquired(e) {
    const s3 = await this.acquire();
    let r2;
    try {
      return r2 = await e(), s3.release(), r2;
    } catch (S6) {
      throw s3.release(), S6;
    }
  }
  /** Weather the lock is currently taken. Because javascript is single-threaded, it is safe
   * to do e.g.:
   * ```ts
   * if (!lock.locked) {
   *   lock.acquire()
   *   // do something
   *   lock.release()
   * }
   *
   * ```
   *
   * without `await`ing the `lock.acquire()`.
   */
  get locked() {
    return t(this, d3);
  }
};
d3 = /* @__PURE__ */ new WeakMap(), m3 = /* @__PURE__ */ new WeakMap(), b5 = /* @__PURE__ */ new WeakMap();
var k5 = (i2, e) => {
  const s3 = setTimeout(() => {
    console.warn(e), console.trace("Waited here:");
  }, i2);
  return () => clearTimeout(s3);
};
var w6 = /* @__PURE__ */ Symbol();
var a2;
var _5 = class {
  constructor() {
    h5(this, a2, /* @__PURE__ */ new Map());
  }
  clear() {
    t(this, a2).clear();
  }
  delete(e) {
    const s3 = e[w6];
    return t(this, a2).delete(s3);
  }
  forEach(e, s3) {
    t(this, a2).forEach(([r2, S6]) => {
      e(S6, r2, this);
    }, s3);
  }
  entries() {
    return t(this, a2).entries().map(([e, [s3, r2]]) => [s3, r2]);
  }
  get(e) {
    var s3;
    return (s3 = t(this, a2).get(e[w6])) == null ? void 0 : s3[1];
  }
  has(e) {
    return t(this, a2).has(e[w6]);
  }
  keys() {
    return t(this, a2).values().map(([e, s3]) => e);
  }
  set(e, s3) {
    const r2 = e[w6];
    return t(this, a2).set(r2, [e, s3]), this;
  }
  values() {
    return t(this, a2).values().map(([e, s3]) => s3);
  }
  get size() {
    return t(this, a2).size;
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get [Symbol.toStringTag]() {
    return "StringHashMap";
  }
};
a2 = /* @__PURE__ */ new WeakMap();

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default = validate;

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v8;
  return Uint8Array.of((v8 = parseInt(uuid.slice(0, 8), 16)) >>> 24, v8 >>> 16 & 255, v8 >>> 8 & 255, v8 & 255, (v8 = parseInt(uuid.slice(9, 13), 16)) >>> 8, v8 & 255, (v8 = parseInt(uuid.slice(14, 18), 16)) >>> 8, v8 & 255, (v8 = parseInt(uuid.slice(19, 23), 16)) >>> 8, v8 & 255, (v8 = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v8 / 4294967296 & 255, v8 >>> 24 & 255, v8 >>> 16 & 255, v8 >>> 8 & 255, v8 & 255);
}
var parse_default = parse;

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (let i2 = 0; i2 < 256; ++i2) {
  byteToHex.push((i2 + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = new Uint8Array(str.length);
  for (let i2 = 0; i2 < str.length; ++i2) {
    bytes[i2] = str.charCodeAt(i2);
  }
  return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(version, hash, value, namespace, buf, offset) {
  const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
  const namespaceBytes = typeof namespace === "string" ? parse_default(namespace) : namespace;
  if (typeof namespace === "string") {
    namespace = parse_default(namespace);
  }
  if (namespace?.length !== 16) {
    throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
  }
  let bytes = new Uint8Array(16 + valueBytes.length);
  bytes.set(namespaceBytes);
  bytes.set(valueBytes, namespaceBytes.length);
  bytes = hash(bytes);
  bytes[6] = bytes[6] & 15 | version;
  bytes[8] = bytes[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i2 = 0; i2 < 16; ++i2) {
      buf[offset + i2] = bytes[i2];
    }
    return buf;
  }
  return unsafeStringify(bytes);
}

// node_modules/uuid/dist/esm-browser/sha1.js
function f5(s3, x6, y7, z7) {
  switch (s3) {
    case 0:
      return x6 & y7 ^ ~x6 & z7;
    case 1:
      return x6 ^ y7 ^ z7;
    case 2:
      return x6 & y7 ^ x6 & z7 ^ y7 & z7;
    case 3:
      return x6 ^ y7 ^ z7;
  }
}
function ROTL(x6, n3) {
  return x6 << n3 | x6 >>> 32 - n3;
}
function sha1(bytes) {
  const K7 = [1518500249, 1859775393, 2400959708, 3395469782];
  const H7 = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  const newBytes = new Uint8Array(bytes.length + 1);
  newBytes.set(bytes);
  newBytes[bytes.length] = 128;
  bytes = newBytes;
  const l4 = bytes.length / 4 + 2;
  const N6 = Math.ceil(l4 / 16);
  const M7 = new Array(N6);
  for (let i2 = 0; i2 < N6; ++i2) {
    const arr = new Uint32Array(16);
    for (let j7 = 0; j7 < 16; ++j7) {
      arr[j7] = bytes[i2 * 64 + j7 * 4] << 24 | bytes[i2 * 64 + j7 * 4 + 1] << 16 | bytes[i2 * 64 + j7 * 4 + 2] << 8 | bytes[i2 * 64 + j7 * 4 + 3];
    }
    M7[i2] = arr;
  }
  M7[N6 - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M7[N6 - 1][14] = Math.floor(M7[N6 - 1][14]);
  M7[N6 - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i2 = 0; i2 < N6; ++i2) {
    const W7 = new Uint32Array(80);
    for (let t2 = 0; t2 < 16; ++t2) {
      W7[t2] = M7[i2][t2];
    }
    for (let t2 = 16; t2 < 80; ++t2) {
      W7[t2] = ROTL(W7[t2 - 3] ^ W7[t2 - 8] ^ W7[t2 - 14] ^ W7[t2 - 16], 1);
    }
    let a4 = H7[0];
    let b7 = H7[1];
    let c5 = H7[2];
    let d4 = H7[3];
    let e = H7[4];
    for (let t2 = 0; t2 < 80; ++t2) {
      const s3 = Math.floor(t2 / 20);
      const T7 = ROTL(a4, 5) + f5(s3, b7, c5, d4) + e + K7[s3] + W7[t2] >>> 0;
      e = d4;
      d4 = c5;
      c5 = ROTL(b7, 30) >>> 0;
      b7 = a4;
      a4 = T7;
    }
    H7[0] = H7[0] + a4 >>> 0;
    H7[1] = H7[1] + b7 >>> 0;
    H7[2] = H7[2] + c5 >>> 0;
    H7[3] = H7[3] + d4 >>> 0;
    H7[4] = H7[4] + e >>> 0;
  }
  return Uint8Array.of(H7[0] >> 24, H7[0] >> 16, H7[0] >> 8, H7[0], H7[1] >> 24, H7[1] >> 16, H7[1] >> 8, H7[1], H7[2] >> 24, H7[2] >> 16, H7[2] >> 8, H7[2], H7[3] >> 24, H7[3] >> 16, H7[3] >> 8, H7[3], H7[4] >> 24, H7[4] >> 16, H7[4] >> 8, H7[4]);
}
var sha1_default = sha1;

// node_modules/uuid/dist/esm-browser/v5.js
function v52(value, namespace, buf, offset) {
  return v35(80, sha1_default, value, namespace, buf, offset);
}
v52.DNS = DNS;
v52.URL = URL2;
var v5_default = v52;

// node_modules/@audiotool/nexus/dist/get-schema-location-details-CI3Fi5PK.js
var g6 = {
  audioDevice: {
    type: "entity",
    targetTypes: ["AudioTrackPlayer"],
    typeKey: "audioDevice"
  },
  "audioDevice:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "audioDevice:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "audioDevice:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "audioDevice:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079399824142456,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "audioDevice:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "audioDevice:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "audioDevice:8": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  audioMerger: {
    type: "entity",
    targetTypes: [],
    typeKey: "audioMerger"
  },
  "audioMerger:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "audioMerger:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "audioMerger:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "audioMerger:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "blendModeIndex"
  },
  "audioMerger:6": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInputA"
  },
  "audioMerger:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInputB"
  },
  "audioMerger:8": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInputC"
  },
  "audioMerger:9": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "audioMerger:10": {
    type: "object",
    targetTypes: [],
    fieldName: "mergeCoords"
  },
  "audioMerger:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6666666865348816,
      range: { min: 0, max: 1 }
    },
    fieldName: "x"
  },
  "audioMerger:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -0.5, max: 0.5 }
    },
    fieldName: "y"
  },
  audioSplitter: {
    type: "entity",
    targetTypes: [],
    typeKey: "audioSplitter"
  },
  "audioSplitter:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "audioSplitter:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "audioSplitter:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "audioSplitter:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "blendModeIndex"
  },
  "audioSplitter:6": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "audioSplitter:7": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutputA"
  },
  "audioSplitter:8": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutputB"
  },
  "audioSplitter:9": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutputC"
  },
  "audioSplitter:10": {
    type: "object",
    targetTypes: [],
    fieldName: "splitCoords"
  },
  "audioSplitter:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6666666865348816,
      range: { min: 0, max: 1 }
    },
    fieldName: "x"
  },
  "audioSplitter:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -0.5, max: 0.5 }
    },
    fieldName: "y"
  },
  autoFilter: {
    type: "entity",
    targetTypes: [],
    typeKey: "autoFilter"
  },
  "autoFilter:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "autoFilter:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "autoFilter:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "autoFilter:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "thresholdGain"
  },
  "autoFilter:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 62.5,
      range: { min: 1, max: 2e3 }
    },
    fieldName: "attackMs"
  },
  "autoFilter:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 62.5,
      range: { min: 1, max: 2e3 }
    },
    fieldName: "sustainMs"
  },
  "autoFilter:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 62.5,
      range: { min: 1, max: 2e3 }
    },
    fieldName: "releaseMs"
  },
  "autoFilter:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 0, max: 4 }
    },
    fieldName: "filterModeIndex"
  },
  "autoFilter:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 300,
      range: { min: 18, max: 1e4 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "autoFilter:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "filterModulationDepth"
  },
  "autoFilter:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1.4142135381698608,
      range: { min: 0.009999999776482582, max: 1.4142135381698608 }
    },
    fieldName: "filterResonance"
  },
  "autoFilter:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2.818382978439331 }
    },
    fieldName: "gain"
  },
  "autoFilter:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "autoFilter:15": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "autoFilter:16": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "sideChainInput"
  },
  "autoFilter:17": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "autoFilter:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  bandSplitter: {
    type: "entity",
    targetTypes: [],
    typeKey: "bandSplitter"
  },
  "bandSplitter:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "bandSplitter:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "bandSplitter:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "bandSplitter:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 360,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "filterLowHz"
  },
  "bandSplitter:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3600,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "filterHighHz"
  },
  "bandSplitter:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "highGain"
  },
  "bandSplitter:8": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "highAudioOutput"
  },
  "bandSplitter:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "midGain"
  },
  "bandSplitter:10": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "midAudioOutput"
  },
  "bandSplitter:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "lowGain"
  },
  "bandSplitter:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "lowAudioOutput"
  },
  "bandSplitter:13": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  bassline: {
    type: "entity",
    targetTypes: ["PatternTrackPlayer", "NoteTrackPlayer"],
    typeKey: "bassline"
  },
  "bassline:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "bassline:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "bassline:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "bassline:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079399824142456,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "bassline:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "tuneSemitones"
  },
  "bassline:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 220,
      range: { min: 220, max: 12e3 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "bassline:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "filterResonance"
  },
  "bassline:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.10000000149011612,
      range: { min: 0, max: 1 }
    },
    fieldName: "filterEnvelopeModulationDepth"
  },
  "bassline:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "filterDecay"
  },
  "bassline:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "accent"
  },
  "bassline:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "waveformIndex"
  },
  "bassline:13": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 27 }
    },
    fieldName: "patternIndex"
  },
  "bassline:14": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 28
  },
  "bassline:14:[]": {
    type: "object",
    targetTypes: ["BasslinePatternSlot"],
    fieldName: "[]"
  },
  "bassline:15": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "MicroTuning",
      required: false
    },
    fieldName: "microTuning"
  },
  "bassline:16": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "bassline:17": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "bassline:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  basslinePattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "basslinePattern"
  },
  "basslinePattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "BasslinePatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "basslinePattern:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "basslinePattern:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 16,
      range: { min: 1, max: 99 }
    },
    fieldName: "length"
  },
  "basslinePattern:5": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 99
  },
  "basslinePattern:5:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "basslinePattern:5:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 36,
      range: { min: 36, max: 48 }
    },
    fieldName: "key"
  },
  "basslinePattern:5:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "transposeOctaves"
  },
  "basslinePattern:5:[]:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "basslinePattern:5:[]:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doesSlide"
  },
  "basslinePattern:5:[]:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isAccented"
  },
  beatbox8: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer", "PatternTrackPlayer"],
    typeKey: "beatbox8"
  },
  "beatbox8:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "beatbox8:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "beatbox8:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "beatbox8:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079457640647888,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "accentAmount"
  },
  "beatbox8:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "beatbox8:8": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 28
  },
  "beatbox8:8:[]": {
    type: "object",
    targetTypes: ["Beatbox8PatternSlot"],
    fieldName: "[]"
  },
  "beatbox8:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: 0, max: 27 }
    },
    fieldName: "patternIndex"
  },
  "beatbox8:10": {
    type: "object",
    targetTypes: [],
    fieldName: "bassdrum"
  },
  "beatbox8:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6000000238418579,
      range: { min: 0, max: 1 }
    },
    fieldName: "tone"
  },
  "beatbox8:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.2750000059604645,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox8:10:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:11": {
    type: "object",
    targetTypes: [],
    fieldName: "snaredrum"
  },
  "beatbox8:11:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:11:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "tone"
  },
  "beatbox8:11:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "snappy"
  },
  "beatbox8:11:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:12": {
    type: "object",
    targetTypes: [],
    fieldName: "tomCongaLow"
  },
  "beatbox8:12:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:12:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tuning"
  },
  "beatbox8:12:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "instrumentTypeIndex"
  },
  "beatbox8:12:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:13": {
    type: "object",
    targetTypes: [],
    fieldName: "tomCongaMid"
  },
  "beatbox8:13:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:13:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tuning"
  },
  "beatbox8:13:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "instrumentTypeIndex"
  },
  "beatbox8:13:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:14": {
    type: "object",
    targetTypes: [],
    fieldName: "tomCongaHigh"
  },
  "beatbox8:14:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:14:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6000000238418579,
      range: { min: 0, max: 1 }
    },
    fieldName: "tuning"
  },
  "beatbox8:14:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "instrumentTypeIndex"
  },
  "beatbox8:14:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:15": {
    type: "object",
    targetTypes: [],
    fieldName: "rimClaves"
  },
  "beatbox8:15:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:15:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "instrumentTypeIndex"
  },
  "beatbox8:15:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:16": {
    type: "object",
    targetTypes: [],
    fieldName: "clapMaracas"
  },
  "beatbox8:16:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:16:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "instrumentTypeIndex"
  },
  "beatbox8:16:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:17": {
    type: "object",
    targetTypes: [],
    fieldName: "cowbell"
  },
  "beatbox8:17:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:17:2": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:18": {
    type: "object",
    targetTypes: [],
    fieldName: "cymbal"
  },
  "beatbox8:18:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:18:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tone"
  },
  "beatbox8:18:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox8:18:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:19": {
    type: "object",
    targetTypes: [],
    fieldName: "openHihat"
  },
  "beatbox8:19:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:19:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.8220000267028809,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox8:19:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:20": {
    type: "object",
    targetTypes: [],
    fieldName: "closedHihat"
  },
  "beatbox8:20:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox8:20:2": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:21": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox8:22": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  beatbox8Pattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "beatbox8Pattern"
  },
  "beatbox8Pattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "Beatbox8PatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "beatbox8Pattern:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "beatbox8Pattern:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 16,
      range: { min: 1, max: 64 }
    },
    fieldName: "length"
  },
  "beatbox8Pattern:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 4 }
    },
    fieldName: "stepScaleIndex"
  },
  "beatbox8Pattern:6": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 64
  },
  "beatbox8Pattern:6:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "beatbox8Pattern:6:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "bassdrumIsActive"
  },
  "beatbox8Pattern:6:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "snaredrumIsActive"
  },
  "beatbox8Pattern:6:[]:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "tomCongaLowIsActive"
  },
  "beatbox8Pattern:6:[]:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "tomCongaMidIsActive"
  },
  "beatbox8Pattern:6:[]:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "tomCongaHighIsActive"
  },
  "beatbox8Pattern:6:[]:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "rimClavesIsActive"
  },
  "beatbox8Pattern:6:[]:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "clapMaracasIsActive"
  },
  "beatbox8Pattern:6:[]:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "cowbellIsActive"
  },
  "beatbox8Pattern:6:[]:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "cymbalIsActive"
  },
  "beatbox8Pattern:6:[]:10": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "openHihatIsActive"
  },
  "beatbox8Pattern:6:[]:11": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "closedHihatIsActive"
  },
  "beatbox8Pattern:6:[]:12": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isAccented"
  },
  beatbox9: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer", "PatternTrackPlayer"],
    typeKey: "beatbox9"
  },
  "beatbox9:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "beatbox9:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "beatbox9:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "beatbox9:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079457640647888,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "accentAmount"
  },
  "beatbox9:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "beatbox9:8": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 28
  },
  "beatbox9:8:[]": {
    type: "object",
    targetTypes: ["Beatbox9PatternSlot"],
    fieldName: "[]"
  },
  "beatbox9:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: 0, max: 27 }
    },
    fieldName: "patternIndex"
  },
  "beatbox9:10": {
    type: "object",
    targetTypes: [],
    fieldName: "bassdrum"
  },
  "beatbox9:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6000000238418579,
      range: { min: 0, max: 1 }
    },
    fieldName: "tone"
  },
  "beatbox9:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "attack"
  },
  "beatbox9:10:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.3149999976158142,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox9:10:5": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:11": {
    type: "object",
    targetTypes: [],
    fieldName: "snaredrum"
  },
  "beatbox9:11:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:11:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.699999988079071,
      range: { min: 0, max: 1 }
    },
    fieldName: "tune"
  },
  "beatbox9:11:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.1837099939584732,
      range: { min: 0, max: 1 }
    },
    fieldName: "tone"
  },
  "beatbox9:11:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "snappy"
  },
  "beatbox9:11:5": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:12": {
    type: "object",
    targetTypes: [],
    fieldName: "tomLow"
  },
  "beatbox9:12:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:12:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tune"
  },
  "beatbox9:12:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6710000038146973,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox9:12:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:13": {
    type: "object",
    targetTypes: [],
    fieldName: "tomMid"
  },
  "beatbox9:13:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:13:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tune"
  },
  "beatbox9:13:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6710000038146973,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox9:13:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:14": {
    type: "object",
    targetTypes: [],
    fieldName: "tomHigh"
  },
  "beatbox9:14:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:14:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tune"
  },
  "beatbox9:14:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6710000038146973,
      range: { min: 0, max: 1 }
    },
    fieldName: "decay"
  },
  "beatbox9:14:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:15": {
    type: "object",
    targetTypes: [],
    fieldName: "rim"
  },
  "beatbox9:15:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:15:2": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:16": {
    type: "object",
    targetTypes: [],
    fieldName: "clap"
  },
  "beatbox9:16:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:16:2": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:17": {
    type: "object",
    targetTypes: [],
    fieldName: "hihat"
  },
  "beatbox9:17:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:17:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "closedDecay"
  },
  "beatbox9:17:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "openDecay"
  },
  "beatbox9:17:4": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:18": {
    type: "object",
    targetTypes: [],
    fieldName: "crash"
  },
  "beatbox9:18:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:18:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "tune"
  },
  "beatbox9:18:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:19": {
    type: "object",
    targetTypes: [],
    fieldName: "ride"
  },
  "beatbox9:19:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "beatbox9:19:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "tune"
  },
  "beatbox9:19:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:20": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "beatbox9:21": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  beatbox9Pattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "beatbox9Pattern"
  },
  "beatbox9Pattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "Beatbox9PatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "beatbox9Pattern:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "beatbox9Pattern:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 16,
      range: { min: 1, max: 64 }
    },
    fieldName: "length"
  },
  "beatbox9Pattern:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 4 }
    },
    fieldName: "stepScaleIndex"
  },
  "beatbox9Pattern:6": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 64
  },
  "beatbox9Pattern:6:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "beatbox9Pattern:6:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "bassdrumStepIndex"
  },
  "beatbox9Pattern:6:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "snaredrumStepIndex"
  },
  "beatbox9Pattern:6:[]:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "tomLowStepIndex"
  },
  "beatbox9Pattern:6:[]:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "tomMidStepIndex"
  },
  "beatbox9Pattern:6:[]:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "tomHighStepIndex"
  },
  "beatbox9Pattern:6:[]:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "rimStepIndex"
  },
  "beatbox9Pattern:6:[]:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "clapStepIndex"
  },
  "beatbox9Pattern:6:[]:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "closedHihatStepIndex"
  },
  "beatbox9Pattern:6:[]:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "openHihatStepIndex"
  },
  "beatbox9Pattern:6:[]:10": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "crashStepIndex"
  },
  "beatbox9Pattern:6:[]:11": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 2 }
    },
    fieldName: "rideStepIndex"
  },
  centroid: {
    type: "entity",
    targetTypes: ["Centroid"],
    typeKey: "centroid"
  },
  "centroid:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "centroid:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "centroid:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "centroid:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "postGain"
  },
  "centroid:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "centroid:7": {
    type: "object",
    targetTypes: [],
    fieldName: "aux1"
  },
  "centroid:7:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "sendGain"
  },
  "centroid:7:2": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "centroid:7:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "centroid:8": {
    type: "object",
    targetTypes: [],
    fieldName: "aux2"
  },
  "centroid:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "sendGain"
  },
  "centroid:8:2": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "centroid:8:3": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "centroid:9": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  centroidChannel: {
    type: "entity",
    targetTypes: [],
    typeKey: "centroidChannel"
  },
  "centroidChannel:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "Centroid",
      required: true
    },
    fieldName: "centroid"
  },
  "centroidChannel:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongChannels"
  },
  "centroidChannel:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "centroidChannel:5": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "centroidChannel:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "preGain"
  },
  "centroidChannel:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "eqHighGainDb"
  },
  "centroidChannel:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1e3,
      range: { min: 240, max: 4200 }
    },
    fieldName: "eqMidFrequency"
  },
  "centroidChannel:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "eqMidGainDb"
  },
  "centroidChannel:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "eqLowGainDb"
  },
  "centroidChannel:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "aux1SendGain"
  },
  "centroidChannel:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "aux2SendGain"
  },
  "centroidChannel:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "useAuxPreMode"
  },
  "centroidChannel:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "centroidChannel:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "postGain"
  },
  "centroidChannel:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "centroidChannel:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  config: {
    type: "entity",
    targetTypes: [],
    typeKey: "config"
  },
  "config:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 125,
      range: { min: 30, max: 1e3 }
    },
    fieldName: "tempoBpm"
  },
  "config:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 440,
      range: { min: 400, max: 800 }
    },
    fieldName: "baseFrequencyHz"
  },
  "config:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 4,
      range: { min: 1, max: 32 }
    },
    fieldName: "signatureNumerator"
  },
  "config:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 4,
      range: { min: 1, max: 32 }
    },
    fieldName: "signatureDenominator"
  },
  "config:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1966080,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "durationTicks"
  },
  "config:7": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: true
    },
    fieldName: "defaultGroove"
  },
  crossfader: {
    type: "entity",
    targetTypes: [],
    typeKey: "crossfader"
  },
  "crossfader:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "crossfader:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "crossfader:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "crossfader:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "postGain"
  },
  "crossfader:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "crossfade"
  },
  "crossfader:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "crossfader:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "blendModeIndex"
  },
  "crossfader:9": {
    type: "object",
    targetTypes: [],
    fieldName: "channelA"
  },
  "crossfader:9:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.4125380516052246 }
    },
    fieldName: "preGain"
  },
  "crossfader:9:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 260,
      range: { min: 20, max: 260 }
    },
    fieldName: "eqLowFrequencyHz"
  },
  "crossfader:9:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 12 }
    },
    fieldName: "eqLowGainDb"
  },
  "crossfader:9:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "lowKillEnabled"
  },
  "crossfader:9:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1500,
      range: { min: 260, max: 4200 }
    },
    fieldName: "eqMidFrequencyHz"
  },
  "crossfader:9:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 12 }
    },
    fieldName: "eqMidGainDb"
  },
  "crossfader:9:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "midKillEnabled"
  },
  "crossfader:9:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4200,
      range: { min: 4200, max: 14e3 }
    },
    fieldName: "eqHighFrequencyHz"
  },
  "crossfader:9:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 12 }
    },
    fieldName: "eqHighGainDb"
  },
  "crossfader:9:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "highKillEnabled"
  },
  "crossfader:9:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "crossfader:10": {
    type: "object",
    targetTypes: [],
    fieldName: "channelB"
  },
  "crossfader:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.4125380516052246 }
    },
    fieldName: "preGain"
  },
  "crossfader:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 260,
      range: { min: 20, max: 260 }
    },
    fieldName: "eqLowFrequencyHz"
  },
  "crossfader:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 12 }
    },
    fieldName: "eqLowGainDb"
  },
  "crossfader:10:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "lowKillEnabled"
  },
  "crossfader:10:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1500,
      range: { min: 260, max: 4200 }
    },
    fieldName: "eqMidFrequencyHz"
  },
  "crossfader:10:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 12 }
    },
    fieldName: "eqMidGainDb"
  },
  "crossfader:10:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "midKillEnabled"
  },
  "crossfader:10:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4200,
      range: { min: 4200, max: 14e3 }
    },
    fieldName: "eqHighFrequencyHz"
  },
  "crossfader:10:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 12 }
    },
    fieldName: "eqHighGainDb"
  },
  "crossfader:10:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "highKillEnabled"
  },
  "crossfader:10:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "crossfader:11": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  curve: {
    type: "entity",
    targetTypes: [],
    typeKey: "curve"
  },
  "curve:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "curve:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "curve:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "curve:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "gainDb"
  },
  "curve:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "curve:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "spectrumModeIndex"
  },
  "curve:8": {
    type: "object",
    targetTypes: [],
    fieldName: "lowPass"
  },
  "curve:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 40,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "curve:8:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "filterSlopeIndex"
  },
  "curve:8:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7099999785423279,
      range: { min: 0.009999999776482582, max: 10 }
    },
    fieldName: "q"
  },
  "curve:8:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isEnabled"
  },
  "curve:9": {
    type: "object",
    targetTypes: [],
    fieldName: "highPass"
  },
  "curve:9:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 40,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "curve:9:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "filterSlopeIndex"
  },
  "curve:9:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7099999785423279,
      range: { min: 0.009999999776482582, max: 10 }
    },
    fieldName: "q"
  },
  "curve:9:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isEnabled"
  },
  "curve:10": {
    type: "object",
    targetTypes: [],
    fieldName: "lowShelf"
  },
  "curve:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "centerFrequencyHz"
  },
  "curve:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -40, max: 40 }
    },
    fieldName: "gainDb"
  },
  "curve:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "curve:11": {
    type: "object",
    targetTypes: [],
    fieldName: "highShelf"
  },
  "curve:11:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "centerFrequencyHz"
  },
  "curve:11:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -40, max: 40 }
    },
    fieldName: "gainDb"
  },
  "curve:11:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "curve:12": {
    type: "object",
    targetTypes: [],
    fieldName: "peak1"
  },
  "curve:12:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4e3,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "centerFrequencyHz"
  },
  "curve:12:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -40, max: 40 }
    },
    fieldName: "gainDb"
  },
  "curve:12:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0.009999999776482582, max: 10 }
    },
    fieldName: "q"
  },
  "curve:12:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "curve:13": {
    type: "object",
    targetTypes: [],
    fieldName: "peak2"
  },
  "curve:13:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4e3,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "centerFrequencyHz"
  },
  "curve:13:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -40, max: 40 }
    },
    fieldName: "gainDb"
  },
  "curve:13:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0.009999999776482582, max: 10 }
    },
    fieldName: "q"
  },
  "curve:13:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "curve:14": {
    type: "object",
    targetTypes: [],
    fieldName: "peak3"
  },
  "curve:14:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4e3,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "centerFrequencyHz"
  },
  "curve:14:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -40, max: 40 }
    },
    fieldName: "gainDb"
  },
  "curve:14:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0.009999999776482582, max: 10 }
    },
    fieldName: "q"
  },
  "curve:14:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "curve:15": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "curve:16": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  desktopAudioCable: {
    type: "entity",
    targetTypes: ["Listenable"],
    typeKey: "desktopAudioCable"
  },
  "desktopAudioCable:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "AudioOutput",
      required: true
    },
    fieldName: "fromSocket"
  },
  "desktopAudioCable:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "AudioInput",
      required: true
    },
    fieldName: "toSocket"
  },
  "desktopAudioCable:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  desktopNoteCable: {
    type: "entity",
    targetTypes: [],
    typeKey: "desktopNoteCable"
  },
  "desktopNoteCable:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "NotesOutput",
      required: true
    },
    fieldName: "fromSocket"
  },
  "desktopNoteCable:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "NotesInput",
      required: true
    },
    fieldName: "toSocket"
  },
  "desktopNoteCable:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  exciter: {
    type: "entity",
    targetTypes: [],
    typeKey: "exciter"
  },
  "exciter:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "exciter:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "exciter:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "exciter:5": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "exciter:6": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "exciter:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3500,
      range: { min: 20, max: 13e3 }
    },
    fieldName: "toneFrequencyHz"
  },
  "exciter:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "powerFactor"
  },
  "exciter:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "exciter:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  gakki: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer"],
    typeKey: "gakki"
  },
  "gakki:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "gakki:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "gakki:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "gakki:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 0
    },
    fieldName: "soundfontId"
  },
  "gakki:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6000000238418579,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "gakki:7": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "gakki:8": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  graphicalEQ: {
    type: "entity",
    targetTypes: [],
    typeKey: "graphicalEQ"
  },
  "graphicalEQ:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "graphicalEQ:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "graphicalEQ:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "graphicalEQ:5": {
    type: "object",
    targetTypes: [],
    fieldName: "filter1"
  },
  "graphicalEQ:5:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "gainDb"
  },
  "graphicalEQ:5:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3800,
      range: { min: 32, max: 17e3 }
    },
    fieldName: "frequencyHz"
  },
  "graphicalEQ:5:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.07000000029802322,
      range: { min: 0, max: 1 }
    },
    fieldName: "q"
  },
  "graphicalEQ:5:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "stereoSeparation"
  },
  "graphicalEQ:6": {
    type: "object",
    targetTypes: [],
    fieldName: "filter2"
  },
  "graphicalEQ:6:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "gainDb"
  },
  "graphicalEQ:6:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3800,
      range: { min: 32, max: 17e3 }
    },
    fieldName: "frequencyHz"
  },
  "graphicalEQ:6:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.07000000029802322,
      range: { min: 0, max: 1 }
    },
    fieldName: "q"
  },
  "graphicalEQ:6:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "stereoSeparation"
  },
  "graphicalEQ:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "graphicalEQ:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "gainDb"
  },
  "graphicalEQ:9": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "graphicalEQ:10": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "graphicalEQ:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  gravity: {
    type: "entity",
    targetTypes: [],
    typeKey: "gravity"
  },
  "gravity:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "gravity:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "gravity:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "gravity:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -10,
      range: { min: -40, max: 0 }
    },
    fieldName: "thresholdDb"
  },
  "gravity:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4,
      range: { min: 1, max: 50 }
    },
    fieldName: "ratio"
  },
  "gravity:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3,
      range: { min: 0, max: 24 }
    },
    fieldName: "kneeDbRange"
  },
  "gravity:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "makeupGainDb"
  },
  "gravity:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 0, max: 1e3 }
    },
    fieldName: "attackMs"
  },
  "gravity:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "releaseIsSynced"
  },
  "gravity:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "gravity:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 0, max: 30 }
    },
    fieldName: "rmsWindowMs"
  },
  "gravity:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "gravity:14": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "gravity:15": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "gravity:16": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "sideChainInput"
  },
  groove: {
    type: "entity",
    targetTypes: ["Groove"],
    typeKey: "groove"
  },
  "groove:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "functionIndex"
  },
  "groove:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1920,
      range: { min: 960, max: 15360 }
    },
    fieldName: "durationTicks"
  },
  "groove:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "impact"
  },
  "groove:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  heisenberg: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer"],
    typeKey: "heisenberg"
  },
  "heisenberg:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "heisenberg:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "heisenberg:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "heisenberg:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "MicroTuning",
      required: false
    },
    fieldName: "microTuning"
  },
  "heisenberg:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "tuneSemitones"
  },
  "heisenberg:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079460024833679,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "heisenberg:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 3 }
    },
    fieldName: "playModeIndex"
  },
  "heisenberg:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 5e3 }
    },
    fieldName: "glideMs"
  },
  "heisenberg:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocityFactor"
  },
  "heisenberg:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "unisonoCount"
  },
  "heisenberg:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.0010000000474974513,
      range: { min: 0, max: 1 }
    },
    fieldName: "unisonoDetuneSemitones"
  },
  "heisenberg:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "unisonoStereoSpreadFactor"
  },
  "heisenberg:14": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "operatorDetuneModeIndex"
  },
  "heisenberg:15": {
    type: "object",
    targetTypes: [],
    fieldName: "operatorA"
  },
  "heisenberg:15:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "heisenberg:15:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "heisenberg:15:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 64 }
    },
    fieldName: "detuneFactor"
  },
  "heisenberg:15:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -9999.990234375, max: 9999.990234375 }
    },
    fieldName: "frequencyOffsetHz"
  },
  "heisenberg:15:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 49 }
    },
    fieldName: "waveformIndex"
  },
  "heisenberg:15:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "usePitchEnvelope"
  },
  "heisenberg:15:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorA"
  },
  "heisenberg:15:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorB"
  },
  "heisenberg:15:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorC"
  },
  "heisenberg:15:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorD"
  },
  "heisenberg:15:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocityAmplitudeModulationDepth"
  },
  "heisenberg:15:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelopeMainAmplitudeModulationDepth"
  },
  "heisenberg:15:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope2AmplitudeModulationDepth"
  },
  "heisenberg:15:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope3AmplitudeModulationDepth"
  },
  "heisenberg:15:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo1AmplitudeModulationDepth"
  },
  "heisenberg:15:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo2AmplitudeModulationDepth"
  },
  "heisenberg:16": {
    type: "object",
    targetTypes: [],
    fieldName: "operatorB"
  },
  "heisenberg:16:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "heisenberg:16:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "heisenberg:16:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 64 }
    },
    fieldName: "detuneFactor"
  },
  "heisenberg:16:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -9999.990234375, max: 9999.990234375 }
    },
    fieldName: "frequencyOffsetHz"
  },
  "heisenberg:16:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 49 }
    },
    fieldName: "waveformIndex"
  },
  "heisenberg:16:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "usePitchEnvelope"
  },
  "heisenberg:16:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorA"
  },
  "heisenberg:16:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorB"
  },
  "heisenberg:16:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorC"
  },
  "heisenberg:16:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorD"
  },
  "heisenberg:16:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocityAmplitudeModulationDepth"
  },
  "heisenberg:16:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelopeMainAmplitudeModulationDepth"
  },
  "heisenberg:16:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope2AmplitudeModulationDepth"
  },
  "heisenberg:16:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope3AmplitudeModulationDepth"
  },
  "heisenberg:16:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo1AmplitudeModulationDepth"
  },
  "heisenberg:16:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo2AmplitudeModulationDepth"
  },
  "heisenberg:17": {
    type: "object",
    targetTypes: [],
    fieldName: "operatorC"
  },
  "heisenberg:17:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "heisenberg:17:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "heisenberg:17:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 64 }
    },
    fieldName: "detuneFactor"
  },
  "heisenberg:17:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -9999.990234375, max: 9999.990234375 }
    },
    fieldName: "frequencyOffsetHz"
  },
  "heisenberg:17:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 49 }
    },
    fieldName: "waveformIndex"
  },
  "heisenberg:17:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "usePitchEnvelope"
  },
  "heisenberg:17:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorA"
  },
  "heisenberg:17:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorB"
  },
  "heisenberg:17:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorC"
  },
  "heisenberg:17:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorD"
  },
  "heisenberg:17:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocityAmplitudeModulationDepth"
  },
  "heisenberg:17:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelopeMainAmplitudeModulationDepth"
  },
  "heisenberg:17:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope2AmplitudeModulationDepth"
  },
  "heisenberg:17:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope3AmplitudeModulationDepth"
  },
  "heisenberg:17:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo1AmplitudeModulationDepth"
  },
  "heisenberg:17:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo2AmplitudeModulationDepth"
  },
  "heisenberg:18": {
    type: "object",
    targetTypes: [],
    fieldName: "operatorD"
  },
  "heisenberg:18:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "heisenberg:18:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "heisenberg:18:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 64 }
    },
    fieldName: "detuneFactor"
  },
  "heisenberg:18:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -9999.990234375, max: 9999.990234375 }
    },
    fieldName: "frequencyOffsetHz"
  },
  "heisenberg:18:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 49 }
    },
    fieldName: "waveformIndex"
  },
  "heisenberg:18:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "usePitchEnvelope"
  },
  "heisenberg:18:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorA"
  },
  "heisenberg:18:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorB"
  },
  "heisenberg:18:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorC"
  },
  "heisenberg:18:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationFactorD"
  },
  "heisenberg:18:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocityAmplitudeModulationDepth"
  },
  "heisenberg:18:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelopeMainAmplitudeModulationDepth"
  },
  "heisenberg:18:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope2AmplitudeModulationDepth"
  },
  "heisenberg:18:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelope3AmplitudeModulationDepth"
  },
  "heisenberg:18:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo1AmplitudeModulationDepth"
  },
  "heisenberg:18:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfo2AmplitudeModulationDepth"
  },
  "heisenberg:19": {
    type: "object",
    targetTypes: [],
    fieldName: "envelopeMain"
  },
  "heisenberg:19:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "heisenberg:19:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "attackTimeNormalized"
  },
  "heisenberg:19:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackSlopeFactor"
  },
  "heisenberg:19:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTimeNormalized"
  },
  "heisenberg:19:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "decaySlopeFactor"
  },
  "heisenberg:19:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "heisenberg:19:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "heisenberg:19:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "heisenberg:19:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseSlopeFactor"
  },
  "heisenberg:20": {
    type: "object",
    targetTypes: [],
    fieldName: "envelope2"
  },
  "heisenberg:20:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "heisenberg:20:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "attackTimeNormalized"
  },
  "heisenberg:20:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackSlopeFactor"
  },
  "heisenberg:20:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTimeNormalized"
  },
  "heisenberg:20:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "decaySlopeFactor"
  },
  "heisenberg:20:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "heisenberg:20:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "heisenberg:20:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "heisenberg:20:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseSlopeFactor"
  },
  "heisenberg:21": {
    type: "object",
    targetTypes: [],
    fieldName: "envelope3"
  },
  "heisenberg:21:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "heisenberg:21:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "attackTimeNormalized"
  },
  "heisenberg:21:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackSlopeFactor"
  },
  "heisenberg:21:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTimeNormalized"
  },
  "heisenberg:21:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "decaySlopeFactor"
  },
  "heisenberg:21:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "heisenberg:21:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "heisenberg:21:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "heisenberg:21:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseSlopeFactor"
  },
  "heisenberg:22": {
    type: "object",
    targetTypes: [],
    fieldName: "pitchEnvelope"
  },
  "heisenberg:22:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "heisenberg:22:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "loopDecayIndex"
  },
  "heisenberg:22:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackRangeFactor"
  },
  "heisenberg:22:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "attackTimeNormalized"
  },
  "heisenberg:22:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackSlopeFactor"
  },
  "heisenberg:22:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "decayRangeFactor"
  },
  "heisenberg:22:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTimeNormalized"
  },
  "heisenberg:22:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "decaySlopeFactor"
  },
  "heisenberg:22:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "sustainRangeFactor"
  },
  "heisenberg:22:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "heisenberg:22:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseSlopeFactor"
  },
  "heisenberg:22:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseRangeFactor"
  },
  "heisenberg:22:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 12,
      range: { min: 1, max: 36 }
    },
    fieldName: "semitoneRange"
  },
  "heisenberg:23": {
    type: "object",
    targetTypes: [],
    fieldName: "lfo1"
  },
  "heisenberg:23:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isSynced"
  },
  "heisenberg:23:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doesRestart"
  },
  "heisenberg:23:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "rateNormalized"
  },
  "heisenberg:23:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "offsetFactor"
  },
  "heisenberg:23:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "delayTimeNormalized"
  },
  "heisenberg:23:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "blendTimeNormalized"
  },
  "heisenberg:23:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 49 }
    },
    fieldName: "waveformIndex"
  },
  "heisenberg:24": {
    type: "object",
    targetTypes: [],
    fieldName: "lfo2"
  },
  "heisenberg:24:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isSynced"
  },
  "heisenberg:24:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doesRestart"
  },
  "heisenberg:24:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "rateNormalized"
  },
  "heisenberg:24:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "offsetFactor"
  },
  "heisenberg:24:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "delayTimeNormalized"
  },
  "heisenberg:24:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "blendTimeNormalized"
  },
  "heisenberg:24:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 49 }
    },
    fieldName: "waveformIndex"
  },
  "heisenberg:25": {
    type: "object",
    targetTypes: [],
    fieldName: "filter"
  },
  "heisenberg:25:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 11025,
      range: { min: 33, max: 22050 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "heisenberg:25:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7071067690849304,
      range: { min: 0.7071067690849304, max: 60 }
    },
    fieldName: "resonance"
  },
  "heisenberg:25:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -1,
      range: { min: -1, max: 1 }
    },
    fieldName: "filterType"
  },
  "heisenberg:25:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "orderIndex"
  },
  "heisenberg:25:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "velocityCutoffModulationDepth"
  },
  "heisenberg:25:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeMainCutoffModulationDepth"
  },
  "heisenberg:25:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelope2CutoffModulationDepth"
  },
  "heisenberg:25:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelope3CutoffModulationDepth"
  },
  "heisenberg:25:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "lfo1CutoffModulationDepth"
  },
  "heisenberg:25:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "lfo2CutoffModulationDepth"
  },
  "heisenberg:25:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "keyboardTrackingAmount"
  },
  "heisenberg:26": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "heisenberg:27": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "heisenberg:28": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  helmholtz: {
    type: "entity",
    targetTypes: [],
    typeKey: "helmholtz"
  },
  "helmholtz:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "helmholtz:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "helmholtz:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "helmholtz:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "MicroTuning",
      required: false
    },
    fieldName: "microTuning"
  },
  "helmholtz:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079399824142456,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "helmholtz:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.75,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTime"
  },
  "helmholtz:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "helmholtz:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "helmholtz:10": {
    type: "array",
    targetTypes: [],
    fieldName: "filters",
    length: 5
  },
  "helmholtz:10:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "helmholtz:10:[]:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isActive"
  },
  "helmholtz:10:[]:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "helmholtz:10:[]:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "helmholtz:10:[]:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 60,
      range: { min: 0, max: 127 }
    },
    fieldName: "frequencyNote"
  },
  "helmholtz:10:[]:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -7, max: 7 }
    },
    fieldName: "frequencyTuneSemitones"
  },
  "helmholtz:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "helmholtz:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  kobolt: {
    type: "entity",
    targetTypes: [],
    typeKey: "kobolt"
  },
  "kobolt:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "kobolt:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "kobolt:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "kobolt:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "postGain"
  },
  "kobolt:6": {
    type: "array",
    targetTypes: [],
    fieldName: "channels",
    length: 16
  },
  "kobolt:6:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "kobolt:6:[]:1": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "kobolt:6:[]:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "kobolt:6:[]:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "kobolt:7": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  machiniste: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer", "PatternTrackPlayer"],
    typeKey: "machiniste"
  },
  "machiniste:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "machiniste:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "machiniste:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "machiniste:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079399824142456,
      range: { min: 0, max: 1 }
    },
    fieldName: "mainOutputGain"
  },
  "machiniste:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "mainOutput"
  },
  "machiniste:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "globalModulationDepth"
  },
  "machiniste:7": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 32
  },
  "machiniste:7:[]": {
    type: "object",
    targetTypes: ["MachinistePatternSlot"],
    fieldName: "[]"
  },
  "machiniste:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 31 }
    },
    fieldName: "patternIndex"
  },
  "machiniste:9": {
    type: "array",
    targetTypes: [],
    fieldName: "channels",
    length: 9
  },
  "machiniste:9:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "machiniste:9:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Sample",
      required: false
    },
    fieldName: "sample"
  },
  "machiniste:9:[]:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "startTrimFactor"
  },
  "machiniste:9:[]:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "startTrimModulationDepth"
  },
  "machiniste:9:[]:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "endTrimFactor"
  },
  "machiniste:9:[]:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "endTrimModulationDepth"
  },
  "machiniste:9:[]:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "pitchSemitones"
  },
  "machiniste:9:[]:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "pitchModulationDepth"
  },
  "machiniste:9:[]:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "filterTypeIndex"
  },
  "machiniste:9:[]:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 6e3,
      range: { min: 28, max: 12e3 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "machiniste:9:[]:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "cutoffModulationDepth"
  },
  "machiniste:9:[]:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "resonance"
  },
  "machiniste:9:[]:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "resonanceModulationDepth"
  },
  "machiniste:9:[]:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "envelopePeakRatio"
  },
  "machiniste:9:[]:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeRatioModulationDepth"
  },
  "machiniste:9:[]:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeSlope"
  },
  "machiniste:9:[]:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeSlopeModulationDepth"
  },
  "machiniste:9:[]:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "machiniste:9:[]:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panningModulationDepth"
  },
  "machiniste:9:[]:19": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.10000000149011612,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "machiniste:9:[]:20": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "gainModulationDepth"
  },
  "machiniste:9:[]:21": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "channelOutput"
  },
  "machiniste:11": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "machiniste:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  machinistePattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "machinistePattern"
  },
  "machinistePattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MachinistePatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "machinistePattern:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "machinistePattern:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "stepScaleIndex"
  },
  "machinistePattern:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 16,
      range: { min: 1, max: 128 }
    },
    fieldName: "length"
  },
  "machinistePattern:6": {
    type: "array",
    targetTypes: [],
    fieldName: "channelPatterns",
    length: 9
  },
  "machinistePattern:6:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "machinistePattern:6:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isExclusive"
  },
  "machinistePattern:6:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "machinistePattern:6:[]:3": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 128
  },
  "machinistePattern:6:[]:3:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "machinistePattern:6:[]:3:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isActive"
  },
  "machinistePattern:6:[]:3:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationDepth"
  },
  matrixArpeggiator: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer", "PatternTrackPlayer"],
    typeKey: "matrixArpeggiator"
  },
  "matrixArpeggiator:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "matrixArpeggiator:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "matrixArpeggiator:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "matrixArpeggiator:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "matrixArpeggiator:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "velocity"
  },
  "matrixArpeggiator:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 7,
      range: { min: 1, max: 11 }
    },
    fieldName: "stepLengthIndex"
  },
  "matrixArpeggiator:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 8 }
    },
    fieldName: "repeat"
  },
  "matrixArpeggiator:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2 }
    },
    fieldName: "gateRatio"
  },
  "matrixArpeggiator:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 6 }
    },
    fieldName: "arpeggiationModeIndex"
  },
  "matrixArpeggiator:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1e3,
      range: { min: 0, max: 9999 }
    },
    fieldName: "randomSeed"
  },
  "matrixArpeggiator:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "octaves"
  },
  "matrixArpeggiator:13": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "holdNotes"
  },
  "matrixArpeggiator:14": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: 0, max: 127 }
    },
    fieldName: "holdNotesUntilNote"
  },
  "matrixArpeggiator:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "ignorePatternStepParameters"
  },
  "matrixArpeggiator:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "patternIsSynced"
  },
  "matrixArpeggiator:17": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 4
  },
  "matrixArpeggiator:17:[]": {
    type: "object",
    targetTypes: ["MatrixArpeggiatorPatternSlot"],
    fieldName: "[]"
  },
  "matrixArpeggiator:18": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 3 }
    },
    fieldName: "patternIndex"
  },
  "matrixArpeggiator:19": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "matrixArpeggiator:20": {
    type: "object",
    targetTypes: ["NotesOutput"],
    fieldName: "notesOutput"
  },
  matrixArpeggiatorPattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "matrixArpeggiatorPattern"
  },
  "matrixArpeggiatorPattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MatrixArpeggiatorPatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "matrixArpeggiatorPattern:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "matrixArpeggiatorPattern:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 16,
      range: { min: 1, max: 64 }
    },
    fieldName: "length"
  },
  "matrixArpeggiatorPattern:5": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 64
  },
  "matrixArpeggiatorPattern:5:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "matrixArpeggiatorPattern:5:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "overrideVelocity"
  },
  "matrixArpeggiatorPattern:5:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "stepVelocity"
  },
  "matrixArpeggiatorPattern:5:[]:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "matrixArpeggiatorPattern:5:[]:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isTied"
  },
  "matrixArpeggiatorPattern:5:[]:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isChord"
  },
  microTuningOctave: {
    type: "entity",
    targetTypes: ["MicroTuning"],
    typeKey: "microTuningOctave"
  },
  "microTuningOctave:2": {
    type: "array",
    targetTypes: [],
    fieldName: "semitones",
    length: 12
  },
  "microTuningOctave:2:[]": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "[]"
  },
  minimixer: {
    type: "entity",
    targetTypes: [],
    typeKey: "minimixer"
  },
  "minimixer:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "minimixer:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "minimixer:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "minimixer:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "minimixer:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "auxSendGain"
  },
  "minimixer:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "auxIsPreGain"
  },
  "minimixer:8": {
    type: "object",
    targetTypes: [],
    fieldName: "channel1"
  },
  "minimixer:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "minimixer:8:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "minimixer:8:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "auxSendGain"
  },
  "minimixer:8:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "auxIsPreGain"
  },
  "minimixer:8:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "minimixer:8:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "minimixer:8:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "minimixer:9": {
    type: "object",
    targetTypes: [],
    fieldName: "channel2"
  },
  "minimixer:9:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "minimixer:9:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "minimixer:9:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "auxSendGain"
  },
  "minimixer:9:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "auxIsPreGain"
  },
  "minimixer:9:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "minimixer:9:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "minimixer:9:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "minimixer:10": {
    type: "object",
    targetTypes: [],
    fieldName: "channel3"
  },
  "minimixer:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "minimixer:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "minimixer:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "auxSendGain"
  },
  "minimixer:10:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "auxIsPreGain"
  },
  "minimixer:10:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "minimixer:10:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "minimixer:10:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "minimixer:11": {
    type: "object",
    targetTypes: [],
    fieldName: "channel4"
  },
  "minimixer:11:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "minimixer:11:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "minimixer:11:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "auxSendGain"
  },
  "minimixer:11:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "auxIsPreGain"
  },
  "minimixer:11:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "minimixer:11:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "minimixer:11:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "minimixer:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "mainOutput"
  },
  "minimixer:13": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "auxSendOutput"
  },
  "minimixer:14": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "auxReturnInput"
  },
  mixerAux: {
    type: "entity",
    targetTypes: ["MixerAuxReceive"],
    typeKey: "mixerAux"
  },
  "mixerAux:2": {
    type: "object",
    targetTypes: [],
    fieldName: "displayParameters"
  },
  "mixerAux:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongStrips"
  },
  "mixerAux:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "mixerAux:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "mixerAux:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "preGain"
  },
  "mixerAux:4": {
    type: "object",
    targetTypes: [],
    fieldName: "trimFilter"
  },
  "mixerAux:4:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "highPassCutoffFrequencyHz"
  },
  "mixerAux:4:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "lowPassCutoffFrequencyHz"
  },
  "mixerAux:4:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerAux:5": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "insertOutput"
  },
  "mixerAux:6": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "insertInput"
  },
  "mixerAux:7": {
    type: "object",
    targetTypes: [],
    fieldName: "faderParameters"
  },
  "mixerAux:7:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "mixerAux:7:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.9952620267868042 }
    },
    fieldName: "postGain"
  },
  "mixerAux:7:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "mixerAux:7:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  mixerAuxRoute: {
    type: "entity",
    targetTypes: [],
    typeKey: "mixerAuxRoute"
  },
  "mixerAuxRoute:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "mixerAuxRoute:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MixerAuxSend",
      required: true
    },
    fieldName: "auxSend"
  },
  "mixerAuxRoute:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MixerAuxReceive",
      required: true
    },
    fieldName: "auxReceive"
  },
  mixerChannel: {
    type: "entity",
    targetTypes: ["MixerStripGroupChild"],
    typeKey: "mixerChannel"
  },
  "mixerChannel:2": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "mixerChannel:3": {
    type: "object",
    targetTypes: [],
    fieldName: "displayParameters"
  },
  "mixerChannel:3:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongStrips"
  },
  "mixerChannel:3:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "mixerChannel:3:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "mixerChannel:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.39810699224472046,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "preGain"
  },
  "mixerChannel:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doesPhaseReverse"
  },
  "mixerChannel:6": {
    type: "object",
    targetTypes: [],
    fieldName: "trimFilter"
  },
  "mixerChannel:6:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "highPassCutoffFrequencyHz"
  },
  "mixerChannel:6:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "lowPassCutoffFrequencyHz"
  },
  "mixerChannel:6:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerChannel:7": {
    type: "object",
    targetTypes: [],
    fieldName: "compressor"
  },
  "mixerChannel:7:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 15,
      range: { min: 0.0010000000474974513, max: 200 }
    },
    fieldName: "attackMs"
  },
  "mixerChannel:7:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 100,
      range: { min: 0.0010000000474974513, max: 2e3 }
    },
    fieldName: "releaseMs"
  },
  "mixerChannel:7:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "makeupGainDb"
  },
  "mixerChannel:7:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "detectionModeIndex"
  },
  "mixerChannel:7:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2,
      range: { min: 1, max: 50 }
    },
    fieldName: "ratio"
  },
  "mixerChannel:7:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -10,
      range: { min: -48, max: 0 }
    },
    fieldName: "thresholdDb"
  },
  "mixerChannel:7:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isActive"
  },
  "mixerChannel:7:8": {
    type: "object",
    targetTypes: ["MixerSideChainInput"],
    fieldName: "sideChainInput"
  },
  "mixerChannel:8": {
    type: "object",
    targetTypes: [],
    fieldName: "eq"
  },
  "mixerChannel:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 60,
      range: { min: 35, max: 220 }
    },
    fieldName: "lowShelfFrequencyHz"
  },
  "mixerChannel:8:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "lowShelfGainDb"
  },
  "mixerChannel:8:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 500,
      range: { min: 200, max: 700 }
    },
    fieldName: "lowMidFrequencyHz"
  },
  "mixerChannel:8:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "lowMidGainDb"
  },
  "mixerChannel:8:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4800,
      range: { min: 1600, max: 7200 }
    },
    fieldName: "highMidFrequencyHz"
  },
  "mixerChannel:8:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "highMidGainDb"
  },
  "mixerChannel:8:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 12e3,
      range: { min: 1e4, max: 16e3 }
    },
    fieldName: "highShelfFrequencyHz"
  },
  "mixerChannel:8:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "highShelfGainDb"
  },
  "mixerChannel:8:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerChannel:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "auxSendsAreActive"
  },
  "mixerChannel:10": {
    type: "object",
    targetTypes: ["MixerAuxSend"],
    fieldName: "auxSend"
  },
  "mixerChannel:11": {
    type: "object",
    targetTypes: ["MixerSideChainOutput"],
    fieldName: "sideChainOutput"
  },
  "mixerChannel:12": {
    type: "object",
    targetTypes: [],
    fieldName: "faderParameters"
  },
  "mixerChannel:12:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "mixerChannel:12:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.9952620267868042 }
    },
    fieldName: "postGain"
  },
  "mixerChannel:12:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "mixerChannel:12:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  mixerDelayAux: {
    type: "entity",
    targetTypes: ["MixerAuxReceive"],
    typeKey: "mixerDelayAux"
  },
  "mixerDelayAux:2": {
    type: "object",
    targetTypes: [],
    fieldName: "displayParameters"
  },
  "mixerDelayAux:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongStrips"
  },
  "mixerDelayAux:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "mixerDelayAux:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "mixerDelayAux:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "preGain"
  },
  "mixerDelayAux:4": {
    type: "object",
    targetTypes: [],
    fieldName: "trimFilter"
  },
  "mixerDelayAux:4:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "highPassCutoffFrequencyHz"
  },
  "mixerDelayAux:4:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "lowPassCutoffFrequencyHz"
  },
  "mixerDelayAux:4:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerDelayAux:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.30000001192092896,
      range: { min: 0, max: 0.800000011920929 }
    },
    fieldName: "feedbackFactor"
  },
  "mixerDelayAux:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 3,
      range: { min: 1, max: 7 }
    },
    fieldName: "stepCount"
  },
  "mixerDelayAux:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "stepLengthIndex"
  },
  "mixerDelayAux:8": {
    type: "object",
    targetTypes: [],
    fieldName: "faderParameters"
  },
  "mixerDelayAux:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "mixerDelayAux:8:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.9952620267868042 }
    },
    fieldName: "postGain"
  },
  "mixerDelayAux:8:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "mixerDelayAux:8:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  mixerGroup: {
    type: "entity",
    targetTypes: ["MixerStripGroup", "MixerStripGroupChild"],
    typeKey: "mixerGroup"
  },
  "mixerGroup:2": {
    type: "object",
    targetTypes: [],
    fieldName: "displayParameters"
  },
  "mixerGroup:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongStrips"
  },
  "mixerGroup:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "mixerGroup:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "mixerGroup:3": {
    type: "object",
    targetTypes: [],
    fieldName: "trimFilter"
  },
  "mixerGroup:3:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "highPassCutoffFrequencyHz"
  },
  "mixerGroup:3:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "lowPassCutoffFrequencyHz"
  },
  "mixerGroup:3:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerGroup:4": {
    type: "object",
    targetTypes: [],
    fieldName: "compressor"
  },
  "mixerGroup:4:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 15,
      range: { min: 0.0010000000474974513, max: 200 }
    },
    fieldName: "attackMs"
  },
  "mixerGroup:4:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 100,
      range: { min: 0.0010000000474974513, max: 2e3 }
    },
    fieldName: "releaseMs"
  },
  "mixerGroup:4:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "makeupGainDb"
  },
  "mixerGroup:4:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "detectionModeIndex"
  },
  "mixerGroup:4:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2,
      range: { min: 1, max: 50 }
    },
    fieldName: "ratio"
  },
  "mixerGroup:4:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -10,
      range: { min: -48, max: 0 }
    },
    fieldName: "thresholdDb"
  },
  "mixerGroup:4:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isActive"
  },
  "mixerGroup:4:8": {
    type: "object",
    targetTypes: ["MixerSideChainInput"],
    fieldName: "sideChainInput"
  },
  "mixerGroup:5": {
    type: "object",
    targetTypes: [],
    fieldName: "eq"
  },
  "mixerGroup:5:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 60,
      range: { min: 35, max: 220 }
    },
    fieldName: "lowShelfFrequencyHz"
  },
  "mixerGroup:5:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "lowShelfGainDb"
  },
  "mixerGroup:5:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 500,
      range: { min: 200, max: 700 }
    },
    fieldName: "lowMidFrequencyHz"
  },
  "mixerGroup:5:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "lowMidGainDb"
  },
  "mixerGroup:5:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4800,
      range: { min: 1600, max: 7200 }
    },
    fieldName: "highMidFrequencyHz"
  },
  "mixerGroup:5:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "highMidGainDb"
  },
  "mixerGroup:5:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 12e3,
      range: { min: 1e4, max: 16e3 }
    },
    fieldName: "highShelfFrequencyHz"
  },
  "mixerGroup:5:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -18, max: 18 }
    },
    fieldName: "highShelfGainDb"
  },
  "mixerGroup:5:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerGroup:6": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "insertOutput"
  },
  "mixerGroup:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "insertInput"
  },
  "mixerGroup:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "auxSendsAreActive"
  },
  "mixerGroup:9": {
    type: "object",
    targetTypes: ["MixerAuxSend"],
    fieldName: "auxSend"
  },
  "mixerGroup:10": {
    type: "object",
    targetTypes: ["MixerSideChainOutput"],
    fieldName: "sideChainOutput"
  },
  "mixerGroup:11": {
    type: "object",
    targetTypes: [],
    fieldName: "faderParameters"
  },
  "mixerGroup:11:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "mixerGroup:11:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.9952620267868042 }
    },
    fieldName: "postGain"
  },
  "mixerGroup:11:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "mixerGroup:11:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  mixerMaster: {
    type: "entity",
    targetTypes: [],
    typeKey: "mixerMaster"
  },
  "mixerMaster:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "mixerMaster:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "mixerMaster:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doBypassInserts"
  },
  "mixerMaster:6": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "insertOutput"
  },
  "mixerMaster:7": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "insertInput"
  },
  "mixerMaster:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "mixerMaster:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.9952620267868042 }
    },
    fieldName: "postGain"
  },
  "mixerMaster:10": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "limiterEnabled"
  },
  "mixerMaster:11": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  mixerReverbAux: {
    type: "entity",
    targetTypes: ["MixerAuxReceive"],
    typeKey: "mixerReverbAux"
  },
  "mixerReverbAux:2": {
    type: "object",
    targetTypes: [],
    fieldName: "displayParameters"
  },
  "mixerReverbAux:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongStrips"
  },
  "mixerReverbAux:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "mixerReverbAux:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "mixerReverbAux:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "preGain"
  },
  "mixerReverbAux:4": {
    type: "object",
    targetTypes: [],
    fieldName: "trimFilter"
  },
  "mixerReverbAux:4:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "highPassCutoffFrequencyHz"
  },
  "mixerReverbAux:4:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "lowPassCutoffFrequencyHz"
  },
  "mixerReverbAux:4:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "mixerReverbAux:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.800000011920929,
      range: { min: 0, max: 1 }
    },
    fieldName: "roomSizeFactor"
  },
  "mixerReverbAux:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 160,
      range: { min: 8, max: 500 }
    },
    fieldName: "preDelayTimeMs"
  },
  "mixerReverbAux:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.10000000149011612,
      range: { min: 0, max: 1 }
    },
    fieldName: "dampFactor"
  },
  "mixerReverbAux:8": {
    type: "object",
    targetTypes: [],
    fieldName: "faderParameters"
  },
  "mixerReverbAux:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "mixerReverbAux:8:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1.9952620267868042 }
    },
    fieldName: "postGain"
  },
  "mixerReverbAux:8:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "mixerReverbAux:8:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  mixerSideChainCable: {
    type: "entity",
    targetTypes: [],
    typeKey: "mixerSideChainCable"
  },
  "mixerSideChainCable:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MixerSideChainOutput",
      required: true
    },
    fieldName: "from"
  },
  "mixerSideChainCable:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MixerSideChainInput",
      required: true
    },
    fieldName: "to"
  },
  mixerStripGrouping: {
    type: "entity",
    targetTypes: [],
    typeKey: "mixerStripGrouping"
  },
  "mixerStripGrouping:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MixerStripGroupChild",
      required: true
    },
    fieldName: "childStrip"
  },
  "mixerStripGrouping:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "MixerStripGroup",
      required: true
    },
    fieldName: "groupStrip"
  },
  noteSplitter: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer"],
    typeKey: "noteSplitter"
  },
  "noteSplitter:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "noteSplitter:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "noteSplitter:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "noteSplitter:5": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "noteSplitter:6": {
    type: "array",
    targetTypes: [],
    fieldName: "channels",
    length: 3
  },
  "noteSplitter:6:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "noteSplitter:6:[]:1": {
    type: "object",
    targetTypes: ["NotesOutput"],
    fieldName: "notesOutput"
  },
  "noteSplitter:6:[]:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "velocityModulation"
  },
  "noteSplitter:6:[]:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  panorama: {
    type: "entity",
    targetTypes: [],
    typeKey: "panorama"
  },
  "panorama:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "panorama:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "panorama:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "panorama:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "leftFactor"
  },
  "panorama:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "rightFactor"
  },
  "panorama:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -1,
      range: { min: -1, max: 1 }
    },
    fieldName: "leftPanning"
  },
  "panorama:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "rightPanning"
  },
  "panorama:9": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "panorama:10": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "panorama:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  pulsar: {
    type: "entity",
    targetTypes: [],
    typeKey: "pulsar"
  },
  "pulsar:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "pulsar:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "pulsar:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "pulsar:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 12 }
    },
    fieldName: "preDelayLeftTimeSemibreveIndex"
  },
  "pulsar:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 500 }
    },
    fieldName: "preDelayLeftTimeMs"
  },
  "pulsar:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -1,
      range: { min: -1, max: 1 }
    },
    fieldName: "preDelayLeftPanning"
  },
  "pulsar:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 12 }
    },
    fieldName: "preDelayRightTimeSemibreveIndex"
  },
  "pulsar:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 500 }
    },
    fieldName: "preDelayRightTimeMs"
  },
  "pulsar:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: -1, max: 1 }
    },
    fieldName: "preDelayRightPanning"
  },
  "pulsar:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 12 }
    },
    fieldName: "feedbackDelayTimeSemibreveIndex"
  },
  "pulsar:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 500 }
    },
    fieldName: "feedbackDelayTimeMs"
  },
  "pulsar:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 0.10000000149011612, max: 25 }
    },
    fieldName: "lfoSpeedHz"
  },
  "pulsar:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 50 }
    },
    fieldName: "lfoModulationDepthMs"
  },
  "pulsar:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.699999988079071,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "pulsar:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "stereoCrossFactor"
  },
  "pulsar:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "filterMinHz"
  },
  "pulsar:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "filterMaxHz"
  },
  "pulsar:19": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "dryGain"
  },
  "pulsar:20": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.699999988079071,
      range: { min: 0, max: 1 }
    },
    fieldName: "wetGain"
  },
  "pulsar:21": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "pulsar:22": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "pulsar:23": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  pulverisateur: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer"],
    typeKey: "pulverisateur"
  },
  "pulverisateur:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "pulverisateur:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "pulverisateur:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "pulverisateur:5": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "pulverisateur:6": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "pulverisateur:7": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "pulverisateur:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079460024833679,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "pulverisateur:9": {
    type: "object",
    targetTypes: [],
    fieldName: "oscillatorA"
  },
  "pulverisateur:9:1": {
    type: "object",
    targetTypes: [],
    fieldName: "channel"
  },
  "pulverisateur:9:1:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "pulverisateur:9:1:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "pulverisateur:9:1:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "pulverisateur:9:2": {
    type: "object",
    targetTypes: [],
    fieldName: "oscillator"
  },
  "pulverisateur:9:2:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -7, max: 7 }
    },
    fieldName: "tuneSemitones"
  },
  "pulverisateur:9:2:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -3, max: 3 }
    },
    fieldName: "tuneOctaves"
  },
  "pulverisateur:9:2:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "waveform"
  },
  "pulverisateur:10": {
    type: "object",
    targetTypes: [],
    fieldName: "oscillatorB"
  },
  "pulverisateur:10:1": {
    type: "object",
    targetTypes: [],
    fieldName: "channel"
  },
  "pulverisateur:10:1:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "pulverisateur:10:1:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "pulverisateur:10:1:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "pulverisateur:10:2": {
    type: "object",
    targetTypes: [],
    fieldName: "oscillator"
  },
  "pulverisateur:10:2:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -7, max: 7 }
    },
    fieldName: "tuneSemitones"
  },
  "pulverisateur:10:2:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -3, max: 3 }
    },
    fieldName: "tuneOctaves"
  },
  "pulverisateur:10:2:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "waveform"
  },
  "pulverisateur:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "hardSyncToOscillatorA"
  },
  "pulverisateur:11": {
    type: "object",
    targetTypes: [],
    fieldName: "oscillatorC"
  },
  "pulverisateur:11:1": {
    type: "object",
    targetTypes: [],
    fieldName: "channel"
  },
  "pulverisateur:11:1:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "pulverisateur:11:1:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "pulverisateur:11:1:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "pulverisateur:11:2": {
    type: "object",
    targetTypes: [],
    fieldName: "oscillator"
  },
  "pulverisateur:11:2:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -7, max: 7 }
    },
    fieldName: "tuneSemitones"
  },
  "pulverisateur:11:2:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -3, max: 3 }
    },
    fieldName: "tuneOctaves"
  },
  "pulverisateur:11:2:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "waveform"
  },
  "pulverisateur:11:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "doesTrackKeyboard"
  },
  "pulverisateur:12": {
    type: "object",
    targetTypes: [],
    fieldName: "noise"
  },
  "pulverisateur:12:1": {
    type: "object",
    targetTypes: [],
    fieldName: "channel"
  },
  "pulverisateur:12:1:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "pulverisateur:12:1:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "pulverisateur:12:1:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "pulverisateur:12:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "color"
  },
  "pulverisateur:13": {
    type: "object",
    targetTypes: [],
    fieldName: "audio"
  },
  "pulverisateur:13:1": {
    type: "object",
    targetTypes: [],
    fieldName: "channel"
  },
  "pulverisateur:13:1:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "pulverisateur:13:1:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "pulverisateur:13:1:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "pulverisateur:13:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "drive"
  },
  "pulverisateur:14": {
    type: "object",
    targetTypes: [],
    fieldName: "filter"
  },
  "pulverisateur:14:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "modeIndex"
  },
  "pulverisateur:14:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 15500,
      range: { min: 18, max: 15500 }
    },
    fieldName: "cutoffFrequencyHz"
  },
  "pulverisateur:14:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "resonance"
  },
  "pulverisateur:14:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "filterSpacing"
  },
  "pulverisateur:14:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "keyboardTrackingAmount"
  },
  "pulverisateur:15": {
    type: "object",
    targetTypes: [],
    fieldName: "lfo"
  },
  "pulverisateur:15:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "waveform"
  },
  "pulverisateur:15:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "rateIsSynced"
  },
  "pulverisateur:15:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "rateNormalized"
  },
  "pulverisateur:15:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "restartOnNote"
  },
  "pulverisateur:15:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "targetsOscillatorAPitch"
  },
  "pulverisateur:15:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "targetsOscillatorBPitch"
  },
  "pulverisateur:15:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "targetsOscillatorCPitch"
  },
  "pulverisateur:15:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "targetsFilterCutoff"
  },
  "pulverisateur:15:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "targetsPulseWidth"
  },
  "pulverisateur:15:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "modulationDepth"
  },
  "pulverisateur:16": {
    type: "object",
    targetTypes: [],
    fieldName: "filterEnvelope"
  },
  "pulverisateur:16:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 1, max: 5e3 }
    },
    fieldName: "attackMs"
  },
  "pulverisateur:16:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 500,
      range: { min: 1, max: 5e3 }
    },
    fieldName: "decayMs"
  },
  "pulverisateur:16:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "pulverisateur:16:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "pulverisateur:16:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 1, max: 2e4 }
    },
    fieldName: "releaseMs"
  },
  "pulverisateur:16:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "modulationDepth"
  },
  "pulverisateur:18": {
    type: "object",
    targetTypes: [],
    fieldName: "amplitudeEnvelope"
  },
  "pulverisateur:18:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 1, max: 5e3 }
    },
    fieldName: "attackMs"
  },
  "pulverisateur:18:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 500,
      range: { min: 1, max: 5e3 }
    },
    fieldName: "decayMs"
  },
  "pulverisateur:18:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "pulverisateur:18:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "pulverisateur:18:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 1, max: 2e4 }
    },
    fieldName: "releaseMs"
  },
  "pulverisateur:19": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1e4 }
    },
    fieldName: "glideTimeMs"
  },
  "pulverisateur:20": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "tuneSemitones"
  },
  "pulverisateur:21": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 2,
      range: { min: 1, max: 2 }
    },
    fieldName: "playModeIndex"
  },
  "pulverisateur:22": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "MicroTuning",
      required: false
    },
    fieldName: "microTuning"
  },
  "pulverisateur:23": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  quantum: {
    type: "entity",
    targetTypes: [],
    typeKey: "quantum"
  },
  "quantum:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "quantum:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "quantum:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "quantum:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "gainDb"
  },
  "quantum:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 0, max: 30 }
    },
    fieldName: "rmsWindowMs"
  },
  "quantum:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "quantum:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 2,
      range: { min: 1, max: 3 }
    },
    fieldName: "spectrumModeIndex"
  },
  "quantum:9": {
    type: "array",
    targetTypes: [],
    fieldName: "splitFrequencyHz",
    length: 3
  },
  "quantum:9:[]": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "[]"
  },
  "quantum:10": {
    type: "array",
    targetTypes: [],
    fieldName: "bands",
    length: 4
  },
  "quantum:10:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "quantum:10:[]:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -10,
      range: { min: -48, max: 0 }
    },
    fieldName: "thresholdDb"
  },
  "quantum:10:[]:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 4,
      range: { min: 1, max: 50 }
    },
    fieldName: "ratio"
  },
  "quantum:10:[]:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3,
      range: { min: 0, max: 24 }
    },
    fieldName: "kneeDb"
  },
  "quantum:10:[]:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 0, max: 1e3 }
    },
    fieldName: "attackMs"
  },
  "quantum:10:[]:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 50,
      range: { min: 0, max: 1e3 }
    },
    fieldName: "releaseMs"
  },
  "quantum:10:[]:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "makeupGainDb"
  },
  "quantum:10:[]:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isCompressorActive"
  },
  "quantum:10:[]:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "quantum:10:[]:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "quantum:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "quantum:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  quasar: {
    type: "entity",
    targetTypes: [],
    typeKey: "quasar"
  },
  "quasar:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "quasar:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "quasar:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "quasar:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1e3 }
    },
    fieldName: "preDelayMs"
  },
  "quasar:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 2e4,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "lowPassFrequencyHz"
  },
  "quasar:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 2e4 }
    },
    fieldName: "highPassFrequencyHz"
  },
  "quasar:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "filterSlopeIndex"
  },
  "quasar:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5011870265007019,
      range: { min: 0, max: 1 }
    },
    fieldName: "dryGain"
  },
  "quasar:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5011870265007019,
      range: { min: 0, max: 1 }
    },
    fieldName: "wetGain"
  },
  "quasar:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "quasar:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.75,
      range: { min: 0, max: 1 }
    },
    fieldName: "plateDecay"
  },
  "quasar:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "plateDamp"
  },
  "quasar:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "inputDiffusion"
  },
  "quasar:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "tankDiffusion"
  },
  "quasar:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "vibratoDepth"
  },
  "quasar:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0.009999999776482582, max: 20 }
    },
    fieldName: "vibratoFrequencyHz"
  },
  "quasar:18": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "quasar:19": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  rasselbock: {
    type: "entity",
    targetTypes: ["PatternTrackPlayer"],
    typeKey: "rasselbock"
  },
  "rasselbock:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "rasselbock:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "rasselbock:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "rasselbock:5": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 32
  },
  "rasselbock:5:[]": {
    type: "object",
    targetTypes: ["RasselbockPatternSlot"],
    fieldName: "[]"
  },
  "rasselbock:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 31 }
    },
    fieldName: "patternIndex"
  },
  "rasselbock:7": {
    type: "array",
    targetTypes: [],
    fieldName: "channelConfigs",
    length: 5
  },
  "rasselbock:7:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "rasselbock:7:[]:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "rasselbock:7:[]:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "panning"
  },
  "rasselbock:7:[]:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "rasselbock:7:[]:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "mixMode"
  },
  "rasselbock:7:[]:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:7:[]:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:7:[]:7": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "rasselbock:8": {
    type: "object",
    targetTypes: [],
    fieldName: "shuffleConfig"
  },
  "rasselbock:8:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 4 }
    },
    fieldName: "intervalIndex"
  },
  "rasselbock:8:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 16777215,
      range: { min: 65535, max: 16777215 }
    },
    fieldName: "seed"
  },
  "rasselbock:8:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:8:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:9": {
    type: "object",
    targetTypes: [],
    fieldName: "speedConfig"
  },
  "rasselbock:9:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 6,
      range: { min: 1, max: 8 }
    },
    fieldName: "speedRatioIndex"
  },
  "rasselbock:9:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:9:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:10": {
    type: "object",
    targetTypes: [],
    fieldName: "stopConfig"
  },
  "rasselbock:10:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 5,
      range: { min: 1, max: 7 }
    },
    fieldName: "durationIndex"
  },
  "rasselbock:10:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doesSpinback"
  },
  "rasselbock:10:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:10:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:11": {
    type: "object",
    targetTypes: [],
    fieldName: "gateConfig"
  },
  "rasselbock:11:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 5,
      range: { min: 1, max: 8 }
    },
    fieldName: "intervalDurationIndex"
  },
  "rasselbock:11:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "durationFactor"
  },
  "rasselbock:11:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:11:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:12": {
    type: "object",
    targetTypes: [],
    fieldName: "stutterConfig"
  },
  "rasselbock:12:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 5,
      range: { min: 1, max: 8 }
    },
    fieldName: "intervalDurationIndex"
  },
  "rasselbock:12:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "scaleFactor"
  },
  "rasselbock:12:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "pitchSemitones"
  },
  "rasselbock:12:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:12:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:13": {
    type: "object",
    targetTypes: [],
    fieldName: "scratchConfig"
  },
  "rasselbock:13:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 4,
      range: { min: 1, max: 11 }
    },
    fieldName: "rateBars"
  },
  "rasselbock:13:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2 }
    },
    fieldName: "modulationDepth"
  },
  "rasselbock:13:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "modulationOffset"
  },
  "rasselbock:13:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "modulationShapeIndex"
  },
  "rasselbock:13:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:13:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:14": {
    type: "object",
    targetTypes: [],
    fieldName: "reverseConfig"
  },
  "rasselbock:14:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "rasselbock:14:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSoloed"
  },
  "rasselbock:15": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "rasselbock:16": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "masterOutput"
  },
  "rasselbock:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  rasselbockPattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "rasselbockPattern"
  },
  "rasselbockPattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "RasselbockPatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "rasselbockPattern:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 16,
      range: { min: 1, max: 64 }
    },
    fieldName: "length"
  },
  "rasselbockPattern:4": {
    type: "array",
    targetTypes: [],
    fieldName: "channelPatterns",
    length: 5
  },
  "rasselbockPattern:4:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "rasselbockPattern:4:[]:1": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 256
  },
  "rasselbockPattern:4:[]:1:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "rasselbockPattern:4:[]:1:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isOn"
  },
  "rasselbockPattern:4:[]:1:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isEnd"
  },
  "rasselbockPattern:5": {
    type: "array",
    targetTypes: [],
    fieldName: "effectOrder",
    length: 7
  },
  "rasselbockPattern:5:[]": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "[]"
  },
  "rasselbockPattern:6": {
    type: "array",
    targetTypes: [],
    fieldName: "effectPatterns",
    length: 7
  },
  "rasselbockPattern:6:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "rasselbockPattern:6:[]:1": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 256
  },
  "rasselbockPattern:6:[]:1:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "rasselbockPattern:6:[]:1:[]:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isOn"
  },
  "rasselbockPattern:6:[]:1:[]:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isEnd"
  },
  "rasselbockPattern:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  ringModulator: {
    type: "entity",
    targetTypes: [],
    typeKey: "ringModulator"
  },
  "ringModulator:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "ringModulator:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "ringModulator:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "ringModulator:5": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput1"
  },
  "ringModulator:6": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput2"
  },
  "ringModulator:7": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "ringModulator:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 7.943282127380371 }
    },
    fieldName: "gain"
  },
  "ringModulator:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  sample: {
    type: "entity",
    targetTypes: ["Sample"],
    typeKey: "sample"
  },
  "sample:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 60
    },
    fieldName: "sampleName"
  },
  "sample:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT64,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "uploadStartTime"
  },
  space: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer"],
    typeKey: "space"
  },
  "space:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "space:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "space:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "space:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "MicroTuning",
      required: false
    },
    fieldName: "microTuning"
  },
  "space:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.7079399824142456,
      range: { min: 0, max: 1 }
    },
    fieldName: "gain"
  },
  "space:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "stereoDetuneShift"
  },
  "space:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "tuneSemitones"
  },
  "space:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "tuneASemitones"
  },
  "space:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "tuneBSemitones"
  },
  "space:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 5e3 }
    },
    fieldName: "glideMs"
  },
  "space:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -1,
      range: { min: -1, max: 1 }
    },
    fieldName: "mixAB"
  },
  "space:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "lfoMixModulationDepth"
  },
  "space:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "lfoGainModulationDepth"
  },
  "space:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "lfoStereoDetuneShiftModulationDepth"
  },
  "space:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "lfoPanningModulationDepth"
  },
  "space:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeMixModulationDepth"
  },
  "space:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeTuneModulationDepth"
  },
  "space:19": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeLfoRateModulationDepth"
  },
  "space:20": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "envelopeLfoAmountModulationDepth"
  },
  "space:21": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocityGainModulationDepth"
  },
  "space:22": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "velocityMixModulationDepth"
  },
  "space:23": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "keyboardMixModulationDepth"
  },
  "space:24": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 3 }
    },
    fieldName: "notePlayModeIndex"
  },
  "space:25": {
    type: "object",
    targetTypes: [],
    fieldName: "lfo"
  },
  "space:25:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 5 }
    },
    fieldName: "waveformIndex"
  },
  "space:25:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "rateNormalized"
  },
  "space:25:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "phaseOffset"
  },
  "space:25:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "space:25:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "doesRetrigger"
  },
  "space:26": {
    type: "object",
    targetTypes: [],
    fieldName: "amplitudeEnvelope"
  },
  "space:26:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "space:26:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "attackTimeNormalized"
  },
  "space:26:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackSlopeFactor"
  },
  "space:26:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTimeNormalized"
  },
  "space:26:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "decaySlopeFactor"
  },
  "space:26:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "space:26:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "space:26:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "space:26:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseSlopeFactor"
  },
  "space:27": {
    type: "object",
    targetTypes: [],
    fieldName: "modulationEnvelope"
  },
  "space:27:1": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isSynced"
  },
  "space:27:2": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "attackTimeNormalized"
  },
  "space:27:3": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "attackSlopeFactor"
  },
  "space:27:4": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "decayTimeNormalized"
  },
  "space:27:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "decaySlopeFactor"
  },
  "space:27:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "decayIsLooped"
  },
  "space:27:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "sustainFactor"
  },
  "space:27:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: 0, max: 1 }
    },
    fieldName: "releaseTimeNormalized"
  },
  "space:27:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: -1, max: 1 }
    },
    fieldName: "releaseSlopeFactor"
  },
  "space:28": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "modulationEnvelopeHasRelease"
  },
  "space:29": {
    type: "object",
    targetTypes: [],
    fieldName: "soundA"
  },
  "space:29:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "dispersion"
  },
  "space:29:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.20000000298023224,
      range: { min: 0, max: 1 }
    },
    fieldName: "vaporisation"
  },
  "space:29:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "brightness"
  },
  "space:29:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "metal"
  },
  "space:29:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "separation"
  },
  "space:29:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 32,
      range: { min: 1, max: 32 }
    },
    fieldName: "harmonicsCount"
  },
  "space:29:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "combFilterAmount"
  },
  "space:29:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.15000000596046448,
      range: { min: 0, max: 1 }
    },
    fieldName: "combFilterRate"
  },
  "space:29:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "combFilterWidth"
  },
  "space:30": {
    type: "object",
    targetTypes: [],
    fieldName: "soundB"
  },
  "space:30:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.5,
      range: { min: 0, max: 1 }
    },
    fieldName: "dispersion"
  },
  "space:30:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.20000000298023224,
      range: { min: 0, max: 1 }
    },
    fieldName: "vaporisation"
  },
  "space:30:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "brightness"
  },
  "space:30:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "metal"
  },
  "space:30:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "separation"
  },
  "space:30:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 32,
      range: { min: 1, max: 32 }
    },
    fieldName: "harmonicsCount"
  },
  "space:30:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "combFilterAmount"
  },
  "space:30:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.15000000596046448,
      range: { min: 0, max: 1 }
    },
    fieldName: "combFilterRate"
  },
  "space:30:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "combFilterWidth"
  },
  "space:31": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "space:32": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "space:33": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  spitfireLabsVst3Plugin: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer"],
    typeKey: "spitfireLabsVst3Plugin"
  },
  "spitfireLabsVst3Plugin:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "spitfireLabsVst3Plugin:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "spitfireLabsVst3Plugin:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "spitfireLabsVst3Plugin:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "expression"
  },
  "spitfireLabsVst3Plugin:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "dynamics"
  },
  "spitfireLabsVst3Plugin:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "reverb"
  },
  "spitfireLabsVst3Plugin:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "release"
  },
  "spitfireLabsVst3Plugin:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "tightness"
  },
  "spitfireLabsVst3Plugin:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "vibrato"
  },
  "spitfireLabsVst3Plugin:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "simpleMix"
  },
  "spitfireLabsVst3Plugin:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "stereoPan"
  },
  "spitfireLabsVst3Plugin:13": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "adsrAttack"
  },
  "spitfireLabsVst3Plugin:14": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "adsrDecay"
  },
  "spitfireLabsVst3Plugin:15": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "adsrSustain"
  },
  "spitfireLabsVst3Plugin:16": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "adsrRelease"
  },
  "spitfireLabsVst3Plugin:17": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "globalGain"
  },
  "spitfireLabsVst3Plugin:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "globalPan"
  },
  "spitfireLabsVst3Plugin:19": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "globalTune"
  },
  "spitfireLabsVst3Plugin:20": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "stereoFlip"
  },
  "spitfireLabsVst3Plugin:21": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "stereoSpread"
  },
  "spitfireLabsVst3Plugin:22": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "variation"
  },
  "spitfireLabsVst3Plugin:23": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "delay"
  },
  "spitfireLabsVst3Plugin:24": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "amount"
  },
  "spitfireLabsVst3Plugin:25": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "distortion"
  },
  "spitfireLabsVst3Plugin:26": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lushVerb"
  },
  "spitfireLabsVst3Plugin:27": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "pedalVol"
  },
  "spitfireLabsVst3Plugin:28": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "pedalDyn"
  },
  "spitfireLabsVst3Plugin:29": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "length"
  },
  "spitfireLabsVst3Plugin:30": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "timeMachine"
  },
  "spitfireLabsVst3Plugin:31": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "stretch"
  },
  "spitfireLabsVst3Plugin:32": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "softPedal"
  },
  "spitfireLabsVst3Plugin:33": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "response"
  },
  "spitfireLabsVst3Plugin:34": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "mallet"
  },
  "spitfireLabsVst3Plugin:35": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "stopMute"
  },
  "spitfireLabsVst3Plugin:36": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "direction"
  },
  "spitfireLabsVst3Plugin:37": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "lowPassFilter"
  },
  "spitfireLabsVst3Plugin:38": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "portamento"
  },
  "spitfireLabsVst3Plugin:39": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose1"
  },
  "spitfireLabsVst3Plugin:40": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose2"
  },
  "spitfireLabsVst3Plugin:41": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose3"
  },
  "spitfireLabsVst3Plugin:42": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose4"
  },
  "spitfireLabsVst3Plugin:43": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose5"
  },
  "spitfireLabsVst3Plugin:44": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose6"
  },
  "spitfireLabsVst3Plugin:45": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose7"
  },
  "spitfireLabsVst3Plugin:46": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose8"
  },
  "spitfireLabsVst3Plugin:47": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "generalPurpose9"
  },
  "spitfireLabsVst3Plugin:48": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "speed"
  },
  "spitfireLabsVst3Plugin:49": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "compression"
  },
  "spitfireLabsVst3Plugin:50": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "scale"
  },
  "spitfireLabsVst3Plugin:51": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "depth"
  },
  "spitfireLabsVst3Plugin:52": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "noiseFx"
  },
  "spitfireLabsVst3Plugin:53": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: true,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "grainSpeed"
  },
  "spitfireLabsVst3Plugin:54": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "spitfireLabsVst3Plugin:57": {
    type: "object",
    targetTypes: ["NotesInput"],
    fieldName: "notesInput"
  },
  "spitfireLabsVst3Plugin:58": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "bytes",
      scalarType: ScalarType.BYTES
    },
    fieldName: "state"
  },
  stereoEnhancer: {
    type: "entity",
    targetTypes: [],
    typeKey: "stereoEnhancer"
  },
  "stereoEnhancer:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stereoEnhancer:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stereoEnhancer:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stereoEnhancer:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "channelsAreInverted"
  },
  "stereoEnhancer:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 11e3,
      range: { min: 32.70000076293945, max: 16744.0390625 }
    },
    fieldName: "frequencyHz"
  },
  "stereoEnhancer:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: -1, max: 1 }
    },
    fieldName: "stereoWidth"
  },
  "stereoEnhancer:8": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stereoEnhancer:9": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "stereoEnhancer:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  stompboxChorus: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxChorus"
  },
  "stompboxChorus:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxChorus:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxChorus:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxChorus:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 20,
      range: { min: 20, max: 40 }
    },
    fieldName: "delayTimeMs"
  },
  "stompboxChorus:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "stompboxChorus:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.33329999446868896,
      range: { min: 0.10000000149011612, max: 5 }
    },
    fieldName: "lfoFrequencyHz"
  },
  "stompboxChorus:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfoModulationDepth"
  },
  "stompboxChorus:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "spreadFactor"
  },
  "stompboxChorus:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxChorus:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxChorus:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxCompressor: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxCompressor"
  },
  "stompboxCompressor:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxCompressor:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxCompressor:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxCompressor:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 1, max: 100 }
    },
    fieldName: "attackMs"
  },
  "stompboxCompressor:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 25,
      range: { min: 1, max: 600 }
    },
    fieldName: "releaseMs"
  },
  "stompboxCompressor:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "makeupGainDb"
  },
  "stompboxCompressor:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "detectionModeIndex"
  },
  "stompboxCompressor:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.4000000059604645,
      range: { min: 0, max: 1 }
    },
    fieldName: "ratio"
  },
  "stompboxCompressor:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: -15,
      range: { min: -24, max: 0 }
    },
    fieldName: "thresholdDb"
  },
  "stompboxCompressor:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxCompressor:12": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxCompressor:13": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "sideChainInput"
  },
  "stompboxCompressor:14": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxCrusher: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxCrusher"
  },
  "stompboxCrusher:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxCrusher:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxCrusher:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxCrusher:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 22.387210845947266 }
    },
    fieldName: "preGain"
  },
  "stompboxCrusher:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "downsamplingFactor"
  },
  "stompboxCrusher:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2.818382978439331 }
    },
    fieldName: "postGain"
  },
  "stompboxCrusher:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 8,
      range: { min: 1, max: 24 }
    },
    fieldName: "bits"
  },
  "stompboxCrusher:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "stompboxCrusher:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxCrusher:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxCrusher:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxDelay: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxDelay"
  },
  "stompboxDelay:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxDelay:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxDelay:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxDelay:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 3,
      range: { min: 1, max: 7 }
    },
    fieldName: "stepCount"
  },
  "stompboxDelay:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "stepLengthIndex"
  },
  "stompboxDelay:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.4000000059604645,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "stompboxDelay:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.20000000298023224,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "stompboxDelay:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxDelay:10": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxDelay:11": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxFlanger: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxFlanger"
  },
  "stompboxFlanger:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxFlanger:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxFlanger:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxFlanger:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3,
      range: { min: 1, max: 10 }
    },
    fieldName: "delayTimeMs"
  },
  "stompboxFlanger:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "stompboxFlanger:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.03999999910593033,
      range: { min: 0.03999999910593033, max: 5 }
    },
    fieldName: "lfoFrequencyHz"
  },
  "stompboxFlanger:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "lfoModulationDepth"
  },
  "stompboxFlanger:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxFlanger:10": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxFlanger:11": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxGate: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxGate"
  },
  "stompboxGate:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxGate:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxGate:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxGate:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 10,
      range: { min: 1, max: 100 }
    },
    fieldName: "attackMs"
  },
  "stompboxGate:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 50,
      range: { min: 10, max: 600 }
    },
    fieldName: "releaseMs"
  },
  "stompboxGate:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2.818382978439331 }
    },
    fieldName: "postGain"
  },
  "stompboxGate:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isInverted"
  },
  "stompboxGate:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 100,
      range: { min: 0.009999999776482582, max: 2e3 }
    },
    fieldName: "holdMs"
  },
  "stompboxGate:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6665999889373779,
      range: { min: 0, max: 1 }
    },
    fieldName: "thresholdGain"
  },
  "stompboxGate:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxGate:12": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxGate:13": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "sideChainInput"
  },
  "stompboxGate:14": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxParametricEqualizer: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxParametricEqualizer"
  },
  "stompboxParametricEqualizer:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxParametricEqualizer:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxParametricEqualizer:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxParametricEqualizer:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3600,
      range: { min: 31, max: 12e3 }
    },
    fieldName: "frequencyHz"
  },
  "stompboxParametricEqualizer:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.15000000596046448,
      range: { min: 0, max: 1 }
    },
    fieldName: "bandwidthFactor"
  },
  "stompboxParametricEqualizer:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -12, max: 12 }
    },
    fieldName: "postGainDb"
  },
  "stompboxParametricEqualizer:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxParametricEqualizer:9": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxParametricEqualizer:10": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxPhaser: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxPhaser"
  },
  "stompboxPhaser:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxPhaser:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxPhaser:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxPhaser:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 240,
      range: { min: 30, max: 300 }
    },
    fieldName: "minFrequencyHz"
  },
  "stompboxPhaser:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 3e3,
      range: { min: 300, max: 8e3 }
    },
    fieldName: "maxFrequencyHz"
  },
  "stompboxPhaser:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.699999988079071,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "stompboxPhaser:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6000000238418579,
      range: { min: 0.03999999910593033, max: 5 }
    },
    fieldName: "lfoFrequencyHz"
  },
  "stompboxPhaser:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "stompboxPhaser:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxPhaser:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxPhaser:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxPitchDelay: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxPitchDelay"
  },
  "stompboxPitchDelay:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxPitchDelay:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxPitchDelay:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxPitchDelay:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 3,
      range: { min: 1, max: 7 }
    },
    fieldName: "stepCount"
  },
  "stompboxPitchDelay:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 3 }
    },
    fieldName: "stepLengthIndex"
  },
  "stompboxPitchDelay:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6660000085830688,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "stompboxPitchDelay:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.20000000298023224,
      range: { min: -1, max: 1 }
    },
    fieldName: "tuneFactor"
  },
  "stompboxPitchDelay:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.699999988079071,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "stompboxPitchDelay:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxPitchDelay:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxPitchDelay:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxReverb: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxReverb"
  },
  "stompboxReverb:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxReverb:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxReverb:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxReverb:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.800000011920929,
      range: { min: 0, max: 1 }
    },
    fieldName: "roomSizeFactor"
  },
  "stompboxReverb:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 160,
      range: { min: 8, max: 500 }
    },
    fieldName: "preDelayTimeMs"
  },
  "stompboxReverb:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.6669999957084656,
      range: { min: 0, max: 1 }
    },
    fieldName: "feedbackFactor"
  },
  "stompboxReverb:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.10000000149011612,
      range: { min: 0, max: 1 }
    },
    fieldName: "dampFactor"
  },
  "stompboxReverb:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.20000000298023224,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "stompboxReverb:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxReverb:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxReverb:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxSlope: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxSlope"
  },
  "stompboxSlope:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxSlope:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxSlope:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxSlope:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 1,
      range: { min: 1, max: 4 }
    },
    fieldName: "filterModeIndex"
  },
  "stompboxSlope:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 300,
      range: { min: 18, max: 1e4 }
    },
    fieldName: "frequencyHz"
  },
  "stompboxSlope:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "resonanceFactor"
  },
  "stompboxSlope:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -500, max: 500 }
    },
    fieldName: "bandWidthHz"
  },
  "stompboxSlope:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "stompboxSlope:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxSlope:11": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxSlope:12": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxStereoDetune: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxStereoDetune"
  },
  "stompboxStereoDetune:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxStereoDetune:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxStereoDetune:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxStereoDetune:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.25,
      range: { min: -1, max: 1 }
    },
    fieldName: "detuneSemitones"
  },
  "stompboxStereoDetune:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 14,
      range: { min: 2, max: 30 }
    },
    fieldName: "delayTimeMs"
  },
  "stompboxStereoDetune:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxStereoDetune:8": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxStereoDetune:9": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  stompboxTube: {
    type: "entity",
    targetTypes: [],
    typeKey: "stompboxTube"
  },
  "stompboxTube:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "stompboxTube:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "stompboxTube:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "stompboxTube:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 12,
      range: { min: 0.10000000149011612, max: 12 }
    },
    fieldName: "drive"
  },
  "stompboxTube:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -10, max: 10 }
    },
    fieldName: "tone"
  },
  "stompboxTube:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2 }
    },
    fieldName: "postGain"
  },
  "stompboxTube:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  "stompboxTube:9": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "stompboxTube:10": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  audioRegion: {
    type: "entity",
    targetTypes: [],
    typeKey: "audioRegion"
  },
  "audioRegion:2": {
    type: "object",
    targetTypes: [],
    fieldName: "region"
  },
  "audioRegion:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "positionTicks"
  },
  "audioRegion:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "durationTicks"
  },
  "audioRegion:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "collectionOffsetTicks"
  },
  "audioRegion:2:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "loopOffsetTicks"
  },
  "audioRegion:2:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "loopDurationTicks"
  },
  "audioRegion:2:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "audioRegion:2:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "audioRegion:2:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "audioRegion:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AudioTrack",
      required: true
    },
    fieldName: "track"
  },
  "audioRegion:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AutomationCollection",
      required: true
    },
    fieldName: "playbackAutomationCollection"
  },
  "audioRegion:5": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "Sample",
      required: true
    },
    fieldName: "sample"
  },
  "audioRegion:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 31.622777938842773 }
    },
    fieldName: "gain"
  },
  "audioRegion:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 10,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "fadeInDurationTicks"
  },
  "audioRegion:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "fadeInSlope"
  },
  "audioRegion:9": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 10,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "fadeOutDurationTicks"
  },
  "audioRegion:10": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "fadeOutSlope"
  },
  "audioRegion:11": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 2,
      range: { min: 1, max: 2 }
    },
    fieldName: "timestretchMode"
  },
  "audioRegion:12": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -24, max: 24 }
    },
    fieldName: "pitchShiftSemitones"
  },
  audioTrack: {
    type: "entity",
    targetTypes: ["AudioTrack"],
    typeKey: "audioTrack"
  },
  "audioTrack:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongTracks"
  },
  "audioTrack:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "audioTrack:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "audioTrack:5": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AudioTrackPlayer",
      required: true
    },
    fieldName: "player"
  },
  automationCollection: {
    type: "entity",
    targetTypes: ["AutomationCollection"],
    typeKey: "automationCollection"
  },
  automationEvent: {
    type: "entity",
    targetTypes: [],
    typeKey: "automationEvent"
  },
  "automationEvent:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AutomationCollection",
      required: true
    },
    fieldName: "collection"
  },
  "automationEvent:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionTicks"
  },
  "automationEvent:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "value"
  },
  "automationEvent:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "slope"
  },
  "automationEvent:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 1,
      range: { min: 1, max: 2 }
    },
    fieldName: "interpolation"
  },
  automationRegion: {
    type: "entity",
    targetTypes: [],
    typeKey: "automationRegion"
  },
  "automationRegion:2": {
    type: "object",
    targetTypes: [],
    fieldName: "region"
  },
  "automationRegion:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "positionTicks"
  },
  "automationRegion:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "durationTicks"
  },
  "automationRegion:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "collectionOffsetTicks"
  },
  "automationRegion:2:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "loopOffsetTicks"
  },
  "automationRegion:2:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "loopDurationTicks"
  },
  "automationRegion:2:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "automationRegion:2:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "automationRegion:2:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "automationRegion:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AutomationCollection",
      required: true
    },
    fieldName: "collection"
  },
  "automationRegion:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AutomationTrack",
      required: true
    },
    fieldName: "track"
  },
  automationTrack: {
    type: "entity",
    targetTypes: ["AutomationTrack"],
    typeKey: "automationTrack"
  },
  "automationTrack:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongTracks"
  },
  "automationTrack:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "automationTrack:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "AutomatableParameter",
      required: true
    },
    fieldName: "automatedParameter"
  },
  tempoAutomationTrack: {
    type: "entity",
    targetTypes: ["AutomationCollection"],
    typeKey: "tempoAutomationTrack"
  },
  "tempoAutomationTrack:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  note: {
    type: "entity",
    targetTypes: [],
    typeKey: "note"
  },
  "note:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "NoteCollection",
      required: true
    },
    fieldName: "collection"
  },
  "note:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionTicks"
  },
  "note:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 960,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "durationTicks"
  },
  "note:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 60,
      range: { min: 0, max: 127 }
    },
    fieldName: "pitch"
  },
  "note:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0.699999988079071,
      range: { min: 0, max: 1 }
    },
    fieldName: "velocity"
  },
  "note:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "doesSlide"
  },
  noteCollection: {
    type: "entity",
    targetTypes: ["NoteCollection"],
    typeKey: "noteCollection"
  },
  noteRegion: {
    type: "entity",
    targetTypes: [],
    typeKey: "noteRegion"
  },
  "noteRegion:2": {
    type: "object",
    targetTypes: [],
    fieldName: "region"
  },
  "noteRegion:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "positionTicks"
  },
  "noteRegion:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "durationTicks"
  },
  "noteRegion:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "collectionOffsetTicks"
  },
  "noteRegion:2:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "loopOffsetTicks"
  },
  "noteRegion:2:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "loopDurationTicks"
  },
  "noteRegion:2:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "noteRegion:2:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "noteRegion:2:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "noteRegion:3": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "NoteCollection",
      required: true
    },
    fieldName: "collection"
  },
  "noteRegion:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "NoteTrack",
      required: true
    },
    fieldName: "track"
  },
  noteTrack: {
    type: "entity",
    targetTypes: ["NoteTrack"],
    typeKey: "noteTrack"
  },
  "noteTrack:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongTracks"
  },
  "noteTrack:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "noteTrack:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  "noteTrack:5": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "NoteTrackPlayer",
      required: true
    },
    fieldName: "player"
  },
  patternRegion: {
    type: "entity",
    targetTypes: [],
    typeKey: "patternRegion"
  },
  "patternRegion:2": {
    type: "object",
    targetTypes: [],
    fieldName: "region"
  },
  "patternRegion:2:1": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "positionTicks"
  },
  "patternRegion:2:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "durationTicks"
  },
  "patternRegion:2:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "collectionOffsetTicks"
  },
  "patternRegion:2:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "loopOffsetTicks"
  },
  "patternRegion:2:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 15360,
      range: { min: 0, max: 4294967295 }
    },
    fieldName: "loopDurationTicks"
  },
  "patternRegion:2:6": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "patternRegion:2:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 41 }
    },
    fieldName: "colorIndex"
  },
  "patternRegion:2:8": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "patternRegion:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 32 }
    },
    fieldName: "patternIndex"
  },
  "patternRegion:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "PatternTrack",
      required: true
    },
    fieldName: "track"
  },
  "patternRegion:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "restart"
  },
  patternTrack: {
    type: "entity",
    targetTypes: ["PatternTrack"],
    typeKey: "patternTrack"
  },
  "patternTrack:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1 / 0, max: 1 / 0 }
    },
    fieldName: "orderAmongTracks"
  },
  "patternTrack:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isEnabled"
  },
  "patternTrack:4": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "PatternTrackPlayer",
      required: true
    },
    fieldName: "player"
  },
  tinyGain: {
    type: "entity",
    targetTypes: [],
    typeKey: "tinyGain"
  },
  "tinyGain:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "tinyGain:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "tinyGain:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "tinyGain:5": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "tinyGain:6": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "tinyGain:7": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2.818382978439331 }
    },
    fieldName: "gain"
  },
  "tinyGain:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "isMuted"
  },
  "tinyGain:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  tonematrix: {
    type: "entity",
    targetTypes: ["NoteTrackPlayer", "PatternTrackPlayer"],
    typeKey: "tonematrix"
  },
  "tonematrix:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "tonematrix:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "tonematrix:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "tonematrix:5": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.UINT32,
      default: 0,
      range: { min: 0, max: 7 }
    },
    fieldName: "patternIndex"
  },
  "tonematrix:6": {
    type: "array",
    targetTypes: [],
    fieldName: "patternSlots",
    length: 8
  },
  "tonematrix:6:[]": {
    type: "object",
    targetTypes: ["TonematrixPatternSlot"],
    fieldName: "[]"
  },
  "tonematrix:7": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "MicroTuning",
      required: false
    },
    fieldName: "microTuning"
  },
  "tonematrix:8": {
    type: "object",
    targetTypes: ["NotesOutput"],
    fieldName: "noteOutput"
  },
  "tonematrix:9": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "tonematrix:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  tonematrixPattern: {
    type: "entity",
    targetTypes: [],
    typeKey: "tonematrixPattern"
  },
  "tonematrixPattern:2": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "TonematrixPatternSlot",
      required: true
    },
    fieldName: "slot"
  },
  "tonematrixPattern:3": {
    type: "array",
    targetTypes: [],
    fieldName: "steps",
    length: 16
  },
  "tonematrixPattern:3:[]": {
    type: "object",
    targetTypes: [],
    fieldName: "[]"
  },
  "tonematrixPattern:3:[]:1": {
    type: "array",
    targetTypes: [],
    fieldName: "notes",
    length: 16
  },
  "tonematrixPattern:3:[]:1:[]": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "[]"
  },
  "tonematrixPattern:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "nexus-location",
      targets: "Groove",
      required: false
    },
    fieldName: "groove"
  },
  waveshaper: {
    type: "entity",
    targetTypes: ["Waveshaper"],
    typeKey: "waveshaper"
  },
  "waveshaper:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "string",
      scalarType: ScalarType.STRING,
      maxByteLength: 500
    },
    fieldName: "displayName"
  },
  "waveshaper:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionX"
  },
  "waveshaper:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.INT32,
      default: 0,
      range: { min: -2147483648, max: 2147483647 }
    },
    fieldName: "positionY"
  },
  "waveshaper:5": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2.818382978439331 }
    },
    fieldName: "preGain"
  },
  "waveshaper:6": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "mix"
  },
  "waveshaper:8": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "autoDrive"
  },
  "waveshaper:9": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 5,
      range: { min: 1, max: 1e3 }
    },
    fieldName: "attackMs"
  },
  "waveshaper:10": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 50,
      range: { min: 1, max: 1e3 }
    },
    fieldName: "releaseMs"
  },
  "waveshaper:11": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 2.818382978439331 }
    },
    fieldName: "thresholdGain"
  },
  "waveshaper:12": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: false
    },
    fieldName: "invertEnvelope"
  },
  "waveshaper:13": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "finalSlope"
  },
  "waveshaper:14": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 1,
      range: { min: 0, max: 1 }
    },
    fieldName: "finalY"
  },
  "waveshaper:15": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "audioInput"
  },
  "waveshaper:16": {
    type: "object",
    targetTypes: ["AudioInput"],
    fieldName: "sideChainInput"
  },
  "waveshaper:17": {
    type: "object",
    targetTypes: ["AudioOutput"],
    fieldName: "audioOutput"
  },
  "waveshaper:18": {
    type: "primitive",
    targetTypes: ["AutomatableParameter"],
    immutable: false,
    primitive: {
      type: "boolean",
      scalarType: ScalarType.BOOL,
      default: true
    },
    fieldName: "isActive"
  },
  waveshaperAnchor: {
    type: "entity",
    targetTypes: [],
    typeKey: "waveshaperAnchor"
  },
  "waveshaperAnchor:2": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "x"
  },
  "waveshaperAnchor:3": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: 0, max: 1 }
    },
    fieldName: "y"
  },
  "waveshaperAnchor:4": {
    type: "primitive",
    targetTypes: [],
    immutable: false,
    primitive: {
      type: "number",
      scalarType: ScalarType.FLOAT,
      default: 0,
      range: { min: -1, max: 1 }
    },
    fieldName: "slope"
  },
  "waveshaperAnchor:5": {
    type: "primitive",
    targetTypes: [],
    immutable: true,
    primitive: {
      type: "nexus-location",
      targets: "Waveshaper",
      required: true
    },
    fieldName: "waveshaper"
  }
};
var T5 = (i2) => g6[i2] ?? s("no information found for schema location: " + i2);
var x5 = (i2) => {
  const t2 = (p5, r2) => p5.fields.list().find((l4) => l4.localName === r2) ?? s(`can't find field "${r2}"`), m4 = [], [s3, n3, y7, ...b7] = i2.split("/");
  if (n3 === "")
    throw new Error("path is empty");
  if (y7 === void 0)
    return {
      entityType: n3,
      fieldIndex: []
    };
  const u4 = us[n3];
  let a4 = t2(u4, y7);
  m4.push(a4.no);
  for (const p5 of b7) {
    const r2 = (/\[(\d+)\]/.exec(p5) ?? [])[1];
    if (r2 !== void 0) {
      m4.push(Number(r2));
      continue;
    }
    if (a4.kind !== "message")
      throw new Error(
        `expected message field. have ${a4.kind}, for element "${p5}", for path "${i2}"`
      );
    a4 = t2(a4.T, p5), m4.push(a4.no);
  }
  return {
    entityType: n3,
    fieldIndex: m4
  };
};
var O5 = (i2) => {
  const { entityType: t2, fieldIndex: m4 } = i2;
  if (t2 === void 0)
    throw new Error("schema location has no entity type");
  const [s3, ...n3] = m4, y7 = (r2, l4) => `can't find field '${r2}' at index ${l4} of path [${m4.join(
    ", "
  )}] for entity type '${t2}'`, b7 = us[t2];
  if (b7 === void 0)
    throw new Error(`unknown entity type: ${t2}`);
  let u4 = `/${t2}`;
  if (s3 === void 0)
    return u4;
  let a4 = b7.fields.find(s3);
  if (u4 += "/" + ((a4 == null ? void 0 : a4.localName) ?? s(new Error(y7(s3, 1)))), a4 === void 0)
    throw new Error(y7(s3, 1));
  let p5 = false;
  for (const [r2, l4] of n3.entries()) {
    if (a4.repeated && !p5) {
      u4 += `/[${l4}]`, p5 = true;
      continue;
    }
    if (a4.kind !== "message")
      throw new Error(y7(l4, r2 + 1));
    a4 = a4.T.fields.find(l4) ?? s(new Error(y7(l4, r2 + 1))), u4 += `/${a4.localName}`, p5 = false;
  }
  return u4;
};
var v6 = (i2) => {
  c(i2.entityType !== void 0, "location has no entity type");
  let t2 = i2.entityType, m4 = false;
  for (const s3 of i2.fieldIndex) {
    if (m4) {
      t2 += ":[]", m4 = false;
      continue;
    }
    t2 += `:${s3}`, m4 = T5(t2).type === "array";
  }
  return t2;
};
var P5 = (i2) => {
  const t2 = T5(
    v6(i2)
  );
  switch (t2.type) {
    case "entity":
    case "array":
      return t2;
    case "primitive":
    case "object":
      return t2.fieldName === "[]" ? { ...t2, index: i2.fieldIndex.at(-1) ?? s() } : t2;
  }
};

// node_modules/@audiotool/nexus/dist/index.js
var import_toposort = __toESM(require_toposort(), 1);
var Wt5 = Object.defineProperty;
var jt5 = (i2) => {
  throw TypeError(i2);
};
var Gt5 = (i2, e, t2) => e in i2 ? Wt5(i2, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : i2[e] = t2;
var a3 = (i2, e, t2) => Gt5(i2, typeof e != "symbol" ? e + "" : e, t2);
var At5 = (i2, e, t2) => e.has(i2) || jt5("Cannot " + t2);
var s2 = (i2, e, t2) => (At5(i2, e, "read from private field"), t2 ? t2.call(i2) : e.get(i2));
var h6 = (i2, e, t2) => e.has(i2) ? jt5("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i2) : e.set(i2, t2);
var g7 = (i2, e, t2, n3) => (At5(i2, e, "write to private field"), n3 ? n3.call(i2, t2) : e.set(i2, t2), t2);
var y6 = (i2, e, t2) => (At5(i2, e, "access private method"), t2);
var L5 = class L6 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    a3(this, "clientId", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new L6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new L6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new L6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(L6, t2, n3);
  }
};
a3(L5, "runtime", proto3), a3(L5, "typeName", "audiotool.document.v1.AttachMetadataRequest"), a3(L5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "client_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var AttachMetadataRequest = L5;
var U5 = class U6 extends Message {
  constructor(t2) {
    super();
    a3(this, "sourceName", "");
    a3(this, "clientId", "");
    a3(this, "clientCoordinates");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new U6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new U6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new U6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(U6, t2, n3);
  }
};
a3(U5, "runtime", proto3), a3(U5, "typeName", "audiotool.document.v1.AttachMetadataResponse"), a3(U5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "source_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "client_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "client_coordinates", kind: "message", T: ClientCoordinates }
]));
var AttachMetadataResponse = U5;
var B5 = class B6 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    a3(this, "clientId", "");
    a3(this, "clientCoordinates");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new B6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new B6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new B6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(B6, t2, n3);
  }
};
a3(B5, "runtime", proto3), a3(B5, "typeName", "audiotool.document.v1.PutMetadataRequest"), a3(B5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "client_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 3, name: "client_coordinates", kind: "message", T: ClientCoordinates }
]));
var PutMetadataRequest = B5;
var C5 = class C6 extends Message {
  constructor(e) {
    super(), proto3.util.initPartial(e, this);
  }
  static fromBinary(e, t2) {
    return new C6().fromBinary(e, t2);
  }
  static fromJson(e, t2) {
    return new C6().fromJson(e, t2);
  }
  static fromJsonString(e, t2) {
    return new C6().fromJsonString(e, t2);
  }
  static equals(e, t2) {
    return proto3.util.equals(C6, e, t2);
  }
};
a3(C5, "runtime", proto3), a3(C5, "typeName", "audiotool.document.v1.PutMetadataResponse"), a3(C5, "fields", proto3.util.newFieldList(() => []));
var PutMetadataResponse = C5;
var A6 = class A7 extends Message {
  constructor(t2) {
    super();
    a3(this, "x", 0);
    a3(this, "y", 0);
    a3(this, "context", "");
    a3(this, "contextHeight", 0);
    a3(this, "contextWidth", 0);
    a3(this, "contextX", 0);
    a3(this, "contextY", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new A7().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new A7().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new A7().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(A7, t2, n3);
  }
};
a3(A6, "runtime", proto3), a3(A6, "typeName", "audiotool.document.v1.ClientCoordinates"), a3(A6, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "x",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 2,
    name: "y",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 3,
    name: "context",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 4,
    name: "context_height",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 5,
    name: "context_width",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 6,
    name: "context_x",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  },
  {
    no: 7,
    name: "context_y",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  }
]));
var ClientCoordinates = A6;
var D5 = class D6 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    a3(this, "filter", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new D6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new D6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new D6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(D6, t2, n3);
  }
};
a3(D5, "runtime", proto3), a3(D5, "typeName", "audiotool.document.v1.GetEntitiesRequest"), a3(D5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "filter",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var GetEntitiesRequest = D5;
var q5 = class q6 extends Message {
  constructor(t2) {
    super();
    a3(this, "entities", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new q6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new q6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new q6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(q6, t2, n3);
  }
};
a3(q5, "runtime", proto3), a3(q5, "typeName", "audiotool.document.v1.GetEntitiesResponse"), a3(q5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "entities", kind: "message", T: Any, repeated: true }
]));
var GetEntitiesResponse = q5;
var O6 = class O7 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    a3(this, "commitIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new O7().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new O7().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new O7().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(O7, t2, n3);
  }
};
a3(O6, "runtime", proto3), a3(O6, "typeName", "audiotool.document.v1.AttachRequest"), a3(O6, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "commit_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var AttachRequest = O6;
var R5 = class R6 extends Message {
  constructor(t2) {
    super();
    a3(this, "message", { case: void 0 });
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new R6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new R6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new R6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(R6, t2, n3);
  }
};
a3(R5, "runtime", proto3), a3(R5, "typeName", "audiotool.document.v1.AttachResponse"), a3(R5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "transaction", kind: "message", T: Transaction, oneof: "message" },
  { no: 2, name: "noop", kind: "message", T: Noop, oneof: "message" }
]));
var AttachResponse = R5;
var j5 = class j6 extends Message {
  constructor(t2) {
    super();
    a3(this, "serverCommitIndex", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new j6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new j6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new j6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(j6, t2, n3);
  }
};
a3(j5, "runtime", proto3), a3(j5, "typeName", "audiotool.document.v1.Noop"), a3(j5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "server_commit_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var Noop = j5;
var $5 = class $6 extends Message {
  constructor(t2) {
    super();
    a3(this, "message", { case: void 0 });
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new $6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new $6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new $6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals($6, t2, n3);
  }
};
a3($5, "runtime", proto3), a3($5, "typeName", "audiotool.document.v1.ModifyRequest"), a3($5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "project_name", kind: "scalar", T: 9, oneof: "message" },
  { no: 2, name: "transaction", kind: "message", T: Transaction, oneof: "message" }
]));
var ModifyRequest = $5;
var V6 = class V7 extends Message {
  constructor(t2) {
    super();
    a3(this, "error", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new V7().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new V7().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new V7().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(V7, t2, n3);
  }
};
a3(V6, "runtime", proto3), a3(V6, "typeName", "audiotool.document.v1.ModifyResponse"), a3(V6, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "error",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var ModifyResponse = V6;
var W5 = class W6 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    a3(this, "transactions", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new W6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new W6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new W6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(W6, t2, n3);
  }
};
a3(W5, "runtime", proto3), a3(W5, "typeName", "audiotool.document.v1.ApplyTransactionsRequest"), a3(W5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  { no: 2, name: "transactions", kind: "message", T: Transaction, repeated: true }
]));
var ApplyTransactionsRequest = W5;
var G5 = class G6 extends Message {
  constructor(t2) {
    super();
    a3(this, "errors", {});
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new G6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new G6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new G6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(G6, t2, n3);
  }
};
a3(G5, "runtime", proto3), a3(G5, "typeName", "audiotool.document.v1.ApplyTransactionsResponse"), a3(G5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "errors", kind: "map", K: 9, V: {
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  } }
]));
var ApplyTransactionsResponse = G5;
var z5 = class z6 extends Message {
  constructor(t2) {
    super();
    a3(this, "id", "");
    a3(this, "commitIndex", 0);
    a3(this, "modifications", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new z6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new z6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new z6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(z6, t2, n3);
  }
};
a3(z5, "runtime", proto3), a3(z5, "typeName", "audiotool.document.v1.Transaction"), a3(z5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "commit_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  { no: 3, name: "modifications", kind: "message", T: Modification, repeated: true }
]));
var Transaction = z5;
var K5 = class K6 extends Message {
  constructor(t2) {
    super();
    a3(this, "modification", { case: void 0 });
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new K6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new K6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new K6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(K6, t2, n3);
  }
};
a3(K5, "runtime", proto3), a3(K5, "typeName", "audiotool.document.v1.Modification"), a3(K5, "fields", proto3.util.newFieldList(() => [
  { no: 2, name: "create", kind: "message", T: Create, oneof: "modification" },
  { no: 3, name: "delete", kind: "message", T: Delete, oneof: "modification" },
  { no: 4, name: "update", kind: "message", T: Update, oneof: "modification" }
]));
var Modification = K5;
var H5 = class H6 extends Message {
  constructor(t2) {
    super();
    a3(this, "entity");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new H6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new H6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new H6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(H6, t2, n3);
  }
};
a3(H5, "runtime", proto3), a3(H5, "typeName", "audiotool.document.v1.Create"), a3(H5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "entity", kind: "message", T: Any }
]));
var Create = H5;
var Q5 = class Q6 extends Message {
  constructor(t2) {
    super();
    a3(this, "field");
    a3(this, "value", { case: void 0 });
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Q6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Q6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Q6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Q6, t2, n3);
  }
};
a3(Q5, "runtime", proto3), a3(Q5, "typeName", "audiotool.document.v1.Update"), a3(Q5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "field", kind: "message", T: r },
  { no: 2, name: "double", kind: "scalar", T: 1, oneof: "value" },
  { no: 3, name: "float", kind: "scalar", T: 2, oneof: "value" },
  { no: 4, name: "int32", kind: "scalar", T: 5, oneof: "value" },
  { no: 5, name: "int64", kind: "scalar", T: 3, oneof: "value" },
  { no: 6, name: "uint32", kind: "scalar", T: 13, oneof: "value" },
  { no: 7, name: "uint64", kind: "scalar", T: 4, oneof: "value" },
  { no: 8, name: "sint32", kind: "scalar", T: 17, oneof: "value" },
  { no: 9, name: "sint64", kind: "scalar", T: 18, oneof: "value" },
  { no: 10, name: "fixed32", kind: "scalar", T: 7, oneof: "value" },
  { no: 11, name: "fixed64", kind: "scalar", T: 6, oneof: "value" },
  { no: 12, name: "sfixed32", kind: "scalar", T: 15, oneof: "value" },
  { no: 13, name: "sfixed64", kind: "scalar", T: 16, oneof: "value" },
  { no: 14, name: "bool", kind: "scalar", T: 8, oneof: "value" },
  { no: 15, name: "string", kind: "scalar", T: 9, oneof: "value" },
  { no: 16, name: "bytes", kind: "scalar", T: 12, oneof: "value" },
  { no: 17, name: "pointer", kind: "message", T: r, oneof: "value" }
]));
var Update = Q5;
var X5 = class X6 extends Message {
  constructor(t2) {
    super();
    a3(this, "entityId", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new X6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new X6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new X6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(X6, t2, n3);
  }
};
a3(X5, "runtime", proto3), a3(X5, "typeName", "audiotool.document.v1.Delete"), a3(X5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "entity_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var Delete = X5;
var Y5 = class Y6 extends Message {
  constructor(e) {
    super(), proto3.util.initPartial(e, this);
  }
  static fromBinary(e, t2) {
    return new Y6().fromBinary(e, t2);
  }
  static fromJson(e, t2) {
    return new Y6().fromJson(e, t2);
  }
  static fromJsonString(e, t2) {
    return new Y6().fromJsonString(e, t2);
  }
  static equals(e, t2) {
    return proto3.util.equals(Y6, e, t2);
  }
};
a3(Y5, "runtime", proto3), a3(Y5, "typeName", "audiotool.document.v1.GetWasmRequest"), a3(Y5, "fields", proto3.util.newFieldList(() => []));
var GetWasmRequest = Y5;
var Z5 = class Z6 extends Message {
  constructor(t2) {
    super();
    a3(this, "data", new Uint8Array(0));
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new Z6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new Z6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new Z6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(Z6, t2, n3);
  }
};
a3(Z5, "runtime", proto3), a3(Z5, "typeName", "audiotool.document.v1.GetWasmResponse"), a3(Z5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }
]));
var GetWasmResponse = Z5;
var _6 = class _7 extends Message {
  constructor(e) {
    super(), proto3.util.initPartial(e, this);
  }
  static fromBinary(e, t2) {
    return new _7().fromBinary(e, t2);
  }
  static fromJson(e, t2) {
    return new _7().fromJson(e, t2);
  }
  static fromJsonString(e, t2) {
    return new _7().fromJsonString(e, t2);
  }
  static equals(e, t2) {
    return proto3.util.equals(_7, e, t2);
  }
};
a3(_6, "runtime", proto3), a3(_6, "typeName", "audiotool.document.v1.GetWasmExecRequest"), a3(_6, "fields", proto3.util.newFieldList(() => []));
var GetWasmExecRequest = _6;
var tt5 = class tt6 extends Message {
  constructor(t2) {
    super();
    a3(this, "data", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new tt6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new tt6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new tt6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(tt6, t2, n3);
  }
};
a3(tt5, "runtime", proto3), a3(tt5, "typeName", "audiotool.document.v1.GetWasmExecResponse"), a3(tt5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "data",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var GetWasmExecResponse = tt5;
var et5 = class et6 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    a3(this, "clientId", "");
    a3(this, "lastPingMs", 0);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new et6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new et6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new et6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(et6, t2, n3);
  }
};
a3(et5, "runtime", proto3), a3(et5, "typeName", "audiotool.document.v1.PingRequest"), a3(et5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "client_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 3,
    name: "last_ping_ms",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }
]));
var PingRequest = et5;
var nt5 = class nt6 extends Message {
  constructor(e) {
    super(), proto3.util.initPartial(e, this);
  }
  static fromBinary(e, t2) {
    return new nt6().fromBinary(e, t2);
  }
  static fromJson(e, t2) {
    return new nt6().fromJson(e, t2);
  }
  static fromJsonString(e, t2) {
    return new nt6().fromJsonString(e, t2);
  }
  static equals(e, t2) {
    return proto3.util.equals(nt6, e, t2);
  }
};
a3(nt5, "runtime", proto3), a3(nt5, "typeName", "audiotool.document.v1.PingResponse"), a3(nt5, "fields", proto3.util.newFieldList(() => []));
var PingResponse = nt5;
var it5 = class it6 extends Message {
  constructor(t2) {
    super();
    a3(this, "projectName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new it6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new it6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new it6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(it6, t2, n3);
  }
};
a3(it5, "runtime", proto3), a3(it5, "typeName", "audiotool.document.v1.GetClientStatsRequest"), a3(it5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "project_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var GetClientStatsRequest = it5;
var ot5 = class ot6 extends Message {
  constructor(t2) {
    super();
    a3(this, "clientInfo", []);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new ot6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new ot6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new ot6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(ot6, t2, n3);
  }
};
a3(ot5, "runtime", proto3), a3(ot5, "typeName", "audiotool.document.v1.GetClientStatsResponse"), a3(ot5, "fields", proto3.util.newFieldList(() => [
  { no: 1, name: "client_info", kind: "message", T: ClientInfo, repeated: true }
]));
var GetClientStatsResponse = ot5;
var rt5 = class rt6 extends Message {
  constructor(t2) {
    super();
    a3(this, "id", "");
    a3(this, "pingMs", 0);
    a3(this, "offline", false);
    a3(this, "sourceName", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new rt6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new rt6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new rt6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(rt6, t2, n3);
  }
};
a3(rt5, "runtime", proto3), a3(rt5, "typeName", "audiotool.document.v1.ClientInfo"), a3(rt5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  },
  {
    no: 2,
    name: "ping_ms",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  },
  {
    no: 3,
    name: "offline",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  },
  {
    no: 4,
    name: "source_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var ClientInfo = rt5;
var at5 = class at6 extends Message {
  constructor(e) {
    super(), proto3.util.initPartial(e, this);
  }
  static fromBinary(e, t2) {
    return new at6().fromBinary(e, t2);
  }
  static fromJson(e, t2) {
    return new at6().fromJson(e, t2);
  }
  static fromJsonString(e, t2) {
    return new at6().fromJsonString(e, t2);
  }
  static equals(e, t2) {
    return proto3.util.equals(at6, e, t2);
  }
};
a3(at5, "runtime", proto3), a3(at5, "typeName", "audiotool.document.v1.GetVersionRequest"), a3(at5, "fields", proto3.util.newFieldList(() => []));
var GetVersionRequest = at5;
var st5 = class st6 extends Message {
  constructor(t2) {
    super();
    a3(this, "version", "");
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new st6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new st6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new st6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(st6, t2, n3);
  }
};
a3(st5, "runtime", proto3), a3(st5, "typeName", "audiotool.document.v1.GetVersionResponse"), a3(st5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "version",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }
]));
var GetVersionResponse = st5;
var ct5 = class ct6 extends Message {
  constructor(e) {
    super(), proto3.util.initPartial(e, this);
  }
  static fromBinary(e, t2) {
    return new ct6().fromBinary(e, t2);
  }
  static fromJson(e, t2) {
    return new ct6().fromJson(e, t2);
  }
  static fromJsonString(e, t2) {
    return new ct6().fromJsonString(e, t2);
  }
  static equals(e, t2) {
    return proto3.util.equals(ct6, e, t2);
  }
};
a3(ct5, "runtime", proto3), a3(ct5, "typeName", "audiotool.document.v1.GetTimeRequest"), a3(ct5, "fields", proto3.util.newFieldList(() => []));
var GetTimeRequest = ct5;
var dt5 = class dt6 extends Message {
  constructor(t2) {
    super();
    a3(this, "time", protoInt64.zero);
    proto3.util.initPartial(t2, this);
  }
  static fromBinary(t2, n3) {
    return new dt6().fromBinary(t2, n3);
  }
  static fromJson(t2, n3) {
    return new dt6().fromJson(t2, n3);
  }
  static fromJsonString(t2, n3) {
    return new dt6().fromJsonString(t2, n3);
  }
  static equals(t2, n3) {
    return proto3.util.equals(dt6, t2, n3);
  }
};
a3(dt5, "runtime", proto3), a3(dt5, "typeName", "audiotool.document.v1.GetTimeResponse"), a3(dt5, "fields", proto3.util.newFieldList(() => [
  {
    no: 1,
    name: "time",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }
]));
var GetTimeResponse = dt5;
var wasmUrl = "/document_validator.wasm";
var wasmJsUrl = "/wasm_exec.js";
var runningInNode = false;
var wasmDocumentStateBuilderCache;
var getWasmDocumentState = async () => {
  if (wasmDocumentStateBuilderCache !== void 0)
    return (await wasmDocumentStateBuilderCache)();
  const { promise: i2, resolve: e } = Promise.withResolvers();
  wasmDocumentStateBuilderCache = i2;
  const t2 = executeWrapperJs(), n3 = loadWasm();
  await t2;
  const o3 = globalThis.Go ?? s("wasm wrapper initialization failed: Go not defined"), r2 = new o3();
  try {
    await n3;
    const d4 = await WebAssembly.instantiate(
      await n3,
      r2.importObject
    );
    r2.run(d4);
  } catch (d4) {
    throw new Error("Failed to instantiate validator WASM", { cause: d4 });
  }
  delete globalThis.Go;
  const c5 = (
    // createDocumentState is attached to globalThis by the executed wasm code
    globalThis.createDocumentState ?? s("wasm initialization failed: createDocumentState not defined")
  );
  return delete globalThis.createDocumentState, e(() => {
    const d4 = c5();
    let u4 = false;
    return {
      applyTransaction(f6) {
        c(
          !u4,
          "tried applying a transaction after document state was terminated"
        );
        const m4 = d4.applyTransaction(f6.toBinary());
        return m4 instanceof Object && "error" in m4 ? m4.error : new Transaction({
          modifications: m4.rollbacks.map((p5) => Modification.fromBinary(p5))
        });
      },
      terminate() {
        u4 = true, d4.delete();
      }
    };
  }), (await i2)();
};
var executeWrapperJs = async () => {
  return import("https://cdn.audiotool.com/website-assets/document-service/5b85be5b151fe1c949845fe34b15f24ab059c736//wasm_exec.js");
};
var loadWasm = async () => {
  return await fetch(
    "https://cdn.audiotool.com/website-assets/document-service/5b85be5b151fe1c949845fe34b15f24ab059c736//document_validator.wasm.gz"
  ).then(
    async (o3) => o3.ok ? WebAssembly.compileStreaming(o3) : s("couldn't fetch wasm module")
  );
};
var I5;
var b6;
var NexusStateConsolidator = class {
  constructor(e) {
    h6(this, I5);
    h6(this, b6, []);
    g7(this, I5, e);
  }
  /**
   * Consolidate the local and remote transaction history.
   *
   * @param newReceived Newly received transaction from the remote
   * @param newReceivedRejected Newly received transaction rejections from the remote. **must be a subset of previously created transactions**
   * @param newCreated Newly created transactions on the local document
   * @returns Transactions needed to sync local & remote, plus transactions created but not yet received
   */
  consolidate(e, t2, n3) {
    n3.forEach((l4) => {
      const d4 = s2(this, I5).applyTransaction(l4);
      if (!(d4 instanceof Transaction))
        throw new Error(`Error applying reverse transaction: ${d4}`);
      s2(this, b6).push([l4, d4]);
    });
    let o3 = e[0], r2 = s2(this, b6)[0];
    for (; o3 !== void 0 && r2 !== void 0 && o3.id === r2[0].id; )
      e.shift(), s2(this, b6).shift(), o3 = e[0], r2 = s2(this, b6)[0];
    if (e.length === 0) {
      if (t2.size === 0)
        return [];
      const l4 = s2(this, b6).findIndex(
        ([m4]) => t2.has(m4.id)
      );
      if (l4 === -1)
        throw new Error(
          "Invariant violation: expected to find rejected transaction in #pending, but didn't. This is a bug."
        );
      const d4 = s2(this, b6).splice(l4), u4 = d4.map(([, m4]) => {
        if (!(s2(this, I5).applyTransaction(m4) instanceof Transaction))
          throw new Error("error applying reversal of transaction");
        return m4;
      }).reverse(), f6 = d4.filter(([m4]) => !t2.has(m4.id)).map(([m4]) => {
        const p5 = s2(this, I5).applyTransaction(m4);
        if (p5 instanceof Transaction)
          return [m4, p5];
      }).filter((m4) => m4 !== void 0);
      return s2(this, b6).push(...f6), [...u4, ...f6.map(([m4]) => m4)];
    }
    const c5 = s2(this, b6).map((l4) => l4[1].clone()).reverse();
    return c5.forEach((l4) => {
      const d4 = s2(this, I5).applyTransaction(l4);
      if (!(d4 instanceof Transaction))
        throw new Error(`Error applying reverse transaction: ${d4}`);
    }), e.forEach((l4) => {
      const d4 = s2(this, I5).applyTransaction(l4);
      if (!(d4 instanceof Transaction))
        throw new Error(`Error applying incoming transaction: ${d4}`);
    }), g7(this, b6, s2(this, b6).filter(([l4]) => {
      const d4 = t2.has(l4.id), u4 = e.some(
        (f6) => f6.id === l4.id
      );
      return !d4 && !u4;
    }).map(([l4]) => {
      const d4 = s2(this, I5).applyTransaction(l4);
      return d4 instanceof Transaction ? [l4, d4] : void 0;
    }).filter((l4) => l4 !== void 0)), [
      ...c5,
      ...e,
      ...s2(this, b6).map(([l4]) => l4)
    ];
  }
};
I5 = /* @__PURE__ */ new WeakMap(), b6 = /* @__PURE__ */ new WeakMap();
var combinedValueNotifiersWithAnd = (...i2) => {
  const e = new E4(true), t2 = () => e.setValue(i2.every((n3) => n3.getValue()));
  return i2.forEach((n3) => n3.subscribe(() => t2())), t2(), e;
};
var createPingNotifier = (i2, e, t2) => {
  const n3 = new A5(), o3 = new E4(0), r2 = new E4(true);
  n3.subscribe((l4) => {
    r2.setValue(l4);
  });
  const c5 = w(
    async (l4) => {
      const d4 = Date.now(), u4 = await i2.ping(
        {
          clientId: (t2 == null ? void 0 : t2.clientId) ?? "undefined",
          projectName: e,
          // required by backend
          lastPingMs: Math.floor(o3.getValue())
        },
        {
          onRetry: () => n3.notify(false),
          signal: l4
        }
      );
      if (!l4.aborted) {
        if (u4 instanceof Error)
          throw u4;
        n3.notify(true), o3.setValue(Date.now() - d4);
      }
    },
    1e3,
    { immediateTrigger: true }
  );
  return {
    pingCallResults: n3,
    connectionOk: r2,
    pingMs: o3,
    terminate: () => {
      n3.terminate(), c5.terminate(), r2.terminate(), o3.terminate();
    }
  };
};
var createTransactionReceiver = (i2, e, t2) => {
  const n3 = new E4(true);
  let o3 = 0;
  const r2 = new AbortController();
  let c5 = new AbortController(), l4 = false;
  const d4 = () => (c5.abort(), c5 = new AbortController(), i2.attach(
    { projectName: e, commitIndex: o3 },
    {
      signal: AbortSignal.any([
        c5.signal,
        r2.signal
      ])
    }
  )[Symbol.asyncIterator]());
  let u4 = d4();
  const f6 = 1e3;
  return {
    nextTransactionIterator: (async function* () {
      for (; ; )
        try {
          const { value: p5, done: w7 } = await u4.next();
          if (w7 ?? false)
            throw new Error("document service attach stream closed");
          switch (n3.setValue(true), p5.message.case) {
            case "noop": {
              if (!l4) {
                l4 = true, yield new Transaction({ id: crypto.randomUUID() });
                continue;
              }
              continue;
            }
            case "transaction": {
              o3 = p5.message.value.commitIndex, l4 = true, yield p5.message.value;
              continue;
            }
            default:
              throw new Error(
                `received attach response with unknown message case: ${p5.message.case}`
              );
          }
        } catch (p5) {
          if (r2.signal.aborted)
            return;
          if (!(p5 instanceof ConnectError))
            throw p5;
          switch (p5.code) {
            case Code.Canceled:
            // thrown if abort controller is aborted
            case Code.Aborted:
            case Code.Unavailable:
            case Code.Unknown: {
              if (n3.setValue(false), await i(
                f6 + Math.random() * f6 * 0.1,
                // pass in master abort controller for early termination
                r2.signal
              ), r2.signal.aborted)
                return;
              u4 = d4();
              continue;
            }
            // else throw
            default:
              throw p5.code === Code.OutOfRange ? new Error(
                "local document state too far in the past, must reload tab"
              ) : p5;
          }
        }
    })(),
    terminate: () => r2.abort(),
    reconnect: () => c5.abort(),
    connectionOk: n3
  };
};
var createTransactionSender = (i2, e) => {
  const t2 = new E4(true), n3 = [], o3 = promiseBarrier();
  let r2;
  return (async () => {
    for (; ; ) {
      const l4 = n3.splice(0);
      if (l4.length === 0) {
        if (r2 !== void 0) {
          r2.resolve();
          return;
        }
        await o3.wait;
        continue;
      }
      const d4 = await i2.applyTransactions(
        {
          projectName: e,
          transactions: l4.map(([u4]) => u4)
        },
        {
          callIsOk: t2
        }
        // no signal passed: we want to send everything
      );
      if (d4 instanceof Error)
        throw new Error("error sending transaction", { cause: d4 });
      l4.forEach(([u4, f6]) => {
        f6(d4.errors[u4.id] ?? void 0);
      });
    }
  })(), {
    sendNextTransaction: async (l4) => {
      if (r2 !== void 0)
        throw new Error("tried sending transaction after termination");
      const { promise: d4, resolve: u4 } = Promise.withResolvers();
      return n3.push([l4, u4]), o3.signal(), d4;
    },
    terminate: async () => {
      if (r2 !== void 0) {
        await r2.promise;
        return;
      }
      r2 = Promise.withResolvers(), o3.signal(), t2.terminate(), await r2.promise, n3.length > 0 && console.error(
        "invariant violation: nextBatch not empty after termination; have:",
        n3.length,
        "transactions left"
      );
    },
    connectionOk: t2
  };
};
var promiseBarrier = () => {
  let { promise: i2, resolve: e } = Promise.withResolvers();
  return {
    get wait() {
      return i2;
    },
    signal: () => {
      e(), { promise: i2, resolve: e } = Promise.withResolvers();
    }
  };
};
var createDocumentServiceConnection = (i2, e, t2) => {
  const n3 = createPingNotifier(i2, e, {}), o3 = createTransactionReceiver(
    i2,
    e
  ), r2 = createTransactionSender(
    i2,
    e
  ), c5 = combinedValueNotifiersWithAnd(
    n3.connectionOk,
    o3.connectionOk,
    r2.connectionOk
  );
  return n3.pingCallResults.subscribe((l4) => {
    l4 || o3.reconnect();
  }), {
    receiveNextTransaction: o3.nextTransactionIterator,
    sendNextTransaction: r2.sendNextTransaction,
    pingMs: n3.pingMs,
    connectionOk: c5,
    terminate: async () => {
      n3.terminate(), o3.terminate(), await r2.terminate(), c5.terminate();
    }
  };
};
var createCollabGateway = (i2, e, t2, n3) => {
  const o3 = new E4(false), r2 = createDocumentServiceConnection(
    i2,
    t2
  ), c5 = new NexusStateConsolidator(e), l4 = [], d4 = [], u4 = /* @__PURE__ */ new Set();
  (async () => {
    for await (const p5 of r2.receiveNextTransaction)
      l4.push(p5);
  })(), r2.connectionOk.subscribe((p5) => {
    o3.setValue(!p5);
  });
  let m4 = false;
  return {
    blocked: o3,
    send: (p5) => {
      if (m4)
        throw new Error(
          "tried sending a transaction after gateway was terminated"
        );
      p5 = p5.clone(), p5.id = crypto.randomUUID(), d4.push(p5), r2.sendNextTransaction(p5).then((w7) => {
        w7 !== void 0 && u4.add(p5.id);
      });
    },
    synchronize: () => {
      if (m4)
        return [];
      l4.length > 0;
      const p5 = c5.consolidate(
        l4,
        u4,
        d4
      );
      return l4.length = 0, u4.clear(), d4.length = 0, p5;
    },
    terminate: async () => {
      m4 = true, await r2.terminate(), l4.length = 0, u4.clear(), d4.length = 0, o3.terminate(), e.terminate();
    }
  };
};
var createWasmNexusValidator = async () => {
  const i2 = await getWasmDocumentState();
  return {
    validate: (e) => {
      const t2 = i2.applyTransaction(
        new Transaction({ modifications: [e] })
      );
      if (!(t2 instanceof Transaction))
        return t2;
    },
    terminate: () => {
      i2.terminate();
    }
  };
};
var St5;
var ht5 = class ht6 {
  constructor(e = void 0, t2 = void 0, n3 = []) {
    a3(this, "entityId");
    a3(this, "fieldIndex");
    a3(this, "entityType");
    h6(this, St5);
    if (this.entityId = e ?? "", this.fieldIndex = n3, this.entityType = t2, e !== void 0 && e !== "" && t2 === void 0)
      throw new Error("entity type is required if id is set");
  }
  isEmpty() {
    return this.entityId.length === 0;
  }
  equals(e) {
    return this.entityId === e.entityId && this.fieldIndex.length === e.fieldIndex.length && this.fieldIndex.every((t2, n3) => t2 === e.fieldIndex[n3]);
  }
  /** @internal */
  equalsPointer(e) {
    return e === void 0 ? this.isEmpty() : this.entityId === e.entityId && this.fieldIndex.length === e.fieldIndex.length && this.fieldIndex.every((t2, n3) => t2 === e.fieldIndex[n3]);
  }
  /** @internal Returns a copy of this object with an appended field number. */
  withAppendedFieldNumber(e) {
    return new ht6(this.entityId, this.entityType, [
      ...this.fieldIndex,
      e
    ]);
  }
  /** @internal */
  withFieldIndex(e) {
    return new ht6(this.entityId, this.entityType, [...e]);
  }
  /** @internal */
  toPointerMessage() {
    return new r({
      entityId: this.entityId,
      fieldIndex: this.fieldIndex.slice()
    });
  }
  get [w6]() {
    return s2(this, St5) === void 0 && g7(this, St5, hashNexusLocation(this.entityId, this.fieldIndex)), s2(this, St5);
  }
  /** Returns a human readable string representation */
  toString() {
    if (this.isEmpty())
      return "[empty location]";
    const e = O5(this);
    return `[location: ${this.entityId}${e}]`;
  }
  /** @internal clones the location, updating only the id */
  withId(e) {
    return new ht6(e, this.entityType, this.fieldIndex.slice());
  }
  /** @internal */
  static fromPointerMessage(e, t2) {
    if (t2.entityId === void 0 || t2.entityId === "")
      return new ht6();
    const n3 = e(t2.entityId);
    if (n3 === void 0)
      throw new Error(
        `entity type for ${t2.entityId} is undefined for a set pointer: ${t2.toJsonString()}`
      );
    return new ht6(t2.entityId, n3, t2.fieldIndex.slice());
  }
  /** @internal */
  static fromSchemaPath(e, t2) {
    const { entityType: n3, fieldIndex: o3 } = x5(t2);
    return new ht6(e, n3, o3);
  }
};
St5 = /* @__PURE__ */ new WeakMap();
var NexusLocation = ht5;
var hashNexusLocation = (i2, e) => v5_default(
  `${i2}/${e.join(",")}`,
  "4f4aaf81-65f2-4239-b1df-e34a0729f6b8"
);
var protoPrecision = {
  // non-numbers:
  // already boolean
  bool: (i2) => i2,
  // already string
  string: (i2) => i2,
  // already pointer (NexusLocation)
  pointer: (i2) => i2,
  // unused & nothing to truncate
  bytes: (i2) => i2,
  // floats
  // single-precision float
  float: (i2) => Math.fround(i2),
  // double precision float
  double: (i2) => i2,
  // 32 bit integers
  // 32 bit signed integer
  int32: (i2) => toInt32(i2),
  // 32 bit unsigned integer
  uint32: (i2) => toUint32(i2),
  // alternative signed 32 bit integer
  sint32: (i2) => toInt32(i2),
  // alternative unsigned 32 bit integer
  fixed32: (i2) => toUint32(i2),
  // 64 bit signed integer, bigint
  // alternative signed 32 bit integer
  sfixed32: (i2) => toInt32(i2),
  // 64 bit integers
  // 64 bit signed integer, bigint
  int64: (i2) => toInt64(i2),
  // 64 bit unsigned integer, bigint
  uint64: (i2) => toUint64(i2),
  // alternative signed 64 bit integer
  sint64: (i2) => toInt64(i2),
  // alternative unsigned 64 bit integer
  fixed64: (i2) => toUint64(i2),
  // alternative signed 64 bit integer
  sfixed64: (i2) => toInt64(i2)
};
var i32max = 2147483647;
var i32min = -2147483648;
var u32max = 4294967295;
var u64maxN = 18446744073709551615n;
var u64minN = 0n;
var i64minN = -9223372036854775808n;
var i64maxN = 9223372036854775807n;
var toUint64 = (i2) => i2 < u64minN ? u64minN : i2 > u64maxN ? u64maxN : i2;
var toInt64 = (i2) => i2 > i64maxN ? i64maxN : i2 < i64minN ? i64minN : i2;
var toUint32 = (i2) => Math.max(0, Math.min(u32max, Math.trunc(i2)));
var toInt32 = (i2) => Math.max(i32min, Math.min(i32max, Math.trunc(i2)));
var ArrayField = class {
  /** @internal */
  constructor(e, t2) {
    a3(this, "location");
    a3(this, "array");
    this.location = e, this.array = t2;
  }
};
var Et5;
var PrimitiveField = class {
  /** @internal */
  constructor(e, t2, n3, o3) {
    a3(this, "location");
    h6(this, Et5);
    a3(this, "mutable");
    a3(this, "_protoType");
    this.location = e, g7(this, Et5, t2), this._protoType = n3, this.mutable = o3;
  }
  /** Get the value of the field. To set, use transactions in the document. */
  get value() {
    return s2(this, Et5);
  }
  /**
   * @internal
   *
   * Set the value of this field. Used by {@link NexusDocument}, don't use directly! */
  _setValue(e) {
    g7(this, Et5, protoPrecision[this._protoType](e));
  }
};
Et5 = /* @__PURE__ */ new WeakMap();
var NexusObject = class {
  /** @internal */
  constructor(e, t2) {
    a3(this, "fields");
    a3(this, "location");
    this.location = t2, this.fields = e;
  }
  /** @internal Returns the field with the given field number. Throws if it can't find it. */
  _getField(e) {
    return Object.values(this.fields).find(
      (t2) => t2.location.fieldIndex.at(-1) === e
    ) ?? s(
      `can't find field with number ${e} on NexusObject ${this}`
    );
  }
};
var NexusEntity = class extends NexusObject {
  /** @internal */
  constructor(t2, n3) {
    super(n3, t2);
    a3(this, "id");
    a3(this, "entityType");
    this.id = t2.entityId, this.entityType = t2.entityType;
  }
  /**
   * @internal
   *
   * Returns a field with a specific field index. Throws if it can't find it.
   */
  _resolveField(t2) {
    if (t2.length === 0)
      throw "tried resolving empty field path";
    const [n3, ...o3] = t2;
    let r2 = this._getField(n3);
    for (const c5 of o3) {
      if (r2 instanceof NexusObject) {
        r2 = r2._getField(c5);
        continue;
      }
      if (r2 instanceof ArrayField) {
        r2 = r2.array[c5];
        continue;
      }
      throw `tried resolving field number ${c5} on non-object field ${r2}`;
    }
    return r2;
  }
};
var createNexusFields = (i2, e, t2, n3) => {
  const o3 = {};
  return t2.getType().fields.list().forEach((r2) => {
    if (r2.name === "id" && r2.no === 1)
      return;
    const c5 = n3.withAppendedFieldNumber(r2.no), l4 = t2[r2.localName];
    let d4;
    if (!r2.repeated)
      d4 = createField(
        i2,
        e,
        c5,
        l4,
        r2
      );
    else {
      const u4 = l4.map(
        (f6, m4) => createField(
          i2,
          e,
          c5.withAppendedFieldNumber(m4),
          f6,
          r2
        )
      );
      d4 = new ArrayField(c5, u4);
    }
    o3[r2.localName] = d4;
  }), o3;
};
var createField = (i2, e, t2, n3, o3) => {
  switch (o3.kind) {
    case "message": {
      if (n3 instanceof r)
        return new PrimitiveField(
          t2,
          NexusLocation.fromPointerMessage(i2, n3),
          "pointer",
          !mustExtractMutability(e, t2.fieldIndex)
        );
      if (o3.T === o)
        return new NexusObject({}, t2);
      c(n3 !== void 0, `undefined value for field ${t2}`);
      const r2 = createNexusFields(
        i2,
        e,
        n3,
        t2
      );
      return new NexusObject(r2, t2);
    }
    case "scalar":
      return new PrimitiveField(
        t2,
        n3,
        scalarTypes[o3.T],
        !mustExtractMutability(e, t2.fieldIndex)
      );
    default:
      throw new Error(`unsupported field kind: ${o3.kind}`);
  }
};
var scalarTypes = {
  [ScalarType.DOUBLE]: "double",
  [ScalarType.FIXED32]: "fixed32",
  [ScalarType.FIXED64]: "fixed64",
  [ScalarType.FLOAT]: "float",
  [ScalarType.INT32]: "int32",
  [ScalarType.INT64]: "int64",
  [ScalarType.SFIXED32]: "sfixed32",
  [ScalarType.SFIXED64]: "sfixed64",
  [ScalarType.SINT32]: "sint32",
  [ScalarType.SINT64]: "sint64",
  [ScalarType.UINT32]: "uint32",
  [ScalarType.UINT64]: "uint64",
  [ScalarType.STRING]: "string",
  [ScalarType.BOOL]: "bool",
  [ScalarType.BYTES]: "bytes"
};
var mustExtractMutability = (i2, e) => {
  const t2 = P5({ entityType: i2, fieldIndex: e });
  if ((t2 == null ? void 0 : t2.type) !== "primitive")
    throw "Expected primitive field details, got: " + (t2 == null ? void 0 : t2.type);
  return (t2 == null ? void 0 : t2.immutable) ?? false;
};
var createEntity = (i2, e) => {
  const t2 = _r(e), n3 = createNexusFields(
    i2,
    t2,
    e,
    new NexusLocation(e.id, t2, [])
  );
  return new NexusEntity(new NexusLocation(e.id, t2, []), n3);
};
var extractPbUpdateValue = (i2, e) => {
  switch (i2.case) {
    case "pointer":
      return NexusLocation.fromPointerMessage(e, i2.value);
    case "sfixed64":
    case "fixed64":
    case "int64":
    case "sint64":
    case "uint64":
    case "sfixed32":
    case "fixed32":
    case "bool":
    case "float":
    case "double":
    case "int32":
    case "sint32":
    case "uint32":
    case "string":
      return i2.value;
    case "bytes":
      throw "unexpected update message type 'bytes'";
    case void 0:
      return s("update message type is undefined");
  }
};
var removeSourceTarget = (i2, e, t2) => {
  let n3 = i2.get(t2);
  return n3 === void 0 ? false : (n3 = n3.filter((o3) => !o3.equals(e)), n3.length === 0 ? i2.delete(t2) : i2.set(t2, n3), true);
};
var addSourceTarget = (i2, e, t2) => {
  const n3 = [...i2.get(t2) ?? [], e];
  i2.set(t2, n3);
};
var visitPointers$1 = (i2, e) => {
  Object.values(i2.fields).forEach((t2) => {
    if (t2 instanceof PrimitiveField && t2.value instanceof NexusLocation) {
      t2.value.isEmpty() || e(t2.location, t2.value);
      return;
    }
    if (t2 instanceof ArrayField) {
      if (t2.array[0] instanceof NexusObject) {
        t2.array.forEach((n3) => visitPointers$1(n3, e));
        return;
      }
      if (t2.array[0] instanceof PrimitiveField && t2.array[0].value instanceof NexusLocation) {
        t2.array.filter(
          (n3) => !n3.value.isEmpty()
        ).forEach(
          (n3) => e(t2.location, n3.value)
        );
        return;
      }
      return;
    }
    t2 instanceof NexusObject && visitPointers$1(t2, e);
  });
};
var applyUpdate = (i2, e, t2, n3) => {
  const o3 = i2._resolveField(e.fieldIndex) ?? s(`can't find updated field ${e}`);
  if (!(o3 instanceof PrimitiveField))
    throw "received update on non-primitive field";
  if (!(t2 instanceof NexusLocation)) {
    o3._setValue(t2);
    return;
  }
  const r2 = o3.value;
  r2.isEmpty() || n3 == null || n3.onStopPointingTo(o3.location, r2), o3._setValue(t2);
  const c5 = t2;
  c5.isEmpty() || n3 == null || n3.onStartPointingTo(o3.location, c5);
};
var nexusDocumentState = (i2) => {
  const e = (i2 == null ? void 0 : i2.entities) ?? /* @__PURE__ */ new Map(), t2 = (i2 == null ? void 0 : i2.references) ?? new _5(), n3 = {
    onCreate: () => {
    },
    onDelete: () => {
    },
    onStartPointingTo: () => {
    },
    onStopPointingTo: () => {
    },
    onUpdate: () => {
    },
    ...(i2 == null ? void 0 : i2.callbacks) ?? {}
  }, o3 = /* @__PURE__ */ new Map(), r2 = (u4) => {
    var f6;
    return ((f6 = e.get(u4)) == null ? void 0 : f6.entityType) ?? o3.get(u4);
  }, c5 = (u4) => {
    const f6 = createEntity(
      r2,
      jr(
        u4.entity ?? s("received empty create modification")
      )
    );
    e.set(f6.id, f6), visitPointers$1(f6, (m4, p5) => {
      addSourceTarget(t2, m4, p5), n3.onStartPointingTo(m4, p5);
    }), n3.onCreate(f6);
  }, l4 = (u4) => {
    const f6 = u4.entityId, m4 = e.get(f6) ?? s("can't find deleted entity");
    e.delete(f6), visitPointers$1(m4, (p5, w7) => {
      removeSourceTarget(t2, p5, w7), n3.onStopPointingTo(p5, w7);
    }), n3.onDelete(m4);
  }, d4 = (u4) => {
    const f6 = u4.field ?? s("received update without pointer"), m4 = NexusLocation.fromPointerMessage(r2, f6), p5 = e.get(m4.entityId) ?? s("can't find updated entity"), w7 = extractPbUpdateValue(u4.value, r2);
    applyUpdate(p5, m4, w7, {
      onStopPointingTo: (x6, E5) => {
        removeSourceTarget(t2, x6, E5) || s(), n3.onStopPointingTo(x6, E5);
      },
      onStartPointingTo: (x6, E5) => {
        addSourceTarget(t2, x6, E5), n3.onStartPointingTo(x6, E5);
      }
    }), n3.onUpdate(m4, w7);
  };
  return {
    entities: e,
    references: t2,
    applyModification(u4) {
      const f6 = u4.modification;
      switch (f6.case) {
        case "create": {
          c5(f6.value);
          break;
        }
        case "delete": {
          l4(f6.value);
          break;
        }
        case "update": {
          d4(f6.value);
          break;
        }
      }
    },
    getStats() {
      return {
        entities: e.size,
        references: t2.values().reduce((u4, f6) => u4 + f6.length, 0)
      };
    },
    _addEntityTypeForId(u4, f6) {
      o3.set(u4, f6);
    }
  };
};
var TerminableBuilder = {
  terminableFrom: (...i2) => ({
    terminate: () => {
      for (const e of i2)
        e();
    }
  })
};
var N5;
var lt5;
var k6;
var F5;
var J5;
var Jt5;
var bt5 = class bt6 {
  constructor(e = nexusDocumentState()) {
    h6(this, N5, new _5());
    h6(this, lt5, /* @__PURE__ */ new Map());
    h6(this, k6, /* @__PURE__ */ new Map());
    h6(this, F5, new _5());
    h6(this, J5, new _5());
    h6(this, Jt5);
    g7(this, Jt5, e), bt6.debugWindowInstance ?? (bt6.debugWindowInstance = this);
  }
  /**
   * Subscribe to the event that an entity of a specific type is created.
   *
   * @returns A terminable that when terminated will stop dispatching new onCreate events. Cleanup functions that were returned
   * during entity creation will still be called on removal of the entity.
   */
  onCreate(e, t2) {
    const n3 = (r2) => {
      const c5 = t2(
        r2
      );
      c5 !== void 0 && this.onRemove(r2, c5);
    };
    return getOrDefault(s2(this, lt5), e).add(n3), TerminableBuilder.terminableFrom(
      () => {
        var r2;
        return (r2 = s2(this, lt5).get(e)) == null ? void 0 : r2.delete(n3);
      }
    );
  }
  /** @internal */
  _dispatchCreate(e) {
    [
      ...s2(this, lt5).get("*") ?? [],
      ...s2(this, lt5).get(e.entityType) ?? []
    ].forEach((t2) => t2(e));
  }
  /**
   * Subscribe to updates of a mutable primitive field in the nexus document.
   *
   * @returns A terminable that when terminated will stop dispatching new onUpdate events.
   */
  onUpdate(e, t2, n3 = true) {
    const o3 = t2;
    return getOrDefault(s2(this, N5), e.location).add(o3), n3 && t2(e.value), TerminableBuilder.terminableFrom(
      () => {
        var c5;
        return (c5 = s2(this, N5).get(e.location)) == null ? void 0 : c5.delete(o3);
      }
    );
  }
  /** @internal */
  _dispatchUpdate(e, t2) {
    var n3;
    (n3 = s2(this, N5).get(e)) == null || n3.forEach((o3) => o3(t2));
  }
  /**
   * Subscribe to an event where an entity is removed.
   *
   * @example
   * ```ts
   * const tm = await nexus.modify(t => t.create("tonematrix", {}))
   * nexus.events.onRemove(tm, (tm) => console.debug("tonematrix", tm.id, "removed"))
   * ```
   *
   *
   * @returns A terminable that when terminated will stop dispatching new onRemove events.
   */
  onRemove(e, t2) {
    const n3 = t2;
    return getOrDefault(
      s2(this, k6),
      typeof e == "string" ? e : e.id
    ).add(n3), TerminableBuilder.terminableFrom(
      () => {
        var r2;
        return (r2 = s2(this, k6).get(typeof e == "string" ? e : e.id)) == null ? void 0 : r2.delete(n3);
      }
    );
  }
  /** @internal */
  _dispatchRemove(e) {
    [
      ...s2(this, k6).get("*") ?? [],
      ...s2(this, k6).get(e.id) ?? [],
      ...s2(this, k6).get(e.entityType) ?? []
    ].forEach((t2) => t2(e)), s2(this, k6).delete(e.id), [...s2(this, F5).keys()].filter((t2) => t2.entityId === e.id).forEach((t2) => s2(this, F5).delete(t2)), [...s2(this, J5).keys()].filter((t2) => t2.entityId === e.id).forEach((t2) => s2(this, J5).delete(t2)), [...s2(this, N5).keys()].filter((t2) => t2.entityId === e.id).forEach((t2) => s2(this, N5).delete(t2));
  }
  /** Subscribe to the event that some pointer in the document starts pointing to a given location.
   *
   * @example
   * ```ts
   * const tm = await nexus.modify(t => t.create("tonematrix", {}))
   * nexus.events.onPointingTo(tm.fields.audioOutput, (from) =>
   *  console.debug(
   *    "pointing from field",
   *    from.toString(),
   *    "which is entity",
   *    nexus.queryEntities.getEntity(from.entityId)?.id
   * ))
   * ```
   *
   * If the pointer is the result of an entity being created, then `onCreate` is called before this callback.
   *
   * @returns A terminable that when terminated will stop dispatching new onPointingTo events.
   */
  onPointingTo(e, t2, n3 = true) {
    var r2;
    return getOrDefault(s2(this, F5), e).add(t2), n3 && ((r2 = s2(this, Jt5).references.get(e)) == null || r2.forEach((c5) => t2(c5))), TerminableBuilder.terminableFrom(
      () => {
        var c5;
        return (c5 = s2(this, F5).get(e)) == null ? void 0 : c5.delete(t2);
      }
    );
  }
  /** @internal */
  _dispatchPointingTo(e, t2) {
    var n3;
    (n3 = s2(this, F5).get(e)) == null || n3.forEach((o3) => o3(t2));
  }
  /** Subscribe to the event that some pointer in the document stops pointing to a given location.
   *
   * @example
   * ```ts
   * const tm = await nexus.modify(t => t.create("tonematrix", {}))
   * nexus.events.onStopPointingTo(tm.fields.audioOutput, (from) =>
   *  console.debug("pointing from field", from.toString(), "which is entity", nexus.queryEntities.getEntity(from.entityId)?.id
   * ))
   * ```
   *
   * If the pointer is the result of an entity being removed, then `onRemove` is called after this callback.
   *
   * @returns A terminable that when terminated will stop dispatching new onStopPointingTo events.
   */
  onStopPointingTo(e, t2) {
    return getOrDefault(s2(this, J5), e).add(t2), TerminableBuilder.terminableFrom(
      () => {
        var o3;
        return (o3 = s2(this, J5).get(e)) == null ? void 0 : o3.delete(t2);
      }
    );
  }
  /** @internal */
  _dispatchStopPointingTo(e, t2) {
    var n3;
    (n3 = s2(this, J5).get(e)) == null || n3.forEach((o3) => o3(t2));
  }
  /**
   * @internal
   *
   * Removes all event listeners.*/
  _clear() {
    s2(this, lt5).clear(), s2(this, N5).clear(), s2(this, k6).clear(), s2(this, F5).clear(), s2(this, J5).clear();
  }
  /**
   * @internal
   * Some stats for debugging. Static for easy access. This method can get quite slow, 6.5ms measured
   * on large documents. Don't call too often. */
  getStats() {
    return {
      numCreateListeners: sizeOf(s2(this, lt5)),
      numUpdateListeners: sizeOf(s2(this, N5)),
      numRemoveListeners: sizeOf(s2(this, k6)),
      numPointingToListeners: sizeOf(s2(this, F5)),
      numStopPointingToListeners: sizeOf(s2(this, J5))
    };
  }
};
N5 = /* @__PURE__ */ new WeakMap(), lt5 = /* @__PURE__ */ new WeakMap(), k6 = /* @__PURE__ */ new WeakMap(), F5 = /* @__PURE__ */ new WeakMap(), J5 = /* @__PURE__ */ new WeakMap(), Jt5 = /* @__PURE__ */ new WeakMap(), /**
* @internal
* For debugging purposes, the first instance of the nexus event manager ever created. */
a3(bt5, "debugWindowInstance");
var NexusEventManager = bt5;
var sizeOf = (i2) => i2.values().reduce((e, t2) => e + t2.size, 0);
var getOrDefault = (i2, e) => i2.get(e) ?? i2.set(e, /* @__PURE__ */ new Set()).get(e) ?? s();
var mockNexusGateway = () => {
  let i2 = false, e = false;
  return {
    synchronize: () => e ? "done" : (e = true, [new Transaction()]),
    send: () => {
      if (i2)
        throw new Error("Gateway terminated");
    },
    blocked: new E4(false),
    terminate: async () => {
      i2 = true;
    }
  };
};
var mockNexusValidator = () => ({
  validate: () => {
  },
  terminate: () => {
  }
});
var Pt5;
var vt5;
var kt5;
var Mt5;
var pt5;
var Ft5;
var $t5;
var qt5 = class qt6 {
  constructor({
    getFields: e,
    getRefs: t2,
    filterFields: n3,
    documentLock: o3
  }) {
    h6(this, pt5);
    h6(this, Pt5);
    h6(this, vt5);
    h6(this, kt5);
    h6(this, Mt5);
    g7(this, Pt5, e), g7(this, vt5, t2), g7(this, kt5, n3), g7(this, Mt5, o3);
  }
  /** Only keep fields that are marked with target type appearing in `targetTypes`. */
  ofTargetTypes(...e) {
    return y6(this, pt5, Ft5).call(this, (t2) => P5(t2.location).targetTypes.some(
      (n3) => e.includes(n3)
    ));
  }
  /** Only keep fields that aren't pointed to by any other field in the nexus document. */
  notPointedTo() {
    return y6(this, pt5, Ft5).call(this, (e) => {
      const t2 = s2(this, vt5).call(this).get(e.location);
      return t2 === void 0 || t2.length === 0;
    });
  }
  pointedToBy(e) {
    return y6(this, pt5, Ft5).call(this, (t2) => {
      const n3 = s2(this, vt5).call(this).get(t2.location);
      return n3 !== void 0 && n3.some((o3) => o3.equals(e));
    });
  }
  primitiveFields() {
    return y6(this, pt5, Ft5).call(this, (e) => e instanceof PrimitiveField);
  }
  /** Returns all primitive fields selected using this query */
  get() {
    return s2(this, Pt5).call(this).filter((e) => s2(this, kt5).call(this, e));
  }
  /** Returns the first primitive field of the result, or undefined if the query is empty.
   */
  getOne() {
    return this.get()[0];
  }
  /** Returns all primitive fields selected using this query, as
   * part of a ComparableMap that maps entity ids to fields for that entity.
   */
  getByEntity() {
    y6(this, pt5, $t5).call(this);
    const e = /* @__PURE__ */ new Map();
    return this.get().forEach((t2) => {
      e.has(t2.location.entityId) || e.set(t2.location.entityId, []), (e.get(t2.location.entityId) ?? s()).push(t2);
    }), e;
  }
};
Pt5 = /* @__PURE__ */ new WeakMap(), vt5 = /* @__PURE__ */ new WeakMap(), kt5 = /* @__PURE__ */ new WeakMap(), Mt5 = /* @__PURE__ */ new WeakMap(), pt5 = /* @__PURE__ */ new WeakSet(), Ft5 = function(e) {
  return new qt5({
    getFields: s2(this, Pt5),
    getRefs: s2(this, vt5),
    filterFields: (t2) => s2(this, kt5).call(this, t2) && e(t2),
    documentLock: s2(this, Mt5)
  });
}, $t5 = function() {
  var e;
  if (!(((e = s2(this, Mt5)) == null ? void 0 : e.locked) ?? true))
    throw new Error("Document is not locked");
};
var FieldQuery = qt5;
var T6;
var ut5;
var Tt5;
var v7;
var P6;
var wt5;
var Ot5 = class Ot6 {
  /** Don't construct this class, it is constructed by NexusDocument. */
  constructor(e) {
    h6(this, v7);
    h6(this, T6);
    h6(this, ut5);
    h6(this, Tt5);
    g7(this, T6, (e == null ? void 0 : e.documentState) ?? nexusDocumentState()), g7(this, ut5, (e == null ? void 0 : e.filterEntities) ?? ((t2) => t2)), g7(this, Tt5, e == null ? void 0 : e.documentLock);
  }
  /** Returns all entities selected by this query, in undefined order.
   */
  get() {
    return y6(this, v7, wt5).call(this), [...s2(this, ut5).call(this, s2(this, T6).entities).values()];
  }
  /** Returns the first entity returned by `get()`, if any.
   *
   *  Since the order of entities in `get()` is undefined, which of the selected
   * entity this method returns is also undefined. This method is intended to be used
   * if it's known that the query will return at most one entity.
   */
  getOne() {
    return y6(this, v7, wt5).call(this), this.get()[0];
  }
  /** Of all selected entities, return the one with id `id`, if it exists. */
  getEntity(e) {
    return y6(this, v7, wt5).call(this), s2(this, ut5).call(this, s2(this, T6).entities).get(e);
  }
  /**
   * Of all selected entities, return the one with id `id`. Throw if it doesn't
   * exist.
   */
  mustGetEntity(e) {
    return this.getEntity(e) ?? s(`can't find entity with uuid ${e}`);
  }
  /**
   * Get an entity as a specific type, if it exists and has the type matching one
   * of the provided types.
   */
  getEntityAs(e, ...t2) {
    y6(this, v7, wt5).call(this), c(t2.length > 0, "must provide at least one type");
    const n3 = this.getEntity(e);
    if (n3 !== void 0 && t2.includes(n3.entityType))
      return n3;
  }
  /**
   * Get an entity as a specific type, if it has the type matching one of the
   * provided types. Throw if it doesn't exist.
   */
  mustGetEntityAs(e, ...t2) {
    y6(this, v7, wt5).call(this), c(t2.length > 0, "must provide at least one type");
    const n3 = this.mustGetEntity(e);
    return t2.includes(n3.entityType) ? n3 : s(
      `entity with uuid ${e} is not of any of the provided types ${t2}`
    );
  }
  /** Only keep entities whose id appears in `ids`. */
  withIds(...e) {
    return y6(this, v7, P6).call(this, (t2) => filterByUuids(t2, e));
  }
  /** Return the `FieldQuery<NexusField>` that starts with all fields of all
   * currently selected entities.
   */
  fields() {
    return new FieldQuery({
      getFields: () => [
        ...s2(this, ut5).call(this, s2(this, T6).entities).values()
      ].flatMap((e) => toFields(e)),
      getRefs: () => s2(this, T6).references,
      filterFields: () => true,
      documentLock: s2(this, Tt5)
    });
  }
  /** Only keep entities whose messages are marked with a target type appearing
   * in `targetTypes`. Target types of fields of entities are ignored.
   */
  ofTargetTypes(...e) {
    return y6(this, v7, P6).call(this, (t2) => {
      const n3 = /* @__PURE__ */ new Map();
      return t2.forEach((o3, r2) => {
        P5(o3.location).targetTypes.some(
          (c5) => e.includes(c5)
        ) && n3.set(r2, o3);
      }), n3;
    });
  }
  /** Check if a specific entity is contained in the current query. */
  has(e) {
    y6(this, v7, wt5).call(this);
    const t2 = typeof e == "string" ? e : e.id;
    return s2(this, ut5).call(this, s2(this, T6).entities).has(t2);
  }
  /** Only keep entities whose type string appears in `types`. */
  ofTypes(...e) {
    return y6(this, v7, P6).call(this, (t2) => filterByType(t2, e));
  }
  /** Omit entities whose type string appears in `types`. */
  notOfTypes(...e) {
    return y6(this, v7, P6).call(this, (t2) => omitByType(t2, e));
  }
  /** Only keep entities that have some fields that point to:
   * * `entityOfType`: some field of entities of a set of types
   * * `locations`: specific locations
   * * `entities`: some field of specific entities
   *
   * Passing an empty list to any of these methods will result in an empty query result.
   *
   * Use e.g. like:
   * ```
   * nexus.entities.pointingTo.entitiesOfType("tb303").get()
   * ```
   */
  get pointingTo() {
    return {
      entityOfType: (...e) => y6(this, v7, P6).call(this, (t2) => filterByUuids(
        t2,
        getUuidsPointingToTypes(
          s2(this, T6).references,
          s2(this, T6).entities,
          ...e
        )
      )),
      locations: (...e) => y6(this, v7, P6).call(this, (t2) => filterByUuids(
        t2,
        getUuidsPointingToLocations(s2(this, T6).references, e)
      )),
      entities: (...e) => y6(this, v7, P6).call(this, (t2) => filterByUuids(
        t2,
        getUuidsPointingToEntities(s2(this, T6).references, e)
      ))
    };
  }
  /** Only keep entities that are themselves, or have fields that are, pointed to by:
   * * `entityOfType`: some field of entities of a set of types
   * * `locations`: specific locations
   * * `entities`: some field of specific entities
   *
   * Passing an empty list to any of these methods will result in an empty query result.
   *
   * Use e.g. as:
   * ```
   * nexus.entities.pointedToBy.entitiesOfType("tb303").get()
   * ```
   */
  get pointedToBy() {
    return {
      entityOfType: (...e) => y6(this, v7, P6).call(this, (t2) => filterByUuids(
        t2,
        getUuidsPointedToByTypes(
          s2(this, T6).references,
          s2(this, T6).entities,
          ...e
        )
      )),
      locations: (...e) => y6(this, v7, P6).call(this, (t2) => filterByUuids(
        t2,
        getUuidsPointedToByLocations(s2(this, T6).references, e)
      )),
      entities: (...e) => y6(this, v7, P6).call(this, (t2) => filterByUuids(
        t2,
        getUuidsPointedToByEntities(s2(this, T6).references, e)
      ))
    };
  }
};
T6 = /* @__PURE__ */ new WeakMap(), ut5 = /* @__PURE__ */ new WeakMap(), Tt5 = /* @__PURE__ */ new WeakMap(), v7 = /* @__PURE__ */ new WeakSet(), /** Return a copy of this class, with a new function "appended" to the
* filter pipeline. The filter can change the type of the entity, or
* remove entities from the query.
*/
P6 = function(e) {
  return new Ot5({
    documentState: s2(this, T6),
    filterEntities: (t2) => e(s2(this, ut5).call(this, t2)),
    documentLock: s2(this, Tt5)
  });
}, wt5 = function() {
  var e;
  if (!(((e = s2(this, Tt5)) == null ? void 0 : e.locked) ?? true))
    throw new Error("EntityQuery method called without locking the document");
};
var EntityQuery = Ot5;
var filterByType = (i2, e) => {
  const t2 = /* @__PURE__ */ new Map();
  return [...i2.values()].filter((n3) => e.includes(n3.entityType)).forEach((n3) => t2.set(n3.id, n3)), t2;
};
var omitByType = (i2, e) => {
  const t2 = /* @__PURE__ */ new Map();
  return [...i2.values()].filter((n3) => !e.includes(n3.entityType)).forEach((n3) => t2.set(n3.id, n3)), t2;
};
var filterByUuids = (i2, e) => {
  const t2 = /* @__PURE__ */ new Map();
  return e.forEach((n3) => {
    i2.get(n3) !== void 0 && t2.set(n3, i2.get(n3));
  }), t2;
};
var getUuidsPointingToLocations = (i2, e) => e.flatMap((t2) => {
  var n3;
  return ((n3 = i2.get(t2)) == null ? void 0 : n3.map((o3) => o3.entityId)) ?? [];
});
var getUuidsPointingToEntities = (i2, e) => [...i2.entries()].filter(([t2, n3]) => e.some((o3) => t2.entityId === o3)).flatMap(([t2, n3]) => n3.map((o3) => o3.entityId));
var getUuidsPointedToByLocations = (i2, e) => [...i2.entries()].filter(
  ([t2, n3]) => e.some((o3) => n3.some((r2) => o3.equals(r2)))
).map(([t2, n3]) => t2.entityId);
var getUuidsPointingToTypes = (i2, e, ...t2) => [...i2.entries()].filter(([n3, o3]) => {
  const r2 = e.get(n3.entityId);
  return r2 !== void 0 && t2.includes(r2.entityType);
}).flatMap(([n3, o3]) => o3.map((r2) => r2.entityId));
var getUuidsPointedToByTypes = (i2, e, ...t2) => [...i2.entries()].filter(
  ([n3, o3]) => o3.some((r2) => {
    const c5 = e.get(r2.entityId);
    return c5 !== void 0 && t2.includes(c5.entityType);
  })
).map(([n3, o3]) => n3.entityId);
var getUuidsPointedToByEntities = (i2, e) => [...i2.entries()].filter(
  ([t2, n3]) => e.some((o3) => n3.some((r2) => r2.entityId === o3))
).map(([t2, n3]) => t2.entityId);
var toFields = (i2) => {
  const e = (t2) => {
    if (t2 instanceof PrimitiveField)
      return [t2];
    if (t2 instanceof ArrayField)
      return [t2, ...t2.array.flatMap((n3) => e(n3))];
    if (t2 instanceof NexusObject) {
      const n3 = Object.values(
        t2.fields
      ).flatMap((o3) => e(o3));
      return t2 instanceof NexusEntity ? n3 : [t2, ...n3];
    }
    throw new Error(`field of unknown type: ${t2}`);
  };
  return e(i2);
};
var buildCreateModification = (i2) => new Modification({
  modification: {
    case: "create",
    value: {
      entity: i2 instanceof Any ? i2 : br(i2)
    }
  }
}).clone();
var buildUpdateModification = (i2, e, t2) => new Modification({
  modification: {
    case: "update",
    value: {
      field: i2.toPointerMessage(),
      value: {
        case: e,
        value: t2
      }
    }
  }
}).clone();
var buildDeleteModification = (i2) => new Modification({
  modification: {
    case: "delete",
    value: { entityId: i2 }
  }
}).clone();
var createDefaultEntityMessage = (i2) => createDefaultMessage(
  i2,
  us[i2]
);
var createDefaultMessage = (i2, e) => new e(
  Object.fromEntries(
    e.fields.list().map((t2) => t2.name === "id" && t2.no === 1 ? ["id", crypto.randomUUID()] : [
      t2.localName,
      getDefaultFieldValue(
        `${i2}:${t2.no}`,
        t2
      )
    ])
  )
);
var getDefaultFieldValue = (i2, e) => {
  const t2 = T5(i2);
  switch (t2.type) {
    case "object":
      return c(e.kind === "message", "field is not a message"), createDefaultMessage(i2, e.T);
    case "array":
      return c(e.repeated, "field is not repeated"), new Array(t2.length).fill(void 0).map(() => getDefaultFieldValue(`${i2}:[]`, e));
    case "primitive":
      switch (t2.primitive.type) {
        case "boolean":
        case "number":
          return t2.primitive.default;
        case "string":
          return "";
        case "bytes":
          return new Uint8Array();
        case "nexus-location":
          return new r();
        default:
          t2.primitive;
      }
  }
};
var entityToConstructorType = (i2) => convertField(i2);
var convertField = (i2) => {
  if (i2 instanceof ArrayField)
    return i2.array.map((e) => convertField(e));
  if (i2 instanceof NexusObject) {
    const e = {};
    return Object.entries(i2.fields).forEach(([t2, n3]) => {
      n3 instanceof NexusObject && Object.entries(n3.fields).length === 0 || (e[t2] = convertField(n3));
    }), e;
  }
  if (i2 instanceof PrimitiveField)
    return i2.value instanceof NexusLocation, i2.value;
  throw new Error(`unknown value ${i2} `);
};
var updateEntityMessageWithConstructor = (i2, e) => {
  const t2 = Gr(i2.getType().name);
  updateProtoMessage(t2, i2, e);
};
var updateProtoMessage = (i2, e, t2) => {
  e.getType().fields.list().forEach((n3) => {
    if (!(n3.localName in t2) || t2[n3.localName] === void 0)
      return;
    const o3 = e;
    if (!n3.repeated) {
      o3[n3.localName] = toFieldValue(
        i2,
        n3,
        o3[n3.localName],
        t2[n3.localName]
      );
      return;
    }
    const r2 = t2[n3.localName], c5 = o3[n3.localName];
    c(
      Array.isArray(r2),
      `tried overriding repeated field ${n3.localName} of message ${e.getType().typeName} with non-array field`
    ), c(
      r2.length === c5.length,
      `tried overriding repeated field ${n3.localName} with array of different length`
    ), r2.forEach((l4, d4) => {
      c5[d4] = toFieldValue(i2, n3, c5[d4], l4);
    });
  });
};
var toFieldValue = (i2, e, t2, n3) => {
  switch (e.kind) {
    case "message": {
      if (e.T.name === r.name) {
        const o3 = n3;
        return new r({
          fieldIndex: o3.fieldIndex.slice(),
          entityId: o3.entityId
        });
      }
      return updateProtoMessage(
        i2,
        t2,
        n3
      ), t2;
    }
    case "scalar":
      return n3;
  }
};
var entityToPbMessage = (i2, e = true) => {
  const t2 = createDefaultEntityMessage(i2.entityType);
  return updateEntityMessageWithConstructor(
    t2,
    entityToConstructorType(i2)
  ), e || (t2.id = i2.id), t2;
};
var buildModificationForEntityClone = (i2, e) => {
  const t2 = entityToPbMessage(i2);
  return e !== void 0 && updateEntityMessageWithConstructor(t2, e), {
    modification: buildCreateModification(t2),
    entityId: t2.id
  };
};
var mapConstructorLocations = (i2, e) => {
  const t2 = (n3) => {
    if (n3 instanceof NexusLocation)
      return e(n3);
    if (n3 instanceof Array)
      return n3.map((o3) => t2(o3));
    if (typeof n3 == "object" && n3 != null) {
      const o3 = {};
      return Object.entries(n3).forEach(([r2, c5]) => {
        o3[r2] = t2(c5);
      }), o3;
    }
    return n3;
  };
  return t2(i2);
};
var buildModificationsForCloneLinkedEntities = (...i2) => {
  const e = i2.map(
    (d4) => d4 instanceof NexusEntity ? { entity: d4 } : d4
  ), t2 = /* @__PURE__ */ new Map();
  e.forEach(
    (d4) => t2.set(d4.entity.id, crypto.randomUUID())
  );
  const n3 = /* @__PURE__ */ new Map();
  e.forEach((d4) => n3.set(d4.entity.id, d4));
  const o3 = /* @__PURE__ */ new Map(), r2 = [];
  [...n3.values()].forEach(({ entity: d4, overwrites: u4 }) => {
    const f6 = entityToConstructorType(d4), m4 = createDefaultEntityMessage(d4.entityType);
    m4.id = t2.get(d4.id) ?? s();
    const p5 = mapConstructorLocations(f6, (w7) => {
      const x6 = t2.get(w7.entityId);
      return x6 !== void 0 ? (r2.push([m4.id, x6]), new NexusLocation(x6, w7.entityType, [
        ...w7.fieldIndex
      ])) : w7;
    });
    updateEntityMessageWithConstructor(m4, p5), u4 !== void 0 && updateEntityMessageWithConstructor(m4, u4), o3.set(m4.id, [d4.entityType, m4]);
  });
  const c5 = (0, import_toposort.default)(r2).reverse(), l4 = [...o3.keys()].filter(
    (d4) => !c5.includes(d4)
  );
  return {
    modifications: [...c5, ...l4].map((d4) => {
      const [, u4] = o3.get(d4) ?? s();
      return buildCreateModification(u4);
    }),
    uuidMap: t2
  };
};
var buildModificationForFieldUpdate = (i2, e) => {
  if (e instanceof r && i2._protoType !== "pointer")
    throw new Error(
      `Expected value of type ${i2._protoType}, but got Pointer`
    );
  return buildUpdateModification(
    i2.location,
    i2._protoType,
    e instanceof NexusLocation ? e.toPointerMessage() : e
  );
};
var buildModificationForNewEntity = (i2, e) => {
  i2 === "gakki" && (e = {
    ...e,
    // @ts-ignore
    soundfontId: e.soundfontId ?? "ce79731c-f100-4f54-9ccc-2d2c60269483"
  });
  const t2 = createDefaultEntityMessage(i2);
  return updateEntityMessageWithConstructor(t2, e), {
    modification: buildCreateModification(t2),
    entityId: t2.id
  };
};
var buildModificationForRemove = (i2) => buildDeleteModification(i2);
var buildModificationForRemoveWithDependencies = (i2, e) => {
  const t2 = /* @__PURE__ */ new Set(), n3 = [];
  t2.add(i2), t2.forEach((r2) => {
    e.pointingTo.entities(r2).get().forEach((c5) => {
      n3.push([c5.id, r2]), t2.add(c5.id);
    });
  });
  let o3;
  return n3.length > 0 ? o3 = (0, import_toposort.default)(n3) : o3 = [i2], o3.map((r2) => buildModificationForRemove(r2));
};
var buildPresetUpdateModifications = (i2, e) => buildModificationForObject(i2, e);
var buildModificationForField = (i2, e) => {
  if (i2 instanceof PrimitiveField)
    return buildUpdateForPrimitiveField(i2, e);
  if (i2 instanceof ArrayField)
    return buildModificationForArray(i2, e);
  if (i2 instanceof NexusObject)
    return buildModificationForObject(i2, e);
  throw new Error("unknown field type");
};
var buildModificationForObject = (i2, e) => (c(typeof e == "object", "msg is not an object"), Object.entries(i2.fields).flatMap(
  ([t2, n3]) => buildModificationForField(n3, e[t2])
));
var buildModificationForArray = (i2, e) => (c(e instanceof Array, "field is not an array"), c(i2.array.length === e.length, "field has different lengths"), [...i2.array.entries()].flatMap(
  ([t2, n3]) => buildModificationForField(n3, e[t2])
));
var buildUpdateForPrimitiveField = (i2, e) => (c(typeof i2.value == typeof e, "field has different types"), i2.value instanceof NexusLocation ? (c(
  e instanceof r,
  "tried updating a field that's not a pointer field with a NexusLocation"
), i2.value.equalsPointer(e) ? [] : [buildModificationForFieldUpdate(i2, e)]) : i2.value === e ? [] : [buildModificationForFieldUpdate(i2, e)]);
var updatePresetPointers = (i2, e) => {
  const t2 = /* @__PURE__ */ new Map(), n3 = Mr(i2.target) ?? s();
  t2.set(n3.id, e), t2.set("", "");
  const o3 = i2.relatives.map((r2) => Mr(r2) ?? s());
  return o3.forEach((r2) => {
    if (t2.has(r2.id))
      throw new Error("duplicate entity id");
    t2.set(r2.id, crypto.randomUUID());
  }), [n3, ...o3].forEach((r2) => {
    r2 ?? (r2 = s("can't happen")), r2.id = t2.get(r2.id) ?? s(), visitPointers(r2, (c5) => {
      t2.has(c5.entityId) || console.error("entity", r2.constructor.name, "pointer", c5), c5.entityId = t2.get(c5.entityId) ?? s("preset contains pointer to unknown entity");
    });
  }), new Tr({
    relatives: o3.map((r2) => br(r2)),
    target: br(n3)
  });
};
var visitPointers = (i2, e) => {
  if (i2 instanceof r) {
    e(i2);
    return;
  }
  if (i2 instanceof Array) {
    i2.forEach((t2) => visitPointers(t2, e));
    return;
  }
  if (typeof i2 == "object") {
    Object.values(i2).forEach(
      (t2) => visitPointers(t2, e)
    );
    return;
  }
  if (!["string", "number", "boolean", "bigint"].includes(typeof i2))
    throw new Error(`unknown type ${typeof i2}: ${i2}`);
};
var buildModificationsForPresetApplication = (i2, e, t2) => (e.preset = updatePresetPointers(e.preset, t2.id), [
  // remove entities pointing to target entity, we'll create new ones in next step
  ...i2.ofTypes(...e.entitiesToRemovePointingToMain).pointingTo.entities(t2.id).get().map((n3) => buildModificationForRemove(n3.id)),
  // build new entities pointing to target
  ...e.preset.relatives.map(
    (n3) => buildCreateModification(n3)
  ),
  // update existing target entity
  ...buildPresetUpdateModifications(
    t2,
    Mr(e.preset.target) ?? s()
  )
]);
var preparePreset = (i2) => {
  i2.relatives = toposortEntities(
    i2.relatives.map((t2) => Mr(t2) ?? s())
  ).map((t2) => br(t2));
  const e = Ur(i2.target) ?? s("invalid preset");
  return {
    preset: i2,
    entitiesToRemovePointingToMain: PRESET_TARGET_RELATIVE_TYPES[e] ?? s("preset with unexpected main entity type")
  };
};
var toposortEntities = (i2) => {
  const e = new Map(i2.map((r2) => [r2.id, r2])), t2 = [];
  i2.forEach((r2) => {
    visitPointers(r2, (c5) => {
      e.has(c5.entityId) && t2.push([r2.id, c5.entityId]);
    });
  });
  const n3 = (0, import_toposort.default)(t2).reverse().map((r2) => e.get(r2) ?? s()), o3 = i2.filter((r2) => !n3.includes(r2));
  return [...n3, ...o3];
};
var PRESET_TARGET_RELATIVE_TYPES = {
  // synthesizers
  bassline: ["basslinePattern", "groove"],
  pulverisateur: ["microTuningOctave"],
  heisenberg: ["microTuningOctave"],
  tonematrix: ["tonematrixPattern", "groove", "microTuningOctave"],
  space: ["microTuningOctave"],
  // drum machines
  machiniste: ["machinistePattern", "sample", "groove"],
  beatbox8: ["beatbox8Pattern", "groove"],
  beatbox9: ["beatbox9Pattern", "groove"],
  // pedals
  stompboxChorus: [],
  stompboxCompressor: [],
  stompboxCrusher: [],
  stompboxDelay: [],
  stompboxFlanger: [],
  stompboxGate: [],
  stompboxParametricEqualizer: [],
  stompboxPhaser: [],
  stompboxPitchDelay: [],
  stompboxReverb: [],
  stompboxSlope: [],
  stompboxStereoDetune: [],
  stompboxTube: [],
  // other effects
  quasar: [],
  rasselbock: ["rasselbockPattern"],
  pulsar: [],
  quantum: [],
  curve: [],
  graphicalEQ: [],
  gravity: [],
  autoFilter: [],
  waveshaper: ["waveshaperAnchor"],
  helmholtz: [],
  stereoEnhancer: [],
  exciter: [],
  ringModulator: void 0,
  panorama: [],
  tinyGain: void 0,
  // mixer
  minimixer: void 0,
  kobolt: void 0,
  centroid: void 0,
  crossfader: [],
  bandSplitter: [],
  audioSplitter: void 0,
  audioMerger: void 0,
  matrixArpeggiator: ["matrixArpeggiatorPattern", "groove"],
  noteSplitter: [],
  // no presets
  audioDevice: void 0,
  spitfireLabsVst3Plugin: void 0,
  mixerMaster: void 0,
  // no presets
  beatbox8Pattern: void 0,
  beatbox9Pattern: void 0,
  waveshaperAnchor: void 0,
  basslinePattern: void 0,
  tonematrixPattern: void 0,
  machinistePattern: void 0,
  rasselbockPattern: void 0,
  matrixArpeggiatorPattern: void 0,
  config: void 0,
  desktopAudioCable: void 0,
  desktopNoteCable: void 0,
  groove: void 0,
  microTuningOctave: void 0,
  sample: void 0,
  audioRegion: void 0,
  automationEvent: void 0,
  automationCollection: void 0,
  automationRegion: void 0,
  automationTrack: void 0,
  note: void 0,
  noteCollection: void 0,
  noteRegion: void 0,
  noteTrack: void 0,
  patternRegion: void 0,
  patternTrack: void 0,
  tempoAutomationTrack: void 0,
  mixerAux: void 0,
  mixerChannel: void 0,
  mixerAuxRoute: void 0,
  mixerDelayAux: void 0,
  mixerGroup: void 0,
  mixerReverbAux: void 0,
  mixerStripGrouping: void 0,
  mixerSideChainCable: void 0,
  audioTrack: void 0,
  centroidChannel: void 0,
  gakki: []
};
var createDevicePreset = (i2, e) => {
  const t2 = entityToPbMessage(i2, false);
  let n3;
  {
    const o3 = e.ofTypes(
      ...PRESET_TARGET_RELATIVE_TYPES[i2.entityType] ?? s()
    );
    n3 = [
      // select entities that point from/tom target entity
      ...o3.pointingTo.entities(i2.id).get(),
      ...o3.pointedToBy.entities(i2.id).get()
    ].map((r2) => [
      // select entities that point from/to any relatives entity
      ...o3.pointingTo.entities(r2.id).get(),
      ...o3.pointedToBy.entities(r2.id).get(),
      r2
    ]).flat().map((r2) => entityToPbMessage(r2, false));
  }
  return updateUuids([t2, ...n3]), new Tr({
    relatives: n3.map((o3) => br(o3)),
    target: br(t2)
  });
};
var updateUuids = (i2) => {
  const e = /* @__PURE__ */ new Map();
  e.set("", "");
  const t2 = (n3) => (e.set(n3, e.get(n3) ?? crypto.randomUUID()), e.get(n3) ?? s());
  i2.forEach((n3) => {
    const o3 = t2(n3.id);
    n3.id = o3, visitPointers(n3, (r2) => {
      r2.entityId = t2(r2.entityId);
    });
  });
};
var transactionBuilder = (i2) => {
  let e = false;
  return {
    create: (t2, n3) => {
      if (e)
        throw new CallAfterSendError("create");
      const { modification: o3, entityId: r2 } = buildModificationForNewEntity(t2, n3);
      return i2.applyModification(o3, true), i2.query.mustGetEntity(r2);
    },
    clone: (t2, n3) => {
      if (e)
        throw new CallAfterSendError("clone");
      const { modification: o3, entityId: r2 } = buildModificationForEntityClone(t2, n3);
      return i2.applyModification(o3, true), i2.query.mustGetEntity(r2);
    },
    cloneLinked: (...t2) => {
      if (e)
        throw new CallAfterSendError("cloneLinked");
      const { modifications: n3, uuidMap: o3 } = buildModificationsForCloneLinkedEntities(...t2);
      return n3.forEach((r2) => i2.applyModification(r2, true)), t2.map((r2) => {
        const c5 = r2 instanceof NexusEntity ? r2.id : r2.entity.id, l4 = o3.get(c5) ?? s();
        return i2.query.mustGetEntity(l4);
      });
    },
    update: (t2, n3) => {
      if (e)
        throw new CallAfterSendError("update");
      if (n3 = protoPrecision[t2._protoType](n3), n3 === t2.value)
        return;
      const o3 = buildModificationForFieldUpdate(t2, n3);
      i2.applyModification(o3, true);
    },
    tryUpdate: (t2, n3) => {
      if (e)
        throw new CallAfterSendError("tryUpdate");
      const o3 = buildModificationForFieldUpdate(t2, n3);
      return i2.applyModification(o3, false) ?? void 0;
    },
    remove: (t2) => {
      if (e)
        throw new CallAfterSendError("remove");
      const n3 = t2 instanceof NexusEntity ? t2.id : t2, o3 = buildModificationForRemove(n3);
      i2.applyModification(o3, true);
    },
    removeWithDependencies: (t2) => {
      if (e)
        throw new CallAfterSendError("removeWithDependencies");
      const n3 = t2 instanceof NexusEntity ? t2.id : t2;
      buildModificationForRemoveWithDependencies(n3, i2.query).forEach((r2) => i2.applyModification(r2, true));
    },
    applyPresetTo: (t2, n3) => {
      if (e)
        throw new CallAfterSendError("applyPreset");
      const o3 = preparePreset(n3.data);
      {
        const c5 = t2.entityType;
        c(
          n3.entityType === c5,
          `attempted to apply preset for entity of type ${n3.entityType} to entity of type ${c5}`
        );
      }
      buildModificationsForPresetApplication(
        i2.query,
        o3,
        t2
      ).forEach((c5) => i2.applyModification(c5, true));
    },
    createPresetFor: (t2) => {
      if (e)
        throw new CallAfterSendError("createPresetFor");
      return createDevicePreset(t2, i2.query);
    },
    _addModification: (t2) => {
      if (e)
        throw new CallAfterSendError("_addModification");
      i2.applyModification(t2, true);
    },
    send() {
      var t2;
      if (e)
        throw new CallAfterSendError("send");
      e = true, (t2 = i2.finish) == null || t2.call(i2);
    },
    entities: i2.query
  };
};
var CallAfterSendError = class extends Error {
  constructor(e) {
    super(
      `Tried calling method ${e} on transaction that was already sent`
    );
  }
};
var mt5;
var S5;
var M6;
var ft5;
var yt5;
var Lt5;
var It5;
var Ut5;
var Nt5;
var Bt5;
var Ct5;
var Dt5;
var NexusDocument = class {
  constructor(e) {
    h6(this, Ct5);
    a3(this, "queryEntitiesWithoutLock");
    a3(this, "events");
    a3(this, "onModification", new A5());
    h6(this, mt5);
    h6(this, S5, new T4());
    h6(this, M6);
    h6(this, ft5);
    h6(this, yt5, false);
    h6(this, Lt5, false);
    h6(this, It5, false);
    h6(this, Ut5);
    h6(this, Nt5);
    h6(this, Bt5);
    g7(this, Nt5, (e == null ? void 0 : e.synchronizeEveryMs) ?? 16), g7(this, Ut5, (e == null ? void 0 : e.incomingModificationsBatchSize) ?? 20), g7(this, mt5, nexusDocumentState({
      callbacks: {
        onStartPointingTo: (t2, n3) => {
          this.events._dispatchPointingTo(n3, t2);
        },
        onStopPointingTo: (t2, n3) => {
          this.events._dispatchStopPointingTo(n3, t2);
        },
        onUpdate: (t2, n3) => {
          this.events._dispatchUpdate(t2, n3);
        },
        onCreate: (t2) => {
          this.events._dispatchCreate(t2);
        },
        onDelete: (t2) => {
          this.events._dispatchRemove(t2);
        }
      }
    })), this.queryEntitiesWithoutLock = new EntityQuery({
      documentState: s2(this, mt5),
      documentLock: void 0
    }), this.events = new NexusEventManager(s2(this, mt5));
  }
  /**
   * This flag is set to true if {@link takeTransactions} is called. Before that, no transactions
   * from the backend are processed, and no transactions are allowed to be created from the frontend.
   * Attempting to call {@link createTransaction} before this is set to true will throw an error.
   *
   * This is to make sure that all `onCreate` callbacks are attached before any entity is created.
   */
  get transactionsAllowed() {
    return s2(this, yt5);
  }
  /**
   * Wait to acquire the document lock, then returns a {@link TransactionBuilder} that can be used to modify the nexus document
   * in a single transaction.
   *
   * To finish the transaction, call `send()`, which will release the lock, and send the modification to the backend. After this
   * method is called, no further methods can be called of the builder.
   *
   * The backend and other clients will only see changes after `send` is called, however locally, all changes are immediately applied.
   *
   * Note that every transaction by default is undoable, unless the flag in {@link TransactionOptions} is set to false.
   * @returns: {@link TransactionBuilder}
   */
  async createTransaction(e, t2 = true) {
    c(s2(this, yt5), "Transactions not allowed yet"), c(s2(this, M6) !== void 0, "Gateway not initialized"), c(s2(this, ft5) !== void 0, "Validator not initialized"), c(!s2(this, It5), "Document stopped");
    const n3 = t2 ? await s2(this, S5).acquire() : void 0, o3 = [], r2 = new EntityQuery({
      documentState: s2(this, mt5),
      documentLock: s2(this, S5)
    }), c5 = (e == null ? void 0 : e.actionId) ?? /* @__PURE__ */ Symbol();
    return transactionBuilder({
      applyModification: (l4, d4) => {
        const u4 = y6(this, Ct5, Dt5).call(this, l4, {
          local: true,
          throwIfInvalid: d4,
          actionId: c5
        });
        if (u4 !== void 0)
          return u4;
        o3.push(l4);
      },
      finish: () => {
        var l4;
        return o3.length === 0 ? (n3 == null || n3.release(), []) : ((l4 = s2(this, M6)) == null || l4.send(new Transaction({ modifications: o3 })), n3 == null || n3.release(), o3);
      },
      query: r2
    });
  }
  /**
   * A helper method for small transactions.
   *
   * Writing
   * ```ts
   * const foo = await nexus.modify(t => fn(t))
   * ```
   *
   * is shorthand for
   *
   * ```ts
   * const t = await this.createTransaction(opts)
   * const foo = await fn(t)
   * t.send()
   * ```
   *
   * Note that every transaction by default is undo-able, unless the flag in {@link TransactionOptions} is set to false.
   */
  async modify(e, t2) {
    const n3 = await this.createTransaction(t2), o3 = await e(n3);
    return n3.send(), o3;
  }
  /**
   * This function connects the document with the backend and starts syncing its state.
   * The returned promise resolves once the document has synced up with the backend,
   * and allows creating local transaction using {@link createTransaction}.
   *
   * It should be called exactly once when all `onCreate` callbacks are registered.
   */
  async takeTransactions(e) {
    if (s2(this, yt5))
      throw new Error("called `takeTransactions()` twice");
    g7(this, ft5, (e == null ? void 0 : e.validator) ?? mockNexusValidator()), g7(this, M6, (e == null ? void 0 : e.gateway) ?? mockNexusGateway());
    let t2;
    s2(this, M6).blocked.subscribe(async (u4) => {
      u4 ? t2 === void 0 && (t2 = await s2(this, S5).acquire()) : (t2 == null || t2.release(), t2 = void 0);
    });
    const n3 = await s2(this, S5).acquire();
    g7(this, yt5, true);
    const {
      promise: o3,
      resolve: r2
    } = Promise.withResolvers(), c5 = w(async () => {
      const u4 = (s2(this, M6) ?? s()).synchronize();
      if (u4 === "done")
        throw new Error(
          "Gateway returned 'done' before returning the initial transaction."
        );
      if (u4.length === 0)
        return;
      const f6 = u4.flatMap((m4) => m4.modifications).length;
      await this._applyIncomingTransactions(u4, {
        _takeTransactionLock: false
      }), c5.terminate(), r2(f6 > 0);
    }, s2(this, Nt5)), l4 = await o3;
    if ((e == null ? void 0 : e.templateTransaction) !== void 0)
      if (l4)
        console.error(
          "Could not apply template transaction to document: Project state from backend is not empty."
        );
      else {
        const u4 = await e.templateTransaction, f6 = await this.createTransaction(void 0, false);
        u4.modifications.forEach((m4) => f6._addModification(m4)), f6.send();
      }
    n3.release();
    const d4 = w(async (u4) => {
      if (u4.aborted)
        return;
      const f6 = await s2(this, S5).acquire(), m4 = (s2(this, M6) ?? s()).synchronize();
      if (m4 === "done") {
        d4.terminate(), f6.release();
        return;
      }
      await this._applyIncomingTransactions(m4, { _takeTransactionLock: false }), f6.release();
    }, s2(this, Nt5));
    g7(this, Bt5, () => d4.terminate());
  }
  /** Apply a transaction that doesn't originate from this document. Yields to the browser
   * scheduler every few modifications applied to make sure we don't block the main thread
   * for too long for big transactions. Throws if the transaction lock isn't taken.
   *
   */
  async _applyIncomingTransactions(e, t2) {
    c(s2(this, M6) !== void 0, "Gateway not initialized"), c(s2(this, ft5) !== void 0, "Validator not initialized"), c(!s2(this, It5), "Document stopped");
    const n3 = (t2 == null ? void 0 : t2._takeTransactionLock) ?? true ? await s2(this, S5).acquire() : c(
      s2(this, S5).locked,
      "if takeTransactionLock is false, the lock must be held."
    );
    for (const o3 of e)
      for (const [r2, c5] of o3.modifications.entries())
        y6(this, Ct5, Dt5).call(this, c5, {
          local: false,
          throwIfInvalid: true
        }), r2 % s2(this, Ut5) === 0 && await i(0);
    n3 == null || n3.release();
  }
  /** For debugging purposes */
  getStats() {
    return s2(this, mt5).getStats();
  }
  /** Stop the document from syncing. This will have the following effect:
   * First, all pending `modify` and `createTransaction` calls will finish.
   * The modifications they create will be synced with the backend, and the document is locked down.
   *
   * After this, calling `modify` or `createTransaction` will throw an error. The only property that
   * can still be accessed is `queryEntities`. The document can be thrown away safely after this.
   */
  async terminate() {
    var e, t2, n3;
    if (!s2(this, yt5))
      throw new Error("Can't stop a document that hasn't started yet.");
    s2(this, Lt5) || (g7(this, Lt5, true), await s2(this, S5).acquire(), (e = s2(this, Bt5)) == null || e.call(this), s2(this, S5).acquire = () => s(
      "invariant violated: cannot get transaction lock after document stopped"
    ), g7(this, It5, true), await ((t2 = s2(this, M6)) == null ? void 0 : t2.terminate()), (n3 = s2(this, ft5)) == null || n3.terminate(), this.events._clear());
  }
};
mt5 = /* @__PURE__ */ new WeakMap(), S5 = /* @__PURE__ */ new WeakMap(), M6 = /* @__PURE__ */ new WeakMap(), ft5 = /* @__PURE__ */ new WeakMap(), yt5 = /* @__PURE__ */ new WeakMap(), Lt5 = /* @__PURE__ */ new WeakMap(), It5 = /* @__PURE__ */ new WeakMap(), Ut5 = /* @__PURE__ */ new WeakMap(), Nt5 = /* @__PURE__ */ new WeakMap(), Bt5 = /* @__PURE__ */ new WeakMap(), Ct5 = /* @__PURE__ */ new WeakSet(), /**
* Apply a modification to the document after validating it, and dispatch events to
* {@link onModification} listeners. Throws if the modification is invalid, unless `throwIfInvalid` is false;
* in that case, the function returns `string` on error and doesn't change the document state. If application
* succeeds, always returns undefined.
*/
Dt5 = function(e, {
  local: t2 = true,
  throwIfInvalid: n3 = true,
  actionId: o3
}) {
  c(s2(this, ft5) !== void 0, "Validator not initialized"), c(
    s2(this, S5).locked,
    "tried applying modification without lock"
  );
  const r2 = s2(this, ft5).validate(e);
  if (r2 !== void 0) {
    if (n3)
      throw new Error(`modification failed validation: ${r2}`);
    return r2;
  }
  s2(this, mt5).applyModification(e), this.onModification.notify({ modification: e, local: t2, actionId: o3 });
};
var DocumentService = {
  typeName: "audiotool.document.v1.DocumentService",
  methods: {
    /**
     * Attach will provide a stream of modifications to the document.
     * for the Document will be sent to the respone.
     *
     *  The first AttachResponse contains a single transaction that reflects the
     * "current" document state; it's empty if the document is new, or contains
     * a list of `Create` modifications for all entities in the document otherwise (in topological order
     * so all pointers are always valid).
     *
     * There is no need to combine Attach and GetEntities.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.Attach
     */
    attach: {
      name: "Attach",
      I: AttachRequest,
      O: AttachResponse,
      kind: MethodKind.ServerStreaming
    },
    /**
     * Modify requests to apply the transaction to the document. Each ModifyRequest
     * will result in a ModifyResponse, which might or might not contain an error message.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.Modify
     */
    modify: {
      name: "Modify",
      I: ModifyRequest,
      O: ModifyResponse,
      kind: MethodKind.BiDiStreaming
    },
    /**
     * ApplyTransactions is a non-streaming version of `Modify`. It takes multiple
     * transactions per message as input, acts as though `Modify` was called with each transaction
     * in a separate message, collects the errors, and returns them in a single message.
     *
     * This method exists because gRPC-web doesn't support client -> server streaming. To guarantee
     * the order of transactions across method calls, each method call's reply must be awaited before
     * sending the next. To keep transaction throughput reasonably high, this method allows batching
     * multiple transactions in a single call.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.ApplyTransactions
     */
    applyTransactions: {
      name: "ApplyTransactions",
      I: ApplyTransactionsRequest,
      O: ApplyTransactionsResponse,
      kind: MethodKind.Unary
    },
    /**
     * A single shot of entities in time.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.GetEntities
     */
    getEntities: {
      name: "GetEntities",
      I: GetEntitiesRequest,
      O: GetEntitiesResponse,
      kind: MethodKind.Unary
    },
    /**
     * GetWasm will return the wasm binary for validation.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.GetWasm
     */
    getWasm: {
      name: "GetWasm",
      I: GetWasmRequest,
      O: GetWasmResponse,
      kind: MethodKind.Unary
    },
    /**
     * GetWasmExec will return the wasm execution script (go).
     *
     * @generated from rpc audiotool.document.v1.DocumentService.GetWasmExec
     */
    getWasmExec: {
      name: "GetWasmExec",
      I: GetWasmExecRequest,
      O: GetWasmExecResponse,
      kind: MethodKind.Unary
    },
    /**
     * Ping will return a response as fast as the server could process the request.
     *
     * The client_id is used to identify the client.
     * The last_ping_ms is the time in ms since of the last ping duration and will be used for the
     * GetClientStats information.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.Ping
     */
    ping: {
      name: "Ping",
      I: PingRequest,
      O: PingResponse,
      kind: MethodKind.Unary
    },
    /**
     * GetClientStats will return the stats of all clients.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.GetClientStats
     */
    getClientStats: {
      name: "GetClientStats",
      I: GetClientStatsRequest,
      O: GetClientStatsResponse,
      kind: MethodKind.Unary
    },
    /**
     * Returns the version of the service implementing.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.GetVersion
     */
    getVersion: {
      name: "GetVersion",
      I: GetVersionRequest,
      O: GetVersionResponse,
      kind: MethodKind.Unary
    },
    /**
     * Returns the current time in seconds since the Unix epoch of the server.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.GetTime
     */
    getTime: {
      name: "GetTime",
      I: GetTimeRequest,
      O: GetTimeResponse,
      kind: MethodKind.Unary
    },
    /**
     * AttachMetadata is used to receive metadata of the clients.
     *
     * Metadata contains independent messages which can be used to sync information about client
     * states.
     * Some examples are:
     *
     * - cursor position
     * - zoom level
     * - play/pause/transport
     * - ...
     *
     * @generated from rpc audiotool.document.v1.DocumentService.AttachMetadata
     */
    attachMetadata: {
      name: "AttachMetadata",
      I: AttachMetadataRequest,
      O: AttachMetadataResponse,
      kind: MethodKind.ServerStreaming
    },
    /**
     * PutMetadata is used to send metadata of the client to the document.
     *
     * @generated from rpc audiotool.document.v1.DocumentService.PutMetadata
     */
    putMetadata: {
      name: "PutMetadata",
      I: PutMetadataRequest,
      O: PutMetadataResponse,
      kind: MethodKind.Unary
    }
  }
};
var createSyncedDocument = (i2, e, t2, n3) => ({
  connected: e,
  createTransaction: () => i2.createTransaction(),
  modify: (o3) => i2.modify(o3),
  queryEntities: i2.queryEntitiesWithoutLock,
  events: i2.events,
  start: async () => i2.takeTransactions({ validator: t2, gateway: n3 }),
  stop: async () => i2.terminate()
});
var createOfflineDocument = async (i2) => {
  const e = (i2 == null ? void 0 : i2.validated) ?? true ? await createWasmNexusValidator() : mockNexusValidator(), t2 = mockNexusGateway(), n3 = new NexusDocument(), o3 = new E4(true), r2 = createSyncedDocument(n3, o3, e, t2);
  return await r2.start(), r2;
};
var createOnlineDocument = async (i2, e, t2) => {
  var f6;
  let n3 = createWasmNexusValidator();
  const o3 = await i2.projectService.openSession({
    projectName: e
  });
  if (o3 instanceof Error)
    throw new Error("Couldn't open session", { cause: o3 });
  const r2 = on3(
    DocumentService,
    Lr({
      baseUrl: ((f6 = o3.session) == null ? void 0 : f6.documentServiceUrl) ?? s("backend returned no document service url"),
      useBinaryFormat: true,
      getToken: t2
    })
  ), c5 = await n3, l4 = createCollabGateway(
    r2,
    await getWasmDocumentState(),
    e
  ), d4 = new NexusDocument(), u4 = new E4(false);
  return l4.blocked.subscribe((m4) => u4.setValue(!m4)), createSyncedDocument(d4, u4, c5, l4);
};
var createAudiotoolClient = async ({
  authorization: i2
}) => {
  const e = async () => {
    if (typeof i2 == "string")
      return addBearerPrefix(i2);
    const n3 = await i2.getToken();
    if (n3 instanceof Error)
      throw new Error("Failed to get authentication token", {
        cause: n3
      });
    return addBearerPrefix(n3);
  }, t2 = await Kr(e);
  return {
    api: t2,
    createSyncedDocument: async ({ project: n3 }) => {
      const o3 = extractProjectName(n3);
      return await createOnlineDocument(t2, o3, e);
    }
  };
};
var extractProjectName = (i2) => {
  const e = ur(i2);
  if (e instanceof Error)
    throw new Error(
      `couldn't extract project uuid from string: ${i2}, should be URL/UUID/project name`
    );
  return `projects/${e}`;
};
var addBearerPrefix = (i2) => i2.startsWith("Bearer") ? i2 : `Bearer ${i2}`;
var AUTHORIZATION_ENDPOINT = "https://oauth.audiotool.com/oauth2/auth";
var TOKEN_ENDPOINT = "https://oauth.audiotool.com/oauth2/token";
var API_ENDPOINT = "https://rpc.audiotool.com";
var getLoginStatus = async ({
  clientId: i2,
  redirectUrl: e,
  scope: t2
}) => {
  const n3 = {
    accessToken: `oidc_${i2}_oidc_access_token`,
    refreshToken: `oidc_${i2}_oidc_refresh_token`,
    expiresAt: `oidc_${i2}_oidc_expires_at`,
    codeVerifier: `oidc_${i2}_oidc_code_verifier`,
    userName: `oidc_${i2}_oidc_user_name`,
    state: `oidc_${i2}_oidc_state`
  }, o3 = () => redirectUserToLogin(n3, i2, t2, e), r2 = new URLSearchParams(window.location.search), c5 = r2.get("error"), l4 = r2.get("error_description");
  if (c5 != null)
    return cleanupUrl(), cleanUpLocalStorage(n3), {
      loggedIn: false,
      error: toError(c5, l4),
      login: o3
    };
  const d4 = r2.get("code");
  if (d4 != null) {
    const m4 = r2.get("state"), p5 = localStorage.getItem(n3.state);
    if (m4 == null || p5 == null || m4 !== p5)
      return {
        loggedIn: false,
        error: toError(
          "Invalid state URL parameter.",
          "Clean the URL of stale query parameters and try again."
        ),
        login: o3
      };
    const w7 = localStorage.getItem(n3.codeVerifier);
    if (w7 == null)
      return {
        loggedIn: false,
        error: toError("Code verifier not found. Restart the auth flow."),
        login: o3
      };
    const x6 = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: i2,
        grant_type: "authorization_code",
        code: d4,
        redirect_uri: e,
        code_verifier: w7,
        token_endpoint_auth_method: "none"
      })
    }), {
      access_token: E5,
      refresh_token: gt5,
      expires_in: xt5,
      error: Rt5,
      error_description: Vt5
    } = await x6.json();
    if (Rt5)
      return {
        loggedIn: false,
        error: toError(Rt5, Vt5),
        login: o3
      };
    localStorage.setItem(n3.accessToken, E5), localStorage.setItem(n3.refreshToken, gt5), localStorage.setItem(
      n3.expiresAt,
      (Date.now() + xt5 * 1e3).toString()
    ), cleanupUrl(), localStorage.removeItem(n3.codeVerifier);
  }
  localStorage.removeItem(n3.state);
  const u4 = await getOrFetchValidToken(n3, i2);
  let f6;
  if (typeof u4 == "string") {
    const m4 = async () => {
      if (f6 == null) {
        f6 = (async () => await getOrFetchValidToken(n3, i2) ?? new Error("User not logged in."))();
        const w7 = await f6;
        return f6 = void 0, w7;
      }
      return await f6;
    };
    let p5;
    return {
      loggedIn: true,
      getToken: m4,
      getUserName: async () => {
        if (p5 !== void 0)
          return await p5;
        const { promise: w7, resolve: x6 } = Promise.withResolvers();
        p5 = w7;
        const E5 = await m4();
        if (E5 instanceof Error)
          return x6(E5), await p5;
        const gt5 = await mr(
          `${API_ENDPOINT}/audiotool.auth.v1.AuthService/GetWhoami`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${E5}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({})
          }
        );
        if (gt5 instanceof Error)
          return x6(gt5), await p5;
        if (!gt5.ok)
          return x6(new Error(`Failed to get user info: ${gt5.statusText}`)), await p5;
        const { whoami: xt5 } = await gt5.json();
        return console.debug("whoami", xt5), x6((xt5 == null ? void 0 : xt5.userName) ?? "Unknown User"), await p5;
      },
      logout() {
        cleanUpLocalStorage(n3), cleanupUrl(), window.location.reload();
      }
    };
  }
  return {
    loggedIn: false,
    error: u4,
    login: o3
  };
};
var cleanUpLocalStorage = (i2) => {
  localStorage.removeItem(i2.accessToken), localStorage.removeItem(i2.refreshToken), localStorage.removeItem(i2.expiresAt), localStorage.removeItem(i2.codeVerifier), localStorage.removeItem(i2.userName), localStorage.removeItem(i2.state);
};
var cleanupUrl = () => {
  const i2 = new URL(window.location.href);
  i2.searchParams.delete("code"), i2.searchParams.delete("scope"), i2.searchParams.delete("state"), i2.searchParams.delete("error"), i2.searchParams.delete("error_description"), window.history.replaceState(
    {},
    document.title,
    i2.search ? i2.href : i2.href.replace("?", "")
  );
};
var redirectUserToLogin = async (i2, e, t2, n3) => {
  const o3 = generateCodeVerifier();
  localStorage.setItem(i2.codeVerifier, o3);
  const r2 = await generateCodeChallenge(o3), c5 = crypto.getRandomValues(new Uint8Array(16)).join("");
  localStorage.setItem(i2.state, c5);
  const l4 = new URL(AUTHORIZATION_ENDPOINT);
  l4.search = new URLSearchParams({
    response_type: "code",
    client_id: e,
    scope: t2,
    code_challenge_method: "S256",
    code_challenge: r2,
    redirect_uri: n3,
    state: c5
  }).toString(), window.location.href = l4.toString();
};
var toError = (i2, e) => (e = e ? `: ${e}` : "", new Error(`${i2}${e}`));
var generateCodeVerifier = () => {
  const i2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return crypto.getRandomValues(new Uint8Array(64)).reduce(
    (t2, n3) => t2 + i2[n3 % i2.length],
    ""
  );
};
var generateCodeChallenge = async (i2) => {
  const e = new TextEncoder().encode(i2), t2 = await crypto.subtle.digest("SHA-256", e);
  return btoa(String.fromCharCode(...new Uint8Array(t2))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var getOrFetchValidToken = async (i2, e) => {
  const t2 = localStorage.getItem(i2.accessToken);
  if (t2 == null)
    return;
  let n3 = true;
  {
    const m4 = localStorage.getItem(i2.expiresAt);
    n3 = m4 == null ? true : Date.now() >= parseInt(m4) - 6e4;
  }
  if (!n3)
    return t2;
  const o3 = localStorage.getItem(i2.refreshToken);
  if (o3 == null) {
    cleanUpLocalStorage(i2);
    return;
  }
  const r2 = await mr(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: e,
      grant_type: "refresh_token",
      refresh_token: o3
    })
  });
  if (r2 instanceof Error)
    return new Error(`Error during refresh token request: ${r2.name}`, {
      cause: r2.message
    });
  const { error: c5, error_description: l4, access_token: d4, refresh_token: u4, expires_in: f6 } = await r2.json();
  return c5 ? toError(c5, l4) : (localStorage.setItem(i2.accessToken, d4), localStorage.setItem(i2.refreshToken, u4), localStorage.setItem(
    i2.expiresAt,
    (Date.now() + f6 * 1e3).toString()
  ), d4);
};
export {
  createAudiotoolClient,
  createOfflineDocument,
  getLoginStatus
};
