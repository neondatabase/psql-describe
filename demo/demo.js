var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/@neondatabase/serverless/index.js
var require_serverless = __commonJS({
  "node_modules/@neondatabase/serverless/index.js"(exports, module) {
    "use strict";
    var Xs = Object.create;
    var Ie = Object.defineProperty;
    var eo = Object.getOwnPropertyDescriptor;
    var to = Object.getOwnPropertyNames;
    var ro = Object.getPrototypeOf;
    var no = Object.prototype.hasOwnProperty;
    var io = (r, e, t) => e in r ? Ie(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
    var a = (r, e) => Ie(r, "name", { value: e, configurable: true });
    var K = (r, e) => () => (r && (e = r(r = 0)), e);
    var I = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
    var ee = (r, e) => {
      for (var t in e)
        Ie(r, t, { get: e[t], enumerable: true });
    };
    var Cn = (r, e, t, n) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let i of to(e))
          !no.call(r, i) && i !== t && Ie(r, i, { get: () => e[i], enumerable: !(n = eo(e, i)) || n.enumerable });
      return r;
    };
    var We = (r, e, t) => (t = r != null ? Xs(ro(r)) : {}, Cn(e || !r || !r.__esModule ? Ie(t, "default", {
      value: r,
      enumerable: true
    }) : t, r));
    var O = (r) => Cn(Ie({}, "__esModule", { value: true }), r);
    var T = (r, e, t) => (io(r, typeof e != "symbol" ? e + "" : e, t), t);
    var Pn = I((it) => {
      "use strict";
      p();
      it.byteLength = oo;
      it.toByteArray = uo;
      it.fromByteArray = lo;
      var ae = [], te = [], so = typeof Uint8Array < "u" ? Uint8Array : Array, Tt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (_e = 0, In = Tt.length; _e < In; ++_e)
        ae[_e] = Tt[_e], te[Tt.charCodeAt(_e)] = _e;
      var _e, In;
      te["-".charCodeAt(0)] = 62;
      te["_".charCodeAt(0)] = 63;
      function Tn(r) {
        var e = r.length;
        if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var t = r.indexOf("=");
        t === -1 && (t = e);
        var n = t === e ? 0 : 4 - t % 4;
        return [t, n];
      }
      a(Tn, "getLens");
      function oo(r) {
        var e = Tn(r), t = e[0], n = e[1];
        return (t + n) * 3 / 4 - n;
      }
      a(oo, "byteLength");
      function ao(r, e, t) {
        return (e + t) * 3 / 4 - t;
      }
      a(ao, "_byteLength");
      function uo(r) {
        var e, t = Tn(r), n = t[0], i = t[1], s = new so(ao(r, n, i)), o = 0, u = i > 0 ? n - 4 : n, c;
        for (c = 0; c < u; c += 4)
          e = te[r.charCodeAt(c)] << 18 | te[r.charCodeAt(c + 1)] << 12 | te[r.charCodeAt(c + 2)] << 6 | te[r.charCodeAt(c + 3)], s[o++] = e >> 16 & 255, s[o++] = e >> 8 & 255, s[o++] = e & 255;
        return i === 2 && (e = te[r.charCodeAt(c)] << 2 | te[r.charCodeAt(c + 1)] >> 4, s[o++] = e & 255), i === 1 && (e = te[r.charCodeAt(c)] << 10 | te[r.charCodeAt(c + 1)] << 4 | te[r.charCodeAt(
          c + 2
        )] >> 2, s[o++] = e >> 8 & 255, s[o++] = e & 255), s;
      }
      a(uo, "toByteArray");
      function co(r) {
        return ae[r >> 18 & 63] + ae[r >> 12 & 63] + ae[r >> 6 & 63] + ae[r & 63];
      }
      a(co, "tripletToBase64");
      function ho(r, e, t) {
        for (var n, i = [], s = e; s < t; s += 3)
          n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(co(n));
        return i.join("");
      }
      a(ho, "encodeChunk");
      function lo(r) {
        for (var e, t = r.length, n = t % 3, i = [], s = 16383, o = 0, u = t - n; o < u; o += s)
          i.push(ho(r, o, o + s > u ? u : o + s));
        return n === 1 ? (e = r[t - 1], i.push(ae[e >> 2] + ae[e << 4 & 63] + "==")) : n === 2 && (e = (r[t - 2] << 8) + r[t - 1], i.push(
          ae[e >> 10] + ae[e >> 4 & 63] + ae[e << 2 & 63] + "="
        )), i.join("");
      }
      a(lo, "fromByteArray");
    });
    var Bn = I((Pt) => {
      p();
      Pt.read = function(r, e, t, n, i) {
        var s, o, u = i * 8 - n - 1, c = (1 << u) - 1, h = c >> 1, l = -7, m = t ? i - 1 : 0, E = t ? -1 : 1, _2 = r[e + m];
        for (m += E, s = _2 & (1 << -l) - 1, _2 >>= -l, l += u; l > 0; s = s * 256 + r[e + m], m += E, l -= 8)
          ;
        for (o = s & (1 << -l) - 1, s >>= -l, l += n; l > 0; o = o * 256 + r[e + m], m += E, l -= 8)
          ;
        if (s === 0)
          s = 1 - h;
        else {
          if (s === c)
            return o ? NaN : (_2 ? -1 : 1) * (1 / 0);
          o = o + Math.pow(2, n), s = s - h;
        }
        return (_2 ? -1 : 1) * o * Math.pow(2, s - n);
      };
      Pt.write = function(r, e, t, n, i, s) {
        var o, u, c, h = s * 8 - i - 1, l = (1 << h) - 1, m = l >> 1, E = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, _2 = n ? 0 : s - 1, P = n ? 1 : -1, N = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, o = l) : (o = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -o)) < 1 && (o--, c *= 2), o + m >= 1 ? e += E / c : e += E * Math.pow(2, 1 - m), e * c >= 2 && (o++, c /= 2), o + m >= l ? (u = 0, o = l) : o + m >= 1 ? (u = (e * c - 1) * Math.pow(
          2,
          i
        ), o = o + m) : (u = e * Math.pow(2, m - 1) * Math.pow(2, i), o = 0)); i >= 8; r[t + _2] = u & 255, _2 += P, u /= 256, i -= 8)
          ;
        for (o = o << i | u, h += i; h > 0; r[t + _2] = o & 255, _2 += P, o /= 256, h -= 8)
          ;
        r[t + _2 - P] |= N * 128;
      };
    });
    var Kn = I((Le) => {
      "use strict";
      p();
      var Bt = Pn(), Pe = Bn(), Ln = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      Le.Buffer = f;
      Le.SlowBuffer = wo;
      Le.INSPECT_MAX_BYTES = 50;
      var st = 2147483647;
      Le.kMaxLength = st;
      f.TYPED_ARRAY_SUPPORT = fo();
      !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      function fo() {
        try {
          let r = new Uint8Array(1), e = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(r, e), r.foo() === 42;
        } catch {
          return false;
        }
      }
      a(fo, "typedArraySupport");
      Object.defineProperty(
        f.prototype,
        "parent",
        { enumerable: true, get: function() {
          if (f.isBuffer(this))
            return this.buffer;
        } }
      );
      Object.defineProperty(f.prototype, "offset", { enumerable: true, get: function() {
        if (f.isBuffer(
          this
        ))
          return this.byteOffset;
      } });
      function fe(r) {
        if (r > st)
          throw new RangeError('The value "' + r + '" is invalid for option "size"');
        let e = new Uint8Array(r);
        return Object.setPrototypeOf(e, f.prototype), e;
      }
      a(fe, "createBuffer");
      function f(r, e, t) {
        if (typeof r == "number") {
          if (typeof e == "string")
            throw new TypeError('The "string" argument must be of type string. Received type number');
          return Mt(r);
        }
        return Dn(r, e, t);
      }
      a(f, "Buffer");
      f.poolSize = 8192;
      function Dn(r, e, t) {
        if (typeof r == "string")
          return yo(r, e);
        if (ArrayBuffer.isView(r))
          return mo(r);
        if (r == null)
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
        if (ue(r, ArrayBuffer) || r && ue(r.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ue(r, SharedArrayBuffer) || r && ue(r.buffer, SharedArrayBuffer)))
          return Rt(
            r,
            e,
            t
          );
        if (typeof r == "number")
          throw new TypeError('The "value" argument must not be of type number. Received type number');
        let n = r.valueOf && r.valueOf();
        if (n != null && n !== r)
          return f.from(n, e, t);
        let i = go(r);
        if (i)
          return i;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof r[Symbol.toPrimitive] == "function")
          return f.from(r[Symbol.toPrimitive](
            "string"
          ), e, t);
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof r);
      }
      a(
        Dn,
        "from"
      );
      f.from = function(r, e, t) {
        return Dn(r, e, t);
      };
      Object.setPrototypeOf(
        f.prototype,
        Uint8Array.prototype
      );
      Object.setPrototypeOf(f, Uint8Array);
      function On(r) {
        if (typeof r != "number")
          throw new TypeError('"size" argument must be of type number');
        if (r < 0)
          throw new RangeError(
            'The value "' + r + '" is invalid for option "size"'
          );
      }
      a(On, "assertSize");
      function po(r, e, t) {
        return On(r), r <= 0 ? fe(r) : e !== void 0 ? typeof t == "string" ? fe(r).fill(e, t) : fe(r).fill(
          e
        ) : fe(r);
      }
      a(po, "alloc");
      f.alloc = function(r, e, t) {
        return po(r, e, t);
      };
      function Mt(r) {
        return On(r), fe(r < 0 ? 0 : Dt(r) | 0);
      }
      a(Mt, "allocUnsafe");
      f.allocUnsafe = function(r) {
        return Mt(
          r
        );
      };
      f.allocUnsafeSlow = function(r) {
        return Mt(r);
      };
      function yo(r, e) {
        if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e))
          throw new TypeError("Unknown encoding: " + e);
        let t = kn(r, e) | 0, n = fe(t), i = n.write(r, e);
        return i !== t && (n = n.slice(0, i)), n;
      }
      a(yo, "fromString");
      function Lt(r) {
        let e = r.length < 0 ? 0 : Dt(r.length) | 0, t = fe(e);
        for (let n = 0; n < e; n += 1)
          t[n] = r[n] & 255;
        return t;
      }
      a(Lt, "fromArrayLike");
      function mo(r) {
        if (ue(r, Uint8Array)) {
          let e = new Uint8Array(r);
          return Rt(e.buffer, e.byteOffset, e.byteLength);
        }
        return Lt(
          r
        );
      }
      a(mo, "fromArrayView");
      function Rt(r, e, t) {
        if (e < 0 || r.byteLength < e)
          throw new RangeError(
            '"offset" is outside of buffer bounds'
          );
        if (r.byteLength < e + (t || 0))
          throw new RangeError(
            '"length" is outside of buffer bounds'
          );
        let n;
        return e === void 0 && t === void 0 ? n = new Uint8Array(
          r
        ) : t === void 0 ? n = new Uint8Array(r, e) : n = new Uint8Array(r, e, t), Object.setPrototypeOf(
          n,
          f.prototype
        ), n;
      }
      a(Rt, "fromArrayBuffer");
      function go(r) {
        if (f.isBuffer(r)) {
          let e = Dt(
            r.length
          ) | 0, t = fe(e);
          return t.length === 0 || r.copy(t, 0, 0, e), t;
        }
        if (r.length !== void 0)
          return typeof r.length != "number" || kt(r.length) ? fe(0) : Lt(r);
        if (r.type === "Buffer" && Array.isArray(r.data))
          return Lt(r.data);
      }
      a(go, "fromObject");
      function Dt(r) {
        if (r >= st)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + st.toString(16) + " bytes");
        return r | 0;
      }
      a(Dt, "checked");
      function wo(r) {
        return +r != r && (r = 0), f.alloc(+r);
      }
      a(wo, "SlowBuffer");
      f.isBuffer = a(function(e) {
        return e != null && e._isBuffer === true && e !== f.prototype;
      }, "isBuffer");
      f.compare = a(function(e, t) {
        if (ue(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), ue(t, Uint8Array) && (t = f.from(t, t.offset, t.byteLength)), !f.isBuffer(e) || !f.isBuffer(t))
          throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (e === t)
          return 0;
        let n = e.length, i = t.length;
        for (let s = 0, o = Math.min(n, i); s < o; ++s)
          if (e[s] !== t[s]) {
            n = e[s], i = t[s];
            break;
          }
        return n < i ? -1 : i < n ? 1 : 0;
      }, "compare");
      f.isEncoding = a(function(e) {
        switch (String(e).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      }, "isEncoding");
      f.concat = a(function(e, t) {
        if (!Array.isArray(e))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (e.length === 0)
          return f.alloc(0);
        let n;
        if (t === void 0)
          for (t = 0, n = 0; n < e.length; ++n)
            t += e[n].length;
        let i = f.allocUnsafe(t), s = 0;
        for (n = 0; n < e.length; ++n) {
          let o = e[n];
          if (ue(o, Uint8Array))
            s + o.length > i.length ? (f.isBuffer(
              o
            ) || (o = f.from(o)), o.copy(i, s)) : Uint8Array.prototype.set.call(i, o, s);
          else if (f.isBuffer(
            o
          ))
            o.copy(i, s);
          else
            throw new TypeError('"list" argument must be an Array of Buffers');
          s += o.length;
        }
        return i;
      }, "concat");
      function kn(r, e) {
        if (f.isBuffer(r))
          return r.length;
        if (ArrayBuffer.isView(r) || ue(r, ArrayBuffer))
          return r.byteLength;
        if (typeof r != "string")
          throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof r);
        let t = r.length, n = arguments.length > 2 && arguments[2] === true;
        if (!n && t === 0)
          return 0;
        let i = false;
        for (; ; )
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return t;
            case "utf8":
            case "utf-8":
              return Ft(r).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return t * 2;
            case "hex":
              return t >>> 1;
            case "base64":
              return $n(r).length;
            default:
              if (i)
                return n ? -1 : Ft(r).length;
              e = ("" + e).toLowerCase(), i = true;
          }
      }
      a(kn, "byteLength");
      f.byteLength = kn;
      function bo(r, e, t) {
        let n = false;
        if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, e >>>= 0, t <= e))
          return "";
        for (r || (r = "utf8"); ; )
          switch (r) {
            case "hex":
              return Po(
                this,
                e,
                t
              );
            case "utf8":
            case "utf-8":
              return qn(this, e, t);
            case "ascii":
              return Io(
                this,
                e,
                t
              );
            case "latin1":
            case "binary":
              return To(this, e, t);
            case "base64":
              return Ao(
                this,
                e,
                t
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return Bo(this, e, t);
            default:
              if (n)
                throw new TypeError("Unknown encoding: " + r);
              r = (r + "").toLowerCase(), n = true;
          }
      }
      a(
        bo,
        "slowToString"
      );
      f.prototype._isBuffer = true;
      function Ae(r, e, t) {
        let n = r[e];
        r[e] = r[t], r[t] = n;
      }
      a(Ae, "swap");
      f.prototype.swap16 = a(function() {
        let e = this.length;
        if (e % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (let t = 0; t < e; t += 2)
          Ae(this, t, t + 1);
        return this;
      }, "swap16");
      f.prototype.swap32 = a(function() {
        let e = this.length;
        if (e % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (let t = 0; t < e; t += 4)
          Ae(this, t, t + 3), Ae(this, t + 1, t + 2);
        return this;
      }, "swap32");
      f.prototype.swap64 = a(function() {
        let e = this.length;
        if (e % 8 !== 0)
          throw new RangeError(
            "Buffer size must be a multiple of 64-bits"
          );
        for (let t = 0; t < e; t += 8)
          Ae(this, t, t + 7), Ae(this, t + 1, t + 6), Ae(this, t + 2, t + 5), Ae(this, t + 3, t + 4);
        return this;
      }, "swap64");
      f.prototype.toString = a(function() {
        let e = this.length;
        return e === 0 ? "" : arguments.length === 0 ? qn(
          this,
          0,
          e
        ) : bo.apply(this, arguments);
      }, "toString");
      f.prototype.toLocaleString = f.prototype.toString;
      f.prototype.equals = a(function(e) {
        if (!f.isBuffer(e))
          throw new TypeError(
            "Argument must be a Buffer"
          );
        return this === e ? true : f.compare(this, e) === 0;
      }, "equals");
      f.prototype.inspect = a(function() {
        let e = "", t = Le.INSPECT_MAX_BYTES;
        return e = this.toString(
          "hex",
          0,
          t
        ).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">";
      }, "inspect");
      Ln && (f.prototype[Ln] = f.prototype.inspect);
      f.prototype.compare = a(function(e, t, n, i, s) {
        if (ue(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e))
          throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
        if (t === void 0 && (t = 0), n === void 0 && (n = e ? e.length : 0), i === void 0 && (i = 0), s === void 0 && (s = this.length), t < 0 || n > e.length || i < 0 || s > this.length)
          throw new RangeError("out of range index");
        if (i >= s && t >= n)
          return 0;
        if (i >= s)
          return -1;
        if (t >= n)
          return 1;
        if (t >>>= 0, n >>>= 0, i >>>= 0, s >>>= 0, this === e)
          return 0;
        let o = s - i, u = n - t, c = Math.min(o, u), h = this.slice(i, s), l = e.slice(t, n);
        for (let m = 0; m < c; ++m)
          if (h[m] !== l[m]) {
            o = h[m], u = l[m];
            break;
          }
        return o < u ? -1 : u < o ? 1 : 0;
      }, "compare");
      function Un(r, e, t, n, i) {
        if (r.length === 0)
          return -1;
        if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, kt(t) && (t = i ? 0 : r.length - 1), t < 0 && (t = r.length + t), t >= r.length) {
          if (i)
            return -1;
          t = r.length - 1;
        } else if (t < 0)
          if (i)
            t = 0;
          else
            return -1;
        if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e))
          return e.length === 0 ? -1 : Rn(r, e, t, n, i);
        if (typeof e == "number")
          return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? i ? Uint8Array.prototype.indexOf.call(r, e, t) : Uint8Array.prototype.lastIndexOf.call(r, e, t) : Rn(
            r,
            [e],
            t,
            n,
            i
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      a(Un, "bidirectionalIndexOf");
      function Rn(r, e, t, n, i) {
        let s = 1, o = r.length, u = e.length;
        if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
          if (r.length < 2 || e.length < 2)
            return -1;
          s = 2, o /= 2, u /= 2, t /= 2;
        }
        function c(l, m) {
          return s === 1 ? l[m] : l.readUInt16BE(m * s);
        }
        a(c, "read");
        let h;
        if (i) {
          let l = -1;
          for (h = t; h < o; h++)
            if (c(r, h) === c(e, l === -1 ? 0 : h - l)) {
              if (l === -1 && (l = h), h - l + 1 === u)
                return l * s;
            } else
              l !== -1 && (h -= h - l), l = -1;
        } else
          for (t + u > o && (t = o - u), h = t; h >= 0; h--) {
            let l = true;
            for (let m = 0; m < u; m++)
              if (c(r, h + m) !== c(e, m)) {
                l = false;
                break;
              }
            if (l)
              return h;
          }
        return -1;
      }
      a(Rn, "arrayIndexOf");
      f.prototype.includes = a(function(e, t, n) {
        return this.indexOf(e, t, n) !== -1;
      }, "includes");
      f.prototype.indexOf = a(function(e, t, n) {
        return Un(this, e, t, n, true);
      }, "indexOf");
      f.prototype.lastIndexOf = a(function(e, t, n) {
        return Un(this, e, t, n, false);
      }, "lastIndexOf");
      function So(r, e, t, n) {
        t = Number(t) || 0;
        let i = r.length - t;
        n ? (n = Number(n), n > i && (n = i)) : n = i;
        let s = e.length;
        n > s / 2 && (n = s / 2);
        let o;
        for (o = 0; o < n; ++o) {
          let u = parseInt(e.substr(o * 2, 2), 16);
          if (kt(u))
            return o;
          r[t + o] = u;
        }
        return o;
      }
      a(So, "hexWrite");
      function xo(r, e, t, n) {
        return ot(Ft(
          e,
          r.length - t
        ), r, t, n);
      }
      a(xo, "utf8Write");
      function Eo(r, e, t, n) {
        return ot(Mo(e), r, t, n);
      }
      a(Eo, "asciiWrite");
      function vo(r, e, t, n) {
        return ot($n(e), r, t, n);
      }
      a(vo, "base64Write");
      function _o(r, e, t, n) {
        return ot(Do(e, r.length - t), r, t, n);
      }
      a(_o, "ucs2Write");
      f.prototype.write = a(function(e, t, n, i) {
        if (t === void 0)
          i = "utf8", n = this.length, t = 0;
        else if (n === void 0 && typeof t == "string")
          i = t, n = this.length, t = 0;
        else if (isFinite(t))
          t = t >>> 0, isFinite(n) ? (n = n >>> 0, i === void 0 && (i = "utf8")) : (i = n, n = void 0);
        else
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        let s = this.length - t;
        if ((n === void 0 || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length)
          throw new RangeError(
            "Attempt to write outside buffer bounds"
          );
        i || (i = "utf8");
        let o = false;
        for (; ; )
          switch (i) {
            case "hex":
              return So(this, e, t, n);
            case "utf8":
            case "utf-8":
              return xo(this, e, t, n);
            case "ascii":
            case "latin1":
            case "binary":
              return Eo(this, e, t, n);
            case "base64":
              return vo(
                this,
                e,
                t,
                n
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return _o(this, e, t, n);
            default:
              if (o)
                throw new TypeError("Unknown encoding: " + i);
              i = ("" + i).toLowerCase(), o = true;
          }
      }, "write");
      f.prototype.toJSON = a(function() {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
      }, "toJSON");
      function Ao(r, e, t) {
        return e === 0 && t === r.length ? Bt.fromByteArray(r) : Bt.fromByteArray(r.slice(e, t));
      }
      a(Ao, "base64Slice");
      function qn(r, e, t) {
        t = Math.min(r.length, t);
        let n = [], i = e;
        for (; i < t; ) {
          let s = r[i], o = null, u = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
          if (i + u <= t) {
            let c, h, l, m;
            switch (u) {
              case 1:
                s < 128 && (o = s);
                break;
              case 2:
                c = r[i + 1], (c & 192) === 128 && (m = (s & 31) << 6 | c & 63, m > 127 && (o = m));
                break;
              case 3:
                c = r[i + 1], h = r[i + 2], (c & 192) === 128 && (h & 192) === 128 && (m = (s & 15) << 12 | (c & 63) << 6 | h & 63, m > 2047 && (m < 55296 || m > 57343) && (o = m));
                break;
              case 4:
                c = r[i + 1], h = r[i + 2], l = r[i + 3], (c & 192) === 128 && (h & 192) === 128 && (l & 192) === 128 && (m = (s & 15) << 18 | (c & 63) << 12 | (h & 63) << 6 | l & 63, m > 65535 && m < 1114112 && (o = m));
            }
          }
          o === null ? (o = 65533, u = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), n.push(o), i += u;
        }
        return Co(n);
      }
      a(qn, "utf8Slice");
      var Fn = 4096;
      function Co(r) {
        let e = r.length;
        if (e <= Fn)
          return String.fromCharCode.apply(String, r);
        let t = "", n = 0;
        for (; n < e; )
          t += String.fromCharCode.apply(String, r.slice(n, n += Fn));
        return t;
      }
      a(Co, "decodeCodePointsArray");
      function Io(r, e, t) {
        let n = "";
        t = Math.min(r.length, t);
        for (let i = e; i < t; ++i)
          n += String.fromCharCode(r[i] & 127);
        return n;
      }
      a(Io, "asciiSlice");
      function To(r, e, t) {
        let n = "";
        t = Math.min(r.length, t);
        for (let i = e; i < t; ++i)
          n += String.fromCharCode(r[i]);
        return n;
      }
      a(To, "latin1Slice");
      function Po(r, e, t) {
        let n = r.length;
        (!e || e < 0) && (e = 0), (!t || t < 0 || t > n) && (t = n);
        let i = "";
        for (let s = e; s < t; ++s)
          i += Oo[r[s]];
        return i;
      }
      a(Po, "hexSlice");
      function Bo(r, e, t) {
        let n = r.slice(e, t), i = "";
        for (let s = 0; s < n.length - 1; s += 2)
          i += String.fromCharCode(n[s] + n[s + 1] * 256);
        return i;
      }
      a(Bo, "utf16leSlice");
      f.prototype.slice = a(function(e, t) {
        let n = this.length;
        e = ~~e, t = t === void 0 ? n : ~~t, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < e && (t = e);
        let i = this.subarray(
          e,
          t
        );
        return Object.setPrototypeOf(i, f.prototype), i;
      }, "slice");
      function U(r, e, t) {
        if (r % 1 !== 0 || r < 0)
          throw new RangeError("offset is not uint");
        if (r + e > t)
          throw new RangeError(
            "Trying to access beyond buffer length"
          );
      }
      a(U, "checkOffset");
      f.prototype.readUintLE = f.prototype.readUIntLE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
        let i = this[e], s = 1, o = 0;
        for (; ++o < t && (s *= 256); )
          i += this[e + o] * s;
        return i;
      }, "readUIntLE");
      f.prototype.readUintBE = f.prototype.readUIntBE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
        let i = this[e + --t], s = 1;
        for (; t > 0 && (s *= 256); )
          i += this[e + --t] * s;
        return i;
      }, "readUIntBE");
      f.prototype.readUint8 = f.prototype.readUInt8 = a(function(e, t) {
        return e = e >>> 0, t || U(e, 1, this.length), this[e];
      }, "readUInt8");
      f.prototype.readUint16LE = f.prototype.readUInt16LE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 2, this.length), this[e] | this[e + 1] << 8;
      }, "readUInt16LE");
      f.prototype.readUint16BE = f.prototype.readUInt16BE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 2, this.length), this[e] << 8 | this[e + 1];
      }, "readUInt16BE");
      f.prototype.readUint32LE = f.prototype.readUInt32LE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
      }, "readUInt32LE");
      f.prototype.readUint32BE = f.prototype.readUInt32BE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
      }, "readUInt32BE");
      f.prototype.readBigUInt64LE = ge(a(function(e) {
        e = e >>> 0, Be(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && je(e, this.length - 8);
        let i = t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, s = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
        return BigInt(i) + (BigInt(s) << BigInt(32));
      }, "readBigUInt64LE"));
      f.prototype.readBigUInt64BE = ge(a(function(e) {
        e = e >>> 0, Be(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && je(e, this.length - 8);
        let i = t * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], s = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
        return (BigInt(
          i
        ) << BigInt(32)) + BigInt(s);
      }, "readBigUInt64BE"));
      f.prototype.readIntLE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
        let i = this[e], s = 1, o = 0;
        for (; ++o < t && (s *= 256); )
          i += this[e + o] * s;
        return s *= 128, i >= s && (i -= Math.pow(2, 8 * t)), i;
      }, "readIntLE");
      f.prototype.readIntBE = a(function(e, t, n) {
        e = e >>> 0, t = t >>> 0, n || U(e, t, this.length);
        let i = t, s = 1, o = this[e + --i];
        for (; i > 0 && (s *= 256); )
          o += this[e + --i] * s;
        return s *= 128, o >= s && (o -= Math.pow(2, 8 * t)), o;
      }, "readIntBE");
      f.prototype.readInt8 = a(function(e, t) {
        return e = e >>> 0, t || U(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
      }, "readInt8");
      f.prototype.readInt16LE = a(function(e, t) {
        e = e >>> 0, t || U(e, 2, this.length);
        let n = this[e] | this[e + 1] << 8;
        return n & 32768 ? n | 4294901760 : n;
      }, "readInt16LE");
      f.prototype.readInt16BE = a(
        function(e, t) {
          e = e >>> 0, t || U(e, 2, this.length);
          let n = this[e + 1] | this[e] << 8;
          return n & 32768 ? n | 4294901760 : n;
        },
        "readInt16BE"
      );
      f.prototype.readInt32LE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
      }, "readInt32LE");
      f.prototype.readInt32BE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
      }, "readInt32BE");
      f.prototype.readBigInt64LE = ge(a(function(e) {
        e = e >>> 0, Be(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && je(
          e,
          this.length - 8
        );
        let i = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
        return (BigInt(
          i
        ) << BigInt(32)) + BigInt(t + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
      }, "readBigInt64LE"));
      f.prototype.readBigInt64BE = ge(a(function(e) {
        e = e >>> 0, Be(e, "offset");
        let t = this[e], n = this[e + 7];
        (t === void 0 || n === void 0) && je(e, this.length - 8);
        let i = (t << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
        return (BigInt(i) << BigInt(32)) + BigInt(
          this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
        );
      }, "readBigInt64BE"));
      f.prototype.readFloatLE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 4, this.length), Pe.read(
          this,
          e,
          true,
          23,
          4
        );
      }, "readFloatLE");
      f.prototype.readFloatBE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 4, this.length), Pe.read(this, e, false, 23, 4);
      }, "readFloatBE");
      f.prototype.readDoubleLE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 8, this.length), Pe.read(this, e, true, 52, 8);
      }, "readDoubleLE");
      f.prototype.readDoubleBE = a(function(e, t) {
        return e = e >>> 0, t || U(e, 8, this.length), Pe.read(this, e, false, 52, 8);
      }, "readDoubleBE");
      function z(r, e, t, n, i, s) {
        if (!f.isBuffer(
          r
        ))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < s)
          throw new RangeError('"value" argument is out of bounds');
        if (t + n > r.length)
          throw new RangeError(
            "Index out of range"
          );
      }
      a(z, "checkInt");
      f.prototype.writeUintLE = f.prototype.writeUIntLE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
          let u = Math.pow(2, 8 * n) - 1;
          z(
            this,
            e,
            t,
            n,
            u,
            0
          );
        }
        let s = 1, o = 0;
        for (this[t] = e & 255; ++o < n && (s *= 256); )
          this[t + o] = e / s & 255;
        return t + n;
      }, "writeUIntLE");
      f.prototype.writeUintBE = f.prototype.writeUIntBE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, n = n >>> 0, !i) {
          let u = Math.pow(2, 8 * n) - 1;
          z(this, e, t, n, u, 0);
        }
        let s = n - 1, o = 1;
        for (this[t + s] = e & 255; --s >= 0 && (o *= 256); )
          this[t + s] = e / o & 255;
        return t + n;
      }, "writeUIntBE");
      f.prototype.writeUint8 = f.prototype.writeUInt8 = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(this, e, t, 1, 255, 0), this[t] = e & 255, t + 1;
      }, "writeUInt8");
      f.prototype.writeUint16LE = f.prototype.writeUInt16LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(
          this,
          e,
          t,
          2,
          65535,
          0
        ), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
      }, "writeUInt16LE");
      f.prototype.writeUint16BE = f.prototype.writeUInt16BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(
          this,
          e,
          t,
          2,
          65535,
          0
        ), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
      }, "writeUInt16BE");
      f.prototype.writeUint32LE = f.prototype.writeUInt32LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(
          this,
          e,
          t,
          4,
          4294967295,
          0
        ), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = e & 255, t + 4;
      }, "writeUInt32LE");
      f.prototype.writeUint32BE = f.prototype.writeUInt32BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
      }, "writeUInt32BE");
      function Nn(r, e, t, n, i) {
        Gn(
          e,
          n,
          i,
          r,
          t,
          7
        );
        let s = Number(e & BigInt(4294967295));
        r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s, s = s >> 8, r[t++] = s;
        let o = Number(e >> BigInt(32) & BigInt(4294967295));
        return r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, o = o >> 8, r[t++] = o, t;
      }
      a(Nn, "wrtBigUInt64LE");
      function Qn(r, e, t, n, i) {
        Gn(e, n, i, r, t, 7);
        let s = Number(e & BigInt(4294967295));
        r[t + 7] = s, s = s >> 8, r[t + 6] = s, s = s >> 8, r[t + 5] = s, s = s >> 8, r[t + 4] = s;
        let o = Number(e >> BigInt(32) & BigInt(4294967295));
        return r[t + 3] = o, o = o >> 8, r[t + 2] = o, o = o >> 8, r[t + 1] = o, o = o >> 8, r[t] = o, t + 8;
      }
      a(Qn, "wrtBigUInt64BE");
      f.prototype.writeBigUInt64LE = ge(a(function(e, t = 0) {
        return Nn(this, e, t, BigInt(0), BigInt(
          "0xffffffffffffffff"
        ));
      }, "writeBigUInt64LE"));
      f.prototype.writeBigUInt64BE = ge(a(function(e, t = 0) {
        return Qn(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"));
      }, "writeBigUInt64BE"));
      f.prototype.writeIntLE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, !i) {
          let c = Math.pow(
            2,
            8 * n - 1
          );
          z(this, e, t, n, c - 1, -c);
        }
        let s = 0, o = 1, u = 0;
        for (this[t] = e & 255; ++s < n && (o *= 256); )
          e < 0 && u === 0 && this[t + s - 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
        return t + n;
      }, "writeIntLE");
      f.prototype.writeIntBE = a(function(e, t, n, i) {
        if (e = +e, t = t >>> 0, !i) {
          let c = Math.pow(
            2,
            8 * n - 1
          );
          z(this, e, t, n, c - 1, -c);
        }
        let s = n - 1, o = 1, u = 0;
        for (this[t + s] = e & 255; --s >= 0 && (o *= 256); )
          e < 0 && u === 0 && this[t + s + 1] !== 0 && (u = 1), this[t + s] = (e / o >> 0) - u & 255;
        return t + n;
      }, "writeIntBE");
      f.prototype.writeInt8 = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(
          this,
          e,
          t,
          1,
          127,
          -128
        ), e < 0 && (e = 255 + e + 1), this[t] = e & 255, t + 1;
      }, "writeInt8");
      f.prototype.writeInt16LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(this, e, t, 2, 32767, -32768), this[t] = e & 255, this[t + 1] = e >>> 8, t + 2;
      }, "writeInt16LE");
      f.prototype.writeInt16BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = e & 255, t + 2;
      }, "writeInt16BE");
      f.prototype.writeInt32LE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(this, e, t, 4, 2147483647, -2147483648), this[t] = e & 255, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4;
      }, "writeInt32LE");
      f.prototype.writeInt32BE = a(function(e, t, n) {
        return e = +e, t = t >>> 0, n || z(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = e & 255, t + 4;
      }, "writeInt32BE");
      f.prototype.writeBigInt64LE = ge(a(function(e, t = 0) {
        return Nn(this, e, t, -BigInt(
          "0x8000000000000000"
        ), BigInt("0x7fffffffffffffff"));
      }, "writeBigInt64LE"));
      f.prototype.writeBigInt64BE = ge(a(function(e, t = 0) {
        return Qn(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      }, "writeBigInt64BE"));
      function Wn(r, e, t, n, i, s) {
        if (t + n > r.length)
          throw new RangeError("Index out of range");
        if (t < 0)
          throw new RangeError(
            "Index out of range"
          );
      }
      a(Wn, "checkIEEE754");
      function jn(r, e, t, n, i) {
        return e = +e, t = t >>> 0, i || Wn(r, e, t, 4, 34028234663852886e22, -34028234663852886e22), Pe.write(
          r,
          e,
          t,
          n,
          23,
          4
        ), t + 4;
      }
      a(jn, "writeFloat");
      f.prototype.writeFloatLE = a(function(e, t, n) {
        return jn(
          this,
          e,
          t,
          true,
          n
        );
      }, "writeFloatLE");
      f.prototype.writeFloatBE = a(function(e, t, n) {
        return jn(
          this,
          e,
          t,
          false,
          n
        );
      }, "writeFloatBE");
      function Hn(r, e, t, n, i) {
        return e = +e, t = t >>> 0, i || Wn(
          r,
          e,
          t,
          8,
          17976931348623157e292,
          -17976931348623157e292
        ), Pe.write(r, e, t, n, 52, 8), t + 8;
      }
      a(Hn, "writeDouble");
      f.prototype.writeDoubleLE = a(function(e, t, n) {
        return Hn(
          this,
          e,
          t,
          true,
          n
        );
      }, "writeDoubleLE");
      f.prototype.writeDoubleBE = a(function(e, t, n) {
        return Hn(
          this,
          e,
          t,
          false,
          n
        );
      }, "writeDoubleBE");
      f.prototype.copy = a(function(e, t, n, i) {
        if (!f.isBuffer(
          e
        ))
          throw new TypeError("argument should be a Buffer");
        if (n || (n = 0), !i && i !== 0 && (i = this.length), t >= e.length && (t = e.length), t || (t = 0), i > 0 && i < n && (i = n), i === n || e.length === 0 || this.length === 0)
          return 0;
        if (t < 0)
          throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length)
          throw new RangeError("Index out of range");
        if (i < 0)
          throw new RangeError(
            "sourceEnd out of bounds"
          );
        i > this.length && (i = this.length), e.length - t < i - n && (i = e.length - t + n);
        let s = i - n;
        return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, i) : Uint8Array.prototype.set.call(e, this.subarray(n, i), t), s;
      }, "copy");
      f.prototype.fill = a(function(e, t, n, i) {
        if (typeof e == "string") {
          if (typeof t == "string" ? (i = t, t = 0, n = this.length) : typeof n == "string" && (i = n, n = this.length), i !== void 0 && typeof i != "string")
            throw new TypeError("encoding must be a string");
          if (typeof i == "string" && !f.isEncoding(i))
            throw new TypeError("Unknown encoding: " + i);
          if (e.length === 1) {
            let o = e.charCodeAt(0);
            (i === "utf8" && o < 128 || i === "latin1") && (e = o);
          }
        } else
          typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
        if (t < 0 || this.length < t || this.length < n)
          throw new RangeError("Out of range index");
        if (n <= t)
          return this;
        t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
        let s;
        if (typeof e == "number")
          for (s = t; s < n; ++s)
            this[s] = e;
        else {
          let o = f.isBuffer(e) ? e : f.from(e, i), u = o.length;
          if (u === 0)
            throw new TypeError(
              'The value "' + e + '" is invalid for argument "value"'
            );
          for (s = 0; s < n - t; ++s)
            this[s + t] = o[s % u];
        }
        return this;
      }, "fill");
      var Te = {};
      function Ot(r, e, t) {
        var n;
        Te[r] = (n = class extends t {
          constructor() {
            super(), Object.defineProperty(this, "message", {
              value: e.apply(this, arguments),
              writable: true,
              configurable: true
            }), this.name = `${this.name} [${r}]`, this.stack, delete this.name;
          }
          get code() {
            return r;
          }
          set code(s) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value: s,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${r}]: ${this.message}`;
          }
        }, a(n, "NodeError"), n);
      }
      a(Ot, "E");
      Ot("ERR_BUFFER_OUT_OF_BOUNDS", function(r) {
        return r ? `${r} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
      }, RangeError);
      Ot("ERR_INVALID_ARG_TYPE", function(r, e) {
        return `The "${r}" argument must be of type number. Received type ${typeof e}`;
      }, TypeError);
      Ot("ERR_OUT_OF_RANGE", function(r, e, t) {
        let n = `The value of "${r}" is out of range.`, i = t;
        return Number.isInteger(t) && Math.abs(t) > 2 ** 32 ? i = Mn(String(t)) : typeof t == "bigint" && (i = String(t), (t > BigInt(2) ** BigInt(32) || t < -(BigInt(2) ** BigInt(32))) && (i = Mn(i)), i += "n"), n += ` It must be ${e}. Received ${i}`, n;
      }, RangeError);
      function Mn(r) {
        let e = "", t = r.length, n = r[0] === "-" ? 1 : 0;
        for (; t >= n + 4; t -= 3)
          e = `_${r.slice(t - 3, t)}${e}`;
        return `${r.slice(
          0,
          t
        )}${e}`;
      }
      a(Mn, "addNumericalSeparator");
      function Lo(r, e, t) {
        Be(e, "offset"), (r[e] === void 0 || r[e + t] === void 0) && je(e, r.length - (t + 1));
      }
      a(Lo, "checkBounds");
      function Gn(r, e, t, n, i, s) {
        if (r > t || r < e) {
          let o = typeof e == "bigint" ? "n" : "", u;
          throw s > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${o} and < 2${o} ** ${(s + 1) * 8}${o}` : u = `>= -(2${o} ** ${(s + 1) * 8 - 1}${o}) and < 2 ** ${(s + 1) * 8 - 1}${o}` : u = `>= ${e}${o} and <= ${t}${o}`, new Te.ERR_OUT_OF_RANGE(
            "value",
            u,
            r
          );
        }
        Lo(n, i, s);
      }
      a(Gn, "checkIntBI");
      function Be(r, e) {
        if (typeof r != "number")
          throw new Te.ERR_INVALID_ARG_TYPE(e, "number", r);
      }
      a(Be, "validateNumber");
      function je(r, e, t) {
        throw Math.floor(r) !== r ? (Be(r, t), new Te.ERR_OUT_OF_RANGE(
          t || "offset",
          "an integer",
          r
        )) : e < 0 ? new Te.ERR_BUFFER_OUT_OF_BOUNDS() : new Te.ERR_OUT_OF_RANGE(t || "offset", `>= ${t ? 1 : 0} and <= ${e}`, r);
      }
      a(je, "boundsError");
      var Ro = /[^+/0-9A-Za-z-_]/g;
      function Fo(r) {
        if (r = r.split("=")[0], r = r.trim().replace(Ro, ""), r.length < 2)
          return "";
        for (; r.length % 4 !== 0; )
          r = r + "=";
        return r;
      }
      a(Fo, "base64clean");
      function Ft(r, e) {
        e = e || 1 / 0;
        let t, n = r.length, i = null, s = [];
        for (let o = 0; o < n; ++o) {
          if (t = r.charCodeAt(o), t > 55295 && t < 57344) {
            if (!i) {
              if (t > 56319) {
                (e -= 3) > -1 && s.push(239, 191, 189);
                continue;
              } else if (o + 1 === n) {
                (e -= 3) > -1 && s.push(239, 191, 189);
                continue;
              }
              i = t;
              continue;
            }
            if (t < 56320) {
              (e -= 3) > -1 && s.push(
                239,
                191,
                189
              ), i = t;
              continue;
            }
            t = (i - 55296 << 10 | t - 56320) + 65536;
          } else
            i && (e -= 3) > -1 && s.push(
              239,
              191,
              189
            );
          if (i = null, t < 128) {
            if ((e -= 1) < 0)
              break;
            s.push(t);
          } else if (t < 2048) {
            if ((e -= 2) < 0)
              break;
            s.push(t >> 6 | 192, t & 63 | 128);
          } else if (t < 65536) {
            if ((e -= 3) < 0)
              break;
            s.push(t >> 12 | 224, t >> 6 & 63 | 128, t & 63 | 128);
          } else if (t < 1114112) {
            if ((e -= 4) < 0)
              break;
            s.push(t >> 18 | 240, t >> 12 & 63 | 128, t >> 6 & 63 | 128, t & 63 | 128);
          } else
            throw new Error("Invalid code point");
        }
        return s;
      }
      a(
        Ft,
        "utf8ToBytes"
      );
      function Mo(r) {
        let e = [];
        for (let t = 0; t < r.length; ++t)
          e.push(r.charCodeAt(
            t
          ) & 255);
        return e;
      }
      a(Mo, "asciiToBytes");
      function Do(r, e) {
        let t, n, i, s = [];
        for (let o = 0; o < r.length && !((e -= 2) < 0); ++o)
          t = r.charCodeAt(o), n = t >> 8, i = t % 256, s.push(i), s.push(n);
        return s;
      }
      a(Do, "utf16leToBytes");
      function $n(r) {
        return Bt.toByteArray(Fo(r));
      }
      a($n, "base64ToBytes");
      function ot(r, e, t, n) {
        let i;
        for (i = 0; i < n && !(i + t >= e.length || i >= r.length); ++i)
          e[i + t] = r[i];
        return i;
      }
      a(ot, "blitBuffer");
      function ue(r, e) {
        return r instanceof e || r != null && r.constructor != null && r.constructor.name != null && r.constructor.name === e.name;
      }
      a(ue, "isInstance");
      function kt(r) {
        return r !== r;
      }
      a(kt, "numberIsNaN");
      var Oo = function() {
        let r = "0123456789abcdef", e = new Array(256);
        for (let t = 0; t < 16; ++t) {
          let n = t * 16;
          for (let i = 0; i < 16; ++i)
            e[n + i] = r[t] + r[i];
        }
        return e;
      }();
      function ge(r) {
        return typeof BigInt > "u" ? ko : r;
      }
      a(ge, "defineBigIntMethod");
      function ko() {
        throw new Error("BigInt not supported");
      }
      a(ko, "BufferBigIntNotDefined");
    });
    var b;
    var S;
    var v;
    var w;
    var d;
    var y;
    var p = K(() => {
      "use strict";
      b = globalThis, S = globalThis.setImmediate ?? ((r) => setTimeout(
        r,
        0
      )), v = globalThis.clearImmediate ?? ((r) => clearTimeout(r)), w = globalThis.crypto ?? {};
      w.subtle ?? (w.subtle = {});
      d = typeof globalThis.Buffer == "function" && typeof globalThis.Buffer.allocUnsafe == "function" ? globalThis.Buffer : Kn().Buffer, y = globalThis.process ?? {};
      y.env ?? (y.env = {});
      try {
        y.nextTick(() => {
        });
      } catch {
        let e = Promise.resolve();
        y.nextTick = e.then.bind(e);
      }
    });
    var we = I((Xc, Ut) => {
      "use strict";
      p();
      var Re = typeof Reflect == "object" ? Reflect : null, Vn = Re && typeof Re.apply == "function" ? Re.apply : a(function(e, t, n) {
        return Function.prototype.apply.call(e, t, n);
      }, "ReflectApply"), at;
      Re && typeof Re.ownKeys == "function" ? at = Re.ownKeys : Object.getOwnPropertySymbols ? at = a(function(e) {
        return Object.getOwnPropertyNames(
          e
        ).concat(Object.getOwnPropertySymbols(e));
      }, "ReflectOwnKeys") : at = a(function(e) {
        return Object.getOwnPropertyNames(e);
      }, "ReflectOwnKeys");
      function Uo(r) {
        console && console.warn && console.warn(r);
      }
      a(Uo, "ProcessEmitWarning");
      var Yn = Number.isNaN || a(function(e) {
        return e !== e;
      }, "NumberIsNaN");
      function B() {
        B.init.call(this);
      }
      a(B, "EventEmitter");
      Ut.exports = B;
      Ut.exports.once = Wo;
      B.EventEmitter = B;
      B.prototype._events = void 0;
      B.prototype._eventsCount = 0;
      B.prototype._maxListeners = void 0;
      var zn = 10;
      function ut(r) {
        if (typeof r != "function")
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
      }
      a(ut, "checkListener");
      Object.defineProperty(B, "defaultMaxListeners", { enumerable: true, get: function() {
        return zn;
      }, set: function(r) {
        if (typeof r != "number" || r < 0 || Yn(r))
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
        zn = r;
      } });
      B.init = function() {
        (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
      };
      B.prototype.setMaxListeners = a(function(e) {
        if (typeof e != "number" || e < 0 || Yn(
          e
        ))
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e, this;
      }, "setMaxListeners");
      function Zn(r) {
        return r._maxListeners === void 0 ? B.defaultMaxListeners : r._maxListeners;
      }
      a(Zn, "_getMaxListeners");
      B.prototype.getMaxListeners = a(
        function() {
          return Zn(this);
        },
        "getMaxListeners"
      );
      B.prototype.emit = a(function(e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t.push(arguments[n]);
        var i = e === "error", s = this._events;
        if (s !== void 0)
          i = i && s.error === void 0;
        else if (!i)
          return false;
        if (i) {
          var o;
          if (t.length > 0 && (o = t[0]), o instanceof Error)
            throw o;
          var u = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
          throw u.context = o, u;
        }
        var c = s[e];
        if (c === void 0)
          return false;
        if (typeof c == "function")
          Vn(c, this, t);
        else
          for (var h = c.length, l = ri(c, h), n = 0; n < h; ++n)
            Vn(l[n], this, t);
        return true;
      }, "emit");
      function Jn(r, e, t, n) {
        var i, s, o;
        if (ut(t), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit("newListener", e, t.listener ? t.listener : t), s = r._events), o = s[e]), o === void 0)
          o = s[e] = t, ++r._eventsCount;
        else if (typeof o == "function" ? o = s[e] = n ? [t, o] : [o, t] : n ? o.unshift(t) : o.push(t), i = Zn(r), i > 0 && o.length > i && !o.warned) {
          o.warned = true;
          var u = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = e, u.count = o.length, Uo(u);
        }
        return r;
      }
      a(Jn, "_addListener");
      B.prototype.addListener = a(function(e, t) {
        return Jn(
          this,
          e,
          t,
          false
        );
      }, "addListener");
      B.prototype.on = B.prototype.addListener;
      B.prototype.prependListener = a(function(e, t) {
        return Jn(this, e, t, true);
      }, "prependListener");
      function qo() {
        if (!this.fired)
          return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
      }
      a(qo, "onceWrapper");
      function Xn(r, e, t) {
        var n = {
          fired: false,
          wrapFn: void 0,
          target: r,
          type: e,
          listener: t
        }, i = qo.bind(n);
        return i.listener = t, n.wrapFn = i, i;
      }
      a(Xn, "_onceWrap");
      B.prototype.once = a(function(e, t) {
        return ut(t), this.on(e, Xn(this, e, t)), this;
      }, "once");
      B.prototype.prependOnceListener = a(function(e, t) {
        return ut(t), this.prependListener(e, Xn(this, e, t)), this;
      }, "prependOnceListener");
      B.prototype.removeListener = a(function(e, t) {
        var n, i, s, o, u;
        if (ut(t), i = this._events, i === void 0)
          return this;
        if (n = i[e], n === void 0)
          return this;
        if (n === t || n.listener === t)
          --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
        else if (typeof n != "function") {
          for (s = -1, o = n.length - 1; o >= 0; o--)
            if (n[o] === t || n[o].listener === t) {
              u = n[o].listener, s = o;
              break;
            }
          if (s < 0)
            return this;
          s === 0 ? n.shift() : No(n, s), n.length === 1 && (i[e] = n[0]), i.removeListener !== void 0 && this.emit(
            "removeListener",
            e,
            u || t
          );
        }
        return this;
      }, "removeListener");
      B.prototype.off = B.prototype.removeListener;
      B.prototype.removeAllListeners = a(function(e) {
        var t, n, i;
        if (n = this._events, n === void 0)
          return this;
        if (n.removeListener === void 0)
          return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[e]), this;
        if (arguments.length === 0) {
          var s = Object.keys(n), o;
          for (i = 0; i < s.length; ++i)
            o = s[i], o !== "removeListener" && this.removeAllListeners(o);
          return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
        }
        if (t = n[e], typeof t == "function")
          this.removeListener(e, t);
        else if (t !== void 0)
          for (i = t.length - 1; i >= 0; i--)
            this.removeListener(e, t[i]);
        return this;
      }, "removeAllListeners");
      function ei(r, e, t) {
        var n = r._events;
        if (n === void 0)
          return [];
        var i = n[e];
        return i === void 0 ? [] : typeof i == "function" ? t ? [i.listener || i] : [i] : t ? Qo(i) : ri(i, i.length);
      }
      a(ei, "_listeners");
      B.prototype.listeners = a(function(e) {
        return ei(this, e, true);
      }, "listeners");
      B.prototype.rawListeners = a(function(e) {
        return ei(this, e, false);
      }, "rawListeners");
      B.listenerCount = function(r, e) {
        return typeof r.listenerCount == "function" ? r.listenerCount(e) : ti.call(r, e);
      };
      B.prototype.listenerCount = ti;
      function ti(r) {
        var e = this._events;
        if (e !== void 0) {
          var t = e[r];
          if (typeof t == "function")
            return 1;
          if (t !== void 0)
            return t.length;
        }
        return 0;
      }
      a(ti, "listenerCount");
      B.prototype.eventNames = a(function() {
        return this._eventsCount > 0 ? at(this._events) : [];
      }, "eventNames");
      function ri(r, e) {
        for (var t = new Array(e), n = 0; n < e; ++n)
          t[n] = r[n];
        return t;
      }
      a(ri, "arrayClone");
      function No(r, e) {
        for (; e + 1 < r.length; e++)
          r[e] = r[e + 1];
        r.pop();
      }
      a(No, "spliceOne");
      function Qo(r) {
        for (var e = new Array(r.length), t = 0; t < e.length; ++t)
          e[t] = r[t].listener || r[t];
        return e;
      }
      a(Qo, "unwrapListeners");
      function Wo(r, e) {
        return new Promise(
          function(t, n) {
            function i(o) {
              r.removeListener(e, s), n(o);
            }
            a(i, "errorListener");
            function s() {
              typeof r.removeListener == "function" && r.removeListener("error", i), t([].slice.call(
                arguments
              ));
            }
            a(s, "resolver"), ni(r, e, s, { once: true }), e !== "error" && jo(r, i, { once: true });
          }
        );
      }
      a(Wo, "once");
      function jo(r, e, t) {
        typeof r.on == "function" && ni(r, "error", e, t);
      }
      a(
        jo,
        "addErrorHandlerIfEventEmitter"
      );
      function ni(r, e, t, n) {
        if (typeof r.on == "function")
          n.once ? r.once(e, t) : r.on(e, t);
        else if (typeof r.addEventListener == "function")
          r.addEventListener(
            e,
            a(function i(s) {
              n.once && r.removeEventListener(e, i), t(s);
            }, "wrapListener")
          );
        else
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
      }
      a(ni, "eventTargetAgnosticAddListener");
    });
    var He = {};
    ee(He, { default: () => Ho });
    var Ho;
    var Ge = K(() => {
      p();
      Ho = {};
    });
    function $e(r) {
      let e = 1779033703, t = 3144134277, n = 1013904242, i = 2773480762, s = 1359893119, o = 2600822924, u = 528734635, c = 1541459225, h = 0, l = 0, m = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ], E = a(
        (A, g) => A >>> g | A << 32 - g,
        "rrot"
      ), _2 = new Uint32Array(64), P = new Uint8Array(64), N = a(() => {
        for (let L = 0, G = 0; L < 16; L++, G += 4)
          _2[L] = P[G] << 24 | P[G + 1] << 16 | P[G + 2] << 8 | P[G + 3];
        for (let L = 16; L < 64; L++) {
          let G = E(_2[L - 15], 7) ^ E(_2[L - 15], 18) ^ _2[L - 15] >>> 3, he = E(_2[L - 2], 17) ^ E(_2[L - 2], 19) ^ _2[L - 2] >>> 10;
          _2[L] = _2[L - 16] + G + _2[L - 7] + he | 0;
        }
        let A = e, g = t, D = n, H = i, Q = s, W = o, ce = u, ye = c;
        for (let L = 0; L < 64; L++) {
          let G = E(
            Q,
            6
          ) ^ E(Q, 11) ^ E(Q, 25), he = Q & W ^ ~Q & ce, me = ye + G + he + m[L] + _2[L] | 0, ve = E(A, 2) ^ E(A, 13) ^ E(A, 22), le = A & g ^ A & D ^ g & D, se = ve + le | 0;
          ye = ce, ce = W, W = Q, Q = H + me | 0, H = D, D = g, g = A, A = me + se | 0;
        }
        e = e + A | 0, t = t + g | 0, n = n + D | 0, i = i + H | 0, s = s + Q | 0, o = o + W | 0, u = u + ce | 0, c = c + ye | 0, l = 0;
      }, "process"), X = a((A) => {
        typeof A == "string" && (A = new TextEncoder().encode(A));
        for (let g = 0; g < A.length; g++)
          P[l++] = A[g], l === 64 && N();
        h += A.length;
      }, "add"), de = a(() => {
        if (P[l++] = 128, l == 64 && N(), l + 8 > 64) {
          for (; l < 64; )
            P[l++] = 0;
          N();
        }
        for (; l < 58; )
          P[l++] = 0;
        let A = h * 8;
        P[l++] = A / 1099511627776 & 255, P[l++] = A / 4294967296 & 255, P[l++] = A >>> 24, P[l++] = A >>> 16 & 255, P[l++] = A >>> 8 & 255, P[l++] = A & 255, N();
        let g = new Uint8Array(32);
        return g[0] = e >>> 24, g[1] = e >>> 16 & 255, g[2] = e >>> 8 & 255, g[3] = e & 255, g[4] = t >>> 24, g[5] = t >>> 16 & 255, g[6] = t >>> 8 & 255, g[7] = t & 255, g[8] = n >>> 24, g[9] = n >>> 16 & 255, g[10] = n >>> 8 & 255, g[11] = n & 255, g[12] = i >>> 24, g[13] = i >>> 16 & 255, g[14] = i >>> 8 & 255, g[15] = i & 255, g[16] = s >>> 24, g[17] = s >>> 16 & 255, g[18] = s >>> 8 & 255, g[19] = s & 255, g[20] = o >>> 24, g[21] = o >>> 16 & 255, g[22] = o >>> 8 & 255, g[23] = o & 255, g[24] = u >>> 24, g[25] = u >>> 16 & 255, g[26] = u >>> 8 & 255, g[27] = u & 255, g[28] = c >>> 24, g[29] = c >>> 16 & 255, g[30] = c >>> 8 & 255, g[31] = c & 255, g;
      }, "digest");
      return r === void 0 ? { add: X, digest: de } : (X(r), de());
    }
    var ii = K(
      () => {
        "use strict";
        p();
        a($e, "sha256");
      }
    );
    var k;
    var Ke;
    var si = K(() => {
      "use strict";
      p();
      k = class k2 {
        constructor() {
          T(
            this,
            "_dataLength",
            0
          );
          T(this, "_bufferLength", 0);
          T(this, "_state", new Int32Array(4));
          T(
            this,
            "_buffer",
            new ArrayBuffer(68)
          );
          T(this, "_buffer8");
          T(this, "_buffer32");
          this._buffer8 = new Uint8Array(
            this._buffer,
            0,
            68
          ), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
        }
        static hashByteArray(e, t = false) {
          return this.onePassHasher.start().appendByteArray(e).end(t);
        }
        static hashStr(e, t = false) {
          return this.onePassHasher.start().appendStr(e).end(t);
        }
        static hashAsciiStr(e, t = false) {
          return this.onePassHasher.start().appendAsciiStr(e).end(t);
        }
        static _hex(e) {
          let t = k2.hexChars, n = k2.hexOut, i, s, o, u;
          for (u = 0; u < 4; u += 1)
            for (s = u * 8, i = e[u], o = 0; o < 8; o += 2)
              n[s + 1 + o] = t.charAt(i & 15), i >>>= 4, n[s + 0 + o] = t.charAt(i & 15), i >>>= 4;
          return n.join("");
        }
        static _md5cycle(e, t) {
          let n = e[0], i = e[1], s = e[2], o = e[3];
          n += (i & s | ~i & o) + t[0] - 680876936 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[1] - 389564586 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[2] + 606105819 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[3] - 1044525330 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[4] - 176418897 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[5] + 1200080426 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[6] - 1473231341 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[7] - 45705983 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[8] + 1770035416 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[9] - 1958414417 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[10] - 42063 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[11] - 1990404162 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & s | ~i & o) + t[12] + 1804603682 | 0, n = (n << 7 | n >>> 25) + i | 0, o += (n & i | ~n & s) + t[13] - 40341101 | 0, o = (o << 12 | o >>> 20) + n | 0, s += (o & n | ~o & i) + t[14] - 1502002290 | 0, s = (s << 17 | s >>> 15) + o | 0, i += (s & o | ~s & n) + t[15] + 1236535329 | 0, i = (i << 22 | i >>> 10) + s | 0, n += (i & o | s & ~o) + t[1] - 165796510 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[6] - 1069501632 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[11] + 643717713 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[0] - 373897302 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[5] - 701558691 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[10] + 38016083 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[15] - 660478335 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[4] - 405537848 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[9] + 568446438 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[14] - 1019803690 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[3] - 187363961 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[8] + 1163531501 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i & o | s & ~o) + t[13] - 1444681467 | 0, n = (n << 5 | n >>> 27) + i | 0, o += (n & s | i & ~s) + t[2] - 51403784 | 0, o = (o << 9 | o >>> 23) + n | 0, s += (o & i | n & ~i) + t[7] + 1735328473 | 0, s = (s << 14 | s >>> 18) + o | 0, i += (s & n | o & ~n) + t[12] - 1926607734 | 0, i = (i << 20 | i >>> 12) + s | 0, n += (i ^ s ^ o) + t[5] - 378558 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[8] - 2022574463 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[11] + 1839030562 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[14] - 35309556 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[1] - 1530992060 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[4] + 1272893353 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[7] - 155497632 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[10] - 1094730640 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[13] + 681279174 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[0] - 358537222 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[3] - 722521979 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[6] + 76029189 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (i ^ s ^ o) + t[9] - 640364487 | 0, n = (n << 4 | n >>> 28) + i | 0, o += (n ^ i ^ s) + t[12] - 421815835 | 0, o = (o << 11 | o >>> 21) + n | 0, s += (o ^ n ^ i) + t[15] + 530742520 | 0, s = (s << 16 | s >>> 16) + o | 0, i += (s ^ o ^ n) + t[2] - 995338651 | 0, i = (i << 23 | i >>> 9) + s | 0, n += (s ^ (i | ~o)) + t[0] - 198630844 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[7] + 1126891415 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[14] - 1416354905 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[5] - 57434055 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[12] + 1700485571 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[3] - 1894986606 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[10] - 1051523 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[1] - 2054922799 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[8] + 1873313359 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[15] - 30611744 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[6] - 1560198380 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[13] + 1309151649 | 0, i = (i << 21 | i >>> 11) + s | 0, n += (s ^ (i | ~o)) + t[4] - 145523070 | 0, n = (n << 6 | n >>> 26) + i | 0, o += (i ^ (n | ~s)) + t[11] - 1120210379 | 0, o = (o << 10 | o >>> 22) + n | 0, s += (n ^ (o | ~i)) + t[2] + 718787259 | 0, s = (s << 15 | s >>> 17) + o | 0, i += (o ^ (s | ~n)) + t[9] - 343485551 | 0, i = (i << 21 | i >>> 11) + s | 0, e[0] = n + e[0] | 0, e[1] = i + e[1] | 0, e[2] = s + e[2] | 0, e[3] = o + e[3] | 0;
        }
        start() {
          return this._dataLength = 0, this._bufferLength = 0, this._state.set(k2.stateIdentity), this;
        }
        appendStr(e) {
          let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o;
          for (o = 0; o < e.length; o += 1) {
            if (s = e.charCodeAt(o), s < 128)
              t[i++] = s;
            else if (s < 2048)
              t[i++] = (s >>> 6) + 192, t[i++] = s & 63 | 128;
            else if (s < 55296 || s > 56319)
              t[i++] = (s >>> 12) + 224, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
            else {
              if (s = (s - 55296) * 1024 + (e.charCodeAt(++o) - 56320) + 65536, s > 1114111)
                throw new Error("Unicode standard supports code points up to U+10FFFF");
              t[i++] = (s >>> 18) + 240, t[i++] = s >>> 12 & 63 | 128, t[i++] = s >>> 6 & 63 | 128, t[i++] = s & 63 | 128;
            }
            i >= 64 && (this._dataLength += 64, k2._md5cycle(this._state, n), i -= 64, n[0] = n[16]);
          }
          return this._bufferLength = i, this;
        }
        appendAsciiStr(e) {
          let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
          for (; ; ) {
            for (s = Math.min(e.length - o, 64 - i); s--; )
              t[i++] = e.charCodeAt(o++);
            if (i < 64)
              break;
            this._dataLength += 64, k2._md5cycle(
              this._state,
              n
            ), i = 0;
          }
          return this._bufferLength = i, this;
        }
        appendByteArray(e) {
          let t = this._buffer8, n = this._buffer32, i = this._bufferLength, s, o = 0;
          for (; ; ) {
            for (s = Math.min(e.length - o, 64 - i); s--; )
              t[i++] = e[o++];
            if (i < 64)
              break;
            this._dataLength += 64, k2._md5cycle(
              this._state,
              n
            ), i = 0;
          }
          return this._bufferLength = i, this;
        }
        getState() {
          let e = this._state;
          return { buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)), buflen: this._bufferLength, length: this._dataLength, state: [e[0], e[1], e[2], e[3]] };
        }
        setState(e) {
          let t = e.buffer, n = e.state, i = this._state, s;
          for (this._dataLength = e.length, this._bufferLength = e.buflen, i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], s = 0; s < t.length; s += 1)
            this._buffer8[s] = t.charCodeAt(s);
        }
        end(e = false) {
          let t = this._bufferLength, n = this._buffer8, i = this._buffer32, s = (t >> 2) + 1;
          this._dataLength += t;
          let o = this._dataLength * 8;
          if (n[t] = 128, n[t + 1] = n[t + 2] = n[t + 3] = 0, i.set(k2.buffer32Identity.subarray(s), s), t > 55 && (k2._md5cycle(this._state, i), i.set(k2.buffer32Identity)), o <= 4294967295)
            i[14] = o;
          else {
            let u = o.toString(16).match(/(.*?)(.{0,8})$/);
            if (u === null)
              return;
            let c = parseInt(
              u[2],
              16
            ), h = parseInt(u[1], 16) || 0;
            i[14] = c, i[15] = h;
          }
          return k2._md5cycle(this._state, i), e ? this._state : k2._hex(this._state);
        }
      };
      a(k, "Md5"), T(k, "stateIdentity", new Int32Array(
        [1732584193, -271733879, -1732584194, 271733878]
      )), T(k, "buffer32Identity", new Int32Array(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      )), T(k, "hexChars", "0123456789abcdef"), T(k, "hexOut", []), T(k, "onePassHasher", new k());
      Ke = k;
    });
    var qt = {};
    ee(qt, { createHash: () => $o, createHmac: () => Ko, randomBytes: () => Go });
    function Go(r) {
      return w.getRandomValues(d.alloc(r));
    }
    function $o(r) {
      if (r === "sha256")
        return { update: function(e) {
          return { digest: function() {
            return d.from($e(e));
          } };
        } };
      if (r === "md5")
        return { update: function(e) {
          return { digest: function() {
            return typeof e == "string" ? Ke.hashStr(e) : Ke.hashByteArray(
              e
            );
          } };
        } };
      throw new Error(`Hash type '${r}' not supported`);
    }
    function Ko(r, e) {
      if (r !== "sha256")
        throw new Error(`Only sha256 is supported (requested: '${r}')`);
      return {
        update: function(t) {
          return { digest: function() {
            typeof e == "string" && (e = new TextEncoder().encode(e)), typeof t == "string" && (t = new TextEncoder().encode(t));
            let n = e.length;
            if (n > 64)
              e = $e(e);
            else if (n < 64) {
              let c = new Uint8Array(64);
              c.set(e), e = c;
            }
            let i = new Uint8Array(
              64
            ), s = new Uint8Array(64);
            for (let c = 0; c < 64; c++)
              i[c] = 54 ^ e[c], s[c] = 92 ^ e[c];
            let o = new Uint8Array(
              t.length + 64
            );
            o.set(i, 0), o.set(t, 64);
            let u = new Uint8Array(64 + 32);
            return u.set(s, 0), u.set($e(o), 64), d.from($e(u));
          } };
        }
      };
    }
    var Nt = K(() => {
      p();
      ii();
      si();
      a(Go, "randomBytes");
      a($o, "createHash");
      a(Ko, "createHmac");
    });
    var Wt = I((oi) => {
      "use strict";
      p();
      oi.parse = function(r, e) {
        return new Qt(r, e).parse();
      };
      var ct = class ct2 {
        constructor(e, t) {
          this.source = e, this.transform = t || Vo, this.position = 0, this.entries = [], this.recorded = [], this.dimension = 0;
        }
        isEof() {
          return this.position >= this.source.length;
        }
        nextCharacter() {
          var e = this.source[this.position++];
          return e === "\\" ? { value: this.source[this.position++], escaped: true } : { value: e, escaped: false };
        }
        record(e) {
          this.recorded.push(e);
        }
        newEntry(e) {
          var t;
          (this.recorded.length > 0 || e) && (t = this.recorded.join(""), t === "NULL" && !e && (t = null), t !== null && (t = this.transform(t)), this.entries.push(
            t
          ), this.recorded = []);
        }
        consumeDimensions() {
          if (this.source[0] === "[")
            for (; !this.isEof(); ) {
              var e = this.nextCharacter();
              if (e.value === "=")
                break;
            }
        }
        parse(e) {
          var t, n, i;
          for (this.consumeDimensions(); !this.isEof(); )
            if (t = this.nextCharacter(), t.value === "{" && !i)
              this.dimension++, this.dimension > 1 && (n = new ct2(this.source.substr(this.position - 1), this.transform), this.entries.push(
                n.parse(true)
              ), this.position += n.position - 2);
            else if (t.value === "}" && !i) {
              if (this.dimension--, !this.dimension && (this.newEntry(), e))
                return this.entries;
            } else
              t.value === '"' && !t.escaped ? (i && this.newEntry(true), i = !i) : t.value === "," && !i ? this.newEntry() : this.record(
                t.value
              );
          if (this.dimension !== 0)
            throw new Error("array dimension not balanced");
          return this.entries;
        }
      };
      a(ct, "ArrayParser");
      var Qt = ct;
      function Vo(r) {
        return r;
      }
      a(Vo, "identity");
    });
    var jt = I((mh, ai) => {
      p();
      var zo = Wt();
      ai.exports = { create: function(r, e) {
        return { parse: function() {
          return zo.parse(r, e);
        } };
      } };
    });
    var hi = I((wh, ci) => {
      "use strict";
      p();
      var Yo = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/, Zo = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/, Jo = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/, Xo = /^-?infinity$/;
      ci.exports = a(function(e) {
        if (Xo.test(e))
          return Number(e.replace("i", "I"));
        var t = Yo.exec(e);
        if (!t)
          return ea(e) || null;
        var n = !!t[8], i = parseInt(t[1], 10);
        n && (i = ui(i));
        var s = parseInt(
          t[2],
          10
        ) - 1, o = t[3], u = parseInt(t[4], 10), c = parseInt(t[5], 10), h = parseInt(t[6], 10), l = t[7];
        l = l ? 1e3 * parseFloat(l) : 0;
        var m, E = ta(e);
        return E != null ? (m = new Date(Date.UTC(
          i,
          s,
          o,
          u,
          c,
          h,
          l
        )), Ht(i) && m.setUTCFullYear(i), E !== 0 && m.setTime(m.getTime() - E)) : (m = new Date(
          i,
          s,
          o,
          u,
          c,
          h,
          l
        ), Ht(i) && m.setFullYear(i)), m;
      }, "parseDate");
      function ea(r) {
        var e = Zo.exec(r);
        if (e) {
          var t = parseInt(e[1], 10), n = !!e[4];
          n && (t = ui(t));
          var i = parseInt(
            e[2],
            10
          ) - 1, s = e[3], o = new Date(t, i, s);
          return Ht(t) && o.setFullYear(t), o;
        }
      }
      a(ea, "getDate");
      function ta(r) {
        if (r.endsWith("+00"))
          return 0;
        var e = Jo.exec(r.split(" ")[1]);
        if (e) {
          var t = e[1];
          if (t === "Z")
            return 0;
          var n = t === "-" ? -1 : 1, i = parseInt(e[2], 10) * 3600 + parseInt(
            e[3] || 0,
            10
          ) * 60 + parseInt(e[4] || 0, 10);
          return i * n * 1e3;
        }
      }
      a(ta, "timeZoneOffset");
      function ui(r) {
        return -(r - 1);
      }
      a(ui, "bcYearToNegativeYear");
      function Ht(r) {
        return r >= 0 && r < 100;
      }
      a(
        Ht,
        "is0To99"
      );
    });
    var fi = I((xh, li) => {
      p();
      li.exports = na;
      var ra = Object.prototype.hasOwnProperty;
      function na(r) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var n in t)
            ra.call(
              t,
              n
            ) && (r[n] = t[n]);
        }
        return r;
      }
      a(na, "extend");
    });
    var yi = I((_h, di) => {
      "use strict";
      p();
      var ia = fi();
      di.exports = Fe;
      function Fe(r) {
        if (!(this instanceof Fe))
          return new Fe(r);
        ia(this, ma(r));
      }
      a(Fe, "PostgresInterval");
      var sa = ["seconds", "minutes", "hours", "days", "months", "years"];
      Fe.prototype.toPostgres = function() {
        var r = sa.filter(this.hasOwnProperty, this);
        return this.milliseconds && r.indexOf("seconds") < 0 && r.push("seconds"), r.length === 0 ? "0" : r.map(function(e) {
          var t = this[e] || 0;
          return e === "seconds" && this.milliseconds && (t = (t + this.milliseconds / 1e3).toFixed(6).replace(
            /\.?0+$/,
            ""
          )), t + " " + e;
        }, this).join(" ");
      };
      var oa = { years: "Y", months: "M", days: "D", hours: "H", minutes: "M", seconds: "S" }, aa = ["years", "months", "days"], ua = ["hours", "minutes", "seconds"];
      Fe.prototype.toISOString = Fe.prototype.toISO = function() {
        var r = aa.map(t, this).join(""), e = ua.map(t, this).join("");
        return "P" + r + "T" + e;
        function t(n) {
          var i = this[n] || 0;
          return n === "seconds" && this.milliseconds && (i = (i + this.milliseconds / 1e3).toFixed(6).replace(
            /0+$/,
            ""
          )), i + oa[n];
        }
      };
      var Gt = "([+-]?\\d+)", ca = Gt + "\\s+years?", ha = Gt + "\\s+mons?", la = Gt + "\\s+days?", fa = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?", pa = new RegExp([
        ca,
        ha,
        la,
        fa
      ].map(function(r) {
        return "(" + r + ")?";
      }).join("\\s*")), pi = {
        years: 2,
        months: 4,
        days: 6,
        hours: 9,
        minutes: 10,
        seconds: 11,
        milliseconds: 12
      }, da = ["hours", "minutes", "seconds", "milliseconds"];
      function ya(r) {
        var e = r + "000000".slice(r.length);
        return parseInt(
          e,
          10
        ) / 1e3;
      }
      a(ya, "parseMilliseconds");
      function ma(r) {
        if (!r)
          return {};
        var e = pa.exec(
          r
        ), t = e[8] === "-";
        return Object.keys(pi).reduce(function(n, i) {
          var s = pi[i], o = e[s];
          return !o || (o = i === "milliseconds" ? ya(o) : parseInt(o, 10), !o) || (t && ~da.indexOf(i) && (o *= -1), n[i] = o), n;
        }, {});
      }
      a(ma, "parse");
    });
    var gi = I((Ih, mi) => {
      "use strict";
      p();
      mi.exports = a(function(e) {
        if (/^\\x/.test(e))
          return new d(
            e.substr(2),
            "hex"
          );
        for (var t = "", n = 0; n < e.length; )
          if (e[n] !== "\\")
            t += e[n], ++n;
          else if (/[0-7]{3}/.test(e.substr(n + 1, 3)))
            t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8)), n += 4;
          else {
            for (var i = 1; n + i < e.length && e[n + i] === "\\"; )
              i++;
            for (var s = 0; s < Math.floor(i / 2); ++s)
              t += "\\";
            n += Math.floor(i / 2) * 2;
          }
        return new d(t, "binary");
      }, "parseBytea");
    });
    var _i = I((Bh, vi) => {
      p();
      var Ve = Wt(), ze = jt(), ht = hi(), bi = yi(), Si = gi();
      function lt(r) {
        return a(function(t) {
          return t === null ? t : r(t);
        }, "nullAllowed");
      }
      a(lt, "allowNull");
      function xi(r) {
        return r === null ? r : r === "TRUE" || r === "t" || r === "true" || r === "y" || r === "yes" || r === "on" || r === "1";
      }
      a(xi, "parseBool");
      function ga(r) {
        return r ? Ve.parse(r, xi) : null;
      }
      a(ga, "parseBoolArray");
      function wa(r) {
        return parseInt(r, 10);
      }
      a(wa, "parseBaseTenInt");
      function $t(r) {
        return r ? Ve.parse(r, lt(wa)) : null;
      }
      a($t, "parseIntegerArray");
      function ba(r) {
        return r ? Ve.parse(r, lt(function(e) {
          return Ei(e).trim();
        })) : null;
      }
      a(ba, "parseBigIntegerArray");
      var Sa = a(function(r) {
        if (!r)
          return null;
        var e = ze.create(r, function(t) {
          return t !== null && (t = Yt(t)), t;
        });
        return e.parse();
      }, "parsePointArray"), Kt = a(function(r) {
        if (!r)
          return null;
        var e = ze.create(r, function(t) {
          return t !== null && (t = parseFloat(t)), t;
        });
        return e.parse();
      }, "parseFloatArray"), re = a(function(r) {
        if (!r)
          return null;
        var e = ze.create(r);
        return e.parse();
      }, "parseStringArray"), Vt = a(function(r) {
        if (!r)
          return null;
        var e = ze.create(r, function(t) {
          return t !== null && (t = ht(t)), t;
        });
        return e.parse();
      }, "parseDateArray"), xa = a(function(r) {
        if (!r)
          return null;
        var e = ze.create(r, function(t) {
          return t !== null && (t = bi(t)), t;
        });
        return e.parse();
      }, "parseIntervalArray"), Ea = a(function(r) {
        return r ? Ve.parse(r, lt(Si)) : null;
      }, "parseByteAArray"), zt = a(function(r) {
        return parseInt(
          r,
          10
        );
      }, "parseInteger"), Ei = a(function(r) {
        var e = String(r);
        return /^\d+$/.test(e) ? e : r;
      }, "parseBigInteger"), wi = a(
        function(r) {
          return r ? Ve.parse(r, lt(JSON.parse)) : null;
        },
        "parseJsonArray"
      ), Yt = a(function(r) {
        return r[0] !== "(" ? null : (r = r.substring(1, r.length - 1).split(","), { x: parseFloat(r[0]), y: parseFloat(r[1]) });
      }, "parsePoint"), va = a(function(r) {
        if (r[0] !== "<" && r[1] !== "(")
          return null;
        for (var e = "(", t = "", n = false, i = 2; i < r.length - 1; i++) {
          if (n || (e += r[i]), r[i] === ")") {
            n = true;
            continue;
          } else if (!n)
            continue;
          r[i] !== "," && (t += r[i]);
        }
        var s = Yt(e);
        return s.radius = parseFloat(t), s;
      }, "parseCircle"), _a = a(function(r) {
        r(
          20,
          Ei
        ), r(21, zt), r(23, zt), r(26, zt), r(700, parseFloat), r(701, parseFloat), r(16, xi), r(
          1082,
          ht
        ), r(1114, ht), r(1184, ht), r(600, Yt), r(651, re), r(718, va), r(1e3, ga), r(1001, Ea), r(
          1005,
          $t
        ), r(1007, $t), r(1028, $t), r(1016, ba), r(1017, Sa), r(1021, Kt), r(1022, Kt), r(1231, Kt), r(1014, re), r(1015, re), r(1008, re), r(1009, re), r(1040, re), r(1041, re), r(1115, Vt), r(
          1182,
          Vt
        ), r(1185, Vt), r(1186, bi), r(1187, xa), r(17, Si), r(114, JSON.parse.bind(JSON)), r(
          3802,
          JSON.parse.bind(JSON)
        ), r(199, wi), r(3807, wi), r(3907, re), r(2951, re), r(791, re), r(
          1183,
          re
        ), r(1270, re);
      }, "init");
      vi.exports = { init: _a };
    });
    var Ci = I((Fh, Ai) => {
      "use strict";
      p();
      var Y = 1e6;
      function Aa(r) {
        var e = r.readInt32BE(
          0
        ), t = r.readUInt32BE(4), n = "";
        e < 0 && (e = ~e + (t === 0), t = ~t + 1 >>> 0, n = "-");
        var i = "", s, o, u, c, h, l;
        {
          if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0)
            return n + u + i;
          for (c = "", h = 6 - u.length, l = 0; l < h; l++)
            c += "0";
          i = c + u + i;
        }
        {
          if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0)
            return n + u + i;
          for (c = "", h = 6 - u.length, l = 0; l < h; l++)
            c += "0";
          i = c + u + i;
        }
        {
          if (s = e % Y, e = e / Y >>> 0, o = 4294967296 * s + t, t = o / Y >>> 0, u = "" + (o - Y * t), t === 0 && e === 0)
            return n + u + i;
          for (c = "", h = 6 - u.length, l = 0; l < h; l++)
            c += "0";
          i = c + u + i;
        }
        return s = e % Y, o = 4294967296 * s + t, u = "" + o % Y, n + u + i;
      }
      a(Aa, "readInt8");
      Ai.exports = Aa;
    });
    var Li = I((Oh, Bi) => {
      p();
      var Ca = Ci(), R = a(function(r, e, t, n, i) {
        t = t || 0, n = n || false, i = i || function(_2, P, N) {
          return _2 * Math.pow(2, N) + P;
        };
        var s = t >> 3, o = a(function(_2) {
          return n ? ~_2 & 255 : _2;
        }, "inv"), u = 255, c = 8 - t % 8;
        e < c && (u = 255 << 8 - e & 255, c = e), t && (u = u >> t % 8);
        var h = 0;
        t % 8 + e >= 8 && (h = i(0, o(r[s]) & u, c));
        for (var l = e + t >> 3, m = s + 1; m < l; m++)
          h = i(h, o(r[m]), 8);
        var E = (e + t) % 8;
        return E > 0 && (h = i(h, o(r[l]) >> 8 - E, E)), h;
      }, "parseBits"), Pi = a(function(r, e, t) {
        var n = Math.pow(2, t - 1) - 1, i = R(r, 1), s = R(r, t, 1);
        if (s === 0)
          return 0;
        var o = 1, u = a(function(h, l, m) {
          h === 0 && (h = 1);
          for (var E = 1; E <= m; E++)
            o /= 2, (l & 1 << m - E) > 0 && (h += o);
          return h;
        }, "parsePrecisionBits"), c = R(r, e, t + 1, false, u);
        return s == Math.pow(2, t + 1) - 1 ? c === 0 ? i === 0 ? 1 / 0 : -1 / 0 : NaN : (i === 0 ? 1 : -1) * Math.pow(2, s - n) * c;
      }, "parseFloatFromBits"), Ia = a(function(r) {
        return R(r, 1) == 1 ? -1 * (R(r, 15, 1, true) + 1) : R(r, 15, 1);
      }, "parseInt16"), Ii = a(function(r) {
        return R(r, 1) == 1 ? -1 * (R(
          r,
          31,
          1,
          true
        ) + 1) : R(r, 31, 1);
      }, "parseInt32"), Ta = a(function(r) {
        return Pi(r, 23, 8);
      }, "parseFloat32"), Pa = a(function(r) {
        return Pi(r, 52, 11);
      }, "parseFloat64"), Ba = a(function(r) {
        var e = R(r, 16, 32);
        if (e == 49152)
          return NaN;
        for (var t = Math.pow(1e4, R(r, 16, 16)), n = 0, i = [], s = R(r, 16), o = 0; o < s; o++)
          n += R(r, 16, 64 + 16 * o) * t, t /= 1e4;
        var u = Math.pow(10, R(r, 16, 48));
        return (e === 0 ? 1 : -1) * Math.round(n * u) / u;
      }, "parseNumeric"), Ti = a(function(r, e) {
        var t = R(
          e,
          1
        ), n = R(e, 63, 1), i = new Date((t === 0 ? 1 : -1) * n / 1e3 + 9466848e5);
        return r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4), i.usec = n % 1e3, i.getMicroSeconds = function() {
          return this.usec;
        }, i.setMicroSeconds = function(s) {
          this.usec = s;
        }, i.getUTCMicroSeconds = function() {
          return this.usec;
        }, i;
      }, "parseDate"), Ye = a(function(r) {
        for (var e = R(r, 32), t = R(r, 32, 32), n = R(r, 32, 64), i = 96, s = [], o = 0; o < e; o++)
          s[o] = R(r, 32, i), i += 32, i += 32;
        var u = a(function(h) {
          var l = R(r, 32, i);
          if (i += 32, l == 4294967295)
            return null;
          var m;
          if (h == 23 || h == 20)
            return m = R(r, l * 8, i), i += l * 8, m;
          if (h == 25)
            return m = r.toString(this.encoding, i >> 3, (i += l << 3) >> 3), m;
          console.log("ERROR: ElementType not implemented: " + h);
        }, "parseElement"), c = a(function(h, l) {
          var m = [], E;
          if (h.length > 1) {
            var _2 = h.shift();
            for (E = 0; E < _2; E++)
              m[E] = c(h, l);
            h.unshift(
              _2
            );
          } else
            for (E = 0; E < h[0]; E++)
              m[E] = u(l);
          return m;
        }, "parse");
        return c(s, n);
      }, "parseArray"), La = a(function(r) {
        return r.toString("utf8");
      }, "parseText"), Ra = a(function(r) {
        return r === null ? null : R(r, 8) > 0;
      }, "parseBool"), Fa = a(function(r) {
        r(20, Ca), r(21, Ia), r(23, Ii), r(
          26,
          Ii
        ), r(1700, Ba), r(700, Ta), r(701, Pa), r(16, Ra), r(1114, Ti.bind(null, false)), r(1184, Ti.bind(
          null,
          true
        )), r(1e3, Ye), r(1007, Ye), r(1016, Ye), r(1008, Ye), r(1009, Ye), r(25, La);
      }, "init");
      Bi.exports = { init: Fa };
    });
    var Fi = I((qh, Ri) => {
      p();
      Ri.exports = {
        BOOL: 16,
        BYTEA: 17,
        CHAR: 18,
        INT8: 20,
        INT2: 21,
        INT4: 23,
        REGPROC: 24,
        TEXT: 25,
        OID: 26,
        TID: 27,
        XID: 28,
        CID: 29,
        JSON: 114,
        XML: 142,
        PG_NODE_TREE: 194,
        SMGR: 210,
        PATH: 602,
        POLYGON: 604,
        CIDR: 650,
        FLOAT4: 700,
        FLOAT8: 701,
        ABSTIME: 702,
        RELTIME: 703,
        TINTERVAL: 704,
        CIRCLE: 718,
        MACADDR8: 774,
        MONEY: 790,
        MACADDR: 829,
        INET: 869,
        ACLITEM: 1033,
        BPCHAR: 1042,
        VARCHAR: 1043,
        DATE: 1082,
        TIME: 1083,
        TIMESTAMP: 1114,
        TIMESTAMPTZ: 1184,
        INTERVAL: 1186,
        TIMETZ: 1266,
        BIT: 1560,
        VARBIT: 1562,
        NUMERIC: 1700,
        REFCURSOR: 1790,
        REGPROCEDURE: 2202,
        REGOPER: 2203,
        REGOPERATOR: 2204,
        REGCLASS: 2205,
        REGTYPE: 2206,
        UUID: 2950,
        TXID_SNAPSHOT: 2970,
        PG_LSN: 3220,
        PG_NDISTINCT: 3361,
        PG_DEPENDENCIES: 3402,
        TSVECTOR: 3614,
        TSQUERY: 3615,
        GTSVECTOR: 3642,
        REGCONFIG: 3734,
        REGDICTIONARY: 3769,
        JSONB: 3802,
        REGNAMESPACE: 4089,
        REGROLE: 4096
      };
    });
    var Xe = I((Je) => {
      p();
      var Ma = _i(), Da = Li(), Oa = jt(), ka = Fi();
      Je.getTypeParser = Ua;
      Je.setTypeParser = qa;
      Je.arrayParser = Oa;
      Je.builtins = ka;
      var Ze = { text: {}, binary: {} };
      function Mi(r) {
        return String(
          r
        );
      }
      a(Mi, "noParse");
      function Ua(r, e) {
        return e = e || "text", Ze[e] && Ze[e][r] || Mi;
      }
      a(
        Ua,
        "getTypeParser"
      );
      function qa(r, e, t) {
        typeof e == "function" && (t = e, e = "text"), Ze[e][r] = t;
      }
      a(qa, "setTypeParser");
      Ma.init(function(r, e) {
        Ze.text[r] = e;
      });
      Da.init(function(r, e) {
        Ze.binary[r] = e;
      });
    });
    var et = I((Hh, Zt) => {
      "use strict";
      p();
      Zt.exports = {
        host: "localhost",
        user: y.platform === "win32" ? y.env.USERNAME : y.env.USER,
        database: void 0,
        password: null,
        connectionString: void 0,
        port: 5432,
        rows: 0,
        binary: false,
        max: 10,
        idleTimeoutMillis: 3e4,
        client_encoding: "",
        ssl: false,
        application_name: void 0,
        fallback_application_name: void 0,
        options: void 0,
        parseInputDatesAsUTC: false,
        statement_timeout: false,
        lock_timeout: false,
        idle_in_transaction_session_timeout: false,
        query_timeout: false,
        connect_timeout: 0,
        keepalives: 1,
        keepalives_idle: 0
      };
      var Me = Xe(), Na = Me.getTypeParser(
        20,
        "text"
      ), Qa = Me.getTypeParser(1016, "text");
      Zt.exports.__defineSetter__("parseInt8", function(r) {
        Me.setTypeParser(20, "text", r ? Me.getTypeParser(23, "text") : Na), Me.setTypeParser(1016, "text", r ? Me.getTypeParser(1007, "text") : Qa);
      });
    });
    var tt = I(($h, Oi) => {
      "use strict";
      p();
      var Wa = (Nt(), O(qt)), ja = et();
      function Ha(r) {
        var e = r.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        return '"' + e + '"';
      }
      a(Ha, "escapeElement");
      function Di(r) {
        for (var e = "{", t = 0; t < r.length; t++)
          t > 0 && (e = e + ","), r[t] === null || typeof r[t] > "u" ? e = e + "NULL" : Array.isArray(r[t]) ? e = e + Di(r[t]) : r[t] instanceof d ? e += "\\\\x" + r[t].toString("hex") : e += Ha(ft(r[t]));
        return e = e + "}", e;
      }
      a(Di, "arrayString");
      var ft = a(function(r, e) {
        if (r == null)
          return null;
        if (r instanceof d)
          return r;
        if (ArrayBuffer.isView(r)) {
          var t = d.from(r.buffer, r.byteOffset, r.byteLength);
          return t.length === r.byteLength ? t : t.slice(
            r.byteOffset,
            r.byteOffset + r.byteLength
          );
        }
        return r instanceof Date ? ja.parseInputDatesAsUTC ? Ka(r) : $a(r) : Array.isArray(r) ? Di(r) : typeof r == "object" ? Ga(r, e) : r.toString();
      }, "prepareValue");
      function Ga(r, e) {
        if (r && typeof r.toPostgres == "function") {
          if (e = e || [], e.indexOf(r) !== -1)
            throw new Error('circular reference detected while preparing "' + r + '" for query');
          return e.push(r), ft(r.toPostgres(ft), e);
        }
        return JSON.stringify(r);
      }
      a(Ga, "prepareObject");
      function j(r, e) {
        for (r = "" + r; r.length < e; )
          r = "0" + r;
        return r;
      }
      a(
        j,
        "pad"
      );
      function $a(r) {
        var e = -r.getTimezoneOffset(), t = r.getFullYear(), n = t < 1;
        n && (t = Math.abs(t) + 1);
        var i = j(t, 4) + "-" + j(r.getMonth() + 1, 2) + "-" + j(r.getDate(), 2) + "T" + j(r.getHours(), 2) + ":" + j(r.getMinutes(), 2) + ":" + j(r.getSeconds(), 2) + "." + j(
          r.getMilliseconds(),
          3
        );
        return e < 0 ? (i += "-", e *= -1) : i += "+", i += j(Math.floor(e / 60), 2) + ":" + j(e % 60, 2), n && (i += " BC"), i;
      }
      a($a, "dateToString");
      function Ka(r) {
        var e = r.getUTCFullYear(), t = e < 1;
        t && (e = Math.abs(e) + 1);
        var n = j(e, 4) + "-" + j(r.getUTCMonth() + 1, 2) + "-" + j(r.getUTCDate(), 2) + "T" + j(r.getUTCHours(), 2) + ":" + j(r.getUTCMinutes(), 2) + ":" + j(r.getUTCSeconds(), 2) + "." + j(r.getUTCMilliseconds(), 3);
        return n += "+00:00", t && (n += " BC"), n;
      }
      a(Ka, "dateToStringUTC");
      function Va(r, e, t) {
        return r = typeof r == "string" ? { text: r } : r, e && (typeof e == "function" ? r.callback = e : r.values = e), t && (r.callback = t), r;
      }
      a(Va, "normalizeQueryConfig");
      var Jt = a(function(r) {
        return Wa.createHash("md5").update(r, "utf-8").digest("hex");
      }, "md5"), za = a(function(r, e, t) {
        var n = Jt(e + r), i = Jt(d.concat([d.from(n), t]));
        return "md5" + i;
      }, "postgresMd5PasswordHash");
      Oi.exports = { prepareValue: a(function(e) {
        return ft(
          e
        );
      }, "prepareValueWrapper"), normalizeQueryConfig: Va, postgresMd5PasswordHash: za, md5: Jt };
    });
    var Qi = I((zh, Ni) => {
      "use strict";
      p();
      var Xt = (Nt(), O(qt));
      function Ya(r) {
        if (r.indexOf(
          "SCRAM-SHA-256"
        ) === -1)
          throw new Error("SASL: Only mechanism SCRAM-SHA-256 is currently supported");
        let e = Xt.randomBytes(18).toString("base64");
        return { mechanism: "SCRAM-SHA-256", clientNonce: e, response: "n,,n=*,r=" + e, message: "SASLInitialResponse" };
      }
      a(Ya, "startSession");
      function Za(r, e, t) {
        if (r.message !== "SASLInitialResponse")
          throw new Error(
            "SASL: Last message was not SASLInitialResponse"
          );
        if (typeof e != "string")
          throw new Error(
            "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
          );
        if (typeof t != "string")
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
        let n = eu(t);
        if (n.nonce.startsWith(r.clientNonce)) {
          if (n.nonce.length === r.clientNonce.length)
            throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
        var i = d.from(n.salt, "base64"), s = nu(
          e,
          i,
          n.iteration
        ), o = De(s, "Client Key"), u = ru(o), c = "n=*,r=" + r.clientNonce, h = "r=" + n.nonce + ",s=" + n.salt + ",i=" + n.iteration, l = "c=biws,r=" + n.nonce, m = c + "," + h + "," + l, E = De(u, m), _2 = qi(
          o,
          E
        ), P = _2.toString("base64"), N = De(s, "Server Key"), X = De(N, m);
        r.message = "SASLResponse", r.serverSignature = X.toString("base64"), r.response = l + ",p=" + P;
      }
      a(Za, "continueSession");
      function Ja(r, e) {
        if (r.message !== "SASLResponse")
          throw new Error("SASL: Last message was not SASLResponse");
        if (typeof e != "string")
          throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
        let { serverSignature: t } = tu(
          e
        );
        if (t !== r.serverSignature)
          throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
      a(Ja, "finalizeSession");
      function Xa(r) {
        if (typeof r != "string")
          throw new TypeError("SASL: text must be a string");
        return r.split("").map(
          (e, t) => r.charCodeAt(t)
        ).every((e) => e >= 33 && e <= 43 || e >= 45 && e <= 126);
      }
      a(Xa, "isPrintableChars");
      function ki(r) {
        return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(r);
      }
      a(ki, "isBase64");
      function Ui(r) {
        if (typeof r != "string")
          throw new TypeError(
            "SASL: attribute pairs text must be a string"
          );
        return new Map(r.split(",").map((e) => {
          if (!/^.=/.test(e))
            throw new Error("SASL: Invalid attribute pair entry");
          let t = e[0], n = e.substring(2);
          return [t, n];
        }));
      }
      a(Ui, "parseAttributePairs");
      function eu(r) {
        let e = Ui(
          r
        ), t = e.get("r");
        if (t) {
          if (!Xa(t))
            throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
        let n = e.get("s");
        if (n) {
          if (!ki(n))
            throw new Error(
              "SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64"
            );
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
        let i = e.get("i");
        if (i) {
          if (!/^[1-9][0-9]*$/.test(i))
            throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
        } else
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
        let s = parseInt(i, 10);
        return { nonce: t, salt: n, iteration: s };
      }
      a(eu, "parseServerFirstMessage");
      function tu(r) {
        let t = Ui(r).get("v");
        if (t) {
          if (!ki(t))
            throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
        } else
          throw new Error(
            "SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing"
          );
        return { serverSignature: t };
      }
      a(tu, "parseServerFinalMessage");
      function qi(r, e) {
        if (!d.isBuffer(r))
          throw new TypeError(
            "first argument must be a Buffer"
          );
        if (!d.isBuffer(e))
          throw new TypeError("second argument must be a Buffer");
        if (r.length !== e.length)
          throw new Error("Buffer lengths must match");
        if (r.length === 0)
          throw new Error("Buffers cannot be empty");
        return d.from(r.map((t, n) => r[n] ^ e[n]));
      }
      a(qi, "xorBuffers");
      function ru(r) {
        return Xt.createHash(
          "sha256"
        ).update(r).digest();
      }
      a(ru, "sha256");
      function De(r, e) {
        return Xt.createHmac(
          "sha256",
          r
        ).update(e).digest();
      }
      a(De, "hmacSha256");
      function nu(r, e, t) {
        for (var n = De(
          r,
          d.concat([e, d.from([0, 0, 0, 1])])
        ), i = n, s = 0; s < t - 1; s++)
          n = De(r, n), i = qi(i, n);
        return i;
      }
      a(nu, "Hi");
      Ni.exports = { startSession: Ya, continueSession: Za, finalizeSession: Ja };
    });
    var er = {};
    ee(er, { join: () => iu });
    function iu(...r) {
      return r.join("/");
    }
    var tr = K(() => {
      p();
      a(iu, "join");
    });
    var rr = {};
    ee(rr, { stat: () => su });
    function su(r, e) {
      e(new Error("No filesystem"));
    }
    var nr = K(
      () => {
        p();
        a(su, "stat");
      }
    );
    var ir = {};
    ee(ir, { default: () => ou });
    var ou;
    var sr = K(() => {
      p();
      ou = {};
    });
    var Wi = {};
    ee(Wi, { StringDecoder: () => or });
    var ar;
    var or;
    var ji = K(() => {
      p();
      ar = class ar {
        constructor(e) {
          T(this, "td");
          this.td = new TextDecoder(e);
        }
        write(e) {
          return this.td.decode(e, { stream: true });
        }
        end(e) {
          return this.td.decode(e);
        }
      };
      a(ar, "StringDecoder");
      or = ar;
    });
    var Ki = I((sl, $i) => {
      "use strict";
      p();
      var { Transform: au } = (sr(), O(ir)), { StringDecoder: uu } = (ji(), O(Wi)), be = Symbol("last"), pt = Symbol("decoder");
      function cu(r, e, t) {
        let n;
        if (this.overflow) {
          if (n = this[pt].write(r).split(this.matcher), n.length === 1)
            return t();
          n.shift(), this.overflow = false;
        } else
          this[be] += this[pt].write(r), n = this[be].split(this.matcher);
        this[be] = n.pop();
        for (let i = 0; i < n.length; i++)
          try {
            Gi(this, this.mapper(n[i]));
          } catch (s) {
            return t(
              s
            );
          }
        if (this.overflow = this[be].length > this.maxLength, this.overflow && !this.skipOverflow) {
          t(new Error("maximum buffer reached"));
          return;
        }
        t();
      }
      a(cu, "transform");
      function hu(r) {
        if (this[be] += this[pt].end(), this[be])
          try {
            Gi(this, this.mapper(this[be]));
          } catch (e) {
            return r(e);
          }
        r();
      }
      a(hu, "flush");
      function Gi(r, e) {
        e !== void 0 && r.push(e);
      }
      a(Gi, "push");
      function Hi(r) {
        return r;
      }
      a(Hi, "noop");
      function lu(r, e, t) {
        switch (r = r || /\r?\n/, e = e || Hi, t = t || {}, arguments.length) {
          case 1:
            typeof r == "function" ? (e = r, r = /\r?\n/) : typeof r == "object" && !(r instanceof RegExp) && !r[Symbol.split] && (t = r, r = /\r?\n/);
            break;
          case 2:
            typeof r == "function" ? (t = e, e = r, r = /\r?\n/) : typeof e == "object" && (t = e, e = Hi);
        }
        t = Object.assign({}, t), t.autoDestroy = true, t.transform = cu, t.flush = hu, t.readableObjectMode = true;
        let n = new au(t);
        return n[be] = "", n[pt] = new uu("utf8"), n.matcher = r, n.mapper = e, n.maxLength = t.maxLength, n.skipOverflow = t.skipOverflow || false, n.overflow = false, n._destroy = function(i, s) {
          this._writableState.errorEmitted = false, s(i);
        }, n;
      }
      a(lu, "split");
      $i.exports = lu;
    });
    var Yi = I((ul, pe) => {
      "use strict";
      p();
      var Vi = (tr(), O(er)), fu = (sr(), O(ir)).Stream, pu = Ki(), zi = (Ge(), O(He)), du = 5432, dt = y.platform === "win32", rt = y.stderr, yu = 56, mu = 7, gu = 61440, wu = 32768;
      function bu(r) {
        return (r & gu) == wu;
      }
      a(bu, "isRegFile");
      var Oe = [
        "host",
        "port",
        "database",
        "user",
        "password"
      ], ur = Oe.length, Su = Oe[ur - 1];
      function cr() {
        var r = rt instanceof fu && rt.writable === true;
        if (r) {
          var e = Array.prototype.slice.call(arguments).concat(`
`);
          rt.write(zi.format.apply(zi, e));
        }
      }
      a(cr, "warn");
      Object.defineProperty(
        pe.exports,
        "isWin",
        { get: function() {
          return dt;
        }, set: function(r) {
          dt = r;
        } }
      );
      pe.exports.warnTo = function(r) {
        var e = rt;
        return rt = r, e;
      };
      pe.exports.getFileName = function(r) {
        var e = r || y.env, t = e.PGPASSFILE || (dt ? Vi.join(e.APPDATA || "./", "postgresql", "pgpass.conf") : Vi.join(e.HOME || "./", ".pgpass"));
        return t;
      };
      pe.exports.usePgPass = function(r, e) {
        return Object.prototype.hasOwnProperty.call(y.env, "PGPASSWORD") ? false : dt ? true : (e = e || "<unkn>", bu(r.mode) ? r.mode & (yu | mu) ? (cr('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', e), false) : true : (cr(
          'WARNING: password file "%s" is not a plain file',
          e
        ), false));
      };
      var xu = pe.exports.match = function(r, e) {
        return Oe.slice(0, -1).reduce(
          function(t, n, i) {
            return i == 1 && Number(r[n] || du) === Number(e[n]) ? t && true : t && (e[n] === "*" || e[n] === r[n]);
          },
          true
        );
      };
      pe.exports.getPassword = function(r, e, t) {
        var n, i = e.pipe(pu());
        function s(c) {
          var h = Eu(
            c
          );
          h && vu(h) && xu(r, h) && (n = h[Su], i.end());
        }
        a(s, "onLine");
        var o = a(function() {
          e.destroy(), t(n);
        }, "onEnd"), u = a(function(c) {
          e.destroy(), cr("WARNING: error on reading file: %s", c), t(void 0);
        }, "onErr");
        e.on("error", u), i.on("data", s).on("end", o).on(
          "error",
          u
        );
      };
      var Eu = pe.exports.parseLine = function(r) {
        if (r.length < 11 || r.match(/^\s+#/))
          return null;
        for (var e = "", t = "", n = 0, i = 0, s = 0, o = {}, u = false, c = a(function(l, m, E) {
          var _2 = r.substring(
            m,
            E
          );
          Object.hasOwnProperty.call(y.env, "PGPASS_NO_DEESCAPE") || (_2 = _2.replace(
            /\\([:\\])/g,
            "$1"
          )), o[Oe[l]] = _2;
        }, "addToObj"), h = 0; h < r.length - 1; h += 1) {
          if (e = r.charAt(h + 1), t = r.charAt(
            h
          ), u = n == ur - 1, u) {
            c(n, i);
            break;
          }
          h >= 0 && e == ":" && t !== "\\" && (c(n, i, h + 1), i = h + 2, n += 1);
        }
        return o = Object.keys(o).length === ur ? o : null, o;
      }, vu = pe.exports.isValidEntry = function(r) {
        for (var e = {
          0: function(o) {
            return o.length > 0;
          },
          1: function(o) {
            return o === "*" ? true : (o = Number(o), isFinite(
              o
            ) && o > 0 && o < 9007199254740992 && Math.floor(o) === o);
          },
          2: function(o) {
            return o.length > 0;
          },
          3: function(o) {
            return o.length > 0;
          },
          4: function(o) {
            return o.length > 0;
          }
        }, t = 0; t < Oe.length; t += 1) {
          var n = e[t], i = r[Oe[t]] || "", s = n(i);
          if (!s)
            return false;
        }
        return true;
      };
    });
    var Ji = I((fl, hr) => {
      "use strict";
      p();
      var ll = (tr(), O(er)), Zi = (nr(), O(rr)), yt = Yi();
      hr.exports = function(r, e) {
        var t = yt.getFileName();
        Zi.stat(t, function(n, i) {
          if (n || !yt.usePgPass(i, t))
            return e(void 0);
          var s = Zi.createReadStream(t);
          yt.getPassword(
            r,
            s,
            e
          );
        });
      };
      hr.exports.warnTo = yt.warnTo;
    });
    var lr = I((dl, Xi) => {
      "use strict";
      p();
      var _u = Xe();
      function mt(r) {
        this._types = r || _u, this.text = {}, this.binary = {};
      }
      a(mt, "TypeOverrides");
      mt.prototype.getOverrides = function(r) {
        switch (r) {
          case "text":
            return this.text;
          case "binary":
            return this.binary;
          default:
            return {};
        }
      };
      mt.prototype.setTypeParser = function(r, e, t) {
        typeof e == "function" && (t = e, e = "text"), this.getOverrides(e)[r] = t;
      };
      mt.prototype.getTypeParser = function(r, e) {
        return e = e || "text", this.getOverrides(e)[r] || this._types.getTypeParser(r, e);
      };
      Xi.exports = mt;
    });
    var es = {};
    ee(es, { default: () => Au });
    var Au;
    var ts = K(() => {
      p();
      Au = {};
    });
    var rs = {};
    ee(rs, { parse: () => fr });
    function fr(r, e = false) {
      let { protocol: t } = new URL(r), n = "http:" + r.substring(t.length), {
        username: i,
        password: s,
        host: o,
        hostname: u,
        port: c,
        pathname: h,
        search: l,
        searchParams: m,
        hash: E
      } = new URL(n);
      s = decodeURIComponent(s);
      let _2 = i + ":" + s, P = e ? Object.fromEntries(m.entries()) : l;
      return {
        href: r,
        protocol: t,
        auth: _2,
        username: i,
        password: s,
        host: o,
        hostname: u,
        port: c,
        pathname: h,
        search: l,
        query: P,
        hash: E
      };
    }
    var pr = K(
      () => {
        "use strict";
        p();
        a(fr, "parse");
      }
    );
    var is = I((Sl, ns) => {
      "use strict";
      p();
      var Cu = (pr(), O(rs)), dr = (nr(), O(rr));
      function yr(r) {
        if (r.charAt(0) === "/") {
          var t = r.split(" ");
          return { host: t[0], database: t[1] };
        }
        var e = Cu.parse(/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) ? encodeURI(r).replace(
          /\%25(\d\d)/g,
          "%$1"
        ) : r, true), t = e.query;
        for (var n in t)
          Array.isArray(t[n]) && (t[n] = t[n][t[n].length - 1]);
        var i = (e.auth || ":").split(":");
        if (t.user = i[0], t.password = i.splice(1).join(":"), t.port = e.port, e.protocol == "socket:")
          return t.host = decodeURI(e.pathname), t.database = e.query.db, t.client_encoding = e.query.encoding, t;
        t.host || (t.host = e.hostname);
        var s = e.pathname;
        if (!t.host && s && /^%2f/i.test(s)) {
          var o = s.split("/");
          t.host = decodeURIComponent(
            o[0]
          ), s = o.splice(1).join("/");
        }
        switch (s && s.charAt(0) === "/" && (s = s.slice(1) || null), t.database = s && decodeURI(s), (t.ssl === "true" || t.ssl === "1") && (t.ssl = true), t.ssl === "0" && (t.ssl = false), (t.sslcert || t.sslkey || t.sslrootcert || t.sslmode) && (t.ssl = {}), t.sslcert && (t.ssl.cert = dr.readFileSync(t.sslcert).toString()), t.sslkey && (t.ssl.key = dr.readFileSync(
          t.sslkey
        ).toString()), t.sslrootcert && (t.ssl.ca = dr.readFileSync(t.sslrootcert).toString()), t.sslmode) {
          case "disable": {
            t.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            break;
          case "no-verify": {
            t.ssl.rejectUnauthorized = false;
            break;
          }
        }
        return t;
      }
      a(yr, "parse");
      ns.exports = yr;
      yr.parse = yr;
    });
    var gt = I((vl, as) => {
      "use strict";
      p();
      var Iu = (ts(), O(es)), os = et(), ss = is().parse, V = a(
        function(r, e, t) {
          return t === void 0 ? t = y.env["PG" + r.toUpperCase()] : t === false || (t = y.env[t]), e[r] || t || os[r];
        },
        "val"
      ), Tu = a(function() {
        switch (y.env.PGSSLMODE) {
          case "disable":
            return false;
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full":
            return true;
          case "no-verify":
            return { rejectUnauthorized: false };
        }
        return os.ssl;
      }, "readSSLConfigFromEnvironment"), ke = a(
        function(r) {
          return "'" + ("" + r).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
        },
        "quoteParamValue"
      ), ne = a(function(r, e, t) {
        var n = e[t];
        n != null && r.push(t + "=" + ke(n));
      }, "add"), gr = class gr {
        constructor(e) {
          e = typeof e == "string" ? ss(e) : e || {}, e.connectionString && (e = Object.assign({}, e, ss(e.connectionString))), this.user = V("user", e), this.database = V("database", e), this.database === void 0 && (this.database = this.user), this.port = parseInt(
            V("port", e),
            10
          ), this.host = V("host", e), Object.defineProperty(this, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: V("password", e)
          }), this.binary = V("binary", e), this.options = V("options", e), this.ssl = typeof e.ssl > "u" ? Tu() : e.ssl, typeof this.ssl == "string" && this.ssl === "true" && (this.ssl = true), this.ssl === "no-verify" && (this.ssl = { rejectUnauthorized: false }), this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this.client_encoding = V("client_encoding", e), this.replication = V("replication", e), this.isDomainSocket = !(this.host || "").indexOf("/"), this.application_name = V("application_name", e, "PGAPPNAME"), this.fallback_application_name = V("fallback_application_name", e, false), this.statement_timeout = V("statement_timeout", e, false), this.lock_timeout = V(
            "lock_timeout",
            e,
            false
          ), this.idle_in_transaction_session_timeout = V("idle_in_transaction_session_timeout", e, false), this.query_timeout = V("query_timeout", e, false), e.connectionTimeoutMillis === void 0 ? this.connect_timeout = y.env.PGCONNECT_TIMEOUT || 0 : this.connect_timeout = Math.floor(e.connectionTimeoutMillis / 1e3), e.keepAlive === false ? this.keepalives = 0 : e.keepAlive === true && (this.keepalives = 1), typeof e.keepAliveInitialDelayMillis == "number" && (this.keepalives_idle = Math.floor(e.keepAliveInitialDelayMillis / 1e3));
        }
        getLibpqConnectionString(e) {
          var t = [];
          ne(t, this, "user"), ne(t, this, "password"), ne(t, this, "port"), ne(t, this, "application_name"), ne(t, this, "fallback_application_name"), ne(t, this, "connect_timeout"), ne(
            t,
            this,
            "options"
          );
          var n = typeof this.ssl == "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
          if (ne(t, n, "sslmode"), ne(t, n, "sslca"), ne(t, n, "sslkey"), ne(t, n, "sslcert"), ne(t, n, "sslrootcert"), this.database && t.push("dbname=" + ke(this.database)), this.replication && t.push("replication=" + ke(this.replication)), this.host && t.push("host=" + ke(this.host)), this.isDomainSocket)
            return e(null, t.join(" "));
          this.client_encoding && t.push("client_encoding=" + ke(this.client_encoding)), Iu.lookup(this.host, function(i, s) {
            return i ? e(i, null) : (t.push("hostaddr=" + ke(s)), e(null, t.join(" ")));
          });
        }
      };
      a(gr, "ConnectionParameters");
      var mr = gr;
      as.exports = mr;
    });
    var hs = I((Cl, cs) => {
      "use strict";
      p();
      var Pu = Xe(), us = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/, br = class br {
        constructor(e, t) {
          this.command = null, this.rowCount = null, this.oid = null, this.rows = [], this.fields = [], this._parsers = void 0, this._types = t, this.RowCtor = null, this.rowAsArray = e === "array", this.rowAsArray && (this.parseRow = this._parseRowAsArray);
        }
        addCommandComplete(e) {
          var t;
          e.text ? t = us.exec(e.text) : t = us.exec(e.command), t && (this.command = t[1], t[3] ? (this.oid = parseInt(t[2], 10), this.rowCount = parseInt(t[3], 10)) : t[2] && (this.rowCount = parseInt(
            t[2],
            10
          )));
        }
        _parseRowAsArray(e) {
          for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
            var s = e[n];
            s !== null ? t[n] = this._parsers[n](s) : t[n] = null;
          }
          return t;
        }
        parseRow(e) {
          for (var t = {}, n = 0, i = e.length; n < i; n++) {
            var s = e[n], o = this.fields[n].name;
            s !== null ? t[o] = this._parsers[n](
              s
            ) : t[o] = null;
          }
          return t;
        }
        addRow(e) {
          this.rows.push(e);
        }
        addFields(e) {
          this.fields = e, this.fields.length && (this._parsers = new Array(e.length));
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            this._types ? this._parsers[t] = this._types.getTypeParser(n.dataTypeID, n.format || "text") : this._parsers[t] = Pu.getTypeParser(n.dataTypeID, n.format || "text");
          }
        }
      };
      a(br, "Result");
      var wr = br;
      cs.exports = wr;
    });
    var ds = I((Pl, ps) => {
      "use strict";
      p();
      var { EventEmitter: Bu } = we(), ls = hs(), fs = tt(), xr = class xr extends Bu {
        constructor(e, t, n) {
          super(), e = fs.normalizeQueryConfig(e, t, n), this.text = e.text, this.values = e.values, this.rows = e.rows, this.types = e.types, this.name = e.name, this.binary = e.binary, this.portal = e.portal || "", this.callback = e.callback, this._rowMode = e.rowMode, y.domain && e.callback && (this.callback = y.domain.bind(e.callback)), this._result = new ls(this._rowMode, this.types), this._results = this._result, this.isPreparedStatement = false, this._canceledDueToError = false, this._promise = null;
        }
        requiresPreparation() {
          return this.name || this.rows ? true : !this.text || !this.values ? false : this.values.length > 0;
        }
        _checkForMultirow() {
          this._result.command && (Array.isArray(this._results) || (this._results = [this._result]), this._result = new ls(
            this._rowMode,
            this.types
          ), this._results.push(this._result));
        }
        handleRowDescription(e) {
          this._checkForMultirow(), this._result.addFields(e.fields), this._accumulateRows = this.callback || !this.listeners("row").length;
        }
        handleDataRow(e) {
          let t;
          if (!this._canceledDueToError) {
            try {
              t = this._result.parseRow(e.fields);
            } catch (n) {
              this._canceledDueToError = n;
              return;
            }
            this.emit("row", t, this._result), this._accumulateRows && this._result.addRow(t);
          }
        }
        handleCommandComplete(e, t) {
          this._checkForMultirow(), this._result.addCommandComplete(e), this.rows && t.sync();
        }
        handleEmptyQuery(e) {
          this.rows && e.sync();
        }
        handleError(e, t) {
          if (this._canceledDueToError && (e = this._canceledDueToError, this._canceledDueToError = false), this.callback)
            return this.callback(e);
          this.emit("error", e);
        }
        handleReadyForQuery(e) {
          if (this._canceledDueToError)
            return this.handleError(
              this._canceledDueToError,
              e
            );
          if (this.callback)
            try {
              this.callback(null, this._results);
            } catch (t) {
              y.nextTick(() => {
                throw t;
              });
            }
          this.emit("end", this._results);
        }
        submit(e) {
          if (typeof this.text != "string" && typeof this.name != "string")
            return new Error("A query must have either text or a name. Supplying neither is unsupported.");
          let t = e.parsedStatements[this.name];
          return this.text && t && this.text !== t ? new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`) : this.values && !Array.isArray(this.values) ? new Error("Query values must be an array") : (this.requiresPreparation() ? this.prepare(e) : e.query(this.text), null);
        }
        hasBeenParsed(e) {
          return this.name && e.parsedStatements[this.name];
        }
        handlePortalSuspended(e) {
          this._getRows(e, this.rows);
        }
        _getRows(e, t) {
          e.execute(
            { portal: this.portal, rows: t }
          ), t ? e.flush() : e.sync();
        }
        prepare(e) {
          this.isPreparedStatement = true, this.hasBeenParsed(e) || e.parse({ text: this.text, name: this.name, types: this.types });
          try {
            e.bind({ portal: this.portal, statement: this.name, values: this.values, binary: this.binary, valueMapper: fs.prepareValue });
          } catch (t) {
            this.handleError(t, e);
            return;
          }
          e.describe(
            { type: "P", name: this.portal || "" }
          ), this._getRows(e, this.rows);
        }
        handleCopyInResponse(e) {
          e.sendCopyFail("No source stream defined");
        }
        handleCopyData(e, t) {
        }
      };
      a(xr, "Query");
      var Sr = xr;
      ps.exports = Sr;
    });
    var ms = {};
    ee(ms, { Socket: () => Se, isIP: () => Lu });
    function Lu(r) {
      return 0;
    }
    var ys;
    var x;
    var Se;
    var wt = K(() => {
      "use strict";
      p();
      ys = We(we(), 1);
      a(Lu, "isIP");
      x = class x2 extends ys.EventEmitter {
        constructor() {
          super(...arguments);
          T(this, "opts", {});
          T(this, "connecting", false);
          T(this, "pending", true);
          T(this, "writable", true);
          T(this, "encrypted", false);
          T(this, "authorized", false);
          T(this, "destroyed", false);
          T(this, "ws", null);
          T(this, "writeBuffer");
          T(this, "tlsState", 0);
          T(
            this,
            "tlsRead"
          );
          T(this, "tlsWrite");
        }
        static get poolQueryViaFetch() {
          return x2.opts.poolQueryViaFetch ?? x2.defaults.poolQueryViaFetch;
        }
        static set poolQueryViaFetch(t) {
          x2.opts.poolQueryViaFetch = t;
        }
        static get fetchEndpoint() {
          return x2.opts.fetchEndpoint ?? x2.defaults.fetchEndpoint;
        }
        static set fetchEndpoint(t) {
          x2.opts.fetchEndpoint = t;
        }
        static get fetchConnectionCache() {
          return x2.opts.fetchConnectionCache ?? x2.defaults.fetchConnectionCache;
        }
        static set fetchConnectionCache(t) {
          x2.opts.fetchConnectionCache = t;
        }
        static get fetchFunction() {
          return x2.opts.fetchFunction ?? x2.defaults.fetchFunction;
        }
        static set fetchFunction(t) {
          x2.opts.fetchFunction = t;
        }
        static get webSocketConstructor() {
          return x2.opts.webSocketConstructor ?? x2.defaults.webSocketConstructor;
        }
        static set webSocketConstructor(t) {
          x2.opts.webSocketConstructor = t;
        }
        get webSocketConstructor() {
          return this.opts.webSocketConstructor ?? x2.webSocketConstructor;
        }
        set webSocketConstructor(t) {
          this.opts.webSocketConstructor = t;
        }
        static get wsProxy() {
          return x2.opts.wsProxy ?? x2.defaults.wsProxy;
        }
        static set wsProxy(t) {
          x2.opts.wsProxy = t;
        }
        get wsProxy() {
          return this.opts.wsProxy ?? x2.wsProxy;
        }
        set wsProxy(t) {
          this.opts.wsProxy = t;
        }
        static get coalesceWrites() {
          return x2.opts.coalesceWrites ?? x2.defaults.coalesceWrites;
        }
        static set coalesceWrites(t) {
          x2.opts.coalesceWrites = t;
        }
        get coalesceWrites() {
          return this.opts.coalesceWrites ?? x2.coalesceWrites;
        }
        set coalesceWrites(t) {
          this.opts.coalesceWrites = t;
        }
        static get useSecureWebSocket() {
          return x2.opts.useSecureWebSocket ?? x2.defaults.useSecureWebSocket;
        }
        static set useSecureWebSocket(t) {
          x2.opts.useSecureWebSocket = t;
        }
        get useSecureWebSocket() {
          return this.opts.useSecureWebSocket ?? x2.useSecureWebSocket;
        }
        set useSecureWebSocket(t) {
          this.opts.useSecureWebSocket = t;
        }
        static get forceDisablePgSSL() {
          return x2.opts.forceDisablePgSSL ?? x2.defaults.forceDisablePgSSL;
        }
        static set forceDisablePgSSL(t) {
          x2.opts.forceDisablePgSSL = t;
        }
        get forceDisablePgSSL() {
          return this.opts.forceDisablePgSSL ?? x2.forceDisablePgSSL;
        }
        set forceDisablePgSSL(t) {
          this.opts.forceDisablePgSSL = t;
        }
        static get disableSNI() {
          return x2.opts.disableSNI ?? x2.defaults.disableSNI;
        }
        static set disableSNI(t) {
          x2.opts.disableSNI = t;
        }
        get disableSNI() {
          return this.opts.disableSNI ?? x2.disableSNI;
        }
        set disableSNI(t) {
          this.opts.disableSNI = t;
        }
        static get pipelineConnect() {
          return x2.opts.pipelineConnect ?? x2.defaults.pipelineConnect;
        }
        static set pipelineConnect(t) {
          x2.opts.pipelineConnect = t;
        }
        get pipelineConnect() {
          return this.opts.pipelineConnect ?? x2.pipelineConnect;
        }
        set pipelineConnect(t) {
          this.opts.pipelineConnect = t;
        }
        static get subtls() {
          return x2.opts.subtls ?? x2.defaults.subtls;
        }
        static set subtls(t) {
          x2.opts.subtls = t;
        }
        get subtls() {
          return this.opts.subtls ?? x2.subtls;
        }
        set subtls(t) {
          this.opts.subtls = t;
        }
        static get pipelineTLS() {
          return x2.opts.pipelineTLS ?? x2.defaults.pipelineTLS;
        }
        static set pipelineTLS(t) {
          x2.opts.pipelineTLS = t;
        }
        get pipelineTLS() {
          return this.opts.pipelineTLS ?? x2.pipelineTLS;
        }
        set pipelineTLS(t) {
          this.opts.pipelineTLS = t;
        }
        static get rootCerts() {
          return x2.opts.rootCerts ?? x2.defaults.rootCerts;
        }
        static set rootCerts(t) {
          x2.opts.rootCerts = t;
        }
        get rootCerts() {
          return this.opts.rootCerts ?? x2.rootCerts;
        }
        set rootCerts(t) {
          this.opts.rootCerts = t;
        }
        wsProxyAddrForHost(t, n) {
          let i = this.wsProxy;
          if (i === void 0)
            throw new Error("No WebSocket proxy is configured. Please refer to https://github.com/neondatabase/serverless#run-your-own-websocket-proxy");
          return typeof i == "function" ? i(t, n) : `${i}?address=${t}:${n}`;
        }
        setNoDelay() {
          return this;
        }
        setKeepAlive() {
          return this;
        }
        ref() {
          return this;
        }
        unref() {
          return this;
        }
        async connect(t, n, i) {
          this.connecting = true, i && this.once("connect", i);
          let s;
          try {
            s = this.wsProxyAddrForHost(
              n,
              typeof t == "string" ? parseInt(t, 10) : t
            );
          } catch (o) {
            this.emit("error", o), this.emit("close");
            return;
          }
          return this.ws = await new Promise(async (o) => {
            try {
              let c = (this.useSecureWebSocket ? "wss:" : "ws:") + "//" + s, h;
              if (this.webSocketConstructor !== void 0)
                h = new this.webSocketConstructor(
                  c
                );
              else
                try {
                  h = new WebSocket(c);
                } catch {
                  h = new __unstable_WebSocket(c);
                }
              h.addEventListener(
                "open",
                () => {
                  o(h);
                }
              );
            } catch (u) {
              try {
                let h = (this.useSecureWebSocket ? "https:" : "http:") + "//" + s;
                await fetch(h, { headers: { Upgrade: "websocket" } }).then((l) => {
                  let m = l.webSocket;
                  if (m == null)
                    throw u;
                  m.accept(), o(m);
                });
              } catch {
                this.emit("error", new Error("All attempts to open a WebSocket to connect to the database failed. Please refer to https://github.com/neondatabase/serverless#run-on-node")), this.emit("close");
                return;
              }
            }
          }), this.ws.binaryType = "arraybuffer", this.ws.addEventListener("error", (o) => {
            this.emit(
              "error",
              o
            ), this.emit("close");
          }), this.ws.addEventListener("close", () => {
            this.emit(
              "close"
            );
          }), this.ws.addEventListener("message", (o) => {
            if (this.tlsState === 0) {
              let u = d.from(o.data);
              this.emit("data", u);
            }
          }), this.connecting = false, this.pending = false, this.emit(
            "connect"
          ), this.emit("ready"), this;
        }
        async startTls(t) {
          if (this.subtls === void 0)
            throw new Error(
              "For Postgres SSL connections, you must set `neonConfig.subtls` to the subtls library. See https://github.com/neondatabase/serverless/blob/main/CONFIG.md for more information."
            );
          this.tlsState = 1;
          let n = this.subtls.TrustedCert.fromPEM(this.rootCerts), i = new this.subtls.WebSocketReadQueue(this.ws), s = i.read.bind(i), o = this.rawWrite.bind(
            this
          ), [u, c] = await this.subtls.startTls(t, n, s, o, { useSNI: !this.disableSNI, expectPreData: this.pipelineTLS ? new Uint8Array([83]) : void 0 });
          this.tlsRead = u, this.tlsWrite = c, this.tlsState = 2, this.encrypted = true, this.authorized = true, this.emit("secureConnection", this), this.tlsReadLoop();
        }
        async tlsReadLoop() {
          for (; ; ) {
            let t = await this.tlsRead();
            if (t === void 0)
              break;
            {
              let n = d.from(t);
              this.emit(
                "data",
                n
              );
            }
          }
        }
        rawWrite(t) {
          if (!this.coalesceWrites) {
            this.ws.send(t);
            return;
          }
          if (this.writeBuffer === void 0)
            this.writeBuffer = t, setTimeout(() => {
              this.ws.send(this.writeBuffer), this.writeBuffer = void 0;
            }, 0);
          else {
            let n = new Uint8Array(this.writeBuffer.length + t.length);
            n.set(this.writeBuffer), n.set(t, this.writeBuffer.length), this.writeBuffer = n;
          }
        }
        write(t, n = "utf8", i = (s) => {
        }) {
          return t.length === 0 ? i() : (typeof t == "string" && (t = d.from(
            t,
            n
          )), this.tlsState === 0 ? this.rawWrite(t) : this.tlsState === 1 ? this.once("secureConnection", () => this.write(t, n, i)) : this.tlsWrite(t), true);
        }
        end(t = d.alloc(0), n = "utf8", i) {
          return this.write(t, n, () => {
            this.ws.close(), i && i();
          }), this;
        }
        destroy() {
          return this.destroyed = true, this.end();
        }
      };
      a(x, "Socket"), T(x, "defaults", {
        poolQueryViaFetch: false,
        fetchEndpoint: (t) => "https://" + t + "/sql",
        fetchConnectionCache: false,
        fetchFunction: void 0,
        webSocketConstructor: void 0,
        wsProxy: (t) => t + "/v2",
        useSecureWebSocket: true,
        forceDisablePgSSL: true,
        coalesceWrites: true,
        pipelineConnect: "password",
        subtls: void 0,
        rootCerts: "",
        pipelineTLS: false,
        disableSNI: false
      }), T(x, "opts", {});
      Se = x;
    });
    var Yr = I((C) => {
      "use strict";
      p();
      Object.defineProperty(C, "__esModule", { value: true });
      C.NoticeMessage = C.DataRowMessage = C.CommandCompleteMessage = C.ReadyForQueryMessage = C.NotificationResponseMessage = C.BackendKeyDataMessage = C.AuthenticationMD5Password = C.ParameterStatusMessage = C.ParameterDescriptionMessage = C.RowDescriptionMessage = C.Field = C.CopyResponse = C.CopyDataMessage = C.DatabaseError = C.copyDone = C.emptyQuery = C.replicationStart = C.portalSuspended = C.noData = C.closeComplete = C.bindComplete = C.parseComplete = void 0;
      C.parseComplete = { name: "parseComplete", length: 5 };
      C.bindComplete = { name: "bindComplete", length: 5 };
      C.closeComplete = { name: "closeComplete", length: 5 };
      C.noData = { name: "noData", length: 5 };
      C.portalSuspended = { name: "portalSuspended", length: 5 };
      C.replicationStart = { name: "replicationStart", length: 4 };
      C.emptyQuery = { name: "emptyQuery", length: 4 };
      C.copyDone = { name: "copyDone", length: 4 };
      var Or = class Or extends Error {
        constructor(e, t, n) {
          super(
            e
          ), this.length = t, this.name = n;
        }
      };
      a(Or, "DatabaseError");
      var Er = Or;
      C.DatabaseError = Er;
      var kr = class kr {
        constructor(e, t) {
          this.length = e, this.chunk = t, this.name = "copyData";
        }
      };
      a(kr, "CopyDataMessage");
      var vr = kr;
      C.CopyDataMessage = vr;
      var Ur = class Ur {
        constructor(e, t, n, i) {
          this.length = e, this.name = t, this.binary = n, this.columnTypes = new Array(i);
        }
      };
      a(Ur, "CopyResponse");
      var _r = Ur;
      C.CopyResponse = _r;
      var qr = class qr {
        constructor(e, t, n, i, s, o, u) {
          this.name = e, this.tableID = t, this.columnID = n, this.dataTypeID = i, this.dataTypeSize = s, this.dataTypeModifier = o, this.format = u;
        }
      };
      a(qr, "Field");
      var Ar = qr;
      C.Field = Ar;
      var Nr = class Nr {
        constructor(e, t) {
          this.length = e, this.fieldCount = t, this.name = "rowDescription", this.fields = new Array(
            this.fieldCount
          );
        }
      };
      a(Nr, "RowDescriptionMessage");
      var Cr = Nr;
      C.RowDescriptionMessage = Cr;
      var Qr = class Qr {
        constructor(e, t) {
          this.length = e, this.parameterCount = t, this.name = "parameterDescription", this.dataTypeIDs = new Array(this.parameterCount);
        }
      };
      a(Qr, "ParameterDescriptionMessage");
      var Ir = Qr;
      C.ParameterDescriptionMessage = Ir;
      var Wr = class Wr {
        constructor(e, t, n) {
          this.length = e, this.parameterName = t, this.parameterValue = n, this.name = "parameterStatus";
        }
      };
      a(Wr, "ParameterStatusMessage");
      var Tr = Wr;
      C.ParameterStatusMessage = Tr;
      var jr = class jr {
        constructor(e, t) {
          this.length = e, this.salt = t, this.name = "authenticationMD5Password";
        }
      };
      a(jr, "AuthenticationMD5Password");
      var Pr = jr;
      C.AuthenticationMD5Password = Pr;
      var Hr = class Hr {
        constructor(e, t, n) {
          this.length = e, this.processID = t, this.secretKey = n, this.name = "backendKeyData";
        }
      };
      a(
        Hr,
        "BackendKeyDataMessage"
      );
      var Br = Hr;
      C.BackendKeyDataMessage = Br;
      var Gr = class Gr {
        constructor(e, t, n, i) {
          this.length = e, this.processId = t, this.channel = n, this.payload = i, this.name = "notification";
        }
      };
      a(Gr, "NotificationResponseMessage");
      var Lr = Gr;
      C.NotificationResponseMessage = Lr;
      var $r = class $r {
        constructor(e, t) {
          this.length = e, this.status = t, this.name = "readyForQuery";
        }
      };
      a($r, "ReadyForQueryMessage");
      var Rr = $r;
      C.ReadyForQueryMessage = Rr;
      var Kr = class Kr {
        constructor(e, t) {
          this.length = e, this.text = t, this.name = "commandComplete";
        }
      };
      a(Kr, "CommandCompleteMessage");
      var Fr = Kr;
      C.CommandCompleteMessage = Fr;
      var Vr = class Vr {
        constructor(e, t) {
          this.length = e, this.fields = t, this.name = "dataRow", this.fieldCount = t.length;
        }
      };
      a(Vr, "DataRowMessage");
      var Mr = Vr;
      C.DataRowMessage = Mr;
      var zr = class zr {
        constructor(e, t) {
          this.length = e, this.message = t, this.name = "notice";
        }
      };
      a(zr, "NoticeMessage");
      var Dr = zr;
      C.NoticeMessage = Dr;
    });
    var gs = I((bt) => {
      "use strict";
      p();
      Object.defineProperty(bt, "__esModule", { value: true });
      bt.Writer = void 0;
      var Jr = class Jr {
        constructor(e = 256) {
          this.size = e, this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(e);
        }
        ensure(e) {
          var t = this.buffer.length - this.offset;
          if (t < e) {
            var n = this.buffer, i = n.length + (n.length >> 1) + e;
            this.buffer = d.allocUnsafe(
              i
            ), n.copy(this.buffer);
          }
        }
        addInt32(e) {
          return this.ensure(4), this.buffer[this.offset++] = e >>> 24 & 255, this.buffer[this.offset++] = e >>> 16 & 255, this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
        }
        addInt16(e) {
          return this.ensure(2), this.buffer[this.offset++] = e >>> 8 & 255, this.buffer[this.offset++] = e >>> 0 & 255, this;
        }
        addCString(e) {
          if (!e)
            this.ensure(1);
          else {
            var t = d.byteLength(e);
            this.ensure(t + 1), this.buffer.write(
              e,
              this.offset,
              "utf-8"
            ), this.offset += t;
          }
          return this.buffer[this.offset++] = 0, this;
        }
        addString(e = "") {
          var t = d.byteLength(e);
          return this.ensure(t), this.buffer.write(e, this.offset), this.offset += t, this;
        }
        add(e) {
          return this.ensure(e.length), e.copy(this.buffer, this.offset), this.offset += e.length, this;
        }
        join(e) {
          if (e) {
            this.buffer[this.headerPosition] = e;
            let t = this.offset - (this.headerPosition + 1);
            this.buffer.writeInt32BE(t, this.headerPosition + 1);
          }
          return this.buffer.slice(e ? 0 : 5, this.offset);
        }
        flush(e) {
          var t = this.join(e);
          return this.offset = 5, this.headerPosition = 0, this.buffer = d.allocUnsafe(this.size), t;
        }
      };
      a(Jr, "Writer");
      var Zr = Jr;
      bt.Writer = Zr;
    });
    var bs = I((xt) => {
      "use strict";
      p();
      Object.defineProperty(xt, "__esModule", { value: true });
      xt.serialize = void 0;
      var Xr = gs(), F = new Xr.Writer(), Ru = a((r) => {
        F.addInt16(3).addInt16(
          0
        );
        for (let n of Object.keys(r))
          F.addCString(n).addCString(r[n]);
        F.addCString("client_encoding").addCString("UTF8");
        var e = F.addCString("").flush(), t = e.length + 4;
        return new Xr.Writer().addInt32(t).add(e).flush();
      }, "startup"), Fu = a(() => {
        let r = d.allocUnsafe(8);
        return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
      }, "requestSsl"), Mu = a((r) => F.addCString(r).flush(112), "password"), Du = a(function(r, e) {
        return F.addCString(r).addInt32(
          d.byteLength(e)
        ).addString(e), F.flush(112);
      }, "sendSASLInitialResponseMessage"), Ou = a(
        function(r) {
          return F.addString(r).flush(112);
        },
        "sendSCRAMClientFinalMessage"
      ), ku = a(
        (r) => F.addCString(r).flush(81),
        "query"
      ), ws = [], Uu = a((r) => {
        let e = r.name || "";
        e.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error("You supplied %s (%s)", e, e.length), console.error("This can cause conflicts and silent errors executing queries"));
        let t = r.types || ws;
        for (var n = t.length, i = F.addCString(e).addCString(r.text).addInt16(n), s = 0; s < n; s++)
          i.addInt32(t[s]);
        return F.flush(80);
      }, "parse"), Ue = new Xr.Writer(), qu = a(function(r, e) {
        for (let t = 0; t < r.length; t++) {
          let n = e ? e(r[t], t) : r[t];
          n == null ? (F.addInt16(0), Ue.addInt32(-1)) : n instanceof d ? (F.addInt16(1), Ue.addInt32(n.length), Ue.add(n)) : (F.addInt16(0), Ue.addInt32(d.byteLength(
            n
          )), Ue.addString(n));
        }
      }, "writeValues"), Nu = a((r = {}) => {
        let e = r.portal || "", t = r.statement || "", n = r.binary || false, i = r.values || ws, s = i.length;
        return F.addCString(e).addCString(t), F.addInt16(s), qu(i, r.valueMapper), F.addInt16(s), F.add(Ue.flush()), F.addInt16(n ? 1 : 0), F.flush(66);
      }, "bind"), Qu = d.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]), Wu = a((r) => {
        if (!r || !r.portal && !r.rows)
          return Qu;
        let e = r.portal || "", t = r.rows || 0, n = d.byteLength(e), i = 4 + n + 1 + 4, s = d.allocUnsafe(1 + i);
        return s[0] = 69, s.writeInt32BE(i, 1), s.write(e, 5, "utf-8"), s[n + 5] = 0, s.writeUInt32BE(t, s.length - 4), s;
      }, "execute"), ju = a((r, e) => {
        let t = d.allocUnsafe(16);
        return t.writeInt32BE(16, 0), t.writeInt16BE(1234, 4), t.writeInt16BE(5678, 6), t.writeInt32BE(
          r,
          8
        ), t.writeInt32BE(e, 12), t;
      }, "cancel"), en = a(
        (r, e) => {
          let n = 4 + d.byteLength(e) + 1, i = d.allocUnsafe(1 + n);
          return i[0] = r, i.writeInt32BE(n, 1), i.write(e, 5, "utf-8"), i[n] = 0, i;
        },
        "cstringMessage"
      ), Hu = F.addCString("P").flush(68), Gu = F.addCString("S").flush(68), $u = a((r) => r.name ? en(68, `${r.type}${r.name || ""}`) : r.type === "P" ? Hu : Gu, "describe"), Ku = a(
        (r) => {
          let e = `${r.type}${r.name || ""}`;
          return en(67, e);
        },
        "close"
      ), Vu = a((r) => F.add(r).flush(
        100
      ), "copyData"), zu = a((r) => en(102, r), "copyFail"), St = a((r) => d.from([r, 0, 0, 0, 4]), "codeOnlyBuffer"), Yu = St(72), Zu = St(83), Ju = St(88), Xu = St(99), ec = {
        startup: Ru,
        password: Mu,
        requestSsl: Fu,
        sendSASLInitialResponseMessage: Du,
        sendSCRAMClientFinalMessage: Ou,
        query: ku,
        parse: Uu,
        bind: Nu,
        execute: Wu,
        describe: $u,
        close: Ku,
        flush: () => Yu,
        sync: () => Zu,
        end: () => Ju,
        copyData: Vu,
        copyDone: () => Xu,
        copyFail: zu,
        cancel: ju
      };
      xt.serialize = ec;
    });
    var Ss = I((Et) => {
      "use strict";
      p();
      Object.defineProperty(Et, "__esModule", { value: true });
      Et.BufferReader = void 0;
      var tc = d.allocUnsafe(0), rn = class rn {
        constructor(e = 0) {
          this.offset = e, this.buffer = tc, this.encoding = "utf-8";
        }
        setBuffer(e, t) {
          this.offset = e, this.buffer = t;
        }
        int16() {
          let e = this.buffer.readInt16BE(this.offset);
          return this.offset += 2, e;
        }
        byte() {
          let e = this.buffer[this.offset];
          return this.offset++, e;
        }
        int32() {
          let e = this.buffer.readInt32BE(this.offset);
          return this.offset += 4, e;
        }
        string(e) {
          let t = this.buffer.toString(this.encoding, this.offset, this.offset + e);
          return this.offset += e, t;
        }
        cstring() {
          let e = this.offset, t = e;
          for (; this.buffer[t++] !== 0; )
            ;
          return this.offset = t, this.buffer.toString(this.encoding, e, t - 1);
        }
        bytes(e) {
          let t = this.buffer.slice(this.offset, this.offset + e);
          return this.offset += e, t;
        }
      };
      a(rn, "BufferReader");
      var tn = rn;
      Et.BufferReader = tn;
    });
    var xs = {};
    ee(xs, { default: () => rc });
    var rc;
    var Es = K(() => {
      p();
      rc = {};
    });
    var As = I((qe) => {
      "use strict";
      p();
      var nc = qe && qe.__importDefault || function(r) {
        return r && r.__esModule ? r : { default: r };
      };
      Object.defineProperty(qe, "__esModule", { value: true });
      qe.Parser = void 0;
      var M = Yr(), ic = Ss(), sc = nc((Es(), O(xs))), nn = 1, oc = 4, vs = nn + oc, _s = d.allocUnsafe(
        0
      ), on = class on {
        constructor(e) {
          if (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0, this.reader = new ic.BufferReader(), e?.mode === "binary")
            throw new Error("Binary mode not supported yet");
          this.mode = e?.mode || "text";
        }
        parse(e, t) {
          this.mergeBuffer(e);
          let n = this.bufferOffset + this.bufferLength, i = this.bufferOffset;
          for (; i + vs <= n; ) {
            let s = this.buffer[i], o = this.buffer.readUInt32BE(i + nn), u = nn + o;
            if (u + i <= n) {
              let c = this.handlePacket(
                i + vs,
                s,
                o,
                this.buffer
              );
              t(c), i += u;
            } else
              break;
          }
          i === n ? (this.buffer = _s, this.bufferLength = 0, this.bufferOffset = 0) : (this.bufferLength = n - i, this.bufferOffset = i);
        }
        mergeBuffer(e) {
          if (this.bufferLength > 0) {
            let t = this.bufferLength + e.byteLength;
            if (t + this.bufferOffset > this.buffer.byteLength) {
              let i;
              if (t <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength)
                i = this.buffer;
              else {
                let s = this.buffer.byteLength * 2;
                for (; t >= s; )
                  s *= 2;
                i = d.allocUnsafe(s);
              }
              this.buffer.copy(i, 0, this.bufferOffset, this.bufferOffset + this.bufferLength), this.buffer = i, this.bufferOffset = 0;
            }
            e.copy(this.buffer, this.bufferOffset + this.bufferLength), this.bufferLength = t;
          } else
            this.buffer = e, this.bufferOffset = 0, this.bufferLength = e.byteLength;
        }
        handlePacket(e, t, n, i) {
          switch (t) {
            case 50:
              return M.bindComplete;
            case 49:
              return M.parseComplete;
            case 51:
              return M.closeComplete;
            case 110:
              return M.noData;
            case 115:
              return M.portalSuspended;
            case 99:
              return M.copyDone;
            case 87:
              return M.replicationStart;
            case 73:
              return M.emptyQuery;
            case 68:
              return this.parseDataRowMessage(e, n, i);
            case 67:
              return this.parseCommandCompleteMessage(
                e,
                n,
                i
              );
            case 90:
              return this.parseReadyForQueryMessage(e, n, i);
            case 65:
              return this.parseNotificationMessage(e, n, i);
            case 82:
              return this.parseAuthenticationResponse(
                e,
                n,
                i
              );
            case 83:
              return this.parseParameterStatusMessage(e, n, i);
            case 75:
              return this.parseBackendKeyData(e, n, i);
            case 69:
              return this.parseErrorMessage(e, n, i, "error");
            case 78:
              return this.parseErrorMessage(e, n, i, "notice");
            case 84:
              return this.parseRowDescriptionMessage(
                e,
                n,
                i
              );
            case 116:
              return this.parseParameterDescriptionMessage(e, n, i);
            case 71:
              return this.parseCopyInMessage(e, n, i);
            case 72:
              return this.parseCopyOutMessage(e, n, i);
            case 100:
              return this.parseCopyData(e, n, i);
            default:
              sc.default.fail(`unknown message code: ${t.toString(16)}`);
          }
        }
        parseReadyForQueryMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.string(1);
          return new M.ReadyForQueryMessage(t, i);
        }
        parseCommandCompleteMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.cstring();
          return new M.CommandCompleteMessage(
            t,
            i
          );
        }
        parseCopyData(e, t, n) {
          let i = n.slice(e, e + (t - 4));
          return new M.CopyDataMessage(
            t,
            i
          );
        }
        parseCopyInMessage(e, t, n) {
          return this.parseCopyMessage(e, t, n, "copyInResponse");
        }
        parseCopyOutMessage(e, t, n) {
          return this.parseCopyMessage(e, t, n, "copyOutResponse");
        }
        parseCopyMessage(e, t, n, i) {
          this.reader.setBuffer(e, n);
          let s = this.reader.byte() !== 0, o = this.reader.int16(), u = new M.CopyResponse(t, i, s, o);
          for (let c = 0; c < o; c++)
            u.columnTypes[c] = this.reader.int16();
          return u;
        }
        parseNotificationMessage(e, t, n) {
          this.reader.setBuffer(
            e,
            n
          );
          let i = this.reader.int32(), s = this.reader.cstring(), o = this.reader.cstring();
          return new M.NotificationResponseMessage(t, i, s, o);
        }
        parseRowDescriptionMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.int16(), s = new M.RowDescriptionMessage(t, i);
          for (let o = 0; o < i; o++)
            s.fields[o] = this.parseField();
          return s;
        }
        parseField() {
          let e = this.reader.cstring(), t = this.reader.int32(), n = this.reader.int16(), i = this.reader.int32(), s = this.reader.int16(), o = this.reader.int32(), u = this.reader.int16() === 0 ? "text" : "binary";
          return new M.Field(e, t, n, i, s, o, u);
        }
        parseParameterDescriptionMessage(e, t, n) {
          this.reader.setBuffer(
            e,
            n
          );
          let i = this.reader.int16(), s = new M.ParameterDescriptionMessage(t, i);
          for (let o = 0; o < i; o++)
            s.dataTypeIDs[o] = this.reader.int32();
          return s;
        }
        parseDataRowMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.int16(), s = new Array(i);
          for (let o = 0; o < i; o++) {
            let u = this.reader.int32();
            s[o] = u === -1 ? null : this.reader.string(u);
          }
          return new M.DataRowMessage(
            t,
            s
          );
        }
        parseParameterStatusMessage(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.cstring(), s = this.reader.cstring();
          return new M.ParameterStatusMessage(t, i, s);
        }
        parseBackendKeyData(e, t, n) {
          this.reader.setBuffer(e, n);
          let i = this.reader.int32(), s = this.reader.int32();
          return new M.BackendKeyDataMessage(t, i, s);
        }
        parseAuthenticationResponse(e, t, n) {
          this.reader.setBuffer(
            e,
            n
          );
          let i = this.reader.int32(), s = { name: "authenticationOk", length: t };
          switch (i) {
            case 0:
              break;
            case 3:
              s.length === 8 && (s.name = "authenticationCleartextPassword");
              break;
            case 5:
              if (s.length === 12) {
                s.name = "authenticationMD5Password";
                let u = this.reader.bytes(4);
                return new M.AuthenticationMD5Password(t, u);
              }
              break;
            case 10:
              s.name = "authenticationSASL", s.mechanisms = [];
              let o;
              do
                o = this.reader.cstring(), o && s.mechanisms.push(o);
              while (o);
              break;
            case 11:
              s.name = "authenticationSASLContinue", s.data = this.reader.string(t - 8);
              break;
            case 12:
              s.name = "authenticationSASLFinal", s.data = this.reader.string(t - 8);
              break;
            default:
              throw new Error("Unknown authenticationOk message type " + i);
          }
          return s;
        }
        parseErrorMessage(e, t, n, i) {
          this.reader.setBuffer(e, n);
          let s = {}, o = this.reader.string(1);
          for (; o !== "\0"; )
            s[o] = this.reader.cstring(), o = this.reader.string(1);
          let u = s.M, c = i === "notice" ? new M.NoticeMessage(
            t,
            u
          ) : new M.DatabaseError(u, t, i);
          return c.severity = s.S, c.code = s.C, c.detail = s.D, c.hint = s.H, c.position = s.P, c.internalPosition = s.p, c.internalQuery = s.q, c.where = s.W, c.schema = s.s, c.table = s.t, c.column = s.c, c.dataType = s.d, c.constraint = s.n, c.file = s.F, c.line = s.L, c.routine = s.R, c;
        }
      };
      a(on, "Parser");
      var sn = on;
      qe.Parser = sn;
    });
    var an = I((xe) => {
      "use strict";
      p();
      Object.defineProperty(xe, "__esModule", { value: true });
      xe.DatabaseError = xe.serialize = xe.parse = void 0;
      var ac = Yr();
      Object.defineProperty(
        xe,
        "DatabaseError",
        { enumerable: true, get: function() {
          return ac.DatabaseError;
        } }
      );
      var uc = bs();
      Object.defineProperty(xe, "serialize", { enumerable: true, get: function() {
        return uc.serialize;
      } });
      var cc = As();
      function hc(r, e) {
        let t = new cc.Parser();
        return r.on("data", (n) => t.parse(
          n,
          e
        )), new Promise((n) => r.on("end", () => n()));
      }
      a(hc, "parse");
      xe.parse = hc;
    });
    var Cs = {};
    ee(Cs, { connect: () => lc });
    function lc({ socket: r, servername: e }) {
      return r.startTls(e), r;
    }
    var Is = K(() => {
      p();
      a(lc, "connect");
    });
    var hn = I((tf, Bs) => {
      "use strict";
      p();
      var Ts = (wt(), O(ms)), fc = we().EventEmitter, {
        parse: pc,
        serialize: q
      } = an(), Ps = q.flush(), dc = q.sync(), yc = q.end(), cn = class cn extends fc {
        constructor(e) {
          super(), e = e || {}, this.stream = e.stream || new Ts.Socket(), this._keepAlive = e.keepAlive, this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis, this.lastBuffer = false, this.parsedStatements = {}, this.ssl = e.ssl || false, this._ending = false, this._emitMessage = false;
          var t = this;
          this.on("newListener", function(n) {
            n === "message" && (t._emitMessage = true);
          });
        }
        connect(e, t) {
          var n = this;
          this._connecting = true, this.stream.setNoDelay(true), this.stream.connect(
            e,
            t
          ), this.stream.once("connect", function() {
            n._keepAlive && n.stream.setKeepAlive(
              true,
              n._keepAliveInitialDelayMillis
            ), n.emit("connect");
          });
          let i = a(function(s) {
            n._ending && (s.code === "ECONNRESET" || s.code === "EPIPE") || n.emit("error", s);
          }, "reportStreamError");
          if (this.stream.on("error", i), this.stream.on("close", function() {
            n.emit("end");
          }), !this.ssl)
            return this.attachListeners(this.stream);
          this.stream.once("data", function(s) {
            var o = s.toString("utf8");
            switch (o) {
              case "S":
                break;
              case "N":
                return n.stream.end(), n.emit("error", new Error("The server does not support SSL connections"));
              default:
                return n.stream.end(), n.emit("error", new Error("There was an error establishing an SSL connection"));
            }
            var u = (Is(), O(Cs));
            let c = { socket: n.stream };
            n.ssl !== true && (Object.assign(
              c,
              n.ssl
            ), "key" in n.ssl && (c.key = n.ssl.key)), Ts.isIP(t) === 0 && (c.servername = t);
            try {
              n.stream = u.connect(c);
            } catch (h) {
              return n.emit("error", h);
            }
            n.attachListeners(n.stream), n.stream.on("error", i), n.emit("sslconnect");
          });
        }
        attachListeners(e) {
          e.on("end", () => {
            this.emit("end");
          }), pc(e, (t) => {
            var n = t.name === "error" ? "errorMessage" : t.name;
            this._emitMessage && this.emit("message", t), this.emit(n, t);
          });
        }
        requestSsl() {
          this.stream.write(q.requestSsl());
        }
        startup(e) {
          this.stream.write(q.startup(e));
        }
        cancel(e, t) {
          this._send(q.cancel(e, t));
        }
        password(e) {
          this._send(q.password(e));
        }
        sendSASLInitialResponseMessage(e, t) {
          this._send(q.sendSASLInitialResponseMessage(
            e,
            t
          ));
        }
        sendSCRAMClientFinalMessage(e) {
          this._send(q.sendSCRAMClientFinalMessage(e));
        }
        _send(e) {
          return this.stream.writable ? this.stream.write(e) : false;
        }
        query(e) {
          this._send(q.query(
            e
          ));
        }
        parse(e) {
          this._send(q.parse(e));
        }
        bind(e) {
          this._send(q.bind(e));
        }
        execute(e) {
          this._send(q.execute(e));
        }
        flush() {
          this.stream.writable && this.stream.write(Ps);
        }
        sync() {
          this._ending = true, this._send(Ps), this._send(dc);
        }
        ref() {
          this.stream.ref();
        }
        unref() {
          this.stream.unref();
        }
        end() {
          if (this._ending = true, !this._connecting || !this.stream.writable) {
            this.stream.end();
            return;
          }
          return this.stream.write(yc, () => {
            this.stream.end();
          });
        }
        close(e) {
          this._send(q.close(e));
        }
        describe(e) {
          this._send(q.describe(e));
        }
        sendCopyFromChunk(e) {
          this._send(q.copyData(e));
        }
        endCopyFrom() {
          this._send(q.copyDone());
        }
        sendCopyFail(e) {
          this._send(q.copyFail(e));
        }
      };
      a(cn, "Connection");
      var un = cn;
      Bs.exports = un;
    });
    var Fs = I((of, Rs) => {
      "use strict";
      p();
      var mc = we().EventEmitter, sf = (Ge(), O(He)), gc = tt(), ln = Qi(), wc = Ji(), bc = lr(), Sc = gt(), Ls = ds(), xc = et(), Ec = hn(), fn = class fn extends mc {
        constructor(e) {
          super(), this.connectionParameters = new Sc(e), this.user = this.connectionParameters.user, this.database = this.connectionParameters.database, this.port = this.connectionParameters.port, this.host = this.connectionParameters.host, Object.defineProperty(this, "password", { configurable: true, enumerable: false, writable: true, value: this.connectionParameters.password }), this.replication = this.connectionParameters.replication;
          var t = e || {};
          this._Promise = t.Promise || b.Promise, this._types = new bc(t.types), this._ending = false, this._connecting = false, this._connected = false, this._connectionError = false, this._queryable = true, this.connection = t.connection || new Ec({ stream: t.stream, ssl: this.connectionParameters.ssl, keepAlive: t.keepAlive || false, keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0, encoding: this.connectionParameters.client_encoding || "utf8" }), this.queryQueue = [], this.binary = t.binary || xc.binary, this.processID = null, this.secretKey = null, this.ssl = this.connectionParameters.ssl || false, this.ssl && this.ssl.key && Object.defineProperty(this.ssl, "key", { enumerable: false }), this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0;
        }
        _errorAllQueries(e) {
          let t = a(
            (n) => {
              y.nextTick(() => {
                n.handleError(e, this.connection);
              });
            },
            "enqueueError"
          );
          this.activeQuery && (t(this.activeQuery), this.activeQuery = null), this.queryQueue.forEach(t), this.queryQueue.length = 0;
        }
        _connect(e) {
          var t = this, n = this.connection;
          if (this._connectionCallback = e, this._connecting || this._connected) {
            let i = new Error("Client has already been connected. You cannot reuse a client.");
            y.nextTick(() => {
              e(i);
            });
            return;
          }
          this._connecting = true, this.connectionTimeoutHandle, this._connectionTimeoutMillis > 0 && (this.connectionTimeoutHandle = setTimeout(() => {
            n._ending = true, n.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis)), this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
            t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
          }), n.on("sslconnect", function() {
            n.startup(t.getStartupConf());
          }), this._attachListeners(n), n.once("end", () => {
            let i = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
            clearTimeout(this.connectionTimeoutHandle), this._errorAllQueries(i), this._ending || (this._connecting && !this._connectionError ? this._connectionCallback ? this._connectionCallback(i) : this._handleErrorEvent(i) : this._connectionError || this._handleErrorEvent(
              i
            )), y.nextTick(() => {
              this.emit("end");
            });
          });
        }
        connect(e) {
          if (e) {
            this._connect(e);
            return;
          }
          return new this._Promise((t, n) => {
            this._connect((i) => {
              i ? n(i) : t();
            });
          });
        }
        _attachListeners(e) {
          e.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this)), e.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this)), e.on("authenticationSASL", this._handleAuthSASL.bind(this)), e.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this)), e.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this)), e.on("backendKeyData", this._handleBackendKeyData.bind(this)), e.on("error", this._handleErrorEvent.bind(this)), e.on(
            "errorMessage",
            this._handleErrorMessage.bind(this)
          ), e.on("readyForQuery", this._handleReadyForQuery.bind(this)), e.on("notice", this._handleNotice.bind(this)), e.on("rowDescription", this._handleRowDescription.bind(this)), e.on("dataRow", this._handleDataRow.bind(this)), e.on("portalSuspended", this._handlePortalSuspended.bind(this)), e.on(
            "emptyQuery",
            this._handleEmptyQuery.bind(this)
          ), e.on("commandComplete", this._handleCommandComplete.bind(this)), e.on("parseComplete", this._handleParseComplete.bind(this)), e.on("copyInResponse", this._handleCopyInResponse.bind(this)), e.on("copyData", this._handleCopyData.bind(this)), e.on("notification", this._handleNotification.bind(this));
        }
        _checkPgPass(e) {
          let t = this.connection;
          typeof this.password == "function" ? this._Promise.resolve().then(
            () => this.password()
          ).then((n) => {
            if (n !== void 0) {
              if (typeof n != "string") {
                t.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = n;
            } else
              this.connectionParameters.password = this.password = null;
            e();
          }).catch((n) => {
            t.emit("error", n);
          }) : this.password !== null ? e() : wc(
            this.connectionParameters,
            (n) => {
              n !== void 0 && (this.connectionParameters.password = this.password = n), e();
            }
          );
        }
        _handleAuthCleartextPassword(e) {
          this._checkPgPass(() => {
            this.connection.password(this.password);
          });
        }
        _handleAuthMD5Password(e) {
          this._checkPgPass(() => {
            let t = gc.postgresMd5PasswordHash(
              this.user,
              this.password,
              e.salt
            );
            this.connection.password(t);
          });
        }
        _handleAuthSASL(e) {
          this._checkPgPass(() => {
            this.saslSession = ln.startSession(e.mechanisms), this.connection.sendSASLInitialResponseMessage(
              this.saslSession.mechanism,
              this.saslSession.response
            );
          });
        }
        _handleAuthSASLContinue(e) {
          ln.continueSession(this.saslSession, this.password, e.data), this.connection.sendSCRAMClientFinalMessage(
            this.saslSession.response
          );
        }
        _handleAuthSASLFinal(e) {
          ln.finalizeSession(
            this.saslSession,
            e.data
          ), this.saslSession = null;
        }
        _handleBackendKeyData(e) {
          this.processID = e.processID, this.secretKey = e.secretKey;
        }
        _handleReadyForQuery(e) {
          this._connecting && (this._connecting = false, this._connected = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback && (this._connectionCallback(null, this), this._connectionCallback = null), this.emit("connect"));
          let { activeQuery: t } = this;
          this.activeQuery = null, this.readyForQuery = true, t && t.handleReadyForQuery(this.connection), this._pulseQueryQueue();
        }
        _handleErrorWhileConnecting(e) {
          if (!this._connectionError) {
            if (this._connectionError = true, clearTimeout(this.connectionTimeoutHandle), this._connectionCallback)
              return this._connectionCallback(e);
            this.emit("error", e);
          }
        }
        _handleErrorEvent(e) {
          if (this._connecting)
            return this._handleErrorWhileConnecting(e);
          this._queryable = false, this._errorAllQueries(e), this.emit("error", e);
        }
        _handleErrorMessage(e) {
          if (this._connecting)
            return this._handleErrorWhileConnecting(e);
          let t = this.activeQuery;
          if (!t) {
            this._handleErrorEvent(
              e
            );
            return;
          }
          this.activeQuery = null, t.handleError(e, this.connection);
        }
        _handleRowDescription(e) {
          this.activeQuery.handleRowDescription(e);
        }
        _handleDataRow(e) {
          this.activeQuery.handleDataRow(
            e
          );
        }
        _handlePortalSuspended(e) {
          this.activeQuery.handlePortalSuspended(this.connection);
        }
        _handleEmptyQuery(e) {
          this.activeQuery.handleEmptyQuery(this.connection);
        }
        _handleCommandComplete(e) {
          this.activeQuery.handleCommandComplete(e, this.connection);
        }
        _handleParseComplete(e) {
          this.activeQuery.name && (this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text);
        }
        _handleCopyInResponse(e) {
          this.activeQuery.handleCopyInResponse(
            this.connection
          );
        }
        _handleCopyData(e) {
          this.activeQuery.handleCopyData(e, this.connection);
        }
        _handleNotification(e) {
          this.emit("notification", e);
        }
        _handleNotice(e) {
          this.emit("notice", e);
        }
        getStartupConf() {
          var e = this.connectionParameters, t = { user: e.user, database: e.database }, n = e.application_name || e.fallback_application_name;
          return n && (t.application_name = n), e.replication && (t.replication = "" + e.replication), e.statement_timeout && (t.statement_timeout = String(parseInt(
            e.statement_timeout,
            10
          ))), e.lock_timeout && (t.lock_timeout = String(parseInt(e.lock_timeout, 10))), e.idle_in_transaction_session_timeout && (t.idle_in_transaction_session_timeout = String(parseInt(
            e.idle_in_transaction_session_timeout,
            10
          ))), e.options && (t.options = e.options), t;
        }
        cancel(e, t) {
          if (e.activeQuery === t) {
            var n = this.connection;
            this.host && this.host.indexOf("/") === 0 ? n.connect(this.host + "/.s.PGSQL." + this.port) : n.connect(this.port, this.host), n.on("connect", function() {
              n.cancel(
                e.processID,
                e.secretKey
              );
            });
          } else
            e.queryQueue.indexOf(t) !== -1 && e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
        }
        setTypeParser(e, t, n) {
          return this._types.setTypeParser(e, t, n);
        }
        getTypeParser(e, t) {
          return this._types.getTypeParser(e, t);
        }
        escapeIdentifier(e) {
          return '"' + e.replace(
            /"/g,
            '""'
          ) + '"';
        }
        escapeLiteral(e) {
          for (var t = false, n = "'", i = 0; i < e.length; i++) {
            var s = e[i];
            s === "'" ? n += s + s : s === "\\" ? (n += s + s, t = true) : n += s;
          }
          return n += "'", t === true && (n = " E" + n), n;
        }
        _pulseQueryQueue() {
          if (this.readyForQuery === true)
            if (this.activeQuery = this.queryQueue.shift(), this.activeQuery) {
              this.readyForQuery = false, this.hasExecuted = true;
              let e = this.activeQuery.submit(this.connection);
              e && y.nextTick(() => {
                this.activeQuery.handleError(e, this.connection), this.readyForQuery = true, this._pulseQueryQueue();
              });
            } else
              this.hasExecuted && (this.activeQuery = null, this.emit("drain"));
        }
        query(e, t, n) {
          var i, s, o, u, c;
          if (e == null)
            throw new TypeError("Client was passed a null or undefined query");
          return typeof e.submit == "function" ? (o = e.query_timeout || this.connectionParameters.query_timeout, s = i = e, typeof t == "function" && (i.callback = i.callback || t)) : (o = this.connectionParameters.query_timeout, i = new Ls(
            e,
            t,
            n
          ), i.callback || (s = new this._Promise((h, l) => {
            i.callback = (m, E) => m ? l(m) : h(E);
          }))), o && (c = i.callback, u = setTimeout(() => {
            var h = new Error("Query read timeout");
            y.nextTick(
              () => {
                i.handleError(h, this.connection);
              }
            ), c(h), i.callback = () => {
            };
            var l = this.queryQueue.indexOf(i);
            l > -1 && this.queryQueue.splice(l, 1), this._pulseQueryQueue();
          }, o), i.callback = (h, l) => {
            clearTimeout(u), c(h, l);
          }), this.binary && !i.binary && (i.binary = true), i._result && !i._result._types && (i._result._types = this._types), this._queryable ? this._ending ? (y.nextTick(() => {
            i.handleError(
              new Error("Client was closed and is not queryable"),
              this.connection
            );
          }), s) : (this.queryQueue.push(i), this._pulseQueryQueue(), s) : (y.nextTick(
            () => {
              i.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
            }
          ), s);
        }
        ref() {
          this.connection.ref();
        }
        unref() {
          this.connection.unref();
        }
        end(e) {
          if (this._ending = true, !this.connection._connecting)
            if (e)
              e();
            else
              return this._Promise.resolve();
          if (this.activeQuery || !this._queryable ? this.connection.stream.destroy() : this.connection.end(), e)
            this.connection.once("end", e);
          else
            return new this._Promise((t) => {
              this.connection.once("end", t);
            });
        }
      };
      a(fn, "Client");
      var vt = fn;
      vt.Query = Ls;
      Rs.exports = vt;
    });
    var ks = I((cf, Os) => {
      "use strict";
      p();
      var vc = we().EventEmitter, Ms = a(function() {
      }, "NOOP"), Ds = a(
        (r, e) => {
          let t = r.findIndex(e);
          return t === -1 ? void 0 : r.splice(t, 1)[0];
        },
        "removeWhere"
      ), yn = class yn {
        constructor(e, t, n) {
          this.client = e, this.idleListener = t, this.timeoutId = n;
        }
      };
      a(yn, "IdleItem");
      var pn = yn, mn = class mn {
        constructor(e) {
          this.callback = e;
        }
      };
      a(mn, "PendingItem");
      var Ne = mn;
      function _c() {
        throw new Error("Release called on client which has already been released to the pool.");
      }
      a(_c, "throwOnDoubleRelease");
      function _t(r, e) {
        if (e)
          return { callback: e, result: void 0 };
        let t, n, i = a(function(o, u) {
          o ? t(o) : n(u);
        }, "cb"), s = new r(function(o, u) {
          n = o, t = u;
        }).catch((o) => {
          throw Error.captureStackTrace(
            o
          ), o;
        });
        return { callback: i, result: s };
      }
      a(_t, "promisify");
      function Ac(r, e) {
        return a(
          function t(n) {
            n.client = e, e.removeListener("error", t), e.on("error", () => {
              r.log("additional client error after disconnection due to error", n);
            }), r._remove(e), r.emit("error", n, e);
          },
          "idleListener"
        );
      }
      a(Ac, "makeIdleListener");
      var gn = class gn extends vc {
        constructor(e, t) {
          super(), this.options = Object.assign({}, e), e != null && "password" in e && Object.defineProperty(
            this.options,
            "password",
            { configurable: true, enumerable: false, writable: true, value: e.password }
          ), e != null && e.ssl && e.ssl.key && Object.defineProperty(this.options.ssl, "key", { enumerable: false }), this.options.max = this.options.max || this.options.poolSize || 10, this.options.maxUses = this.options.maxUses || 1 / 0, this.options.allowExitOnIdle = this.options.allowExitOnIdle || false, this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0, this.log = this.options.log || function() {
          }, this.Client = this.options.Client || t || At().Client, this.Promise = this.options.Promise || b.Promise, typeof this.options.idleTimeoutMillis > "u" && (this.options.idleTimeoutMillis = 1e4), this._clients = [], this._idle = [], this._expired = /* @__PURE__ */ new WeakSet(), this._pendingQueue = [], this._endCallback = void 0, this.ending = false, this.ended = false;
        }
        _isFull() {
          return this._clients.length >= this.options.max;
        }
        _pulseQueue() {
          if (this.log("pulse queue"), this.ended) {
            this.log("pulse queue ended");
            return;
          }
          if (this.ending) {
            this.log(
              "pulse queue on ending"
            ), this._idle.length && this._idle.slice().map((t) => {
              this._remove(
                t.client
              );
            }), this._clients.length || (this.ended = true, this._endCallback());
            return;
          }
          if (!this._pendingQueue.length) {
            this.log("no queued requests");
            return;
          }
          if (!this._idle.length && this._isFull())
            return;
          let e = this._pendingQueue.shift();
          if (this._idle.length) {
            let t = this._idle.pop();
            clearTimeout(t.timeoutId);
            let n = t.client;
            n.ref && n.ref();
            let i = t.idleListener;
            return this._acquireClient(n, e, i, false);
          }
          if (!this._isFull())
            return this.newClient(e);
          throw new Error("unexpected condition");
        }
        _remove(e) {
          let t = Ds(this._idle, (n) => n.client === e);
          t !== void 0 && clearTimeout(t.timeoutId), this._clients = this._clients.filter((n) => n !== e), e.end(), this.emit("remove", e);
        }
        connect(e) {
          if (this.ending) {
            let i = new Error("Cannot use a pool after calling end on the pool");
            return e ? e(i) : this.Promise.reject(
              i
            );
          }
          let t = _t(this.Promise, e), n = t.result;
          if (this._isFull() || this._idle.length) {
            if (this._idle.length && y.nextTick(() => this._pulseQueue()), !this.options.connectionTimeoutMillis)
              return this._pendingQueue.push(new Ne(t.callback)), n;
            let i = a((u, c, h) => {
              clearTimeout(
                o
              ), t.callback(u, c, h);
            }, "queueCallback"), s = new Ne(i), o = setTimeout(() => {
              Ds(
                this._pendingQueue,
                (u) => u.callback === i
              ), s.timedOut = true, t.callback(new Error("timeout exceeded when trying to connect"));
            }, this.options.connectionTimeoutMillis);
            return this._pendingQueue.push(s), n;
          }
          return this.newClient(new Ne(t.callback)), n;
        }
        newClient(e) {
          let t = new this.Client(this.options);
          this._clients.push(t);
          let n = Ac(this, t);
          this.log("checking client timeout");
          let i, s = false;
          this.options.connectionTimeoutMillis && (i = setTimeout(() => {
            this.log("ending client due to timeout"), s = true, t.connection ? t.connection.stream.destroy() : t.end();
          }, this.options.connectionTimeoutMillis)), this.log("connecting new client"), t.connect((o) => {
            if (i && clearTimeout(i), t.on("error", n), o)
              this.log("client failed to connect", o), this._clients = this._clients.filter((u) => u !== t), s && (o.message = "Connection terminated due to connection timeout"), this._pulseQueue(), e.timedOut || e.callback(
                o,
                void 0,
                Ms
              );
            else {
              if (this.log("new client connected"), this.options.maxLifetimeSeconds !== 0) {
                let u = setTimeout(() => {
                  this.log("ending client due to expired lifetime"), this._expired.add(t), this._idle.findIndex((h) => h.client === t) !== -1 && this._acquireClient(
                    t,
                    new Ne((h, l, m) => m()),
                    n,
                    false
                  );
                }, this.options.maxLifetimeSeconds * 1e3);
                u.unref(), t.once(
                  "end",
                  () => clearTimeout(u)
                );
              }
              return this._acquireClient(t, e, n, true);
            }
          });
        }
        _acquireClient(e, t, n, i) {
          i && this.emit("connect", e), this.emit("acquire", e), e.release = this._releaseOnce(e, n), e.removeListener("error", n), t.timedOut ? i && this.options.verify ? this.options.verify(
            e,
            e.release
          ) : e.release() : i && this.options.verify ? this.options.verify(e, (s) => {
            if (s)
              return e.release(s), t.callback(s, void 0, Ms);
            t.callback(void 0, e, e.release);
          }) : t.callback(
            void 0,
            e,
            e.release
          );
        }
        _releaseOnce(e, t) {
          let n = false;
          return (i) => {
            n && _c(), n = true, this._release(
              e,
              t,
              i
            );
          };
        }
        _release(e, t, n) {
          if (e.on("error", t), e._poolUseCount = (e._poolUseCount || 0) + 1, this.emit("release", n, e), n || this.ending || !e._queryable || e._ending || e._poolUseCount >= this.options.maxUses) {
            e._poolUseCount >= this.options.maxUses && this.log("remove expended client"), this._remove(e), this._pulseQueue();
            return;
          }
          if (this._expired.has(e)) {
            this.log("remove expired client"), this._expired.delete(e), this._remove(e), this._pulseQueue();
            return;
          }
          let s;
          this.options.idleTimeoutMillis && (s = setTimeout(() => {
            this.log("remove idle client"), this._remove(e);
          }, this.options.idleTimeoutMillis), this.options.allowExitOnIdle && s.unref()), this.options.allowExitOnIdle && e.unref(), this._idle.push(new pn(e, t, s)), this._pulseQueue();
        }
        query(e, t, n) {
          if (typeof e == "function") {
            let s = _t(this.Promise, e);
            return S(function() {
              return s.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
            }), s.result;
          }
          typeof t == "function" && (n = t, t = void 0);
          let i = _t(this.Promise, n);
          return n = i.callback, this.connect((s, o) => {
            if (s)
              return n(s);
            let u = false, c = a((h) => {
              u || (u = true, o.release(h), n(h));
            }, "onError");
            o.once("error", c), this.log("dispatching query");
            try {
              o.query(e, t, (h, l) => {
                if (this.log("query dispatched"), o.removeListener("error", c), !u)
                  return u = true, o.release(h), h ? n(h) : n(
                    void 0,
                    l
                  );
              });
            } catch (h) {
              return o.release(h), n(h);
            }
          }), i.result;
        }
        end(e) {
          if (this.log("ending"), this.ending) {
            let n = new Error("Called end on pool more than once");
            return e ? e(n) : this.Promise.reject(n);
          }
          this.ending = true;
          let t = _t(this.Promise, e);
          return this._endCallback = t.callback, this._pulseQueue(), t.result;
        }
        get waitingCount() {
          return this._pendingQueue.length;
        }
        get idleCount() {
          return this._idle.length;
        }
        get expiredCount() {
          return this._clients.reduce((e, t) => e + (this._expired.has(t) ? 1 : 0), 0);
        }
        get totalCount() {
          return this._clients.length;
        }
      };
      a(gn, "Pool");
      var dn = gn;
      Os.exports = dn;
    });
    var Us = {};
    ee(Us, { default: () => Cc });
    var Cc;
    var qs = K(() => {
      p();
      Cc = {};
    });
    var Ns = I((pf, Ic) => {
      Ic.exports = { name: "pg", version: "8.8.0", description: "PostgreSQL client - pure javascript & libpq with the same API", keywords: [
        "database",
        "libpq",
        "pg",
        "postgre",
        "postgres",
        "postgresql",
        "rdbms"
      ], homepage: "https://github.com/brianc/node-postgres", repository: { type: "git", url: "git://github.com/brianc/node-postgres.git", directory: "packages/pg" }, author: "Brian Carlson <brian.m.carlson@gmail.com>", main: "./lib", dependencies: {
        "buffer-writer": "2.0.0",
        "packet-reader": "1.0.0",
        "pg-connection-string": "^2.5.0",
        "pg-pool": "^3.5.2",
        "pg-protocol": "^1.5.0",
        "pg-types": "^2.1.0",
        pgpass: "1.x"
      }, devDependencies: { async: "2.6.4", bluebird: "3.5.2", co: "4.6.0", "pg-copy-streams": "0.3.0" }, peerDependencies: { "pg-native": ">=3.0.1" }, peerDependenciesMeta: {
        "pg-native": { optional: true }
      }, scripts: { test: "make test-all" }, files: ["lib", "SPONSORS.md"], license: "MIT", engines: { node: ">= 8.0.0" }, gitHead: "c99fb2c127ddf8d712500db2c7b9a5491a178655" };
    });
    var js = I((df, Ws) => {
      "use strict";
      p();
      var Qs = we().EventEmitter, Tc = (Ge(), O(He)), wn = tt(), Qe = Ws.exports = function(r, e, t) {
        Qs.call(this), r = wn.normalizeQueryConfig(r, e, t), this.text = r.text, this.values = r.values, this.name = r.name, this.callback = r.callback, this.state = "new", this._arrayMode = r.rowMode === "array", this._emitRowEvents = false, this.on("newListener", function(n) {
          n === "row" && (this._emitRowEvents = true);
        }.bind(this));
      };
      Tc.inherits(
        Qe,
        Qs
      );
      var Pc = { sqlState: "code", statementPosition: "position", messagePrimary: "message", context: "where", schemaName: "schema", tableName: "table", columnName: "column", dataTypeName: "dataType", constraintName: "constraint", sourceFile: "file", sourceLine: "line", sourceFunction: "routine" };
      Qe.prototype.handleError = function(r) {
        var e = this.native.pq.resultErrorFields();
        if (e)
          for (var t in e) {
            var n = Pc[t] || t;
            r[n] = e[t];
          }
        this.callback ? this.callback(r) : this.emit("error", r), this.state = "error";
      };
      Qe.prototype.then = function(r, e) {
        return this._getPromise().then(r, e);
      };
      Qe.prototype.catch = function(r) {
        return this._getPromise().catch(r);
      };
      Qe.prototype._getPromise = function() {
        return this._promise ? this._promise : (this._promise = new Promise(function(r, e) {
          this._once("end", r), this._once(
            "error",
            e
          );
        }.bind(this)), this._promise);
      };
      Qe.prototype.submit = function(r) {
        this.state = "running";
        var e = this;
        this.native = r.native, r.native.arrayMode = this._arrayMode;
        var t = a(
          function(s, o, u) {
            if (r.native.arrayMode = false, S(function() {
              e.emit("_done");
            }), s)
              return e.handleError(s);
            e._emitRowEvents && (u.length > 1 ? o.forEach((c, h) => {
              c.forEach((l) => {
                e.emit(
                  "row",
                  l,
                  u[h]
                );
              });
            }) : o.forEach(function(c) {
              e.emit("row", c, u);
            })), e.state = "end", e.emit(
              "end",
              u
            ), e.callback && e.callback(null, u);
          },
          "after"
        );
        if (y.domain && (t = y.domain.bind(
          t
        )), this.name) {
          this.name.length > 63 && (console.error("Warning! Postgres only supports 63 characters for query names."), console.error(
            "You supplied %s (%s)",
            this.name,
            this.name.length
          ), console.error("This can cause conflicts and silent errors executing queries"));
          var n = (this.values || []).map(wn.prepareValue);
          if (r.namedQueries[this.name]) {
            if (this.text && r.namedQueries[this.name] !== this.text) {
              let s = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
              return t(s);
            }
            return r.native.execute(this.name, n, t);
          }
          return r.native.prepare(
            this.name,
            this.text,
            n.length,
            function(s) {
              return s ? t(s) : (r.namedQueries[e.name] = e.text, e.native.execute(e.name, n, t));
            }
          );
        } else if (this.values) {
          if (!Array.isArray(this.values)) {
            let s = new Error("Query values must be an array");
            return t(s);
          }
          var i = this.values.map(wn.prepareValue);
          r.native.query(this.text, i, t);
        } else
          r.native.query(this.text, t);
      };
    });
    var Ks = I((wf, $s) => {
      "use strict";
      p();
      var Bc = (qs(), O(Us)), Lc = lr(), gf = Ns(), Hs = we().EventEmitter, Rc = (Ge(), O(He)), Fc = gt(), Gs = js(), Z = $s.exports = function(r) {
        Hs.call(this), r = r || {}, this._Promise = r.Promise || b.Promise, this._types = new Lc(r.types), this.native = new Bc({ types: this._types }), this._queryQueue = [], this._ending = false, this._connecting = false, this._connected = false, this._queryable = true;
        var e = this.connectionParameters = new Fc(
          r
        );
        this.user = e.user, Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: e.password
        }), this.database = e.database, this.host = e.host, this.port = e.port, this.namedQueries = {};
      };
      Z.Query = Gs;
      Rc.inherits(Z, Hs);
      Z.prototype._errorAllQueries = function(r) {
        let e = a(
          (t) => {
            y.nextTick(() => {
              t.native = this.native, t.handleError(r);
            });
          },
          "enqueueError"
        );
        this._hasActiveQuery() && (e(this._activeQuery), this._activeQuery = null), this._queryQueue.forEach(e), this._queryQueue.length = 0;
      };
      Z.prototype._connect = function(r) {
        var e = this;
        if (this._connecting) {
          y.nextTick(() => r(new Error("Client has already been connected. You cannot reuse a client.")));
          return;
        }
        this._connecting = true, this.connectionParameters.getLibpqConnectionString(function(t, n) {
          if (t)
            return r(
              t
            );
          e.native.connect(n, function(i) {
            if (i)
              return e.native.end(), r(i);
            e._connected = true, e.native.on("error", function(s) {
              e._queryable = false, e._errorAllQueries(s), e.emit("error", s);
            }), e.native.on("notification", function(s) {
              e.emit("notification", { channel: s.relname, payload: s.extra });
            }), e.emit("connect"), e._pulseQueryQueue(true), r();
          });
        });
      };
      Z.prototype.connect = function(r) {
        if (r) {
          this._connect(r);
          return;
        }
        return new this._Promise(
          (e, t) => {
            this._connect((n) => {
              n ? t(n) : e();
            });
          }
        );
      };
      Z.prototype.query = function(r, e, t) {
        var n, i, s, o, u;
        if (r == null)
          throw new TypeError("Client was passed a null or undefined query");
        if (typeof r.submit == "function")
          s = r.query_timeout || this.connectionParameters.query_timeout, i = n = r, typeof e == "function" && (r.callback = e);
        else if (s = this.connectionParameters.query_timeout, n = new Gs(r, e, t), !n.callback) {
          let c, h;
          i = new this._Promise((l, m) => {
            c = l, h = m;
          }), n.callback = (l, m) => l ? h(l) : c(m);
        }
        return s && (u = n.callback, o = setTimeout(() => {
          var c = new Error("Query read timeout");
          y.nextTick(() => {
            n.handleError(c, this.connection);
          }), u(c), n.callback = () => {
          };
          var h = this._queryQueue.indexOf(n);
          h > -1 && this._queryQueue.splice(h, 1), this._pulseQueryQueue();
        }, s), n.callback = (c, h) => {
          clearTimeout(o), u(c, h);
        }), this._queryable ? this._ending ? (n.native = this.native, y.nextTick(() => {
          n.handleError(
            new Error("Client was closed and is not queryable")
          );
        }), i) : (this._queryQueue.push(
          n
        ), this._pulseQueryQueue(), i) : (n.native = this.native, y.nextTick(() => {
          n.handleError(
            new Error("Client has encountered a connection error and is not queryable")
          );
        }), i);
      };
      Z.prototype.end = function(r) {
        var e = this;
        this._ending = true, this._connected || this.once(
          "connect",
          this.end.bind(this, r)
        );
        var t;
        return r || (t = new this._Promise(function(n, i) {
          r = a((s) => s ? i(s) : n(), "cb");
        })), this.native.end(function() {
          e._errorAllQueries(new Error(
            "Connection terminated"
          )), y.nextTick(() => {
            e.emit("end"), r && r();
          });
        }), t;
      };
      Z.prototype._hasActiveQuery = function() {
        return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
      };
      Z.prototype._pulseQueryQueue = function(r) {
        if (this._connected && !this._hasActiveQuery()) {
          var e = this._queryQueue.shift();
          if (!e) {
            r || this.emit("drain");
            return;
          }
          this._activeQuery = e, e.submit(this);
          var t = this;
          e.once(
            "_done",
            function() {
              t._pulseQueryQueue();
            }
          );
        }
      };
      Z.prototype.cancel = function(r) {
        this._activeQuery === r ? this.native.cancel(function() {
        }) : this._queryQueue.indexOf(r) !== -1 && this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
      };
      Z.prototype.ref = function() {
      };
      Z.prototype.unref = function() {
      };
      Z.prototype.setTypeParser = function(r, e, t) {
        return this._types.setTypeParser(r, e, t);
      };
      Z.prototype.getTypeParser = function(r, e) {
        return this._types.getTypeParser(r, e);
      };
    });
    var bn = I((xf, Vs) => {
      "use strict";
      p();
      Vs.exports = Ks();
    });
    var At = I((vf, nt) => {
      "use strict";
      p();
      var Mc = Fs(), Dc = et(), Oc = hn(), kc = ks(), { DatabaseError: Uc } = an(), qc = a((r) => {
        var e;
        return e = class extends kc {
          constructor(n) {
            super(n, r);
          }
        }, a(e, "BoundPool"), e;
      }, "poolFactory"), Sn = a(function(r) {
        this.defaults = Dc, this.Client = r, this.Query = this.Client.Query, this.Pool = qc(this.Client), this._pools = [], this.Connection = Oc, this.types = Xe(), this.DatabaseError = Uc;
      }, "PG");
      typeof y.env.NODE_PG_FORCE_NATIVE < "u" ? nt.exports = new Sn(bn()) : (nt.exports = new Sn(Mc), Object.defineProperty(nt.exports, "native", { configurable: true, enumerable: false, get() {
        var r = null;
        try {
          r = new Sn(bn());
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND")
            throw e;
        }
        return Object.defineProperty(nt.exports, "native", { value: r }), r;
      } }));
    });
    var Wc = {};
    ee(Wc, {
      Client: () => Ct,
      ClientBase: () => J.ClientBase,
      Connection: () => J.Connection,
      DatabaseError: () => J.DatabaseError,
      NeonDbError: () => Ee,
      Pool: () => vn,
      Query: () => J.Query,
      defaults: () => J.defaults,
      neon: () => xn,
      neonConfig: () => Se,
      types: () => J.types
    });
    module.exports = O(Wc);
    p();
    var It = We(At());
    wt();
    p();
    pr();
    wt();
    var Zs = We(tt());
    var En = class En extends Error {
      constructor() {
        super(...arguments);
        T(this, "name", "NeonDbError");
        T(this, "code", null);
        T(this, "sourceError");
      }
    };
    a(En, "NeonDbError");
    var Ee = En;
    var zs = "transaction() expects an array of queries, or a function returning an array of queries";
    function xn(r, {
      arrayMode: e,
      fullResults: t,
      fetchOptions: n,
      isolationLevel: i,
      readOnly: s,
      deferrable: o,
      queryCallback: u,
      resultCallback: c
    } = {}) {
      if (!r)
        throw new Error(
          "No database connection string was provided to `neon()`. Perhaps an environment variable has not been set?"
        );
      let h;
      try {
        h = fr(r);
      } catch {
        throw new Error("Database connection string provided to `neon()` is not a valid URL. Connection string: " + String(
          r
        ));
      }
      let { protocol: l, username: m, password: E, hostname: _2, port: P, pathname: N } = h;
      if (l !== "postgres:" && l !== "postgresql:" || !m || !E || !_2 || !N)
        throw new Error("Database connection string format for `neon()` should be: postgresql://user:password@host.tld/dbname?option=value");
      function X(A, ...g) {
        let D, H;
        if (typeof A == "string")
          D = A, H = g[1], g = g[0] ?? [];
        else {
          D = "";
          for (let W = 0; W < A.length; W++)
            D += A[W], W < g.length && (D += "$" + (W + 1));
        }
        g = g.map((W) => (0, Zs.prepareValue)(W));
        let Q = { query: D, params: g };
        return u && u(Q), Nc(
          de,
          Q,
          H
        );
      }
      a(X, "resolve"), X.transaction = async (A, g) => {
        if (typeof A == "function" && (A = A(X)), !Array.isArray(A))
          throw new Error(zs);
        let D = A.map((H) => {
          if (H[Symbol.toStringTag] !== "NeonQueryPromise")
            throw new Error(zs);
          return H.parameterizedQuery;
        });
        return de(
          D,
          g
        );
      };
      async function de(A, g) {
        let D = n ?? {}, { fetchEndpoint: H, fetchConnectionCache: Q, fetchFunction: W } = Se, ce = typeof H == "function" ? H(_2, P) : H, ye = Array.isArray(A) ? { queries: A } : A, L = e ?? false, G = t ?? false, he = i, me = s, ve = o;
        g !== void 0 && (g.arrayMode !== void 0 && (L = g.arrayMode), g.fullResults !== void 0 && (G = g.fullResults), g.fetchOptions !== void 0 && (D = { ...D, ...g.fetchOptions }), g.isolationLevel !== void 0 && (he = g.isolationLevel), g.readOnly !== void 0 && (me = g.readOnly), g.deferrable !== void 0 && (ve = g.deferrable));
        let le = { "Neon-Connection-String": r, "Neon-Raw-Text-Output": "true", "Neon-Array-Mode": "true" };
        Q === true && (le["Neon-Pool-Opt-In"] = "true"), Array.isArray(A) && (he !== void 0 && (le["Neon-Batch-Isolation-Level"] = he), me !== void 0 && (le["Neon-Batch-Read-Only"] = String(me)), ve !== void 0 && (le["Neon-Batch-Deferrable"] = String(ve)));
        let se;
        try {
          se = await (W ?? fetch)(ce, { method: "POST", body: JSON.stringify(ye), headers: le, ...D });
        } catch (oe) {
          let $ = new Ee(`Error connecting to database: ${oe.message}`);
          throw $.sourceError = oe, $;
        }
        if (se.ok) {
          let oe = await se.json();
          if (Array.isArray(A)) {
            let $ = oe.results;
            if (!Array.isArray($))
              throw new Ee("Neon internal error: unexpected result format");
            return $.map((ie, Ce) => Ys(ie, {
              arrayMode: L,
              fullResults: G,
              parameterizedQuery: A[Ce],
              resultCallback: c
            }));
          } else
            return Ys(oe, {
              arrayMode: L,
              fullResults: G,
              parameterizedQuery: A,
              resultCallback: c
            });
        } else {
          let { status: oe } = se;
          if (oe === 400) {
            let { message: $, code: ie } = await se.json(), Ce = new Ee($);
            throw Ce.code = ie, Ce;
          } else {
            let $ = await se.text();
            throw new Ee(`Server error (HTTP status ${oe}): ${$}`);
          }
        }
      }
      return a(
        de,
        "execute"
      ), X;
    }
    a(xn, "neon");
    function Nc(r, e, t) {
      return { [Symbol.toStringTag]: "NeonQueryPromise", parameterizedQuery: e, opts: t, then: (n, i) => r(e, t).then(n, i), catch: (n) => r(
        e,
        t
      ).catch(n), finally: (n) => r(e, t).finally(n) };
    }
    a(Nc, "createNeonQueryPromise");
    function Ys(r, {
      arrayMode: e,
      fullResults: t,
      parameterizedQuery: n,
      resultCallback: i
    }) {
      let s = r.fields.map((c) => c.name), o = r.fields.map((c) => J.types.getTypeParser(c.dataTypeID)), u = e === true ? r.rows.map((c) => c.map((h, l) => h === null ? null : o[l](h))) : r.rows.map((c) => Object.fromEntries(
        c.map((h, l) => [s[l], h === null ? null : o[l](h)])
      ));
      return i && i(n, r, u, { arrayMode: e, fullResults: t }), t ? (r.viaNeonFetch = true, r.rowAsArray = e, r.rows = u, r) : u;
    }
    a(Ys, "processQueryResult");
    var Js = We(gt());
    var J = We(At());
    var _n = class _n extends It.Client {
      constructor(t) {
        super(t);
        this.config = t;
      }
      get neonConfig() {
        return this.connection.stream;
      }
      connect(t) {
        let { neonConfig: n } = this;
        n.forceDisablePgSSL && (this.ssl = this.connection.ssl = false), this.ssl && n.useSecureWebSocket && console.warn("SSL is enabled for both Postgres (e.g. ?sslmode=require in the connection string + forceDisablePgSSL = false) and the WebSocket tunnel (useSecureWebSocket = true). Double encryption will increase latency and CPU usage. It may be appropriate to disable SSL in the Postgres connection parameters or set forceDisablePgSSL = true.");
        let i = this.config?.host !== void 0 || this.config?.connectionString !== void 0 || y.env.PGHOST !== void 0, s = y.env.USER ?? y.env.USERNAME;
        if (!i && this.host === "localhost" && this.user === s && this.database === s && this.password === null)
          throw new Error(`No database host or connection string was set, and key parameters have default values (host: localhost, user: ${s}, db: ${s}, password: null). Is an environment variable missing? Alternatively, if you intended to connect with these parameters, please set the host to 'localhost' explicitly.`);
        let o = super.connect(t), u = n.pipelineTLS && this.ssl, c = n.pipelineConnect === "password";
        if (!u && !n.pipelineConnect)
          return o;
        let h = this.connection;
        if (u && h.on("connect", () => h.stream.emit("data", "S")), c) {
          h.removeAllListeners(
            "authenticationCleartextPassword"
          ), h.removeAllListeners("readyForQuery"), h.once(
            "readyForQuery",
            () => h.on("readyForQuery", this._handleReadyForQuery.bind(this))
          );
          let l = this.ssl ? "sslconnect" : "connect";
          h.on(l, () => {
            this._handleAuthCleartextPassword(), this._handleReadyForQuery();
          });
        }
        return o;
      }
      async _handleAuthSASLContinue(t) {
        let n = this.saslSession, i = this.password, s = t.data;
        if (n.message !== "SASLInitialResponse" || typeof i != "string" || typeof s != "string")
          throw new Error("SASL: protocol error");
        let o = Object.fromEntries(s.split(",").map(($) => {
          if (!/^.=/.test($))
            throw new Error("SASL: Invalid attribute pair entry");
          let ie = $[0], Ce = $.substring(2);
          return [ie, Ce];
        })), u = o.r, c = o.s, h = o.i;
        if (!u || !/^[!-+--~]+$/.test(u))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing/unprintable");
        if (!c || !/^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(c))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing/not base64");
        if (!h || !/^[1-9][0-9]*$/.test(h))
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: missing/invalid iteration count");
        if (!u.startsWith(n.clientNonce))
          throw new Error(
            "SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce"
          );
        if (u.length === n.clientNonce.length)
          throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
        let l = parseInt(h, 10), m = d.from(c, "base64"), E = new TextEncoder(), _2 = E.encode(i), P = await w.subtle.importKey("raw", _2, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), N = new Uint8Array(await w.subtle.sign("HMAC", P, d.concat([m, d.from(
          [0, 0, 0, 1]
        )]))), X = N;
        for (var de = 0; de < l - 1; de++)
          N = new Uint8Array(await w.subtle.sign(
            "HMAC",
            P,
            N
          )), X = d.from(X.map(($, ie) => X[ie] ^ N[ie]));
        let A = X, g = await w.subtle.importKey(
          "raw",
          A,
          { name: "HMAC", hash: { name: "SHA-256" } },
          false,
          ["sign"]
        ), D = new Uint8Array(await w.subtle.sign("HMAC", g, E.encode("Client Key"))), H = await w.subtle.digest(
          "SHA-256",
          D
        ), Q = "n=*,r=" + n.clientNonce, W = "r=" + u + ",s=" + c + ",i=" + l, ce = "c=biws,r=" + u, ye = Q + "," + W + "," + ce, L = await w.subtle.importKey(
          "raw",
          H,
          { name: "HMAC", hash: { name: "SHA-256" } },
          false,
          ["sign"]
        );
        var G = new Uint8Array(await w.subtle.sign("HMAC", L, E.encode(ye))), he = d.from(D.map(($, ie) => D[ie] ^ G[ie])), me = he.toString("base64");
        let ve = await w.subtle.importKey("raw", A, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]), le = await w.subtle.sign("HMAC", ve, E.encode("Server Key")), se = await w.subtle.importKey("raw", le, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
        var oe = d.from(await w.subtle.sign("HMAC", se, E.encode(ye)));
        n.message = "SASLResponse", n.serverSignature = oe.toString("base64"), n.response = ce + ",p=" + me, this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
      }
    };
    a(_n, "NeonClient");
    var Ct = _n;
    function Qc(r, e) {
      if (e)
        return {
          callback: e,
          result: void 0
        };
      let t, n, i = a(function(o, u) {
        o ? t(o) : n(u);
      }, "cb"), s = new r(function(o, u) {
        n = o, t = u;
      });
      return { callback: i, result: s };
    }
    a(Qc, "promisify");
    var An = class An extends It.Pool {
      constructor() {
        super(...arguments);
        T(this, "Client", Ct);
        T(this, "hasFetchUnsupportedListeners", false);
      }
      on(t, n) {
        return t !== "error" && (this.hasFetchUnsupportedListeners = true), super.on(t, n);
      }
      query(t, n, i) {
        if (!Se.poolQueryViaFetch || this.hasFetchUnsupportedListeners || typeof t == "function")
          return super.query(t, n, i);
        typeof n == "function" && (i = n, n = void 0);
        let s = Qc(
          this.Promise,
          i
        );
        i = s.callback;
        try {
          let o = new Js.default(this.options), u = encodeURIComponent, c = encodeURI, h = `postgresql://${u(o.user)}:${u(o.password)}@${u(o.host)}/${c(o.database)}`, l = typeof t == "string" ? t : t.text, m = n ?? t.values ?? [];
          xn(h, { fullResults: true, arrayMode: t.rowMode === "array" })(l, m).then((_2) => i(void 0, _2)).catch((_2) => i(_2));
        } catch (o) {
          i(o);
        }
        return s.result;
      }
    };
    a(An, "NeonPool");
    var vn = An;
  }
});

// node_modules/@neondatabase/serverless/index.mjs
var import_index = __toESM(require_serverless(), 1);
var serverless_default = import_index.default;
var Client = import_index.default.Client;
var ClientBase = import_index.default.ClientBase;
var Connection = import_index.default.Connection;
var DatabaseError = import_index.default.DatabaseError;
var NeonDbError = import_index.default.NeonDbError;
var Pool = import_index.default.Pool;
var Query = import_index.default.Query;
var defaults = import_index.default.defaults;
var neon = import_index.default.neon;
var neonConfig = import_index.default.neonConfig;
var types = import_index.default.types;

// src/describe.mjs
var NULL = null;
var FUNC_MAX_ARGS = 100;
var ESCAPE_STRING_SYNTAX = "E";
var cancel_pressed = false;
var PSQL_CMD_UNKNOWN = 0;
var PSQL_CMD_SKIP_LINE = 2;
var PSQL_CMD_ERROR = 5;
var OT_NORMAL = 0;
var PG_UTF8 = 6;
var CONNECTION_OK = 0;
var CONNECTION_BAD = 1;
var COERCION_METHOD_BINARY = "b";
var COERCION_METHOD_INOUT = "i";
var COERCION_CODE_ASSIGNMENT = "a";
var COERCION_CODE_EXPLICIT = "e";
var DEFACLOBJ_RELATION = "r";
var DEFACLOBJ_SEQUENCE = "S";
var DEFACLOBJ_FUNCTION = "f";
var DEFACLOBJ_TYPE = "T";
var DEFACLOBJ_NAMESPACE = "n";
var ATTRIBUTE_IDENTITY_ALWAYS = "a";
var ATTRIBUTE_IDENTITY_BY_DEFAULT = "d";
var ATTRIBUTE_GENERATED_STORED = "s";
var RELKIND_RELATION = "r";
var RELKIND_INDEX = "i";
var RELKIND_SEQUENCE = "S";
var RELKIND_TOASTVALUE = "t";
var RELKIND_VIEW = "v";
var RELKIND_MATVIEW = "m";
var RELKIND_COMPOSITE_TYPE = "c";
var RELKIND_FOREIGN_TABLE = "f";
var RELKIND_PARTITIONED_TABLE = "p";
var RELKIND_PARTITIONED_INDEX = "I";
var INT8OID = 20;
var INT2OID = 21;
var INT4OID = 23;
var OIDOID = 26;
var XIDOID = 28;
var CIDOID = 29;
var XID8OID = 5069;
var FLOAT4OID = 700;
var FLOAT8OID = 701;
var MONEYOID = 790;
var NUMERICOID = 1700;
var PSQLexec;
var pset;
var output;
function describeDataToHtml(desc) {
  return desc.map((item) => typeof item === "string" ? `<p>${htmlEscape(item)}</p>` : tableToHtml(item)).join("\n\n");
}
function trimTrailingNull(str) {
  const nullIndex = str.indexOf("\0");
  if (nullIndex !== -1)
    return str.slice(0, nullIndex);
  return str;
}
function trimTrailingNulls(obj) {
  if (Array.isArray(obj))
    for (let i = 0, len = obj.length; i < len; i++)
      obj[i] = trimTrailingNulls(obj[i]);
  else if (typeof obj === "object" && obj !== null)
    for (let i in obj)
      obj[i] = trimTrailingNulls(obj[i]);
  else if (typeof obj === "string")
    return trimTrailingNull(obj);
  return obj;
}
function byN(arr, n) {
  let i = 0;
  const len = arr.length;
  const result = [];
  while (i < len)
    result.push(arr.slice(i, i += n));
  return result;
}
function htmlEscape(str) {
  return str.replace(/[<>&'"]/g, (m) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[m]);
}
function tableToHtml(td) {
  let result = "<table><tr>";
  for (let h of td.headers)
    result += `<th valign="top" style="text-align: center;">${htmlEscape(h)}</th>`;
  result += "</tr>";
  for (let row of byN(td.cells, td.ncolumns)) {
    result += `<tr>` + row.map((cell, i) => `<td valign="top" style="text-align: ${td.aligns[i] === "c" ? "center" : td.aligns[i] === "r" ? "right" : "left"}">${htmlEscape(cell).replace(/\n/g, "<br>")}</td>`).join("\n") + "</tr>";
  }
  result += "</table>";
  return result;
}
async function describe(pg, cmd, dbName, runQuery, echoHidden = false, sversion = 14e4, std_strings = 1) {
  const raw = (x) => x;
  const originalParsers = {};
  for (let b in pg.types.builtins) {
    originalParsers[b] = pg.types.getTypeParser(pg.types.builtins[b]);
    pg.types.setTypeParser(pg.types.builtins[b], raw);
  }
  output = [];
  pset = {
    sversion,
    db: {
      // PGconn struct
      dbName,
      sversion,
      std_strings,
      status: CONNECTION_OK,
      encoding: PG_UTF8
    },
    popt: {
      // print options
      topt: {
        default_footer: true
      },
      nullPrint: ""
    }
  };
  PSQLexec = (sql) => {
    const trimmed = trimTrailingNull(sql);
    if (echoHidden)
      output.push(`/******** QUERY *********/
${trimmed}
/************************/`);
    return runQuery(trimmed);
  };
  const match = cmd.match(/^\\(d\S*)(.*)/);
  if (match) {
    let [, dCmd, remaining] = match;
    dCmd += "\0";
    remaining += "\0";
    const scan_state = [remaining, 0];
    const result = await exec_command_d(scan_state, true, dCmd);
    if (result === PSQL_CMD_UNKNOWN)
      output.push(`invalid command \\${dCmd}`);
    let arg, warnings = [];
    while (arg = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true))
      warnings.push(trimTrailingNull(sprintf('\\%s: extra argument "%s" ignored', dCmd, arg)));
    if (warnings.length > 0)
      output.push(warnings.join("\n"));
  } else {
    output.push(`unsupported describe command: ${cmd}`);
  }
  for (let b in pg.types.builtins)
    pg.types.setTypeParser(pg.types.builtins[b], originalParsers[b]);
  return trimTrailingNulls(output);
}
function gettext_noop(x) {
  return x;
}
function strchr(str, chr) {
  return strstr(str, chr);
}
function strstr(str1, str2) {
  const index = str1.indexOf(trimTrailingNull(str2));
  return index === -1 ? NULL : index;
}
function strlen(str) {
  const nullIndex = str.indexOf("\0");
  return nullIndex === -1 ? str.length : nullIndex;
}
function strcmp(s1, s2) {
  return strncmp(s1, s2, Infinity);
}
function strncmp(s1, s2, n) {
  if (typeof s1 !== "string" || typeof s2 !== "string")
    throw new Error("Not a string");
  s1 = trimTrailingNull(s1);
  if (s1.length > n)
    s1 = s1.slice(0, n);
  s2 = trimTrailingNull(s2);
  if (s2.length > n)
    s2 = s2.slice(0, n);
  return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
}
function strspn(str, chrs) {
  const len = strlen(str);
  for (let i = 0; i < len; i++) {
    if (chrs.indexOf(str[i]) === -1)
      return i;
  }
  return len;
}
function atoi(str) {
  return parseInt(str, 10);
}
function atooid(str) {
  return parseInt(str, 10);
}
function pg_strdup(str) {
  return str;
}
function isWhitespace(chr) {
  return chr === " " || chr === "	" || chr === "\n" || chr === "\r";
}
function isQuote(chr) {
  return chr === '"' || chr === "'";
}
function PQdb(conn) {
  if (!conn)
    return NULL;
  return conn.dbName;
}
function PQserverVersion(conn) {
  if (!conn)
    return 0;
  if (conn.status === CONNECTION_BAD)
    return 0;
  return conn.sversion;
}
function PQclientEncoding(conn) {
  if (!conn || conn.status != CONNECTION_OK)
    return -1;
  return conn.client_encoding;
}
function PQntuples(res) {
  return res.rowCount;
}
function PQnfields(res) {
  return res.fields.length;
}
function PQfname(res, field_num) {
  return res.fields[field_num].name;
}
function PQftype(res, field_num) {
  return res.fields[field_num].dataTypeID;
}
function PQgetisnull(res, tup_num, field_num) {
  return res.rows[tup_num][field_num] === null ? 1 : 0;
}
function PQgetvalue(res, tup_num, field_num) {
  const val = res.rows[tup_num][field_num];
  return String(val === null ? "" : val);
}
function PQfnumber(res, field_name) {
  let in_quotes;
  let iptr;
  let optr;
  let i;
  let len;
  if (!res)
    return -1;
  if (field_name == NULL || field_name[0] == "\0")
    return -1;
  in_quotes = false;
  optr = "";
  for (iptr = 0, len = strlen(field_name); iptr < len; iptr++) {
    let c = field_name[iptr];
    if (in_quotes) {
      if (c == '"') {
        if (field_name[iptr + 1] == '"') {
          optr += '"';
          iptr++;
        } else
          in_quotes = false;
      } else
        optr += c;
    } else if (c == '"')
      in_quotes = true;
    else {
      c = pg_tolower(c);
      optr += c;
    }
  }
  optr += "\0";
  for (i = 0, len = PQnfields(res); i < len; i++) {
    if (strcmp(optr, PQfname(res, i)) == 0) {
      return i;
    }
  }
  return -1;
}
function pg_wcswidth(pwcs, len, encoding) {
  return len;
}
function sizeof(x) {
  return 0;
}
function _(str) {
  return str;
}
function formatPGVersionNumber(version_number, include_minor, buf, buflen) {
  if (version_number >= 1e5) {
    if (include_minor)
      buf = sprintf(
        "%d.%d",
        Math.floor(version_number / 1e4),
        version_number % 1e4
      );
    else
      buf = sprintf("%d", version_number / 1e4);
  } else {
    if (include_minor)
      buf = sprintf(
        "%d.%d.%d",
        Math.floor(version_number / 1e4),
        Math.floor(version_number / 100) % 100,
        version_number % 100
      );
    else
      buf = sprintf(
        "%d.%d",
        Math.floor(version_number / 1e4),
        Math.floor(version_number / 100) % 100
      );
  }
  return buf;
}
function psql_scan_slash_option(scan_state, type, quote, semicolon) {
  if (type !== OT_NORMAL)
    throw new Error(`scan type ${type} not yet implemented`);
  if (quote !== NULL)
    throw new Error("cannot return quote type");
  const quoteStack = [];
  const resultRe = semicolon ? /^(.*);*$/ : /^(.*)$/;
  let chr;
  for (; ; ) {
    chr = scan_state[0][scan_state[1]];
    if (chr === "\0")
      return NULL;
    if (!isWhitespace(chr))
      break;
    scan_state[1]++;
  }
  let result = "";
  while (chr = scan_state[0][scan_state[1]++]) {
    if (chr === "\0") {
      if (quoteStack.length > 0)
        return NULL;
      return result.match(resultRe)[1] + "\0";
    }
    if (isQuote(chr)) {
      if (chr === quoteStack[quoteStack.length - 1])
        quoteStack.pop();
      else
        quoteStack.push(chr);
      if (chr === '"')
        result += chr;
    } else {
      if (quoteStack.length === 0 && isWhitespace(chr)) {
        return result.match(resultRe)[1] + "\0";
      }
      result += chr;
    }
  }
  return NULL;
}
function initPQExpBuffer(buf) {
  buf.data = "\0";
  buf.len = 0;
}
function resetPQExpBuffer(buf) {
  initPQExpBuffer(buf);
}
function appendPQExpBufferStr(buf, str) {
  buf.data = trimTrailingNull(buf.data) + trimTrailingNull(str) + "\0";
  buf.len = buf.data.length - 1;
}
function sprintf(template, ...values) {
  let result = "";
  let valuesIndex = 0;
  let chrIndex = 0;
  let nextChrIndex;
  while ((nextChrIndex = template.indexOf("%", chrIndex)) !== -1) {
    let padTo = 0;
    result += template.slice(chrIndex, nextChrIndex);
    chrIndex = nextChrIndex + 1;
    let pcChr = template[chrIndex++];
    if (pcChr === "%")
      result += "%";
    if (pcChr === "*") {
      padTo = parseInt(values[valuesIndex++], 10);
      pcChr = template[chrIndex++];
    }
    if (pcChr === "s" || pcChr === "c" || pcChr === "d" || pcChr === "u") {
      const ins = trimTrailingNull(String(values[valuesIndex++]));
      const padBy = padTo - ins.length;
      if (padBy > 0)
        result += " ".repeat(padBy);
      result += ins;
    }
  }
  result += template.slice(chrIndex);
  result = trimTrailingNull(result) + "\0";
  return result;
}
function printfPQExpBuffer(buf, template, ...values) {
  initPQExpBuffer(buf);
  appendPQExpBuffer(buf, template, ...values);
}
function appendPQExpBuffer(buf, template, ...values) {
  const str = sprintf(template, ...values);
  appendPQExpBufferStr(buf, str);
}
function pg_log_error(template, ...args) {
  output.push(sprintf(template, ...args));
}
function validateSQLNamePattern(buf, pattern, have_where, force_escape, schemavar, namevar, altnamevar, visibilityrule, added_clause, maxparts) {
  let dbbuf = {
    /* struct */
  };
  let dotcnt = {};
  let added;
  initPQExpBuffer(dbbuf);
  added = processSQLNamePattern(
    pset.db,
    buf,
    pattern,
    have_where,
    force_escape,
    schemavar,
    namevar,
    altnamevar,
    visibilityrule,
    dbbuf,
    dotcnt
  );
  dotcnt = dotcnt.value;
  if (added_clause)
    added_clause.value = added;
  if (dotcnt >= maxparts) {
    pg_log_error(
      "improper qualified name (too many dotted names): %s",
      pattern
    );
    return false;
  }
  if (maxparts > 1 && dotcnt == maxparts - 1) {
    if (PQdb(pset.db) == NULL) {
      pg_log_error("You are currently not connected to a database.");
      return false;
    }
    if (strcmp(PQdb(pset.db), dbbuf.data) != 0) {
      pg_log_error(
        "cross-database references are not implemented: %s",
        pattern
      );
      return false;
    }
  }
  return true;
}
function processSQLNamePattern(conn, buf, pattern, have_where, force_escape, schemavar, namevar, altnamevar, visibilityrule, dbnamebuf, dotcnt) {
  let schemabuf = {
    /* struct */
  };
  let namebuf = {
    /* struct */
  };
  let added_clause = false;
  if (!dotcnt)
    dotcnt = {};
  dotcnt.value = 0;
  if (pattern == NULL) {
    if (visibilityrule) {
      appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
      have_where = true;
      added_clause = true;
      appendPQExpBuffer(buf, "%s\n", visibilityrule);
    }
    return added_clause;
  }
  initPQExpBuffer(schemabuf);
  initPQExpBuffer(namebuf);
  patternToSQLRegex(
    PQclientEncoding(conn),
    schemavar ? dbnamebuf : NULL,
    schemavar ? schemabuf : NULL,
    namebuf,
    pattern,
    force_escape,
    true,
    dotcnt
  );
  if (namevar && namebuf.len > 2) {
    if (strcmp(namebuf.data, "^(.*)$") != 0) {
      appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
      have_where = true;
      added_clause = true;
      if (altnamevar) {
        appendPQExpBuffer(
          buf,
          "(%s OPERATOR(pg_catalog.~) ",
          namevar
        );
        appendStringLiteralConn(buf, namebuf.data, conn);
        if (PQserverVersion(conn) >= 12e4)
          appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
        appendPQExpBuffer(
          buf,
          "\n        OR %s OPERATOR(pg_catalog.~) ",
          altnamevar
        );
        appendStringLiteralConn(buf, namebuf.data, conn);
        if (PQserverVersion(conn) >= 12e4)
          appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
        appendPQExpBufferStr(buf, ")\n");
      } else {
        appendPQExpBuffer(buf, "%s OPERATOR(pg_catalog.~) ", namevar);
        appendStringLiteralConn(buf, namebuf.data, conn);
        if (PQserverVersion(conn) >= 12e4)
          appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
        appendPQExpBufferChar(buf, "\n");
      }
    }
  }
  if (schemavar && schemabuf.len > 2) {
    if (strcmp(schemabuf.data, "^(.*)$") != 0 && schemavar) {
      appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
      have_where = true;
      added_clause = true;
      appendPQExpBuffer(buf, "%s OPERATOR(pg_catalog.~) ", schemavar);
      appendStringLiteralConn(buf, schemabuf.data, conn);
      if (PQserverVersion(conn) >= 12e4)
        appendPQExpBufferStr(buf, " COLLATE pg_catalog.default");
      appendPQExpBufferChar(buf, "\n");
    }
  } else {
    if (visibilityrule) {
      appendPQExpBufferStr(buf, have_where ? "  AND " : "WHERE ");
      have_where = true;
      added_clause = true;
      appendPQExpBuffer(buf, "%s\n", visibilityrule);
    }
  }
  return added_clause;
}
function appendPQExpBufferChar(str, ch) {
  str.data = trimTrailingNull(str.data) + ch + "\0";
  str.len++;
}
function appendStringLiteral(buf, str, encoding, std_strings) {
  const escaped = str.replace(std_strings ? /[']/g : /['\\]/g, "\\$&");
  buf.data = trimTrailingNull(buf.data) + "'" + trimTrailingNull(escaped) + "'\0";
  buf.len = buf.data.length - 1;
}
function appendStringLiteralConn(buf, str, conn) {
  if (strchr(str, "\\") != NULL && PQserverVersion(conn) >= 80100) {
    if (buf.len > 0 && buf.data[buf.len - 1] != " ")
      appendPQExpBufferChar(buf, " ");
    appendPQExpBufferChar(buf, ESCAPE_STRING_SYNTAX);
    appendStringLiteral(buf, str, PQclientEncoding(conn), false);
    return;
  }
  appendStringLiteral(buf, str, conn.encoding, conn.std_strings);
}
function Assert(cond) {
  if (!cond)
    throw new Error(`Assertion failed (value: ${cond})`);
}
function isupper(chr) {
  const ch = chr.charCodeAt(0);
  return ch >= 65 && ch <= 90;
}
function lengthof(x) {
  return x.length;
}
function pg_tolower(ch) {
  return ch.toLowerCase();
}
function pg_strcasecmp(s1, s2) {
  return strcmp(s1.toLowerCase(), s2.toLowerCase());
}
function patternToSQLRegex(encoding, dbnamebuf, schemabuf, namebuf, pattern, force_escape, want_literal_dbname, dotcnt) {
  let buf = [{}, {}, {}];
  let bufIndex = 0;
  let left_literal = {};
  let curbuf = {};
  let maxbuf = {};
  let inquotes;
  let left;
  let cp;
  Assert(pattern);
  Assert(namebuf);
  Assert(!dbnamebuf || schemabuf);
  Assert(dotcnt);
  dotcnt.value = 0;
  inquotes = false;
  cp = pattern;
  if (dbnamebuf)
    maxbuf = 2;
  else if (schemabuf)
    maxbuf = 1;
  else
    maxbuf = 0;
  curbuf = buf[bufIndex];
  if (want_literal_dbname) {
    left = true;
    initPQExpBuffer(left_literal);
  } else
    left = false;
  initPQExpBuffer(curbuf);
  appendPQExpBufferStr(curbuf, "^(");
  let cpIndex = 0;
  let ch;
  while ((ch = cp[cpIndex]) !== "\0") {
    if (ch == '"') {
      if (inquotes && cp[cpIndex + 1] == '"') {
        appendPQExpBufferChar(curbuf, '"');
        if (left)
          appendPQExpBufferChar(left_literal, '"');
        cpIndex++;
      } else
        inquotes = !inquotes;
      cpIndex++;
    } else if (!inquotes && isupper(ch)) {
      appendPQExpBufferChar(
        curbuf,
        pg_tolower(ch)
      );
      if (left)
        appendPQExpBufferChar(
          left_literal,
          pg_tolower(ch)
        );
      cpIndex++;
    } else if (!inquotes && ch == "*") {
      appendPQExpBufferStr(curbuf, ".*");
      if (left)
        appendPQExpBufferChar(left_literal, "*");
      cpIndex++;
    } else if (!inquotes && ch == "?") {
      appendPQExpBufferChar(curbuf, ".");
      if (left)
        appendPQExpBufferChar(left_literal, "?");
      cpIndex++;
    } else if (!inquotes && ch == ".") {
      left = false;
      dotcnt.value++;
      if (bufIndex < maxbuf) {
        appendPQExpBufferStr(curbuf, ")$");
        curbuf = buf[++bufIndex];
        initPQExpBuffer(curbuf);
        appendPQExpBufferStr(curbuf, "^(");
        cpIndex++;
      } else {
        appendPQExpBufferChar(curbuf, ch);
        cpIndex++;
      }
    } else if (ch == "$") {
      appendPQExpBufferStr(curbuf, "\\$");
      if (left)
        appendPQExpBufferChar(left_literal, "$");
      cpIndex++;
    } else {
      if ((inquotes || force_escape) && strchr("|*+?()[]{}.^$\\", ch) != NULL)
        appendPQExpBufferChar(curbuf, "\\");
      else if (ch == "[" && cp[cpIndex + 1] == "]")
        appendPQExpBufferChar(curbuf, "\\");
      if (left)
        appendPQExpBufferChar(left_literal, ch);
      appendPQExpBufferChar(curbuf, ch);
      cpIndex++;
    }
  }
  appendPQExpBufferStr(curbuf, ")$");
  if (namebuf) {
    appendPQExpBufferStr(namebuf, curbuf.data);
    curbuf = buf[--bufIndex];
  }
  if (schemabuf && bufIndex >= 0) {
    appendPQExpBufferStr(schemabuf, curbuf.data);
    curbuf = buf[--bufIndex];
  }
  if (dbnamebuf && bufIndex >= 0) {
    if (want_literal_dbname)
      appendPQExpBufferStr(dbnamebuf, left_literal.data);
    else
      appendPQExpBufferStr(dbnamebuf, curbuf.data);
  }
}
function column_type_alignment(ftype) {
  let align;
  switch (ftype) {
    case INT2OID:
    case INT4OID:
    case INT8OID:
    case FLOAT4OID:
    case FLOAT8OID:
    case NUMERICOID:
    case OIDOID:
    case XIDOID:
    case XID8OID:
    case CIDOID:
    case MONEYOID:
      align = "r";
      break;
    default:
      align = "l";
      break;
  }
  return align;
}
function printQuery(result, opt, fout, is_pager, flog) {
  let cont = {};
  let i, r, c;
  printTableInit(
    cont,
    opt.topt,
    opt.title,
    PQnfields(result),
    PQntuples(result)
  );
  Assert(opt.translate_columns == NULL || opt.translate_columns == null || opt.n_translate_columns >= cont.ncolumns);
  for (i = 0; i < cont.ncolumns; i++) {
    printTableAddHeader(
      cont,
      PQfname(result, i),
      opt.translate_header,
      column_type_alignment(PQftype(result, i))
    );
  }
  for (r = 0; r < cont.nrows; r++) {
    for (c = 0; c < cont.ncolumns; c++) {
      let cell;
      let mustfree = false;
      let translate;
      if (PQgetisnull(result, r, c))
        cell = opt.nullPrint ? opt.nullPrint : "";
      else {
        cell = PQgetvalue(result, r, c);
        if (cont.aligns[c] == "r" && opt.topt.numericLocale) {
          cell = format_numeric_locale(cell);
          mustfree = true;
        }
      }
      translate = opt.translate_columns && opt.translate_columns[c];
      printTableAddCell(cont, cell, translate, mustfree);
    }
  }
  if (opt.footers) {
    let footer;
    let footerIndex = 0;
    for (footer = opt.footers[footerIndex]; footer; footerIndex++)
      printTableAddFooter(cont, footer);
  }
  printTable(cont, fout, is_pager, flog);
}
function printTableInit(content, opt, title, ncolumns, nrows) {
  content.opt = opt;
  content.title = title;
  content.ncolumns = ncolumns;
  content.nrows = nrows;
  content.headers = [];
  content.cells = [];
  content.footers = NULL;
  content.aligns = [];
}
function printTableAddHeader(content, header, translate, align) {
  if (translate)
    header = _(header);
  content.headers.push(header);
  content.header = header;
  content.aligns.push(align);
  content.align = align;
}
function printTableAddCell(content, cell, translate, mustfree) {
  if (translate)
    cell = _(cell);
  content.cells.push(cell);
  content.cell = cell;
}
function printTableAddFooter(content, footer) {
  if (content.footers == NULL)
    content.footers = [];
  content.footers.push(footer);
  content.footer = footer;
}
function printTableSetFooter(content, footer) {
  if (content.footers)
    content.footers.pop();
  printTableAddFooter(content, footer);
}
function printTable(cont, fout, is_pager, flog) {
  output.push({ ...cont });
}
async function exec_command_d(scan_state, active_branch, cmd) {
  let status = PSQL_CMD_SKIP_LINE;
  let success = true;
  if (active_branch) {
    let pattern;
    let show_verbose, show_system;
    pattern = psql_scan_slash_option(
      scan_state,
      OT_NORMAL,
      NULL,
      true
    );
    show_verbose = strchr(cmd, "+") != NULL ? true : false;
    show_system = strchr(cmd, "S") != NULL ? true : false;
    switch (cmd[1]) {
      case "\0":
      case "+":
      case "S":
        if (pattern)
          success = await describeTableDetails(pattern, show_verbose, show_system);
        else
          success = await listTables("tvmsE", NULL, show_verbose, show_system);
        break;
      case "A":
        {
          let pattern2 = NULL;
          if (pattern && cmd[2] != "\0" && cmd[2] != "+")
            pattern2 = psql_scan_slash_option(scan_state, OT_NORMAL, NULL, true);
          switch (cmd[2]) {
            case "\0":
            case "+":
              success = await describeAccessMethods(pattern, show_verbose);
              break;
            case "c":
              success = await listOperatorClasses(pattern, pattern2, show_verbose);
              break;
            case "f":
              success = await listOperatorFamilies(pattern, pattern2, show_verbose);
              break;
            case "o":
              success = await listOpFamilyOperators(pattern, pattern2, show_verbose);
              break;
            case "p":
              success = await listOpFamilyFunctions(pattern, pattern2, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
        }
        break;
      case "a":
        success = await describeAggregates(pattern, show_verbose, show_system);
        break;
      case "b":
        success = await describeTablespaces(pattern, show_verbose);
        break;
      case "c":
        if (strncmp(cmd, "dconfig", 7) == 0)
          success = await describeConfigurationParameters(
            pattern,
            show_verbose,
            show_system
          );
        else
          success = await listConversions(
            pattern,
            show_verbose,
            show_system
          );
        break;
      case "C":
        success = await listCasts(pattern, show_verbose);
        break;
      case "d":
        if (strncmp(cmd, "ddp", 3) == 0)
          success = await listDefaultACLs(pattern);
        else
          success = await objectDescription(pattern, show_system);
        break;
      case "D":
        success = await listDomains(pattern, show_verbose, show_system);
        break;
      case "f":
        switch (cmd[2]) {
          case "\0":
          case "+":
          case "S":
          case "a":
          case "n":
          case "p":
          case "t":
          case "w":
            success = await exec_command_dfo(
              scan_state,
              cmd,
              pattern,
              show_verbose,
              show_system
            );
            break;
          default:
            status = PSQL_CMD_UNKNOWN;
            break;
        }
        break;
      case "g":
        success = await describeRoles(pattern, show_verbose, show_system);
        break;
      case "l":
        success = await listLargeObjects(show_verbose);
        break;
      case "L":
        success = await listLanguages(pattern, show_verbose, show_system);
        break;
      case "n":
        success = await listSchemas(pattern, show_verbose, show_system);
        break;
      case "o":
        success = await exec_command_dfo(
          scan_state,
          cmd,
          pattern,
          show_verbose,
          show_system
        );
        break;
      case "O":
        success = await listCollations(pattern, show_verbose, show_system);
        break;
      case "p":
        success = await permissionsList(pattern, show_system);
        break;
      case "P":
        {
          switch (cmd[2]) {
            case "\0":
            case "+":
            case "t":
            case "i":
            case "n":
              success = await listPartitionedTables(cmd.slice(2), pattern, show_verbose);
              break;
            default:
              status = PSQL_CMD_UNKNOWN;
              break;
          }
        }
        break;
      case "T":
        success = await describeTypes(pattern, show_verbose, show_system);
        break;
      case "t":
      case "v":
      case "m":
      case "i":
      case "s":
      case "E":
        success = await listTables(cmd[1], pattern, show_verbose, show_system);
        break;
      case "r":
        if (cmd[2] == "d" && cmd[3] == "s") {
          let pattern2 = NULL;
          if (pattern)
            pattern2 = psql_scan_slash_option(
              scan_state,
              OT_NORMAL,
              NULL,
              true
            );
          success = await listDbRoleSettings(pattern, pattern2);
        } else if (cmd[2] == "g")
          success = await describeRoleGrants(pattern, show_system);
        else
          status = PSQL_CMD_UNKNOWN;
        break;
      case "R":
        switch (cmd[2]) {
          case "p":
            if (show_verbose)
              success = await describePublications(pattern);
            else
              success = await listPublications(pattern);
            break;
          case "s":
            success = await describeSubscriptions(pattern, show_verbose);
            break;
          default:
            status = PSQL_CMD_UNKNOWN;
        }
        break;
      case "u":
        success = await describeRoles(pattern, show_verbose, show_system);
        break;
      case "F":
        switch (cmd[2]) {
          case "\0":
          case "+":
            success = await listTSConfigs(pattern, show_verbose);
            break;
          case "p":
            success = await listTSParsers(pattern, show_verbose);
            break;
          case "d":
            success = await listTSDictionaries(pattern, show_verbose);
            break;
          case "t":
            success = await listTSTemplates(pattern, show_verbose);
            break;
          default:
            status = PSQL_CMD_UNKNOWN;
            break;
        }
        break;
      case "e":
        switch (cmd[2]) {
          case "s":
            success = await listForeignServers(pattern, show_verbose);
            break;
          case "u":
            success = await listUserMappings(pattern, show_verbose);
            break;
          case "w":
            success = await listForeignDataWrappers(pattern, show_verbose);
            break;
          case "t":
            success = await listForeignTables(pattern, show_verbose);
            break;
          default:
            status = PSQL_CMD_UNKNOWN;
            break;
        }
        break;
      case "x":
        if (show_verbose)
          success = await listExtensionContents(pattern);
        else
          success = await listExtensions(pattern);
        break;
      case "X":
        success = await listExtendedStats(pattern);
        break;
      case "y":
        success = await listEventTriggers(pattern, show_verbose);
        break;
      default:
        status = PSQL_CMD_UNKNOWN;
    }
  } else
    ignore_slash_options(scan_state);
  if (!success)
    status = PSQL_CMD_ERROR;
  return status;
}
async function exec_command_dfo(scan_state, cmd, pattern, show_verbose, show_system) {
  let success;
  let arg_patterns = [];
  let num_arg_patterns = 0;
  if (pattern) {
    let ap;
    while ((ap = psql_scan_slash_option(
      scan_state,
      OT_NORMAL,
      NULL,
      true
    )) != NULL) {
      arg_patterns[num_arg_patterns++] = ap;
      if (num_arg_patterns >= FUNC_MAX_ARGS)
        break;
    }
  }
  if (cmd[1] == "f")
    success = await describeFunctions(
      cmd.slice(2),
      pattern,
      arg_patterns,
      num_arg_patterns,
      show_verbose,
      show_system
    );
  else
    success = await describeOperators(
      pattern,
      arg_patterns,
      num_arg_patterns,
      show_verbose,
      show_system
    );
  return success;
}
async function describeAggregates(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT n.nspname as "%s",
  p.proname AS "%s",
  pg_catalog.format_type(p.prorettype, NULL) AS "%s",
  CASE WHEN p.pronargs = 0
    THEN CAST('*' AS pg_catalog.text)
    ELSE pg_catalog.pg_get_function_arguments(p.oid)
  END AS "%s",
`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Result data type"),
    gettext_noop("Argument data types")
  );
  if (pset.sversion >= 11e4)
    appendPQExpBuffer(
      buf,
      `  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.prokind = 'a'
`,
      gettext_noop("Description")
    );
  else
    appendPQExpBuffer(
      buf,
      `  pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"
FROM pg_catalog.pg_proc p
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
WHERE p.proisagg
`,
      gettext_noop("Description")
    );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "p.proname",
    NULL,
    "pg_catalog.pg_function_is_visible(p.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of aggregate functions");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function describeAccessMethods(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, true, false, false];
  if (pset.sversion < 90600) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support access methods.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT amname AS "%s",
  CASE amtype WHEN 'i' THEN '%s' WHEN 't' THEN '%s' END AS "%s"`,
    gettext_noop("Name"),
    gettext_noop("Index"),
    gettext_noop("Table"),
    gettext_noop("Type")
  );
  if (verbose) {
    appendPQExpBuffer(
      buf,
      `,
  amhandler AS "%s",
  pg_catalog.obj_description(oid, 'pg_am') AS "%s"`,
      gettext_noop("Handler"),
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_am\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "amname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of access methods");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function describeTablespaces(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT spcname AS "%s",\n  pg_catalog.pg_get_userbyid(spcowner) AS "%s",\n  pg_catalog.pg_tablespace_location(oid) AS "%s"',
    gettext_noop("Name"),
    gettext_noop("Owner"),
    gettext_noop("Location")
  );
  if (verbose) {
    appendPQExpBufferStr(buf, ",\n  ");
    await printACLColumn(buf, "spcacl");
    appendPQExpBuffer(
      buf,
      `,
  spcoptions AS "%s",
  pg_catalog.pg_size_pretty(pg_catalog.pg_tablespace_size(oid)) AS "%s",
  pg_catalog.shobj_description(oid, 'pg_tablespace') AS "%s"`,
      gettext_noop("Options"),
      gettext_noop("Size"),
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_tablespace\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "spcname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of tablespaces");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function describeFunctions(functypes, func_pattern, arg_patterns, num_arg_patterns, verbose, showSystem) {
  let showAggregate = strchr(functypes, "a") != NULL;
  let showNormal = strchr(functypes, "n") != NULL;
  let showProcedure = strchr(functypes, "p") != NULL;
  let showTrigger = strchr(functypes, "t") != NULL;
  let showWindow = strchr(functypes, "w") != NULL;
  let have_where;
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, false, true, true, true, false, true, false, false, false, false];
  let translate_columns_pre_96 = [false, false, false, false, true, true, false, true, false, false, false, false];
  if (strlen(functypes) != strspn(functypes, "anptwS+")) {
    pg_log_error("\\df only takes [anptwS+] as options");
    return true;
  }
  if (showProcedure && pset.sversion < 11e4) {
    let sverbuf;
    pg_log_error(
      '\\df does not take a "%c" option with server version %s',
      "p",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  if (!showAggregate && !showNormal && !showProcedure && !showTrigger && !showWindow) {
    showAggregate = showNormal = showTrigger = showWindow = true;
    if (pset.sversion >= 11e4)
      showProcedure = true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT n.nspname as "%s",\n  p.proname as "%s",\n',
    gettext_noop("Schema"),
    gettext_noop("Name")
  );
  if (pset.sversion >= 11e4)
    appendPQExpBuffer(
      buf,
      `  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE p.prokind
  WHEN 'a' THEN '%s'
  WHEN 'w' THEN '%s'
  WHEN 'p' THEN '%s'
  ELSE '%s'
 END as "%s"`,
      gettext_noop("Result data type"),
      gettext_noop("Argument data types"),
      /* translator: "agg" is short for "aggregate" */
      gettext_noop("agg"),
      gettext_noop("window"),
      gettext_noop("proc"),
      gettext_noop("func"),
      gettext_noop("Type")
    );
  else
    appendPQExpBuffer(
      buf,
      `  pg_catalog.pg_get_function_result(p.oid) as "%s",
  pg_catalog.pg_get_function_arguments(p.oid) as "%s",
 CASE
  WHEN p.proisagg THEN '%s'
  WHEN p.proiswindow THEN '%s'
  WHEN p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype THEN '%s'
  ELSE '%s'
 END as "%s"`,
      gettext_noop("Result data type"),
      gettext_noop("Argument data types"),
      /* translator: "agg" is short for "aggregate" */
      gettext_noop("agg"),
      gettext_noop("window"),
      gettext_noop("trigger"),
      gettext_noop("func"),
      gettext_noop("Type")
    );
  if (verbose) {
    appendPQExpBuffer(
      buf,
      `,
 CASE
  WHEN p.provolatile = 'i' THEN '%s'
  WHEN p.provolatile = 's' THEN '%s'
  WHEN p.provolatile = 'v' THEN '%s'
 END as "%s"`,
      gettext_noop("immutable"),
      gettext_noop("stable"),
      gettext_noop("volatile"),
      gettext_noop("Volatility")
    );
    if (pset.sversion >= 90600)
      appendPQExpBuffer(
        buf,
        `,
 CASE
  WHEN p.proparallel = 'r' THEN '%s'
  WHEN p.proparallel = 's' THEN '%s'
  WHEN p.proparallel = 'u' THEN '%s'
 END as "%s"`,
        gettext_noop("restricted"),
        gettext_noop("safe"),
        gettext_noop("unsafe"),
        gettext_noop("Parallel")
      );
    appendPQExpBuffer(
      buf,
      `,
 pg_catalog.pg_get_userbyid(p.proowner) as "%s",
 CASE WHEN prosecdef THEN '%s' ELSE '%s' END AS "%s"`,
      gettext_noop("Owner"),
      gettext_noop("definer"),
      gettext_noop("invoker"),
      gettext_noop("Security")
    );
    appendPQExpBufferStr(buf, ",\n ");
    await printACLColumn(buf, "p.proacl");
    appendPQExpBuffer(
      buf,
      ',\n l.lanname as "%s"',
      gettext_noop("Language")
    );
    appendPQExpBuffer(
      buf,
      `,
 CASE WHEN l.lanname IN ('internal', 'c') THEN p.prosrc END as "%s"`,
      gettext_noop("Internal name")
    );
    appendPQExpBuffer(
      buf,
      `,
 pg_catalog.obj_description(p.oid, 'pg_proc') as "%s"`,
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_proc p\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace\n"
  );
  for (let i = 0; i < num_arg_patterns; i++) {
    appendPQExpBuffer(
      buf,
      "     LEFT JOIN pg_catalog.pg_type t%d ON t%d.oid = p.proargtypes[%d]\n     LEFT JOIN pg_catalog.pg_namespace nt%d ON nt%d.oid = t%d.typnamespace\n",
      i,
      i,
      i,
      i,
      i,
      i
    );
  }
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "     LEFT JOIN pg_catalog.pg_language l ON l.oid = p.prolang\n"
    );
  have_where = false;
  if (showNormal && showAggregate && showProcedure && showTrigger && showWindow)
    ;
  else if (showNormal) {
    if (!showAggregate) {
      if (have_where)
        appendPQExpBufferStr(buf, "      AND ");
      else {
        appendPQExpBufferStr(buf, "WHERE ");
        have_where = true;
      }
      if (pset.sversion >= 11e4)
        appendPQExpBufferStr(buf, "p.prokind <> 'a'\n");
      else
        appendPQExpBufferStr(buf, "NOT p.proisagg\n");
    }
    if (!showProcedure && pset.sversion >= 11e4) {
      if (have_where)
        appendPQExpBufferStr(buf, "      AND ");
      else {
        appendPQExpBufferStr(buf, "WHERE ");
        have_where = true;
      }
      appendPQExpBufferStr(buf, "p.prokind <> 'p'\n");
    }
    if (!showTrigger) {
      if (have_where)
        appendPQExpBufferStr(buf, "      AND ");
      else {
        appendPQExpBufferStr(buf, "WHERE ");
        have_where = true;
      }
      appendPQExpBufferStr(buf, "p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype\n");
    }
    if (!showWindow) {
      if (have_where)
        appendPQExpBufferStr(buf, "      AND ");
      else {
        appendPQExpBufferStr(buf, "WHERE ");
        have_where = true;
      }
      if (pset.sversion >= 11e4)
        appendPQExpBufferStr(buf, "p.prokind <> 'w'\n");
      else
        appendPQExpBufferStr(buf, "NOT p.proiswindow\n");
    }
  } else {
    let needs_or = false;
    appendPQExpBufferStr(buf, "WHERE (\n       ");
    have_where = true;
    if (showAggregate) {
      if (pset.sversion >= 11e4)
        appendPQExpBufferStr(buf, "p.prokind = 'a'\n");
      else
        appendPQExpBufferStr(buf, "p.proisagg\n");
      needs_or = true;
    }
    if (showTrigger) {
      if (needs_or)
        appendPQExpBufferStr(buf, "       OR ");
      appendPQExpBufferStr(
        buf,
        "p.prorettype = 'pg_catalog.trigger'::pg_catalog.regtype\n"
      );
      needs_or = true;
    }
    if (showProcedure) {
      if (needs_or)
        appendPQExpBufferStr(buf, "       OR ");
      appendPQExpBufferStr(buf, "p.prokind = 'p'\n");
      needs_or = true;
    }
    if (showWindow) {
      if (needs_or)
        appendPQExpBufferStr(buf, "       OR ");
      if (pset.sversion >= 11e4)
        appendPQExpBufferStr(buf, "p.prokind = 'w'\n");
      else
        appendPQExpBufferStr(buf, "p.proiswindow\n");
    }
    appendPQExpBufferStr(buf, "      )\n");
  }
  if (!validateSQLNamePattern(
    buf,
    func_pattern,
    have_where,
    false,
    "n.nspname",
    "p.proname",
    NULL,
    "pg_catalog.pg_function_is_visible(p.oid)",
    NULL,
    3
  ))
    return false;
  for (let i = 0; i < num_arg_patterns; i++) {
    if (strcmp(arg_patterns[i], "-") != 0) {
      let nspname;
      let typname;
      let ft;
      let tiv;
      nspname = sprintf("nt%d.nspname", i);
      typname = sprintf("t%d.typname", i);
      ft = sprintf("pg_catalog.format_type(t%d.oid, NULL)", i);
      tiv = sprintf("pg_catalog.pg_type_is_visible(t%d.oid)", i);
      if (!validateSQLNamePattern(
        buf,
        map_typename_pattern(arg_patterns[i]),
        true,
        false,
        nspname,
        typname,
        ft,
        tiv,
        NULL,
        3
      ))
        return false;
    } else {
      appendPQExpBuffer(buf, "  AND t%d.typname IS NULL\n", i);
    }
  }
  if (!showSystem && !func_pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of functions");
  myopt.translate_header = true;
  if (pset.sversion >= 90600) {
    myopt.translate_columns = translate_columns;
    myopt.n_translate_columns = lengthof(translate_columns);
  } else {
    myopt.translate_columns = translate_columns_pre_96;
    myopt.n_translate_columns = lengthof(translate_columns_pre_96);
  }
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function describeTypes(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT n.nspname as "%s",\n  pg_catalog.format_type(t.oid, NULL) AS "%s",\n',
    gettext_noop("Schema"),
    gettext_noop("Name")
  );
  if (verbose) {
    appendPQExpBuffer(
      buf,
      `  t.typname AS "%s",
  CASE WHEN t.typrelid != 0
      THEN CAST('tuple' AS pg_catalog.text)
    WHEN t.typlen < 0
      THEN CAST('var' AS pg_catalog.text)
    ELSE CAST(t.typlen AS pg_catalog.text)
  END AS "%s",
  pg_catalog.array_to_string(
      ARRAY(
          SELECT e.enumlabel
          FROM pg_catalog.pg_enum e
          WHERE e.enumtypid = t.oid
          ORDER BY e.enumsortorder
      ),
      E'\\n'
  ) AS "%s",
  pg_catalog.pg_get_userbyid(t.typowner) AS "%s",
`,
      gettext_noop("Internal name"),
      gettext_noop("Size"),
      gettext_noop("Elements"),
      gettext_noop("Owner")
    );
    await printACLColumn(buf, "t.typacl");
    appendPQExpBufferStr(buf, ",\n  ");
  }
  appendPQExpBuffer(
    buf,
    `  pg_catalog.obj_description(t.oid, 'pg_type') as "%s"
`,
    gettext_noop("Description")
  );
  appendPQExpBufferStr(buf, "FROM pg_catalog.pg_type t\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n");
  appendPQExpBufferStr(buf, "WHERE (t.typrelid = 0 ");
  appendPQExpBufferStr(buf, "OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))\n");
  if (pattern == NULL || strstr(pattern, "[]") == NULL)
    appendPQExpBufferStr(buf, "  AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)\n");
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    map_typename_pattern(pattern),
    true,
    false,
    "n.nspname",
    "t.typname",
    "pg_catalog.format_type(t.oid, NULL)",
    "pg_catalog.pg_type_is_visible(t.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of data types");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
function map_typename_pattern(pattern) {
  let typename_map = [
    /*
     * These names are accepted by gram.y, although they are neither the
     * "real" name seen in pg_type nor the canonical name printed by
     * format_type().
     */
    "decimal",
    "numeric",
    "float",
    "double precision",
    "int",
    "integer",
    /*
     * We also have to map the array names for cases where the canonical
     * name is different from what pg_type says.
     */
    "bool[]",
    "boolean[]",
    "decimal[]",
    "numeric[]",
    "float[]",
    "double precision[]",
    "float4[]",
    "real[]",
    "float8[]",
    "double precision[]",
    "int[]",
    "integer[]",
    "int2[]",
    "smallint[]",
    "int4[]",
    "integer[]",
    "int8[]",
    "bigint[]",
    "time[]",
    "time without time zone[]",
    "timetz[]",
    "time with time zone[]",
    "timestamp[]",
    "timestamp without time zone[]",
    "timestamptz[]",
    "timestamp with time zone[]",
    "varbit[]",
    "bit varying[]",
    "varchar[]",
    "character varying[]",
    NULL
  ];
  if (pattern == NULL)
    return NULL;
  for (let i = 0; typename_map[i] != NULL; i += 2) {
    if (pg_strcasecmp(pattern, typename_map[i]) == 0)
      return typename_map[i + 1];
  }
  return pattern;
}
async function describeOperators(oper_pattern, arg_patterns, num_arg_patterns, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT n.nspname as "%s",
  o.oprname AS "%s",
  CASE WHEN o.oprkind='l' THEN NULL ELSE pg_catalog.format_type(o.oprleft, NULL) END AS "%s",
  CASE WHEN o.oprkind='r' THEN NULL ELSE pg_catalog.format_type(o.oprright, NULL) END AS "%s",
  pg_catalog.format_type(o.oprresult, NULL) AS "%s",
`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Left arg type"),
    gettext_noop("Right arg type"),
    gettext_noop("Result type")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      '  o.oprcode AS "%s",\n',
      gettext_noop("Function")
    );
  appendPQExpBuffer(
    buf,
    `  coalesce(pg_catalog.obj_description(o.oid, 'pg_operator'),
           pg_catalog.obj_description(o.oprcode, 'pg_proc')) AS "%s"
FROM pg_catalog.pg_operator o
     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = o.oprnamespace
`,
    gettext_noop("Description")
  );
  if (num_arg_patterns >= 2) {
    num_arg_patterns = 2;
    appendPQExpBufferStr(
      buf,
      "     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprleft\n     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace\n     LEFT JOIN pg_catalog.pg_type t1 ON t1.oid = o.oprright\n     LEFT JOIN pg_catalog.pg_namespace nt1 ON nt1.oid = t1.typnamespace\n"
    );
  } else if (num_arg_patterns == 1) {
    appendPQExpBufferStr(
      buf,
      "     LEFT JOIN pg_catalog.pg_type t0 ON t0.oid = o.oprright\n     LEFT JOIN pg_catalog.pg_namespace nt0 ON nt0.oid = t0.typnamespace\n"
    );
  }
  if (!showSystem && !oper_pattern)
    appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    oper_pattern,
    !showSystem && !oper_pattern,
    true,
    "n.nspname",
    "o.oprname",
    NULL,
    "pg_catalog.pg_operator_is_visible(o.oid)",
    NULL,
    3
  ))
    return false;
  if (num_arg_patterns == 1)
    appendPQExpBufferStr(buf, "  AND o.oprleft = 0\n");
  for (let i = 0; i < num_arg_patterns; i++) {
    if (strcmp(arg_patterns[i], "-") != 0) {
      let nspname;
      let typname;
      let ft;
      let tiv;
      nspname = sprintf("nt%d.nspname", i);
      typname = sprintf("t%d.typname", i);
      ft = sprintf("pg_catalog.format_type(t%d.oid, NULL)", i);
      tiv = sprintf("pg_catalog.pg_type_is_visible(t%d.oid)", i);
      if (!validateSQLNamePattern(
        buf,
        map_typename_pattern(arg_patterns[i]),
        true,
        false,
        nspname,
        typname,
        ft,
        tiv,
        NULL,
        3
      ))
        return false;
    } else {
      appendPQExpBuffer(buf, "  AND t%d.typname IS NULL\n", i);
    }
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 3, 4;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of operators");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function permissionsList(pattern, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, true, false, false, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'S' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' END as "%s",
  `,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("table"),
    gettext_noop("view"),
    gettext_noop("materialized view"),
    gettext_noop("sequence"),
    gettext_noop("foreign table"),
    gettext_noop("partitioned table"),
    gettext_noop("Type")
  );
  await printACLColumn(buf, "c.relacl");
  appendPQExpBuffer(
    buf,
    `,
  pg_catalog.array_to_string(ARRAY(
    SELECT attname || E':\\n  ' || pg_catalog.array_to_string(attacl, E'\\n  ')
    FROM pg_catalog.pg_attribute a
    WHERE attrelid = c.oid AND NOT attisdropped AND attacl IS NOT NULL
  ), E'\\n') AS "%s"`,
    gettext_noop("Column privileges")
  );
  if (pset.sversion >= 90500 && pset.sversion < 1e5)
    appendPQExpBuffer(
      buf,
      `,
  pg_catalog.array_to_string(ARRAY(
    SELECT polname
    || CASE WHEN polcmd != '*' THEN
           E' (' || polcmd::pg_catalog.text || E'):'
       ELSE E':'
       END
    || CASE WHEN polqual IS NOT NULL THEN
           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)
       ELSE E''
       END
    || CASE WHEN polwithcheck IS NOT NULL THEN
           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)
       ELSE E''
       END    || CASE WHEN polroles <> '{0}' THEN
           E'\\n  to: ' || pg_catalog.array_to_string(
               ARRAY(
                   SELECT rolname
                   FROM pg_catalog.pg_roles
                   WHERE oid = ANY (polroles)
                   ORDER BY 1
               ), E', ')
       ELSE E''
       END
    FROM pg_catalog.pg_policy pol
    WHERE polrelid = c.oid), E'\\n')
    AS "%s"`,
      gettext_noop("Policies")
    );
  if (pset.sversion >= 1e5)
    appendPQExpBuffer(
      buf,
      `,
  pg_catalog.array_to_string(ARRAY(
    SELECT polname
    || CASE WHEN NOT polpermissive THEN
       E' (RESTRICTIVE)'
       ELSE '' END
    || CASE WHEN polcmd != '*' THEN
           E' (' || polcmd::pg_catalog.text || E'):'
       ELSE E':'
       END
    || CASE WHEN polqual IS NOT NULL THEN
           E'\\n  (u): ' || pg_catalog.pg_get_expr(polqual, polrelid)
       ELSE E''
       END
    || CASE WHEN polwithcheck IS NOT NULL THEN
           E'\\n  (c): ' || pg_catalog.pg_get_expr(polwithcheck, polrelid)
       ELSE E''
       END    || CASE WHEN polroles <> '{0}' THEN
           E'\\n  to: ' || pg_catalog.array_to_string(
               ARRAY(
                   SELECT rolname
                   FROM pg_catalog.pg_roles
                   WHERE oid = ANY (polroles)
                   ORDER BY 1
               ), E', ')
       ELSE E''
       END
    FROM pg_catalog.pg_policy pol
    WHERE polrelid = c.oid), E'\\n')
    AS "%s"`,
      gettext_noop("Policies")
    );
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\nWHERE c.relkind IN ('r','v','m','S','f','p')\n");
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "c.relname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  printfPQExpBuffer(buf, _("Access privileges"));
  myopt.title = buf.data;
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listDefaultACLs(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, true, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT pg_catalog.pg_get_userbyid(d.defaclrole) AS "%s",
  n.nspname AS "%s",
  CASE d.defaclobjtype WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' WHEN '%c' THEN '%s' END AS "%s",
  `,
    gettext_noop("Owner"),
    gettext_noop("Schema"),
    DEFACLOBJ_RELATION,
    gettext_noop("table"),
    DEFACLOBJ_SEQUENCE,
    gettext_noop("sequence"),
    DEFACLOBJ_FUNCTION,
    gettext_noop("function"),
    DEFACLOBJ_TYPE,
    gettext_noop("type"),
    DEFACLOBJ_NAMESPACE,
    gettext_noop("schema"),
    gettext_noop("Type")
  );
  await printACLColumn(buf, "d.defaclacl");
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_default_acl d\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.defaclnamespace\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "n.nspname",
    "pg_catalog.pg_get_userbyid(d.defaclrole)",
    NULL,
    NULL,
    3
  ))
    return false;
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 3;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  printfPQExpBuffer(buf, _("Default access privileges"));
  myopt.title = buf.data;
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function objectDescription(pattern, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, true, false];
  initPQExpBuffer(buf);
  appendPQExpBuffer(
    buf,
    'SELECT DISTINCT tt.nspname AS "%s", tt.name AS "%s", tt.object AS "%s", d.description AS "%s"\nFROM (\n',
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Object"),
    gettext_noop("Description")
  );
  appendPQExpBuffer(
    buf,
    "  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,\n  n.nspname as nspname,\n  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_constraint pgc\n    JOIN pg_catalog.pg_class c ON c.oid = pgc.conrelid\n    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = c.relnamespace\n",
    gettext_noop("table constraint")
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    !showSystem && !pattern,
    false,
    "n.nspname",
    "pgc.conname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBuffer(
    buf,
    "UNION ALL\n  SELECT pgc.oid as oid, pgc.tableoid AS tableoid,\n  n.nspname as nspname,\n  CAST(pgc.conname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_constraint pgc\n    JOIN pg_catalog.pg_type t ON t.oid = pgc.contypid\n    LEFT JOIN pg_catalog.pg_namespace n     ON n.oid = t.typnamespace\n",
    gettext_noop("domain constraint")
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    !showSystem && !pattern,
    false,
    "n.nspname",
    "pgc.conname",
    NULL,
    "pg_catalog.pg_type_is_visible(t.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBuffer(
    buf,
    "UNION ALL\n  SELECT o.oid as oid, o.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(o.opcname AS pg_catalog.text) as name,\n  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_opclass o\n    JOIN pg_catalog.pg_am am ON o.opcmethod = am.oid\n    JOIN pg_catalog.pg_namespace n ON n.oid = o.opcnamespace\n",
    gettext_noop("operator class")
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "o.opcname",
    NULL,
    "pg_catalog.pg_opclass_is_visible(o.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBuffer(
    buf,
    "UNION ALL\n  SELECT opf.oid as oid, opf.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(opf.opfname AS pg_catalog.text) AS name,\n  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_opfamily opf\n    JOIN pg_catalog.pg_am am ON opf.opfmethod = am.oid\n    JOIN pg_catalog.pg_namespace n ON opf.opfnamespace = n.oid\n",
    gettext_noop("operator family")
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "opf.opfname",
    NULL,
    "pg_catalog.pg_opfamily_is_visible(opf.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBuffer(
    buf,
    "UNION ALL\n  SELECT r.oid as oid, r.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(r.rulename AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_rewrite r\n       JOIN pg_catalog.pg_class c ON c.oid = r.ev_class\n       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n  WHERE r.rulename != '_RETURN'\n",
    gettext_noop("rule")
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "r.rulename",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBuffer(
    buf,
    "UNION ALL\n  SELECT t.oid as oid, t.tableoid as tableoid,\n  n.nspname as nspname,\n  CAST(t.tgname AS pg_catalog.text) as name,  CAST('%s' AS pg_catalog.text) as object\n  FROM pg_catalog.pg_trigger t\n       JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid\n       LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n",
    gettext_noop("trigger")
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    !showSystem && !pattern,
    false,
    "n.nspname",
    "t.tgname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBufferStr(
    buf,
    ") AS tt\n  JOIN pg_catalog.pg_description d ON (tt.oid = d.objoid AND tt.tableoid = d.classoid AND d.objsubid = 0)\n"
  );
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 3;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("Object descriptions");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function describeTableDetails(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let i;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    "SELECT c.oid,\n  n.nspname,\n  c.relname\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n"
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    !showSystem && !pattern,
    false,
    "n.nspname",
    "c.relname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 2, 3;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  if (PQntuples(res) == 0) {
    if (!pset.quiet) {
      if (pattern)
        pg_log_error(
          'Did not find any relation named "%s".',
          pattern
        );
      else
        pg_log_error("Did not find any relations.");
    }
    return false;
  }
  for (i = 0; i < PQntuples(res); i++) {
    let oid;
    let nspname;
    let relname;
    oid = PQgetvalue(res, i, 0);
    nspname = PQgetvalue(res, i, 1);
    relname = PQgetvalue(res, i, 2);
    if (!await describeOneTableDetails(nspname, relname, oid, verbose)) {
      return false;
    }
    if (cancel_pressed) {
      return false;
    }
  }
  return true;
}
async function describeOneTableDetails(schemaname, relationname, oid, verbose) {
  let retval = false;
  let buf = {
    /* struct */
  };
  let res = NULL;
  let myopt = pset.popt.topt;
  let cont = {
    /* struct */
  };
  let printTableInitialized = false;
  let i;
  let view_def = NULL;
  let headers = [];
  let title = {
    /* struct */
  };
  let tmpbuf = {
    /* struct */
  };
  let cols;
  let attname_col = -1, atttype_col = -1, attrdef_col = -1, attnotnull_col = -1, attcoll_col = -1, attidentity_col = -1, attgenerated_col = -1, isindexkey_col = -1, indexdef_col = -1, fdwopts_col = -1, attstorage_col = -1, attcompression_col = -1, attstattarget_col = -1, attdescr_col = -1;
  let numrows;
  let tableinfo = {};
  let show_column_details = false;
  myopt.default_footer = false;
  myopt.expanded = false;
  initPQExpBuffer(buf);
  initPQExpBuffer(title);
  initPQExpBuffer(tmpbuf);
  if (pset.sversion >= 12e4) {
    printfPQExpBuffer(
      buf,
      "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, false AS relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident, am.amname\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nLEFT JOIN pg_catalog.pg_am am ON (c.relam = am.oid)\nWHERE c.oid = '%s';",
      verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
      oid
    );
  } else if (pset.sversion >= 1e5) {
    printfPQExpBuffer(
      buf,
      "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, c.relhasoids, c.relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
      verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
      oid
    );
  } else if (pset.sversion >= 90500) {
    printfPQExpBuffer(
      buf,
      "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, c.relrowsecurity, c.relforcerowsecurity, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
      verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
      oid
    );
  } else if (pset.sversion >= 90400) {
    printfPQExpBuffer(
      buf,
      "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence, c.relreplident\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
      verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
      oid
    );
  } else {
    printfPQExpBuffer(
      buf,
      "SELECT c.relchecks, c.relkind, c.relhasindex, c.relhasrules, c.relhastriggers, false, false, c.relhasoids, false as relispartition, %s, c.reltablespace, CASE WHEN c.reloftype = 0 THEN '' ELSE c.reloftype::pg_catalog.regtype::pg_catalog.text END, c.relpersistence\nFROM pg_catalog.pg_class c\n LEFT JOIN pg_catalog.pg_class tc ON (c.reltoastrelid = tc.oid)\nWHERE c.oid = '%s';",
      verbose ? "pg_catalog.array_to_string(c.reloptions || array(select 'toast.' || x from pg_catalog.unnest(tc.reloptions) x), ', ')\n" : "''",
      oid
    );
  }
  res = await PSQLexec(buf.data);
  if (!res)
    return retval;
  if (PQntuples(res) == 0) {
    if (!pset.quiet)
      pg_log_error("Did not find any relation with OID %s.", oid);
    return retval;
  }
  tableinfo.checks = atoi(PQgetvalue(res, 0, 0));
  tableinfo.relkind = PQgetvalue(res, 0, 1);
  tableinfo.hasindex = strcmp(PQgetvalue(res, 0, 2), "t") == 0;
  tableinfo.hasrules = strcmp(PQgetvalue(res, 0, 3), "t") == 0;
  tableinfo.hastriggers = strcmp(PQgetvalue(res, 0, 4), "t") == 0;
  tableinfo.rowsecurity = strcmp(PQgetvalue(res, 0, 5), "t") == 0;
  tableinfo.forcerowsecurity = strcmp(PQgetvalue(res, 0, 6), "t") == 0;
  tableinfo.hasoids = strcmp(PQgetvalue(res, 0, 7), "t") == 0;
  tableinfo.ispartition = strcmp(PQgetvalue(res, 0, 8), "t") == 0;
  tableinfo.reloptions = pg_strdup(PQgetvalue(res, 0, 9));
  tableinfo.tablespace = atooid(PQgetvalue(res, 0, 10));
  tableinfo.reloftype = strcmp(PQgetvalue(res, 0, 11), "") != 0 ? pg_strdup(PQgetvalue(res, 0, 11)) : NULL;
  tableinfo.relpersistence = PQgetvalue(res, 0, 12);
  tableinfo.relreplident = pset.sversion >= 90400 ? PQgetvalue(res, 0, 13) : "d";
  if (pset.sversion >= 12e4)
    tableinfo.relam = PQgetisnull(res, 0, 14) ? NULL : pg_strdup(PQgetvalue(res, 0, 14));
  else
    tableinfo.relam = NULL;
  res = NULL;
  if (tableinfo.relkind == RELKIND_SEQUENCE) {
    let result = NULL;
    let myopt2 = pset.popt;
    let footers = [NULL, NULL];
    if (pset.sversion >= 1e5) {
      printfPQExpBuffer(
        buf,
        `SELECT pg_catalog.format_type(seqtypid, NULL) AS "%s",
       seqstart AS "%s",
       seqmin AS "%s",
       seqmax AS "%s",
       seqincrement AS "%s",
       CASE WHEN seqcycle THEN '%s' ELSE '%s' END AS "%s",
       seqcache AS "%s"
`,
        gettext_noop("Type"),
        gettext_noop("Start"),
        gettext_noop("Minimum"),
        gettext_noop("Maximum"),
        gettext_noop("Increment"),
        gettext_noop("yes"),
        gettext_noop("no"),
        gettext_noop("Cycles?"),
        gettext_noop("Cache")
      );
      appendPQExpBuffer(
        buf,
        "FROM pg_catalog.pg_sequence\nWHERE seqrelid = '%s';",
        oid
      );
    } else {
      printfPQExpBuffer(
        buf,
        `SELECT 'bigint' AS "%s",
       start_value AS "%s",
       min_value AS "%s",
       max_value AS "%s",
       increment_by AS "%s",
       CASE WHEN is_cycled THEN '%s' ELSE '%s' END AS "%s",
       cache_value AS "%s"
`,
        gettext_noop("Type"),
        gettext_noop("Start"),
        gettext_noop("Minimum"),
        gettext_noop("Maximum"),
        gettext_noop("Increment"),
        gettext_noop("yes"),
        gettext_noop("no"),
        gettext_noop("Cycles?"),
        gettext_noop("Cache")
      );
      appendPQExpBuffer(buf, "FROM %s", fmtId(schemaname));
      appendPQExpBuffer(buf, ".%s;", fmtId(relationname));
    }
    res = await PSQLexec(buf.data);
    if (!res)
      return retval;
    printfPQExpBuffer(
      buf,
      "SELECT pg_catalog.quote_ident(nspname) || '.' ||\n   pg_catalog.quote_ident(relname) || '.' ||\n   pg_catalog.quote_ident(attname),\n   d.deptype\nFROM pg_catalog.pg_class c\nINNER JOIN pg_catalog.pg_depend d ON c.oid=d.refobjid\nINNER JOIN pg_catalog.pg_namespace n ON n.oid=c.relnamespace\nINNER JOIN pg_catalog.pg_attribute a ON (\n a.attrelid=c.oid AND\n a.attnum=d.refobjsubid)\nWHERE d.classid='pg_catalog.pg_class'::pg_catalog.regclass\n AND d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass\n AND d.objid='%s'\n AND d.deptype IN ('a', 'i')",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    else if (PQntuples(result) == 1) {
      switch (PQgetvalue(result, 0, 1)[0]) {
        case "a":
          footers[0] = psprintf(
            _("Owned by: %s"),
            PQgetvalue(result, 0, 0)
          );
          break;
        case "i":
          footers[0] = psprintf(
            _("Sequence for identity column: %s"),
            PQgetvalue(result, 0, 0)
          );
          break;
      }
    }
    if (tableinfo.relpersistence == "u")
      printfPQExpBuffer(
        title,
        _('Unlogged sequence "%s.%s"'),
        schemaname,
        relationname
      );
    else
      printfPQExpBuffer(
        title,
        _('Sequence "%s.%s"'),
        schemaname,
        relationname
      );
    myopt2.footers = footers;
    myopt2.topt.default_footer = false;
    myopt2.title = title.data;
    myopt2.translate_header = true;
    printQuery(res, myopt2, pset.queryFout, false, pset.logfile);
    retval = true;
    return retval;
  }
  if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_VIEW || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_COMPOSITE_TYPE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE)
    show_column_details = true;
  cols = 0;
  printfPQExpBuffer(buf, "SELECT a.attname");
  attname_col = cols++;
  appendPQExpBufferStr(buf, ",\n  pg_catalog.format_type(a.atttypid, a.atttypmod)");
  atttype_col = cols++;
  if (show_column_details) {
    appendPQExpBufferStr(
      buf,
      ",\n  (SELECT pg_catalog.pg_get_expr(d.adbin, d.adrelid, true)\n   FROM pg_catalog.pg_attrdef d\n   WHERE d.adrelid = a.attrelid AND d.adnum = a.attnum AND a.atthasdef),\n  a.attnotnull"
    );
    attrdef_col = cols++;
    attnotnull_col = cols++;
    appendPQExpBufferStr(buf, ",\n  (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type t\n   WHERE c.oid = a.attcollation AND t.oid = a.atttypid AND a.attcollation <> t.typcollation) AS attcollation");
    attcoll_col = cols++;
    if (pset.sversion >= 1e5)
      appendPQExpBufferStr(buf, ",\n  a.attidentity");
    else
      appendPQExpBufferStr(buf, ",\n  ''::pg_catalog.char AS attidentity");
    attidentity_col = cols++;
    if (pset.sversion >= 12e4)
      appendPQExpBufferStr(buf, ",\n  a.attgenerated");
    else
      appendPQExpBufferStr(buf, ",\n  ''::pg_catalog.char AS attgenerated");
    attgenerated_col = cols++;
  }
  if (tableinfo.relkind == RELKIND_INDEX || tableinfo.relkind == RELKIND_PARTITIONED_INDEX) {
    if (pset.sversion >= 11e4) {
      appendPQExpBuffer(
        buf,
        ",\n  CASE WHEN a.attnum <= (SELECT i.indnkeyatts FROM pg_catalog.pg_index i WHERE i.indexrelid = '%s') THEN '%s' ELSE '%s' END AS is_key",
        oid,
        gettext_noop("yes"),
        gettext_noop("no")
      );
      isindexkey_col = cols++;
    }
    appendPQExpBufferStr(buf, ",\n  pg_catalog.pg_get_indexdef(a.attrelid, a.attnum, TRUE) AS indexdef");
    indexdef_col = cols++;
  }
  if (tableinfo.relkind == RELKIND_FOREIGN_TABLE) {
    appendPQExpBufferStr(buf, ",\n  CASE WHEN attfdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(attfdwoptions)), ', ') || ')' END AS attfdwoptions");
    fdwopts_col = cols++;
  }
  if (verbose) {
    appendPQExpBufferStr(buf, ",\n  a.attstorage");
    attstorage_col = cols++;
    if (pset.sversion >= 14e4 && !pset.hide_compression && (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_MATVIEW)) {
      appendPQExpBufferStr(buf, ",\n  a.attcompression AS attcompression");
      attcompression_col = cols++;
    }
    if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_INDEX || tableinfo.relkind == RELKIND_PARTITIONED_INDEX || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
      appendPQExpBufferStr(buf, ",\n  CASE WHEN a.attstattarget=-1 THEN NULL ELSE a.attstattarget END AS attstattarget");
      attstattarget_col = cols++;
    }
    if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_VIEW || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_COMPOSITE_TYPE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
      appendPQExpBufferStr(buf, ",\n  pg_catalog.col_description(a.attrelid, a.attnum)");
      attdescr_col = cols++;
    }
  }
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_attribute a");
  appendPQExpBuffer(buf, "\nWHERE a.attrelid = '%s' AND a.attnum > 0 AND NOT a.attisdropped", oid);
  appendPQExpBufferStr(buf, "\nORDER BY a.attnum;");
  res = await PSQLexec(buf.data);
  if (!res)
    return retval;
  numrows = PQntuples(res);
  switch (tableinfo.relkind) {
    case RELKIND_RELATION:
      if (tableinfo.relpersistence == "u")
        printfPQExpBuffer(
          title,
          _('Unlogged table "%s.%s"'),
          schemaname,
          relationname
        );
      else
        printfPQExpBuffer(
          title,
          _('Table "%s.%s"'),
          schemaname,
          relationname
        );
      break;
    case RELKIND_VIEW:
      printfPQExpBuffer(
        title,
        _('View "%s.%s"'),
        schemaname,
        relationname
      );
      break;
    case RELKIND_MATVIEW:
      if (tableinfo.relpersistence == "u")
        printfPQExpBuffer(
          title,
          _('Unlogged materialized view "%s.%s"'),
          schemaname,
          relationname
        );
      else
        printfPQExpBuffer(
          title,
          _('Materialized view "%s.%s"'),
          schemaname,
          relationname
        );
      break;
    case RELKIND_INDEX:
      if (tableinfo.relpersistence == "u")
        printfPQExpBuffer(
          title,
          _('Unlogged index "%s.%s"'),
          schemaname,
          relationname
        );
      else
        printfPQExpBuffer(
          title,
          _('Index "%s.%s"'),
          schemaname,
          relationname
        );
      break;
    case RELKIND_PARTITIONED_INDEX:
      if (tableinfo.relpersistence == "u")
        printfPQExpBuffer(
          title,
          _('Unlogged partitioned index "%s.%s"'),
          schemaname,
          relationname
        );
      else
        printfPQExpBuffer(
          title,
          _('Partitioned index "%s.%s"'),
          schemaname,
          relationname
        );
      break;
    case RELKIND_TOASTVALUE:
      printfPQExpBuffer(
        title,
        _('TOAST table "%s.%s"'),
        schemaname,
        relationname
      );
      break;
    case RELKIND_COMPOSITE_TYPE:
      printfPQExpBuffer(
        title,
        _('Composite type "%s.%s"'),
        schemaname,
        relationname
      );
      break;
    case RELKIND_FOREIGN_TABLE:
      printfPQExpBuffer(
        title,
        _('Foreign table "%s.%s"'),
        schemaname,
        relationname
      );
      break;
    case RELKIND_PARTITIONED_TABLE:
      if (tableinfo.relpersistence == "u")
        printfPQExpBuffer(
          title,
          _('Unlogged partitioned table "%s.%s"'),
          schemaname,
          relationname
        );
      else
        printfPQExpBuffer(
          title,
          _('Partitioned table "%s.%s"'),
          schemaname,
          relationname
        );
      break;
    default:
      printfPQExpBuffer(
        title,
        '?%c? "%s.%s"',
        tableinfo.relkind,
        schemaname,
        relationname
      );
      break;
  }
  cols = 0;
  headers[cols++] = gettext_noop("Column");
  headers[cols++] = gettext_noop("Type");
  if (show_column_details) {
    headers[cols++] = gettext_noop("Collation");
    headers[cols++] = gettext_noop("Nullable");
    headers[cols++] = gettext_noop("Default");
  }
  if (isindexkey_col >= 0)
    headers[cols++] = gettext_noop("Key?");
  if (indexdef_col >= 0)
    headers[cols++] = gettext_noop("Definition");
  if (fdwopts_col >= 0)
    headers[cols++] = gettext_noop("FDW options");
  if (attstorage_col >= 0)
    headers[cols++] = gettext_noop("Storage");
  if (attcompression_col >= 0)
    headers[cols++] = gettext_noop("Compression");
  if (attstattarget_col >= 0)
    headers[cols++] = gettext_noop("Stats target");
  if (attdescr_col >= 0)
    headers[cols++] = gettext_noop("Description");
  Assert(cols <= lengthof(headers));
  printTableInit(cont, myopt, title.data, cols, numrows);
  printTableInitialized = true;
  for (i = 0; i < cols; i++)
    printTableAddHeader(cont, headers[i], true, "l");
  for (i = 0; i < numrows; i++) {
    printTableAddCell(cont, PQgetvalue(res, i, attname_col), false, false);
    printTableAddCell(cont, PQgetvalue(res, i, atttype_col), false, false);
    if (show_column_details) {
      let identity;
      let generated;
      let default_str;
      let mustfree = false;
      printTableAddCell(cont, PQgetvalue(res, i, attcoll_col), false, false);
      printTableAddCell(
        cont,
        strcmp(PQgetvalue(res, i, attnotnull_col), "t") == 0 ? "not null" : "",
        false,
        false
      );
      identity = PQgetvalue(res, i, attidentity_col);
      generated = PQgetvalue(res, i, attgenerated_col);
      if (identity[0] == ATTRIBUTE_IDENTITY_ALWAYS)
        default_str = "generated always as identity";
      else if (identity[0] == ATTRIBUTE_IDENTITY_BY_DEFAULT)
        default_str = "generated by default as identity";
      else if (generated[0] == ATTRIBUTE_GENERATED_STORED) {
        default_str = psprintf(
          "generated always as (%s) stored",
          PQgetvalue(res, i, attrdef_col)
        );
        mustfree = true;
      } else
        default_str = PQgetvalue(res, i, attrdef_col);
      printTableAddCell(cont, default_str, false, mustfree);
    }
    if (isindexkey_col >= 0)
      printTableAddCell(cont, PQgetvalue(res, i, isindexkey_col), true, false);
    if (indexdef_col >= 0)
      printTableAddCell(cont, PQgetvalue(res, i, indexdef_col), false, false);
    if (fdwopts_col >= 0)
      printTableAddCell(cont, PQgetvalue(res, i, fdwopts_col), false, false);
    if (attstorage_col >= 0) {
      let storage = PQgetvalue(res, i, attstorage_col);
      printTableAddCell(
        cont,
        storage[0] == "p" ? "plain" : storage[0] == "m" ? "main" : storage[0] == "x" ? "extended" : storage[0] == "e" ? "external" : "???",
        false,
        false
      );
    }
    if (attcompression_col >= 0) {
      let compression = PQgetvalue(res, i, attcompression_col);
      printTableAddCell(
        cont,
        compression[0] == "p" ? "pglz" : compression[0] == "l" ? "lz4" : compression[0] == "\0" || compression[0] === void 0 ? "" : "???",
        false,
        false
      );
    }
    if (attstattarget_col >= 0)
      printTableAddCell(
        cont,
        PQgetvalue(res, i, attstattarget_col),
        false,
        false
      );
    if (attdescr_col >= 0)
      printTableAddCell(
        cont,
        PQgetvalue(res, i, attdescr_col),
        false,
        false
      );
  }
  if (tableinfo.ispartition) {
    let result;
    printfPQExpBuffer(
      buf,
      "SELECT inhparent::pg_catalog.regclass,\n  pg_catalog.pg_get_expr(c.relpartbound, c.oid),\n  "
    );
    appendPQExpBufferStr(
      buf,
      pset.sversion >= 14e4 ? "inhdetachpending" : "false as inhdetachpending"
    );
    if (verbose)
      appendPQExpBufferStr(
        buf,
        ",\n  pg_catalog.pg_get_partition_constraintdef(c.oid)"
      );
    appendPQExpBuffer(
      buf,
      "\nFROM pg_catalog.pg_class c JOIN pg_catalog.pg_inherits i ON c.oid = inhrelid\nWHERE c.oid = '%s';",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    if (PQntuples(result) > 0) {
      let parent_name = PQgetvalue(result, 0, 0);
      let partdef = PQgetvalue(result, 0, 1);
      let detached = PQgetvalue(result, 0, 2);
      printfPQExpBuffer(
        tmpbuf,
        _("Partition of: %s %s%s"),
        parent_name,
        partdef,
        strcmp(detached, "t") == 0 ? " DETACH PENDING" : ""
      );
      printTableAddFooter(cont, tmpbuf.data);
      if (verbose) {
        let partconstraintdef = NULL;
        if (!PQgetisnull(result, 0, 3))
          partconstraintdef = PQgetvalue(result, 0, 3);
        if (partconstraintdef == NULL || (partconstraintdef[0] == "\0" || partconstraintdef[0] === void 0))
          printfPQExpBuffer(tmpbuf, _("No partition constraint"));
        else
          printfPQExpBuffer(
            tmpbuf,
            _("Partition constraint: %s"),
            partconstraintdef
          );
        printTableAddFooter(cont, tmpbuf.data);
      }
    }
  }
  if (tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
    let result;
    printfPQExpBuffer(
      buf,
      "SELECT pg_catalog.pg_get_partkeydef('%s'::pg_catalog.oid);",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    if (PQntuples(result) == 1) {
      let partkeydef = PQgetvalue(result, 0, 0);
      printfPQExpBuffer(tmpbuf, _("Partition key: %s"), partkeydef);
      printTableAddFooter(cont, tmpbuf.data);
    }
  }
  if (tableinfo.relkind == RELKIND_TOASTVALUE) {
    let result;
    printfPQExpBuffer(
      buf,
      "SELECT n.nspname, c.relname\nFROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\nWHERE reltoastrelid = '%s';",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    if (PQntuples(result) == 1) {
      let schemaname2 = PQgetvalue(result, 0, 0);
      let relname = PQgetvalue(result, 0, 1);
      printfPQExpBuffer(
        tmpbuf,
        _('Owning table: "%s.%s"'),
        schemaname2,
        relname
      );
      printTableAddFooter(cont, tmpbuf.data);
    }
  }
  if (tableinfo.relkind == RELKIND_INDEX || tableinfo.relkind == RELKIND_PARTITIONED_INDEX) {
    let result;
    printfPQExpBuffer(
      buf,
      "SELECT i.indisunique, i.indisprimary, i.indisclustered, i.indisvalid,\n  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x') AND condeferrable) AS condeferrable,\n  (NOT i.indimmediate) AND EXISTS (SELECT 1 FROM pg_catalog.pg_constraint WHERE conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x') AND condeferred) AS condeferred,\n"
    );
    if (pset.sversion >= 90400)
      appendPQExpBufferStr(buf, "i.indisreplident,\n");
    else
      appendPQExpBufferStr(buf, "false AS indisreplident,\n");
    if (pset.sversion >= 15e4)
      appendPQExpBufferStr(buf, "i.indnullsnotdistinct,\n");
    else
      appendPQExpBufferStr(buf, "false AS indnullsnotdistinct,\n");
    appendPQExpBuffer(
      buf,
      "  a.amname, c2.relname, pg_catalog.pg_get_expr(i.indpred, i.indrelid, true)\nFROM pg_catalog.pg_index i, pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_am a\nWHERE i.indexrelid = c.oid AND c.oid = '%s' AND c.relam = a.oid\nAND i.indrelid = c2.oid;",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    else if (PQntuples(result) != 1) {
      return retval;
    } else {
      let indisunique = PQgetvalue(result, 0, 0);
      let indisprimary = PQgetvalue(result, 0, 1);
      let indisclustered = PQgetvalue(result, 0, 2);
      let indisvalid = PQgetvalue(result, 0, 3);
      let deferrable = PQgetvalue(result, 0, 4);
      let deferred = PQgetvalue(result, 0, 5);
      let indisreplident = PQgetvalue(result, 0, 6);
      let indnullsnotdistinct = PQgetvalue(result, 0, 7);
      let indamname = PQgetvalue(result, 0, 8);
      let indtable = PQgetvalue(result, 0, 9);
      let indpred = PQgetvalue(result, 0, 10);
      if (strcmp(indisprimary, "t") == 0)
        printfPQExpBuffer(tmpbuf, _("primary key, "));
      else if (strcmp(indisunique, "t") == 0) {
        printfPQExpBuffer(tmpbuf, _("unique"));
        if (strcmp(indnullsnotdistinct, "t") == 0)
          appendPQExpBufferStr(tmpbuf, _(" nulls not distinct"));
        appendPQExpBufferStr(tmpbuf, _(", "));
      } else
        resetPQExpBuffer(tmpbuf);
      appendPQExpBuffer(tmpbuf, "%s, ", indamname);
      appendPQExpBuffer(
        tmpbuf,
        _('for table "%s.%s"'),
        schemaname,
        indtable
      );
      if (strlen(indpred))
        appendPQExpBuffer(tmpbuf, _(", predicate (%s)"), indpred);
      if (strcmp(indisclustered, "t") == 0)
        appendPQExpBufferStr(tmpbuf, _(", clustered"));
      if (strcmp(indisvalid, "t") != 0)
        appendPQExpBufferStr(tmpbuf, _(", invalid"));
      if (strcmp(deferrable, "t") == 0)
        appendPQExpBufferStr(tmpbuf, _(", deferrable"));
      if (strcmp(deferred, "t") == 0)
        appendPQExpBufferStr(tmpbuf, _(", initially deferred"));
      if (strcmp(indisreplident, "t") == 0)
        appendPQExpBufferStr(tmpbuf, _(", replica identity"));
      printTableAddFooter(cont, tmpbuf.data);
      if (tableinfo.relkind == RELKIND_INDEX)
        await add_tablespace_footer(
          cont,
          tableinfo.relkind,
          tableinfo.tablespace,
          true
        );
    }
  } else if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_INDEX || tableinfo.relkind == RELKIND_TOASTVALUE) {
    let result = NULL;
    let tuples = 0;
    if (tableinfo.hasindex) {
      printfPQExpBuffer(
        buf,
        "SELECT c2.relname, i.indisprimary, i.indisunique, i.indisclustered, i.indisvalid, pg_catalog.pg_get_indexdef(i.indexrelid, 0, true),\n  pg_catalog.pg_get_constraintdef(con.oid, true), contype, condeferrable, condeferred"
      );
      if (pset.sversion >= 90400)
        appendPQExpBufferStr(buf, ", i.indisreplident");
      else
        appendPQExpBufferStr(buf, ", false AS indisreplident");
      appendPQExpBufferStr(buf, ", c2.reltablespace");
      appendPQExpBuffer(
        buf,
        "\nFROM pg_catalog.pg_class c, pg_catalog.pg_class c2, pg_catalog.pg_index i\n  LEFT JOIN pg_catalog.pg_constraint con ON (conrelid = i.indrelid AND conindid = i.indexrelid AND contype IN ('p','u','x'))\nWHERE c.oid = '%s' AND c.oid = i.indrelid AND i.indexrelid = c2.oid\nORDER BY i.indisprimary DESC, c2.relname;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        printTableAddFooter(cont, _("Indexes:"));
        for (i = 0; i < tuples; i++) {
          printfPQExpBuffer(
            buf,
            '    "%s"',
            PQgetvalue(result, i, 0)
          );
          if (strcmp(PQgetvalue(result, i, 7), "x") == 0) {
            appendPQExpBuffer(
              buf,
              " %s",
              PQgetvalue(result, i, 6)
            );
          } else {
            let indexdef;
            let usingpos;
            if (strcmp(PQgetvalue(result, i, 1), "t") == 0)
              appendPQExpBufferStr(buf, " PRIMARY KEY,");
            else if (strcmp(PQgetvalue(result, i, 2), "t") == 0) {
              if (strcmp(PQgetvalue(result, i, 7), "u") == 0)
                appendPQExpBufferStr(buf, " UNIQUE CONSTRAINT,");
              else
                appendPQExpBufferStr(buf, " UNIQUE,");
            }
            indexdef = PQgetvalue(result, i, 5);
            usingpos = strstr(indexdef, " USING ");
            if (usingpos != NULL)
              indexdef = indexdef.slice(usingpos + 7);
            appendPQExpBuffer(buf, " %s", indexdef);
            if (strcmp(PQgetvalue(result, i, 8), "t") == 0)
              appendPQExpBufferStr(buf, " DEFERRABLE");
            if (strcmp(PQgetvalue(result, i, 9), "t") == 0)
              appendPQExpBufferStr(buf, " INITIALLY DEFERRED");
          }
          if (strcmp(PQgetvalue(result, i, 3), "t") == 0)
            appendPQExpBufferStr(buf, " CLUSTER");
          if (strcmp(PQgetvalue(result, i, 4), "t") != 0)
            appendPQExpBufferStr(buf, " INVALID");
          if (strcmp(PQgetvalue(result, i, 10), "t") == 0)
            appendPQExpBufferStr(buf, " REPLICA IDENTITY");
          printTableAddFooter(cont, buf.data);
          await add_tablespace_footer(
            cont,
            RELKIND_INDEX,
            atooid(PQgetvalue(result, i, 11)),
            false
          );
        }
      }
    }
    if (tableinfo.checks) {
      printfPQExpBuffer(
        buf,
        "SELECT r.conname, pg_catalog.pg_get_constraintdef(r.oid, true)\nFROM pg_catalog.pg_constraint r\nWHERE r.conrelid = '%s' AND r.contype = 'c'\nORDER BY 1;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        printTableAddFooter(cont, _("Check constraints:"));
        for (i = 0; i < tuples; i++) {
          printfPQExpBuffer(
            buf,
            '    "%s" %s',
            PQgetvalue(result, i, 0),
            PQgetvalue(result, i, 1)
          );
          printTableAddFooter(cont, buf.data);
        }
      }
    }
    if (tableinfo.hastriggers || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
      if (pset.sversion >= 12e4 && (tableinfo.ispartition || tableinfo.relkind == RELKIND_PARTITIONED_TABLE)) {
        printfPQExpBuffer(
          buf,
          "SELECT conrelid = '%s'::pg_catalog.regclass AS sametable,\n       conname,\n       pg_catalog.pg_get_constraintdef(oid, true) AS condef,\n       conrelid::pg_catalog.regclass AS ontable\n  FROM pg_catalog.pg_constraint,\n       pg_catalog.pg_partition_ancestors('%s')\n WHERE conrelid = relid AND contype = 'f' AND conparentid = 0\nORDER BY sametable DESC, conname;",
          oid,
          oid
        );
      } else {
        printfPQExpBuffer(
          buf,
          "SELECT true as sametable, conname,\n  pg_catalog.pg_get_constraintdef(r.oid, true) as condef,\n  conrelid::pg_catalog.regclass AS ontable\nFROM pg_catalog.pg_constraint r\nWHERE r.conrelid = '%s' AND r.contype = 'f'\n",
          oid
        );
        if (pset.sversion >= 12e4)
          appendPQExpBufferStr(buf, "     AND conparentid = 0\n");
        appendPQExpBufferStr(buf, "ORDER BY conname");
      }
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        let i_sametable = PQfnumber(result, "sametable"), i_conname = PQfnumber(result, "conname"), i_condef = PQfnumber(result, "condef"), i_ontable = PQfnumber(result, "ontable");
        printTableAddFooter(cont, _("Foreign-key constraints:"));
        for (i = 0; i < tuples; i++) {
          if (strcmp(PQgetvalue(result, i, i_sametable), "f") == 0)
            printfPQExpBuffer(
              buf,
              '    TABLE "%s" CONSTRAINT "%s" %s',
              PQgetvalue(result, i, i_ontable),
              PQgetvalue(result, i, i_conname),
              PQgetvalue(result, i, i_condef)
            );
          else
            printfPQExpBuffer(
              buf,
              '    "%s" %s',
              PQgetvalue(result, i, i_conname),
              PQgetvalue(result, i, i_condef)
            );
          printTableAddFooter(cont, buf.data);
        }
      }
    }
    if (tableinfo.hastriggers || tableinfo.relkind == RELKIND_PARTITIONED_TABLE) {
      if (pset.sversion >= 12e4) {
        printfPQExpBuffer(
          buf,
          "SELECT conname, conrelid::pg_catalog.regclass AS ontable,\n       pg_catalog.pg_get_constraintdef(oid, true) AS condef\n  FROM pg_catalog.pg_constraint c\n WHERE confrelid IN (SELECT pg_catalog.pg_partition_ancestors('%s')\n                     UNION ALL VALUES ('%s'::pg_catalog.regclass))\n       AND contype = 'f' AND conparentid = 0\nORDER BY conname;",
          oid,
          oid
        );
      } else {
        printfPQExpBuffer(
          buf,
          "SELECT conname, conrelid::pg_catalog.regclass AS ontable,\n       pg_catalog.pg_get_constraintdef(oid, true) AS condef\n  FROM pg_catalog.pg_constraint\n WHERE confrelid = %s AND contype = 'f'\nORDER BY conname;",
          oid
        );
      }
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        let i_conname = PQfnumber(result, "conname"), i_ontable = PQfnumber(result, "ontable"), i_condef = PQfnumber(result, "condef");
        printTableAddFooter(cont, _("Referenced by:"));
        for (i = 0; i < tuples; i++) {
          printfPQExpBuffer(
            buf,
            '    TABLE "%s" CONSTRAINT "%s" %s',
            PQgetvalue(result, i, i_ontable),
            PQgetvalue(result, i, i_conname),
            PQgetvalue(result, i, i_condef)
          );
          printTableAddFooter(cont, buf.data);
        }
      }
    }
    if (pset.sversion >= 90500) {
      printfPQExpBuffer(buf, "SELECT pol.polname,");
      if (pset.sversion >= 1e5)
        appendPQExpBufferStr(
          buf,
          " pol.polpermissive,\n"
        );
      else
        appendPQExpBufferStr(
          buf,
          " 't' as polpermissive,\n"
        );
      appendPQExpBuffer(
        buf,
        "  CASE WHEN pol.polroles = '{0}' THEN NULL ELSE pg_catalog.array_to_string(array(select rolname from pg_catalog.pg_roles where oid = any (pol.polroles) order by 1),',') END,\n  pg_catalog.pg_get_expr(pol.polqual, pol.polrelid),\n  pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid),\n  CASE pol.polcmd\n    WHEN 'r' THEN 'SELECT'\n    WHEN 'a' THEN 'INSERT'\n    WHEN 'w' THEN 'UPDATE'\n    WHEN 'd' THEN 'DELETE'\n    END AS cmd\nFROM pg_catalog.pg_policy pol\nWHERE pol.polrelid = '%s' ORDER BY 1;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tableinfo.rowsecurity && !tableinfo.forcerowsecurity && tuples > 0)
        printTableAddFooter(cont, _("Policies:"));
      if (tableinfo.rowsecurity && tableinfo.forcerowsecurity && tuples > 0)
        printTableAddFooter(cont, _("Policies (forced row security enabled):"));
      if (tableinfo.rowsecurity && !tableinfo.forcerowsecurity && tuples == 0)
        printTableAddFooter(cont, _("Policies (row security enabled): (none)"));
      if (tableinfo.rowsecurity && tableinfo.forcerowsecurity && tuples == 0)
        printTableAddFooter(cont, _("Policies (forced row security enabled): (none)"));
      if (!tableinfo.rowsecurity && tuples > 0)
        printTableAddFooter(cont, _("Policies (row security disabled):"));
      for (i = 0; i < tuples; i++) {
        printfPQExpBuffer(
          buf,
          '    POLICY "%s"',
          PQgetvalue(result, i, 0)
        );
        if (PQgetvalue(result, i, 1) == "f")
          appendPQExpBufferStr(buf, " AS RESTRICTIVE");
        if (!PQgetisnull(result, i, 5))
          appendPQExpBuffer(
            buf,
            " FOR %s",
            PQgetvalue(result, i, 5)
          );
        if (!PQgetisnull(result, i, 2)) {
          appendPQExpBuffer(
            buf,
            "\n      TO %s",
            PQgetvalue(result, i, 2)
          );
        }
        if (!PQgetisnull(result, i, 3))
          appendPQExpBuffer(
            buf,
            "\n      USING (%s)",
            PQgetvalue(result, i, 3)
          );
        if (!PQgetisnull(result, i, 4))
          appendPQExpBuffer(
            buf,
            "\n      WITH CHECK (%s)",
            PQgetvalue(result, i, 4)
          );
        printTableAddFooter(cont, buf.data);
      }
    }
    if (pset.sversion >= 14e4) {
      printfPQExpBuffer(
        buf,
        "SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS nsp, stxname,\npg_catalog.pg_get_statisticsobjdef_columns(oid) AS columns,\n  'd' = any(stxkind) AS ndist_enabled,\n  'f' = any(stxkind) AS deps_enabled,\n  'm' = any(stxkind) AS mcv_enabled,\nstxstattarget\nFROM pg_catalog.pg_statistic_ext\nWHERE stxrelid = '%s'\nORDER BY nsp, stxname;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        printTableAddFooter(cont, _("Statistics objects:"));
        for (i = 0; i < tuples; i++) {
          let gotone = false;
          let has_ndistinct;
          let has_dependencies;
          let has_mcv;
          let has_all;
          let has_some;
          has_ndistinct = strcmp(PQgetvalue(result, i, 5), "t") == 0;
          has_dependencies = strcmp(PQgetvalue(result, i, 6), "t") == 0;
          has_mcv = strcmp(PQgetvalue(result, i, 7), "t") == 0;
          printfPQExpBuffer(buf, "    ");
          appendPQExpBuffer(
            buf,
            '"%s.%s"',
            PQgetvalue(result, i, 2),
            PQgetvalue(result, i, 3)
          );
          has_all = has_ndistinct && has_dependencies && has_mcv;
          has_some = has_ndistinct || has_dependencies || has_mcv;
          if (has_some && !has_all) {
            appendPQExpBufferStr(buf, " (");
            if (has_ndistinct) {
              appendPQExpBufferStr(buf, "ndistinct");
              gotone = true;
            }
            if (has_dependencies) {
              appendPQExpBuffer(buf, "%sdependencies", gotone ? ", " : "");
              gotone = true;
            }
            if (has_mcv) {
              appendPQExpBuffer(buf, "%smcv", gotone ? ", " : "");
            }
            appendPQExpBufferChar(buf, ")");
          }
          appendPQExpBuffer(
            buf,
            " ON %s FROM %s",
            PQgetvalue(result, i, 4),
            PQgetvalue(result, i, 1)
          );
          if (strcmp(PQgetvalue(result, i, 8), "-1") != 0)
            appendPQExpBuffer(
              buf,
              "; STATISTICS %s",
              PQgetvalue(result, i, 8)
            );
          printTableAddFooter(cont, buf.data);
        }
      }
    } else if (pset.sversion >= 1e5) {
      printfPQExpBuffer(
        buf,
        "SELECT oid, stxrelid::pg_catalog.regclass, stxnamespace::pg_catalog.regnamespace AS nsp, stxname,\n  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(attname),', ')\n   FROM pg_catalog.unnest(stxkeys) s(attnum)\n   JOIN pg_catalog.pg_attribute a ON (stxrelid = a.attrelid AND\n        a.attnum = s.attnum AND NOT attisdropped)) AS columns,\n  'd' = any(stxkind) AS ndist_enabled,\n  'f' = any(stxkind) AS deps_enabled,\n  'm' = any(stxkind) AS mcv_enabled,\n"
      );
      if (pset.sversion >= 13e4)
        appendPQExpBufferStr(buf, "  stxstattarget\n");
      else
        appendPQExpBufferStr(buf, "  -1 AS stxstattarget\n");
      appendPQExpBuffer(
        buf,
        "FROM pg_catalog.pg_statistic_ext\nWHERE stxrelid = '%s'\nORDER BY 1;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        printTableAddFooter(cont, _("Statistics objects:"));
        for (i = 0; i < tuples; i++) {
          let gotone = false;
          printfPQExpBuffer(buf, "    ");
          appendPQExpBuffer(
            buf,
            '"%s.%s" (',
            PQgetvalue(result, i, 2),
            PQgetvalue(result, i, 3)
          );
          if (strcmp(PQgetvalue(result, i, 5), "t") == 0) {
            appendPQExpBufferStr(buf, "ndistinct");
            gotone = true;
          }
          if (strcmp(PQgetvalue(result, i, 6), "t") == 0) {
            appendPQExpBuffer(buf, "%sdependencies", gotone ? ", " : "");
            gotone = true;
          }
          if (strcmp(PQgetvalue(result, i, 7), "t") == 0) {
            appendPQExpBuffer(buf, "%smcv", gotone ? ", " : "");
          }
          appendPQExpBuffer(
            buf,
            ") ON %s FROM %s",
            PQgetvalue(result, i, 4),
            PQgetvalue(result, i, 1)
          );
          if (strcmp(PQgetvalue(result, i, 8), "-1") != 0)
            appendPQExpBuffer(
              buf,
              "; STATISTICS %s",
              PQgetvalue(result, i, 8)
            );
          printTableAddFooter(cont, buf.data);
        }
      }
    }
    if (tableinfo.hasrules && tableinfo.relkind != RELKIND_MATVIEW) {
      printfPQExpBuffer(
        buf,
        "SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true)), ev_enabled\nFROM pg_catalog.pg_rewrite r\nWHERE r.ev_class = '%s' ORDER BY 1;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0) {
        let have_heading;
        let category;
        for (category = 0; category < 4; category++) {
          have_heading = false;
          for (i = 0; i < tuples; i++) {
            let ruledef;
            let list_rule = false;
            switch (category) {
              case 0:
                if (PQgetvalue(result, i, 2) == "O")
                  list_rule = true;
                break;
              case 1:
                if (PQgetvalue(result, i, 2) == "D")
                  list_rule = true;
                break;
              case 2:
                if (PQgetvalue(result, i, 2) == "A")
                  list_rule = true;
                break;
              case 3:
                if (PQgetvalue(result, i, 2) == "R")
                  list_rule = true;
                break;
            }
            if (!list_rule)
              continue;
            if (!have_heading) {
              switch (category) {
                case 0:
                  printfPQExpBuffer(buf, _("Rules:"));
                  break;
                case 1:
                  printfPQExpBuffer(buf, _("Disabled rules:"));
                  break;
                case 2:
                  printfPQExpBuffer(buf, _("Rules firing always:"));
                  break;
                case 3:
                  printfPQExpBuffer(buf, _("Rules firing on replica only:"));
                  break;
              }
              printTableAddFooter(cont, buf.data);
              have_heading = true;
            }
            ruledef = PQgetvalue(result, i, 1);
            ruledef = ruledef.slice(12);
            printfPQExpBuffer(buf, "    %s", ruledef);
            printTableAddFooter(cont, buf.data);
          }
        }
      }
    }
    if (pset.sversion >= 1e5) {
      if (pset.sversion >= 15e4) {
        printfPQExpBuffer(
          buf,
          "SELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\n     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid\n     JOIN pg_catalog.pg_class pc ON pc.relnamespace = pn.pnnspid\nWHERE pc.oid ='%s' and pg_catalog.pg_relation_is_publishable('%s')\nUNION\nSELECT pubname\n     , pg_get_expr(pr.prqual, c.oid)\n     , (CASE WHEN pr.prattrs IS NOT NULL THEN\n         (SELECT string_agg(attname, ', ')\n           FROM pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,\n                pg_catalog.pg_attribute\n          WHERE attrelid = pr.prrelid AND attnum = prattrs[s])\n        ELSE NULL END) FROM pg_catalog.pg_publication p\n     JOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid\n     JOIN pg_catalog.pg_class c ON c.oid = pr.prrelid\nWHERE pr.prrelid = '%s'\nUNION\nSELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\nWHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')\nORDER BY 1;",
          oid,
          oid,
          oid,
          oid
        );
      } else {
        printfPQExpBuffer(
          buf,
          "SELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\nJOIN pg_catalog.pg_publication_rel pr ON p.oid = pr.prpubid\nWHERE pr.prrelid = '%s'\nUNION ALL\nSELECT pubname\n     , NULL\n     , NULL\nFROM pg_catalog.pg_publication p\nWHERE p.puballtables AND pg_catalog.pg_relation_is_publishable('%s')\nORDER BY 1;",
          oid,
          oid
        );
      }
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0)
        printTableAddFooter(cont, _("Publications:"));
      for (i = 0; i < tuples; i++) {
        printfPQExpBuffer(
          buf,
          '    "%s"',
          PQgetvalue(result, i, 0)
        );
        if (!PQgetisnull(result, i, 2))
          appendPQExpBuffer(
            buf,
            " (%s)",
            PQgetvalue(result, i, 2)
          );
        if (!PQgetisnull(result, i, 1))
          appendPQExpBuffer(
            buf,
            " WHERE %s",
            PQgetvalue(result, i, 1)
          );
        printTableAddFooter(cont, buf.data);
      }
    }
    if (verbose) {
      printfPQExpBuffer(
        buf,
        "SELECT co.conname, at.attname, co.connoinherit, co.conislocal,\nco.coninhcount <> 0\nFROM pg_catalog.pg_constraint co JOIN\npg_catalog.pg_attribute at ON\n(at.attnum = co.conkey[1])\nWHERE co.contype = 'n' AND\nco.conrelid = '%s'::pg_catalog.regclass AND\nat.attrelid = '%s'::pg_catalog.regclass\nORDER BY at.attnum",
        oid,
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else
        tuples = PQntuples(result);
      if (tuples > 0)
        printTableAddFooter(cont, _("Not-null constraints:"));
      for (i = 0; i < tuples; i++) {
        let islocal = PQgetvalue(result, i, 3)[0] == "t";
        let inherited = PQgetvalue(result, i, 4)[0] == "t";
        printfPQExpBuffer(
          buf,
          '    "%s" NOT NULL "%s"%s',
          PQgetvalue(result, i, 0),
          PQgetvalue(result, i, 1),
          PQgetvalue(result, i, 2)[0] == "t" ? " NO INHERIT" : islocal && inherited ? _(" (local, inherited)") : inherited ? _(" (inherited)") : ""
        );
        printTableAddFooter(cont, buf.data);
      }
    }
  }
  if ((tableinfo.relkind == RELKIND_VIEW || tableinfo.relkind == RELKIND_MATVIEW) && verbose) {
    let result;
    printfPQExpBuffer(
      buf,
      "SELECT pg_catalog.pg_get_viewdef('%s'::pg_catalog.oid, true);",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    if (PQntuples(result) > 0)
      view_def = pg_strdup(PQgetvalue(result, 0, 0));
  }
  if (view_def) {
    let result = NULL;
    printTableAddFooter(cont, _("View definition:"));
    printTableAddFooter(cont, view_def);
    if (tableinfo.hasrules) {
      printfPQExpBuffer(
        buf,
        "SELECT r.rulename, trim(trailing ';' from pg_catalog.pg_get_ruledef(r.oid, true))\nFROM pg_catalog.pg_rewrite r\nWHERE r.ev_class = '%s' AND r.rulename != '_RETURN' ORDER BY 1;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      if (PQntuples(result) > 0) {
        printTableAddFooter(cont, _("Rules:"));
        for (i = 0; i < PQntuples(result); i++) {
          let ruledef;
          ruledef = PQgetvalue(result, i, 1);
          ruledef = ruledef.slice(12);
          printfPQExpBuffer(buf, " %s", ruledef);
          printTableAddFooter(cont, buf.data);
        }
      }
    }
  }
  if (tableinfo.hastriggers) {
    let result;
    let tuples;
    printfPQExpBuffer(
      buf,
      "SELECT t.tgname, pg_catalog.pg_get_triggerdef(t.oid, true), t.tgenabled, t.tgisinternal,\n"
    );
    if (pset.sversion >= 13e4)
      appendPQExpBufferStr(
        buf,
        "  CASE WHEN t.tgparentid != 0 THEN\n    (SELECT u.tgrelid::pg_catalog.regclass\n     FROM pg_catalog.pg_trigger AS u,\n          pg_catalog.pg_partition_ancestors(t.tgrelid) WITH ORDINALITY AS a(relid, depth)\n     WHERE u.tgname = t.tgname AND u.tgrelid = a.relid\n           AND u.tgparentid = 0\n     ORDER BY a.depth LIMIT 1)\n  END AS parent\n"
      );
    else
      appendPQExpBufferStr(buf, "  NULL AS parent\n");
    appendPQExpBuffer(
      buf,
      "FROM pg_catalog.pg_trigger t\nWHERE t.tgrelid = '%s' AND ",
      oid
    );
    if (pset.sversion >= 11e4 && pset.sversion < 15e4)
      appendPQExpBufferStr(buf, "(NOT t.tgisinternal OR (t.tgisinternal AND t.tgenabled = 'D') \n    OR EXISTS (SELECT 1 FROM pg_catalog.pg_depend WHERE objid = t.oid \n        AND refclassid = 'pg_catalog.pg_trigger'::pg_catalog.regclass))");
    else
      appendPQExpBufferStr(buf, "(NOT t.tgisinternal OR (t.tgisinternal AND t.tgenabled = 'D'))");
    appendPQExpBufferStr(buf, "\nORDER BY 1;");
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    else
      tuples = PQntuples(result);
    if (tuples > 0) {
      let have_heading;
      let category;
      for (category = 0; category <= 4; category++) {
        have_heading = false;
        for (i = 0; i < tuples; i++) {
          let list_trigger;
          let tgdef;
          let usingpos;
          let tgenabled;
          let tgisinternal;
          tgenabled = PQgetvalue(result, i, 2);
          tgisinternal = PQgetvalue(result, i, 3);
          list_trigger = false;
          switch (category) {
            case 0:
              if (tgenabled == "O" || tgenabled == "t")
                list_trigger = true;
              break;
            case 1:
              if ((tgenabled == "D" || tgenabled == "f") && tgisinternal == "f")
                list_trigger = true;
              break;
            case 2:
              if ((tgenabled == "D" || tgenabled == "f") && tgisinternal == "t")
                list_trigger = true;
              break;
            case 3:
              if (tgenabled == "A")
                list_trigger = true;
              break;
            case 4:
              if (tgenabled == "R")
                list_trigger = true;
              break;
          }
          if (list_trigger == false)
            continue;
          if (have_heading == false) {
            switch (category) {
              case 0:
                printfPQExpBuffer(buf, _("Triggers:"));
                break;
              case 1:
                printfPQExpBuffer(buf, _("Disabled user triggers:"));
                break;
              case 2:
                printfPQExpBuffer(buf, _("Disabled internal triggers:"));
                break;
              case 3:
                printfPQExpBuffer(buf, _("Triggers firing always:"));
                break;
              case 4:
                printfPQExpBuffer(buf, _("Triggers firing on replica only:"));
                break;
            }
            printTableAddFooter(cont, buf.data);
            have_heading = true;
          }
          tgdef = PQgetvalue(result, i, 1);
          usingpos = strstr(tgdef, " TRIGGER ");
          if (usingpos != NULL)
            tgdef = tgdef.slice(usingpos + 9);
          printfPQExpBuffer(buf, "    %s", tgdef);
          if (!PQgetisnull(result, i, 4))
            appendPQExpBuffer(
              buf,
              ", ON TABLE %s",
              PQgetvalue(result, i, 4)
            );
          printTableAddFooter(cont, buf.data);
        }
      }
    }
  }
  if (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_MATVIEW || tableinfo.relkind == RELKIND_FOREIGN_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_INDEX || tableinfo.relkind == RELKIND_TOASTVALUE) {
    let is_partitioned;
    let result;
    let tuples;
    is_partitioned = tableinfo.relkind == RELKIND_PARTITIONED_TABLE || tableinfo.relkind == RELKIND_PARTITIONED_INDEX;
    if (tableinfo.relkind == RELKIND_FOREIGN_TABLE) {
      let ftoptions;
      printfPQExpBuffer(
        buf,
        "SELECT s.srvname,\n  pg_catalog.array_to_string(ARRAY(\n    SELECT pg_catalog.quote_ident(option_name) || ' ' || pg_catalog.quote_literal(option_value)\n    FROM pg_catalog.pg_options_to_table(ftoptions)),  ', ')\nFROM pg_catalog.pg_foreign_table f,\n     pg_catalog.pg_foreign_server s\nWHERE f.ftrelid = '%s' AND s.oid = f.ftserver;",
        oid
      );
      result = await PSQLexec(buf.data);
      if (!result)
        return retval;
      else if (PQntuples(result) != 1) {
        return retval;
      }
      printfPQExpBuffer(
        buf,
        _("Server: %s"),
        PQgetvalue(result, 0, 0)
      );
      printTableAddFooter(cont, buf.data);
      ftoptions = PQgetvalue(result, 0, 1);
      if (ftoptions && ftoptions[0] != "\0") {
        printfPQExpBuffer(buf, _("FDW options: (%s)"), ftoptions);
        printTableAddFooter(cont, buf.data);
      }
    }
    printfPQExpBuffer(
      buf,
      "SELECT c.oid::pg_catalog.regclass\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhparent AND i.inhrelid = '%s'\n  AND c.relkind != 'p' AND c.relkind != 'I'\nORDER BY inhseqno;",
      oid
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    else {
      let s = _("Inherits");
      let sw = pg_wcswidth(s, strlen(s), pset.encoding);
      tuples = PQntuples(result);
      for (i = 0; i < tuples; i++) {
        if (i == 0)
          printfPQExpBuffer(
            buf,
            "%s: %s",
            s,
            PQgetvalue(result, i, 0)
          );
        else
          printfPQExpBuffer(
            buf,
            "%*s  %s",
            sw,
            "",
            PQgetvalue(result, i, 0)
          );
        if (i < tuples - 1)
          appendPQExpBufferChar(buf, ",");
        printTableAddFooter(cont, buf.data);
      }
    }
    if (pset.sversion >= 14e4)
      printfPQExpBuffer(
        buf,
        "SELECT c.oid::pg_catalog.regclass, c.relkind, inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhrelid AND i.inhparent = '%s'\nORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;",
        oid
      );
    else if (pset.sversion >= 1e5)
      printfPQExpBuffer(
        buf,
        "SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, pg_catalog.pg_get_expr(c.relpartbound, c.oid)\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhrelid AND i.inhparent = '%s'\nORDER BY pg_catalog.pg_get_expr(c.relpartbound, c.oid) = 'DEFAULT', c.oid::pg_catalog.regclass::pg_catalog.text;",
        oid
      );
    else
      printfPQExpBuffer(
        buf,
        "SELECT c.oid::pg_catalog.regclass, c.relkind, false AS inhdetachpending, NULL\nFROM pg_catalog.pg_class c, pg_catalog.pg_inherits i\nWHERE c.oid = i.inhrelid AND i.inhparent = '%s'\nORDER BY c.oid::pg_catalog.regclass::pg_catalog.text;",
        oid
      );
    result = await PSQLexec(buf.data);
    if (!result)
      return retval;
    tuples = PQntuples(result);
    if (is_partitioned && tuples == 0) {
      printfPQExpBuffer(buf, _("Number of partitions: %d"), tuples);
      printTableAddFooter(cont, buf.data);
    } else if (!verbose) {
      if (tuples > 0) {
        if (is_partitioned)
          printfPQExpBuffer(buf, _("Number of partitions: %d (Use \\d+ to list them.)"), tuples);
        else
          printfPQExpBuffer(buf, _("Number of child tables: %d (Use \\d+ to list them.)"), tuples);
        printTableAddFooter(cont, buf.data);
      }
    } else {
      let ct = is_partitioned ? _("Partitions") : _("Child tables");
      let ctw = pg_wcswidth(ct, strlen(ct), pset.encoding);
      for (i = 0; i < tuples; i++) {
        let child_relkind = PQgetvalue(result, i, 1);
        if (i == 0)
          printfPQExpBuffer(
            buf,
            "%s: %s",
            ct,
            PQgetvalue(result, i, 0)
          );
        else
          printfPQExpBuffer(
            buf,
            "%*s  %s",
            ctw,
            "",
            PQgetvalue(result, i, 0)
          );
        if (!PQgetisnull(result, i, 3))
          appendPQExpBuffer(buf, " %s", PQgetvalue(result, i, 3));
        if (child_relkind == RELKIND_PARTITIONED_TABLE || child_relkind == RELKIND_PARTITIONED_INDEX)
          appendPQExpBufferStr(buf, ", PARTITIONED");
        else if (child_relkind == RELKIND_FOREIGN_TABLE)
          appendPQExpBufferStr(buf, ", FOREIGN");
        if (strcmp(PQgetvalue(result, i, 2), "t") == 0)
          appendPQExpBufferStr(buf, " (DETACH PENDING)");
        if (i < tuples - 1)
          appendPQExpBufferChar(buf, ",");
        printTableAddFooter(cont, buf.data);
      }
    }
    if (tableinfo.reloftype) {
      printfPQExpBuffer(buf, _("Typed table of type: %s"), tableinfo.reloftype);
      printTableAddFooter(cont, buf.data);
    }
    if (verbose && (tableinfo.relkind == RELKIND_RELATION || tableinfo.relkind == RELKIND_MATVIEW) && /*
     * No need to display default values; we already display a REPLICA
     * IDENTITY marker on indexes.
     */
    tableinfo.relreplident != "i" && (strcmp(schemaname, "pg_catalog") != 0 && tableinfo.relreplident != "d" || strcmp(schemaname, "pg_catalog") == 0 && tableinfo.relreplident != "n")) {
      let s = _("Replica Identity");
      printfPQExpBuffer(
        buf,
        "%s: %s",
        s,
        tableinfo.relreplident == "f" ? "FULL" : tableinfo.relreplident == "n" ? "NOTHING" : "???"
      );
      printTableAddFooter(cont, buf.data);
    }
    if (verbose && tableinfo.relkind != RELKIND_MATVIEW && tableinfo.hasoids)
      printTableAddFooter(cont, _("Has OIDs: yes"));
    await add_tablespace_footer(
      cont,
      tableinfo.relkind,
      tableinfo.tablespace,
      true
    );
    if (verbose && tableinfo.relam != NULL && !pset.hide_tableam) {
      printfPQExpBuffer(buf, _("Access method: %s"), tableinfo.relam);
      printTableAddFooter(cont, buf.data);
    }
  }
  if (verbose && tableinfo.reloptions && tableinfo.reloptions[0] != "\0") {
    let t = _("Options");
    printfPQExpBuffer(buf, "%s: %s", t, tableinfo.reloptions);
    printTableAddFooter(cont, buf.data);
  }
  printTable(cont, pset.queryFout, false, pset.logfile);
  retval = true;
  return retval;
}
async function add_tablespace_footer(cont, relkind, tablespace, newline) {
  if (relkind == RELKIND_RELATION || relkind == RELKIND_MATVIEW || relkind == RELKIND_INDEX || relkind == RELKIND_PARTITIONED_TABLE || relkind == RELKIND_PARTITIONED_INDEX || relkind == RELKIND_TOASTVALUE) {
    if (tablespace != 0) {
      let result = NULL;
      let buf = {
        /* struct */
      };
      initPQExpBuffer(buf);
      printfPQExpBuffer(
        buf,
        "SELECT spcname FROM pg_catalog.pg_tablespace\nWHERE oid = '%u';",
        tablespace
      );
      result = await PSQLexec(buf.data);
      if (!result) {
        return;
      }
      if (PQntuples(result) > 0) {
        if (newline) {
          printfPQExpBuffer(
            buf,
            _('Tablespace: "%s"'),
            PQgetvalue(result, 0, 0)
          );
          printTableAddFooter(cont, buf.data);
        } else {
          printfPQExpBuffer(buf, "%s", cont.footer);
          appendPQExpBuffer(
            buf,
            _(', tablespace "%s"'),
            PQgetvalue(result, 0, 0)
          );
          printTableSetFooter(cont, buf.data);
        }
      }
    }
  }
}
async function describeRoles(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let cont = {
    /* struct */
  };
  let myopt = pset.popt.topt;
  let ncols = 2;
  let nrows = 0;
  let i;
  let conns;
  let align = "l";
  let attr;
  myopt.default_footer = false;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    "SELECT r.rolname, r.rolsuper, r.rolinherit,\n  r.rolcreaterole, r.rolcreatedb, r.rolcanlogin,\n  r.rolconnlimit, r.rolvaliduntil"
  );
  if (verbose) {
    appendPQExpBufferStr(buf, "\n, pg_catalog.shobj_description(r.oid, 'pg_authid') AS description");
    ncols++;
  }
  appendPQExpBufferStr(buf, "\n, r.rolreplication");
  if (pset.sversion >= 90500) {
    appendPQExpBufferStr(buf, "\n, r.rolbypassrls");
  }
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_roles r\n");
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE r.rolname !~ '^pg_'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "r.rolname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  nrows = PQntuples(res);
  attr = [];
  printTableInit(cont, myopt, _("List of roles"), ncols, nrows);
  printTableAddHeader(cont, gettext_noop("Role name"), true, align);
  printTableAddHeader(cont, gettext_noop("Attributes"), true, align);
  if (verbose)
    printTableAddHeader(cont, gettext_noop("Description"), true, align);
  for (i = 0; i < nrows; i++) {
    printTableAddCell(cont, PQgetvalue(res, i, 0), false, false);
    resetPQExpBuffer(buf);
    if (strcmp(PQgetvalue(res, i, 1), "t") == 0)
      add_role_attribute(buf, _("Superuser"));
    if (strcmp(PQgetvalue(res, i, 2), "t") != 0)
      add_role_attribute(buf, _("No inheritance"));
    if (strcmp(PQgetvalue(res, i, 3), "t") == 0)
      add_role_attribute(buf, _("Create role"));
    if (strcmp(PQgetvalue(res, i, 4), "t") == 0)
      add_role_attribute(buf, _("Create DB"));
    if (strcmp(PQgetvalue(res, i, 5), "t") != 0)
      add_role_attribute(buf, _("Cannot login"));
    if (strcmp(PQgetvalue(res, i, verbose ? 9 : 8), "t") == 0)
      add_role_attribute(buf, _("Replication"));
    if (pset.sversion >= 90500) {
      if (strcmp(PQgetvalue(res, i, verbose ? 10 : 9), "t") == 0)
        add_role_attribute(buf, _("Bypass RLS"));
    }
    conns = atoi(PQgetvalue(res, i, 6));
    if (conns >= 0) {
      if (buf.len > 0)
        appendPQExpBufferChar(buf, "\n");
      if (conns == 0)
        appendPQExpBufferStr(buf, _("No connections"));
      else
        appendPQExpBuffer(
          buf,
          ngettext(
            "%d connection",
            "%d connections",
            conns
          ),
          conns
        );
    }
    if (strcmp(PQgetvalue(res, i, 7), "") != 0) {
      if (buf.len > 0)
        appendPQExpBufferChar(buf, "\n");
      appendPQExpBufferStr(buf, _("Password valid until "));
      appendPQExpBufferStr(buf, PQgetvalue(res, i, 7));
    }
    attr[i] = pg_strdup(buf.data);
    printTableAddCell(cont, attr[i], false, false);
    if (verbose)
      printTableAddCell(cont, PQgetvalue(res, i, 8), false, false);
  }
  printTable(cont, pset.queryFout, false, pset.logfile);
  return true;
}
function add_role_attribute(buf, str) {
  if (buf.len > 0)
    appendPQExpBufferStr(buf, ", ");
  appendPQExpBufferStr(buf, str);
}
async function listDbRoleSettings(pattern, pattern2) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let havewhere = {};
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT rolname AS "%s", datname AS "%s",
pg_catalog.array_to_string(setconfig, E'\\n') AS "%s"
FROM pg_catalog.pg_db_role_setting s
LEFT JOIN pg_catalog.pg_database d ON d.oid = setdatabase
LEFT JOIN pg_catalog.pg_roles r ON r.oid = setrole
`,
    gettext_noop("Role"),
    gettext_noop("Database"),
    gettext_noop("Settings")
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "r.rolname",
    NULL,
    NULL,
    havewhere,
    1
  ))
    return false;
  if (!validateSQLNamePattern(
    buf,
    pattern2,
    havewhere.value,
    false,
    NULL,
    "d.datname",
    NULL,
    NULL,
    NULL,
    1
  ))
    return false;
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  if (PQntuples(res) == 0 && !pset.quiet) {
    if (pattern && pattern2)
      pg_log_error(
        'Did not find any settings for role "%s" and database "%s".',
        pattern,
        pattern2
      );
    else if (pattern)
      pg_log_error(
        'Did not find any settings for role "%s".',
        pattern
      );
    else
      pg_log_error("Did not find any settings.");
  } else {
    myopt.nullPrint = NULL;
    myopt.title = _("List of settings");
    myopt.translate_header = true;
    printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  }
  return true;
}
async function describeRoleGrants(pattern, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT m.rolname AS "%s", r.rolname AS "%s",
  pg_catalog.concat_ws(', ',
`,
    gettext_noop("Role name"),
    gettext_noop("Member of")
  );
  if (pset.sversion >= 16e4)
    appendPQExpBufferStr(
      buf,
      "    CASE WHEN pam.admin_option THEN 'ADMIN' END,\n    CASE WHEN pam.inherit_option THEN 'INHERIT' END,\n    CASE WHEN pam.set_option THEN 'SET' END\n"
    );
  else
    appendPQExpBufferStr(
      buf,
      "    CASE WHEN pam.admin_option THEN 'ADMIN' END,\n    CASE WHEN m.rolinherit THEN 'INHERIT' END,\n    'SET'\n"
    );
  appendPQExpBuffer(
    buf,
    '  ) AS "%s",\n  g.rolname AS "%s"\n',
    gettext_noop("Options"),
    gettext_noop("Grantor")
  );
  appendPQExpBufferStr(
    buf,
    "FROM pg_catalog.pg_roles m\n     JOIN pg_catalog.pg_auth_members pam ON (pam.member = m.oid)\n     LEFT JOIN pg_catalog.pg_roles r ON (pam.roleid = r.oid)\n     LEFT JOIN pg_catalog.pg_roles g ON (pam.grantor = g.oid)\n"
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE m.rolname !~ '^pg_'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "m.rolname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;\n");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of role grants");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTables(tabtypes, pattern, verbose, showSystem) {
  let showTables = strchr(tabtypes, "t") != NULL;
  let showIndexes = strchr(tabtypes, "i") != NULL;
  let showViews = strchr(tabtypes, "v") != NULL;
  let showMatViews = strchr(tabtypes, "m") != NULL;
  let showSeq = strchr(tabtypes, "s") != NULL;
  let showForeign = strchr(tabtypes, "E") != NULL;
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let cols_so_far;
  let translate_columns = [false, false, true, false, false, false, false, false, false];
  if (!(showTables || showIndexes || showViews || showMatViews || showSeq || showForeign))
    showTables = showViews = showMatViews = showSeq = showForeign = true;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT n.nspname as "%s",
  c.relname as "%s",
  CASE c.relkind WHEN 'r' THEN '%s' WHEN 'v' THEN '%s' WHEN 'm' THEN '%s' WHEN 'i' THEN '%s' WHEN 'S' THEN '%s' WHEN 't' THEN '%s' WHEN 'f' THEN '%s' WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s",
  pg_catalog.pg_get_userbyid(c.relowner) as "%s"`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("table"),
    gettext_noop("view"),
    gettext_noop("materialized view"),
    gettext_noop("index"),
    gettext_noop("sequence"),
    gettext_noop("TOAST table"),
    gettext_noop("foreign table"),
    gettext_noop("partitioned table"),
    gettext_noop("partitioned index"),
    gettext_noop("Type"),
    gettext_noop("Owner")
  );
  cols_so_far = 4;
  if (showIndexes) {
    appendPQExpBuffer(
      buf,
      ',\n  c2.relname as "%s"',
      gettext_noop("Table")
    );
    cols_so_far++;
  }
  if (verbose) {
    appendPQExpBuffer(
      buf,
      `,
  CASE c.relpersistence WHEN 'p' THEN '%s' WHEN 't' THEN '%s' WHEN 'u' THEN '%s' END as "%s"`,
      gettext_noop("permanent"),
      gettext_noop("temporary"),
      gettext_noop("unlogged"),
      gettext_noop("Persistence")
    );
    translate_columns[cols_so_far] = true;
    if (pset.sversion >= 12e4 && !pset.hide_tableam && (showTables || showMatViews || showIndexes))
      appendPQExpBuffer(
        buf,
        ',\n  am.amname as "%s"',
        gettext_noop("Access method")
      );
    appendPQExpBuffer(
      buf,
      `,
  pg_catalog.pg_size_pretty(pg_catalog.pg_table_size(c.oid)) as "%s",
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,
      gettext_noop("Size"),
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace"
  );
  if (pset.sversion >= 12e4 && !pset.hide_tableam && (showTables || showMatViews || showIndexes))
    appendPQExpBufferStr(
      buf,
      "\n     LEFT JOIN pg_catalog.pg_am am ON am.oid = c.relam"
    );
  if (showIndexes)
    appendPQExpBufferStr(
      buf,
      "\n     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid\n     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid"
    );
  appendPQExpBufferStr(buf, "\nWHERE c.relkind IN (");
  if (showTables) {
    appendPQExpBufferStr(
      buf,
      "'r','p',"
    );
    if (showSystem || pattern)
      appendPQExpBufferStr(
        buf,
        "'t',"
      );
  }
  if (showViews)
    appendPQExpBufferStr(
      buf,
      "'v',"
    );
  if (showMatViews)
    appendPQExpBufferStr(
      buf,
      "'m',"
    );
  if (showIndexes)
    appendPQExpBufferStr(
      buf,
      "'i','I',"
    );
  if (showSeq)
    appendPQExpBufferStr(
      buf,
      "'S',"
    );
  if (showSystem || pattern)
    appendPQExpBufferStr(buf, "'s',");
  if (showForeign)
    appendPQExpBufferStr(
      buf,
      "'f',"
    );
  appendPQExpBufferStr(buf, "''");
  appendPQExpBufferStr(buf, ")\n");
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname !~ '^pg_toast'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "c.relname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1,2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  if (PQntuples(res) == 0 && !pset.quiet) {
    if (pattern)
      pg_log_error(
        'Did not find any relation named "%s".',
        pattern
      );
    else
      pg_log_error("Did not find any relations.");
  } else {
    myopt.nullPrint = NULL;
    myopt.title = _("List of relations");
    myopt.translate_header = true;
    myopt.translate_columns = translate_columns;
    myopt.n_translate_columns = lengthof(translate_columns);
    printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  }
  return true;
}
async function listPartitionedTables(reltypes, pattern, verbose) {
  let showTables = strchr(reltypes, "t") != NULL;
  let showIndexes = strchr(reltypes, "i") != NULL;
  let showNested = strchr(reltypes, "n") != NULL;
  let buf = {
    /* struct */
  };
  let title = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, false, false, false, false, false, false];
  let tabletitle;
  let mixed_output = false;
  if (pset.sversion < 1e5) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support declarative table partitioning.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  if (!showTables && !showIndexes)
    showTables = showIndexes = true;
  if (showIndexes && !showTables)
    tabletitle = _("List of partitioned indexes");
  else if (showTables && !showIndexes)
    tabletitle = _("List of partitioned tables");
  else {
    tabletitle = _("List of partitioned relations");
    mixed_output = true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT n.nspname as "%s",\n  c.relname as "%s",\n  pg_catalog.pg_get_userbyid(c.relowner) as "%s"',
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Owner")
  );
  if (mixed_output) {
    appendPQExpBuffer(
      buf,
      `,
  CASE c.relkind WHEN 'p' THEN '%s' WHEN 'I' THEN '%s' END as "%s"`,
      gettext_noop("partitioned table"),
      gettext_noop("partitioned index"),
      gettext_noop("Type")
    );
    translate_columns[3] = true;
  }
  if (showNested || pattern)
    appendPQExpBuffer(
      buf,
      ',\n  inh.inhparent::pg_catalog.regclass as "%s"',
      gettext_noop("Parent name")
    );
  if (showIndexes)
    appendPQExpBuffer(
      buf,
      ',\n c2.oid::pg_catalog.regclass as "%s"',
      gettext_noop("Table")
    );
  if (verbose) {
    if (showNested) {
      appendPQExpBuffer(
        buf,
        ',\n  s.dps as "%s"',
        gettext_noop("Leaf partition size")
      );
      appendPQExpBuffer(
        buf,
        ',\n  s.tps as "%s"',
        gettext_noop("Total size")
      );
    } else
      appendPQExpBuffer(
        buf,
        ',\n  s.tps as "%s"',
        gettext_noop("Total size")
      );
    appendPQExpBuffer(
      buf,
      `,
  pg_catalog.obj_description(c.oid, 'pg_class') as "%s"`,
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_class c\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace"
  );
  if (showIndexes)
    appendPQExpBufferStr(
      buf,
      "\n     LEFT JOIN pg_catalog.pg_index i ON i.indexrelid = c.oid\n     LEFT JOIN pg_catalog.pg_class c2 ON i.indrelid = c2.oid"
    );
  if (showNested || pattern)
    appendPQExpBufferStr(
      buf,
      "\n     LEFT JOIN pg_catalog.pg_inherits inh ON c.oid = inh.inhrelid"
    );
  if (verbose) {
    if (pset.sversion < 12e4) {
      appendPQExpBufferStr(
        buf,
        ",\n     LATERAL (WITH RECURSIVE d\n                AS (SELECT inhrelid AS oid, 1 AS level\n                      FROM pg_catalog.pg_inherits\n                     WHERE inhparent = c.oid\n                    UNION ALL\n                    SELECT inhrelid, level + 1\n                      FROM pg_catalog.pg_inherits i\n                           JOIN d ON i.inhparent = d.oid)\n                SELECT pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(d.oid))) AS tps,\n                       pg_catalog.pg_size_pretty(sum(\n             CASE WHEN d.level = 1 THEN pg_catalog.pg_table_size(d.oid) ELSE 0 END)) AS dps\n               FROM d) s"
      );
    } else {
      appendPQExpBufferStr(
        buf,
        ",\n     LATERAL (SELECT pg_catalog.pg_size_pretty(sum(\n                 CASE WHEN ppt.isleaf AND ppt.level = 1\n                      THEN pg_catalog.pg_table_size(ppt.relid) ELSE 0 END)) AS dps,\n                     pg_catalog.pg_size_pretty(sum(pg_catalog.pg_table_size(ppt.relid))) AS tps\n              FROM pg_catalog.pg_partition_tree(c.oid) ppt) s"
      );
    }
  }
  appendPQExpBufferStr(buf, "\nWHERE c.relkind IN (");
  if (showTables)
    appendPQExpBufferStr(
      buf,
      "'p',"
    );
  if (showIndexes)
    appendPQExpBufferStr(
      buf,
      "'I',"
    );
  appendPQExpBufferStr(buf, "''");
  appendPQExpBufferStr(buf, ")\n");
  appendPQExpBufferStr(buf, !showNested && !pattern ? " AND NOT c.relispartition\n" : "");
  if (!pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname !~ '^pg_toast'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "c.relname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBuffer(
    buf,
    'ORDER BY "Schema", %s%s"Name";',
    mixed_output ? '"Type" DESC, ' : "",
    showNested || pattern ? '"Parent name" NULLS FIRST, ' : ""
  );
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  initPQExpBuffer(title);
  appendPQExpBufferStr(title, tabletitle);
  myopt.nullPrint = NULL;
  myopt.title = title.data;
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listLanguages(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT l.lanname AS "%s",\n       pg_catalog.pg_get_userbyid(l.lanowner) as "%s",\n       l.lanpltrusted AS "%s"',
    gettext_noop("Name"),
    gettext_noop("Owner"),
    gettext_noop("Trusted")
  );
  if (verbose) {
    appendPQExpBuffer(
      buf,
      ',\n       NOT l.lanispl AS "%s",\n       l.lanplcallfoid::pg_catalog.regprocedure AS "%s",\n       l.lanvalidator::pg_catalog.regprocedure AS "%s",\n       l.laninline::pg_catalog.regprocedure AS "%s",\n       ',
      gettext_noop("Internal language"),
      gettext_noop("Call handler"),
      gettext_noop("Validator"),
      gettext_noop("Inline handler")
    );
    await printACLColumn(buf, "l.lanacl");
  }
  appendPQExpBuffer(
    buf,
    ',\n       d.description AS "%s"\nFROM pg_catalog.pg_language l\nLEFT JOIN pg_catalog.pg_description d\n  ON d.classoid = l.tableoid AND d.objoid = l.oid\n  AND d.objsubid = 0\n',
    gettext_noop("Description")
  );
  if (pattern) {
    if (!validateSQLNamePattern(
      buf,
      pattern,
      false,
      false,
      NULL,
      "l.lanname",
      NULL,
      NULL,
      NULL,
      2
    )) {
      return false;
    }
  }
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "WHERE l.lanplcallfoid != 0\n");
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of languages");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listDomains(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT n.nspname as "%s",
       t.typname as "%s",
       pg_catalog.format_type(t.typbasetype, t.typtypmod) as "%s",
       (SELECT c.collname FROM pg_catalog.pg_collation c, pg_catalog.pg_type bt
        WHERE c.oid = t.typcollation AND bt.oid = t.typbasetype AND t.typcollation <> bt.typcollation) as "%s",
       CASE WHEN t.typnotnull THEN 'not null' END as "%s",
       t.typdefault as "%s",
       pg_catalog.array_to_string(ARRAY(
         SELECT pg_catalog.pg_get_constraintdef(r.oid, true) FROM pg_catalog.pg_constraint r WHERE t.oid = r.contypid
       ), ' ') as "%s"`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Type"),
    gettext_noop("Collation"),
    gettext_noop("Nullable"),
    gettext_noop("Default"),
    gettext_noop("Check")
  );
  if (verbose) {
    appendPQExpBufferStr(buf, ",\n  ");
    await printACLColumn(buf, "t.typacl");
    appendPQExpBuffer(
      buf,
      ',\n       d.description as "%s"',
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_type t\n     LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "     LEFT JOIN pg_catalog.pg_description d ON d.classoid = t.tableoid AND d.objoid = t.oid AND d.objsubid = 0\n"
    );
  appendPQExpBufferStr(buf, "WHERE t.typtype = 'd'\n");
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "t.typname",
    NULL,
    "pg_catalog.pg_type_is_visible(t.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of domains");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listConversions(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, false, true, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT n.nspname AS "%s",
       c.conname AS "%s",
       pg_catalog.pg_encoding_to_char(c.conforencoding) AS "%s",
       pg_catalog.pg_encoding_to_char(c.contoencoding) AS "%s",
       CASE WHEN c.condefault THEN '%s'
       ELSE '%s' END AS "%s"`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Source"),
    gettext_noop("Destination"),
    gettext_noop("yes"),
    gettext_noop("no"),
    gettext_noop("Default?")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      ',\n       d.description AS "%s"',
      gettext_noop("Description")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_conversion c\n     JOIN pg_catalog.pg_namespace n ON n.oid = c.connamespace\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "LEFT JOIN pg_catalog.pg_description d ON d.classoid = c.tableoid\n          AND d.objoid = c.oid AND d.objsubid = 0\n"
    );
  appendPQExpBufferStr(buf, "WHERE true\n");
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "  AND n.nspname <> 'pg_catalog'\n  AND n.nspname <> 'information_schema'\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "c.conname",
    NULL,
    "pg_catalog.pg_conversion_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of conversions");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function describeConfigurationParameters(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT s.name AS "%s", pg_catalog.current_setting(s.name) AS "%s"',
    gettext_noop("Parameter"),
    gettext_noop("Value")
  );
  if (verbose) {
    appendPQExpBuffer(
      buf,
      ', s.vartype AS "%s", s.context AS "%s", ',
      gettext_noop("Type"),
      gettext_noop("Context")
    );
    if (pset.sversion >= 15e4)
      await printACLColumn(buf, "p.paracl");
    else
      appendPQExpBuffer(
        buf,
        'NULL AS "%s"',
        gettext_noop("Access privileges")
      );
  }
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_settings s\n");
  if (verbose && pset.sversion >= 15e4)
    appendPQExpBufferStr(
      buf,
      "  LEFT JOIN pg_catalog.pg_parameter_acl p\n  ON pg_catalog.lower(s.name) = p.parname\n"
    );
  if (pattern)
    processSQLNamePattern(
      pset.db,
      buf,
      pattern,
      false,
      false,
      NULL,
      "pg_catalog.lower(s.name)",
      NULL,
      NULL,
      NULL,
      NULL
    );
  else
    appendPQExpBufferStr(buf, "WHERE s.source <> 'default' AND\n      s.setting IS DISTINCT FROM s.boot_val\n");
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  if (pattern)
    myopt.title = _("List of configuration parameters");
  else
    myopt.title = _("List of non-default configuration parameters");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listEventTriggers(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, true, false, false, false];
  if (pset.sversion < 90300) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support event triggers.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT evtname as "%s", evtevent as "%s", pg_catalog.pg_get_userbyid(e.evtowner) as "%s",
 case evtenabled when 'O' then '%s'  when 'R' then '%s'  when 'A' then '%s'  when 'D' then '%s' end as "%s",
 e.evtfoid::pg_catalog.regproc as "%s", pg_catalog.array_to_string(array(select x from pg_catalog.unnest(evttags) as t(x)), ', ') as "%s"`,
    gettext_noop("Name"),
    gettext_noop("Event"),
    gettext_noop("Owner"),
    gettext_noop("enabled"),
    gettext_noop("replica"),
    gettext_noop("always"),
    gettext_noop("disabled"),
    gettext_noop("Enabled"),
    gettext_noop("Function"),
    gettext_noop("Tags")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      `,
pg_catalog.obj_description(e.oid, 'pg_event_trigger') as "%s"`,
      gettext_noop("Description")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_event_trigger e "
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "evtname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of event triggers");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listExtendedStats(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  if (pset.sversion < 1e5) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support extended statistics.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT \nes.stxnamespace::pg_catalog.regnamespace::pg_catalog.text AS "%s", \nes.stxname AS "%s", \n',
    gettext_noop("Schema"),
    gettext_noop("Name")
  );
  if (pset.sversion >= 14e4)
    appendPQExpBuffer(
      buf,
      `pg_catalog.format('%%s FROM %%s', 
  pg_catalog.pg_get_statisticsobjdef_columns(es.oid), 
  es.stxrelid::pg_catalog.regclass) AS "%s"`,
      gettext_noop("Definition")
    );
  else
    appendPQExpBuffer(
      buf,
      `pg_catalog.format('%%s FROM %%s', 
  (SELECT pg_catalog.string_agg(pg_catalog.quote_ident(a.attname),', ') 
   FROM pg_catalog.unnest(es.stxkeys) s(attnum) 
   JOIN pg_catalog.pg_attribute a 
   ON (es.stxrelid = a.attrelid 
   AND a.attnum = s.attnum 
   AND NOT a.attisdropped)), 
es.stxrelid::pg_catalog.regclass) AS "%s"`,
      gettext_noop("Definition")
    );
  appendPQExpBuffer(
    buf,
    `,
CASE WHEN 'd' = any(es.stxkind) THEN 'defined' 
END AS "%s", 
CASE WHEN 'f' = any(es.stxkind) THEN 'defined' 
END AS "%s"`,
    gettext_noop("Ndistinct"),
    gettext_noop("Dependencies")
  );
  if (pset.sversion >= 12e4) {
    appendPQExpBuffer(
      buf,
      `,
CASE WHEN 'm' = any(es.stxkind) THEN 'defined' 
END AS "%s" `,
      gettext_noop("MCV")
    );
  }
  appendPQExpBufferStr(
    buf,
    " \nFROM pg_catalog.pg_statistic_ext es \n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "es.stxnamespace::pg_catalog.regnamespace::pg_catalog.text",
    "es.stxname",
    NULL,
    "pg_catalog.pg_statistics_obj_is_visible(es.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of extended statistics");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listCasts(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, true, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT pg_catalog.format_type(castsource, NULL) AS "%s",\n       pg_catalog.format_type(casttarget, NULL) AS "%s",\n',
    gettext_noop("Source type"),
    gettext_noop("Target type")
  );
  appendPQExpBuffer(
    buf,
    `       CASE WHEN c.castmethod = '%c' THEN '(binary coercible)'
            WHEN c.castmethod = '%c' THEN '(with inout)'
            ELSE p.proname
       END AS "%s",
`,
    COERCION_METHOD_BINARY,
    COERCION_METHOD_INOUT,
    gettext_noop("Function")
  );
  appendPQExpBuffer(
    buf,
    `       CASE WHEN c.castcontext = '%c' THEN '%s'
            WHEN c.castcontext = '%c' THEN '%s'
            ELSE '%s'
       END AS "%s"`,
    COERCION_CODE_EXPLICIT,
    gettext_noop("no"),
    COERCION_CODE_ASSIGNMENT,
    gettext_noop("in assignment"),
    gettext_noop("yes"),
    gettext_noop("Implicit?")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      ',\n       d.description AS "%s"',
      gettext_noop("Description")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_cast c LEFT JOIN pg_catalog.pg_proc p\n     ON c.castfunc = p.oid\n     LEFT JOIN pg_catalog.pg_type ts\n     ON c.castsource = ts.oid\n     LEFT JOIN pg_catalog.pg_namespace ns\n     ON ns.oid = ts.typnamespace\n     LEFT JOIN pg_catalog.pg_type tt\n     ON c.casttarget = tt.oid\n     LEFT JOIN pg_catalog.pg_namespace nt\n     ON nt.oid = tt.typnamespace\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "     LEFT JOIN pg_catalog.pg_description d\n     ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0\n"
    );
  appendPQExpBufferStr(buf, "WHERE ( (true");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "ns.nspname",
    "ts.typname",
    "pg_catalog.format_type(ts.oid, NULL)",
    "pg_catalog.pg_type_is_visible(ts.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBufferStr(buf, ") OR (true");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "nt.nspname",
    "tt.typname",
    "pg_catalog.format_type(tt.oid, NULL)",
    "pg_catalog.pg_type_is_visible(tt.oid)",
    NULL,
    3
  ))
    return false;
  appendPQExpBufferStr(buf, ") )\nORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of casts");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listCollations(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, false, false, false, false, true, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT\n  n.nspname AS "%s",\n  c.collname AS "%s",\n',
    gettext_noop("Schema"),
    gettext_noop("Name")
  );
  if (pset.sversion >= 1e5)
    appendPQExpBuffer(
      buf,
      `  CASE c.collprovider WHEN 'd' THEN 'default' WHEN 'c' THEN 'libc' WHEN 'i' THEN 'icu' END AS "%s",
`,
      gettext_noop("Provider")
    );
  else
    appendPQExpBuffer(
      buf,
      `  'libc' AS "%s",
`,
      gettext_noop("Provider")
    );
  appendPQExpBuffer(
    buf,
    '  c.collcollate AS "%s",\n  c.collctype AS "%s",\n',
    gettext_noop("Collate"),
    gettext_noop("Ctype")
  );
  if (pset.sversion >= 15e4)
    appendPQExpBuffer(
      buf,
      '  c.colliculocale AS "%s",\n',
      gettext_noop("ICU Locale")
    );
  else
    appendPQExpBuffer(
      buf,
      '  c.collcollate AS "%s",\n',
      gettext_noop("ICU Locale")
    );
  if (pset.sversion >= 16e4)
    appendPQExpBuffer(
      buf,
      '  c.collicurules AS "%s",\n',
      gettext_noop("ICU Rules")
    );
  else
    appendPQExpBuffer(
      buf,
      '  NULL AS "%s",\n',
      gettext_noop("ICU Rules")
    );
  if (pset.sversion >= 12e4)
    appendPQExpBuffer(
      buf,
      `  CASE WHEN c.collisdeterministic THEN '%s' ELSE '%s' END AS "%s"`,
      gettext_noop("yes"),
      gettext_noop("no"),
      gettext_noop("Deterministic?")
    );
  else
    appendPQExpBuffer(
      buf,
      `  '%s' AS "%s"`,
      gettext_noop("yes"),
      gettext_noop("Deterministic?")
    );
  if (verbose)
    appendPQExpBuffer(
      buf,
      `,
  pg_catalog.obj_description(c.oid, 'pg_collation') AS "%s"`,
      gettext_noop("Description")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_collation c, pg_catalog.pg_namespace n\nWHERE n.oid = c.collnamespace\n"
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(buf, "      AND n.nspname <> 'pg_catalog'\n      AND n.nspname <> 'information_schema'\n");
  appendPQExpBufferStr(buf, "      AND c.collencoding IN (-1, pg_catalog.pg_char_to_encoding(pg_catalog.getdatabaseencoding()))\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "c.collname",
    NULL,
    "pg_catalog.pg_collation_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of collations");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listSchemas(pattern, verbose, showSystem) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let pub_schema_tuples = 0;
  let footers = NULL;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT n.nspname AS "%s",\n  pg_catalog.pg_get_userbyid(n.nspowner) AS "%s"',
    gettext_noop("Name"),
    gettext_noop("Owner")
  );
  if (verbose) {
    appendPQExpBufferStr(buf, ",\n  ");
    await printACLColumn(buf, "n.nspacl");
    appendPQExpBuffer(
      buf,
      `,
  pg_catalog.obj_description(n.oid, 'pg_namespace') AS "%s"`,
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_namespace n\n"
  );
  if (!showSystem && !pattern)
    appendPQExpBufferStr(
      buf,
      "WHERE n.nspname !~ '^pg_' AND n.nspname <> 'information_schema'\n"
    );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    !showSystem && !pattern,
    false,
    NULL,
    "n.nspname",
    NULL,
    NULL,
    NULL,
    2
  ))
    return false;
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of schemas");
  myopt.translate_header = true;
  if (pattern && pset.sversion >= 15e4) {
    let result;
    let i;
    printfPQExpBuffer(
      buf,
      "SELECT pubname \nFROM pg_catalog.pg_publication p\n     JOIN pg_catalog.pg_publication_namespace pn ON p.oid = pn.pnpubid\n     JOIN pg_catalog.pg_namespace n ON n.oid = pn.pnnspid \nWHERE n.nspname = '%s'\nORDER BY 1",
      pattern
    );
    result = await PSQLexec(buf.data);
    if (!result)
      return false;
    else
      pub_schema_tuples = PQntuples(result);
    if (pub_schema_tuples > 0) {
      footers = [];
      footers[0] = pg_strdup(_("Publications:"));
      for (i = 0; i < pub_schema_tuples; i++) {
        printfPQExpBuffer(
          buf,
          '    "%s"',
          PQgetvalue(result, i, 0)
        );
        footers[i + 1] = pg_strdup(buf.data);
      }
      footers[i + 1] = NULL;
      myopt.footers = footers;
    }
  }
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTSParsers(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  if (verbose)
    return await listTSParsersVerbose(pattern);
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
  n.nspname as "%s",
  p.prsname as "%s",
  pg_catalog.obj_description(p.oid, 'pg_ts_parser') as "%s"
FROM pg_catalog.pg_ts_parser p
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace
`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Description")
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "n.nspname",
    "p.prsname",
    NULL,
    "pg_catalog.pg_ts_parser_is_visible(p.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of text search parsers");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTSParsersVerbose(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let i;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    "SELECT p.oid,\n  n.nspname,\n  p.prsname\nFROM pg_catalog.pg_ts_parser p\nLEFT JOIN pg_catalog.pg_namespace n ON n.oid = p.prsnamespace\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "n.nspname",
    "p.prsname",
    NULL,
    "pg_catalog.pg_ts_parser_is_visible(p.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  if (PQntuples(res) == 0) {
    if (!pset.quiet) {
      if (pattern)
        pg_log_error(
          'Did not find any text search parser named "%s".',
          pattern
        );
      else
        pg_log_error("Did not find any text search parsers.");
    }
    return false;
  }
  for (i = 0; i < PQntuples(res); i++) {
    let oid;
    let nspname = NULL;
    let prsname;
    oid = PQgetvalue(res, i, 0);
    if (!PQgetisnull(res, i, 1))
      nspname = PQgetvalue(res, i, 1);
    prsname = PQgetvalue(res, i, 2);
    if (!await describeOneTSParser(oid, nspname, prsname)) {
      return false;
    }
    if (cancel_pressed) {
      return false;
    }
  }
  return true;
}
async function describeOneTSParser(oid, nspname, prsname) {
  let buf = {
    /* struct */
  };
  let res;
  let title = {
    /* struct */
  };
  let myopt = pset.popt;
  let translate_columns = [true, false, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT '%s' AS "%s",
   p.prsstart::pg_catalog.regproc AS "%s",
   pg_catalog.obj_description(p.prsstart, 'pg_proc') as "%s"
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prstoken::pg_catalog.regproc,
   pg_catalog.obj_description(p.prstoken, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prsend::pg_catalog.regproc,
   pg_catalog.obj_description(p.prsend, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prsheadline::pg_catalog.regproc,
   pg_catalog.obj_description(p.prsheadline, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s'
UNION ALL
SELECT '%s',
   p.prslextype::pg_catalog.regproc,
   pg_catalog.obj_description(p.prslextype, 'pg_proc')
 FROM pg_catalog.pg_ts_parser p
 WHERE p.oid = '%s';`,
    gettext_noop("Start parse"),
    gettext_noop("Method"),
    gettext_noop("Function"),
    gettext_noop("Description"),
    oid,
    gettext_noop("Get next token"),
    oid,
    gettext_noop("End parse"),
    oid,
    gettext_noop("Get headline"),
    oid,
    gettext_noop("Get token types"),
    oid
  );
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  initPQExpBuffer(title);
  if (nspname)
    printfPQExpBuffer(
      title,
      _('Text search parser "%s.%s"'),
      nspname,
      prsname
    );
  else
    printfPQExpBuffer(title, _('Text search parser "%s"'), prsname);
  myopt.title = title.data;
  myopt.footers = NULL;
  myopt.topt.default_footer = false;
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT t.alias as "%s",
  t.description as "%s"
FROM pg_catalog.ts_token_type( '%s'::pg_catalog.oid ) as t
ORDER BY 1;`,
    gettext_noop("Token name"),
    gettext_noop("Description"),
    oid
  );
  res = await PSQLexec(buf.data);
  if (!res) {
    return false;
  }
  myopt.nullPrint = NULL;
  if (nspname)
    printfPQExpBuffer(
      title,
      _('Token types for parser "%s.%s"'),
      nspname,
      prsname
    );
  else
    printfPQExpBuffer(title, _('Token types for parser "%s"'), prsname);
  myopt.title = title.data;
  myopt.footers = NULL;
  myopt.topt.default_footer = true;
  myopt.translate_header = true;
  myopt.translate_columns = NULL;
  myopt.n_translate_columns = 0;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTSDictionaries(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT\n  n.nspname as "%s",\n  d.dictname as "%s",\n',
    gettext_noop("Schema"),
    gettext_noop("Name")
  );
  if (verbose) {
    appendPQExpBuffer(
      buf,
      `  ( SELECT COALESCE(nt.nspname, '(null)')::pg_catalog.text || '.' || t.tmplname FROM
    pg_catalog.pg_ts_template t
    LEFT JOIN pg_catalog.pg_namespace nt ON nt.oid = t.tmplnamespace
    WHERE d.dicttemplate = t.oid ) AS  "%s",
  d.dictinitoption as "%s",
`,
      gettext_noop("Template"),
      gettext_noop("Init options")
    );
  }
  appendPQExpBuffer(
    buf,
    `  pg_catalog.obj_description(d.oid, 'pg_ts_dict') as "%s"
`,
    gettext_noop("Description")
  );
  appendPQExpBufferStr(buf, "FROM pg_catalog.pg_ts_dict d\nLEFT JOIN pg_catalog.pg_namespace n ON n.oid = d.dictnamespace\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "n.nspname",
    "d.dictname",
    NULL,
    "pg_catalog.pg_ts_dict_is_visible(d.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of text search dictionaries");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTSTemplates(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  if (verbose)
    printfPQExpBuffer(
      buf,
      `SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  t.tmplinit::pg_catalog.regproc AS "%s",
  t.tmpllexize::pg_catalog.regproc AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,
      gettext_noop("Schema"),
      gettext_noop("Name"),
      gettext_noop("Init"),
      gettext_noop("Lexize"),
      gettext_noop("Description")
    );
  else
    printfPQExpBuffer(
      buf,
      `SELECT
  n.nspname AS "%s",
  t.tmplname AS "%s",
  pg_catalog.obj_description(t.oid, 'pg_ts_template') AS "%s"
`,
      gettext_noop("Schema"),
      gettext_noop("Name"),
      gettext_noop("Description")
    );
  appendPQExpBufferStr(buf, "FROM pg_catalog.pg_ts_template t\nLEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.tmplnamespace\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "n.nspname",
    "t.tmplname",
    NULL,
    "pg_catalog.pg_ts_template_is_visible(t.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of text search templates");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTSConfigs(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  if (verbose)
    return await listTSConfigsVerbose(pattern);
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
   n.nspname as "%s",
   c.cfgname as "%s",
   pg_catalog.obj_description(c.oid, 'pg_ts_config') as "%s"
FROM pg_catalog.pg_ts_config c
LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace
`,
    gettext_noop("Schema"),
    gettext_noop("Name"),
    gettext_noop("Description")
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "n.nspname",
    "c.cfgname",
    NULL,
    "pg_catalog.pg_ts_config_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of text search configurations");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listTSConfigsVerbose(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let i;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    "SELECT c.oid, c.cfgname,\n   n.nspname,\n   p.prsname,\n   np.nspname as pnspname\nFROM pg_catalog.pg_ts_config c\n   LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.cfgnamespace,\n pg_catalog.pg_ts_parser p\n   LEFT JOIN pg_catalog.pg_namespace np ON np.oid = p.prsnamespace\nWHERE  p.oid = c.cfgparser\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    "n.nspname",
    "c.cfgname",
    NULL,
    "pg_catalog.pg_ts_config_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 3, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  if (PQntuples(res) == 0) {
    if (!pset.quiet) {
      if (pattern)
        pg_log_error(
          'Did not find any text search configuration named "%s".',
          pattern
        );
      else
        pg_log_error("Did not find any text search configurations.");
    }
    return false;
  }
  for (i = 0; i < PQntuples(res); i++) {
    let oid;
    let cfgname;
    let nspname = NULL;
    let prsname;
    let pnspname = NULL;
    oid = PQgetvalue(res, i, 0);
    cfgname = PQgetvalue(res, i, 1);
    if (!PQgetisnull(res, i, 2))
      nspname = PQgetvalue(res, i, 2);
    prsname = PQgetvalue(res, i, 3);
    if (!PQgetisnull(res, i, 4))
      pnspname = PQgetvalue(res, i, 4);
    if (!await describeOneTSConfig(oid, nspname, cfgname, pnspname, prsname)) {
      return false;
    }
    if (cancel_pressed) {
      return false;
    }
  }
  return true;
}
async function describeOneTSConfig(oid, nspname, cfgname, pnspname, prsname) {
  let buf = {
    /* struct */
  }, title = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
  ( SELECT t.alias FROM
    pg_catalog.ts_token_type(c.cfgparser) AS t
    WHERE t.tokid = m.maptokentype ) AS "%s",
  pg_catalog.btrim(
    ARRAY( SELECT mm.mapdict::pg_catalog.regdictionary
           FROM pg_catalog.pg_ts_config_map AS mm
           WHERE mm.mapcfg = m.mapcfg AND mm.maptokentype = m.maptokentype
           ORDER BY mapcfg, maptokentype, mapseqno
    ) :: pg_catalog.text,
  '{}') AS "%s"
FROM pg_catalog.pg_ts_config AS c, pg_catalog.pg_ts_config_map AS m
WHERE c.oid = '%s' AND m.mapcfg = c.oid
GROUP BY m.mapcfg, m.maptokentype, c.cfgparser
ORDER BY 1;`,
    gettext_noop("Token"),
    gettext_noop("Dictionaries"),
    oid
  );
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  initPQExpBuffer(title);
  if (nspname)
    appendPQExpBuffer(
      title,
      _('Text search configuration "%s.%s"'),
      nspname,
      cfgname
    );
  else
    appendPQExpBuffer(
      title,
      _('Text search configuration "%s"'),
      cfgname
    );
  if (pnspname)
    appendPQExpBuffer(
      title,
      _('\nParser: "%s.%s"'),
      pnspname,
      prsname
    );
  else
    appendPQExpBuffer(
      title,
      _('\nParser: "%s"'),
      prsname
    );
  myopt.nullPrint = NULL;
  myopt.title = title.data;
  myopt.footers = NULL;
  myopt.topt.default_footer = false;
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listForeignDataWrappers(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT fdw.fdwname AS "%s",\n  pg_catalog.pg_get_userbyid(fdw.fdwowner) AS "%s",\n  fdw.fdwhandler::pg_catalog.regproc AS "%s",\n  fdw.fdwvalidator::pg_catalog.regproc AS "%s"',
    gettext_noop("Name"),
    gettext_noop("Owner"),
    gettext_noop("Handler"),
    gettext_noop("Validator")
  );
  if (verbose) {
    appendPQExpBufferStr(buf, ",\n  ");
    await printACLColumn(buf, "fdwacl");
    appendPQExpBuffer(
      buf,
      `,
 CASE WHEN fdwoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(fdwoptions)),  ', ') || ')'   END AS "%s",
  d.description AS "%s" `,
      gettext_noop("FDW options"),
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_foreign_data_wrapper fdw\n");
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "LEFT JOIN pg_catalog.pg_description d\n       ON d.classoid = fdw.tableoid AND d.objoid = fdw.oid AND d.objsubid = 0\n"
    );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "fdwname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of foreign-data wrappers");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listForeignServers(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT s.srvname AS "%s",\n  pg_catalog.pg_get_userbyid(s.srvowner) AS "%s",\n  f.fdwname AS "%s"',
    gettext_noop("Name"),
    gettext_noop("Owner"),
    gettext_noop("Foreign-data wrapper")
  );
  if (verbose) {
    appendPQExpBufferStr(buf, ",\n  ");
    await printACLColumn(buf, "s.srvacl");
    appendPQExpBuffer(
      buf,
      `,
  s.srvtype AS "%s",
  s.srvversion AS "%s",
  CASE WHEN srvoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(srvoptions)),  ', ') || ')'   END AS "%s",
  d.description AS "%s"`,
      gettext_noop("Type"),
      gettext_noop("Version"),
      gettext_noop("FDW options"),
      gettext_noop("Description")
    );
  }
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_foreign_server s\n     JOIN pg_catalog.pg_foreign_data_wrapper f ON f.oid=s.srvfdw\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "LEFT JOIN pg_catalog.pg_description d\n       ON d.classoid = s.tableoid AND d.objoid = s.oid AND d.objsubid = 0\n"
    );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "s.srvname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of foreign servers");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listUserMappings(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT um.srvname AS "%s",\n  um.usename AS "%s"',
    gettext_noop("Server"),
    gettext_noop("User name")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      `,
 CASE WHEN umoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(umoptions)),  ', ') || ')'   END AS "%s"`,
      gettext_noop("FDW options")
    );
  appendPQExpBufferStr(buf, "\nFROM pg_catalog.pg_user_mappings um\n");
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "um.srvname",
    "um.usename",
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of user mappings");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listForeignTables(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT n.nspname AS "%s",\n  c.relname AS "%s",\n  s.srvname AS "%s"',
    gettext_noop("Schema"),
    gettext_noop("Table"),
    gettext_noop("Server")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      `,
 CASE WHEN ftoptions IS NULL THEN '' ELSE   '(' || pg_catalog.array_to_string(ARRAY(SELECT   pg_catalog.quote_ident(option_name) ||  ' ' ||   pg_catalog.quote_literal(option_value)  FROM   pg_catalog.pg_options_to_table(ftoptions)),  ', ') || ')'   END AS "%s",
  d.description AS "%s"`,
      gettext_noop("FDW options"),
      gettext_noop("Description")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_foreign_table ft\n  INNER JOIN pg_catalog.pg_class c ON c.oid = ft.ftrelid\n  INNER JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace\n  INNER JOIN pg_catalog.pg_foreign_server s ON s.oid = ft.ftserver\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "   LEFT JOIN pg_catalog.pg_description d\n          ON d.classoid = c.tableoid AND d.objoid = c.oid AND d.objsubid = 0\n"
    );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    "n.nspname",
    "c.relname",
    NULL,
    "pg_catalog.pg_table_is_visible(c.oid)",
    NULL,
    3
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of foreign tables");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listExtensions(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT e.extname AS "%s", e.extversion AS "%s", n.nspname AS "%s", c.description AS "%s"
FROM pg_catalog.pg_extension e LEFT JOIN pg_catalog.pg_namespace n ON n.oid = e.extnamespace LEFT JOIN pg_catalog.pg_description c ON c.objoid = e.oid AND c.classoid = 'pg_catalog.pg_extension'::pg_catalog.regclass
`,
    gettext_noop("Name"),
    gettext_noop("Version"),
    gettext_noop("Schema"),
    gettext_noop("Description")
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "e.extname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of installed extensions");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listExtensionContents(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let i;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    "SELECT e.extname, e.oid\nFROM pg_catalog.pg_extension e\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "e.extname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  if (PQntuples(res) == 0) {
    if (!pset.quiet) {
      if (pattern)
        pg_log_error(
          'Did not find any extension named "%s".',
          pattern
        );
      else
        pg_log_error("Did not find any extensions.");
    }
    return false;
  }
  for (i = 0; i < PQntuples(res); i++) {
    let extname;
    let oid;
    extname = PQgetvalue(res, i, 0);
    oid = PQgetvalue(res, i, 1);
    if (!await listOneExtensionContents(extname, oid)) {
      return false;
    }
    if (cancel_pressed) {
      return false;
    }
  }
  return true;
}
async function listOneExtensionContents(extname, oid) {
  let buf = {
    /* struct */
  };
  let res;
  let title = {
    /* struct */
  };
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT pg_catalog.pg_describe_object(classid, objid, 0) AS "%s"
FROM pg_catalog.pg_depend
WHERE refclassid = 'pg_catalog.pg_extension'::pg_catalog.regclass AND refobjid = '%s' AND deptype = 'e'
ORDER BY 1;`,
    gettext_noop("Object description"),
    oid
  );
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  initPQExpBuffer(title);
  printfPQExpBuffer(title, _('Objects in extension "%s"'), extname);
  myopt.title = title.data;
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listPublications(pattern) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [false, false, false, false, false, false, false, false];
  if (pset.sversion < 1e5) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support publications.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT pubname AS "%s",\n  pg_catalog.pg_get_userbyid(pubowner) AS "%s",\n  puballtables AS "%s",\n  pubinsert AS "%s",\n  pubupdate AS "%s",\n  pubdelete AS "%s"',
    gettext_noop("Name"),
    gettext_noop("Owner"),
    gettext_noop("All tables"),
    gettext_noop("Inserts"),
    gettext_noop("Updates"),
    gettext_noop("Deletes")
  );
  if (pset.sversion >= 11e4)
    appendPQExpBuffer(
      buf,
      ',\n  pubtruncate AS "%s"',
      gettext_noop("Truncates")
    );
  if (pset.sversion >= 13e4)
    appendPQExpBuffer(
      buf,
      ',\n  pubviaroot AS "%s"',
      gettext_noop("Via root")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_publication\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "pubname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of publications");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function addFooterToPublicationDesc(buf, footermsg, as_schema, cont) {
  let res;
  let count = 0;
  let i = 0;
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  else
    count = PQntuples(res);
  if (count > 0)
    printTableAddFooter(cont, footermsg);
  for (i = 0; i < count; i++) {
    if (as_schema)
      printfPQExpBuffer(buf, '    "%s"', PQgetvalue(res, i, 0));
    else {
      printfPQExpBuffer(
        buf,
        '    "%s.%s"',
        PQgetvalue(res, i, 0),
        PQgetvalue(res, i, 1)
      );
      if (!PQgetisnull(res, i, 3))
        appendPQExpBuffer(buf, " (%s)", PQgetvalue(res, i, 3));
      if (!PQgetisnull(res, i, 2))
        appendPQExpBuffer(buf, " WHERE %s", PQgetvalue(res, i, 2));
    }
    printTableAddFooter(cont, buf.data);
  }
  return true;
}
async function describePublications(pattern) {
  let buf = {
    /* struct */
  };
  let i;
  let res;
  let has_pubtruncate;
  let has_pubviaroot;
  let title = {
    /* struct */
  };
  let cont = {
    /* struct */
  };
  if (pset.sversion < 1e5) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support publications.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  has_pubtruncate = pset.sversion >= 11e4;
  has_pubviaroot = pset.sversion >= 13e4;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    "SELECT oid, pubname,\n  pg_catalog.pg_get_userbyid(pubowner) AS owner,\n  puballtables, pubinsert, pubupdate, pubdelete"
  );
  if (has_pubtruncate)
    appendPQExpBufferStr(
      buf,
      ", pubtruncate"
    );
  if (has_pubviaroot)
    appendPQExpBufferStr(
      buf,
      ", pubviaroot"
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_publication\n"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    false,
    false,
    NULL,
    "pubname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 2;");
  res = await PSQLexec(buf.data);
  if (!res) {
    return false;
  }
  if (PQntuples(res) == 0) {
    if (!pset.quiet) {
      if (pattern)
        pg_log_error(
          'Did not find any publication named "%s".',
          pattern
        );
      else
        pg_log_error("Did not find any publications.");
    }
    return false;
  }
  for (i = 0; i < PQntuples(res); i++) {
    let align = "l";
    let ncols = 5;
    let nrows = 1;
    let pubid = PQgetvalue(res, i, 0);
    let pubname = PQgetvalue(res, i, 1);
    let puballtables = strcmp(PQgetvalue(res, i, 3), "t") == 0;
    let myopt = pset.popt.topt;
    if (has_pubtruncate)
      ncols++;
    if (has_pubviaroot)
      ncols++;
    initPQExpBuffer(title);
    printfPQExpBuffer(title, _("Publication %s"), pubname);
    printTableInit(cont, myopt, title.data, ncols, nrows);
    printTableAddHeader(cont, gettext_noop("Owner"), true, align);
    printTableAddHeader(cont, gettext_noop("All tables"), true, align);
    printTableAddHeader(cont, gettext_noop("Inserts"), true, align);
    printTableAddHeader(cont, gettext_noop("Updates"), true, align);
    printTableAddHeader(cont, gettext_noop("Deletes"), true, align);
    if (has_pubtruncate)
      printTableAddHeader(cont, gettext_noop("Truncates"), true, align);
    if (has_pubviaroot)
      printTableAddHeader(cont, gettext_noop("Via root"), true, align);
    printTableAddCell(cont, PQgetvalue(res, i, 2), false, false);
    printTableAddCell(cont, PQgetvalue(res, i, 3), false, false);
    printTableAddCell(cont, PQgetvalue(res, i, 4), false, false);
    printTableAddCell(cont, PQgetvalue(res, i, 5), false, false);
    printTableAddCell(cont, PQgetvalue(res, i, 6), false, false);
    if (has_pubtruncate)
      printTableAddCell(cont, PQgetvalue(res, i, 7), false, false);
    if (has_pubviaroot)
      printTableAddCell(cont, PQgetvalue(res, i, 8), false, false);
    if (!puballtables) {
      printfPQExpBuffer(
        buf,
        "SELECT n.nspname, c.relname"
      );
      if (pset.sversion >= 15e4) {
        appendPQExpBufferStr(
          buf,
          ", pg_get_expr(pr.prqual, c.oid)"
        );
        appendPQExpBufferStr(
          buf,
          ", (CASE WHEN pr.prattrs IS NOT NULL THEN\n     pg_catalog.array_to_string(      ARRAY(SELECT attname\n              FROM\n                pg_catalog.generate_series(0, pg_catalog.array_upper(pr.prattrs::pg_catalog.int2[], 1)) s,\n                pg_catalog.pg_attribute\n        WHERE attrelid = c.oid AND attnum = prattrs[s]), ', ')\n       ELSE NULL END)"
        );
      } else
        appendPQExpBufferStr(
          buf,
          ", NULL, NULL"
        );
      appendPQExpBuffer(
        buf,
        "\nFROM pg_catalog.pg_class c,\n     pg_catalog.pg_namespace n,\n     pg_catalog.pg_publication_rel pr\nWHERE c.relnamespace = n.oid\n  AND c.oid = pr.prrelid\n  AND pr.prpubid = '%s'\nORDER BY 1,2",
        pubid
      );
      if (!await addFooterToPublicationDesc(buf, _("Tables:"), false, cont))
        return false;
      if (pset.sversion >= 15e4) {
        printfPQExpBuffer(
          buf,
          "SELECT n.nspname\nFROM pg_catalog.pg_namespace n\n     JOIN pg_catalog.pg_publication_namespace pn ON n.oid = pn.pnnspid\nWHERE pn.pnpubid = '%s'\nORDER BY 1",
          pubid
        );
        if (!await addFooterToPublicationDesc(
          buf,
          _("Tables from schemas:"),
          true,
          cont
        ))
          return false;
      }
    }
    printTable(cont, pset.queryFout, false, pset.logfile);
  }
  return true;
}
async function describeSubscriptions(pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let translate_columns = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  if (pset.sversion < 1e5) {
    let sverbuf;
    pg_log_error(
      "The server (version %s) does not support subscriptions.",
      formatPGVersionNumber(
        pset.sversion,
        false,
        sverbuf,
        sizeof(sverbuf)
      )
    );
    return true;
  }
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT subname AS "%s"\n,  pg_catalog.pg_get_userbyid(subowner) AS "%s"\n,  subenabled AS "%s"\n,  subpublications AS "%s"\n',
    gettext_noop("Name"),
    gettext_noop("Owner"),
    gettext_noop("Enabled"),
    gettext_noop("Publication")
  );
  if (verbose) {
    if (pset.sversion >= 14e4) {
      appendPQExpBuffer(
        buf,
        ', subbinary AS "%s"\n',
        gettext_noop("Binary")
      );
      if (pset.sversion >= 16e4)
        appendPQExpBuffer(
          buf,
          `, (CASE substream
    WHEN 'f' THEN 'off'
    WHEN 't' THEN 'on'
    WHEN 'p' THEN 'parallel'
   END) AS "%s"
`,
          gettext_noop("Streaming")
        );
      else
        appendPQExpBuffer(
          buf,
          ', substream AS "%s"\n',
          gettext_noop("Streaming")
        );
    }
    if (pset.sversion >= 15e4)
      appendPQExpBuffer(
        buf,
        ', subtwophasestate AS "%s"\n, subdisableonerr AS "%s"\n',
        gettext_noop("Two-phase commit"),
        gettext_noop("Disable on error")
      );
    if (pset.sversion >= 16e4)
      appendPQExpBuffer(
        buf,
        ', suborigin AS "%s"\n, subpasswordrequired AS "%s"\n, subrunasowner AS "%s"\n',
        gettext_noop("Origin"),
        gettext_noop("Password required"),
        gettext_noop("Run as owner?")
      );
    appendPQExpBuffer(
      buf,
      ',  subsynccommit AS "%s"\n,  subconninfo AS "%s"\n',
      gettext_noop("Synchronous commit"),
      gettext_noop("Conninfo")
    );
    if (pset.sversion >= 15e4)
      appendPQExpBuffer(
        buf,
        ', subskiplsn AS "%s"\n',
        gettext_noop("Skip LSN")
      );
  }
  appendPQExpBufferStr(
    buf,
    "FROM pg_catalog.pg_subscription\nWHERE subdbid = (SELECT oid\n                 FROM pg_catalog.pg_database\n                 WHERE datname = pg_catalog.current_database())"
  );
  if (!validateSQLNamePattern(
    buf,
    pattern,
    true,
    false,
    NULL,
    "subname",
    NULL,
    NULL,
    NULL,
    1
  )) {
    return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of subscriptions");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function printACLColumn(buf, colname) {
  appendPQExpBuffer(
    buf,
    `pg_catalog.array_to_string(%s, E'\\n') AS "%s"`,
    colname,
    gettext_noop("Access privileges")
  );
}
async function listOperatorClasses(access_method_pattern, type_pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let have_where = false;
  let translate_columns = [false, false, false, false, false, false, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
  am.amname AS "%s",
  pg_catalog.format_type(c.opcintype, NULL) AS "%s",
  CASE
    WHEN c.opckeytype <> 0 AND c.opckeytype <> c.opcintype
    THEN pg_catalog.format_type(c.opckeytype, NULL)
    ELSE NULL
  END AS "%s",
  CASE
    WHEN pg_catalog.pg_opclass_is_visible(c.oid)
    THEN pg_catalog.format('%%I', c.opcname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, c.opcname)
  END AS "%s",
  (CASE WHEN c.opcdefault
    THEN '%s'
    ELSE '%s'
  END) AS "%s"`,
    gettext_noop("AM"),
    gettext_noop("Input type"),
    gettext_noop("Storage type"),
    gettext_noop("Operator class"),
    gettext_noop("yes"),
    gettext_noop("no"),
    gettext_noop("Default?")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      `,
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ofn.nspname, of.opfname)
  END AS "%s",
 pg_catalog.pg_get_userbyid(c.opcowner) AS "%s"
`,
      gettext_noop("Operator family"),
      gettext_noop("Owner")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_opclass c\n  LEFT JOIN pg_catalog.pg_am am on am.oid = c.opcmethod\n  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.opcnamespace\n  LEFT JOIN pg_catalog.pg_type t ON t.oid = c.opcintype\n  LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = c.opcfamily\n  LEFT JOIN pg_catalog.pg_namespace ofn ON ofn.oid = of.opfnamespace\n"
    );
  if (access_method_pattern) {
    have_where = { value: have_where };
    if (!validateSQLNamePattern(
      buf,
      access_method_pattern,
      false,
      false,
      NULL,
      "am.amname",
      NULL,
      NULL,
      have_where,
      1
    ))
      return false;
    have_where = have_where.value;
  }
  if (type_pattern) {
    if (!validateSQLNamePattern(
      buf,
      type_pattern,
      have_where,
      false,
      "tn.nspname",
      "t.typname",
      "pg_catalog.format_type(t.oid, NULL)",
      "pg_catalog.pg_type_is_visible(t.oid)",
      NULL,
      3
    ))
      return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2, 4;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of operator classes");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listOperatorFamilies(access_method_pattern, type_pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let have_where = false;
  let translate_columns = [false, false, false, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(f.oid)
    THEN pg_catalog.format('%%I', f.opfname)
    ELSE pg_catalog.format('%%I.%%I', n.nspname, f.opfname)
  END AS "%s",
  (SELECT
     pg_catalog.string_agg(pg_catalog.format_type(oc.opcintype, NULL), ', ')
   FROM pg_catalog.pg_opclass oc
   WHERE oc.opcfamily = f.oid) "%s"`,
    gettext_noop("AM"),
    gettext_noop("Operator family"),
    gettext_noop("Applicable types")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      ',\n  pg_catalog.pg_get_userbyid(f.opfowner) AS "%s"\n',
      gettext_noop("Owner")
    );
  appendPQExpBufferStr(
    buf,
    "\nFROM pg_catalog.pg_opfamily f\n  LEFT JOIN pg_catalog.pg_am am on am.oid = f.opfmethod\n  LEFT JOIN pg_catalog.pg_namespace n ON n.oid = f.opfnamespace\n"
  );
  if (access_method_pattern) {
    have_where = { value: have_where };
    if (!validateSQLNamePattern(
      buf,
      access_method_pattern,
      false,
      false,
      NULL,
      "am.amname",
      NULL,
      NULL,
      have_where,
      1
    ))
      return false;
    have_where = have_where.value;
  }
  if (type_pattern) {
    appendPQExpBuffer(
      buf,
      "  %s EXISTS (\n    SELECT 1\n    FROM pg_catalog.pg_type t\n    JOIN pg_catalog.pg_opclass oc ON oc.opcintype = t.oid\n    LEFT JOIN pg_catalog.pg_namespace tn ON tn.oid = t.typnamespace\n    WHERE oc.opcfamily = f.oid\n",
      have_where ? "AND" : "WHERE"
    );
    if (!validateSQLNamePattern(
      buf,
      type_pattern,
      true,
      false,
      "tn.nspname",
      "t.typname",
      "pg_catalog.format_type(t.oid, NULL)",
      "pg_catalog.pg_type_is_visible(t.oid)",
      NULL,
      3
    ))
      return false;
    appendPQExpBufferStr(buf, "  )\n");
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of operator families");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listOpFamilyOperators(access_method_pattern, family_pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let have_where = false;
  let translate_columns = [false, false, false, false, false, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', nsf.nspname, of.opfname)
  END AS "%s",
  o.amopopr::pg_catalog.regoperator AS "%s"
,  o.amopstrategy AS "%s",
  CASE o.amoppurpose
    WHEN 'o' THEN '%s'
    WHEN 's' THEN '%s'
  END AS "%s"
`,
    gettext_noop("AM"),
    gettext_noop("Operator family"),
    gettext_noop("Operator"),
    gettext_noop("Strategy"),
    gettext_noop("ordering"),
    gettext_noop("search"),
    gettext_noop("Purpose")
  );
  if (verbose)
    appendPQExpBuffer(
      buf,
      ', ofs.opfname AS "%s"\n',
      gettext_noop("Sort opfamily")
    );
  appendPQExpBufferStr(
    buf,
    "FROM pg_catalog.pg_amop o\n  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = o.amopfamily\n  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod AND am.oid = o.amopmethod\n  LEFT JOIN pg_catalog.pg_namespace nsf ON of.opfnamespace = nsf.oid\n"
  );
  if (verbose)
    appendPQExpBufferStr(
      buf,
      "  LEFT JOIN pg_catalog.pg_opfamily ofs ON ofs.oid = o.amopsortfamily\n"
    );
  if (access_method_pattern) {
    have_where = { value: have_where };
    if (!validateSQLNamePattern(
      buf,
      access_method_pattern,
      false,
      false,
      NULL,
      "am.amname",
      NULL,
      NULL,
      have_where,
      1
    ))
      return false;
    have_where = have_where.value;
  }
  if (family_pattern) {
    if (!validateSQLNamePattern(
      buf,
      family_pattern,
      have_where,
      false,
      "nsf.nspname",
      "of.opfname",
      NULL,
      NULL,
      NULL,
      3
    ))
      return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2,\n  o.amoplefttype = o.amoprighttype DESC,\n  pg_catalog.format_type(o.amoplefttype, NULL),\n  pg_catalog.format_type(o.amoprighttype, NULL),\n  o.amopstrategy;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of operators of operator families");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listOpFamilyFunctions(access_method_pattern, family_pattern, verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  let have_where = false;
  let translate_columns = [false, false, false, false, false, false];
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    `SELECT
  am.amname AS "%s",
  CASE
    WHEN pg_catalog.pg_opfamily_is_visible(of.oid)
    THEN pg_catalog.format('%%I', of.opfname)
    ELSE pg_catalog.format('%%I.%%I', ns.nspname, of.opfname)
  END AS "%s",
  pg_catalog.format_type(ap.amproclefttype, NULL) AS "%s",
  pg_catalog.format_type(ap.amprocrighttype, NULL) AS "%s",
  ap.amprocnum AS "%s"
`,
    gettext_noop("AM"),
    gettext_noop("Operator family"),
    gettext_noop("Registered left type"),
    gettext_noop("Registered right type"),
    gettext_noop("Number")
  );
  if (!verbose)
    appendPQExpBuffer(
      buf,
      ', p.proname AS "%s"\n',
      gettext_noop("Function")
    );
  else
    appendPQExpBuffer(
      buf,
      ', ap.amproc::pg_catalog.regprocedure AS "%s"\n',
      gettext_noop("Function")
    );
  appendPQExpBufferStr(
    buf,
    "FROM pg_catalog.pg_amproc ap\n  LEFT JOIN pg_catalog.pg_opfamily of ON of.oid = ap.amprocfamily\n  LEFT JOIN pg_catalog.pg_am am ON am.oid = of.opfmethod\n  LEFT JOIN pg_catalog.pg_namespace ns ON of.opfnamespace = ns.oid\n  LEFT JOIN pg_catalog.pg_proc p ON ap.amproc = p.oid\n"
  );
  if (access_method_pattern) {
    have_where = { value: have_where };
    if (!validateSQLNamePattern(
      buf,
      access_method_pattern,
      false,
      false,
      NULL,
      "am.amname",
      NULL,
      NULL,
      have_where,
      1
    ))
      return false;
    have_where = have_where.value;
  }
  if (family_pattern) {
    if (!validateSQLNamePattern(
      buf,
      family_pattern,
      have_where,
      false,
      "ns.nspname",
      "of.opfname",
      NULL,
      NULL,
      NULL,
      3
    ))
      return false;
  }
  appendPQExpBufferStr(buf, "ORDER BY 1, 2,\n  ap.amproclefttype = ap.amprocrighttype DESC,\n  3, 4, 5;");
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("List of support functions of operator families");
  myopt.translate_header = true;
  myopt.translate_columns = translate_columns;
  myopt.n_translate_columns = lengthof(translate_columns);
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}
async function listLargeObjects(verbose) {
  let buf = {
    /* struct */
  };
  let res;
  let myopt = pset.popt;
  initPQExpBuffer(buf);
  printfPQExpBuffer(
    buf,
    'SELECT oid as "%s",\n  pg_catalog.pg_get_userbyid(lomowner) as "%s",\n  ',
    gettext_noop("ID"),
    gettext_noop("Owner")
  );
  if (verbose) {
    await printACLColumn(buf, "lomacl");
    appendPQExpBufferStr(buf, ",\n  ");
  }
  appendPQExpBuffer(
    buf,
    `pg_catalog.obj_description(oid, 'pg_largeobject') as "%s"
FROM pg_catalog.pg_largeobject_metadata
ORDER BY oid`,
    gettext_noop("Description")
  );
  res = await PSQLexec(buf.data);
  if (!res)
    return false;
  myopt.nullPrint = NULL;
  myopt.title = _("Large objects");
  myopt.translate_header = true;
  printQuery(res, myopt, pset.queryFout, false, pset.logfile);
  return true;
}

// demo-src/demo.js
var goBtn = document.querySelector("#gobtn");
var goBtnUsualTitle = goBtn.value;
goBtn.addEventListener("click", async () => {
  const connectionString = document.querySelector("#dburl").value;
  const dbName = connectionString.match(/[/]\w+(?=\?|$)/)[0];
  const cmd = document.querySelector("#sql").value;
  const echoHidden = document.querySelector("#echohidden").checked;
  const pool = new Pool({ connectionString });
  const queryFn = (sql) => pool.query({ text: sql, rowMode: "array" });
  goBtn.disabled = true;
  goBtn.value = "Working ...";
  const tableData = await describe(serverless_default, cmd, dbName, queryFn, echoHidden);
  goBtn.disabled = false;
  goBtn.value = goBtnUsualTitle;
  const output2 = describeDataToHtml(tableData);
  document.querySelector("#output").innerHTML = output2;
});
/*! Bundled license information:

@neondatabase/serverless/index.js:
  (*! Bundled license information:
  
  ieee754/index.js:
    (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  buffer/index.js:
    (*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     *)
  *)
*/
