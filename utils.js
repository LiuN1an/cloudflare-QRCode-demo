import qr from "qr-image";

const TOKEN_DEAD = `123456`;

export const toQRCode = (url) => {
  const imgBuffer = qr.imageSync(url);
  return imgBuffer;
};

// 根据id查找database获取url以及点击次数
export const findById = async (id, db) => {
  const v = await db.get(id);
  if (v) {
    return JSON.parse(v);
  } else {
    return false;
  }
};

export const auth = (request) => {
  const bearer = request.headers.get("Authorization");
  return bearer === `Bearer ${TOKEN_DEAD}`;
};

// 可接其他unq库
export const random = () => {
  return Math.random().toString(36).slice(2);
};

// 可增加url校验规则
export const checkUrl = (url) => {
  return !url;
};
