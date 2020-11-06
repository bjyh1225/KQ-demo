export function dateFormat(fmt, date) {
  let ret;
  date=new Date(date);
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

export function formatDuring(t){
  const HOUR = 1000 * 60 * 60;
  const d = parseInt(t / (HOUR * 24));
  const h = parseInt((t % (HOUR * 24)) / (HOUR));
  const m = parseInt((t % (HOUR)) / (1000 * 60));
  const s = parseInt((t % (1000 * 60)) / 1000);

  let text = '';
  d && (text += `${d}天`);
  h && (text += `${h}小时`);
  m && (text += `${m}分`);
  s && (text += `${s}秒`);
  return text || '-';
};