const portalOnlineIndex = () => import("app/portalOnline/pages/Index/Index");
const portalOnlineIndexContent = () =>
  import("app/portalOnline/pages/Index/IndexContent");
const portalOnlineLogin = () => import("app/portalOnline/pages/Login/Login");
export default {
  portalOnlineIndex,
  portalOnlineIndexContent,
  portalOnlineLogin,
};
