export function objToStr(val: any): String {
  const ObjToStr = Object.prototype.toString;
  return ObjToStr.call(val);
}

export function isArray(val: any): val is Array<any> {
  return objToStr(val) === '[object Array]';
}
